const phoneRaw = import.meta.env.VITE_CONTACT_PHONE || '6281234567890';
const phoneDisplay = import.meta.env.VITE_CONTACT_PHONE_DISPLAY || '+62 812 3456 7890';
const email = import.meta.env.VITE_CONTACT_EMAIL || 'info@archipelago-estates.com';

export const CONTACT = {
  phone: phoneRaw,
  phoneDisplay,
  email,
  address: 'Jl. Sunset Road No. 88, Seminyak, Bali, Indonesia',
  whatsappMessage: encodeURIComponent(
    'Hello! I am interested in Archipelago Luxury Estates properties.'
  ),
};

export const SOCIAL = {
  whatsapp: {
    id: 'whatsapp',
    url: import.meta.env.VITE_WHATSAPP_URL || `https://wa.me/${phoneRaw}`,
    color: '#25D366',
    labelKey: 'social.whatsapp',
  },
  telegram: {
    id: 'telegram',
    url: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/archipelago_estates',
    color: '#0088cc',
    labelKey: 'social.telegram',
  },
  instagram: {
    id: 'instagram',
    url: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/archipelago_estates',
    color: '#E4405F',
    labelKey: 'social.instagram',
  },
  facebook: {
    id: 'facebook',
    url: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/archipelagoestates',
    color: '#1877F2',
    labelKey: 'social.facebook',
  },
  linkedin: {
    id: 'linkedin',
    url: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/company/archipelago-estates',
    color: '#0A66C2',
    labelKey: 'social.linkedin',
  },
  youtube: {
    id: 'youtube',
    url: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com/@archipelagoestates',
    color: '#FF0000',
    labelKey: 'social.youtube',
  },
};

export const MESSENGER_CHANNELS = [
  SOCIAL.whatsapp,
  SOCIAL.telegram,
  SOCIAL.instagram,
  SOCIAL.facebook,
];

export const ALL_SOCIAL = Object.values(SOCIAL);

export function getWhatsAppLink(message) {
  const text = message ? encodeURIComponent(message) : CONTACT.whatsappMessage;
  return `${SOCIAL.whatsapp.url}?text=${text}`;
}

export function getMailtoLink(subject = 'Property Inquiry') {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function getTelLink() {
  return `tel:+${phoneRaw.replace(/\D/g, '')}`;
}
