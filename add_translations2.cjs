const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n');
const languages = ['en', 'ru', 'es', 'zh', 'fr', 'ar', 'id'];

const newTranslations = {
  en: {
    table: {
      bali: "Bali, Indonesia",
      phuket: "Thailand (Phuket)",
      spain: "Spain",
      florida: "USA (Florida)"
    },
    team_extra: {
      deals_1_1: "Sale of Karma Kandara villas - $48M",
      deals_1_2: "One Palm Villas development - $35M",
      deals_1_3: "Partnership with UAE investment fund - $60M",
      deals_2_1: "Sale of The View Villas - $32M",
      deals_2_2: "Exclusive contract with hotel chain - $18M",
      deals_2_3: "Launch of Lombok Sanctuary project - $25M",
      deals_3_1: "Eco-Luxury Villas concept",
      deals_3_2: "360° modular construction system",
      deals_3_3: "BIM and 3D visualization integration"
    }
  },
  ru: {
    table: {
      bali: "Бали, Индонезия",
      phuket: "Таиланд (Пхукет)",
      spain: "Испания",
      florida: "США (Флорида)"
    },
    team_extra: {
      deals_1_1: "Продажа комплекса вилл Karma Kandara - $48M",
      deals_1_2: "Девелопмент One Palm Villas - $35M",
      deals_1_3: "Партнерство с крупным инвестфондом из ОАЭ - $60M",
      deals_2_1: "Продажа The View Villas - $32M",
      deals_2_2: "Эксклюзивный контракт с сетью отелей - $18M",
      deals_2_3: "Запуск проекта Lombok Sanctuary - $25M",
      deals_3_1: "Концепция Eco-Luxury Villas",
      deals_3_2: "Модульная система строительства 360°",
      deals_3_3: "Интеграция BIM и 3D-визуализации в процессы"
    }
  }
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const source = newTranslations[lang] || newTranslations['en'];
    
    if (!data.table) data.table = source.table;
    
    if (data.team_extra) {
      Object.assign(data.team_extra, source.team_extra);
    } else {
      data.team_extra = source.team_extra;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
