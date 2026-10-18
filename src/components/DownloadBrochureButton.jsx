import { useState } from 'react';
import { useTranslation } from '../i18n/index.jsx';
import './DownloadBrochureButton.css';

export default function DownloadBrochureButton({ property, className = '' }) {
  const { t, lang } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { generatePropertyBrochure, getBrochureLabels } = await import('../utils/propertyBrochure.js');
      await generatePropertyBrochure(property, lang, getBrochureLabels(t));
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`brochure-btn ${className}`}
      onClick={handleDownload}
      disabled={loading}
      id="download-brochure-btn"
    >
      <span className="brochure-btn__icon">{loading ? '⏳' : '📄'}</span>
      <span>{loading ? t('brochure.generating') : t('brochure.download')}</span>
    </button>
  );
}
