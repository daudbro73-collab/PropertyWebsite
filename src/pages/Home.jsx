import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/index.jsx";
import { getActiveProperties, subscribe } from "../services/properties.js";
import PropertyCard from "../components/PropertyCard.jsx";
import ContactForm from "../components/ContactForm.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import TeamSection from "../components/TeamSection.jsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Home.css";

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=1600&q=80",
    alt: "Rice Terraces Bali",
  },
  {
    src: "https://images.unsplash.com/photo-1536152470836-b943b246224c?w=1600&q=80",
    alt: "Uluwatu Cliffs",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    alt: "Tropical Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80",
    alt: "Lush Forest",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80",
    alt: "Ocean Cliff",
  },
];

import {
  FaChartLine,
  FaSun,
  FaChartPie,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaFlask,
  FaBalanceScale,
  FaWrench,
  FaCheck,
  FaGlobe,
  FaSync,
  FaBullseye,
  FaSearch,
  FaKey,
  FaUsers,
  FaLightbulb,
  FaLeaf,
  FaPenNib,
  FaFileAlt,
  FaLayerGroup,
} from "react-icons/fa";

const Icons = {
  TrendingUp: FaChartLine,
  Sun: FaSun,
  PieChart: FaChartPie,
  Shield: FaShieldAlt,
  Layers: FaLayerGroup,
  Users: FaUsers,
  Settings: FaWrench,
  Search: FaSearch,
  PenTool: FaPenNib,
  FileText: FaFileAlt,
  Tool: FaWrench,
  Key: FaKey,
  Clock: FaSun,
  Globe: FaGlobe,
  MapPin: FaMapMarkerAlt,
  Flask: FaFlask,
  Scale: FaBalanceScale,
  Refresh: FaSync,
  Target: FaBullseye,
  Lightbulb: FaLightbulb,
  Leaf: FaLeaf,
  Check: FaCheck,
};

