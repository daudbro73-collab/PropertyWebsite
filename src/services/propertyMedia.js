const DB_NAME = 'archipelago_property_media';
const STORE = 'blobs';
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txPromise(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export function isMediaRef(src) {
  return typeof src === 'string' && src.startsWith('media:');
}

export function mediaIdFromRef(ref) {
  return ref.slice('media:'.length);
}

export function mediaRefFromId(id) {
  return `media:${id}`;
}

export async function storeImageBlob(blob) {
  const id = `img_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put(blob, id);
  await txPromise(tx);
  return id;
}

export async function storeImageBlobs(blobs) {
  const ids = [];
  for (const blob of blobs) {
    ids.push(await storeImageBlob(blob));
  }
  return ids.map(mediaRefFromId);
}

export async function getImageBlob(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteImageBlob(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).delete(id);
  await txPromise(tx);
}

export async function deleteMediaRefs(refs) {
  const mediaRefs = refs.filter(isMediaRef);
  await Promise.all(mediaRefs.map((ref) => deleteImageBlob(mediaIdFromRef(ref))));
}

const objectUrlCache = new Map();

export async function resolveImageSrc(src) {
  if (!src) return '';
  if (!isMediaRef(src)) return src;

  const id = mediaIdFromRef(src);
  if (objectUrlCache.has(id)) return objectUrlCache.get(id);

  const blob = await getImageBlob(id);
  if (!blob) return '';
  const url = URL.createObjectURL(blob);
  objectUrlCache.set(id, url);
  return url;
}

export async function resolvePropertyImages(images = []) {
  return Promise.all(images.map(resolveImageSrc));
}

export function revokeCachedUrls() {
  objectUrlCache.forEach((url) => URL.revokeObjectURL(url));
  objectUrlCache.clear();
}
