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
