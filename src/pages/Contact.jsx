import { useTranslation } from '../i18n/index.jsx';
import ContactForm from '../components/ContactForm.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { CONTACT, getTelLink, getMailtoLink, getWhatsAppLink } from '../config/social.js';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();

  const contactItems = [
    { icon: '📍', label: t('contact.address_label'), value: t('contact.address') },
    { icon: '📞', label: t('contact.phone_label'), value: CONTACT.phoneDisplay, link: getTelLink() },
    { icon: '✉️', label: t('contact.email_label'), value: CONTACT.email, link: getMailtoLink() },
    { icon: '💬', label: t('contact.whatsapp_label'), value: CONTACT.phoneDisplay, link: getWhatsAppLink() },
    { icon: '🕐', label: t('contact.hours_label'), value: t('contact.hours') },
  ];

  return (
    <>
      <div className="contact-page" id="contact-page">
        <div className="container">
          <div className="section-header">
            <div className="section-header__label">{t('contact.label')}</div>
            <h1 className="section-header__title">
              <span className="text-gold">{t('contact.title')}</span>
            </h1>
            <p className="section-header__subtitle">{t('contact.subtitle')}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              {contactItems.map((item, i) => (
                <div key={i} className="contact-info__card">
                  <div className="contact-info__icon">{item.icon}</div>
                  <div>
                    <div className="contact-info__label">{item.label}</div>
                    <div className="contact-info__value">
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="contact-social">
                <h3 className="contact-social__title">{t('footer.followUs')}</h3>
                <SocialLinks variant="contact" showLabels />
              </div>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.91611756543!2d115.15843181533036!3d-8.692348593754877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24716769947ed%3A0x6b8d4c9a66d03cf8!2sSeminyak%2C%20Kuta%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}
