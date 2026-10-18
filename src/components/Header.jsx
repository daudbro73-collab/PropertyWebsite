import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import './Header.css';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = useCallback(() => setMobileOpen(false), []);
  const toggleMenu = useCallback(() => setMobileOpen((v) => !v), []);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, closeMenu]);

  const headerClass = ['header', 'header--solid', mobileOpen ? 'header--menu-open' : '']
    .filter(Boolean)
    .join(' ');

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/properties', label: t('nav.properties') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className={headerClass} id="main-header">
      <div className="header__bar">
        <div className="header__inner">
          <Link to="/" className="header__logo" id="logo-link" onClick={closeMenu}>
            <div className="header__logo-icon">A</div>
            <span className="header__logo-text">Archipelago</span>
          </Link>

          <nav className="header__nav" id="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`header__nav-link ${location.pathname === link.to ? 'header__nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <div className="header__lang-desktop">
              <LanguageSelector />
            </div>
            <button
              type="button"
              className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
              onClick={toggleMenu}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              id="mobile-menu-toggle"
            >
              <span className="header__hamburger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`header__backdrop ${mobileOpen ? 'header__backdrop--visible' : ''}`}
        onClick={closeMenu}
        aria-label="Close menu"
        tabIndex={mobileOpen ? 0 : -1}
      />

      <nav
        id="mobile-nav"
        className={`header__drawer ${mobileOpen ? 'header__drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="header__drawer-head">
          <span className="header__drawer-label">{t('nav.menu')}</span>
        </div>

        <div className="header__drawer-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__mobile-link ${location.pathname === link.to ? 'header__mobile-link--active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="header__drawer-footer">
          <span className="header__drawer-lang-label">{t('nav.language')}</span>
          <LanguageSelector dropUp />
        </div>
      </nav>
    </header>
  );
}
