import PropertyThumb from './PropertyThumb.jsx';
import { useMemo } from 'react';
import { useTranslation } from '../../i18n/index.jsx';
import {
  getPropertyName,
  formatPropertyPrice,
  PROPERTY_CATEGORIES,
  LISTING_TYPES,
  PROPERTY_STATUSES,
} from '../../services/properties.js';

export default function PropertyList({
  properties,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleStatus,
  categoryFilter,
  listingFilter,
  statusFilter,
  search,
  onCategoryFilterChange,
  onListingFilterChange,
  onStatusFilterChange,
  onSearchChange,
}) {
  const { t, lang } = useTranslation();

  const filtered = useMemo(() => {
    let result = [...properties].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (listingFilter !== 'all') {
      result = result.filter((p) => p.listingType === listingFilter);
    }
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          getPropertyName(p, lang).toLowerCase().includes(s) ||
          p.location?.toLowerCase().includes(s)
      );
    }
    return result;
  }, [properties, categoryFilter, listingFilter, statusFilter, search, lang]);

  return (
    <>
      <div className="crm-filters">
        <input
          className="input crm-filters__search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('crm.search_properties')}
        />
        <div className="crm-filters__btns crm-filters__btns--wrap">
          <button
            type="button"
            className={`crm-filter-btn ${categoryFilter === 'all' ? 'crm-filter-btn--active' : ''}`}
            onClick={() => onCategoryFilterChange('all')}
          >
            {t('crm.filterAll')}
          </button>
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`crm-filter-btn ${categoryFilter === cat ? 'crm-filter-btn--active' : ''}`}
              onClick={() => onCategoryFilterChange(cat)}
            >
              {t(`crm.category_${cat}`)}
            </button>
          ))}
          <span className="crm-filters__divider" />
          {LISTING_TYPES.map((lt) => (
            <button
              key={lt}
              type="button"
              className={`crm-filter-btn ${listingFilter === lt ? 'crm-filter-btn--active' : ''}`}
              onClick={() => onListingFilterChange(listingFilter === lt ? 'all' : lt)}
            >
              {t(`crm.listing_${lt}`)}
            </button>
          ))}
          <span className="crm-filters__divider" />
          <button
            type="button"
            className={`crm-filter-btn ${statusFilter === 'all' ? 'crm-filter-btn--active' : ''}`}
            onClick={() => onStatusFilterChange('all')}
          >
            {t('crm.all_statuses')}
          </button>
          {PROPERTY_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`crm-filter-btn ${statusFilter === s ? 'crm-filter-btn--active' : ''}`}
              onClick={() => onStatusFilterChange(s)}
            >
              {t(`crm.property_status_${s}`)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="crm-table-wrapper">
          <table className="crm-table">
            <thead>
              <tr>
                <th>{t('crm.property_name')}</th>
                <th>{t('crm.field_location')}</th>
                <th>{t('crm.field_category')}</th>
                <th>{t('crm.field_listing_type')}</th>
                <th>{t('crm.field_price')}</th>
                <th>{t('crm.field_status')}</th>
                <th>{t('crm.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="crm-property-cell">
                      {property.images?.[0] && (
                        <PropertyThumb src={property.images[0]} className="crm-property-cell__thumb" />
                      )}
                      <div>
                        <strong>{getPropertyName(property, lang)}</strong>
                        <span className="crm-property-cell__meta">
                          {t(`propertyDetail.${property.type}`)}
                          {property.featured && ` · ${t('crm.field_featured')}`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{property.location}</td>
                  <td>
                    <span className={`crm-tag crm-tag--${property.category}`}>
                      {t(`crm.category_${property.category}`)}
                    </span>
                  </td>
                  <td>
                    <span className={`crm-tag crm-tag--${property.listingType}`}>
                      {t(`crm.listing_${property.listingType}`)}
                    </span>
                  </td>
                  <td>{formatPropertyPrice(property)}</td>
                  <td>
                    <button
                      type="button"
                      className={`crm-status-toggle crm-status-toggle--${property.status}`}
                      onClick={() => onToggleStatus(property.id)}
                    >
                      {t(`crm.property_status_${property.status}`)}
                    </button>
                  </td>
                  <td>
                    <div className="crm-table__actions">
                      <button
                        type="button"
                        className="crm-table__edit-btn"
                        onClick={() => onEdit(property)}
                        title={t('crm.edit_property')}
                      >
                        ✎
                      </button>
                      <button
                        type="button"
                        className={`crm-table__star-btn ${property.featured ? 'crm-table__star-btn--active' : ''}`}
                        onClick={() => onToggleFeatured(property.id)}
                        title={t('crm.field_featured')}
                      >
                        ★
                      </button>
                      <button
                        type="button"
                        className="crm-table__delete-btn"
                        onClick={() => onDelete(property.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="crm-empty">
          <div className="crm-empty__icon">🏠</div>
          <p>{t('crm.no_properties')}</p>
        </div>
      )}
    </>
  );
}
