import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { inspectGLB } from './validate-glb.js';
import { TIER_SETTINGS } from './quality.js';

const bounded = (v) => Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Optional renderer: importing the main 2D package never imports this entry.
 * @param {HTMLElement} container
 * @param {{quality?:'full'|'light', onContextLost?:()=>void, onSlow?:(info:{from:string,to:string,fps:number})=>void}} [options]
 *   quality: starting tier (antialias is fixed at creation, so pass it here rather than calling setQuality later).
 *   onContextLost: the GPU dropped the 3D (driver reset, too many tabs); the viewer is dead and the page should fall back.
 *   onSlow: measured frame rate stayed far below the target. full -> light is applied automatically; light -> 2d is only reported.
 */
export function createAvatar3DViewer(container, options = {}) {
  let tier = options.quality === 'light' ? 'light' : 'full';
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: tier === 'full', powerPreference: tier === 'full' ? 'default' : 'low-power', failIfMajorPerformanceCaveat: false }); }
  catch { throw new Error('O navegador não conseguiu iniciar o 3D. Ative a aceleração gráfica ou tente outro navegador.'); }
  let lost = false;
  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    // Never let a lost context freeze the page: stop drawing and hand over to the site (which shows the 2D).
    event.preventDefault(); lost = true; cancelAnimationFrame(raf);
    try { options.onContextLost?.(); } catch { /* the page handler must not break the viewer teardown */ }
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-label', 'Visualizador de avatar 3D');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;';
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x7a6ea1, .75));
  const light = new THREE.DirectionalLight(0xfff5eb, 1.0); light.position.set(1, 3, 4); scene.add(light);
  const rim = new THREE.DirectionalLight(0x8be5ff, .4); rim.position.set(-2, 2, -3); scene.add(rim);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.12; controls.maxPolarAngle = Math.PI * .92;
  let model = null, vrm = null, mixer = null, clips = [], clipAction = null;
  let disposed = false, generation = 0, raf = 0, previous = 0, elapsed = 0;
  let idle = true, speech = 0, action = null, manual = {}, cameraPose = null;
  let poses = { full: null, bust: null }, framing = 'full', mouthGain = 1, morphDrive = {}, morphRefs = null;
  const tmpV = new THREE.Vector3();
  let tracking = null, visemes = null, arms = null, trunk = null, mouthAssist = 0;
  // Quality tier ('full' | 'light', see quality.js TIER_SETTINGS): frame interval, pixel budget, largest texture, outlines.
  let settings = TIER_SETTINGS[tier];
  let frameMs = 1000 / settings.fps;
  function setQuality(next) {
    const was = tier;
    tier = next === 'light' || next === '2d' ? 'light' : 'full';
    settings = TIER_SETTINGS[tier]; frameMs = 1000 / settings.fps; resize();
    // Going lighter also slims the model already on screen (textures, outlines); going back up keeps it until the next load.
    if (model && tier === 'light' && was !== 'light') void slim(model);
    slowSince = 0; fpsWindow.length = 0;
  }
  /** Shrinks oversized textures in place. Decodes/resizes off the main thread when the browser can. Never upscales. */
  async function shrinkTextures(root, max) {
    let reduced = 0; const seen = new Set();
    root.traverse((o) => { for (const m of [].concat(o.material || [])) for (const v of Object.values(m || {})) if (v?.isTexture && v.image && !seen.has(v)) seen.add(v); });
    for (const tex of seen) {
      const img = tex.image, w = img.width || img.videoWidth || 0, h = img.height || img.videoHeight || 0;
      if (!w || !h || Math.max(w, h) <= max) continue;
      const k = max / Math.max(w, h), cw = Math.max(1, Math.round(w * k)), ch = Math.max(1, Math.round(h * k));
      let next = null;
      try { if (typeof createImageBitmap === 'function') next = await createImageBitmap(img, { resizeWidth: cw, resizeHeight: ch, resizeQuality: 'medium', imageOrientation: 'none', premultiplyAlpha: 'none', colorSpaceConversion: 'none' }); }
      catch { next = null; }
      if (!next) { const c = document.createElement('canvas'); c.width = cw; c.height = ch; c.getContext('2d').drawImage(img, 0, 0, cw, ch); next = c; }
      if (img.close) try { img.close(); } catch { /* already closed */ }
      tex.image = next; tex.needsUpdate = true; reduced++;
      await nextTask();
    }
    return reduced;
  }
  /** Outline passes (MToon) draw every mesh twice; the light tier hides them. */
  function setOutlines(root, visible) {
    root.traverse((o) => { for (const m of [].concat(o.material || [])) if (m?.isOutline !== undefined && m.isOutline) m.visible = visible; });
  }
  async function slim(root) {
    setOutlines(root, settings.outlines);
    try { await shrinkTextures(root, settings.textureMax); } catch { /* keep full-size textures if shrinking fails */ }
  }
  const resize = () => {
    if (disposed) return;
    const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
    // Pixel budget: software GPUs pay per pixel, so the light tier caps the drawn area (the browser scales it up smoothly).
    const dpr = window.devicePixelRatio || 1;
    const ratio = Math.max(.5, Math.min(dpr, settings.pixelRatioMax, Math.sqrt(settings.maxPixels / (width * height))));
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize); observer.observe(container);
  // Measured frame rate (only while visible and drawing) drives the automatic downgrade.
  const fpsWindow = []; let slowSince = 0, slowReported = false, measuredFps = 0;
  let springDt = 0, springTick = 0; let lastDraw = 0;
  resize();

  function resetCamera() {
    if (!cameraPose) { camera.position.set(0, 1, 3); controls.target.set(0, .8, 0); }
    else { camera.position.copy(cameraPose.position); controls.target.copy(cameraPose.target); }
    controls.update();
  }
  resetCamera();
  function stopAction() {
    action = null;
    if (clipAction) { clipAction.stop(); clipAction = null; }
    if (vrm?.humanoid) vrm.humanoid.autoUpdateHumanBones = true;
  }
  function dropModel() {
    stopAction();
    if (model) { mixer?.stopAllAction(); mixer?.uncacheRoot(model); scene.remove(model); release(model); }
    model = vrm = mixer = null; clips = []; manual = {}; speech = 0; tracking = null; visemes = null; morphRefs = null; arms = null; trunk = null;
  }
  /**
   * @param {ArrayBuffer} buffer
   * @param {string} [name]
   * @param {{onProgress?:(stage:'parse'|'textures'|'shaders'|'ready', fraction:number)=>void}} [loadOptions]
   *   Loading is split into short tasks (parse, texture upload one by one, shader compile in parallel when the GPU allows)
   *   so a slow computer keeps scrolling and clicking while the avatar is being prepared.
   */
  async function load(buffer, name, loadOptions = {}) {
    if (disposed) throw new Error('O visualizador foi fechado.');
    if (lost) throw new Error('O 3D parou neste navegador. Recarregue a página para tentar de novo.');
    const progress = (stage, fraction) => { try { loadOptions.onProgress?.(stage, fraction); } catch { /* UI callback errors never break loading */ } };
    progress('parse', 0);
    const ticket = ++generation;
    const inspection = inspectGLB(buffer);
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      // Embedded images become blob URLs inside GLTFLoader; network/file URLs cannot escape preflight.
      if (!url.startsWith('blob:')) throw new Error('Recursos externos não são permitidos.');
      return url;
    });
    const loader = new GLTFLoader(manager); loader.register((parser) => new VRMLoaderPlugin(parser));
    const gltf = await loader.parseAsync(buffer, '');
    const next = gltf.scene;
    if (disposed || ticket !== generation) { release(next); throw new Error('Carregamento substituído por outro modelo.'); }
    const nextVRM = gltf.userData.vrm || null;
    if (nextVRM) VRMUtils.rotateVRM0(nextVRM);
    next.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(next), size = box.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.length()) || size.length() < .00001 || size.length() > 10000) { release(next); throw new Error('Dimensões do modelo inválidas.'); }
    // Fit all imported units to a stable camera without changing skeleton-relative proportions.
    const centre = box.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z);
    const distance = radius / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.45;
    camera.near = Math.max(radius / 1000, .001); camera.far = Math.max(distance * 30, 100); camera.updateProjectionMatrix();
    controls.minDistance = radius * .25; controls.maxDistance = radius * 8;
    cameraPose = { target: centre.clone(), position: centre.clone().add(new THREE.Vector3(0, 0, distance)) };
    // Bust framing (chest up, what the web player shows by default); full body stays one flag away.
    poses = { full: cameraPose, bust: null };
    const chestNode = nextVRM?.humanoid?.getNormalizedBoneNode?.('upperChest') || nextVRM?.humanoid?.getNormalizedBoneNode?.('chest');
    const shoulderL = nextVRM?.humanoid?.getNormalizedBoneNode?.('leftShoulder'), shoulderR = nextVRM?.humanoid?.getNormalizedBoneNode?.('rightShoulder');
    if (chestNode) {
      chestNode.getWorldPosition(tmpV);
      const top = box.max.y, bottom = Math.min(tmpV.y - size.y * .05, top - size.y * .2), span = (top - bottom) * 1.04;
      const mid = new THREE.Vector3(centre.x, (top + bottom) / 2, centre.z);
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      // Width comes from the shoulders (the bounding box is wider than the body when the arms are held away from it).
      let shoulders = size.x * .45;
      if (shoulderL && shoulderR) { shoulderL.getWorldPosition(tmpV); const a = tmpV.x; shoulderR.getWorldPosition(tmpV); shoulders = Math.abs(a - tmpV.x) * 1.6; }
      const fitH = span / (2 * tanHalf);
      const fitW = shoulders / (2 * tanHalf * Math.max(camera.aspect, .3));
      poses.bust = { target: mid, position: mid.clone().add(new THREE.Vector3(0, 0, Math.max(fitH, fitW))) };
    }
    if (framing === 'bust' && poses.bust) cameraPose = poses.bust;
    const nextMorphs = resolveMorphs(next);
    progress('textures', 0);
    await slim(next);
    if (disposed || ticket !== generation) { release(next); throw new Error('Carregamento substituído por outro modelo.'); }
    // Upload textures one per task (a 2048 texture can take a second on a software GPU), then compile the shaders.
    const textures = collectTextures(next);
    for (let i = 0; i < textures.length; i++) {
      try { renderer.initTexture(textures[i]); } catch { /* uploaded on first draw instead */ }
      progress('textures', (i + 1) / textures.length);
      await nextTask();
      if (disposed || ticket !== generation) { release(next); throw new Error('Carregamento substituído por outro modelo.'); }
    }
    progress('shaders', 0);
    try { await renderer.compileAsync(next, camera, scene); } catch { /* compiled on first draw instead */ }
    // Without KHR_parallel_shader_compile the driver links on first use, freezing the first frame (about 1 s for 15 programs).
    // Touch each program's uniforms in its own task so the wait is paid in small slices during loading.
    const programs = new Set();
    next.traverse((o) => { for (const m of [].concat(o.material || [])) { const pr = m && renderer.properties.get(m).currentProgram; if (pr) programs.add(pr); } });
    let linked = 0;
    for (const program of programs) {
      try { program.getUniforms(); } catch { /* reported by three on first draw */ }
      progress('shaders', ++linked / programs.size);
      await nextTask();
      if (disposed || ticket !== generation) { release(next); throw new Error('Carregamento substituído por outro modelo.'); }
    }
    if (disposed || ticket !== generation) { release(next); throw new Error('Carregamento substituído por outro modelo.'); }
    dropModel(); model = next; vrm = nextVRM; morphRefs = nextMorphs; clips = gltf.animations || []; mixer = new THREE.AnimationMixer(model);
    mixer.addEventListener('finished', () => stopAction()); scene.add(model); resetCamera();
    progress('ready', 1);
    const expressions = vrm?.expressionManager?.expressions?.map((e) => e.expressionName) || [];
    return {
      name: name || 'Avatar 3D', format: vrm ? 'vrm' : 'glb', humanoid: !!vrm?.humanoid,
      expressions, triangles: inspection.triangles, meshes: inspection.meshes,
      actions: [...(vrm?.humanoid ? [{ id: 'builtin:wave', label: 'Acenar' }, { id: 'builtin:nod', label: 'Concordar' }] : []), ...clips.map((c, i) => ({ id: `clip:${i}`, label: c.name || `Ação ${i + 1}` }))],
    };
  }
  function playAction(id) {
    if (!model || disposed) return;
    stopAction();
    if (id === 'builtin:wave' || id === 'builtin:nod') {
      if (vrm?.humanoid) action = { id, start: elapsed, duration: id === 'builtin:wave' ? 2.8 : 1.8 };
      return;
    }
    if (!/^clip:\d+$/.test(id)) return;
    const clip = clips[Number(id.slice(5))]; if (!clip) return;
    if (vrm?.humanoid) vrm.humanoid.autoUpdateHumanBones = false;
    clipAction = mixer.clipAction(clip); clipAction.setLoop(THREE.LoopOnce, 1); clipAction.clampWhenFinished = false; clipAction.reset().play();
  }
  function frame(now) {
    if (disposed || lost) return;
    raf = requestAnimationFrame(frame);
    if (document.hidden) { previous = lastDraw = now; return; }
    // Fixed cadence (keeps phase, small tolerance) so a 60 Hz screen averages 24/30 fps instead of rounding down to 20.
    if (now - previous < frameMs - 4) return;
    previous += frameMs; if (now - previous > frameMs) previous = now;
    const gap = now - lastDraw; lastDraw = now;
    const dt = Math.min(gap / 1000 || 0, .1); elapsed += dt;
    if (model && gap > 0 && gap < 2000) watchSpeed(now, gap);
    if (vrm?.humanoid && !clipAction) {
      vrm.humanoid.resetNormalizedPose();
      const bone = (id) => vrm.humanoid.getNormalizedBoneNode(id);
      if (bone('leftUpperArm')) bone('leftUpperArm').rotation.z = -1.15;
      if (bone('rightUpperArm')) bone('rightUpperArm').rotation.z = 1.15;
      if (idle && !tracking) {
        if (bone('head')) bone('head').rotation.y = Math.sin(elapsed * .65) * .045;
        if (bone('chest')) bone('chest').rotation.x = Math.sin(elapsed * 1.7) * .012;
      }
      if (tracking?.head) {
        // Camera mirror: the head turns the way the person's head turns; the neck takes 40% so the pose looks natural.
        const h = tracking.head, neck = bone('neck'), head = bone('head');
        if (neck) { neck.rotation.x = h.x * .4; neck.rotation.y = h.y * .4; neck.rotation.z = h.z * .4; }
        if (head) { head.rotation.x = h.x * .6; head.rotation.y = h.y * .6; head.rotation.z = h.z * .6; }
      }
      if (trunk && !action) {
        // Trunk lean/twist from the camera: split across spine and chest so the bend looks like a back, not a hinge.
        const sp = bone('spine'), ch = bone('chest'), uc = bone('upperChest');
        const parts = [[sp, .4], [ch, .35], [uc, .25]].filter(([b]) => b);
        const total = parts.reduce((s, [, w]) => s + w, 0) || 1;
        for (const [b, w] of parts) { const f = w / total; b.rotation.x += trunk.x * f; b.rotation.y += trunk.y * f; b.rotation.z += trunk.z * f; }
      }
      if (arms && !action) {
        // Arms/fingers from the camera: weight blends rest pose -> tracked pose, so losing the person eases back to idle.
        // An action in progress (wave, user action) keeps priority; held sides were already pinned by the tracker.
        for (const side of ['left', 'right']) {
          const s = arms[side], upper = bone(side + 'UpperArm'), lower = bone(side + 'LowerArm');
          if (!s || !upper) continue;
          upper.quaternion.set(s.upper[0], s.upper[1], s.upper[2], s.upper[3]);
          if (lower) lower.quaternion.set(s.lower[0], s.lower[1], s.lower[2], s.lower[3]);
          for (const [finger, cap] of Object.entries(FINGER_BONES)) {
            const curl = s.fingers?.[finger] || 0;
            for (const [joint, limit] of cap) { const b = bone(side + joint); if (b) b.rotation.z = (side === 'left' ? -1 : 1) * curl * limit; }
          }
        }
      }
      if (action) {
        const age = elapsed - action.start, fade = Math.min(age / .3, (action.duration - age) / .3, 1);
        if (age >= action.duration) action = null;
        else if (action.id === 'builtin:wave') {
          if (bone('rightUpperArm')) bone('rightUpperArm').rotation.z = 1.15 - 2.4 * Math.max(0, fade);
          if (bone('rightLowerArm')) bone('rightLowerArm').rotation.z = (-.5 + Math.sin(age * 12) * .35) * Math.max(0, fade);
        } else if (bone('head')) bone('head').rotation.x = Math.sin(age * 8) * .2 * Math.max(0, fade);
      }
    }
    if (vrm?.expressionManager) {
      for (const expression of vrm.expressionManager.expressions) {
        const key = expression.expressionName;
        let value = manual[key] || 0;
        if (key === 'aa') value = Math.max(value, speech);
        if (key === 'aa' && mouthAssist > 0) value = Math.max(value, mouthAssist);
        if (visemes && key in visemes) value = Math.max(value, visemes[key]);
        if (tracking?.expressions && key in tracking.expressions) value = Math.max(value, tracking.expressions[key]);
        if (key === 'blink' && idle && !tracking && !manual.blinkLeft && !manual.blinkRight) {
          const blinkPhase = elapsed % 4.6;
          if (blinkPhase > 4.35) value = Math.max(value, Math.sin((blinkPhase - 4.35) / .25 * Math.PI));
        }
        vrm.expressionManager.setValue(key, bounded(value));
      }
    }
    mixer?.update(dt);
    if (vrm && tier === 'light' && vrm.springBoneManager) {
      // Light tier: hair/cloth physics (the most expensive part of vrm.update on dense models) steps every other frame.
      const springs = vrm.springBoneManager; springDt += dt;
      vrm.springBoneManager = undefined;
      try { vrm.update(dt); } finally { vrm.springBoneManager = springs; }
      if ((springTick = (springTick + 1) % 2) === 0) { springs.update(springDt); springDt = 0; }
    } else vrm?.update(dt);
    // Extra face controls the VRM presets do not cover (brows, tongue): drive the base's own morph targets by name,
    // after vrm.update so the preset binds cannot overwrite them. Only ever raises an influence, never lowers one.
    if (morphRefs && tracking?.expressions) {
      for (const [key, refs] of Object.entries(morphRefs)) {
        const v = bounded(tracking.expressions[key]);
        if (v > 0.02) for (const { mesh, index } of refs) mesh.morphTargetInfluences[index] = Math.max(mesh.morphTargetInfluences[index] || 0, v * .85);
      }
    }
    controls.update(); renderer.render(scene, camera);
  }
  /** Rolling 3 s frame rate. Full tier stuck under 60% of its target for 4 s drops to light; light stuck under 10 fps is reported once. */
  function watchSpeed(now, gap) {
    fpsWindow.push([now, gap]);
    while (fpsWindow.length && now - fpsWindow[0][0] > 3000) fpsWindow.shift();
    if (fpsWindow.length < 8) return;
    const span = fpsWindow.reduce((s, [, g]) => s + g, 0);
    measuredFps = Math.round(fpsWindow.length / (span / 1000) * 10) / 10;
    const floor = tier === 'full' ? settings.fps * .6 : 10;
    if (measuredFps >= floor) { slowSince = 0; return; }
    if (!slowSince) { slowSince = now; return; }
    if (now - slowSince < 4000) return;
    slowSince = 0;
    if (tier === 'full') { setQuality('light'); try { options.onSlow?.({ from: 'full', to: 'light', fps: measuredFps }); } catch { /* page callback */ } }
    else if (!slowReported) { slowReported = true; try { options.onSlow?.({ from: 'light', to: '2d', fps: measuredFps }); } catch { /* page callback */ } }
  }
  raf = requestAnimationFrame(frame);
  /** What the diagnostics page and the admin stage show. */
  function getStats() {
    const gl = renderer.getContext();
    return { tier, fps: measuredFps, pixelRatio: renderer.getPixelRatio(), antialias: !!gl.getContextAttributes?.()?.antialias,
      textures: renderer.info.memory.textures, geometries: renderer.info.memory.geometries, drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles, lost };
  }
  function dispose() {
    if (disposed) return;
    disposed = true; generation++; cancelAnimationFrame(raf); observer.disconnect(); controls.dispose(); dropModel();
    renderer.dispose(); try { renderer.forceContextLoss(); } catch { /* already lost */ } renderer.domElement.remove();
  }
  const finiteOr0 = (v) => (Number.isFinite(v) ? v : 0);
  function setFraming(mode) {
    framing = mode === 'full' ? 'full' : 'bust';
    cameraPose = (framing === 'bust' && poses.bust) || poses.full || cameraPose;
    resetCamera();
  }
  /** Which camera-driven face controls this model can actually show (so a UI never promises what is missing). */
  function faceSupport() {
    const has = (k) => !!morphRefs?.[k]?.length;
    const presets = new Set(vrm?.expressionManager?.expressions?.map((e) => e.expressionName) || []);
    return { brows: has('browUp') || has('browDown'), tongue: has('tongue'), bored: presets.has('relaxed'), smile: presets.has('happy'), mouth: presets.has('aa') };
  }
  function setArms(frame) {
    if (!frame) { arms = null; trunk = null; return; }
    const ok = (a) => Array.isArray(a) && a.length === 4 && a.every(Number.isFinite);
    const side = (s) => (s && ok(s.upper) && ok(s.lower) ? { upper: s.upper, lower: s.lower, fingers: s.fingers || {} } : null);
    arms = { left: side(frame.left), right: side(frame.right) };
    const tz = frame.torso && [frame.torso.x, frame.torso.y, frame.torso.z].every(Number.isFinite) ? frame.torso : null;
    trunk = tz ? { x: tz.x, y: tz.y, z: tz.z } : null;
    if (!arms.left && !arms.right) arms = null;
  }
  function setTracking(frame) {
    if (!frame || (!frame.head && !frame.expressions)) { tracking = null; return; }
    const head = frame.head ? { x: finiteOr0(frame.head.x), y: finiteOr0(frame.head.y), z: finiteOr0(frame.head.z) } : null;
    const expressions = frame.expressions ? Object.fromEntries(Object.entries(frame.expressions).map(([k, v]) => [k, bounded(v)])) : null;
    tracking = { head, expressions };
  }
  function setVisemes(values) {
    visemes = values ? Object.fromEntries(Object.entries(values).map(([k, v]) => [k, bounded(v)])) : null;
  }
  return { load, playAction, stopAction, isActionPlaying: () => !!action || !!clipAction, setIdle: (value) => { idle = !!value; }, setExpression: (key, value) => { manual[key] = bounded(value); }, setSpeechLevel: (value) => { speech = bounded(value); }, setQuality, setTracking, setArms, setMouthAssist: (value) => { mouthAssist = bounded(value); }, setVisemes, setFraming, faceSupport, resetCamera, getStats, getQuality: () => tier, dispose };
}

