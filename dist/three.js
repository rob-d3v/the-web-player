import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { C, a, b, c, d, e } from "./CameraControl-B9NPDwyB.js";
const MAX_MODEL_BYTES = 32 * 1024 * 1024;
const MAX_TRIANGLES = 3e5;
const fail = (message) => {
  throw new Error(message);
};
function inspectGLB(buffer) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 28) fail("Arquivo 3D inválido. Escolha um GLB ou VRM completo.");
  if (buffer.byteLength > MAX_MODEL_BYTES) fail("O modelo ultrapassa o limite de 32 MB.");
  const view = new DataView(buffer);
  if (view.getUint32(0, true) !== 1179937895 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength) fail("Formato inválido: é necessário GLB 2.0 ou VRM.");
  let offset = 12, json, binary;
  while (offset < buffer.byteLength) {
    if (offset + 8 > buffer.byteLength) fail("Arquivo 3D incompleto.");
    const length = view.getUint32(offset, true), type = view.getUint32(offset + 4, true);
    if (length % 4 || offset + 8 + length > buffer.byteLength) fail("Arquivo 3D incompleto.");
    if (offset === 12 && type !== 1313821514) fail("Manifesto GLB ausente.");
    if (type === 1313821514) {
      if (json || length > 4 * 1024 * 1024) fail("Manifesto 3D inválido ou muito grande.");
      try {
        json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, offset + 8, length)));
      } catch {
        fail("Manifesto 3D inválido.");
      }
    } else if (type === 5130562) {
      if (binary) fail("Arquivo com buffers duplicados.");
      binary = new Uint8Array(buffer, offset + 8, length);
    }
    offset += length + 8;
  }
  if (!json || !binary || ((_a = json.asset) == null ? void 0 : _a.version) !== "2.0") fail("Modelo sem geometria incorporada.");
  for (const key of ["buffers", "bufferViews", "accessors", "images", "textures", "materials", "meshes", "nodes", "skins", "animations", "scenes"]) {
    if (json[key] !== void 0 && !Array.isArray(json[key])) fail("Estrutura do modelo inválida.");
  }
  if (((_b = json.buffers) == null ? void 0 : _b.length) !== 1 || json.buffers[0].uri !== void 0 || json.buffers[0].byteLength > binary.length) fail("Use um GLB com todos os recursos incorporados, sem arquivos externos.");
  if ((((_c = json.nodes) == null ? void 0 : _c.length) || 0) > 4096 || (((_d = json.meshes) == null ? void 0 : _d.length) || 0) > 256 || (((_e = json.materials) == null ? void 0 : _e.length) || 0) > 128 || (((_f = json.textures) == null ? void 0 : _f.length) || 0) > 64 || (((_g = json.images) == null ? void 0 : _g.length) || 0) > 32 || (((_h = json.animations) == null ? void 0 : _h.length) || 0) > 64) fail("Modelo complexo demais para esta prévia.");
  const supported = /* @__PURE__ */ new Set(["VRMC_vrm", "VRMC_materials_mtoon", "VRMC_springBone", "VRMC_node_constraint", "VRMC_materials_hdr_emissiveMultiplier", "KHR_materials_unlit", "KHR_texture_transform", "KHR_materials_emissive_strength", "KHR_materials_clearcoat", "KHR_materials_ior", "KHR_materials_specular", "KHR_materials_transmission", "KHR_materials_volume", "KHR_materials_sheen"]);
  if ((json.extensionsRequired || []).some((name) => !supported.has(name))) fail("O modelo usa uma extensão ainda não suportada. Exporte GLB/VRM sem compressão Draco ou KTX.");
  for (const b2 of json.bufferViews || []) {
    if (b2.buffer !== 0 || !Number.isInteger(b2.byteLength) || b2.byteLength < 0 || !Number.isInteger(b2.byteOffset ?? 0) || (b2.byteOffset ?? 0) < 0 || (b2.byteOffset ?? 0) + b2.byteLength > binary.length) fail("Buffer de geometria inválido.");
  }
  let textureBytes = 0;
  for (const img of json.images || []) {
    if (img.uri !== void 0 || !Number.isInteger(img.bufferView)) fail("Texturas externas não são permitidas. Exporte todas dentro do GLB.");
    const b2 = (_i = json.bufferViews) == null ? void 0 : _i[img.bufferView];
    if (!b2) fail("Textura inválida.");
    const bytes = binary.subarray(b2.byteOffset || 0, (b2.byteOffset || 0) + b2.byteLength);
    const size = imageSize(bytes, img.mimeType);
    if (!size || size.some((n) => !n || n > 4096)) fail("Use texturas PNG/JPEG de até 4096 pixels.");
    textureBytes += size[0] * size[1] * 4 * 4 / 3;
    if (textureBytes > 128 * 1024 * 1024) fail("As texturas ultrapassam o orçamento de memória da prévia.");
  }
  let triangles = 0, vertices = 0, accessorBytes = 0;
  const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
  const componentBytes = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
  for (const a2 of json.accessors || []) {
    if (!Number.isInteger(a2.count) || a2.count < 0 || a2.count > 2e6) fail("Geometria excessiva ou inválida.");
    if (!components[a2.type] || !componentBytes[a2.componentType]) fail("Tipo de geometria inválido.");
    accessorBytes += a2.count * components[a2.type] * componentBytes[a2.componentType];
    if (accessorBytes > 64 * 1024 * 1024) fail("Geometria e expressões ultrapassam o orçamento de memória.");
  }
  for (const [meshIndex, mesh] of (json.meshes || []).entries()) {
    const instances = Math.max(1, (json.nodes || []).filter((n) => n.mesh === meshIndex).length);
    if (!Array.isArray(mesh.primitives) || mesh.primitives.length > 64) fail("Malha inválida.");
    for (const p of mesh.primitives) {
      if ((((_j = p.targets) == null ? void 0 : _j.length) || 0) > 128) fail("Expressões em excesso.");
      const count = ((_m = (_l = json.accessors) == null ? void 0 : _l[(_k = p.attributes) == null ? void 0 : _k.POSITION]) == null ? void 0 : _m.count) || 0;
      vertices += count * instances;
      if ((p.mode ?? 4) !== 4) fail("A prévia aceita malhas trianguladas.");
      triangles += (((_o = (_n = json.accessors) == null ? void 0 : _n[p.indices]) == null ? void 0 : _o.count) ?? count) / 3 * instances;
      if (triangles > MAX_TRIANGLES || vertices > 1e6) fail("Simplifique o modelo para até 300 mil triângulos.");
    }
  }
  if (!triangles) fail("O arquivo não contém uma malha visível.");
  const parents = /* @__PURE__ */ new Set();
  for (const node of json.nodes || []) {
    if ((_p = node.extensions) == null ? void 0 : _p.EXT_mesh_gpu_instancing) fail("Instâncias GPU ainda não são suportadas nesta prévia.");
    if (node.children !== void 0 && !Array.isArray(node.children)) fail("Hierarquia inválida.");
    for (const child of node.children || []) {
      if (parents.has(child)) fail("Um nó não pode ter múltiplos pais.");
      parents.add(child);
    }
  }
  for (const scene of json.scenes || []) {
    if (!Array.isArray(scene.nodes) || new Set(scene.nodes).size !== scene.nodes.length || scene.nodes.some((i) => {
      var _a2;
      return parents.has(i) || !Number.isInteger(i) || !((_a2 = json.nodes) == null ? void 0 : _a2[i]);
    })) fail("Raízes de cena inválidas.");
  }
  const state = /* @__PURE__ */ new Map();
  function visit(i, depth = 0) {
    var _a2;
    if (!Number.isInteger(i) || !((_a2 = json.nodes) == null ? void 0 : _a2[i]) || state.get(i) === 1 || depth > 256) fail("Hierarquia de ossos/nós inválida.");
    if (state.get(i) === 2) return;
    state.set(i, 1);
    const children = json.nodes[i].children || [];
    if (!Array.isArray(children)) fail("Hierarquia inválida.");
    for (const child of children) visit(child, depth + 1);
    state.set(i, 2);
  }
  (json.nodes || []).forEach((_, i) => visit(i));
  for (const skin of json.skins || []) if (!Array.isArray(skin.joints) || skin.joints.length > 256) fail("Esqueleto inválido ou excessivo.");
  return { json, triangles: Math.ceil(triangles), meshes: json.meshes.length };
}
function imageSize(bytes, mime) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (mime === "image/png" && bytes.length >= 24 && v.getUint32(0) === 2303741511 && v.getUint32(4) === 218765834) return [v.getUint32(16), v.getUint32(20)];
  if (mime !== "image/jpeg" || bytes[0] !== 255 || bytes[1] !== 216) return null;
  let p = 2;
  while (p + 4 <= bytes.length) {
    if (bytes[p] !== 255) return null;
    const marker = bytes[p + 1];
    p += 2;
    if (marker === 217 || marker === 218) break;
    if (marker === 255) {
      p -= 1;
      continue;
    }
    if (marker === 1 || marker >= 208 && marker <= 215) continue;
    const len = v.getUint16(p);
    if (len < 2 || p + len > bytes.length) return null;
    if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker) && len >= 7) return [v.getUint16(p + 5), v.getUint16(p + 3)];
    p += len;
  }
  return null;
}
const TIERS = Object.freeze(["full", "light", "2d"]);
const TIER_SETTINGS = Object.freeze({
  full: { pixelRatioMax: 1.5, fps: 30, textureMax: 2048, antialias: true },
  light: { pixelRatioMax: 1, fps: 24, textureMax: 512, antialias: false },
  "2d": { pixelRatioMax: 1, fps: 24, textureMax: 512, antialias: false }
});
const num = (v) => v === null || v === void 0 || v === "" ? null : Number.isFinite(Number(v)) ? Number(v) : null;
function chooseTier(m = {}) {
  const reasons = [];
  const fps = num(m.fps), loadMs = num(m.loadMs), mem = num(m.memoryGB), cores = num(m.cores);
  if (m.webgl === false) return { tier: "2d", reasons: ["Este aparelho não tem WebGL."], camera: { allowed: false, reason: "A câmera precisa do 3D, que não roda aqui." } };
  if (m.softwareRenderer) reasons.push("Sem aceleração de vídeo (renderização por software).");
  let score = 2;
  if (m.softwareRenderer) score = Math.min(score, 0);
  if (fps !== null) {
    if (fps < 12) {
      score = Math.min(score, 0);
      reasons.push(`Só ${Math.round(fps)} quadros por segundo no teste.`);
    } else if (fps < 26) {
      score = Math.min(score, 1);
      reasons.push(`${Math.round(fps)} quadros por segundo no teste.`);
    }
  }
  if (mem !== null && mem <= 2) {
    score = Math.min(score, 1);
    reasons.push(`Pouca memória (${mem} GB).`);
  }
  if (mem !== null && mem <= 1) score = Math.min(score, 0);
  if (cores !== null && cores <= 2) {
    score = Math.min(score, 1);
    reasons.push(`Poucos núcleos (${cores}).`);
  }
  if (loadMs !== null && loadMs > 9e3) {
    score = Math.min(score, 1);
    reasons.push("Carregamento do modelo lento.");
  }
  const tier = score >= 2 ? "full" : score === 1 ? "light" : "2d";
  if (!reasons.length) reasons.push("Aparelho com folga para o 3D completo.");
  const camera = tier === "full" ? { allowed: true, reason: "" } : tier === "light" && (fps === null || fps >= 18) && (mem === null || mem > 2) ? { allowed: true, reason: "" } : { allowed: false, reason: tier === "2d" ? "A câmera fica desligada: o 3D não roda bem neste aparelho." : "A câmera fica desligada: este aparelho está no limite do 3D." };
  return { tier, reasons, camera };
}
const KEY = "ania.quality";
function resolveTier({ saved, recommended } = {}) {
  if (TIERS.includes(saved)) return { tier: saved, source: "user" };
  return { tier: TIERS.includes(recommended) ? recommended : "full", source: TIERS.includes(recommended) ? "auto" : "default" };
}
const readSavedTier = (storage) => {
  try {
    const v = storage == null ? void 0 : storage.getItem(KEY);
    return TIERS.includes(v) ? v : "auto";
  } catch {
    return "auto";
  }
};
const saveTier = (storage, tier) => {
  try {
    if (TIERS.includes(tier)) storage.setItem(KEY, tier);
    else storage.removeItem(KEY);
  } catch {
  }
};
function tierLabel(tier) {
  return { full: "3D completo", light: "3D leve", "2d": "2D" }[tier] || "3D completo";
}
async function runQuickBench({ durationMs = 1500, document: doc = globalThis.document, nav = globalThis.navigator, perf = globalThis.performance, raf = globalThis.requestAnimationFrame } = {}) {
  var _a;
  const out = { webgl: false, softwareRenderer: false, fps: null, memoryGB: (nav == null ? void 0 : nav.deviceMemory) ?? null, cores: (nav == null ? void 0 : nav.hardwareConcurrency) ?? null, jsHeapMB: null, renderer: "" };
  try {
    const canvas = doc.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return out;
    out.webgl = true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    out.renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    out.softwareRenderer = /swiftshader|llvmpipe|software|softpipe|microsoft basic render/i.test(out.renderer);
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, "attribute vec2 p; varying vec2 v; void main(){ v=p; gl_Position=vec4(p,0.,1.); }");
    gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, "precision mediump float; varying vec2 v; uniform float t; void main(){ float a=0.; for(int i=0;i<24;i++){ a+=sin(v.x*float(i)+t)*cos(v.y*float(i)-t); } gl_FragColor=vec4(vec3(a*0.04+0.5),1.); }");
    gl.compileShader(fs);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tLoc = gl.getUniformLocation(prog, "t");
    gl.viewport(0, 0, 512, 512);
    await new Promise((resolve) => {
      let frames = 0;
      const start = perf.now();
      let first = null;
      const tick = (now) => {
        var _a2;
        gl.uniform1f(tLoc, now / 1e3);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        (_a2 = gl.finish) == null ? void 0 : _a2.call(gl);
        if (first === null) first = now;
        frames++;
        if (now - first >= durationMs) {
          out.fps = frames > 1 ? (frames - 1) / ((now - first) / 1e3) : null;
          resolve();
        } else raf(tick);
      };
      raf(tick);
      setTimeout(resolve, durationMs + 3e3);
    });
    (_a = gl.getExtension("WEBGL_lose_context")) == null ? void 0 : _a.loseContext();
  } catch {
  }
  try {
    out.jsHeapMB = perf.memory ? Math.round(perf.memory.usedJSHeapSize / 1048576) : null;
  } catch {
  }
  return out;
}
const bounded = (v) => Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;
function createAvatar3DViewer(container) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    throw new Error("O navegador não conseguiu iniciar o 3D. Ative a aceleração gráfica ou tente outro navegador.");
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0, 0);
  renderer.domElement.setAttribute("aria-label", "Visualizador de avatar 3D");
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;touch-action:none;";
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(16777215, 8023713, 0.75));
  const light = new THREE.DirectionalLight(16774635, 1);
  light.position.set(1, 3, 4);
  scene.add(light);
  const rim = new THREE.DirectionalLight(9168383, 0.4);
  rim.position.set(-2, 2, -3);
  scene.add(rim);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.maxPolarAngle = Math.PI * 0.92;
  let model = null, vrm = null, mixer = null, clips = [], clipAction = null;
  let disposed = false, generation = 0, raf = 0, previous = 0, elapsed = 0;
  let idle = true, speech = 0, action = null, manual = {}, cameraPose = null;
  let poses = { full: null, bust: null }, framing = "full", morphRefs = null;
  const tmpV = new THREE.Vector3();
  let tracking = null, visemes = null, arms = null, trunk = null, mouthAssist = 0;
  let frameMs = 1e3 / 30, textureMax = 2048;
  function setQuality(tier) {
    const light2 = tier === "light" || tier === "2d";
    frameMs = light2 ? 1e3 / 24 : 1e3 / 30;
    textureMax = light2 ? 512 : 2048;
    renderer.setPixelRatio(light2 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    resize();
  }
  async function shrinkTextures(root, max) {
    let reduced = 0;
    const seen = /* @__PURE__ */ new Set();
    root.traverse((o) => {
      for (const m of [].concat(o.material || [])) for (const v of Object.values(m || {})) if ((v == null ? void 0 : v.isTexture) && v.image && !seen.has(v)) seen.add(v);
    });
    for (const tex of seen) {
      const img = tex.image, w = img.width || img.videoWidth || 0, h = img.height || img.videoHeight || 0;
      if (!w || !h || Math.max(w, h) <= max) continue;
      const k = max / Math.max(w, h), c2 = document.createElement("canvas");
      c2.width = Math.max(1, Math.round(w * k));
      c2.height = Math.max(1, Math.round(h * k));
      c2.getContext("2d").drawImage(img, 0, 0, c2.width, c2.height);
      if (img.close) try {
        img.close();
      } catch {
      }
      tex.image = c2;
      tex.needsUpdate = true;
      reduced++;
    }
    return reduced;
  }
  const resize = () => {
    if (disposed) return;
    const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  function resetCamera() {
    if (!cameraPose) {
      camera.position.set(0, 1, 3);
      controls.target.set(0, 0.8, 0);
    } else {
      camera.position.copy(cameraPose.position);
      controls.target.copy(cameraPose.target);
    }
    controls.update();
  }
  resetCamera();
  function stopAction() {
    action = null;
    if (clipAction) {
      clipAction.stop();
      clipAction = null;
    }
    if (vrm == null ? void 0 : vrm.humanoid) vrm.humanoid.autoUpdateHumanBones = true;
  }
  function dropModel() {
    stopAction();
    if (model) {
      mixer == null ? void 0 : mixer.stopAllAction();
      mixer == null ? void 0 : mixer.uncacheRoot(model);
      scene.remove(model);
      release(model);
    }
    model = vrm = mixer = null;
    clips = [];
    manual = {};
    speech = 0;
    tracking = null;
    visemes = null;
    morphRefs = null;
    arms = null;
    trunk = null;
  }
  async function load(buffer, name) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (disposed) throw new Error("O visualizador foi fechado.");
    const ticket = ++generation;
    const inspection = inspectGLB(buffer);
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      if (!url.startsWith("blob:")) throw new Error("Recursos externos não são permitidos.");
      return url;
    });
    const loader = new GLTFLoader(manager);
    loader.register((parser) => new VRMLoaderPlugin(parser));
    const gltf = await loader.parseAsync(buffer, "");
    const next = gltf.scene;
    if (disposed || ticket !== generation) {
      release(next);
      throw new Error("Carregamento substituído por outro modelo.");
    }
    const nextVRM = gltf.userData.vrm || null;
    if (nextVRM) VRMUtils.rotateVRM0(nextVRM);
    next.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(next), size = box.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.length()) || size.length() < 1e-5 || size.length() > 1e4) {
      release(next);
      throw new Error("Dimensões do modelo inválidas.");
    }
    const centre = box.getCenter(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z);
    const distance = radius / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.45;
    camera.near = Math.max(radius / 1e3, 1e-3);
    camera.far = Math.max(distance * 30, 100);
    camera.updateProjectionMatrix();
    controls.minDistance = radius * 0.25;
    controls.maxDistance = radius * 8;
    cameraPose = { target: centre.clone(), position: centre.clone().add(new THREE.Vector3(0, 0, distance)) };
    poses = { full: cameraPose, bust: null };
    const chestNode = ((_b = (_a = nextVRM == null ? void 0 : nextVRM.humanoid) == null ? void 0 : _a.getNormalizedBoneNode) == null ? void 0 : _b.call(_a, "upperChest")) || ((_d = (_c = nextVRM == null ? void 0 : nextVRM.humanoid) == null ? void 0 : _c.getNormalizedBoneNode) == null ? void 0 : _d.call(_c, "chest"));
    const shoulderL = (_f = (_e = nextVRM == null ? void 0 : nextVRM.humanoid) == null ? void 0 : _e.getNormalizedBoneNode) == null ? void 0 : _f.call(_e, "leftShoulder"), shoulderR = (_h = (_g = nextVRM == null ? void 0 : nextVRM.humanoid) == null ? void 0 : _g.getNormalizedBoneNode) == null ? void 0 : _h.call(_g, "rightShoulder");
    if (chestNode) {
      chestNode.getWorldPosition(tmpV);
      const top = box.max.y, bottom = Math.min(tmpV.y - size.y * 0.05, top - size.y * 0.2), span = (top - bottom) * 1.04;
      const mid = new THREE.Vector3(centre.x, (top + bottom) / 2, centre.z);
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      let shoulders = size.x * 0.45;
      if (shoulderL && shoulderR) {
        shoulderL.getWorldPosition(tmpV);
        const a2 = tmpV.x;
        shoulderR.getWorldPosition(tmpV);
        shoulders = Math.abs(a2 - tmpV.x) * 1.6;
      }
      const fitH = span / (2 * tanHalf);
      const fitW = shoulders / (2 * tanHalf * Math.max(camera.aspect, 0.3));
      poses.bust = { target: mid, position: mid.clone().add(new THREE.Vector3(0, 0, Math.max(fitH, fitW))) };
    }
    if (framing === "bust" && poses.bust) cameraPose = poses.bust;
    const nextMorphs = resolveMorphs(next);
    if (textureMax < 2048) {
      try {
        await shrinkTextures(next, textureMax);
      } catch {
      }
    }
    dropModel();
    model = next;
    vrm = nextVRM;
    morphRefs = nextMorphs;
    clips = gltf.animations || [];
    mixer = new THREE.AnimationMixer(model);
    mixer.addEventListener("finished", () => stopAction());
    scene.add(model);
    resetCamera();
    const expressions = ((_j = (_i = vrm == null ? void 0 : vrm.expressionManager) == null ? void 0 : _i.expressions) == null ? void 0 : _j.map((e2) => e2.expressionName)) || [];
    return {
      name: name || "Avatar 3D",
      format: vrm ? "vrm" : "glb",
      humanoid: !!(vrm == null ? void 0 : vrm.humanoid),
      expressions,
      triangles: inspection.triangles,
      meshes: inspection.meshes,
      actions: [...(vrm == null ? void 0 : vrm.humanoid) ? [{ id: "builtin:wave", label: "Acenar" }, { id: "builtin:nod", label: "Concordar" }] : [], ...clips.map((c2, i) => ({ id: `clip:${i}`, label: c2.name || `Ação ${i + 1}` }))]
    };
  }
  function playAction(id) {
    if (!model || disposed) return;
    stopAction();
    if (id === "builtin:wave" || id === "builtin:nod") {
      if (vrm == null ? void 0 : vrm.humanoid) action = { id, start: elapsed, duration: id === "builtin:wave" ? 2.8 : 1.8 };
      return;
    }
    if (!/^clip:\d+$/.test(id)) return;
    const clip = clips[Number(id.slice(5))];
    if (!clip) return;
    if (vrm == null ? void 0 : vrm.humanoid) vrm.humanoid.autoUpdateHumanBones = false;
    clipAction = mixer.clipAction(clip);
    clipAction.setLoop(THREE.LoopOnce, 1);
    clipAction.clampWhenFinished = false;
    clipAction.reset().play();
  }
  function frame(now) {
    var _a;
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    if (document.hidden || now - previous < frameMs) return;
    const dt = Math.min((now - previous) / 1e3 || 0, 0.1);
    previous = now;
    elapsed += dt;
    if ((vrm == null ? void 0 : vrm.humanoid) && !clipAction) {
      vrm.humanoid.resetNormalizedPose();
      const bone = (id) => vrm.humanoid.getNormalizedBoneNode(id);
      if (bone("leftUpperArm")) bone("leftUpperArm").rotation.z = -1.15;
      if (bone("rightUpperArm")) bone("rightUpperArm").rotation.z = 1.15;
      if (idle && !tracking) {
        if (bone("head")) bone("head").rotation.y = Math.sin(elapsed * 0.65) * 0.045;
        if (bone("chest")) bone("chest").rotation.x = Math.sin(elapsed * 1.7) * 0.012;
      }
      if (tracking == null ? void 0 : tracking.head) {
        const h = tracking.head, neck = bone("neck"), head = bone("head");
        if (neck) {
          neck.rotation.x = h.x * 0.4;
          neck.rotation.y = h.y * 0.4;
          neck.rotation.z = h.z * 0.4;
        }
        if (head) {
          head.rotation.x = h.x * 0.6;
          head.rotation.y = h.y * 0.6;
          head.rotation.z = h.z * 0.6;
        }
      }
      if (trunk && !action) {
        const sp = bone("spine"), ch = bone("chest"), uc = bone("upperChest");
        const parts = [[sp, 0.4], [ch, 0.35], [uc, 0.25]].filter(([b2]) => b2);
        const total = parts.reduce((s, [, w]) => s + w, 0) || 1;
        for (const [b2, w] of parts) {
          const f = w / total;
          b2.rotation.x += trunk.x * f;
          b2.rotation.y += trunk.y * f;
          b2.rotation.z += trunk.z * f;
        }
      }
      if (arms && !action) {
        for (const side of ["left", "right"]) {
          const s = arms[side], upper = bone(side + "UpperArm"), lower = bone(side + "LowerArm");
          if (!s || !upper) continue;
          upper.quaternion.set(s.upper[0], s.upper[1], s.upper[2], s.upper[3]);
          if (lower) lower.quaternion.set(s.lower[0], s.lower[1], s.lower[2], s.lower[3]);
          for (const [finger, cap] of Object.entries(FINGER_BONES)) {
            const curl = ((_a = s.fingers) == null ? void 0 : _a[finger]) || 0;
            for (const [joint, limit] of cap) {
              const b2 = bone(side + joint);
              if (b2) b2.rotation.z = (side === "left" ? -1 : 1) * curl * limit;
            }
          }
        }
      }
      if (action) {
        const age = elapsed - action.start, fade = Math.min(age / 0.3, (action.duration - age) / 0.3, 1);
        if (age >= action.duration) action = null;
        else if (action.id === "builtin:wave") {
          if (bone("rightUpperArm")) bone("rightUpperArm").rotation.z = 1.15 - 2.4 * Math.max(0, fade);
          if (bone("rightLowerArm")) bone("rightLowerArm").rotation.z = (-0.5 + Math.sin(age * 12) * 0.35) * Math.max(0, fade);
        } else if (bone("head")) bone("head").rotation.x = Math.sin(age * 8) * 0.2 * Math.max(0, fade);
      }
    }
    if (vrm == null ? void 0 : vrm.expressionManager) {
      for (const expression of vrm.expressionManager.expressions) {
        const key = expression.expressionName;
        let value = manual[key] || 0;
        if (key === "aa") value = Math.max(value, speech);
        if (key === "aa" && mouthAssist > 0) value = Math.max(value, mouthAssist);
        if (visemes && key in visemes) value = Math.max(value, visemes[key]);
        if ((tracking == null ? void 0 : tracking.expressions) && key in tracking.expressions) value = Math.max(value, tracking.expressions[key]);
        if (key === "blink" && idle && !tracking && !manual.blinkLeft && !manual.blinkRight) {
          const blinkPhase = elapsed % 4.6;
          if (blinkPhase > 4.35) value = Math.max(value, Math.sin((blinkPhase - 4.35) / 0.25 * Math.PI));
        }
        vrm.expressionManager.setValue(key, bounded(value));
      }
    }
    mixer == null ? void 0 : mixer.update(dt);
    vrm == null ? void 0 : vrm.update(dt);
    if (morphRefs && (tracking == null ? void 0 : tracking.expressions)) {
      for (const [key, refs] of Object.entries(morphRefs)) {
        const v = bounded(tracking.expressions[key]);
        if (v > 0.02) for (const { mesh, index } of refs) mesh.morphTargetInfluences[index] = Math.max(mesh.morphTargetInfluences[index] || 0, v * 0.85);
      }
    }
    controls.update();
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);
  function dispose() {
    if (disposed) return;
    disposed = true;
    generation++;
    cancelAnimationFrame(raf);
    observer.disconnect();
    controls.dispose();
    dropModel();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }
  const finiteOr0 = (v) => Number.isFinite(v) ? v : 0;
  function setFraming(mode) {
    framing = mode === "full" ? "full" : "bust";
    cameraPose = framing === "bust" && poses.bust || poses.full || cameraPose;
    resetCamera();
  }
  function faceSupport() {
    var _a, _b;
    const has = (k) => {
      var _a2;
      return !!((_a2 = morphRefs == null ? void 0 : morphRefs[k]) == null ? void 0 : _a2.length);
    };
    const presets = new Set(((_b = (_a = vrm == null ? void 0 : vrm.expressionManager) == null ? void 0 : _a.expressions) == null ? void 0 : _b.map((e2) => e2.expressionName)) || []);
    return { brows: has("browUp") || has("browDown"), tongue: has("tongue"), bored: presets.has("relaxed"), smile: presets.has("happy"), mouth: presets.has("aa") };
  }
  function setArms(frame2) {
    if (!frame2) {
      arms = null;
      trunk = null;
      return;
    }
    const ok = (a2) => Array.isArray(a2) && a2.length === 4 && a2.every(Number.isFinite);
    const side = (s) => s && ok(s.upper) && ok(s.lower) ? { upper: s.upper, lower: s.lower, fingers: s.fingers || {} } : null;
    arms = { left: side(frame2.left), right: side(frame2.right) };
    const tz = frame2.torso && [frame2.torso.x, frame2.torso.y, frame2.torso.z].every(Number.isFinite) ? frame2.torso : null;
    trunk = tz ? { x: tz.x, y: tz.y, z: tz.z } : null;
    if (!arms.left && !arms.right) arms = null;
  }
  function setTracking(frame2) {
    if (!frame2 || !frame2.head && !frame2.expressions) {
      tracking = null;
      return;
    }
    const head = frame2.head ? { x: finiteOr0(frame2.head.x), y: finiteOr0(frame2.head.y), z: finiteOr0(frame2.head.z) } : null;
    const expressions = frame2.expressions ? Object.fromEntries(Object.entries(frame2.expressions).map(([k, v]) => [k, bounded(v)])) : null;
    tracking = { head, expressions };
  }
  function setVisemes(values) {
    visemes = values ? Object.fromEntries(Object.entries(values).map(([k, v]) => [k, bounded(v)])) : null;
  }
  return { load, playAction, stopAction, isActionPlaying: () => !!action || !!clipAction, setIdle: (value) => {
    idle = !!value;
  }, setExpression: (key, value) => {
    manual[key] = bounded(value);
  }, setSpeechLevel: (value) => {
    speech = bounded(value);
  }, setQuality, setTracking, setArms, setMouthAssist: (value) => {
    mouthAssist = bounded(value);
  }, setVisemes, setFraming, faceSupport, resetCamera, dispose };
}
const FINGER_BONES = {
  index: [["IndexProximal", 1.4], ["IndexIntermediate", 1.7], ["IndexDistal", 1.1]],
  middle: [["MiddleProximal", 1.4], ["MiddleIntermediate", 1.7], ["MiddleDistal", 1.1]],
  ring: [["RingProximal", 1.4], ["RingIntermediate", 1.7], ["RingDistal", 1.1]],
  pinky: [["LittleProximal", 1.4], ["LittleIntermediate", 1.7], ["LittleDistal", 1.1]]
};
const MORPH_NAMES = {
  browUp: ["Fcl_BRW_Surprised", "eye_brow_up"],
  browDown: ["Fcl_BRW_Angry", "eye_brow_down"],
  browInner: ["Fcl_BRW_Sorrow"],
  tongue: ["tongue_out", "tongueOut", "Fcl_MTH_Tongue", "mouth_tongue"]
};
function resolveMorphs(root) {
  const out = {};
  root.traverse((o) => {
    const dict = o.isMesh && o.morphTargetDictionary;
    if (!dict || !o.morphTargetInfluences) return;
    const lower = Object.fromEntries(Object.entries(dict).map(([k, i]) => [k.split(".").pop().toLowerCase(), i]));
    for (const [key, names] of Object.entries(MORPH_NAMES)) {
      for (const name of names) {
        const i = lower[name.toLowerCase()];
        if (i !== void 0) {
          (out[key] || (out[key] = [])).push({ mesh: o, index: i });
          break;
        }
      }
    }
  });
  return out;
}
function release(root) {
  var _a;
  const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set(), textures = /* @__PURE__ */ new Set(), bitmaps = /* @__PURE__ */ new Set(), skeletons = /* @__PURE__ */ new Set();
  root.traverse((object) => {
    var _a2;
    if (object.geometry) geometries.add(object.geometry);
    if (object.skeleton) skeletons.add(object.skeleton);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if (!material) continue;
      materials.add(material);
      for (const value of Object.values(material)) if (value == null ? void 0 : value.isTexture) textures.add(value);
      for (const uniform of Object.values(material.uniforms || {})) if ((_a2 = uniform == null ? void 0 : uniform.value) == null ? void 0 : _a2.isTexture) textures.add(uniform.value);
    }
  });
  for (const texture of textures) {
    if ((_a = texture.image) == null ? void 0 : _a.close) bitmaps.add(texture.image);
    texture.dispose();
  }
  for (const bitmap of bitmaps) bitmap.close();
  for (const skeleton of skeletons) skeleton.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}
export {
  C as CAMERA_MESSAGES,
  a as CAMERA_TEXT,
  b as CameraControl,
  TIERS,
  TIER_SETTINGS,
  chooseTier,
  createAvatar3DViewer,
  c as createCameraTracker,
  d as createMicLevel,
  e as createMouthAssist,
  readSavedTier,
  resolveTier,
  runQuickBench,
  saveTier,
  tierLabel
};
