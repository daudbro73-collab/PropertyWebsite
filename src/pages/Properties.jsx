import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n/index.jsx';
import {
  getActiveProperties,
  getLocations,
  subscribe,
} from '../services/properties.js';
import PropertyCard from '../components/PropertyCard.jsx';
import ContactForm from '../components/ContactForm.jsx';
import './Properties.css';

export default function Properties() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState(getActiveProperties);
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [listingFilter, setListingFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const refresh = useCallback(() => setProperties(getActiveProperties()), []);
  useEffect(() => subscribe(refresh), [refresh]);

  const locations = useMemo(() => getLocations(properties), [properties]);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (listingFilter !== 'all') {
      result = result.filter((p) => p.listingType === listingFilter);
    }

    if (locationFilter !== 'all') {
      result = result.filter((p) => p.location === locationFilter);
    }

    switch (sort) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [properties, typeFilter, categoryFilter, listingFilter, locationFilter, sort]);

  return (
    <>
      <div className="properties-page">
        <div className="container">
          <div className="section-header">
            <div className="section-header__label">{t('properties.label')}</div>
            <h1 className="section-header__title">
              <span className="text-gold">{t('properties.title')}</span>
            </h1>
            <p className="section-header__subtitle">{t('properties.subtitle')}</p>
          </div>

          <div className="properties-filters" id="properties-filters">
            <div className="properties-filters__types">
              {['all', 'villa', 'apartment', 'land'].map((type) => (
                <button
                  key={type}
                  className={`properties-filters__type-btn ${typeFilter === type ? 'properties-filters__type-btn--active' : ''}`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type === 'all'
                    ? t('properties.filterAll')
                    : t(`properties.filter${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                </button>
              ))}
            </div>

            <div className="properties-filters__types">
              {['all', 'residential', 'commercial'].map((cat) => (
                <button
                  key={cat}
                  className={`properties-filters__type-btn ${categoryFilter === cat ? 'properties-filters__type-btn--active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === 'all'
                    ? t('properties.filterAll')
                    : t(`properties.filter${cat.charAt(0).toUpperCase() + cat.slice(1)}`)}
                </button>
              ))}
            </div>

            <div className="properties-filters__types">
              {['all', 'sale', 'rent'].map((lt) => (
                <button
                  key={lt}
                  className={`properties-filters__type-btn ${listingFilter === lt ? 'properties-filters__type-btn--active' : ''}`}
                  onClick={() => setListingFilter(lt)}
                >
                  {lt === 'all'
                    ? t('properties.filterAll')
                    : lt === 'sale'
                      ? t('properties.filterSale')
                      : t('properties.filterRent')}
                </button>
              ))}
            </div>

            <div className="properties-filters__selects">
              <select
                className="properties-filters__select"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">{t('properties.allLocations')}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                className="properties-filters__select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">{t('properties.sortNewest')}</option>
                <option value="priceAsc">{t('properties.sortPriceAsc')}</option>
                <option value="priceDesc">{t('properties.sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="properties-grid" id="properties-grid">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="properties-empty">
              <div className="properties-empty__icon">🔍</div>
              <p>{t('properties.noResults')}</p>
            </div>
          )}
        </div>
      </div>

      <ContactForm />
    </>
  );
}
