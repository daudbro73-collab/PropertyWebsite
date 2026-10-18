import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/index.jsx';
import './LanguageSelector.css';

export default function LanguageSelector({ dropUp = false }) {
  const { lang, setLang, languages, currentLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

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
    <div className={`lang-selector ${dropUp ? 'lang-selector--drop-up' : ''}`} ref={ref}>
      <button
        className="lang-selector__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        id="language-selector-button"
      >
        <span className="lang-selector__flag">{currentLang.flag}</span>
        <span className="lang-selector__code">{lang}</span>
        <span className={`lang-selector__arrow ${isOpen ? 'lang-selector__arrow--open' : ''}`}>
          {dropUp ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className="lang-selector__dropdown" role="listbox" id="language-dropdown">
          {languages.map((l) => (
            <button
              key={l.code}
              className={`lang-selector__option ${l.code === lang ? 'lang-selector__option--active' : ''}`}
              onClick={() => handleSelect(l.code)}
              role="option"
              aria-selected={l.code === lang}
            >
              <span className="lang-selector__flag">{l.flag}</span>
              <span className="lang-selector__option-name">{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
