export const MAX_PROPERTY_IMAGES = 10;
export const MAX_IMAGE_DIMENSION = 2560;
export const IMAGE_QUALITY = 0.9;
export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to encode image'))),
      type,
      quality
    );
  });
}

export async function processImageFile(file) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('unsupported_type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('file_too_large');
  }

  const img = await loadImageFromFile(file);
  const { naturalWidth: w, naturalHeight: h } = img;
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(w, h));
  const width = Math.round(w * scale);
  const height = Math.round(h * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  let blob;
  try {
    blob = await canvasToBlob(canvas, 'image/webp', IMAGE_QUALITY);
  } catch {
    blob = await canvasToBlob(canvas, 'image/jpeg', IMAGE_QUALITY);
  }

  return blob;
}

export async function processImageFiles(files, currentCount = 0) {
  const available = MAX_PROPERTY_IMAGES - currentCount;
  if (available <= 0) return [];

  const selected = Array.from(files)
    .filter((f) => f.type.startsWith('image/'))
    .slice(0, available);

  const results = [];
  for (const file of selected) {
    try {
      const blob = await processImageFile(file);
      results.push(blob);
    } catch {
      // skip invalid files
    }
  }
  return results;
}
