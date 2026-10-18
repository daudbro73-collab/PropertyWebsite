export const testimonials = [
  {
    id: 't1',
    rating: 5,
    avatar: 'MR',
    name: { en: 'Michael R.', ru: 'Михаил Р.', es: 'Michael R.', fr: 'Michael R.', zh: 'Michael R.' },
    country: { en: 'Germany', ru: 'Германия', es: 'Alemania', fr: 'Allemagne', zh: '德国' },
    property: {
      en: 'Ocean Cliff Villa, Uluwatu',
      ru: 'Вилла Ocean Cliff, Улувату',
      es: 'Villa Ocean Cliff, Uluwatu',
      fr: 'Villa Ocean Cliff, Uluwatu',
      zh: 'Ocean Cliff别墅，乌鲁瓦图',
    },
    text: {
      en: 'Archipelago guided us through every step — from selecting the villa to legal paperwork. The team speaks excellent English and German. We closed the deal in 6 weeks.',
      ru: 'Archipelago сопровождали нас на каждом этапе — от выбора виллы до юридического оформления. Команда отлично говорит по-английски и по-немецки. Сделку закрыли за 6 недель.',
      es: 'Archipelago nos guió en cada paso, desde la selección de la villa hasta el papeleo legal. Cerramos el trato en 6 semanas.',
      fr: 'Archipelago nous a accompagnés à chaque étape. L\'équipe parle parfaitement anglais et allemand. Transaction conclue en 6 semaines.',
      zh: 'Archipelago全程指导我们——从选房到法律文件。团队英语和德语都很流利。6周内完成交易。',
    },
  },
  {
    id: 't2',
    rating: 5,
    avatar: 'AK',
    name: { en: 'Anna K.', ru: 'Анна К.', es: 'Anna K.', fr: 'Anna K.', zh: 'Anna K.' },
    country: { en: 'Russia', ru: 'Россия', es: 'Rusia', fr: 'Russie', zh: '俄罗斯' },
    property: {
      en: 'Rice Terrace Retreat, Ubud',
      ru: 'Rice Terrace Retreat, Убуд',
      es: 'Rice Terrace Retreat, Ubud',
      fr: 'Rice Terrace Retreat, Ubud',
      zh: '梯田静居，乌布',
    },
    text: {
      en: 'We were looking for a property for personal use and rental income. The ROI forecast was accurate — our villa is booked 85% of the year. Highly recommend Alexander and his team.',
      ru: 'Искали объект для личного использования и аренды. Прогноз ROI оказался точным — вилла забронирована 85% года. Очень рекомендую Александра и его команду.',
      es: 'Buscábamos una propiedad para uso personal y alquiler. El pronóstico de ROI fue preciso — nuestra villa está reservada el 85% del año.',
      fr: 'Nous cherchions une propriété pour usage personnel et location. La prévision de ROI était exacte — notre villa est réservée 85% de l\'année.',
      zh: '我们寻找自用和出租的房产。投资回报率预测准确——别墅全年85%被预订。',
    },
  },
  {
    id: 't3',
    rating: 5,
    avatar: 'JL',
    name: { en: 'James L.', ru: 'Джеймс Л.', es: 'James L.', fr: 'James L.', zh: 'James L.' },
    country: { en: 'Australia', ru: 'Австралия', es: 'Australia', fr: 'Australie', zh: '澳大利亚' },
    property: {
      en: 'Beachfront Penthouse, Seminyak',
      ru: 'Пентхаус Beachfront, Семиньяк',
      es: 'Penthouse Beachfront, Seminyak',
      fr: 'Penthouse Beachfront, Seminyak',
      zh: '海滨顶层公寓，水明漾',
    },
    text: {
      en: 'Transparent process, no hidden fees. They arranged virtual tours before our trip to Bali and met us at the airport. A truly premium service at every level.',
      ru: 'Прозрачный процесс, без скрытых комиссий. Организовали виртуальные туры до поездки на Бали и встретили в аэропорту. По-настоящему премиальный сервис на каждом уровне.',
      es: 'Proceso transparente, sin costes ocultos. Organizaron visitas virtuales antes de nuestro viaje a Bali. Un servicio verdaderamente premium.',
      fr: 'Processus transparent, sans frais cachés. Ils ont organisé des visites virtuelles avant notre voyage à Bali. Un service vraiment premium.',
      zh: '流程透明，无隐藏费用。在我们去巴厘岛之前安排了虚拟看房。真正的高端服务。',
    },
  },
  {
    id: 't4',
    rating: 5,
    avatar: 'SC',
    name: { en: 'Sophie C.', ru: 'Софи С.', es: 'Sophie C.', fr: 'Sophie C.', zh: 'Sophie C.' },
    country: { en: 'France', ru: 'Франция', es: 'Francia', fr: 'France', zh: '法国' },
    property: {
      en: 'Tropical Garden Estate, Canggu',
      ru: 'Tropical Garden Estate, Чангу',
      es: 'Tropical Garden Estate, Canggu',
      fr: 'Tropical Garden Estate, Canggu',
      zh: '热带花园庄园，仓古',
    },
    text: {
      en: 'As a French investor, I appreciated the legal support and connection with local notaries. Archipelago made buying property in Indonesia feel safe and professional.',
      ru: 'Как французскому инвестору, мне было важно юридическое сопровождение и связь с местными нотариусами. Archipelago сделали покупку в Индонезии безопасной и профессиональной.',
      es: 'Como inversora francesa, aprecié el apoyo legal y la conexión con notarios locales. Archipelago hizo que comprar en Indonesia fuera seguro.',
      fr: 'En tant qu\'investisseuse française, j\'ai apprécié le soutien juridique et la connexion avec les notaires locaux. Archipelago a rendu l\'achat en Indonésie sûr et professionnel.',
      zh: '作为法国投资者，我很欣赏法律支持和与当地公证人的联系。Archipelago让在印尼购房变得安全专业。',
    },
  },
];

export function getTestimonialField(item, field, lang) {
  return item[field]?.[lang] || item[field]?.en || '';
}
