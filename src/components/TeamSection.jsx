import React from "react";
import { useTranslation } from "../i18n/index.jsx";
import { Link } from "react-router-dom";

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
  Users: FaUsers,
  Search: FaSearch,
  PenTool: FaPenNib,
  FileText: FaFileAlt,
  Tool: FaWrench,
  Key: FaKey,
  Globe: FaGlobe,
  Refresh: FaSync,
  Lightbulb: FaLightbulb,
  Leaf: FaLeaf,
};

export default function TeamSection() {
  const { t } = useTranslation();

  const TEAM_MEMBERS = [
    {
      name: t("team.member1_name"),
      role: t("team.member1_role"),
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
      exp: "17+",
      countries: "12",
      langs: "RU / EN",
      description: t("team.member1_desc"),
      projects: [
        {
          name: "Karma Kandara",
          loc: "Bali, Indonesia",
          img: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=400&q=80",
        },
        {
          name: "One Palm Villas",
          loc: "Dubai, UAE",
          img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80",
        },
        {
          name: "Oceanview Estate",
          loc: "Phuket, Thailand",
          img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&q=80",
        },
      ],
      dealsLabel: t("team_extra.key_deals"),
      deals: [
        t("team_extra.deals_1_1"),
        t("team_extra.deals_1_2"),
        t("team_extra.deals_1_3"),
      ],
      stats: [
        { val: <Icons.Users />, lbl: t("team_extra.stat_team_size") },
        { val: <Icons.Refresh />, lbl: t("team_extra.stat_full_cycle") },
        { val: <Icons.Globe />, lbl: t("team_extra.stat_global_projects") },
      ],
    },
    {
      name: t("team.member2_name"),
      role: t("team.member2_role"),
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
      exp: "11+",
      countries: "9",
      langs: "RU / EN / DE",
      description: t("team.member2_desc"),
      projects: [
        {
          name: "The View Villas",
          loc: "Bali, Indonesia",
          img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
        },
        {
          name: "Azure Heights",
          loc: "Phuket, Thailand",
          img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
        },
        {
          name: "Lombok Sanctuary",
          loc: "Lombok, Indonesia",
          img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80",
        },
      ],
      dealsLabel: t("team_extra.key_deals"),
      deals: [
        t("team_extra.deals_2_1"),
        t("team_extra.deals_2_2"),
        t("team_extra.deals_2_3"),
      ],
      stats: [
        { val: <Icons.Users />, lbl: t("team_extra.stat_sales_dept") },
        { val: <Icons.Tool />, lbl: t("team_extra.stat_sales_crm") },
        { val: <Icons.TrendingUp />, lbl: t("team_extra.stat_conversion") },
      ],
    },
    {
      name: t("team.member3_name"),
      role: t("team.member3_role"),
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
      exp: "15+",
      countries: "10",
      langs: "EN / ID",
      description: t("team.member3_desc"),
      projects: [
        {
          name: "Waves Villa Resort",
          loc: "Bali, Indonesia",
          img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
        },
        {
          name: "Green Flow Villas",
          loc: "Lombok, Indonesia",
          img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
        },
        {
          name: "Tropical Horizon",
          loc: "Phuket, Thailand",
          img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80",
        },
      ],
      dealsLabel: t("team_extra.key_developments"),
      deals: [
        t("team_extra.deals_3_1"),
        t("team_extra.deals_3_2"),
        t("team_extra.deals_3_3"),
      ],
      stats: [
        { val: <Icons.Users />, lbl: t("team_extra.stat_architects") },
        { val: <Icons.Lightbulb />, lbl: t("team_extra.stat_innovations") },
        { val: <Icons.Leaf />, lbl: t("team_extra.stat_eco") },
      ],
    },
  ];

  return (
    <section
      className="detailed-team-section section"
      id="detailed-team-section"
    >
      <div className="container">
        <div className="detailed-team-header">
          <h2 className="detailed-team-header__title">
            {t("about.team_subtitle")}
          </h2>
          <p className="detailed-team-header__subtitle">
            {t("team_extra.slogan_subtitle")}
          </p>
        </div>

        <div className="detailed-team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="cv-card animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="cv-card__header">
                <div className="cv-card__avatar-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="cv-card__avatar"
                    loading="lazy"
                  />
                  <div className="cv-card__in-badge">in</div>
                </div>
                <div className="cv-card__title-group">
                  <h3 className="cv-card__name">{member.name}</h3>
                  <p className="cv-card__role">{member.role}</p>
                </div>
              </div>

              <div className="cv-card__metrics">
                <div className="cv-metric">
                  <div className="cv-metric__label">{t("team_extra.exp")}</div>
                  <div className="cv-metric__value">
                    {member.exp}{" "}
                    {t("stats.experience")
                      .toLowerCase()
                      .replace("years experience", "лет")}
                  </div>
                </div>
                <div className="cv-metric">
                  <div className="cv-metric__label">
                    {t("team_extra.countries")}
                  </div>
                  <div className="cv-metric__value">
                    {member.countries} {t("team_extra.countries").toLowerCase()}
                  </div>
                </div>
                <div className="cv-metric">
                  <div className="cv-metric__label">
                    {t("team_extra.langs")}
                  </div>
                  <div className="cv-metric__value">{member.langs}</div>
                </div>
              </div>

              <p className="cv-card__desc">{member.description}</p>

              <div className="cv-card__projects">
                <div className="cv-section-title">
                  {t("team_extra.key_projects")}
                </div>
                <div className="cv-projects-grid">
                  {member.projects.map((proj, pidx) => (
                    <div key={pidx} className="cv-project">
                      <div className="cv-project__img-wrap">
                        <img
                          src={proj.img}
                          alt={proj.name}
                          className="cv-project__img"
                          loading="lazy"
                        />
                      </div>
                      <div className="cv-project__name">{proj.name}</div>
                      <div className="cv-project__loc">{proj.loc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cv-card__deals">
                <div className="cv-section-title">{member.dealsLabel}</div>
                <ul className="cv-deals-list">
                  {member.deals.map((deal, didx) => (
                    <li key={didx}>{deal}</li>
                  ))}
                </ul>
              </div>

              <div className="cv-card__bottom-stats">
                {member.stats.map((st, sidx) => (
                  <div key={sidx} className="cv-bottom-stat">
                    <div className="cv-bottom-stat__val">{st.val}</div>
                    <div className="cv-bottom-stat__lbl">{st.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="process-timeline-wrapper animate-fadeInUp">
          <h3 className="process-timeline-title">
            {t("team_extra.process_title")}
          </h3>
          <div className="process-timeline">
            {[
              { i: <Icons.Search />, t: t("team_extra.process_step1") },
              { i: <Icons.PenTool />, t: t("team_extra.process_step2") },
              { i: <Icons.FileText />, t: t("team_extra.process_step3") },
              { i: <Icons.Tool />, t: t("team_extra.process_step4") },
              { i: <Icons.Key />, t: t("team_extra.process_step5") },
            ].map((step, idx, arr) => (
              <div key={idx} className="process-step">
                <div className="process-step__icon">{step.i}</div>
                <div className="process-step__text">{step.t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slogan & CTA */}
        <div className="team-slogan">
          <h2 className="team-slogan__title">{t("team_extra.slogan_title")}</h2>
          <p className="team-slogan__subtitle">
            {t("team_extra.slogan_subtitle")}
          </p>
          <Link
            to="/contact"
            className="btn btn--gold btn--lg team-slogan__btn"
          >
            {t("team_extra.discuss_project")}
          </Link>
        </div>
      </div>
    </section>
  );
}
