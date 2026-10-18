import { useTranslation } from '../i18n/index.jsx';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{t('footer.terms')}</h1>
        <div className="content" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('terms.s1_title')}</h2>
          <p>{t('terms.s1_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('terms.s2_title')}</h2>
          <p>{t('terms.s2_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('terms.s3_title')}</h2>
          <p>{t('terms.s3_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('terms.s4_title')}</h2>
          <p>{t('terms.s4_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('terms.s5_title')}</h2>
          <p>{t('terms.s5_text')}</p>
        </div>
      </div>
    </div>
  );
}
