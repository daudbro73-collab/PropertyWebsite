import { useTranslation } from '../../i18n/index.jsx';
import { LEAD_STATUSES } from '../../services/crm.js';

export default function PipelineBoard({ leads, onSelectLead, onStatusChange }) {
  const { t } = useTranslation();

  return (
    <div className="crm-pipeline">
      {LEAD_STATUSES.map((status) => {
        const columnLeads = leads.filter((l) => l.status === status);
        return (
          <div key={status} className="crm-pipeline__column">
            <div className="crm-pipeline__column-header">
              <span>{t(`crm.status_${status}`)}</span>
              <span className="crm-pipeline__count">{columnLeads.length}</span>
            </div>
            <div className="crm-pipeline__cards">
              {columnLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`crm-pipeline__card crm-pipeline__card--${lead.priority}`}
                >
                  <button
                    type="button"
                    className="crm-pipeline__card-body"
                    onClick={() => onSelectLead(lead.id)}
                  >
                    <strong>{lead.name}</strong>
                    <span>{lead.propertyTitle || lead.phone}</span>
                  </button>
                  <select
                    className="crm-pipeline__status-select"
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    aria-label={t('crm.status')}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {t(`crm.status_${s}`)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
