const DB_NAME = 'ania-avatar-cache';
const DB_VERSION = 1;
const STORE_NAME = 'avatars';
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
        database.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    };
  });
};

const hashUrl = (url) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export const getCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return null;

    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
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
        const maxAge = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

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

export const setCachedAvatar = async (url, data, isEncrypted = false) => {
  try {
    const database = await initDB();
    if (!database) return;

    const transaction = database.transaction([STORE_NAME], 'readwrite');
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
    // Silent fail
  }
};

export const deleteCachedAvatar = async (url) => {
  try {
    const database = await initDB();
    if (!database) return;

    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(url);
  } catch (err) {
    // Silent fail
  }
};

export const clearAvatarCache = async () => {
  try {
    const database = await initDB();
    if (!database) return;

    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    // Silent fail
  }
};

export const getCacheStats = async () => {
  try {
    const database = await initDB();
    if (!database) return { count: 0, size: 0 };

    return new Promise((resolve) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const entries = request.result || [];
        let totalSize = 0;

        entries.forEach(entry => {
          if (entry.data instanceof ArrayBuffer) {
            totalSize += entry.data.byteLength;
          } else if (typeof entry.data === 'object') {
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
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
