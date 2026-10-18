import { propertySeed, getPropertyName, getPropertyDescription } from '../data/properties.js';
import { deleteMediaRefs, isMediaRef } from './propertyMedia.js';
import { MAX_PROPERTY_IMAGES } from '../utils/processImage.js';

const PROPERTIES_KEY = 'site_properties';
const SEEDED_KEY = 'site_properties_seeded';
const PROPERTIES_EVENT = 'properties-updated';

export const PROPERTY_TYPES = ['villa', 'apartment', 'land'];
export const PROPERTY_CATEGORIES = ['residential', 'commercial'];
export const LISTING_TYPES = ['sale', 'rent'];
export const PROPERTY_STATUSES = ['active', 'draft'];

export { getPropertyName, getPropertyDescription };

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || generateId();
}

function inferCategory(property) {
  if (property.category) return property.category;
  if (property.type === 'land') return 'residential';
  return 'residential';
}

/** Resolve public asset paths under Vite base (e.g. /property/). */
export function withBasePath(src) {
  if (!src || typeof src !== 'string') return src;
  if (/^(https?:|data:|media:|blob:)/i.test(src)) return src;

  const base = import.meta.env.BASE_URL || '/';
  let path = src.replace(/^\/+/, '');

  // Strip known deploy folder prefixes left from older deploys
  let changed = true;
  while (changed) {
    changed = false;
    for (const folder of ['realestate/', 'property/']) {
      if (path.startsWith(folder)) {
        path = path.slice(folder.length);
        changed = true;
      }
    }
  }

  return `${base}${path}`;
}

function migrateProperty(property) {
  const name = property.name || { en: 'Untitled' };
  const description = property.description || { en: '' };

  return {
    id: property.id || slugify(name.en || 'property'),
    type: PROPERTY_TYPES.includes(property.type) ? property.type : 'villa',
    category: PROPERTY_CATEGORIES.includes(property.category)
      ? property.category
      : inferCategory(property),
    listingType: LISTING_TYPES.includes(property.listingType) ? property.listingType : 'sale',
    price: Number(property.price) || 0,
    bedrooms: Number(property.bedrooms) || 0,
    bathrooms: Number(property.bathrooms) || 0,
    area: Number(property.area) || 0,
    year: property.year ?? null,
    parking: Boolean(property.parking),
    pool: Boolean(property.pool),
    garden: Boolean(property.garden),
    security: Boolean(property.security),
    location: property.location || '',
    featured: Boolean(property.featured),
    status: PROPERTY_STATUSES.includes(property.status) ? property.status : 'active',
    images: Array.isArray(property.images)
      ? property.images.filter(Boolean).slice(0, MAX_PROPERTY_IMAGES).map(withBasePath)
      : [],
    name,
    description,
    createdAt: property.createdAt || new Date().toISOString(),
    updatedAt: property.updatedAt || property.createdAt || new Date().toISOString(),
  };
}

function notify() {
  window.dispatchEvent(new CustomEvent(PROPERTIES_EVENT));
}

function seedIfNeeded() {
  if (localStorage.getItem(SEEDED_KEY)) return;
  const seeded = propertySeed.map((p) =>
    migrateProperty({
      ...p,
      category: p.type === 'land' ? 'residential' : 'residential',
      listingType: 'sale',
      status: 'active',
    })
  );
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(seeded));
  localStorage.setItem(SEEDED_KEY, 'true');
}

export function subscribe(listener) {
  const handler = () => listener();
  window.addEventListener(PROPERTIES_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(PROPERTIES_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}

export function getProperties() {
  seedIfNeeded();
  try {
    const raw = JSON.parse(localStorage.getItem(PROPERTIES_KEY) || '[]');
    const migrated = raw.map(migrateProperty);
    // Heal image URLs after base path changes (/ → /realestate/ → /property/)
    const needsHeal = migrated.some((p, i) => {
      const before = raw[i]?.images || [];
      const after = p.images || [];
      return before.length !== after.length || before.some((img, j) => img !== after[j]);
    });
    if (needsHeal) {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return propertySeed.map(migrateProperty);
  }
}

export function getActiveProperties() {
  return getProperties().filter((p) => p.status === 'active');
}

export function getPropertyById(id) {
  return getProperties().find((p) => p.id === id) || null;
}

function persist(properties) {
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  notify();
}

export function createProperty(data) {
  const now = new Date().toISOString();
  const properties = getProperties();
  let id = data.id ? slugify(data.id) : slugify(data.name?.en || 'property');

  if (properties.some((p) => p.id === id)) {
    id = `${id}-${generateId().slice(-4)}`;
  }

  const property = migrateProperty({
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  });

  properties.push(property);
  persist(properties);
  return property;
}

export function updateProperty(id, updates) {
  const properties = getProperties();
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const oldImages = properties[index].images || [];
  const newImages = updates.images ?? oldImages;
  const removed = oldImages.filter((img) => isMediaRef(img) && !newImages.includes(img));
  if (removed.length) deleteMediaRefs(removed);

  properties[index] = migrateProperty({
    ...properties[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  });
  persist(properties);
  return properties[index];
}

export function deleteProperty(id) {
  const properties = getProperties();
  const property = properties.find((p) => p.id === id);
  if (property?.images?.length) {
    deleteMediaRefs(property.images.filter(isMediaRef));
  }
  persist(properties.filter((p) => p.id !== id));
}

export function getPropertyStats(properties = getProperties()) {
  const total = properties.length;
  const active = properties.filter((p) => p.status === 'active').length;
  const residential = properties.filter((p) => p.category === 'residential').length;
  const commercial = properties.filter((p) => p.category === 'commercial').length;
  const forSale = properties.filter((p) => p.listingType === 'sale').length;
  const forRent = properties.filter((p) => p.listingType === 'rent').length;

  return { total, active, residential, commercial, forSale, forRent };
}

export function getLocations(properties = getActiveProperties()) {
  return [...new Set(properties.map((p) => p.location).filter(Boolean))];
}

export function getDisplayPrice(property) {
  return property?.price ?? 0;
}

export function formatPropertyPrice(property) {
  const price = getDisplayPrice(property);
  const formatted = `$${price.toLocaleString()}`;
  return property?.listingType === 'rent' ? `${formatted}/mo` : formatted;
}
