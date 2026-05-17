import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, createElement, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import * as ort from "onnxruntime-web";
import { FetchProvider, PiperWebEngine, OnnxWebRuntime } from "piper-tts-web";
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Maximize2 = createLucideIcon("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MicOff = createLucideIcon("MicOff", [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mic = createLucideIcon("Mic", [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Minimize2 = createLucideIcon("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Paperclip = createLucideIcon("Paperclip", [
  [
    "path",
    {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      key: "1u3ebp"
    }
  ]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Volume2 = createLucideIcon("Volume2", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const THEMES = {
  dark: {
    background: "rgba(15, 23, 42, 0.95)",
    textPrimary: "#ffffff",
    textSecondary: "#cbd5e1",
    controlBg: "rgba(0, 0, 0, 0.3)",
    controlHover: "rgba(0, 0, 0, 0.5)"
  },
  light: {
    background: "rgba(248, 250, 252, 0.95)",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    controlBg: "rgba(255, 255, 255, 0.5)",
    controlHover: "rgba(255, 255, 255, 0.8)"
  },
  blue: {
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#dbeafe",
    controlBg: "rgba(255, 255, 255, 0.2)",
    controlHover: "rgba(255, 255, 255, 0.3)"
  },
  purple: {
    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#e9d5ff",
    controlBg: "rgba(255, 255, 255, 0.2)",
    controlHover: "rgba(255, 255, 255, 0.3)"
  }
};
async function decryptAniaFile(encryptedData, password) {
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
      const salt2 = bytes.slice(offset, offset + 16);
      offset += 16;
      const iv2 = bytes.slice(offset, offset + 16);
      offset += 16;
      let ciphertext2 = bytes.slice(offset);
      const isAllZeros = (arr) => arr.every((b) => b === 0);
      const isMarketAvatar = isAllZeros(hmac) && isAllZeros(salt2) && isAllZeros(iv2);
      if (isMarketAvatar) {
        const LICENSE_START = "<<<ANIA_LICENSE>>>";
        let dataStr = new TextDecoder("utf-8").decode(ciphertext2);
        const startIdx = dataStr.lastIndexOf(LICENSE_START);
        if (startIdx > 0) {
          dataStr = dataStr.substring(0, startIdx);
        }
        let jsonString3 = dataStr;
        const jsonData3 = JSON.parse(jsonString3);
        return jsonData3;
      }
      const passwordKey2 = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      const key2 = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt2,
          iterations: 1e5,
          hash: "SHA-256"
        },
        passwordKey2,
        { name: "AES-CBC", length: 256 },
        false,
        ["decrypt"]
      );
      let decryptedBuffer2 = await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv2 }, key2, ciphertext2);
      const decryptedBytes = new Uint8Array(decryptedBuffer2);
      const metadataLen = decryptedBytes[0] << 24 | decryptedBytes[1] << 16 | decryptedBytes[2] << 8 | decryptedBytes[3];
      const dataStart = 4 + metadataLen;
      const jsonBytes = decryptedBytes.slice(dataStart);
      const jsonString2 = new TextDecoder("utf-8").decode(jsonBytes);
      const jsonData2 = JSON.parse(jsonString2);
      return jsonData2;
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
const calculateOptimalSpeeds = (fps) => {
  if (!fps || fps <= 0) {
    return { idle: 1, talk: 1 };
  }
  const idleSpeed = Math.max(0.5, Math.min(10, fps / 10));
  const talkSpeed = Math.max(1, Math.min(10, fps / 5));
  return {
    idle: parseFloat(idleSpeed.toFixed(1)),
    talk: parseFloat(talkSpeed.toFixed(1))
  };
};
const DB_NAME = "ania-avatar-cache";
const DB_VERSION = 1;
const STORE_NAME = "avatars";
const CACHE_EXPIRY_DAYS = 7;
let db = null;
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => {
      resolve(null);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "url" });
      }
    };
  });
};
const hashUrl = (url) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};
const getCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return null;
    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);
      request.onerror = () => {
        resolve(null);
      };
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }
        const now = Date.now();
        const cacheAge = now - result.timestamp;
        const maxAge = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1e3;
        if (cacheAge > maxAge) {
          deleteCachedAvatar(url);
          resolve(null);
          return;
        }
        resolve(result.data);
      };
    });
  } catch (err) {
    return null;
  }
};
const setCachedAvatar = async (url, data, isEncrypted = false) => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const cacheEntry = {
      url,
      data,
      isEncrypted,
      timestamp: Date.now(),
      hash: hashUrl(url)
    };
    store.put(cacheEntry);
  } catch (err) {
  }
};
const deleteCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(url);
  } catch (err) {
  }
};
const clearAvatarCache = async () => {
  try {
    const database = await initDB();
    if (!database) return;
    const transaction = database.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
  }
};
const getCacheStats = async () => {
  try {
    const database = await initDB();
    if (!database) return { count: 0, size: 0 };
    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => {
        const entries = request.result || [];
        let totalSize = 0;
        entries.forEach((entry) => {
          if (entry.data instanceof ArrayBuffer) {
            totalSize += entry.data.byteLength;
          } else if (typeof entry.data === "object") {
            totalSize += JSON.stringify(entry.data).length;
          }
        });
        resolve({
          count: entries.length,
          size: totalSize,
          sizeFormatted: formatBytes(totalSize)
        });
      };
      request.onerror = () => {
        resolve({ count: 0, size: 0 });
      };
    });
  } catch (err) {
    return { count: 0, size: 0 };
  }
};
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const fetchLipSyncConfig = async (serverUrl, contentHash) => {
  try {
    const url = `${serverUrl}/api/avatars/json-config/fetch?contentHash=${encodeURIComponent(contentHash)}&type=lips_sync`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.found || !data.jsonData) return null;
    return data.jsonData;
  } catch (err) {
    console.warn("[LipSyncAPI] Failed to fetch config:", err);
    return null;
  }
};
const buildOpennessMap = (keyframes, talkLow, talkHigh) => {
  const talkSpan = talkHigh - talkLow;
  if (talkSpan <= 0 || !keyframes || keyframes.length === 0) return [];
  const n = talkSpan + 1;
  const result = new Array(n).fill(0.5);
  const sortedKf = [...keyframes].sort((a, b) => a[0] - b[0]);
  let kfRel = sortedKf.map(([idx, val]) => [
    Math.max(0, Math.min(talkSpan, Math.floor(idx) - talkLow)),
    parseFloat(val)
  ]);
  if (kfRel[0][0] > 0) {
    kfRel = [[0, kfRel[0][1]], ...kfRel];
  }
  if (kfRel[kfRel.length - 1][0] < talkSpan) {
    kfRel = [...kfRel, [talkSpan, kfRel[kfRel.length - 1][1]]];
  }
  for (let i = 0; i < kfRel.length - 1; i++) {
    const [i0, v0] = kfRel[i];
    const [i1, v1] = kfRel[i + 1];
    const span = Math.max(1, i1 - i0);
    for (let j = i0; j <= i1; j++) {
      const t = (j - i0) / span;
      result[j] = v0 + (v1 - v0) * t;
    }
  }
  return result;
};
const AniaAvatar = ({
  avatarUrl,
  avatarPassword,
  avatarData: externalAvatarData,
  authToken,
  position = "bottom-left",
  width = 300,
  height = 300,
  transparent = false,
  theme = "dark",
  minimizable = true,
  closable = true,
  detectAudio = false,
  idleSpeed = 1,
  talkSpeed = 1,
  autoCalculateSpeed = true,
  startMinimized = false,
  preserveQuality = true,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  // Mobile-friendly props
  mobileMinimizedSize = 60,
  draggable = true,
  mobileBreakpoint = 768,
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  onActionStart,
  onActionEnd,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Lip sync audio hookup
  lipSyncAudioRef = null,
  lipSyncHook = null,
  onLoad,
  onTalkStart,
  onTalkEnd,
  onClose,
  onToggleMinimize,
  children
}) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isLoadingRef = useRef(false);
  const canvasObserverRef = useRef(null);
  const styleTagRef = useRef(null);
  const enforcingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(startMinimized);
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(null);
  const [isTalking, setIsTalking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const outerContainerRef = useRef(null);
  const hasDraggedRef = useRef(false);
  useEffect(() => {
    setIsMinimized(startMinimized);
  }, [startMinimized]);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);
  useEffect(() => {
    const id = "ania-pulse-keyframes";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = "@keyframes ania-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }";
      document.head.appendChild(style);
    }
  }, []);
  useEffect(() => {
    if (!isMinimized) {
      setDragPosition(null);
    }
  }, [isMinimized]);
  const handleDragStart = (e) => {
    var _a;
    if (!draggable || !isMinimized) return;
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    const touch = ((_a = e.touches) == null ? void 0 : _a[0]) || e;
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    if (outerContainerRef.current) {
      const rect = outerContainerRef.current.getBoundingClientRect();
      positionStartRef.current = { x: rect.left, y: rect.top };
    }
  };
  const handleDragMove = (e) => {
    var _a;
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const touch = ((_a = e.touches) == null ? void 0 : _a[0]) || e;
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }
    let newX = positionStartRef.current.x + deltaX;
    let newY = positionStartRef.current.y + deltaY;
    const size = isMobile ? mobileMinimizedSize : Math.floor(width / 2);
    newX = Math.max(0, Math.min(window.innerWidth - size, newX));
    newY = Math.max(0, Math.min(window.innerHeight - size, newY));
    setDragPosition({ x: newX, y: newY });
  };
  const handleDragEnd = (e) => {
    if (isDraggingRef.current) {
      e == null ? void 0 : e.preventDefault();
      e == null ? void 0 : e.stopPropagation();
      if (!hasDraggedRef.current && minimizable) {
        hasDraggedRef.current = true;
        toggleMinimize();
      }
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };
  useEffect(() => {
    if (!draggable || !isMinimized) return;
    const moveHandler = (e) => handleDragMove(e);
    const endHandler = (e) => handleDragEnd(e);
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", endHandler);
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    return () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
    };
  }, [draggable, isMinimized, isMobile]);
  useEffect(() => {
    if (!detectAudio || !isLoaded || !playerRef.current) return;
    let isActive = true;
    const setupAudioDetection = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
        const destination = audioContext.destination;
        const source = audioContext.createMediaStreamDestination();
        analyser.connect(destination);
        const detectAudioLoop = () => {
          var _a;
          if (!analyserRef.current || !isActive) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const threshold = 10;
          const wasTalking = isTalking;
          const nowTalking = average > threshold;
          if (nowTalking !== wasTalking) {
            setIsTalking(nowTalking);
            if ((_a = playerRef.current) == null ? void 0 : _a.animationController) {
              playerRef.current.animationController.setTalkingState(nowTalking);
            }
            if (nowTalking && onTalkStart) {
              onTalkStart();
            } else if (!nowTalking && onTalkEnd) {
              onTalkEnd();
            }
          }
          animationFrameRef.current = requestAnimationFrame(detectAudioLoop);
        };
        const handleVisibilityForAudio = () => {
          if (!document.hidden && isActive && analyserRef.current) {
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            detectAudioLoop();
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityForAudio);
        detectAudioLoop();
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityForAudio);
        };
      } catch (err) {
        console.error("[AniaAvatar] Error setting up audio detection:", err);
      }
    };
    const cleanup = setupAudioDetection();
    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (cleanup && typeof cleanup.then === "function") {
        cleanup.then((cleanupFn) => cleanupFn && cleanupFn());
      }
    };
  }, [detectAudio, isLoaded, onTalkStart, onTalkEnd]);
  useEffect(() => {
    if (playerRef.current && playerRef.current.setTalkingState) {
      playerRef.current.setTalkingState(isTalking);
    }
  }, [isTalking]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && playerRef.current) {
        if (playerRef.current.play && typeof playerRef.current.play === "function") {
          try {
            playerRef.current.play();
          } catch (err) {
            console.error("[AniaAvatar] Error reactivating:", err);
          }
        }
        if (playerRef.current.animationController) {
          playerRef.current.animationController.setTalkingState(isTalking);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const keepaliveInterval = setInterval(() => {
      if (!document.hidden && playerRef.current && isLoaded) {
        if (playerRef.current.play && typeof playerRef.current.play === "function") {
          try {
            const canvas = playerRef.current.canvas;
            if (canvas && canvas.getContext) {
              const ctx = canvas.getContext("2d");
              if (ctx && playerRef.current.animationController) {
                playerRef.current.play();
              }
            }
          } catch (err) {
            console.warn("[AniaAvatar] Keepalive failed:", err);
          }
        }
      }
    }, 3e4);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(keepaliveInterval);
    };
  }, [isTalking, isLoaded]);
  useEffect(() => {
    const loadAvatar = async () => {
      var _c;
      console.log("[AniaAvatar] loadAvatar called", { isLoading: isLoadingRef.current, hasAniaPlayer: !!window.AniaPlayer, hasContainer: !!containerRef.current, hasPlayer: !!playerRef.current });
      if (isLoadingRef.current) {
        console.log("[AniaAvatar] Already loading, skipping");
        return;
      }
      if (!window.AniaPlayer) {
        console.error("[AniaAvatar] AniaPlayer not loaded on window");
        setError("AniaPlayer not loaded");
        return;
      }
      if (!containerRef.current) {
        console.warn("[AniaAvatar] containerRef.current is null, skipping");
        return;
      }
      if (playerRef.current) {
        console.log("[AniaAvatar] Player already exists, skipping");
        return;
      }
      isLoadingRef.current = true;
      performance.now();
      try {
        let avatarData;
        if (avatarUrl) {
          const fetchStart = performance.now();
          const cachedData = await getCachedAvatar(avatarUrl);
          if (cachedData) {
            if (avatarUrl.endsWith(".ania")) {
              avatarData = cachedData;
            } else {
              avatarData = cachedData;
            }
          } else {
            const fetchOptions = {
              cache: "force-cache"
            };
            if (authToken) {
              fetchOptions.headers = {
                "Authorization": `Bearer ${authToken}`
              };
            }
            const response = await fetch(avatarUrl, fetchOptions);
            if (!response.ok) {
              throw new Error(`Failed to load avatar: ${response.status} ${response.statusText}`);
            }
            if (avatarUrl.endsWith(".ania")) {
              if (avatarPassword === void 0 || avatarPassword === null) {
                throw new Error("Password required for encrypted .ania file");
              }
              const encryptedData = await response.arrayBuffer();
              avatarData = await decryptAniaFile(encryptedData, avatarPassword);
              await setCachedAvatar(avatarUrl, avatarData, true);
            } else {
              avatarData = await response.json();
              await setCachedAvatar(avatarUrl, avatarData, false);
            }
          }
        } else if (externalAvatarData) {
          avatarData = externalAvatarData;
        } else {
          throw new Error("No avatar source provided (avatarUrl or avatarData)");
        }
        const detectedFps = (_c = avatarData.video) == null ? void 0 : _c.fps;
        let finalIdleSpeed = idleSpeed;
        let finalTalkSpeed = talkSpeed;
        if (autoCalculateSpeed && detectedFps) {
          const optimalSpeeds = calculateOptimalSpeeds(detectedFps);
          finalIdleSpeed = optimalSpeeds.idle;
          finalTalkSpeed = optimalSpeeds.talk;
        }
        const PlayerClass = window.AniaPlayer.AniaPlayer || window.AniaPlayer.default || window.AniaPlayer;
        let canvasWidth = width;
        let canvasHeight = height;
        if (preserveQuality && avatarData.video) {
          if (avatarData.video.width && avatarData.video.height) {
            canvasWidth = avatarData.video.width;
            canvasHeight = avatarData.video.height;
          } else if (avatarData.video.frames && avatarData.video.frames.length > 0) {
            const img = new Image();
            img.src = `data:image/webp;base64,${avatarData.video.frames[0]}`;
            img.onload = () => {
              if (playerRef.current && playerRef.current.canvas) {
                playerRef.current.canvas.width = img.width;
                playerRef.current.canvas.height = img.height;
              }
            };
          }
        }
        if (!containerRef.current) {
          console.error("[AniaAvatar] containerRef became null after fetch!");
          isLoadingRef.current = false;
          return;
        }
        console.log("[AniaAvatar] Creating player with container:", containerRef.current, "size:", canvasWidth, "x", canvasHeight);
        const player = new PlayerClass(containerRef.current, {
          transparent: true,
          chroma_enabled: false,
          audio_enabled: false,
          width: canvasWidth,
          height: canvasHeight,
          auto_start: false
        });
        player.fileData = avatarData;
        player.canvas.width = canvasWidth;
        player.canvas.height = canvasHeight;
        player.canvas.style.position = "absolute";
        player.canvas.style.top = "0";
        player.canvas.style.left = "0";
        player.canvas.style.width = "100%";
        player.canvas.style.height = "100%";
        player.canvas.style.objectFit = isMinimized ? "cover" : "contain";
        player.canvas.style.display = "block";
        const animationConfig = {
          ...avatarData.animation,
          idle_range_low: Math.floor(avatarData.animation.idleRangeLowValue || 0),
          idle_range_high: Math.floor(avatarData.animation.idleRangeHighValue || 321),
          talk_range_low: Math.floor(avatarData.animation.talkRangeLowValue || 327),
          talk_range_high: Math.floor(avatarData.animation.talkRangeHighValue || 834),
          current_frame_index: avatarData.animation.currentFrameIndex || 0,
          frame_count: avatarData.video.frames.length,
          is_talking: false,
          is_transitioning: false,
          reverse_idle_selected: avatarData.animation.reverseIdleSelected || false,
          reverse_talk_selected: avatarData.animation.reverseTalkSelected || false,
          idle_speed_slider_value: finalIdleSpeed,
          talk_speed_slider_value: finalTalkSpeed,
          transition_speed_slider_value: avatarData.animation.transitionSpeedSliderValue || 0,
          idle_start_positions: avatarData.animation.idleStartPositions || [],
          talk_start_positions: avatarData.animation.talkStartPositions || []
        };
        const configState = {
          ...avatarData.config,
          idle_frame_duration: avatarData.config.idleFrameDuration || 50,
          talk_cycle_duration: avatarData.config.talkCycleDuration || 50,
          transition_duration: avatarData.config.transitionDuration || 10
        };
        const AnimationController = window.AniaPlayer.AnimationController;
        player.animationController = new AnimationController(
          animationConfig,
          configState,
          avatarData.video.frames.length
        );
        if (avatarData.actions && avatarData.actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(avatarData.actions);
        } else if (actions && actions.length > 0 && player.animationController.configureActions) {
          player.animationController.configureActions(actions);
        }
        if (lipSyncEnabled && lipSyncServerUrl && avatarData.contentHash) {
          fetchLipSyncConfig(lipSyncServerUrl, avatarData.contentHash).then((lipConfig) => {
            if (lipConfig && player.animationController.configureLipsSync) {
              const talkLow = Math.floor(avatarData.animation.talkRangeLowValue || 327);
              const talkHigh = Math.floor(avatarData.animation.talkRangeHighValue || 834);
              const openMap = lipConfig.lips_sync_keyframes ? buildOpennessMap(lipConfig.lips_sync_keyframes, talkLow, talkHigh) : null;
              player.animationController.configureLipsSync(
                true,
                lipConfig.lips_sync_sync_intensity || lipSyncIntensity,
                lipConfig.lips_sync_responsiveness || lipSyncResponsiveness,
                openMap,
                lipConfig.lips_sync_sustain_style || "wiggle",
                lipConfig.lips_sync_wiggle_speed || 5
              );
            }
          }).catch((err) => {
            console.warn("[AniaAvatar] Lip sync config fetch failed:", err);
          });
        }
        if (lipSyncHook && player.animationController) {
          const ctrl = player.animationController;
          ctrl.getAmplitudeFn = lipSyncHook.getAmplitude;
          ctrl.getSpectralOpennessFn = lipSyncHook.getSpectralOpenness;
          ctrl.getSpectralFluxFn = lipSyncHook.getSpectralFlux;
        }
        player.play();
        playerRef.current = player;
        setIsLoaded(true);
        isLoadingRef.current = false;
        console.log("[AniaAvatar] Avatar loaded successfully!");
        if (onLoad) {
          onLoad(player);
        }
        if (initialAction && player.animationController.triggerAction) {
          setTimeout(() => {
            player.animationController.triggerAction(initialAction);
            if (initialActionLoop) {
              player.animationController.onActionCompleteCallback = () => {
                var _a;
                if (initialActionLoop && ((_a = playerRef.current) == null ? void 0 : _a.animationController)) {
                  setTimeout(() => {
                    playerRef.current.animationController.triggerAction(initialAction);
                  }, 100);
                }
              };
            }
          }, 200);
        }
      } catch (err) {
        console.error("[AniaAvatar] Error loading avatar:", err);
        setError("Failed to load avatar: " + (err && err.message ? err.message : String(err)));
        isLoadingRef.current = false;
      }
    };
    console.log("[AniaAvatar] useEffect running, window.AniaPlayer:", !!window.AniaPlayer);
    if (window.AniaPlayer) {
      loadAvatar();
    } else {
      console.log("[AniaAvatar] Waiting for AniaPlayer script...");
      const checkInterval = setInterval(() => {
        if (window.AniaPlayer) {
          console.log("[AniaAvatar] AniaPlayer found after wait!");
          clearInterval(checkInterval);
          loadAvatar();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
    return () => {
      if (playerRef.current) {
        try {
          if (playerRef.current.stop) {
            playerRef.current.stop();
          }
          if (playerRef.current.animationController) {
            if (playerRef.current.animationController.cleanup) {
              playerRef.current.animationController.cleanup();
            }
            playerRef.current.animationController = null;
          }
          if (playerRef.current.canvas) {
            const ctx = playerRef.current.canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, playerRef.current.canvas.width, playerRef.current.canvas.height);
            }
            if (playerRef.current.canvas.parentNode) {
              playerRef.current.canvas.parentNode.removeChild(playerRef.current.canvas);
            }
          }
          playerRef.current.fileData = null;
          playerRef.current = null;
        } catch (err) {
          console.error("[AniaAvatar] Error cleaning up:", err);
        }
      }
      isLoadingRef.current = false;
    };
  }, [avatarUrl, avatarPassword, externalAvatarData, authToken, preserveQuality]);
  const getMobileSize = () => {
    if (isMobile && isMinimized) {
      return { width: mobileMinimizedSize, height: mobileMinimizedSize };
    }
    if (isMinimized) {
      return { width: Math.floor(width / 2), height: Math.floor(height / 2) };
    }
    return { width, height };
  };
  const currentDimensions = getMobileSize();
  const enforceCanvasStyles = useCallback(() => {
    var _a;
    if (enforcingRef.current) return;
    const canvas = (_a = playerRef.current) == null ? void 0 : _a.canvas;
    if (!canvas) return;
    enforcingRef.current = true;
    const s = canvas.style;
    if (isMinimized) {
      const displayW = Math.floor(width / 2);
      const displayH = Math.floor(height / 2);
      s.setProperty("position", "absolute", "important");
      s.setProperty("top", "50%", "important");
      s.setProperty("left", "50%", "important");
      s.setProperty("transform", "translate(-50%, -50%)", "important");
      s.setProperty("width", displayW + "px", "important");
      s.setProperty("height", displayH + "px", "important");
      s.setProperty("display", "block", "important");
      s.removeProperty("margin");
    } else {
      s.setProperty("position", "absolute", "important");
      s.setProperty("top", "0", "important");
      s.setProperty("left", "0", "important");
      s.setProperty("width", "100%", "important");
      s.setProperty("height", "100%", "important");
      s.setProperty("display", "block", "important");
      s.removeProperty("transform");
      s.removeProperty("margin");
    }
    enforcingRef.current = false;
  }, [isMinimized, width, height]);
  useEffect(() => {
    enforceCanvasStyles();
  }, [isMinimized, width, height, preserveQuality, isMobile, mobileMinimizedSize, isLoaded, enforceCanvasStyles]);
  useEffect(() => {
    var _a;
    if (!isLoaded || !((_a = playerRef.current) == null ? void 0 : _a.canvas)) return;
    const canvas = playerRef.current.canvas;
    if (!styleTagRef.current) {
      const style = document.createElement("style");
      style.setAttribute("data-ania-canvas-fix", "1");
      style.textContent = "[data-ania-canvas] canvas { display: block !important; }";
      document.head.appendChild(style);
      styleTagRef.current = style;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("data-ania-canvas", "1");
    }
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
    }
    canvasObserverRef.current = new MutationObserver(() => {
      enforceCanvasStyles();
    });
    canvasObserverRef.current.observe(canvas, { attributes: true, attributeFilter: ["style", "width", "height"] });
    return () => {
      if (canvasObserverRef.current) {
        canvasObserverRef.current.disconnect();
        canvasObserverRef.current = null;
      }
    };
  }, [isLoaded, enforceCanvasStyles]);
  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    if (onToggleMinimize) {
      onToggleMinimize(newMinimizedState);
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    if (canvasObserverRef.current) {
      canvasObserverRef.current.disconnect();
      canvasObserverRef.current = null;
    }
    if (styleTagRef.current && styleTagRef.current.parentNode) {
      styleTagRef.current.parentNode.removeChild(styleTagRef.current);
      styleTagRef.current = null;
    }
    if (playerRef.current) {
      if (playerRef.current.stop) {
        playerRef.current.stop();
      }
      playerRef.current = null;
    }
    if (onClose) {
      onClose();
    }
  };
  if (!isVisible) return null;
  const positionStyles = {
    "bottom-left": { bottom: "24px", left: "24px" },
    "bottom-right": { bottom: "24px", right: "24px" },
    "top-left": { top: "24px", left: "24px" },
    "top-right": { top: "24px", right: "24px" }
  };
  const currentWidth = currentDimensions.width;
  const currentHeight = currentDimensions.height;
  const currentTheme = THEMES[theme] || THEMES.dark;
  const isMobileMinimized = isMobile && isMinimized;
  const getContainerStyle = () => {
    const baseStyle = {
      position: "fixed",
      transition: "all 0.3s ease",
      ...!(dragPosition && isMinimized) ? positionStyles[position] : {},
      ...isMobileMinimized ? {
        borderRadius: "9999px",
        overflow: "hidden",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"
      } : {},
      width: isMinimized ? `${currentWidth}px` : `min(${currentWidth}px, calc(100vw - 24px))`,
      height: children ? "auto" : `${currentHeight}px`,
      maxWidth: isMinimized ? void 0 : "calc(100vw - 24px)",
      maxHeight: isMobileMinimized ? "none" : "calc(100vh - 24px)",
      pointerEvents: "auto",
      zIndex: alwaysOnTop ? 2147483647 : 9999,
      display: "flex",
      flexDirection: "column"
    };
    if (dragPosition && isMinimized) {
      return {
        ...baseStyle,
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
        transition: isDragging ? "none" : "all 0.3s ease",
        cursor: draggable ? isDragging ? "grabbing" : "grab" : "pointer",
        touchAction: "none"
      };
    }
    if (isMinimized && draggable && !isMobile) {
      return {
        ...baseStyle,
        cursor: "grab"
      };
    }
    return baseStyle;
  };
  const handleContainerClick = (e) => {
    if (isDragging || hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
      return;
    }
    if (minimizable) {
      toggleMinimize();
    }
  };
  const avatarNode = jsx(
    "div",
    {
      ref: outerContainerRef,
      style: getContainerStyle(),
      onTouchStart: isMinimized && draggable ? handleDragStart : void 0,
      onMouseDown: isMinimized && draggable ? handleDragStart : void 0,
      children: jsxs(
        "div",
        {
          style: {
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            maxHeight: isMobileMinimized ? void 0 : "calc(100vh - 24px)",
            overflow: !transparent || !isMobileMinimized ? "hidden" : void 0,
            ...!transparent ? {
              background: currentTheme.background,
              borderRadius: isMobileMinimized ? "9999px" : "1rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              backdropFilter: isMobileMinimized ? "none" : "blur(12px)",
              WebkitBackdropFilter: isMobileMinimized ? "none" : "blur(12px)"
            } : {
              ...isMobileMinimized ? { borderRadius: "9999px" } : {}
            }
          },
          children: [
            !isMobileMinimized && (minimizable || closable && !isMinimized) && jsxs("div", { style: { position: "absolute", top: "8px", right: "8px", zIndex: 10, display: "flex", gap: "4px" }, children: [
              minimizable && isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: "Maximize",
                  children: jsx(Maximize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              minimizable && !isMinimized && jsx(
                "button",
                {
                  onClick: toggleMinimize,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.7)" : currentTheme.controlHover,
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: "Minimize",
                  children: jsx(Minimize2, { size: 14, style: { color: "#fff" } })
                }
              ),
              closable && !isMinimized && jsx(
                "button",
                {
                  onClick: handleClose,
                  style: {
                    backgroundColor: transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                    padding: "6px",
                    borderRadius: "8px",
                    transition: "background-color 0.15s",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "none",
                    cursor: "pointer"
                  },
                  onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.7)",
                  onMouseLeave: (e) => e.currentTarget.style.backgroundColor = transparent ? "rgba(0,0,0,0.5)" : currentTheme.controlBg,
                  title: "Close",
                  children: jsx(X, { size: 14, style: { color: transparent ? "#fff" : currentTheme.textPrimary } })
                }
              )
            ] }),
            jsxs(
              "div",
              {
                ref: containerRef,
                style: {
                  width: isMobileMinimized ? `${currentWidth}px` : "100%",
                  height: `${currentHeight}px`,
                  maxWidth: "100%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: minimizable && !isDragging ? "pointer" : void 0,
                  background: transparent ? "transparent" : "rgba(0,0,0,0.1)",
                  borderRadius: isMobileMinimized ? "9999px" : void 0,
                  position: "relative",
                  overflow: "hidden"
                },
                onClick: handleContainerClick,
                title: minimizable ? isMinimized ? "Click to maximize" : "Click to minimize" : void 0,
                children: [
                  !isLoaded && !error && jsx(
                    "div",
                    {
                      style: {
                        color: currentTheme.textPrimary,
                        position: "relative",
                        zIndex: 1,
                        fontSize: "0.875rem",
                        animation: "ania-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                      },
                      children: "Loading avatar..."
                    }
                  ),
                  error && jsx("div", { style: { color: "#f87171", fontSize: "0.75rem", padding: "8px", textAlign: "center", position: "relative", zIndex: 1 }, children: error })
                ]
              }
            ),
            children && !isMinimized && jsx("div", { style: { width: "100%", flex: "1 1 auto", minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }, children })
          ]
        }
      )
    }
  );
  if (typeof document !== "undefined" && document.body) {
    return createPortal(avatarNode, document.body);
  }
  return avatarNode;
};
const GREETINGS = [
  "Olá! Como posso te ajudar hoje?",
  "Oi! Boas-vindas! O que posso fazer por você?",
  "Olá! Que bom falar com você!",
  "Oi! Estou aqui para ajudar. Do que você precisa?",
  "Olá! Tudo bem? Como posso ser útil?"
];
const WAITING_MESSAGES = [
  "Deixe-me pensar...",
  "Um momento...",
  "Processando...",
  "Só um instante...",
  "Estou verificando isso para você..."
];
const professionalTTSRequest = async (text, provider, config) => {
  try {
    if (provider === "tiktok") {
      const voiceId = config.ttsVoiceId || (config.ttsGender === "male" ? "br_005" : "br_003");
      const response = await fetch(`https://tiktok-tts.weilnet.workers.dev/api/generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          voice: voiceId
        })
      });
      if (!response.ok) {
        throw new Error(`TikTok TTS error: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        const audioData = atob(data.data);
        const audioArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
          audioArray[i] = audioData.charCodeAt(i);
        }
        const audioBlob = new Blob([audioArray], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        return { audioUrl, duration: 0 };
      } else {
        throw new Error("TikTok TTS: Invalid response");
      }
    } else if (provider === "elevenlabs") {
      const voiceId = config.ttsVoiceId || "pNInz6obpgDQGcFmaJgB";
      const model = config.ttsModel || "eleven_multilingual_v2";
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": config.ttsApiKey
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });
      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    } else if (provider === "google") {
      const apiUrl = config.ttsApiUrl || `https://texttospeech.googleapis.com/v1/text:synthesize?key=${config.ttsApiKey}`;
      const voiceConfig = {
        languageCode: config.ttsLang || "pt-BR",
        name: config.ttsVoiceId || "pt-BR-Standard-B",
        ssmlGender: config.ttsGender === "male" ? "MALE" : config.ttsGender === "female" ? "FEMALE" : "NEUTRAL"
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: { text },
          voice: voiceConfig,
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: config.ttsRate || 1,
            pitch: (config.ttsPitch - 1) * 20
          }
        })
      });
      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.status}`);
      }
      const data = await response.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0))],
        { type: "audio/mpeg" }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    } else if (provider === "piper") {
      const { initPiper: initPiper2, piperSynthesize: piperSynthesize2 } = await Promise.resolve().then(() => piperTts);
      if (config.piperModelUrl) {
        await initPiper2(config.piperModelUrl, config.piperModelConfigUrl, {
          onProgress: config.onPiperProgress
        });
      }
      const { audioUrl } = await piperSynthesize2(text, {
        speakerId: config.piperSpeakerId
      });
      return { audioUrl, duration: 0 };
    } else if (provider === "azure") {
      const region = config.ttsRegion || "brazilsouth";
      const apiUrl = config.ttsApiUrl || `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
      const voiceName = config.ttsVoiceId || "pt-BR-AntonioNeural";
      const ssml = `<speak version='1.0' xml:lang='${config.ttsLang || "pt-BR"}'>
        <voice name='${voiceName}'>
          <prosody rate='${config.ttsRate || 1}' pitch='${(config.ttsPitch - 1) * 50}%'>
            ${text}
          </prosody>
        </voice>
      </speak>`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": config.ttsApiKey,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3"
        },
        body: ssml
      });
      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.status}`);
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return { audioUrl, duration: 0 };
    }
  } catch (error) {
    throw error;
  }
};
const useTTSDetection = ({
  pauseThreshold = 150,
  idleTransitionDelay = 400,
  talkStartDelay = 0,
  minTalkDuration = 500,
  minIdleDuration = 300,
  onTalkStart,
  onTalkEnd,
  ttsProvider = "browser",
  ttsConfig = {}
} = {}) => {
  const [isTalking, setIsTalking] = useState(false);
  const pauseTimeoutRef = useRef(null);
  const idleTransitionTimeoutRef = useRef(null);
  const talkStartTimeoutRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const lastBoundaryTimeRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const audioRef = useRef(null);
  const lastTalkActivationRef = useRef(null);
  const lastIdleActivationRef = useRef(null);
  const activateTalk = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    if (talkStartTimeoutRef.current) return;
    const now = Date.now();
    const timeSinceIdle = lastIdleActivationRef.current ? now - lastIdleActivationRef.current : Infinity;
    if (timeSinceIdle < minIdleDuration) {
      return;
    }
    const doActivate = () => {
      lastTalkActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (!prev) {
          if (onTalkStart) onTalkStart();
        }
        return true;
      });
      talkStartTimeoutRef.current = null;
    };
    if (talkStartDelay > 0) {
      talkStartTimeoutRef.current = setTimeout(doActivate, talkStartDelay);
    } else {
      doActivate();
    }
  }, [onTalkStart, talkStartDelay, minIdleDuration]);
  useCallback(() => {
    const now = Date.now();
    const timeSinceTalk = lastTalkActivationRef.current ? now - lastTalkActivationRef.current : Infinity;
    const effectiveDelay = Math.max(idleTransitionDelay, minTalkDuration - timeSinceTalk);
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
    }
    idleTransitionTimeoutRef.current = setTimeout(() => {
      lastIdleActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (prev) {
          if (onTalkEnd) onTalkEnd();
        }
        return false;
      });
      idleTransitionTimeoutRef.current = null;
    }, effectiveDelay);
  }, [idleTransitionDelay, onTalkEnd, minTalkDuration]);
  const resetPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    activateTalk();
  }, [activateTalk]);
  const speak = useCallback(async (text, options = {}) => {
    const keylessProviders = ["tiktok", "piper"];
    if (ttsProvider !== "browser" && (ttsConfig.ttsApiKey || keylessProviders.includes(ttsProvider))) {
      if (options.cancelPrevious && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
      }
      try {
        const { audioUrl } = await professionalTTSRequest(text, ttsProvider, ttsConfig);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onplay = () => {
          isSpeakingRef.current = true;
          resetPauseTimeout();
        };
        audio.onended = () => {
          isSpeakingRef.current = false;
          audioRef.current = null;
          URL.revokeObjectURL(audioUrl);
          if (idleTransitionTimeoutRef.current) {
            clearTimeout(idleTransitionTimeoutRef.current);
          }
          idleTransitionTimeoutRef.current = setTimeout(() => {
            setIsTalking(false);
            if (onTalkEnd) onTalkEnd();
            idleTransitionTimeoutRef.current = null;
          }, idleTransitionDelay);
        };
        audio.onerror = (error) => {
          isSpeakingRef.current = false;
          setIsTalking(false);
          if (onTalkEnd) onTalkEnd();
          audioRef.current = null;
          URL.revokeObjectURL(audioUrl);
        };
        await audio.play();
        return audio;
      } catch (error) {
      }
    }
    if (!window.speechSynthesis) {
      return;
    }
    if (options.cancelPrevious && (currentUtteranceRef.current || window.speechSynthesis.speaking)) {
      window.speechSynthesis.cancel();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
      currentUtteranceRef.current = null;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || "pt-BR";
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    if (options.voice) {
      utterance.voice = options.voice;
    }
    currentUtteranceRef.current = utterance;
    utterance.onstart = () => {
      isSpeakingRef.current = true;
      lastBoundaryTimeRef.current = Date.now();
      resetPauseTimeout();
    };
    utterance.onboundary = (event) => {
      lastBoundaryTimeRef.current = Date.now();
      resetPauseTimeout();
    };
    utterance.onend = () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (talkStartTimeoutRef.current) {
        clearTimeout(talkStartTimeoutRef.current);
        talkStartTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      lastBoundaryTimeRef.current = null;
      currentUtteranceRef.current = null;
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
      }
      idleTransitionTimeoutRef.current = setTimeout(() => {
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
        idleTransitionTimeoutRef.current = null;
      }, idleTransitionDelay);
    };
    utterance.onerror = (event) => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      lastBoundaryTimeRef.current = null;
      if (event.error !== "interrupted") {
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
      }
      currentUtteranceRef.current = null;
    };
    utterance.onpause = () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
    };
    utterance.onresume = () => {
      resetPauseTimeout();
    };
    window.speechSynthesis.speak(utterance);
    return utterance;
  }, [onTalkStart, onTalkEnd, resetPauseTimeout, ttsProvider, ttsConfig, idleTransitionDelay]);
  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    isSpeakingRef.current = false;
    lastBoundaryTimeRef.current = null;
    currentUtteranceRef.current = null;
    setIsTalking(false);
    if (onTalkEnd) onTalkEnd();
  }, [onTalkEnd]);
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
      }
      if (talkStartTimeoutRef.current) {
        clearTimeout(talkStartTimeoutRef.current);
      }
    };
  }, []);
  return {
    isTalking,
    speak,
    cancel,
    audioRef
  };
};
const useSpeechRecognition = ({
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  onTranscriptChange,
  onFinalTranscript,
  onEnd,
  onError
} = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isListeningRef = useRef(false);
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);
  const startBrowserRecognition = useCallback(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      if (onError) onError(new Error("Web Speech API not supported"));
      return false;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = sttLang;
    recognition.continuous = sttContinuous;
    recognition.interimResults = sttInterimResults;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      let interimText = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcriptPiece + " ";
        } else {
          interimText += transcriptPiece;
        }
      }
      if (interimText) {
        setInterimTranscript(interimText);
        if (onTranscriptChange) onTranscriptChange(interimText, false);
      }
      if (finalText) {
        setTranscript((prev) => prev + finalText);
        setInterimTranscript("");
        if (onFinalTranscript) onFinalTranscript(finalText.trim());
      }
    };
    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        if (onEnd && isListeningRef.current) onEnd();
        return;
      }
      setIsListening(false);
      if (onError) onError(new Error(event.error));
    };
    recognition.onend = () => {
      setInterimTranscript("");
      if (onEnd && isListeningRef.current) {
        onEnd();
      } else {
        setIsListening(false);
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    return true;
  }, [sttLang, sttContinuous, sttInterimResults, onTranscriptChange, onFinalTranscript, onEnd, onError]);
  const startGoogleRecognition = useCallback(async () => {
    if (!sttApiKey) {
      if (onError) onError(new Error("API Key required for Google STT"));
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm"
      });
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(",")[1];
          const apiUrl = sttApiUrl || `https://speech.googleapis.com/v1/speech:recognize?key=${sttApiKey}`;
          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                config: {
                  encoding: "WEBM_OPUS",
                  sampleRateHertz: 48e3,
                  languageCode: sttLang,
                  enableAutomaticPunctuation: true
                },
                audio: {
                  content: base64Audio
                }
              })
            });
            if (!response.ok) {
              throw new Error(`Google STT error: ${response.status}`);
            }
            const data = await response.json();
            if (data.results && data.results[0]) {
              const transcriptText = data.results[0].alternatives[0].transcript;
              setTranscript(transcriptText);
              if (onFinalTranscript) onFinalTranscript(transcriptText);
            }
            if (onEnd) onEnd();
          } catch (err) {
            if (onError) onError(err);
          }
        };
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsListening(true);
      return true;
    } catch (err) {
      if (onError) onError(err);
      return false;
    }
  }, [sttApiKey, sttApiUrl, sttLang, onFinalTranscript, onEnd, onError]);
  const startListening = useCallback(async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
      }
      recognitionRef.current = null;
    }
    setTranscript("");
    setInterimTranscript("");
    if (sttProvider === "google" && sttApiKey) {
      return await startGoogleRecognition();
    } else {
      return startBrowserRecognition();
    }
  }, [sttProvider, sttApiKey, startGoogleRecognition, startBrowserRecognition]);
  const stopListening = useCallback(() => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
      }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
      }
      mediaRecorderRef.current = null;
    }
  }, []);
  const clearTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
        }
      }
      if (mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
        }
      }
    };
  }, []);
  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript
  };
};
const useChatbot = ({
  webhookUrl,
  webhookApiKey = null,
  webhookHeaders = {},
  onResponse,
  onError,
  formatRequest,
  parseResponse,
  availableActions = [],
  onActionTriggered
} = {}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendMessage = useCallback(async (message, metadata = {}) => {
    if (!webhookUrl) {
      return;
    }
    setIsLoading(true);
    setError(null);
    const { attachments = [], ...restMetadata } = metadata;
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      attachments: attachments.length > 0 ? attachments : void 0,
      ...restMetadata
    };
    setMessages((prev) => [...prev, userMessage]);
    try {
      const actionsList = availableActions.length > 0 ? availableActions.map((a) => ({ id: a.id, name: a.name })) : void 0;
      const requestBody = formatRequest ? formatRequest(message, { ...metadata, availableActions: actionsList }) : {
        message,
        attachments: attachments.length > 0 ? attachments : void 0,
        availableActions: actionsList,
        ...restMetadata
      };
      const headers = {
        "Content-Type": "application/json",
        ...webhookHeaders
      };
      if (webhookApiKey) {
        headers["Authorization"] = `Bearer ${webhookApiKey}`;
        headers["X-API-Key"] = webhookApiKey;
      }
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      let responseText = "";
      let responseAttachments = [];
      let responseAction = null;
      if (parseResponse) {
        const parsed = parseResponse(data);
        if (typeof parsed === "object" && parsed !== null) {
          responseText = parsed.message || parsed.content || parsed.text || JSON.stringify(parsed);
          responseAttachments = parsed.attachments || [];
          responseAction = parsed.action || null;
        } else {
          responseText = parsed;
        }
      } else {
        responseText = data.message || data.response || data.text || data.content || JSON.stringify(data);
        responseAttachments = data.attachments || data.files || [];
        responseAction = data.action || null;
      }
      if (responseAction && onActionTriggered) {
        onActionTriggered(responseAction);
      }
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseText,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        attachments: responseAttachments.length > 0 ? responseAttachments : void 0,
        raw: data
      };
      setMessages((prev) => [...prev, botMessage]);
      if (onResponse) {
        onResponse(botMessage, data);
      }
      setIsLoading(false);
      return botMessage;
    } catch (err) {
      const friendlyMessage = "O sistema está em desenvolvimento. Aguarde, lançamento em breve!";
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: friendlyMessage,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
      if (onError) {
        onError(err, friendlyMessage);
      }
      setIsLoading(false);
      return errorMessage;
    }
  }, [webhookUrl, webhookApiKey, webhookHeaders, formatRequest, parseResponse, onResponse, onError, availableActions, onActionTriggered]);
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages
  };
};
const useLipSync = ({ enabled = false, fftSize = 2048, smoothing = 0.8 } = {}) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const prevSpectrumRef = useRef(null);
  const connectedElementRef = useRef(null);
  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);
  const connectAudioElement = useCallback((audioElement) => {
    if (!enabled || !audioElement) return;
    if (connectedElementRef.current === audioElement && analyserRef.current) return;
    try {
      const ctx = getOrCreateContext();
      if (ctx.state === "suspended") ctx.resume();
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch (e) {
        }
      }
      if (analyserRef.current) {
        try {
          analyserRef.current.disconnect();
        } catch (e) {
        }
      }
      const analyser = ctx.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothing;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      prevSpectrumRef.current = new Float32Array(analyser.frequencyBinCount);
      let source;
      try {
        source = ctx.createMediaElementSource(audioElement);
      } catch (e) {
        if (sourceRef.current) {
          source = sourceRef.current;
        } else {
          console.warn("[useLipSync] Cannot create source for audio element:", e);
          return;
        }
      }
      sourceRef.current = source;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      connectedElementRef.current = audioElement;
    } catch (err) {
      console.warn("[useLipSync] Failed to connect audio:", err);
    }
  }, [enabled, fftSize, smoothing, getOrCreateContext]);
  const getSpectralOpenness = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return 0;
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    analyser.getByteFrequencyData(data);
    const ctx = audioContextRef.current;
    if (!ctx) return 0;
    const sampleRate = ctx.sampleRate;
    const binSize = sampleRate / analyser.fftSize;
    const lowBin = Math.floor(85 / binSize);
    const highBin = Math.min(data.length - 1, Math.ceil(3e3 / binSize));
    let sum = 0;
    let count = 0;
    for (let i = lowBin; i <= highBin; i++) {
      sum += data[i];
      count++;
    }
    if (count === 0) return 0;
    return Math.min(1, sum / count / 255);
  }, []);
  const getSpectralFlux = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !prevSpectrumRef.current) return 0;
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    const prev = prevSpectrumRef.current;
    analyser.getByteFrequencyData(data);
    let flux = 0;
    const len = Math.min(data.length, prev.length);
    for (let i = 0; i < len; i++) {
      const diff = data[i] / 255 - prev[i];
      if (diff > 0) flux += diff;
      prev[i] = data[i] / 255;
    }
    return Math.min(1, flux / (len * 0.1));
  }, []);
  const getAmplitude = useCallback(() => {
    if (!analyserRef.current) return 0;
    const analyser = analyserRef.current;
    const timeData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeData);
    let maxAmp = 0;
    for (let i = 0; i < timeData.length; i++) {
      const amp = Math.abs(timeData[i] - 128) / 128;
      if (amp > maxAmp) maxAmp = amp;
    }
    return maxAmp;
  }, []);
  const disconnect = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (e) {
      }
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch (e) {
      }
      analyserRef.current = null;
    }
    connectedElementRef.current = null;
    dataArrayRef.current = null;
    prevSpectrumRef.current = null;
  }, []);
  useEffect(() => {
    return () => {
      disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {
        });
      }
    };
  }, [disconnect]);
  return {
    connectAudioElement,
    getSpectralOpenness,
    getSpectralFlux,
    getAmplitude,
    disconnect,
    isConnected: () => !!connectedElementRef.current
  };
};
const parseHotkey = (hotkeyString) => {
  if (!hotkeyString) return null;
  const parts = hotkeyString.toLowerCase().split("+").map((p) => p.trim());
  const result = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
    key: ""
  };
  for (const part of parts) {
    switch (part) {
      case "ctrl":
      case "control":
        result.ctrl = true;
        break;
      case "alt":
        result.alt = true;
        break;
      case "shift":
        result.shift = true;
        break;
      case "meta":
      case "cmd":
      case "command":
      case "win":
        result.meta = true;
        break;
      default:
        result.key = part;
    }
  }
  return result.key ? result : null;
};
const matchesHotkey = (event, parsed) => {
  if (!parsed) return false;
  if (event.ctrlKey !== parsed.ctrl) return false;
  if (event.altKey !== parsed.alt) return false;
  if (event.shiftKey !== parsed.shift) return false;
  if (event.metaKey !== parsed.meta) return false;
  const eventKey = event.key.toLowerCase();
  return eventKey === parsed.key;
};
const playActionAudio = (audioBase64, delayMs = 0) => {
  if (!audioBase64) return null;
  const play = () => {
    try {
      const dataUrl = audioBase64.startsWith("data:") ? audioBase64 : `data:audio/wav;base64,${audioBase64}`;
      const audio2 = new Audio(dataUrl);
      audio2.play().catch((err) => {
        console.warn("[ActionRenderer] Audio playback failed:", err);
      });
      return audio2;
    } catch (err) {
      console.warn("[ActionRenderer] Failed to create audio:", err);
      return null;
    }
  };
  if (delayMs > 0) {
    let audioRef = null;
    const timer = setTimeout(() => {
      audioRef = play();
    }, delayMs);
    return { cancel: () => {
      clearTimeout(timer);
      if (audioRef) {
        audioRef.pause();
        audioRef = null;
      }
    } };
  }
  const audio = play();
  return audio ? { cancel: () => {
    audio.pause();
  } } : null;
};
const useActionFrames = ({
  actions = [],
  enabled = true,
  enableHotkeys = true,
  onActionStart,
  onActionEnd,
  animationController
} = {}) => {
  const [activeAction, setActiveAction] = useState(null);
  const [availableActions, setAvailableActions] = useState([]);
  const parsedHotkeysRef = useRef([]);
  const audioHandleRef = useRef(null);
  useEffect(() => {
    if (!actions || actions.length === 0) {
      setAvailableActions([]);
      parsedHotkeysRef.current = [];
      return;
    }
    const available = actions.map((a) => ({
      id: a.id,
      name: a.name,
      hotkey: a.hotkey || null
    }));
    setAvailableActions(available);
    parsedHotkeysRef.current = actions.filter((a) => a.hotkey).map((a) => ({
      actionId: a.id,
      parsed: parseHotkey(a.hotkey)
    })).filter((h) => h.parsed !== null);
  }, [actions]);
  useEffect(() => {
    if (!animationController || !actions || actions.length === 0) return;
    if (animationController.configureActions) {
      animationController.configureActions(actions);
    }
    animationController.onActionCompleteCallback = () => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };
    animationController.onActionCancelCallback = (id) => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };
    animationController.onActionStartCallback = (id) => {
      setActiveAction(id);
      if (onActionStart) onActionStart(id);
    };
  }, [animationController, actions, onActionStart, onActionEnd]);
  const triggerAction = useCallback((actionId) => {
    if (!enabled || !animationController) return;
    const actionConfig = actions.find((a) => a.id === actionId);
    if (!actionConfig) return;
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
    }
    if (actionConfig.audio_base64) {
      audioHandleRef.current = playActionAudio(
        actionConfig.audio_base64,
        actionConfig.audio_delay_ms || 0
      );
    }
    if (animationController.triggerAction) {
      animationController.triggerAction(actionId);
    }
  }, [enabled, animationController, actions]);
  const cancelAction = useCallback(() => {
    if (!animationController) return;
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
      audioHandleRef.current = null;
    }
    if (animationController.cancelAction) {
      animationController.cancelAction(true);
    }
  }, [animationController]);
  useEffect(() => {
    if (!enabled || !enableHotkeys || parsedHotkeysRef.current.length === 0) return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      for (const { actionId, parsed } of parsedHotkeysRef.current) {
        if (matchesHotkey(e, parsed)) {
          e.preventDefault();
          triggerAction(actionId);
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, enableHotkeys, triggerAction]);
  return {
    activeAction,
    availableActions,
    triggerAction,
    cancelAction
  };
};
const AvatarChatbot = ({
  avatarUrl,
  avatarPassword,
  avatarData,
  authToken,
  webhookUrl,
  position = "bottom-right",
  width = 400,
  height = 300,
  transparent = false,
  theme = "dark",
  enableTTS = true,
  autoGreeting = true,
  idleSpeed = 1,
  talkSpeed = 1,
  autoCalculateSpeed = true,
  showSpeedControls = false,
  startMinimized = false,
  preserveQuality = true,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  talkStartDelay = 0,
  postTalkDelay = 1500,
  minTalkDuration = 800,
  minIdleDuration = 400,
  ttsVoice = "auto",
  ttsGender = "auto",
  ttsRate = 1,
  ttsPitch = 1,
  ttsLang = "pt-BR",
  ttsProvider = "browser",
  ttsApiKey = null,
  ttsApiUrl = null,
  ttsVoiceId = null,
  ttsModel = null,
  enableSTT = false,
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  sttAutoSend = true,
  transparentChat = false,
  // New props
  assistantName = "Assistant",
  userName = "You",
  enableAttachments = false,
  // n8n authentication
  webhookApiKey = null,
  webhookHeaders = {},
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Piper TTS props
  piperModelUrl = null,
  piperModelConfigUrl = null,
  piperPitch = 1,
  piperSpeed = 1,
  onClose
}) => {
  var _a, _b;
  const [inputMessage, setInputMessage] = useState("");
  const [avatarRef, setAvatarRef] = useState(null);
  const [systemMessages, setSystemMessages] = useState([]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [currentIdleSpeed, setCurrentIdleSpeed] = useState(idleSpeed);
  const [currentTalkSpeed, setCurrentTalkSpeed] = useState(talkSpeed);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isCurrentlyMinimized, setIsCurrentlyMinimized] = useState(startMinimized);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const speakRef = useRef(null);
  const greetingPendingRef = useRef(null);
  const previousMinimizedRef = useRef(startMinimized);
  const sttTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const sttRestartTimeoutRef = useRef(null);
  const { isTalking, speak, cancel, audioRef: ttsAudioRef } = useTTSDetection({
    pauseThreshold: 350,
    idleTransitionDelay: postTalkDelay,
    talkStartDelay,
    minTalkDuration,
    minIdleDuration,
    onTalkStart: () => {
    },
    onTalkEnd: () => {
    },
    ttsProvider,
    ttsConfig: {
      ttsApiKey,
      ttsApiUrl,
      ttsVoiceId,
      ttsModel,
      ttsLang,
      ttsGender,
      ttsRate,
      ttsPitch,
      piperModelUrl,
      piperModelConfigUrl,
      piperPitch,
      piperSpeed
    }
  });
  const lipSync = useLipSync({ enabled: lipSyncEnabled && ttsProvider !== "browser" });
  useEffect(() => {
    if (!lipSyncEnabled || !(ttsAudioRef == null ? void 0 : ttsAudioRef.current)) return;
    lipSync.connectAudioElement(ttsAudioRef.current);
  }, [lipSyncEnabled, ttsAudioRef == null ? void 0 : ttsAudioRef.current]);
  const animationController = ((_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController) || null;
  const { activeAction, availableActions, triggerAction: triggerActionFrame, cancelAction: cancelActionFrame } = useActionFrames({
    actions: actions || [],
    enabled: isAvatarLoaded,
    enableHotkeys: enableActionHotkeys,
    animationController,
    onActionStart: void 0,
    onActionEnd: void 0
  });
  const {
    isListening,
    transcript: sttTranscript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript
  } = useSpeechRecognition({
    sttProvider,
    sttLang,
    sttContinuous: true,
    sttInterimResults,
    sttApiKey,
    sttApiUrl,
    onTranscriptChange: (text, isFinal) => {
      if (!isFinal && sttInterimResults) {
        setInputMessage(text);
      }
    },
    onFinalTranscript: (text) => {
      setInputMessage(text);
      if (sttAutoSend && text.trim()) {
        if (sttTimeoutRef.current) {
          clearTimeout(sttTimeoutRef.current);
        }
        sttTimeoutRef.current = setTimeout(() => {
          if (text.trim()) {
            handleSendWithText(text.trim());
            clearTranscript();
          }
        }, 800);
      }
    },
    onEnd: () => {
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 300);
      }
    },
    onError: (error2) => {
      if (error2.message !== "no-speech" && error2.message !== "aborted") {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: "Sorry, couldn't hear you. Please try again.",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            isError: true
          }
        ]);
      }
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 500);
      }
    }
  });
  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);
  useEffect(() => {
    if (enableTTS && !ttsEnabled && isAvatarLoaded && !isCurrentlyMinimized) {
      const timer = setTimeout(() => {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("");
          window.speechSynthesis.speak(utterance);
        }
        setTtsEnabled(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAvatarLoaded, isCurrentlyMinimized, enableTTS, ttsEnabled]);
  useEffect(() => {
    if (isListening && interimTranscript) {
      setInputMessage(interimTranscript);
    }
  }, [interimTranscript, isListening]);
  const handleMicToggle = async () => {
    if (isListening) {
      stopListening();
    } else {
      clearTranscript();
      const success = await startListening();
      if (!success) {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: "Unable to access microphone. Check permissions.",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            isError: true
          }
        ]);
      }
    }
  };
  const selectVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    if (ttsVoice && ttsVoice !== "auto") {
      const voice = voices.find((v) => v.name === ttsVoice);
      if (voice) {
        return voice;
      }
    }
    let filteredVoices = voices.filter((v) => v.lang.startsWith(ttsLang.split("-")[0]));
    if (filteredVoices.length === 0) {
      filteredVoices = voices.filter((v) => v.lang.startsWith("en"));
    }
    if (ttsGender !== "auto") {
      const genderKeywords = {
        male: ["male", "macho", "homem", "masculino", "masculina", "carlos", "pedro", "daniel", "man", "david", "mark", "wavenet-b", "wavenet-d", "standard-b", "standard-d"],
        female: ["female", "mulher", "feminino", "feminina", "maria", "ana", "lucia", "woman", "samantha", "victoria", "zira", "wavenet-a", "wavenet-c", "standard-a", "standard-c"]
      };
      const keywords = genderKeywords[ttsGender] || [];
      const oppositeKeywords = genderKeywords[ttsGender === "male" ? "female" : "male"] || [];
      const genderVoices = filteredVoices.filter(
        (v) => keywords.some((keyword) => v.name.toLowerCase().includes(keyword))
      );
      if (genderVoices.length > 0) {
        filteredVoices = genderVoices;
      } else {
        const nonOppositeVoices = filteredVoices.filter(
          (v) => !oppositeKeywords.some((keyword) => v.name.toLowerCase().includes(keyword))
        );
        if (nonOppositeVoices.length > 0) {
          filteredVoices = nonOppositeVoices;
        }
      }
      const localVoices = filteredVoices.filter((v) => v.localService);
      if (localVoices.length > 0) {
        filteredVoices = localVoices;
      }
    }
    return filteredVoices[0] || voices[0];
  }, [ttsVoice, ttsGender, ttsLang]);
  const handleEnableSound = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(utterance);
    }
    setTtsEnabled(true);
  };
  const handleMinimizeToggle = (isMinimized) => {
    setIsCurrentlyMinimized(isMinimized);
    if (!isMinimized && previousMinimizedRef.current && enableTTS && !ttsEnabled && isAvatarLoaded) {
      handleEnableSound();
    }
    previousMinimizedRef.current = isMinimized;
  };
  const { messages, sendMessage, isLoading, error } = useChatbot({
    webhookUrl,
    webhookApiKey,
    webhookHeaders,
    availableActions,
    onActionTriggered: (actionId) => {
      if (triggerActionFrame) triggerActionFrame(actionId);
    },
    onResponse: (botMessage) => {
      if (enableTTS && ttsEnabled && botMessage.content) {
        speak(botMessage.content, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    },
    onError: (err, friendlyMessage) => {
      if (enableTTS && ttsEnabled && friendlyMessage && speakRef.current) {
        speakRef.current(friendlyMessage, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    }
  });
  useEffect(() => {
    if (!autoGreeting || hasGreetedRef.current || !isAvatarLoaded) return;
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    greetingPendingRef.current = randomGreeting;
    const timer = setTimeout(() => {
      hasGreetedRef.current = true;
      setSystemMessages([{
        id: "greeting-" + Date.now(),
        role: "assistant",
        content: randomGreeting,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }]);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [autoGreeting, isAvatarLoaded]);
  useEffect(() => {
    if (ttsEnabled && greetingPendingRef.current && speakRef.current && !isCurrentlyMinimized) {
      const greetingText = greetingPendingRef.current;
      greetingPendingRef.current = null;
      setTimeout(() => {
        speakRef.current(greetingText, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }, 500);
    }
  }, [ttsEnabled, isCurrentlyMinimized]);
  const allMessages = [...systemMessages, ...messages];
  useEffect(() => {
    var _a2;
    (_a2 = messagesEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);
  useEffect(() => {
    var _a2, _b2;
    if (!((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController)) {
      return;
    }
    const controller = avatarRef.playerRef.current.animationController;
    if (controller.isTalking === isTalking) {
      return;
    }
    controller.setTalkingState(isTalking);
  }, [isTalking, avatarRef]);
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newAttachments.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith("image/") ? event.target.result : null,
          data: event.target.result
        });
        if (newAttachments.length === files.length) {
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };
  const handleSendWithText = async (text) => {
    if (!text.trim() || isLoading) return;
    const message = text.trim();
    const currentAttachments = [...attachments];
    setAttachments([]);
    const randomWaiting = WAITING_MESSAGES[Math.floor(Math.random() * WAITING_MESSAGES.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: "pt-BR" });
        }
      }
    }, 500);
    await sendMessage(message, {
      attachments: currentAttachments.map((a) => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };
  const handleSend = async () => {
    if (!inputMessage.trim() && attachments.length === 0 || isLoading) return;
    const message = inputMessage.trim();
    const currentAttachments = [...attachments];
    setInputMessage("");
    setAttachments([]);
    const randomWaiting = WAITING_MESSAGES[Math.floor(Math.random() * WAITING_MESSAGES.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: "pt-BR" });
        }
      }
    }, 500);
    await sendMessage(message, {
      attachments: currentAttachments.map((a) => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleIdleSpeedChange = (speed) => {
    var _a2, _b2;
    setCurrentIdleSpeed(speed);
    if ((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController) {
      avatarRef.playerRef.current.animationController.setIdleSpeed(speed);
    }
  };
  const handleTalkSpeedChange = (speed) => {
    var _a2, _b2;
    setCurrentTalkSpeed(speed);
    if ((_b2 = (_a2 = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a2.current) == null ? void 0 : _b2.animationController) {
      avatarRef.playerRef.current.animationController.setTalkSpeed(speed);
    }
  };
  return jsx(
    AniaAvatar,
    {
      avatarUrl,
      avatarPassword,
      avatarData,
      authToken,
      position,
      width,
      height,
      transparent,
      theme,
      minimizable: true,
      closable: true,
      idleSpeed: currentIdleSpeed,
      talkSpeed: currentTalkSpeed,
      autoCalculateSpeed,
      preserveQuality,
      alwaysOnTop,
      startMinimized: startMinimized || !isAvatarLoaded,
      // Lip sync passthrough
      lipSyncEnabled,
      lipSyncServerUrl,
      lipSyncIntensity,
      lipSyncResponsiveness,
      lipSyncHook: lipSyncEnabled ? lipSync : null,
      // Action frames passthrough
      actions,
      enableActionHotkeys,
      // Initial action passthrough
      initialAction,
      initialActionLoop,
      onLoad: (player) => {
        setAvatarRef({ playerRef: { current: player } });
        setIsAvatarLoaded(true);
      },
      onToggleMinimize: handleMinimizeToggle,
      onClose,
      children: jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden"
        },
        children: [
          // ========== ÁREA DE MENSAGENS ==========
          jsxs("div", {
            style: {
              flex: "1 1 auto",
              minHeight: "60px",
              maxHeight: `max(120px, calc(100vh - ${height + 180}px))`,
              overflowY: "auto",
              padding: "12px 16px",
              WebkitOverflowScrolling: "touch"
            },
            children: [
              // Lista de mensagens
              allMessages.map((msg) => {
                const isUser = msg.role === "user";
                return jsx("div", {
                  key: msg.id,
                  style: {
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginBottom: "12px"
                  },
                  children: jsxs("div", {
                    style: { maxWidth: "80%" },
                    children: [
                      // Nome do remetente
                      jsx("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: "600",
                          marginBottom: "4px",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          display: "inline-block",
                          backgroundColor: isUser ? "#3b82f6" : "#ffffff",
                          color: isUser ? "#ffffff" : "#374151",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        },
                        children: isUser ? userName : assistantName
                      }),
                      // Balão da mensagem
                      jsxs("div", {
                        style: {
                          padding: "12px 18px",
                          borderRadius: "20px",
                          borderBottomLeftRadius: isUser ? "20px" : "6px",
                          borderBottomRightRadius: isUser ? "6px" : "20px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          backgroundColor: isUser ? "#3b82f6" : "#ffffff",
                          color: isUser ? "#ffffff" : "#1f2937",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                        },
                        children: [
                          // Attachments
                          msg.attachments && msg.attachments.length > 0 && jsx("div", {
                            style: { marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "8px" },
                            children: msg.attachments.map(
                              (att, idx) => att.type && att.type.startsWith("image/") ? jsx("img", {
                                key: idx,
                                src: att.data || att.preview,
                                alt: att.name,
                                style: { maxWidth: "120px", maxHeight: "80px", borderRadius: "12px", objectFit: "cover" }
                              }) : jsx("span", {
                                key: idx,
                                style: {
                                  padding: "4px 10px",
                                  borderRadius: "12px",
                                  fontSize: "11px",
                                  backgroundColor: isUser ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                                  color: isUser ? "#ffffff" : "#6b7280"
                                },
                                children: att.name
                              })
                            )
                          }),
                          msg.content
                        ]
                      })
                    ]
                  })
                });
              }),
              // Loading indicator
              isLoading && jsx("div", {
                style: { display: "flex", justifyContent: "flex-start", marginBottom: "12px" },
                children: jsxs("div", {
                  style: { maxWidth: "80%" },
                  children: [
                    jsx("div", {
                      style: {
                        fontSize: "11px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        color: "#374151",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      },
                      children: assistantName
                    }),
                    jsx("div", {
                      style: {
                        padding: "12px 18px",
                        borderRadius: "20px",
                        borderBottomLeftRadius: "6px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        display: "flex",
                        gap: "6px"
                      },
                      children: [
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite" } }),
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite 0.15s" } }),
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite 0.3s" } })
                      ]
                    })
                  ]
                })
              }),
              jsx("div", { ref: messagesEndRef })
            ]
          }),
          // ========== BOTÃO ENABLE SOUND ==========
          enableTTS && !ttsEnabled && jsx("div", {
            style: { padding: "8px 16px", flexShrink: 0 },
            children: jsxs("button", {
              onClick: handleEnableSound,
              style: {
                width: "100%",
                padding: "14px 20px",
                borderRadius: "16px",
                border: "none",
                backgroundColor: "#f97316",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(249,115,22,0.4)"
              },
              children: [
                jsx(Volume2, { size: 20 }),
                "Enable Sound"
              ]
            })
          }),
          // ========== SPEED CONTROLS ==========
          showSpeedControls && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "14px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              flexShrink: 0
            },
            children: jsxs("div", {
              style: { display: "flex", flexDirection: "column", gap: "10px" },
              children: [
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: "Idle:" }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentIdleSpeed, onChange: (e) => handleIdleSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: currentIdleSpeed.toFixed(2) + "x" })
                ] }),
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: "Talk:" }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentTalkSpeed, onChange: (e) => handleTalkSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: currentTalkSpeed.toFixed(2) + "x" })
                ] })
              ]
            })
          }),
          // ========== PREVIEW DE ATTACHMENTS ==========
          attachments.length > 0 && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "12px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexWrap: "wrap",
              flexShrink: 0,
              gap: "8px"
            },
            children: attachments.map((att) => jsx("div", {
              key: att.id,
              style: { position: "relative" },
              children: [
                att.preview ? jsx("img", { src: att.preview, alt: att.name, style: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "12px" } }) : jsx("div", { style: { width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }, children: jsx(Paperclip, { size: 20, color: "#9ca3af" }) }),
                jsx("button", {
                  onClick: () => removeAttachment(att.id),
                  style: { position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
                  children: jsx(X, { size: 12, color: "#ffffff" })
                })
              ]
            }))
          }),
          // ========== BARRA DE INPUT ==========
          jsxs("div", {
            style: { padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 },
            children: [
              // Botão anexar
              enableAttachments && jsx("button", {
                onClick: () => {
                  var _a2;
                  return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                },
                disabled: isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                },
                children: jsx(Paperclip, { size: 18, color: "#6b7280" })
              }),
              enableAttachments && jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*,.pdf,.doc,.docx,.txt", onChange: handleFileSelect, style: { display: "none" } }),
              // Input de texto
              jsx("input", {
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: isListening ? "Listening..." : "Type your message...",
                disabled: isLoading,
                style: {
                  flex: "1 1 0%",
                  minWidth: 0,
                  padding: "12px 16px",
                  borderRadius: "24px",
                  border: isListening ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  backgroundColor: isListening ? "#fef2f2" : "#ffffff",
                  fontSize: "14px",
                  color: "#1f2937",
                  outline: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  boxSizing: "border-box"
                }
              }),
              // Botão mic
              enableSTT && jsx("button", {
                onClick: handleMicToggle,
                disabled: isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: isListening ? "#ef4444" : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isListening ? "0 4px 12px rgba(239,68,68,0.4)" : "0 4px 12px rgba(0,0,0,0.15)"
                },
                children: isListening ? jsx(MicOff, { size: 18, color: "#ffffff" }) : jsx(Mic, { size: 18, color: "#6b7280" })
              }),
              // Botão enviar
              jsx("button", {
                onClick: handleSend,
                disabled: !inputMessage.trim() && attachments.length === 0 || isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: !inputMessage.trim() && attachments.length === 0 || isLoading ? "#d1d5db" : "#3b82f6",
                  cursor: !inputMessage.trim() && attachments.length === 0 || isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(59,130,246,0.4)"
                },
                children: jsx(Send, { size: 18, color: "#ffffff" })
              }),
              // Indicador TTS falando
              enableTTS && isTalking && jsx("div", {
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(34,197,94,0.4)"
                },
                children: jsx(Volume2, { size: 18, color: "#ffffff" })
              })
            ]
          }),
          // ========== FEEDBACK DE TRANSCRIÇÃO ==========
          isListening && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: interimTranscript ? "#ef4444" : "#22c55e" } }),
              jsx("span", { style: { color: "#6b7280" }, children: interimTranscript ? "Transcribing: " : "Microphone active..." }),
              interimTranscript && jsx("span", { style: { color: "#1f2937", fontWeight: "500" }, children: interimTranscript })
            ]
          }),
          // ========== ERRO ==========
          error && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              fontSize: "12px",
              color: "#dc2626"
            },
            children: error
          })
        ]
      })
    }
  );
};
const useAniaAvatarRef = () => {
  const ref = useRef(null);
  const getController = () => {
    var _a, _b;
    const player = (_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current;
    return (player == null ? void 0 : player.animationController) || null;
  };
  const setTalking = (talking) => {
    const ctrl = getController();
    if (ctrl) ctrl.setTalkingState(talking);
  };
  const play = () => {
    var _a, _b;
    const player = (_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current;
    if (player == null ? void 0 : player.play) player.play();
  };
  const pause = () => {
    var _a, _b;
    const player = (_b = (_a = ref.current) == null ? void 0 : _a.playerRef) == null ? void 0 : _b.current;
    if (player == null ? void 0 : player.pause) player.pause();
  };
  const triggerAction = (actionId) => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.triggerAction) ctrl.triggerAction(actionId);
  };
  const cancelAction = () => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.cancelAction) ctrl.cancelAction(true);
  };
  const getAvailableActions = () => {
    const ctrl = getController();
    if (ctrl == null ? void 0 : ctrl.getActionConfigs) {
      const configs = ctrl.getActionConfigs();
      return Object.values(configs).map((c) => ({ id: c.id, name: c.name }));
    }
    return [];
  };
  const setLipSyncEnabled = (enabled) => {
    const ctrl = getController();
    if (ctrl) ctrl.lipsSyncEnabled = enabled;
  };
  const getLipSyncState = () => {
    const ctrl = getController();
    if (!ctrl) return { enabled: false };
    return {
      enabled: ctrl.lipsSyncEnabled || false,
      envelope: ctrl._lipsEnvelope || 0
    };
  };
  return { ref, setTalking, play, pause, triggerAction, cancelAction, getAvailableActions, setLipSyncEnabled, getLipSyncState };
};
ort.env.wasm.proxy = false;
ort.env.wasm.numThreads = 1;
let engine = null;
let initPromise = null;
let currentVoiceName = null;
let piperStatus = {
  ready: false,
  modelCached: false,
  downloading: false,
  progress: 0,
  error: null
};
const initPiper = async (modelUrl, modelConfigUrl, options = {}) => {
  if (engine && piperStatus.ready) return engine;
  if (initPromise) return initPromise;
  piperStatus = { ...piperStatus, downloading: true, progress: 0, error: null };
  initPromise = (async () => {
    try {
      const fetchProvider = new FetchProvider();
      const modelFileName = modelUrl.split("/").pop().replace(".onnx", "");
      currentVoiceName = modelFileName;
      const voiceProvider = {
        destroy: () => fetchProvider.destroy(),
        list: async () => [],
        fetch: async () => {
          piperStatus = { ...piperStatus, progress: 10 };
          if (options.onProgress) options.onProgress(10);
          const json = await fetchProvider.fetch(modelConfigUrl);
          piperStatus = { ...piperStatus, progress: 30 };
          if (options.onProgress) options.onProgress(30);
          const blobUrl = await fetchProvider.fetch(modelUrl);
          piperStatus = { ...piperStatus, progress: 90 };
          if (options.onProgress) options.onProgress(90);
          return [json, blobUrl];
        }
      };
      engine = new PiperWebEngine({
        onnxRuntime: new OnnxWebRuntime({ numThreads: 1 }),
        voiceProvider
      });
      await engine.generate(" ", currentVoiceName, 0);
      piperStatus = {
        ready: true,
        modelCached: true,
        downloading: false,
        progress: 100,
        error: null
      };
      if (options.onProgress) options.onProgress(100);
      if (options.onReady) options.onReady();
      return engine;
    } catch (err) {
      engine = null;
      initPromise = null;
      piperStatus = { ...piperStatus, downloading: false, error: err.message };
      console.error("[PiperTTS] Init failed:", err);
      throw err;
    }
  })();
  return initPromise;
};
const piperSynthesize = async (text, options = {}) => {
  if (!engine || !piperStatus.ready) {
    throw new Error("Piper TTS not initialized. Call initPiper() first.");
  }
  try {
    const speakerId = options.speakerId ?? 0;
    const response = await engine.generate(text, currentVoiceName, speakerId);
    const blob = response.file;
    const audioUrl = URL.createObjectURL(blob);
    return { audioUrl, blob };
  } catch (err) {
    console.error("[PiperTTS] Synthesis failed:", err);
    throw err;
  }
};
const getPiperStatus = () => ({ ...piperStatus });
const checkPiperStatus = () => ({ ...piperStatus });
const disposePiper = () => {
  if (engine == null ? void 0 : engine.destroy) {
    engine.destroy();
  }
  engine = null;
  initPromise = null;
  currentVoiceName = null;
  piperStatus = { ready: false, modelCached: false, downloading: false, progress: 0, error: null };
};
const piperTts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkPiperStatus,
  disposePiper,
  getPiperStatus,
  initPiper,
  piperSynthesize
}, Symbol.toStringTag, { value: "Module" }));
export {
  AniaAvatar,
  AvatarChatbot,
  buildOpennessMap,
  checkPiperStatus,
  clearAvatarCache,
  deleteCachedAvatar,
  disposePiper,
  fetchLipSyncConfig,
  getCacheStats,
  getCachedAvatar,
  getPiperStatus,
  initPiper,
  matchesHotkey,
  parseHotkey,
  piperSynthesize,
  playActionAudio,
  setCachedAvatar,
  useActionFrames,
  useAniaAvatarRef,
  useChatbot,
  useLipSync,
  useSpeechRecognition,
  useTTSDetection
};
