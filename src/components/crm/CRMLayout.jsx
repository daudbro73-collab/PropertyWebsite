import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/index.jsx';
import CRMLanguageSelector from './CRMLanguageSelector.jsx';

export default function CRMLayout({
  activeTab,
  onTabChange,
  onLogout,
  onExport,
  onAddLead,
  onAddProperty,
  children,
}) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'overview', label: t('crm.nav_overview'), icon: '📊' },
    { id: 'leads', label: t('crm.nav_leads'), icon: '👥' },
    { id: 'pipeline', label: t('crm.nav_pipeline'), icon: '📋' },
    { id: 'properties', label: t('crm.nav_properties'), icon: '🏠' },
  ];

  return (
    <div className="crm-app">
      <aside className="crm-sidebar">
        <div className="crm-sidebar__brand">
          <div className="crm-sidebar__logo">A</div>
          <div>
            <div className="crm-sidebar__title">Archipelago</div>
            <div className="crm-sidebar__subtitle">{t('crm.brand')}</div>
          </div>
        </div>

        <nav className="crm-sidebar__nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`crm-sidebar__link ${activeTab === tab.id ? 'crm-sidebar__link--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="crm-sidebar__icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="crm-sidebar__footer">
          <Link to="/" className="crm-sidebar__back">
            ← {t('crm.back_to_site')}
          </Link>
        </div>
      </aside>

      <div className="crm-main">
        <header className="crm-topbar">
          <div>
            <h1 className="crm-topbar__title text-gold">{t('crm.title')}</h1>
            <p className="crm-topbar__subtitle">{t('crm.subtitle')}</p>
          </div>
          <div className="crm-topbar__actions">
            <CRMLanguageSelector variant="light" />
            {activeTab === 'properties' ? (
              <button type="button" className="btn btn--gold btn--sm" onClick={onAddProperty}>
                + {t('crm.add_property')}
              </button>
            ) : (
              <button type="button" className="btn btn--gold btn--sm" onClick={onAddLead}>
                + {t('crm.add_lead')}
              </button>
            )}
            {activeTab !== 'properties' && (
              <button type="button" className="btn btn--outline btn--sm" onClick={onExport}>
                {t('crm.export')}
              </button>
            )}
            <button type="button" className="crm-topbar__logout" onClick={onLogout}>
              {t('crm.logout')}
            </button>
          </div>
        </header>

        <div className="crm-main__content">{children}</div>
      </div>
    </div>
  );
}
