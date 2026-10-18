import { jsPDF } from 'jspdf';
import { isMediaRef, getImageBlob, mediaIdFromRef } from '../services/propertyMedia.js';
import { getPropertyName, getPropertyDescription, formatPropertyPrice } from '../services/properties.js';
import { CONTACT, SOCIAL } from '../config/social.js';

const BRAND = {
  dark: [26, 42, 34],
  gold: [201, 168, 76],
  goldLight: [244, 212, 124],
  white: [255, 255, 255],
  gray: [120, 120, 120],
  lightBg: [248, 246, 242],
};

async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function loadImageDataUrl(src) {
  if (!src) return null;
  try {
    let blob;
    if (isMediaRef(src)) {
      blob = await getImageBlob(mediaIdFromRef(src));
      if (!blob) return null;
    } else {
      const url = src.startsWith('/') ? `${window.location.origin}${src}` : src;
      const res = await fetch(url);
      if (!res.ok) return null;
      blob = await res.blob();
    }
    return await blobToDataUrl(blob);
  } catch {
    return null;
  }
}

function getImageFormat(dataUrl) {
  if (dataUrl.includes('image/png')) return 'PNG';
  if (dataUrl.includes('image/webp')) return 'WEBP';
  return 'JPEG';
}

function setBrandFill(doc, color) {
  doc.setFillColor(...color);
}

function setBrandText(doc, color) {
  doc.setTextColor(...color);
}

function drawGoldLine(doc, x1, y1, x2, y2) {
  doc.setDrawColor(...BRAND.gold);
  doc.setLineWidth(0.8);
  doc.line(x1, y1, x2, y2);
}

function addFooter(doc, pageW, pageH, labels) {
  setBrandFill(doc, BRAND.dark);
  doc.rect(0, pageH - 14, pageW, 14, 'F');
  setBrandText(doc, BRAND.goldLight);
  doc.setFontSize(7);
  doc.text('ARCHIPELAGO LUXURY ESTATES', pageW / 2, pageH - 6, { align: 'center' });
  doc.setFontSize(6);
  setBrandText(doc, BRAND.gray);
  doc.text(labels.confidential, pageW / 2, pageH - 2.5, { align: 'center' });
}

