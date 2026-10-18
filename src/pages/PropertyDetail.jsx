import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/index.jsx';
import {
  getActiveProperties,
  getPropertyById,
  getPropertyName,
  getPropertyDescription,
  formatPropertyPrice,
  subscribe,
} from '../services/properties.js';
import useResolvedImages from '../hooks/useResolvedImages.js';
import PropertyCard from '../components/PropertyCard.jsx';
import DownloadBrochureButton from '../components/DownloadBrochureButton.jsx';
import ContactForm from '../components/ContactForm.jsx';
import './PropertyDetail.css';

const typeEmojis = { villa: '🏡', apartment: '🏢', land: '🌿' };

export default function PropertyDetail() {
  const { id } = useParams();
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState(getActiveProperties);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const refresh = useCallback(() => setAllProperties(getActiveProperties()), []);
  useEffect(() => subscribe(refresh), [refresh]);

  const property = getPropertyById(id) || allProperties.find((p) => p.id === id);
  const { images: galleryImages } = useResolvedImages(property?.images || []);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  const nextImage = () => {
    if (galleryImages.length) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (galleryImages.length) {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  if (!property) {
    return (
      <div className="detail-page">
        <div className="container">
          <p>Property not found</p>
          <Link to="/properties" className="btn btn--outline">{t('propertyDetail.back')}</Link>
        </div>
      </div>
    );
  }

  const name = getPropertyName(property, lang);
  const description = getPropertyDescription(property, lang);
  const similar = allProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.location === property.location))
    .slice(0, 3);

  const features = [
    { icon: '🛏', label: t('propertyDetail.bedrooms'), value: property.bedrooms || '—' },
    { icon: '🚿', label: t('propertyDetail.bathrooms'), value: property.bathrooms || '—' },
    { icon: '📐', label: t('propertyDetail.area'), value: `${property.area} m²` },
    { icon: '🏗', label: t('propertyDetail.year'), value: property.year || '—' },
    { icon: '🚗', label: t('propertyDetail.parking'), value: property.parking ? t('propertyDetail.yes') : t('propertyDetail.no') },
    { icon: '🏊', label: t('propertyDetail.pool'), value: property.pool ? t('propertyDetail.yes') : t('propertyDetail.no') },
    { icon: '🌿', label: t('propertyDetail.garden'), value: property.garden ? t('propertyDetail.yes') : t('propertyDetail.no') },
    { icon: '🔒', label: t('propertyDetail.security'), value: property.security ? t('propertyDetail.yes') : t('propertyDetail.no') },
  ];

  return (
    <>
      <div className="detail-page" id="property-detail-page">
        <div className="container">
          <button onClick={() => navigate('/properties')} className="detail-back">
            <span className="arrow-icon">←</span> {t('propertyDetail.back')}
          </button>

          {/* Gallery */}
          {/* Gallery Carousel */}
          <div className="detail-gallery-carousel">
            {galleryImages.length > 0 ? (
              <>
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${name} - ${currentImageIndex + 1}`}
                  className="detail-gallery-carousel__main"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button className="detail-carousel-btn detail-carousel-btn--prev" onClick={prevImage}>‹</button>
                    <button className="detail-carousel-btn detail-carousel-btn--next" onClick={nextImage}>›</button>
                    
                    <div className="detail-carousel-thumbnails">
                      {galleryImages.map((imgSrc, idx) => (
                        <div 
                          key={idx}
                          className={`detail-carousel-thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(idx)}
                        >
                          <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="detail-gallery__placeholder">
                {typeEmojis[property.type] || '🏠'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="detail-layout">
            <div className="detail-info">
              <h1 className="detail-info__title">{name}</h1>
              <div className="detail-info__location">
                <span>📍</span>
                <span>{property.location}</span>
              </div>

              <div className="detail-info__section">
                <h2 className="detail-info__section-title">{t('propertyDetail.description')}</h2>
                <p className="detail-info__description">{description}</p>
              </div>

              <div className="detail-info__section">
                <h2 className="detail-info__section-title">{t('propertyDetail.features')}</h2>
                <div className="detail-features">
                  {features.map((f, i) => (
                    <div key={i} className="detail-feature">
                      <div className="detail-feature__icon">{f.icon}</div>
                      <div>
                        <div className="detail-feature__label">{f.label}</div>
                        <div className="detail-feature__value">{f.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="detail-price-card">
                <div className="detail-price-card__price">{formatPropertyPrice(property)}</div>
                <div className="detail-price-card__type">
                  {t(`propertyDetail.${property.type}`)}
                  {property.category && ` • ${t(`properties.filter${property.category.charAt(0).toUpperCase() + property.category.slice(1)}`)}`}
                  {property.listingType && ` • ${t(property.listingType === 'rent' ? 'properties.forRent' : 'properties.forSale')}`}
                  {' • '}{property.location}
                </div>

                <div className="detail-price-card__specs">
                  {property.bedrooms > 0 && (
                    <div className="detail-price-card__spec">
                      <span className="detail-price-card__spec-label">{t('propertyDetail.bedrooms')}</span>
                      <span className="detail-price-card__spec-value">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="detail-price-card__spec">
                      <span className="detail-price-card__spec-label">{t('propertyDetail.bathrooms')}</span>
                      <span className="detail-price-card__spec-value">{property.bathrooms}</span>
                    </div>
                  )}
                  <div className="detail-price-card__spec">
                    <span className="detail-price-card__spec-label">{t('propertyDetail.area')}</span>
                    <span className="detail-price-card__spec-value">{property.area} m²</span>
                  </div>
                </div>

                <a href="#contact-form-section" className="btn btn--gold btn--lg detail-price-card__btn" id="inquire-btn">
                  {t('propertyDetail.inquire')}
                </a>

                <DownloadBrochureButton property={property} />
              </div>
            </aside>
          </div>

          {/* Similar Properties */}
          {similar.length > 0 && (
            <div className="detail-similar">
              <h2 className="section-header__title">
                <span className="text-gold">{t('propertyDetail.similar')}</span>
              </h2>
              <div className="detail-similar__grid">
                {similar.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ContactForm preselectedProperty={property.id} />
    </>
  );
}
