const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n');
const languages = ['en', 'ru', 'es', 'zh', 'fr', 'ar', 'id'];

const titles = {
  en: "Why Indonesia & Why Us",
  ru: "Почему Индонезия и Почему Мы",
  es: "Por qué Indonesia y Por qué Nosotros",
  zh: "为什么选择印尼及为什么选择我们",
  fr: "Pourquoi l'Indonésie et Pourquoi Nous",
  ar: "لماذا إندونيسيا ولماذا نحن",
  id: "Mengapa Indonesia & Mengapa Kami"
};

const subtitles = {
  en: "Discover why Indonesia is the top choice for luxury real estate investment, and why our expertise makes us your ideal partner.",
  ru: "Узнайте, почему Индонезия — лучший выбор для инвестиций в элитную недвижимость, и почему наш опыт делает нас идеальным партнером.",
  es: "Descubra por qué Indonesia es la mejor opción para la inversión en bienes raíces de lujo, y por qué nuestra experiencia nos convierte en su socio ideal.",
  zh: "了解为什么印尼是豪华房地产投资的首选，以及为什么我们的专业知识使我们成为您理想的合作伙伴。",
  fr: "Découvrez pourquoi l'Indonésie est le meilleur choix pour l'investissement immobilier de luxe, et pourquoi notre expertise fait de nous votre partenaire idéal.",
  ar: "اكتشف لماذا تعد إندونيسيا الخيار الأفضل للاستثمار العقاري الفاخر ، ولماذا تجعلنا خبرتنا شريكك المثالي.",
  id: "Temukan mengapa Indonesia adalah pilihan utama untuk investasi real estat mewah, dan mengapa keahlian kami menjadikan kami mitra ideal Anda."
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.why) {
      data.why.title = titles[lang];
      data.why.subtitle = subtitles[lang];
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});

