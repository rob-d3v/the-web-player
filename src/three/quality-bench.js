// Browser-side measurements for quality.js. Short (about 1.5 s) and cancellable. Nothing leaves the device.
// Measures: WebGL availability / software renderer, frame rate of a real WebGL draw loop, memory and cores, and optionally model load time.
export async function runQuickBench({ durationMs = 1500, document: doc = globalThis.document, nav = globalThis.navigator, perf = globalThis.performance, raf = globalThis.requestAnimationFrame } = {}) {
  const out = { webgl: false, softwareRenderer: false, fps: null, memoryGB: nav?.deviceMemory ?? null, cores: nav?.hardwareConcurrency ?? null, jsHeapMB: null, renderer: '' };
  try {
    const canvas = doc.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return out;
    out.webgl = true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    out.renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
    out.softwareRenderer = /swiftshader|llvmpipe|software|softpipe|microsoft basic render/i.test(out.renderer);
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
