import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/index.jsx';
import { CONTACT, getTelLink, getMailtoLink } from '../config/social.js';
import SocialLinks from './SocialLinks.jsx';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">A</div>
              <span className="footer__logo-text">Archipelago</span>
            </div>
            <p className="footer__brand-description">
              {t('footer.description')}
            </p>
            <div className="footer__socials">
              <p className="footer__socials-label">{t('footer.followUs')}</p>
              <SocialLinks variant="footer" />
            </div>
          </div>

          <div>
            <h4 className="footer__heading">{t('footer.quickLinks')}</h4>
            <div className="footer__links">
              <Link to="/" className="footer__link">{t('nav.home')}</Link>
              <Link to="/properties" className="footer__link">{t('nav.properties')}</Link>
              <Link to="/about" className="footer__link">{t('nav.about')}</Link>
              <Link to="/contact" className="footer__link">{t('nav.contact')}</Link>
            </div>
          </div>

          <div>
            <h4 className="footer__heading">{t('footer.contactUs')}</h4>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📍</span>
              <span>{t('contact.address')}</span>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">📞</span>
              <a href={getTelLink()}>{CONTACT.phoneDisplay}</a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">✉️</span>
              <a href={getMailtoLink()}>{CONTACT.email}</a>
            </div>
          </div>

          <div>
            <h4 className="footer__heading">{t('contact.hours_label')}</h4>
            <div className="footer__contact-item">
              <span className="footer__contact-icon">🕐</span>
              <span>{t('contact.hours')}</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{t('footer.copyright')}</p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">{t('footer.privacy')}</Link>
            <Link to="/terms" className="footer__legal-link">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
