const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n');
const languages = ['en', 'ru', 'es', 'zh', 'fr', 'ar', 'id'];

const names = {
  en: "Alex Rostoff",
  ru: "Алексей Ростов",
  es: "Alex Rostoff",
  zh: "Alex Rostoff",
  fr: "Alex Rostoff",
  ar: "Alex Rostoff",
  id: "Alex Rostoff"
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.team) {
      data.team.member2_name = names[lang];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated ${lang}.json name`);
    }
  }
});