/** Finger -> [VRM joint, max curl in radians] (z rotation closes a finger in the normalized rig). The thumb is deliberately not driven. */
const FINGER_BONES = {
  index: [['IndexProximal', 1.4], ['IndexIntermediate', 1.7], ['IndexDistal', 1.1]],
  middle: [['MiddleProximal', 1.4], ['MiddleIntermediate', 1.7], ['MiddleDistal', 1.1]],
  ring: [['RingProximal', 1.4], ['RingIntermediate', 1.7], ['RingDistal', 1.1]],
  pinky: [['LittleProximal', 1.4], ['LittleIntermediate', 1.7], ['LittleDistal', 1.1]],
};

/** Logical face controls -> morph target names used by the catalogued bases (VRoid `Fcl_*`, Seed-san). Matching is by exact
 *  suffix after the last dot, case-insensitive. A key a model lacks is simply absent (see faceSupport). */
const MORPH_NAMES = {
  browUp: ['Fcl_BRW_Surprised', 'eye_brow_up'],
  browDown: ['Fcl_BRW_Angry', 'eye_brow_down'],
  browInner: ['Fcl_BRW_Sorrow'],
  tongue: ['tongue_out', 'tongueOut', 'Fcl_MTH_Tongue', 'mouth_tongue'],
};
function resolveMorphs(root) {
  const out = {};
  root.traverse((o) => {
    const dict = o.isMesh && o.morphTargetDictionary;
    if (!dict || !o.morphTargetInfluences) return;
    const lower = Object.fromEntries(Object.entries(dict).map(([k, i]) => [k.split('.').pop().toLowerCase(), i]));
    for (const [key, names] of Object.entries(MORPH_NAMES)) {
      for (const name of names) {
        const i = lower[name.toLowerCase()];
        if (i !== undefined) { (out[key] ||= []).push({ mesh: o, index: i }); break; }
      }
    }
  });
  return out;
}

