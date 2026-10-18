import { useTranslation } from '../i18n/index.jsx';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{t('footer.privacy')}</h1>
        <div className="content" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('privacy.s1_title')}</h2>
          <p>{t('privacy.s1_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('privacy.s2_title')}</h2>
          <p>{t('privacy.s2_text')}
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>{t('privacy.s2_li1')}</li>
              <li>{t('privacy.s2_li2')}</li>
              <li>{t('privacy.s2_li3')}</li>
            </ul>
          </p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('privacy.s3_title')}</h2>
          <p>{t('privacy.s3_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('privacy.s4_title')}</h2>
          <p>{t('privacy.s4_text')}</p>
          <br/>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{t('privacy.s5_title')}</h2>
          <p>{t('privacy.s5_text')}</p>
        </div>
      </div>
    </div>
  );
}