export default function Home() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState(getActiveProperties);
  const featured = properties.filter((p) => p.featured);
  const [currentSlide, setCurrentSlide] = useState(0);

  const refreshProperties = useCallback(() => setProperties(getActiveProperties()), []);
  useEffect(() => subscribe(refreshProperties), [refreshProperties]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToContent = () => {
    const el = document.getElementById("why-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const chartDataPrice = [
    { year: "2018", value: 100 },
    { year: "2019", value: 112 },
    { year: "2020", value: 108 },
    { year: "2021", value: 120 },
    { year: "2022", value: 135 },
    { year: "2023", value: 150 },
    { year: "2024", value: 165 },
    { year: "2025", value: 182 },
    { year: "2026", value: 200 },
  ];

  const chartDataTourists = [
    { year: "2019", value: 6.2 },
    { year: "2020", value: 1.0 },
    { year: "2021", value: 0.8 },
    { year: "2022", value: 2.1 },
    { year: "2023", value: 5.2 },
    { year: "2024", value: 7.5 },
  ];

  const chartDataROI = [
    { name: "ROI", value: 15 },
    { name: "Other", value: 85 },
  ];
  const COLORS = ["#F4D47C", "#e0e0e0"];

  return (
    <>
      {/* Hero Section with Image Slideshow */}
      <section className="home-hero" id="hero-section">
        {/* Slideshow Background */}
        <div className="home-hero__slideshow">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`home-hero__slide ${index === currentSlide ? "home-hero__slide--active" : ""}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="home-hero__slide-image"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Dark overlay for readability */}
        <div className="home-hero__overlay" />

        {/* Floating gold particles */}
        <div className="home-hero__particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="home-hero__particle" />
          ))}
        </div>

        {/* Content */}
        <div className="home-hero__content">
          <div className="home-hero__label">
            <span>{t("hero.label")}</span>
          </div>
          <h1 className="home-hero__title text-shimmer">{t("hero.title")}</h1>
          <p className="home-hero__subtitle">{t("hero.subtitle")}</p>
          <div className="home-hero__actions">
            <Link
              to="/properties"
              className="btn btn--gold btn--lg"
              id="hero-cta"
            >
              {t("hero.cta")}
            </Link>
            <Link
              to="/contact"
              className="btn btn--lg"
              style={{
                border: "2px solid rgba(244,212,124,0.5)",
                color: "#F4D47C",
                backgroundColor: "transparent",
              }}
              id="hero-cta2"
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="home-hero__indicators">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`home-hero__indicator ${index === currentSlide ? "home-hero__indicator--active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll down arrow — visible */}
        <button
          className="home-hero__scroll"
          onClick={scrollToContent}
          aria-label="Scroll down"
        >
          <div className="home-hero__scroll-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </section>

      {/* Detailed Why Indonesia */}
      <section className="why-section section" id="why-section">
        <div className="container">
          <div className="why-header">
            <h2 className="why-header__title">
              <span className="text-gold">{t("why.title")}</span>
            </h2>
            <p className="why-header__subtitle">{t("why.subtitle")}</p>
          </div>

          <div className="why-complex-grid-6">
            {/* Chart 1: Growth */}
            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.TrendingUp />
                <h3 className="why-card-complex__title">
                  {t("why.card1_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card1_text")}</p>
              <div className="why-card-complex__slot">
                <div className="why-chart-title-group">
                  <div className="why-chart-title">
                    {t("why_extra.chart_growth_title")}
                  </div>
                  <div className="why-chart-highlight">
                    {t("why_extra.chart_growth_yoy")}
                  </div>
                </div>
              </div>
              <div className="why-card-complex__media">
                <div className="why-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartDataPrice}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(0,0,0,0.05)"
                      />
                      <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis
                        hide={true}
                        domain={["dataMin - 10", "dataMax + 10"]}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#1a2a22"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#1a2a22" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="why-card-complex__footer">
                <div className="why-chart-stats">
                  <div>
                    <span>+12%</span>
                    <small>{t("why_extra.stat_price_growth")}</small>
                  </div>
                  <div>
                    <span>2.7x</span>
                    <small>{t("why_extra.stat_tourist_growth")}</small>
                  </div>
                  <div>
                    <span>17.1M</span>
                    <small>{t("why_extra.stat_tourists_2024")}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Tourists */}
            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.Sun />
                <h3 className="why-card-complex__title">
                  {t("why.card2_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card2_text")}</p>
              <div className="why-card-complex__slot">
                <div className="why-chart-title-group">
                  <div className="why-chart-title">
                    {t("why_extra.chart_tourist_title")}
                  </div>
                </div>
              </div>
              <div className="why-card-complex__media">
                <div className="why-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartDataTourists}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(0,0,0,0.05)"
                      />
                      <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis hide={true} />
                      <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
                      <Bar
                        dataKey="value"
                        fill="#889d8f"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="why-card-complex__footer">
                <div className="why-chart-stats">
                  <div>
                    <span>
                      <Icons.Sun />
                    </span>
                    <small>{t("why_extra.stat_sunny_days")}</small>
                  </div>
                  <div>
                    <span>
                      <Icons.Globe />
                    </span>
                    <small>{t("why_extra.stat_ocean")}</small>
                  </div>
                  <div>
                    <span>
                      <Icons.Layers />
                    </span>
                    <small>{t("why_extra.stat_infrastructure")}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 3: ROI */}
            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.PieChart />
                <h3 className="why-card-complex__title">
                  {t("why.card3_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card3_text")}</p>
              <div className="why-card-complex__slot">
                <div className="why-chart-title-group">
                  <div className="why-chart-title">
                    {t("why_extra.chart_roi_title")}
                  </div>
                  <div className="why-chart-highlight">
                    {t("why_extra.chart_roi_value")}
                  </div>
                </div>
              </div>
              <div className="why-card-complex__media why-card-complex__media--roi">
                <div className="why-chart-pie">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartDataROI}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartDataROI.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        10-15%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="why-roi-legend">
                  <div>
                    <span
                      className="dot"
                      style={{ background: "#F4D47C" }}
                    ></span>
                    {t("why_extra.chart_roi_legend1")}
                  </div>
                  <div>
                    <span
                      className="dot"
                      style={{ background: "#889d8f" }}
                    ></span>
                    {t("why_extra.chart_roi_legend2")}
                  </div>
                  <div>
                    <span
                      className="dot"
                      style={{ background: "#dcdcdc" }}
                    ></span>
                    {t("why_extra.chart_roi_legend3")}
                  </div>
                </div>
              </div>
              <div className="why-card-complex__footer">
                <div className="why-chart-stats">
                  <div>
                    <span>70-85%</span>
                    <small>{t("why_extra.stat_occupancy")}</small>
                  </div>
                  <div>
                    <span>$200-$600</span>
                    <small>{t("why_extra.stat_price_per_night")}</small>
                  </div>
                  <div>
                    <span>1.5-2.3x</span>
                    <small>{t("why_extra.stat_capital_growth")}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Card 1: Anti-Termite */}
            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.Shield />
                <h3 className="why-card-complex__title">
                  {t("why.card4_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card4_text")}</p>
              <div
                className="why-card-complex__slot why-card-complex__slot--empty"
                aria-hidden="true"
              />
              <div className="why-card-complex__media">
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80"
                  alt="Construction wood framework"
                  className="why-card-img"
                />
              </div>
              <div className="why-card-complex__footer">
                <ul className="why-bullet-list">
                  <li>
                    <span className="icon">
                      <Icons.Shield />
                    </span>
                    {t("why_extra.anti_termite_bullet1")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.Clock />
                    </span>
                    {t("why_extra.anti_termite_bullet2")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.Leaf />
                    </span>
                    {t("why_extra.anti_termite_bullet3")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.Globe />
                    </span>
                    {t("why_extra.anti_termite_bullet4")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.Layers />
                <h3 className="why-card-complex__title">
                  {t("why.card5_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card5_text")}</p>
              <div
                className="why-card-complex__slot why-card-complex__slot--empty"
                aria-hidden="true"
              />
              <div className="why-card-complex__media">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                  alt="Soil analysis"
                  className="why-card-img"
                />
              </div>
              <div className="why-card-complex__footer">
                <div className="why-icons-row">
                  <div>
                    <span>
                      <Icons.MapPin />
                    </span>
                    <small>{t("why_extra.soil_bullet1")}</small>
                  </div>
                  <div>
                    <span>
                      <Icons.Flask />
                    </span>
                    <small>{t("why_extra.soil_bullet2")}</small>
                  </div>
                  <div>
                    <span>
                      <Icons.Scale />
                    </span>
                    <small>{t("why_extra.soil_bullet3")}</small>
                  </div>
                  <div>
                    <span>
                      <Icons.Tool />
                    </span>
                    <small>{t("why_extra.soil_bullet4")}</small>
                  </div>
                </div>
                <div className="why-highlight-box">
                  <strong>{t("why_extra.soil_why")}</strong>
                  <ul>
                    <li>
                      <Icons.Check /> {t("why_extra.soil_why1")}
                    </li>
                    <li>
                      <Icons.Check /> {t("why_extra.soil_why2")}
                    </li>
                    <li>
                      <Icons.Check /> {t("why_extra.soil_why3")}
                    </li>
                    <li>
                      <Icons.Check /> {t("why_extra.soil_why4")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="why-card-complex">
              <div className="why-card-complex__header">
                <Icons.Users />
                <h3 className="why-card-complex__title">
                  {t("why.card6_title")}
                </h3>
              </div>
              <p className="why-card-complex__desc">{t("why.card6_text")}</p>
              <div
                className="why-card-complex__slot why-card-complex__slot--empty"
                aria-hidden="true"
              />
              <div className="why-card-complex__media">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80"
                  alt="Business meeting investors"
                  className="why-card-img"
                />
              </div>
              <div className="why-card-complex__footer">
                <ul className="why-bullet-list">
                  <li>
                    <span className="icon">
                      <Icons.Search />
                    </span>
                    {t("why_extra.invest_bullet1")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.Scale />
                    </span>
                    {t("why_extra.invest_bullet2")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.Key />
                    </span>
                    {t("why_extra.invest_bullet3")}
                  </li>
                  <li>
                    <span className="icon">
                      <Icons.TrendingUp />
                    </span>
                    {t("why_extra.invest_bullet4")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="why-complex-grid">
            {/* Bottom Row: Table & Why Us */}
            <div className="why-complex-row why-bottom-row">
              <div className="why-card-complex why-table-card">
                <h3 className="why-card-complex__title">
                  {t("why_extra.compare_title")}
                </h3>
                <div className="why-table-responsive">
                  <table className="why-compare-table">
                    <thead>
                      <tr>
                        <th>{t("why_extra.compare_col1")}</th>
                        <th>{t("why_extra.compare_col2")}</th>
                        <th>{t("why_extra.compare_col3")}</th>
                        <th>{t("why_extra.compare_col4")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="highlight-row">
                        <td>
                          <strong>{t("table.bali")}</strong>
                        </td>
                        <td>
                          <strong>10-15%</strong>
                        </td>
                        <td>
                          <strong>8-12%</strong>
                        </td>
                        <td>
                          <strong>70-85%</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>{t("table.phuket")}</td>
                        <td>6-9%</td>
                        <td>4-7%</td>
                        <td>60-75%</td>
                      </tr>
                      <tr>
                        <td>{t("table.spain")}</td>
                        <td>4-6%</td>
                        <td>2-4%</td>
                        <td>50-65%</td>
                      </tr>
                      <tr>
                        <td>{t("table.florida")}</td>
                        <td>5-7%</td>
                        <td>3-5%</td>
                        <td>55-70%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="why-card-complex why-list-card">
                <h3 className="why-card-complex__title">
                  {t("why_extra.why_us_title")}
                </h3>
                <ul className="why-us-list">
                  <li>
                    <div className="icon">
                      <Icons.Globe />
                    </div>
                    <div>
                      <strong>{t("why_extra.why_us_1_title")}</strong>
                      <p>{t("why_extra.why_us_1_desc")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <Icons.Refresh />
                    </div>
                    <div>
                      <strong>{t("why_extra.why_us_2_title")}</strong>
                      <p>{t("why_extra.why_us_2_desc")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <Icons.Tool />
                    </div>
                    <div>
                      <strong>{t("why_extra.why_us_3_title")}</strong>
                      <p>{t("why_extra.why_us_3_desc")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <Icons.Scale />
                    </div>
                    <div>
                      <strong>{t("why_extra.why_us_4_title")}</strong>
                      <p>{t("why_extra.why_us_4_desc")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <Icons.Target />
                    </div>
                    <div>
                      <strong>{t("why_extra.why_us_5_title")}</strong>
                      <p>{t("why_extra.why_us_5_desc")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" id="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-item__number">200</div>
              <div className="stat-item__label">{t("stats.properties")}</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">$20M+</div>
              <div className="stat-item__label">{t("stats.sold")}</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">12</div>
              <div className="stat-item__label">{t("stats.experience")}</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">150</div>
              <div className="stat-item__label">{t("stats.clients")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section section" id="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header__label">{t("featured.label")}</div>
            <h2 className="section-header__title">
              <span className="text-gold">{t("featured.title")}</span>
            </h2>
            <p className="section-header__subtitle">{t("featured.subtitle")}</p>
          </div>

          <div className="featured-grid">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="featured-actions">
            <Link
              to="/properties"
              className="btn btn--outline"
              id="view-all-btn"
            >
              {t("featured.viewAll")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Detailed Team Section */}
      <TeamSection />

      {/* Contact Form */}
      <ContactForm />
    </>
  );
}
