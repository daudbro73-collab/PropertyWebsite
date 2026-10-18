import { useState } from 'react';
import { useTranslation } from '../../i18n/index.jsx';
import { getActiveProperties, getPropertyName } from '../../services/properties.js';
import { AGENTS, LEAD_SOURCES, LEAD_PRIORITIES } from '../../services/crm.js';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  property: '',
  message: '',
  source: 'manual',
  assignedTo: '',
  priority: 'medium',
  budget: '',
};

export default function AddLeadModal({ open, onClose, onSubmit, lang }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const properties = getActiveProperties();

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    onSubmit({
      ...form,
      propertyTitle: form.property
        ? getPropertyName(properties.find((p) => p.id === form.property), lang)
        : '',
      language: lang,
    });
    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="crm-modal-overlay" onClick={onClose}>
      <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crm-modal__header">
          <h2>{t('crm.add_lead')}</h2>
          <button type="button" className="crm-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="crm-modal__form" onSubmit={handleSubmit}>
          <div className="crm-modal__grid">
            <div className="crm-modal__field">
              <label>{t('crm.name')} *</label>
              <input className="input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.email')} *</label>
              <input className="input" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.phone')} *</label>
              <input className="input" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.budget')}</label>
              <input className="input" name="budget" value={form.budget} onChange={handleChange} placeholder="$500,000" />
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.property')}</label>
              <select className="input select" name="property" value={form.property} onChange={handleChange}>
                <option value="">{t('crm.no_property')}</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {getPropertyName(p, lang)}
                  </option>
                ))}
              </select>
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.source')}</label>
              <select className="input select" name="source" value={form.source} onChange={handleChange}>
                {LEAD_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {t(`crm.source_${s}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.assigned_to')}</label>
              <select className="input select" name="assignedTo" value={form.assignedTo} onChange={handleChange}>
                <option value="">{t('crm.unassigned')}</option>
                {AGENTS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="crm-modal__field">
              <label>{t('crm.priority')}</label>
              <select className="input select" name="priority" value={form.priority} onChange={handleChange}>
                {LEAD_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {t(`crm.priority_${p}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="crm-modal__field">
            <label>{t('crm.message')}</label>
            <textarea className="input textarea" name="message" rows={3} value={form.message} onChange={handleChange} />
          </div>

          <div className="crm-modal__actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>
              {t('crm.cancel')}
            </button>
            <button type="submit" className="btn btn--gold">
              {t('crm.save_lead')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
