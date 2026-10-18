import { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/index.jsx';
import PropertyImageUpload from './PropertyImageUpload.jsx';
import {
  PROPERTY_TYPES,
  PROPERTY_CATEGORIES,
  LISTING_TYPES,
  PROPERTY_STATUSES,
} from '../../services/properties.js';

const emptyForm = {
  name_en: '',
  name_ru: '',
  description_en: '',
  description_ru: '',
  type: 'villa',
  category: 'residential',
  listingType: 'sale',
  price: '',
  location: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  year: '',
  parking: false,
  pool: false,
  garden: false,
  security: false,
  featured: false,
  status: 'active',
  images: [],
};

function formFromProperty(property) {
  if (!property) return { ...emptyForm, images: [] };
  return {
    name_en: property.name?.en || '',
    name_ru: property.name?.ru || '',
    description_en: property.description?.en || '',
    description_ru: property.description?.ru || '',
    type: property.type,
    category: property.category,
    listingType: property.listingType,
    price: String(property.price || ''),
    location: property.location || '',
    bedrooms: String(property.bedrooms || ''),
    bathrooms: String(property.bathrooms || ''),
    area: String(property.area || ''),
    year: property.year ? String(property.year) : '',
    parking: property.parking,
    pool: property.pool,
    garden: property.garden,
    security: property.security,
    featured: property.featured,
    status: property.status,
    images: [...(property.images || [])],
  };
}

function buildPropertyPayload(form) {
  const name = {
    en: form.name_en.trim(),
    ru: form.name_ru.trim() || form.name_en.trim(),
    es: form.name_en.trim(),
    zh: form.name_en.trim(),
    fr: form.name_en.trim(),
    ar: form.name_en.trim(),
    id: form.name_en.trim(),
  };
  const description = {
    en: form.description_en.trim(),
    ru: form.description_ru.trim() || form.description_en.trim(),
    es: form.description_en.trim(),
    zh: form.description_en.trim(),
    fr: form.description_en.trim(),
    ar: form.description_en.trim(),
    id: form.description_en.trim(),
  };

  return {
    name,
    description,
    type: form.type,
    category: form.category,
    listingType: form.listingType,
    price: Number(form.price) || 0,
    location: form.location.trim(),
    bedrooms: Number(form.bedrooms) || 0,
    bathrooms: Number(form.bathrooms) || 0,
    area: Number(form.area) || 0,
    year: form.year ? Number(form.year) : null,
    parking: form.parking,
    pool: form.pool,
    garden: form.garden,
    security: form.security,
    featured: form.featured,
    status: form.status,
    images: form.images,
  };
}

export default function AddPropertyModal({ open, onClose, onSubmit, property = null }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const isEdit = Boolean(property);

  useEffect(() => {
    if (open) setForm(formFromProperty(property));
  }, [open, property]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name_en.trim() || !form.location.trim()) return;
    onSubmit(buildPropertyPayload(form));
    setForm({ ...emptyForm, images: [] });
    onClose();
  };

  return (
    <div className="crm-modal-overlay" onClick={onClose}>
      <div className="crm-modal crm-modal--wide" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal__header">
          <h2>{isEdit ? t('crm.edit_property') : t('crm.add_property')}</h2>
          <button type="button" className="crm-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="crm-modal__form" onSubmit={handleSubmit}>
          <div className="crm-modal__section">
            <h3 className="crm-modal__section-title">{t('crm.section_basic')}</h3>
            <div className="crm-modal__grid">
              <div className="crm-modal__field">
                <label>{t('crm.field_name_en')} *</label>
                <input className="input" name="name_en" value={form.name_en} onChange={handleChange} required />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_name_ru')}</label>
                <input className="input" name="name_ru" value={form.name_ru} onChange={handleChange} />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_location')} *</label>
                <input className="input" name="location" value={form.location} onChange={handleChange} required />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_type')}</label>
                <select className="input select" name="type" value={form.type} onChange={handleChange}>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t(`propertyDetail.${type}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_category')}</label>
                <select className="input select" name="category" value={form.category} onChange={handleChange}>
                  {PROPERTY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {t(`crm.category_${cat}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_listing_type')}</label>
                <select className="input select" name="listingType" value={form.listingType} onChange={handleChange}>
                  {LISTING_TYPES.map((lt) => (
                    <option key={lt} value={lt}>
                      {t(`crm.listing_${lt}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="crm-modal__field">
                <label>
                  {form.listingType === 'rent' ? t('crm.field_rent_price') : t('crm.field_price')} *
                </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_status')}</label>
                <select className="input select" name="status" value={form.status} onChange={handleChange}>
                  {PROPERTY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t(`crm.property_status_${s}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="crm-modal__section">
            <h3 className="crm-modal__section-title">{t('crm.section_details')}</h3>
            <div className="crm-modal__grid">
              <div className="crm-modal__field">
                <label>{t('crm.field_bedrooms')}</label>
                <input className="input" type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} min="0" />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_bathrooms')}</label>
                <input className="input" type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} min="0" />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_area')}</label>
                <input className="input" type="number" name="area" value={form.area} onChange={handleChange} min="0" />
              </div>
              <div className="crm-modal__field">
                <label>{t('crm.field_year')}</label>
                <input className="input" type="number" name="year" value={form.year} onChange={handleChange} min="1900" max="2100" />
              </div>
            </div>

            <div className="crm-modal__checkboxes">
              {['parking', 'pool', 'garden', 'security', 'featured'].map((field) => (
                <label key={field} className="crm-modal__checkbox">
                  <input type="checkbox" name={field} checked={form[field]} onChange={handleChange} />
                  {t(`crm.field_${field}`)}
                </label>
              ))}
            </div>
          </div>

          <div className="crm-modal__section">
            <h3 className="crm-modal__section-title">{t('crm.section_description')}</h3>
            <div className="crm-modal__field">
              <label>{t('crm.field_description_en')}</label>
              <textarea className="input textarea" name="description_en" rows={3} value={form.description_en} onChange={handleChange} />
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.field_description_ru')}</label>
              <textarea className="input textarea" name="description_ru" rows={3} value={form.description_ru} onChange={handleChange} />
            </div>
          </div>

          <div className="crm-modal__section">
            <h3 className="crm-modal__section-title">{t('crm.section_images')}</h3>
            <PropertyImageUpload
              images={form.images}
              onChange={(images) => setForm({ ...form, images })}
            />
          </div>

          <div className="crm-modal__actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>
              {t('crm.cancel')}
            </button>
            <button type="submit" className="btn btn--gold">
              {isEdit ? t('crm.save_property') : t('crm.add_property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
