const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, 'src', 'i18n');

const teamTranslations = {
  en: {
    member1_name: "Alexander Volkov",
    member1_role: "CEO & Founder",
    member1_desc: "15 years of experience in luxury real estate investment and development in Southeast Asia.",
    member2_name: "Elena Rostova",
    member2_role: "Head of Sales",
    member2_desc: "Expert in selecting exclusive villas and supporting transactions for VIP clients.",
    member3_name: "Budi Santoso",
    member3_role: "Chief Architect",
    member3_desc: "Lead architect specializing in integrating modern design into tropical nature."
  },
  ru: {
    member1_name: "Александр Волков",
    member1_role: "CEO & Основатель",
    member1_desc: "15 лет опыта в инвестициях и девелопменте премиальной недвижимости в Юго-Восточной Азии.",
    member2_name: "Елена Ростова",
    member2_role: "Руководитель отдела продаж",
    member2_desc: "Эксперт по подбору эксклюзивных вилл и сопровождению сделок для VIP-клиентов.",
    member3_name: "Budi Santoso",
    member3_role: "Главный архитектор",
    member3_desc: "Ведущий архитектор, специализирующийся на интеграции современного дизайна в тропическую природу."
  },
  es: {
    member1_name: "Alexander Volkov",
    member1_role: "CEO y Fundador",
    member1_desc: "15 años de experiencia en inversión y desarrollo de bienes raíces de lujo en el sudeste asiático.",
    member2_name: "Elena Rostova",
    member2_role: "Directora de Ventas",
    member2_desc: "Experta en selección de villas exclusivas y acompañamiento en transacciones para clientes VIP.",
    member3_name: "Budi Santoso",
    member3_role: "Arquitecto Principal",
    member3_desc: "Arquitecto líder especializado en la integración del diseño moderno en la naturaleza tropical."
  },
  fr: {
    member1_name: "Alexander Volkov",
    member1_role: "PDG et Fondateur",
    member1_desc: "15 ans d'expérience dans l'investissement et le développement immobilier de luxe en Asie du Sud-Est.",
    member2_name: "Elena Rostova",
    member2_role: "Directrice des Ventes",
    member2_desc: "Experte dans la sélection de villas exclusives et l'accompagnement des transactions pour clients VIP.",
    member3_name: "Budi Santoso",
    member3_role: "Architecte en Chef",
    member3_desc: "Architecte principal spécialisé dans l'intégration du design moderne à la nature tropicale."
  },
  zh: {
    member1_name: "Alexander Volkov",
    member1_role: "首席执行官兼创始人",
    member1_desc: "在东南亚豪华房地产投资和开发方面拥有 15 年经验。",
    member2_name: "Elena Rostova",
    member2_role: "销售主管",
    member2_desc: "为VIP客户挑选独家别墅和协助交易的专家。",
    member3_name: "Budi Santoso",
    member3_role: "首席建筑师",
    member3_desc: "专门将现代设计融入热带自然景观的首席建筑师。"
  },
  ar: {
    member1_name: "Alexander Volkov",
    member1_role: "الرئيس التنفيذي والمؤسس",
    member1_desc: "15 عامًا من الخبرة في استثمار وتطوير العقارات الفاخرة في جنوب شرق آسيا.",
    member2_name: "Elena Rostova",
    member2_role: "رئيسة المبيعات",
    member2_desc: "خبيرة في اختيار الفيلات الحصرية ودعم المعاملات لعملاء كبار الشخصيات.",
    member3_name: "Budi Santoso",
    member3_role: "كبير المهندسين المعماريين",
    member3_desc: "مهندس معماري رائد متخصص في دمج التصميم الحديث في الطبيعة الاستوائية."
  },
  id: {
    member1_name: "Alexander Volkov",
    member1_role: "CEO & Pendiri",
    member1_desc: "15 tahun pengalaman dalam investasi dan pengembangan real estat mewah di Asia Tenggara.",
    member2_name: "Elena Rostova",
    member2_role: "Kepala Penjualan",
    member2_desc: "Ahli dalam memilih vila eksklusif dan mendampingi transaksi untuk klien VIP.",
    member3_name: "Budi Santoso",
    member3_role: "Arsitek Utama",
    member3_desc: "Arsitek terkemuka yang berspesialisasi dalam mengintegrasikan desain modern ke alam tropis."
  }
};

const languages = ['en', 'ru', 'es', 'fr', 'zh', 'ar', 'id'];

languages.forEach(lang => {
  const filePath = path.join(i18nDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.team) {
      data.team = {};
    }
    Object.assign(data.team, teamTranslations[lang] || teamTranslations['en']);
    
    // Fallback translation for advantages
    if (lang !== 'en' && lang !== 'ru' && data.why) {
      if (!data.why.card4_title) {
        data.why.card4_title = "Anti-termite Treatment";
        data.why.card4_text = "We use modern wood protection technologies against pests for the longevity of your home.";
        data.why.card5_title = "Soil Analysis";
        data.why.card5_text = "Full geological soil analysis before starting any construction to ensure maximum safety.";
        data.why.card6_title = "Become an Investor";
        data.why.card6_text = "Exclusive opportunities for co-investing in highly profitable development projects.";
        data.why.card7_title = "Flexible Interaction";
        data.why.card7_text = "Personalized approach, convenient payment schedules, and a transparent reporting system for each client.";
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${lang}.json`);
  }
});