function collectTextures(root) {
  const textures = new Set();
  root.traverse((object) => {
    for (const material of [].concat(object.material || [])) {
      if (!material) continue;
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
      for (const uniform of Object.values(material.uniforms || {})) if (uniform?.value?.isTexture) textures.add(uniform.value);
    }
  });
  return [...textures];
}

function release(root) {
  const geometries = new Set(), materials = new Set(), textures = new Set(), bitmaps = new Set(), skeletons = new Set();
  root.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.skeleton) skeletons.add(object.skeleton);
    for (const material of (Array.isArray(object.material) ? object.material : [object.material])) {
      if (!material) continue;
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
      for (const uniform of Object.values(material.uniforms || {})) if (uniform?.value?.isTexture) textures.add(uniform.value);
    }
  });
  for (const texture of textures) { if (texture.image?.close) bitmaps.add(texture.image); texture.dispose(); }
  for (const bitmap of bitmaps) bitmap.close();
  for (const skeleton of skeletons) skeleton.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}

// Public building blocks for sites that compose their own 3D page (e.g. a free in-browser preview) instead of the
// full chatbot player. Everything here runs on the visitor's device; nothing calls a server.
export { default as CameraControl, CAMERA_TEXT } from './CameraControl.jsx';
export { createCameraTracker, CAMERA_MESSAGES } from './camera-tracker.js';
export { createMicLevel } from './mic-level.js';
export { createMouthAssist } from './mouth-fusion.js';
export { chooseTier, resolveTier, readSavedTier, saveTier, tierLabel, TIERS, TIER_SETTINGS } from './quality.js';
export { runQuickBench, probeGPU, assessDevice } from './quality-bench.js';
