import { useState, useRef, useEffect } from 'react';
import { useTranslation, CRM_LANGUAGES } from '../../i18n/index.jsx';

export default function CRMLanguageSelector({ variant = 'dark' }) {
  const { lang, setLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current =
    CRM_LANGUAGES.find((l) => l.code === lang) || CRM_LANGUAGES.find((l) => l.code === 'en');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div
      className={`crm-lang-selector crm-lang-selector--${variant}`}
      ref={ref}
    >
      <button
        type="button"
        className="crm-lang-selector__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select CRM language"
      >
        <span className="crm-lang-selector__flag">{current.flag}</span>
        <span className="crm-lang-selector__code">{current.code.toUpperCase()}</span>
        <span className={`crm-lang-selector__arrow ${isOpen ? 'crm-lang-selector__arrow--open' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="crm-lang-selector__dropdown" role="listbox">
          {CRM_LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`crm-lang-selector__option ${l.code === lang ? 'crm-lang-selector__option--active' : ''}`}
              onClick={() => handleSelect(l.code)}
              role="option"
              aria-selected={l.code === lang}
            >
              <span className="crm-lang-selector__flag">{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
