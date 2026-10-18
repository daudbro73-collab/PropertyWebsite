import { useTranslation } from '../i18n/index.jsx';
import ContactForm from '../components/ContactForm.jsx';
import TeamSection from '../components/TeamSection.jsx';
import { FaSearch, FaTrophy, FaHandshake, FaGem } from 'react-icons/fa';
import './About.css';

const ValueIcons = {
  transparency: FaSearch,
  expertise: FaTrophy,
  approach: FaHandshake,
  quality: FaGem,
};

export default function About() {
  const { t } = useTranslation();

  const values = [
    { icon: ValueIcons.transparency, title: t('about.value1_title'), text: t('about.value1_text') },
    { icon: ValueIcons.expertise, title: t('about.value2_title'), text: t('about.value2_text') },
    { icon: ValueIcons.approach, title: t('about.value3_title'), text: t('about.value3_text') },
    { icon: ValueIcons.quality, title: t('about.value4_title'), text: t('about.value4_text') },
  ];

  return (
    <>
      <div className="about-page" id="about-page">
        <div className="container">
          {/* Hero */}
          <div className="about-hero">
            <div className="section-header__label">{t('about.label')}</div>
            <h1 className="about-hero__title">
              <span className="text-gold">{t('about.title')}</span>
            </h1>
            <p className="about-hero__subtitle">{t('about.subtitle')}</p>
          </div>

          {/* Story */}
          <div className="about-story">
            <div className="about-story__image">
              <img
                src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Men in blazers"
                className="about-story__photo"
                loading="lazy"
              />
            </div>
            <div className="about-story__content">
              <h2 className="about-story__title text-gold">{t('about.story_title')}</h2>
              <p className="about-story__text">{t('about.story_text')}</p>
              <div className="gold-divider" style={{ margin: '0 0 24px 0' }} />
              <h2 className="about-story__title text-gold">{t('about.mission_title')}</h2>
              <p className="about-story__text">{t('about.mission_text')}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <section className="about-values">
          <div className="container">
            <div className="section-header">
              <h2 className="section-header__title">
                <span className="text-gold">{t('about.values_title')}</span>
              </h2>
            </div>
            <div className="about-values__grid">
              {values.map((v, i) => (
                <div key={i} className="about-value-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="about-value-card__icon">
                    <v.icon />
                  </div>
                  <h3 className="about-value-card__title">{v.title}</h3>
                  <p className="about-value-card__text">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Team Section */}
        <TeamSection />
      </div>

      <ContactForm />
    </>
  );
}
