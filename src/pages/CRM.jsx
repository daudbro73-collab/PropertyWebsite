import { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n/index.jsx';
import CRMLayout from '../components/crm/CRMLayout.jsx';
import PipelineBoard from '../components/crm/PipelineBoard.jsx';
import AddLeadModal from '../components/crm/AddLeadModal.jsx';
import AddPropertyModal from '../components/crm/AddPropertyModal.jsx';
import PropertyList from '../components/crm/PropertyList.jsx';
import LeadDetailPanel from '../components/crm/LeadDetailPanel.jsx';
import {
  isAuthenticated,
  login,
  logout,
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  addNote,
  getLeadStats,
  exportLeadsCSV,
  getAgentName,
  LEAD_STATUSES,
  subscribe,
} from '../services/crm.js';
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyStats,
  subscribe as subscribeProperties,
} from '../services/properties.js';
import './CRM.css';

export default function CRM() {
  const { t, lang } = useTranslation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [leads, setLeads] = useState(getLeads);
  const [properties, setProperties] = useState(getProperties);
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyCategoryFilter, setPropertyCategoryFilter] = useState('all');
  const [propertyListingFilter, setPropertyListingFilter] = useState('all');
  const [propertyStatusFilter, setPropertyStatusFilter] = useState('all');
  const [propertySearch, setPropertySearch] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const refresh = useCallback(() => setLeads(getLeads()), []);
  const refreshProperties = useCallback(() => setProperties(getProperties()), []);

  useEffect(() => subscribe(refresh), [refresh]);
  useEffect(() => subscribeProperties(refreshProperties), [refreshProperties]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      setAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  const handleCreateLead = (data) => {
    createLead(data);
    refresh();
  };

  const handleUpdateLead = (id, updates) => {
    updateLead(id, updates);
    refresh();
  };

  const handleDeleteLead = (id) => {
    if (!window.confirm(t('crm.confirm_delete'))) return;
    deleteLead(id);
    setSelectedLeadId(null);
    refresh();
  };

  const handleAddNote = (leadId, text) => {
    addNote(leadId, text);
    refresh();
  };

  const handleCreateProperty = (data) => {
    createProperty(data);
    refreshProperties();
  };

  const handleUpdateProperty = (data) => {
    if (!editingProperty) return;
    updateProperty(editingProperty.id, data);
    setEditingProperty(null);
    refreshProperties();
  };

  const handleDeleteProperty = (id) => {
    if (!window.confirm(t('crm.confirm_delete_property'))) return;
    deleteProperty(id);
    refreshProperties();
  };

  const handleToggleFeatured = (id) => {
    const property = properties.find((p) => p.id === id);
    if (property) updateProperty(id, { featured: !property.featured });
    refreshProperties();
  };

  const handleToggleStatus = (id) => {
    const property = properties.find((p) => p.id === id);
    if (property) {
      updateProperty(id, { status: property.status === 'active' ? 'draft' : 'active' });
    }
    refreshProperties();
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowPropertyModal(true);
  };

  const handleOpenAddProperty = () => {
    setEditingProperty(null);
    setShowPropertyModal(true);
  };

  const filtered = useMemo(() => {
    let result = [...leads].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    if (filter !== 'all') result = result.filter((l) => l.status === filter);
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(s) ||
          l.email?.toLowerCase().includes(s) ||
          l.phone?.includes(s)
      );
    }
    return result;
  }, [leads, filter, search]);

  const stats = useMemo(() => getLeadStats(leads), [leads]);
  const propertyStats = useMemo(() => getPropertyStats(properties), [properties]);
  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (!authenticated) {
    return (
      <div className="crm-page" id="crm-page">
        <div className="crm-login">
          <div className="crm-login__icon">🔐</div>
          <h1 className="crm-login__title text-gold">{t('crm.login_title')}</h1>
          <p className="crm-login__hint">{t('crm.login_hint')}</p>
          <form className="crm-login__form" onSubmit={handleLogin}>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('crm.login_placeholder')}
              id="crm-password-input"
            />
            {loginError && <div className="crm-login__error">{t('crm.login_error')}</div>}
            <button type="submit" className="btn btn--gold" id="crm-login-btn">
              {t('crm.login_button')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <CRMLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onExport={() => exportLeadsCSV(leads)}
        onAddLead={() => setShowAddModal(true)}
        onAddProperty={handleOpenAddProperty}
      >
        {activeTab === 'overview' && (
          <>
            <div className="crm-stats crm-stats--extended">
              <div className="crm-stat">
                <div className="crm-stat__number">{stats.total}</div>
                <div className="crm-stat__label">{t('crm.total')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{stats.new}</div>
                <div className="crm-stat__label">{t('crm.status_new')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{stats.active}</div>
                <div className="crm-stat__label">{t('crm.active')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{stats.conversionRate}%</div>
                <div className="crm-stat__label">{t('crm.conversion')}</div>
              </div>
            </div>

            <div className="crm-overview-grid">
              <div className="crm-panel">
                <h3>{t('crm.pipeline_summary')}</h3>
                <div className="crm-pipeline-summary">
                  {LEAD_STATUSES.map((status) => (
                    <div key={status} className="crm-pipeline-summary__row">
                      <span>{t(`crm.status_${status}`)}</span>
                      <div className="crm-pipeline-summary__bar">
                        <div
                          className={`crm-pipeline-summary__fill crm-pipeline-summary__fill--${status}`}
                          style={{
                            width: stats.total
                              ? `${(stats[status] / stats.total) * 100}%`
                              : '0%',
                          }}
                        />
                      </div>
                      <strong>{stats[status] || 0}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="crm-panel">
                <h3>{t('crm.recent_leads')}</h3>
                {recentLeads.length === 0 ? (
                  <p className="crm-panel__empty">{t('crm.noLeads')}</p>
                ) : (
                  <ul className="crm-recent-list">
                    {recentLeads.map((lead) => (
                      <li key={lead.id}>
                        <button type="button" onClick={() => setSelectedLeadId(lead.id)}>
                          <strong>{lead.name}</strong>
                          <span>{lead.propertyTitle || lead.email}</span>
                        </button>
                        <span className={`badge badge--${lead.status === 'new' ? 'new' : lead.status === 'completed' ? 'done' : 'progress'}`}>
                          {t(`crm.status_${lead.status}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'leads' && (
          <>
            <div className="crm-filters">
              <input
                className="input crm-filters__search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('crm.search')}
                id="crm-search-input"
              />
              <div className="crm-filters__btns">
                <button
                  type="button"
                  className={`crm-filter-btn ${filter === 'all' ? 'crm-filter-btn--active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  {t('crm.filterAll')}
                </button>
                {LEAD_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`crm-filter-btn ${filter === status ? 'crm-filter-btn--active' : ''}`}
                    onClick={() => setFilter(status)}
                  >
                    {t(`crm.status_${status}`)}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="crm-table-wrapper">
                <table className="crm-table">
                  <thead>
                    <tr>
                      <th>{t('crm.name')}</th>
                      <th>{t('crm.contact')}</th>
                      <th>{t('crm.property')}</th>
                      <th>{t('crm.source')}</th>
                      <th>{t('crm.assigned_to')}</th>
                      <th>{t('crm.priority')}</th>
                      <th>{t('crm.date')}</th>
                      <th>{t('crm.status')}</th>
                      <th>{t('crm.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <button
                            type="button"
                            className="crm-table__name-btn"
                            onClick={() => setSelectedLeadId(lead.id)}
                          >
                            <strong>{lead.name}</strong>
                          </button>
                        </td>
                        <td>
                          <div className="crm-table__contact">
                            <span>{lead.email}</span>
                            <span>{lead.phone}</span>
                          </div>
                        </td>
                        <td>{lead.propertyTitle || '—'}</td>
                        <td>{t(`crm.source_${lead.source}`)}</td>
                        <td>{getAgentName(lead.assignedTo) || t('crm.unassigned')}</td>
                        <td>
                          <span className={`crm-priority crm-priority--${lead.priority}`}>
                            {t(`crm.priority_${lead.priority}`)}
                          </span>
                        </td>
                        <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge badge--${
                              lead.status === 'new'
                                ? 'new'
                                : lead.status === 'completed'
                                  ? 'done'
                                  : 'progress'
                            }`}
                          >
                            {t(`crm.status_${lead.status}`)}
                          </span>
                        </td>
                        <td>
                          <div className="crm-table__actions">
                            <select
                              className="crm-table__status-select"
                              value={lead.status}
                              onChange={(e) => handleUpdateLead(lead.id, { status: e.target.value })}
                            >
                              {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {t(`crm.status_${s}`)}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="crm-table__delete-btn"
                              onClick={() => handleDeleteLead(lead.id)}
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
                <div className="crm-empty__icon">📭</div>
                <p>{t('crm.noLeads')}</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'pipeline' && (
          <PipelineBoard
            leads={leads}
            onSelectLead={setSelectedLeadId}
            onStatusChange={(id, status) => handleUpdateLead(id, { status })}
          />
        )}

        {activeTab === 'properties' && (
          <>
            <div className="crm-stats crm-stats--extended">
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.total}</div>
                <div className="crm-stat__label">{t('crm.properties_total')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.active}</div>
                <div className="crm-stat__label">{t('crm.property_status_active')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.residential}</div>
                <div className="crm-stat__label">{t('crm.category_residential')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.commercial}</div>
                <div className="crm-stat__label">{t('crm.category_commercial')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.forSale}</div>
                <div className="crm-stat__label">{t('crm.listing_sale')}</div>
              </div>
              <div className="crm-stat">
                <div className="crm-stat__number">{propertyStats.forRent}</div>
                <div className="crm-stat__label">{t('crm.listing_rent')}</div>
              </div>
            </div>

            <PropertyList
              properties={properties}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
              onToggleFeatured={handleToggleFeatured}
              onToggleStatus={handleToggleStatus}
              categoryFilter={propertyCategoryFilter}
              listingFilter={propertyListingFilter}
              statusFilter={propertyStatusFilter}
              search={propertySearch}
              onCategoryFilterChange={setPropertyCategoryFilter}
              onListingFilterChange={setPropertyListingFilter}
              onStatusFilterChange={setPropertyStatusFilter}
              onSearchChange={setPropertySearch}
            />
          </>
        )}
      </CRMLayout>

      <AddLeadModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateLead}
        lang={lang}
      />

      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLeadId(null)}
        onUpdate={handleUpdateLead}
        onDelete={handleDeleteLead}
        onAddNote={handleAddNote}
      />

      <AddPropertyModal
        open={showPropertyModal}
        onClose={() => {
          setShowPropertyModal(false);
          setEditingProperty(null);
        }}
        onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty}
        property={editingProperty}
      />
    </>
  );
}