export async function generatePropertyBrochure(property, lang, labels) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;

  const name = getPropertyName(property, lang);
  const description = getPropertyDescription(property, lang);
  const price = formatPropertyPrice(property);
  const images = property.images || [];
  const imageDataUrls = await Promise.all(images.slice(0, 6).map(loadImageDataUrl));

  // ── PAGE 1: COVER ──
  const coverImg = imageDataUrls[0];
  if (coverImg) {
    try {
      doc.addImage(coverImg, getImageFormat(coverImg), 0, 0, pageW, 130);
    } catch {
      setBrandFill(doc, BRAND.dark);
      doc.rect(0, 0, pageW, 130, 'F');
    }
  } else {
    setBrandFill(doc, BRAND.dark);
    doc.rect(0, 0, pageW, 130, 'F');
  }

  setBrandFill(doc, BRAND.dark);
  doc.rect(0, 110, pageW, 187, 'F');

  doc.setGState(new doc.GState({ opacity: 0.4 }));
  setBrandFill(doc, BRAND.gold);
  doc.rect(0, 108, pageW, 1.5, 'F');
  doc.setGState(new doc.GState({ opacity: 1 }));

  setBrandText(doc, BRAND.goldLight);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('ARCHIPELAGO LUXURY ESTATES', margin, 125);

  setBrandText(doc, BRAND.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  const titleLines = doc.splitTextToSize(name, pageW - margin * 2);
  doc.text(titleLines, margin, 140);

  setBrandText(doc, BRAND.gold);
  doc.setFontSize(22);
  doc.text(price, margin, 140 + titleLines.length * 10 + 4);

  setBrandText(doc, BRAND.gray);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`📍  ${property.location}`, margin, 140 + titleLines.length * 10 + 16);

  const badges = [
    labels.types[property.type] || property.type,
    labels.categories[property.category] || property.category,
    labels.listingTypes[property.listingType] || property.listingType,
  ].filter(Boolean);

  let badgeX = margin;
  badges.forEach((badge) => {
    const w = doc.getTextWidth(badge) + 8;
    setBrandFill(doc, BRAND.gold);
    doc.roundedRect(badgeX, 168, w, 7, 1.5, 1.5, 'F');
    setBrandText(doc, BRAND.dark);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(badge, badgeX + 4, 173);
    badgeX += w + 4;
  });

  setBrandText(doc, BRAND.gray);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(labels.tagline, margin, pageH - 22);

  // ── PAGE 2: OVERVIEW ──
  doc.addPage();
  setBrandFill(doc, BRAND.lightBg);
  doc.rect(0, 0, pageW, pageH, 'F');

  setBrandFill(doc, BRAND.dark);
  doc.rect(0, 0, pageW, 32, 'F');
  setBrandText(doc, BRAND.goldLight);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(labels.overview, margin, 20);

  let y = 44;
  setBrandText(doc, BRAND.dark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(labels.description, margin, y);
  y += 8;

  setBrandText(doc, [60, 60, 60]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const descLines = doc.splitTextToSize(description, pageW - margin * 2);
  doc.text(descLines, margin, y);
  y += descLines.length * 4.5 + 12;

  drawGoldLine(doc, margin, y, pageW - margin, y);
  y += 10;

  setBrandText(doc, BRAND.dark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(labels.features, margin, y);
  y += 10;

  const specs = [
    [labels.bedrooms, property.bedrooms || '—'],
    [labels.bathrooms, property.bathrooms || '—'],
    [labels.area, `${property.area} m²`],
    [labels.year, property.year || '—'],
    [labels.parking, property.parking ? labels.yes : labels.no],
    [labels.pool, property.pool ? labels.yes : labels.no],
    [labels.garden, property.garden ? labels.yes : labels.no],
    [labels.security, property.security ? labels.yes : labels.no],
  ];

  const colW = (pageW - margin * 2) / 2;
  specs.forEach((spec, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * colW;
    const sy = y + row * 14;

    setBrandFill(doc, BRAND.white);
    doc.roundedRect(x, sy, colW - 4, 11, 2, 2, 'F');
    setBrandText(doc, BRAND.gray);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(spec[0], x + 4, sy + 5);
    setBrandText(doc, BRAND.dark);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(String(spec[1]), x + 4, sy + 9.5);
  });

  addFooter(doc, pageW, pageH, labels);

  // ── PAGE 3: GALLERY ──
  const galleryImages = imageDataUrls.filter(Boolean);
  if (galleryImages.length > 1) {
    doc.addPage();
    setBrandFill(doc, BRAND.dark);
    doc.rect(0, 0, pageW, 32, 'F');
    setBrandText(doc, BRAND.goldLight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(labels.gallery, margin, 20);

    const gridImages = galleryImages.slice(0, 6);
    const cols = 2;
    const rows = Math.ceil(gridImages.length / cols);
    const gap = 4;
    const imgW = (pageW - margin * 2 - gap) / cols;
    const imgH = Math.min(55, (pageH - 50 - (rows - 1) * gap) / rows);

    gridImages.forEach((imgData, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = margin + col * (imgW + gap);
      const yPos = 40 + row * (imgH + gap);
      try {
        doc.addImage(imgData, getImageFormat(imgData), x, yPos, imgW, imgH);
      } catch {
        setBrandFill(doc, [40, 40, 40]);
        doc.rect(x, yPos, imgW, imgH, 'F');
      }
    });

    addFooter(doc, pageW, pageH, labels);
  }

  // ── PAGE 4: CONTACT ──
  doc.addPage();
  setBrandFill(doc, BRAND.dark);
  doc.rect(0, 0, pageW, pageH, 'F');

  setBrandText(doc, BRAND.gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('A', pageW / 2, 50, { align: 'center' });

  drawGoldLine(doc, pageW / 2 - 30, 58, pageW / 2 + 30, 58);

  setBrandText(doc, BRAND.white);
  doc.setFontSize(16);
  doc.text('ARCHIPELAGO', pageW / 2, 70, { align: 'center' });
  setBrandText(doc, BRAND.goldLight);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('LUXURY ESTATES', pageW / 2, 78, { align: 'center' });

  setBrandText(doc, BRAND.gray);
  doc.setFontSize(9);
  const contactLines = [
    CONTACT.phoneDisplay,
    CONTACT.email,
    CONTACT.address,
    '',
    labels.contact_cta,
    '',
    `WhatsApp: ${SOCIAL.whatsapp.url}`,
    `Telegram: ${SOCIAL.telegram.url}`,
    `Instagram: ${SOCIAL.instagram.url}`,
  ];
  let cy = 100;
  contactLines.forEach((line) => {
    if (line === '') { cy += 4; return; }
    setBrandText(doc, line.startsWith('WhatsApp') || line.startsWith('Telegram') || line.startsWith('Instagram') ? BRAND.goldLight : BRAND.white);
    doc.text(line, pageW / 2, cy, { align: 'center' });
    cy += 7;
  });

  setBrandText(doc, BRAND.gray);
  doc.setFontSize(7);
  doc.text(`© ${new Date().getFullYear()} Archipelago Luxury Estates`, pageW / 2, pageH - 20, { align: 'center' });
  doc.text(labels.confidential, pageW / 2, pageH - 14, { align: 'center' });

  const filename = `Archipelago_${property.id}_Brochure.pdf`;
  doc.save(filename);
}

export function getBrochureLabels(t) {
  return {
    overview: t('brochure.overview'),
    description: t('brochure.description'),
    features: t('brochure.features'),
    gallery: t('brochure.gallery'),
    bedrooms: t('propertyDetail.bedrooms'),
    bathrooms: t('propertyDetail.bathrooms'),
    area: t('propertyDetail.area'),
    year: t('propertyDetail.year'),
    parking: t('propertyDetail.parking'),
    pool: t('propertyDetail.pool'),
    garden: t('propertyDetail.garden'),
    security: t('propertyDetail.security'),
    yes: t('propertyDetail.yes'),
    no: t('propertyDetail.no'),
    tagline: t('brochure.tagline'),
    contact_cta: t('brochure.contact_cta'),
    confidential: t('brochure.confidential'),
    types: {
      villa: t('propertyDetail.villa'),
      apartment: t('propertyDetail.apartment'),
      land: t('propertyDetail.land'),
    },
    categories: {
      residential: t('crm.category_residential'),
      commercial: t('crm.category_commercial'),
    },
    listingTypes: {
      sale: t('crm.listing_sale'),
      rent: t('crm.listing_rent'),
    },
  };
}
