const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n');
const languages = ['en', 'ru', 'es', 'zh', 'fr', 'ar', 'id'];

const titles = {
  en: "Why Indonesia & Why Us?",
  ru: "Почему Индонезия и Почему Мы?",
  es: "Por qué Indonesia y Por qué Nosotros?",
  zh: "为什么选择印尼及为什么选择我们？",
  fr: "Pourquoi l'Indonésie et Pourquoi Nous ?",
  ar: "لماذا إندونيسيا ولماذا نحن؟",
  id: "Mengapa Indonesia & Mengapa Kami?"
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.why) {
      data.why.title = titles[lang];
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
