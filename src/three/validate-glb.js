// Preflight before GLTFLoader allocates textures/GPU resources. Local, embedded assets only.
export const MAX_MODEL_BYTES = 32 * 1024 * 1024;
const MAX_TRIANGLES = 300000;
const fail = (message) => { throw new Error(message); };

export function inspectGLB(buffer) {
  if (!(buffer instanceof ArrayBuffer) || buffer.byteLength < 28) fail('Arquivo 3D inválido. Escolha um GLB ou VRM completo.');
  if (buffer.byteLength > MAX_MODEL_BYTES) fail('O modelo ultrapassa o limite de 32 MB.');
  const view = new DataView(buffer);
  if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== buffer.byteLength) fail('Formato inválido: é necessário GLB 2.0 ou VRM.');
  let offset = 12, json, binary;
  while (offset < buffer.byteLength) {
    if (offset + 8 > buffer.byteLength) fail('Arquivo 3D incompleto.');
    const length = view.getUint32(offset, true), type = view.getUint32(offset + 4, true);
    if (length % 4 || offset + 8 + length > buffer.byteLength) fail('Arquivo 3D incompleto.');
    if (offset === 12 && type !== 0x4e4f534a) fail('Manifesto GLB ausente.');
    if (type === 0x4e4f534a) {
      if (json || length > 4 * 1024 * 1024) fail('Manifesto 3D inválido ou muito grande.');
      try { json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, offset + 8, length))); }
      catch { fail('Manifesto 3D inválido.'); }
    } else if (type === 0x004e4942) {
      if (binary) fail('Arquivo com buffers duplicados.');
      binary = new Uint8Array(buffer, offset + 8, length);
    }
    offset += length + 8;
  }
  if (!json || !binary || json.asset?.version !== '2.0') fail('Modelo sem geometria incorporada.');
  for (const key of ['buffers','bufferViews','accessors','images','textures','materials','meshes','nodes','skins','animations','scenes']) {
    if (json[key] !== undefined && !Array.isArray(json[key])) fail('Estrutura do modelo inválida.');
  }
  if (json.buffers?.length !== 1 || json.buffers[0].uri !== undefined || json.buffers[0].byteLength > binary.length) fail('Use um GLB com todos os recursos incorporados, sem arquivos externos.');
  if ((json.nodes?.length || 0) > 4096 || (json.meshes?.length || 0) > 256 || (json.materials?.length || 0) > 128 || (json.textures?.length || 0) > 64 || (json.images?.length || 0) > 32 || (json.animations?.length || 0) > 64) fail('Modelo complexo demais para esta prévia.');
  const supported = new Set(['VRMC_vrm','VRMC_materials_mtoon','VRMC_springBone','VRMC_node_constraint','VRMC_materials_hdr_emissiveMultiplier','KHR_materials_unlit','KHR_texture_transform','KHR_materials_emissive_strength','KHR_materials_clearcoat','KHR_materials_ior','KHR_materials_specular','KHR_materials_transmission','KHR_materials_volume','KHR_materials_sheen']);
  if ((json.extensionsRequired || []).some((name) => !supported.has(name))) fail('O modelo usa uma extensão ainda não suportada. Exporte GLB/VRM sem compressão Draco ou KTX.');
  for (const b of json.bufferViews || []) {
    if (b.buffer !== 0 || !Number.isInteger(b.byteLength) || b.byteLength < 0 || !Number.isInteger(b.byteOffset ?? 0) || (b.byteOffset ?? 0) < 0 || (b.byteOffset ?? 0) + b.byteLength > binary.length) fail('Buffer de geometria inválido.');
  }
  let textureBytes = 0;
  for (const img of json.images || []) {
    if (img.uri !== undefined || !Number.isInteger(img.bufferView)) fail('Texturas externas não são permitidas. Exporte todas dentro do GLB.');
    const b = json.bufferViews?.[img.bufferView];
    if (!b) fail('Textura inválida.');
    const bytes = binary.subarray(b.byteOffset || 0, (b.byteOffset || 0) + b.byteLength);
    const size = imageSize(bytes, img.mimeType);
    if (!size || size.some((n) => !n || n > 4096)) fail('Use texturas PNG/JPEG de até 4096 pixels.');
    textureBytes += size[0] * size[1] * 4 * 4 / 3;
    if (textureBytes > 128 * 1024 * 1024) fail('As texturas ultrapassam o orçamento de memória da prévia.');
  }
  let triangles = 0, vertices = 0, accessorBytes = 0;
  const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
  const componentBytes = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
  for (const a of json.accessors || []) {
    if (!Number.isInteger(a.count) || a.count < 0 || a.count > 2000000) fail('Geometria excessiva ou inválida.');
    if (!components[a.type] || !componentBytes[a.componentType]) fail('Tipo de geometria inválido.');
    accessorBytes += a.count * components[a.type] * componentBytes[a.componentType];
    if (accessorBytes > 64 * 1024 * 1024) fail('Geometria e expressões ultrapassam o orçamento de memória.');
  }
  for (const [meshIndex, mesh] of (json.meshes || []).entries()) {
    const instances = Math.max(1, (json.nodes || []).filter((n) => n.mesh === meshIndex).length);
    if (!Array.isArray(mesh.primitives) || mesh.primitives.length > 64) fail('Malha inválida.');
    for (const p of mesh.primitives) {
      if ((p.targets?.length || 0) > 128) fail('Expressões em excesso.');
      const count = json.accessors?.[p.attributes?.POSITION]?.count || 0;
      vertices += count * instances;
      if ((p.mode ?? 4) !== 4) fail('A prévia aceita malhas trianguladas.');
      triangles += (json.accessors?.[p.indices]?.count ?? count) / 3 * instances;
      if (triangles > MAX_TRIANGLES || vertices > 1000000) fail('Simplifique o modelo para até 300 mil triângulos.');
    }
  }
  if (!triangles) fail('O arquivo não contém uma malha visível.');
  // glTF nodes form disjoint trees. Repeated parents can otherwise expand
  // into an exponential clone graph inside loaders despite small JSON input.
  const parents = new Set();
  for (const node of json.nodes || []) {
    if (node.extensions?.EXT_mesh_gpu_instancing) fail('Instâncias GPU ainda não são suportadas nesta prévia.');
    if (node.children !== undefined && !Array.isArray(node.children)) fail('Hierarquia inválida.');
    for (const child of node.children || []) {
      if (parents.has(child)) fail('Um nó não pode ter múltiplos pais.');
      parents.add(child);
    }
  }
  for (const scene of json.scenes || []) {
    if (!Array.isArray(scene.nodes) || new Set(scene.nodes).size !== scene.nodes.length || scene.nodes.some((i) => parents.has(i) || !Number.isInteger(i) || !json.nodes?.[i])) fail('Raízes de cena inválidas.');
  }
  const state = new Map();
  function visit(i, depth = 0) {
    if (!Number.isInteger(i) || !json.nodes?.[i] || state.get(i) === 1 || depth > 256) fail('Hierarquia de ossos/nós inválida.');
    if (state.get(i) === 2) return;
    state.set(i, 1);
    const children = json.nodes[i].children || [];
    if (!Array.isArray(children)) fail('Hierarquia inválida.');
    for (const child of children) visit(child, depth + 1);
    state.set(i, 2);
  }
  (json.nodes || []).forEach((_, i) => visit(i));
  for (const skin of json.skins || []) if (!Array.isArray(skin.joints) || skin.joints.length > 256) fail('Esqueleto inválido ou excessivo.');
  return { json, triangles: Math.ceil(triangles), meshes: json.meshes.length };
}

function imageSize(bytes, mime) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (mime === 'image/png' && bytes.length >= 24 && v.getUint32(0) === 0x89504e47 && v.getUint32(4) === 0x0d0a1a0a) return [v.getUint32(16), v.getUint32(20)];
  if (mime !== 'image/jpeg' || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  let p = 2;
  while (p + 4 <= bytes.length) {
    if (bytes[p] !== 0xff) return null;
    const marker = bytes[p + 1]; p += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0xff) { p -= 1; continue; }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const len = v.getUint16(p);
    if (len < 2 || p + len > bytes.length) return null;
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker) && len >= 7) return [v.getUint16(p + 5), v.getUint16(p + 3)];
    p += len;
  }
  return null;
}
