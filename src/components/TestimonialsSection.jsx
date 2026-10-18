import { useTranslation } from '../i18n/index.jsx';
import { testimonials, getTestimonialField } from '../data/testimonials.js';
import './TestimonialsSection.css';

function Stars({ count }) {
  return (
    <div className="testimonials__stars" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t, lang } = useTranslation();

  return (
    <section className="testimonials section" id="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header__label">{t('testimonials.label')}</div>
          <h2 className="section-header__title">
            <span className="text-gold">{t('testimonials.title')}</span>
          </h2>
          <p className="section-header__subtitle">{t('testimonials.subtitle')}</p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonials__card">
              <Stars count={item.rating} />
              <blockquote className="testimonials__quote">
                «{getTestimonialField(item, 'text', lang)}»
              </blockquote>
              <div className="testimonials__author">
                <div className="testimonials__avatar">{item.avatar}</div>
                <div>
                  <div className="testimonials__name">{getTestimonialField(item, 'name', lang)}</div>
                  <div className="testimonials__meta">
                    {getTestimonialField(item, 'country', lang)} · {getTestimonialField(item, 'property', lang)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonials__trust">
          <div className="testimonials__trust-item">
            <span className="testimonials__trust-number">4.9</span>
            <span>{t('testimonials.trust_rating')}</span>
          </div>
          <div className="testimonials__trust-item">
            <span className="testimonials__trust-number">150+</span>
            <span>{t('testimonials.trust_clients')}</span>
          </div>
          <div className="testimonials__trust-item">
            <span className="testimonials__trust-number">12</span>
            <span>{t('testimonials.trust_years')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
