import { useState } from 'react';
import { useTranslation } from '../i18n/index.jsx';
import { getActiveProperties, getPropertyName } from '../services/properties.js';
import { createLead } from '../services/crm.js';
import './ContactForm.css';

export default function ContactForm({ preselectedProperty = '' }) {
  const { t, lang } = useTranslation();
  const properties = getActiveProperties();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    property: preselectedProperty,
    message: ''
  });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setStatus('error');
      return;
    }

    createLead({
      ...form,
      propertyTitle: form.property
        ? getPropertyName(properties.find((p) => p.id === form.property), lang)
        : '',
      source: 'website',
      language: lang,
    });

    setStatus('success');
    setForm({ name: '', email: '', phone: '', property: '', message: '' });
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="contact-form-section" id="contact-form-section">
      <div className="container">
        <div className="contact-form-wrapper">
          <div className="contact-form__header">
            <h2 className="contact-form__title text-gold">{t('form.title')}</h2>
            <p className="contact-form__subtitle">{t('form.subtitle')}</p>
          </div>

          <form className="contact-form__grid" onSubmit={handleSubmit} id="contact-form">
            {status === 'success' ? (
              <div className="contact-form__success">
                <div className="contact-form__success-icon">✨</div>
                <p className="contact-form__success-text">{t('form.success')}</p>
              </div>
            ) : (
              <>
                <div className="contact-form__field">
                  <label className="contact-form__label">{t('form.name')} *</label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('form.name')}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label">{t('form.email')} *</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('form.email')}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label">{t('form.phone')} *</label>
                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('form.phone')}
                    required
                  />
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label">{t('form.property')}</label>
                  <select
                    className="input select"
                    name="property"
                    value={form.property}
                    onChange={handleChange}
                  >
                    <option value="">{t('form.propertyPlaceholder')}</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>
                        {getPropertyName(p, lang)} — ${p.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label className="contact-form__label">{t('form.message')}</label>
                  <textarea
                    className="input textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('form.messagePlaceholder')}
                    rows={4}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-form__error">{t('form.error')}</div>
                )}

                <div className="contact-form__actions">
                  <button type="submit" className="btn btn--gold btn--lg" id="submit-inquiry-btn">
                    {t('form.submit')}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
