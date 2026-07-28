// v3.0 MARKET files are plain JSON: header carries all-zero HMAC/salt/IV and
// the body is never AES-encrypted, so no password is needed to open them.
// Mirrors the header walk in decryptAniaFile below.
export function isPlainMarketAnia(data) {
  try {
    const bytes = new Uint8Array(data);
    let offset = 0;
    const magic = String.fromCharCode(...bytes.slice(offset, offset + 4));
    offset += 4;
    if (magic !== 'ANIA') return false;
    const version = String.fromCharCode(...bytes.slice(offset, offset + 3));
    offset += 3;
    if (version !== '3.0') return false;
    const nextByte = bytes[offset];
    if (nextByte >= 97 && nextByte <= 122) {
      offset += 1;
    }
    // hmac(32) + salt(16) + iv(16) — all zeros only on MARKET files
    const header = bytes.slice(offset, offset + 64);
    if (header.length < 64) return false;
    return header.every((b) => b === 0);
  } catch {
    return false;
  }
}

// Magic bytes of every image format the player can hand to an <img>.
// WEBP is what the exporters write today; the others are tolerated so a future
// format change doesn't trip the compatibility check below.
const IMAGE_MAGICS = [
  { name: 'webp', test: (b) => ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP' },
  { name: 'png', test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { name: 'jpeg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { name: 'gif', test: (b) => ascii(b, 0, 4) === 'GIF8' },
];

function ascii(bytes, start, end) {
  return String.fromCharCode(...bytes.slice(start, end));
}

// Decode just the head of a base64 frame — enough for the magic bytes, without
// materialising a ~30 KB buffer per probe.
function headBytes(base64Frame) {
  const raw = String(base64Frame).replace(/^data:[^,]*,/, '');
  const head = raw.slice(0, 24);
  const bin =
    typeof atob === 'function'
      ? atob(head)
      : Buffer.from(head, 'base64').toString('latin1'); // node (tests/SSR)
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * Can this decoded avatar actually play in a BROWSER?
 *
 * A playable `.ania` stores every frame as a plain base64 image — that is what
 * the player bundle feeds straight into `img.src = "data:image/webp;base64," + frame`.
 * MARKETPLACE files ship frames that way, so they just work.
 *
 * A PERSONAL/licensed export does NOT. Its frames stay AES-encrypted inside the
 * file and only the DESKTOP AniaPlayer can unlock them: it calls the license
 * server with a hardware id + client IP to fetch the per-file decrypt key. The
 * browser has no such key and no hardware id to bind, so every frame decode
 * fails and the player floods the console with `Erro ao carregar frame N` — one
 * per frame, on every animation tick — while the canvas stays blank. Same file,
 * same password: opens fine on desktop, never in the web player.
 *
 * Detect it up front so the host gets ONE explicit error instead of an endless
 * error loop with no cause attached.
 *
 * @param {object} avatarData decrypted `.ania` payload
 * @returns {{ playable: boolean, reason: string|null, licenseType: string|null,
 *             frameCount: number, frameFormat: string|null }}
 */
export function inspectAvatarFrames(avatarData) {
  var _a, _b;
  const licenseType = ((_a = avatarData == null ? void 0 : avatarData.license) == null ? void 0 : _a.type) || null;
  const frames = (_b = avatarData == null ? void 0 : avatarData.video) == null ? void 0 : _b.frames;
  const base = { licenseType, frameCount: Array.isArray(frames) ? frames.length : 0, frameFormat: null };

  if (!Array.isArray(frames) || frames.length === 0) {
    return { ...base, playable: false, reason: 'no-frames' };
  }
  const first = frames.find((f) => typeof f === 'string' && f.length > 0);
  if (!first) {
    return { ...base, playable: false, reason: 'no-frames' };
  }

  let head;
  try {
    head = headBytes(first);
  } catch {
    return { ...base, playable: false, reason: 'encrypted-frames' };
  }
  const match = IMAGE_MAGICS.find((m) => m.test(head));
  if (match) {
    return { ...base, playable: true, reason: null, frameFormat: match.name };
  }
  // Frame decoded from base64 but carries no image signature → ciphertext.
  return { ...base, playable: false, reason: 'encrypted-frames' };
}

export async function decryptAniaFile(encryptedData, password) {
  var _a, _b;
  try {
    let bytes = new Uint8Array(encryptedData);
    let offset = 0;
    const magic = String.fromCharCode(...bytes.slice(offset, offset + 4));
    offset += 4;
    if (magic !== "ANIA") throw new Error("Invalid file - magic: " + magic);
    const version = String.fromCharCode(...bytes.slice(offset, offset + 3));
    offset += 3;
    if (!["1.0", "2.0", "3.0"].includes(version)) throw new Error("Unsupported version: " + version);
    const nextByte = bytes[offset];
    if (nextByte >= 97 && nextByte <= 122) {
      offset += 1;
    }

    if (version === "3.0") {
      const hmac = bytes.slice(offset, offset + 32);
      offset += 32;
      const salt = bytes.slice(offset, offset + 16);
      offset += 16;
      const iv = bytes.slice(offset, offset + 16);
      offset += 16;
      let ciphertext = bytes.slice(offset);

      const isAllZeros = (arr) => arr.every(b => b === 0);
      const isMarketAvatar = isAllZeros(hmac) && isAllZeros(salt) && isAllZeros(iv);

      if (isMarketAvatar) {
        const LICENSE_START = "<<<ANIA_LICENSE>>>";
        let dataStr = new TextDecoder("utf-8").decode(ciphertext);

        const startIdx = dataStr.lastIndexOf(LICENSE_START);
        if (startIdx > 0) {
          dataStr = dataStr.substring(0, startIdx);
        }

        let jsonString = dataStr;
        const jsonData = JSON.parse(jsonString);
        return jsonData;
      }

      const passwordKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 1e5,
          hash: "SHA-256"
        },
        passwordKey,
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
      );
      let decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);

      const decryptedBytes = new Uint8Array(decryptedBuffer);
      const metadataLen = (decryptedBytes[0] << 24) | (decryptedBytes[1] << 16) | (decryptedBytes[2] << 8) | decryptedBytes[3];
      const dataStart = 4 + metadataLen;
      const jsonBytes = decryptedBytes.slice(dataStart);

      const jsonString = new TextDecoder("utf-8").decode(jsonBytes);
      const jsonData = JSON.parse(jsonString);
      return jsonData;
    }

    const salt = bytes.slice(offset, offset + 16);
    offset += 16;
    const iv = bytes.slice(offset, offset + 16);
    offset += 16;
    const ciphertext = bytes.slice(offset);
    bytes = null;
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 1e5,
        hash: "SHA-256"
      },
      passwordKey,
      { name: "AES-CBC", length: 256 },
      false,
      ["decrypt"]
    );
    let decryptedBuffer;
    try {
      decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv
        },
        key,
        ciphertext
      );
    } catch (decryptError) {
      throw new Error(`Decryption failed (${decryptError.name}): Check password`);
    }
    const jsonString = new TextDecoder("utf-8").decode(decryptedBuffer);
    if (!jsonString || jsonString.length < 10) {
      throw new Error("Decryption resulted in empty data - wrong password?");
    }
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  } catch (err) {
    throw err;
  }
}
