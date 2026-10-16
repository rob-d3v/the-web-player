// Browser-side measurements for quality.js. Short (about 1.5 s) and cancellable. Nothing leaves the device.
// Measures: WebGL availability / software renderer, frame rate of a real WebGL draw loop, memory and cores, and optionally model load time.
import { chooseTier } from './quality.js';

const SOFTWARE = /swiftshader|llvmpipe|software|softpipe|microsoft basic render/i;

/**
 * Instant GPU probe (no drawing, a few ms): what the 3D can count on before anything heavy is downloaded.
 * caveat = the browser refuses a "fast" context (failIfMajorPerformanceCaveat): GPU blocklisted or software only.
 */
export function probeGPU({ document: doc = globalThis.document, nav = globalThis.navigator } = {}) {
  const out = { webgl: false, webgl2: false, softwareRenderer: false, caveat: false, renderer: '', vendor: '', maxTextureSize: null, memoryGB: nav?.deviceMemory ?? null, cores: nav?.hardwareConcurrency ?? null };
  try {
    const canvas = doc.createElement('canvas'); canvas.width = 8; canvas.height = 8;
    const gl2 = canvas.getContext('webgl2');
    const gl = gl2 || canvas.getContext('webgl');
    if (!gl) return out;
    out.webgl = true; out.webgl2 = !!gl2;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    out.renderer = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || '');
    out.vendor = String(ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR) || '');
    out.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || null;
    out.softwareRenderer = SOFTWARE.test(out.renderer);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const strict = doc.createElement('canvas'); strict.width = 8; strict.height = 8;
    const fast = strict.getContext(gl2 ? 'webgl2' : 'webgl', { failIfMajorPerformanceCaveat: true });
    out.caveat = !fast;
    fast?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch { /* a failed probe is reported as "unknown", never as a crash */ }
  return out;
}

export async function runQuickBench({ durationMs = 1500, document: doc = globalThis.document, nav = globalThis.navigator, perf = globalThis.performance, raf = globalThis.requestAnimationFrame } = {}) {
  const probe = probeGPU({ document: doc, nav });
  const out = { ...probe, fps: null, jsHeapMB: null };
  if (!probe.webgl) return out;
  try {
    const canvas = doc.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return out;
    // real draw work: a few hundred triangles with a fragment shader, per frame, for durationMs
    const vs = gl.createShader(gl.VERTEX_SHADER); gl.shaderSource(vs, 'attribute vec2 p; varying vec2 v; void main(){ v=p; gl_Position=vec4(p,0.,1.); }'); gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(fs, 'precision mediump float; varying vec2 v; uniform float t; void main(){ float a=0.; for(int i=0;i<24;i++){ a+=sin(v.x*float(i)+t)*cos(v.y*float(i)-t); } gl_FragColor=vec4(vec3(a*0.04+0.5),1.); }'); gl.compileShader(fs);
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tLoc = gl.getUniformLocation(prog, 't'); gl.viewport(0, 0, 512, 512);
    await new Promise((resolve) => {
      let frames = 0; const start = perf.now(); let first = null;
      const tick = (now) => {
        gl.uniform1f(tLoc, now / 1000); gl.drawArrays(gl.TRIANGLES, 0, 6); gl.finish?.();
        if (first === null) first = now; frames++;
        if (now - first >= durationMs) { out.fps = frames > 1 ? (frames - 1) / ((now - first) / 1000) : null; resolve(); } else raf(tick);
      };
      raf(tick); setTimeout(resolve, durationMs + 3000);
    });
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  } catch { /* a failed probe is reported as "unknown", never as a crash */ }
  try { out.jsHeapMB = perf.memory ? Math.round(perf.memory.usedJSHeapSize / 1048576) : null; } catch { /* not available */ }
  return out;
}

/**
 * Probe first, bench only when it can change the answer: no WebGL or a software GPU decide instantly (no 1.5 s wait).
 * @returns {Promise<{measurements: object, choice: ReturnType<typeof chooseTier>}>}
 */
export async function assessDevice(options = {}) {
  const probe = probeGPU(options);
  if (!probe.webgl || probe.softwareRenderer) return { measurements: { ...probe, fps: null, jsHeapMB: null }, choice: chooseTier(probe) };
  const measurements = await runQuickBench(options);
  return { measurements, choice: chooseTier(measurements) };
}
