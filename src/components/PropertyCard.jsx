import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/index.jsx';
import { getPropertyName, formatPropertyPrice } from '../services/properties.js';
import useResolvedImages from '../hooks/useResolvedImages.js';
import './PropertyCard.css';

const typeEmojis = { villa: '🏡', apartment: '🏢', land: '🌿' };

export default function PropertyCard({ property }) {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const name = getPropertyName(property, lang);
  const { images: resolvedImages } = useResolvedImages(property.images || []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayImages = resolvedImages.length ? resolvedImages : property.images || [];

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (displayImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (displayImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }
  };

  const handleCardClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div className="property-card" id={`property-card-${property.id}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="property-card__image-wrapper">
        {displayImages.length > 0 ? (
          <>
            <img
              className="property-card__image"
              src={displayImages[currentImageIndex]}
              alt={name}
              loading="lazy"
            />
            {displayImages.length > 1 && (
              <>
                <button className="property-card__nav property-card__nav--prev" onClick={handlePrevImage} aria-label="Previous image">
                  ‹
                </button>
                <button className="property-card__nav property-card__nav--next" onClick={handleNextImage} aria-label="Next image">
                  ›
                </button>
                <div className="property-card__dots">
                  {displayImages.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`property-card__dot ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="property-card__placeholder">
            {typeEmojis[property.type] || '🏠'}
          </div>
        )}
        <div className="property-card__badge">
          {t(`propertyDetail.${property.type}`)}
        </div>
        {property.listingType && (
          <div className={`property-card__listing-badge property-card__listing-badge--${property.listingType}`}>
            {property.listingType === 'rent' ? t('properties.forRent') : t('properties.forSale')}
          </div>
        )}
        <div className="property-card__price-tag">
          {formatPropertyPrice(property)}
        </div>
      </div>

      <div className="property-card__content">
        <h3 className="property-card__title">{name}</h3>
        <div className="property-card__location">
          <span>📍</span>
          <span>{property.location}</span>
        </div>

        <div className="property-card__specs">
          {property.bedrooms > 0 && (
            <div className="property-card__spec">
              <span className="property-card__spec-icon">🛏</span>
              <span className="property-card__spec-value">{property.bedrooms}</span>
              <span>{t('properties.beds')}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="property-card__spec">
              <span className="property-card__spec-icon">🚿</span>
              <span className="property-card__spec-value">{property.bathrooms}</span>
              <span>{t('properties.baths')}</span>
            </div>
          )}
          <div className="property-card__spec">
            <span className="property-card__spec-icon">📐</span>
            <span className="property-card__spec-value">{property.area}</span>
            <span>m²</span>
          </div>
        </div>
      </div>

      <div className="property-card__footer">
        <Link to={`/properties/${property.id}`} className="property-card__detail-link">
          {t('properties.details')} <span className="arrow-icon">→</span>
        </Link>
      </div>
    </div>
  );
}
