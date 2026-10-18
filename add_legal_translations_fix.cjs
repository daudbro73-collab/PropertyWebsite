const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n'); // Fixed path
const languages = ['en', 'ru', 'es', 'zh', 'fr', 'ar', 'id'];

const translations = {
  en: {
    terms: {
      s1_title: "1. General Provisions",
      s1_text: "These terms of use (hereinafter referred to as the Terms) govern your access to and use of the Archipelago Luxury Estates website. By accessing our site, you agree to comply with these Terms.",
      s2_title: "2. Use of Materials",
      s2_text: "All materials posted on this site, including text, graphics, logos, images, and software, are the property of Archipelago Luxury Estates and are protected by copyright laws. Use of materials for commercial purposes without our prior written consent is strictly prohibited.",
      s3_title: "3. Services and Information",
      s3_text: "The information about real estate, prices, and conditions presented on the site is for informational purposes and is subject to change without prior notice. We do our best to ensure the accuracy of the information, but we do not guarantee the absence of errors.",
      s4_title: "4. Limitation of Liability",
      s4_text: "Archipelago Luxury Estates is not liable for any direct, indirect, incidental, or punitive damages arising from your access to or use of the site.",
      s5_title: "5. Changes to Terms",
      s5_text: "We reserve the right to change these Terms at any time. Changes take effect from the moment they are published on this page."
    },
    privacy: {
      s1_title: "1. Collection of Information",
      s1_text: "We collect personal information that you voluntarily provide to us when filling out contact forms, subscribing to the newsletter, or contacting our support team. This information may include your name, email address, and phone number.",
      s2_title: "2. Use of Information",
      s2_text: "The information we collect is used to:",
      s2_li1: "- Provide the services and information you requested.",
      s2_li2: "- Improve the operation of our site and the quality of service.",
      s2_li3: "- Contact you regarding real estate and our offers.",
      s3_title: "3. Data Protection",
      s3_text: "We apply appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission over the Internet is entirely secure.",
      s4_title: "4. Disclosure to Third Parties",
      s4_text: "We do not sell, trade, or transfer your personal information to third-party companies, except when necessary to provide the services you requested (e.g., legal partners) or if required by law.",
      s5_title: "5. Your Rights",
      s5_text: "You have the right to request access to your personal information that we store, as well as request its correction or deletion. To do this, please contact us using the contact details provided on the site."
    }
  },
  ru: {
    terms: {
      s1_title: "1. Общие положения",
      s1_text: "Настоящие условия использования (далее - Условия) регулируют ваш доступ и использование веб-сайта Archipelago Luxury Estates. Получая доступ к нашему сайту, вы соглашаетесь соблюдать эти Условия.",
      s2_title: "2. Использование материалов",
      s2_text: "Все материалы, размещенные на данном сайте, включая текст, графику, логотипы, изображения и программное обеспечение, являются собственностью Archipelago Luxury Estates и защищены законами об авторском праве. Использование материалов в коммерческих целях без нашего предварительного письменного согласия строго запрещено.",
      s3_title: "3. Услуги и информация",
      s3_text: "Информация об объектах недвижимости, ценах и условиях, представленная на сайте, носит ознакомительный характер и может быть изменена без предварительного уведомления. Мы делаем все возможное для обеспечения точности информации, но не гарантируем отсутствие ошибок.",
      s4_title: "4. Ограничение ответственности",
      s4_text: "Archipelago Luxury Estates не несет ответственности за любые прямые, косвенные, случайные или штрафные убытки, возникшие в результате вашего доступа к сайту или его использования.",
      s5_title: "5. Изменения условий",
      s5_text: "Мы оставляем за собой право изменять данные Условия в любое время. Изменения вступают в силу с момента их публикации на этой странице."
    },
    privacy: {
      s1_title: "1. Сбор информации",
      s1_text: "Мы собираем личную информацию, которую вы добровольно предоставляете нам при заполнении контактных форм, подписке на новостную рассылку или при обращении в нашу службу поддержки. Эта информация может включать ваше имя, адрес электронной почты и номер телефона.",
      s2_title: "2. Использование информации",
      s2_text: "Собранная нами информация используется для:",
      s2_li1: "- Предоставления запрашиваемых вами услуг и информации.",
      s2_li2: "- Улучшения работы нашего сайта и качества обслуживания.",
      s2_li3: "- Связи с вами по вопросам, связанным с недвижимостью и нашими предложениями.",
      s3_title: "3. Защита данных",
      s3_text: "Мы применяем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи данных через Интернет не является абсолютно безопасным.",
      s4_title: "4. Раскрытие информации третьим лицам",
      s4_text: "Мы не продаем, не обмениваем и не передаем вашу личную информацию сторонним компаниям, за исключением случаев, когда это необходимо для предоставления запрошенных вами услуг (например, юридическим партнерам) или если это требуется по закону.",
      s5_title: "5. Ваши права",
      s5_text: "Вы имеете право запросить доступ к вашей личной информации, которую мы храним, а также потребовать ее исправления или удаления. Для этого свяжитесь с нами по контактам, указанным на сайте."
    }
  },
  es: {
    terms: {
      s1_title: "1. Disposiciones Generales",
      s1_text: "Estos términos de uso (en adelante, los Términos) rigen su acceso y uso del sitio web de Archipelago Luxury Estates. Al acceder a nuestro sitio, usted acepta cumplir con estos Términos.",
      s2_title: "2. Uso de Materiales",
      s2_text: "Todos los materiales publicados en este sitio, incluidos textos, gráficos, logotipos, imágenes y software, son propiedad de Archipelago Luxury Estates y están protegidos por las leyes de derechos de autor. El uso de materiales con fines comerciales sin nuestro consentimiento previo por escrito está estrictamente prohibido.",
      s3_title: "3. Servicios e Información",
      s3_text: "La información sobre bienes raíces, precios y condiciones presentada en el sitio es para fines informativos y está sujeta a cambios sin previo aviso. Hacemos todo lo posible para garantizar la precisión de la información, pero no garantizamos la ausencia de errores.",
      s4_title: "4. Limitación de Responsabilidad",
      s4_text: "Archipelago Luxury Estates no es responsable de ningún daño directo, indirecto, incidental o punitivo que surja de su acceso o uso del sitio.",
      s5_title: "5. Cambios en los Términos",
      s5_text: "Nos reservamos el derecho de cambiar estos Términos en cualquier momento. Los cambios entran en vigencia desde el momento de su publicación en esta página."
    },
    privacy: {
      s1_title: "1. Recopilación de Información",
      s1_text: "Recopilamos información personal que usted nos proporciona voluntariamente al completar formularios de contacto, suscribirse al boletín informativo o ponerse en contacto con nuestro equipo de soporte. Esta información puede incluir su nombre, dirección de correo electrónico y número de teléfono.",
      s2_title: "2. Uso de la Información",
      s2_text: "La información que recopilamos se utiliza para:",
      s2_li1: "- Proporcionar los servicios y la información que solicitó.",
      s2_li2: "- Mejorar el funcionamiento de nuestro sitio y la calidad del servicio.",
      s2_li3: "- Contactarlo con respecto a bienes raíces y nuestras ofertas.",
      s3_title: "3. Protección de Datos",
      s3_text: "Aplicamos las medidas de seguridad adecuadas para proteger su información personal del acceso, alteración, divulgación o destrucción no autorizados. Sin embargo, ningún método de transmisión de datos a través de Internet es completamente seguro.",
      s4_title: "4. Divulgación a Terceros",
      s4_text: "No vendemos, intercambiamos ni transferimos su información personal a empresas de terceros, excepto cuando sea necesario para proporcionar los servicios que solicitó (por ejemplo, socios legales) o si lo exige la ley.",
      s5_title: "5. Sus Derechos",
      s5_text: "Usted tiene derecho a solicitar acceso a su información personal que almacenamos, así como a solicitar su corrección o eliminación. Para hacerlo, contáctenos utilizando los datos de contacto proporcionados en el sitio."
    }
  },
  zh: {
    terms: {
      s1_title: "1. 一般规定",
      s1_text: "这些使用条款（以下简称“条款”）管辖您访问和使用Archipelago Luxury Estates网站。访问我们的网站即表示您同意遵守这些条款。",
      s2_title: "2. 材料的使用",
      s2_text: "本网站上发布的所有材料，包括文本、图形、徽标、图像和软件，均为Archipelago Luxury Estates的财产，并受版权法保护。未经我们事先书面同意，严禁将材料用于商业目的。",
      s3_title: "3. 服务和信息",
      s3_text: "网站上提供的有关房地产、价格和条件的信息仅供参考，如有更改，恕不另行通知。我们尽力确保信息的准确性，但不保证没有错误。",
      s4_title: "4. 责任限制",
      s4_text: "Archipelago Luxury Estates对因您访问或使用本网站而引起的任何直接、间接、附带或惩罚性损害不承担任何责任。",
      s5_title: "5. 条款的变更",
      s5_text: "我们保留随时更改这些条款的权利。更改自其在本页面上发布之日起生效。"
    },
    privacy: {
      s1_title: "1. 信息的收集",
      s1_text: "我们收集您在填写联系表格、订阅新闻通讯或联系我们的支持团队时自愿提供给我们的个人信息。这些信息可能包括您的姓名、电子邮件地址和电话号码。",
      s2_title: "2. 信息的使用",
      s2_text: "我们收集的信息用于：",
      s2_li1: "- 提供您请求的服务和信息。",
      s2_li2: "- 改善我们网站的运营和服务质量。",
      s2_li3: "- 就房地产和我们的优惠与您联系。",
      s3_title: "3. 数据保护",
      s3_text: "我们采取适当的安全措施来保护您的个人信息免受未经授权的访问、更改、披露或破坏。然而，互联网上的数据传输方法都不是绝对安全的。",
      s4_title: "4. 向第三方披露",
      s4_text: "我们不向第三方公司出售、交易或转让您的个人信息，除非为了提供您请求的服务（例如法律合作伙伴）或法律要求。",
      s5_title: "5. 您的权利",
      s5_text: "您有权要求访问我们存储的您的个人信息，并要求其更正或删除。为此，请使用网站上提供的联系信息与我们联系。"
    }
  },
  fr: {
    terms: {
      s1_title: "1. Dispositions Générales",
      s1_text: "Ces conditions d'utilisation (ci-après dénommées les Conditions) régissent votre accès et votre utilisation du site Web Archipelago Luxury Estates. En accédant à notre site, vous acceptez de vous conformer à ces Conditions.",
      s2_title: "2. Utilisation du Matériel",
      s2_text: "Tout le matériel publié sur ce site, y compris le texte, les graphiques, les logos, les images et les logiciels, est la propriété de Archipelago Luxury Estates et est protégé par les lois sur le droit d'auteur. L'utilisation de matériel à des fins commerciales sans notre consentement écrit préalable est strictement interdite.",
      s3_title: "3. Services et Informations",
      s3_text: "Les informations sur l'immobilier, les prix et les conditions présentées sur le site sont à titre informatif et peuvent être modifiées sans préavis. Nous faisons de notre mieux pour assurer l'exactitude des informations, mais ne garantissons pas l'absence d'erreurs.",
      s4_title: "4. Limitation de Responsabilité",
      s4_text: "Archipelago Luxury Estates n'est pas responsable des dommages directs, indirects, accessoires ou punitifs découlant de votre accès ou de votre utilisation du site.",
      s5_title: "5. Modifications des Conditions",
      s5_text: "Nous nous réservons le droit de modifier ces Conditions à tout moment. Les modifications entrent en vigueur au moment de leur publication sur cette page."
    },
    privacy: {
      s1_title: "1. Collecte d'Informations",
      s1_text: "Nous recueillons les informations personnelles que vous nous fournissez volontairement en remplissant des formulaires de contact, en vous abonnant à la newsletter ou en contactant notre équipe d'assistance. Ces informations peuvent inclure votre nom, votre adresse e-mail et votre numéro de téléphone.",
      s2_title: "2. Utilisation des Informations",
      s2_text: "Les informations que nous recueillons sont utilisées pour :",
      s2_li1: "- Fournir les services et les informations que vous avez demandés.",
      s2_li2: "- Améliorer le fonctionnement de notre site et la qualité du service.",
      s2_li3: "- Vous contacter concernant l'immobilier et nos offres.",
      s3_title: "3. Protection des Données",
      s3_text: "Nous appliquons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, altération, divulgation ou destruction non autorisés. Cependant, aucune méthode de transmission de données sur Internet n'est entièrement sécurisée.",
      s4_title: "4. Divulgation à des Tiers",
      s4_text: "Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des sociétés tierces, sauf si nécessaire pour fournir les services que vous avez demandés (par exemple, des partenaires juridiques) ou si la loi l'exige.",
      s5_title: "5. Vos Droits",
      s5_text: "Vous avez le droit de demander l'accès à vos informations personnelles que nous stockons, ainsi que de demander leur correction ou leur suppression. Pour ce faire, veuillez nous contacter en utilisant les coordonnées fournies sur le site."
    }
  },
  ar: {
    terms: {
      s1_title: "1. أحكام عامة",
      s1_text: "تحكم شروط الاستخدام هذه (المشار إليها فيما يلي بالشروط) وصولك إلى موقع Archipelago Luxury Estates واستخدامه. من خلال الوصول إلى موقعنا ، فإنك توافق على الامتثال لهذه الشروط.",
      s2_title: "2. استخدام المواد",
      s2_text: "جميع المواد المنشورة على هذا الموقع ، بما في ذلك النصوص والرسومات والشعارات والصور والبرامج ، هي ملك لـ Archipelago Luxury Estates ومحمية بموجب قوانين حقوق النشر. يُحظر تمامًا استخدام المواد لأغراض تجارية دون موافقة كتابية مسبقة منا.",
      s3_title: "3. الخدمات والمعلومات",
      s3_text: "المعلومات المتعلقة بالعقارات والأسعار والشروط المقدمة على الموقع هي لأغراض إعلامية وتخضع للتغيير دون إشعار مسبق. نحن نبذل قصارى جهدنا لضمان دقة المعلومات ، لكننا لا نضمن عدم وجود أخطاء.",
      s4_title: "4. تحديد المسؤولية",
      s4_text: "Archipelago Luxury Estates ليست مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تأديبية تنشأ عن وصولك إلى الموقع أو استخدامه.",
      s5_title: "5. التغييرات في الشروط",
      s5_text: "نحتفظ بالحق في تغيير هذه الشروط في أي وقت. تدخل التغييرات حيز التنفيذ من لحظة نشرها على هذه الصفحة."
    },
    privacy: {
      s1_title: "1. جمع المعلومات",
      s1_text: "نقوم بجمع المعلومات الشخصية التي تقدمها لنا طواعية عند ملء نماذج الاتصال ، أو الاشتراك في النشرة الإخبارية ، أو الاتصال بفريق الدعم لدينا. قد تتضمن هذه المعلومات اسمك وعنوان بريدك الإلكتروني ورقم هاتفك.",
      s2_title: "2. استخدام المعلومات",
      s2_text: "يتم استخدام المعلومات التي نجمعها من أجل:",
      s2_li1: "- تقديم الخدمات والمعلومات التي طلبتها.",
      s2_li2: "- تحسين تشغيل موقعنا وجودة الخدمة.",
      s2_li3: "- الاتصال بك بخصوص العقارات وعروضنا.",
      s3_title: "3. حماية البيانات",
      s3_text: "نحن نطبق إجراءات الأمان المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. ومع ذلك ، لا توجد طريقة لنقل البيانات عبر الإنترنت آمنة تمامًا.",
      s4_title: "4. الإفصاح لأطراف ثالثة",
      s4_text: "نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية لشركات خارجية ، باستثناء ما هو ضروري لتقديم الخدمات التي طلبتها (على سبيل المثال ، الشركاء القانونيين) أو إذا لزم الأمر بموجب القانون.",
      s5_title: "5. حقوقك",
      s5_text: "لديك الحق في طلب الوصول إلى معلوماتك الشخصية التي نخزنها ، وكذلك طلب تصحيحها أو حذفها. للقيام بذلك ، يرجى الاتصال بنا باستخدام تفاصيل الاتصال المقدمة على الموقع."
    }
  },
  id: {
    terms: {
      s1_title: "1. Ketentuan Umum",
      s1_text: "Syarat penggunaan ini (selanjutnya disebut sebagai Syarat) mengatur akses dan penggunaan Anda atas situs web Archipelago Luxury Estates. Dengan mengakses situs kami, Anda setuju untuk mematuhi Syarat ini.",
      s2_title: "2. Penggunaan Materi",
      s2_text: "Semua materi yang diposting di situs ini, termasuk teks, grafik, logo, gambar, dan perangkat lunak, adalah milik Archipelago Luxury Estates dan dilindungi oleh undang-undang hak cipta. Penggunaan materi untuk tujuan komersial tanpa persetujuan tertulis kami sangat dilarang.",
      s3_title: "3. Layanan dan Informasi",
      s3_text: "Informasi tentang real estat, harga, dan kondisi yang disajikan di situs ini adalah untuk tujuan informasi dan dapat berubah tanpa pemberitahuan sebelumnya. Kami melakukan yang terbaik untuk memastikan keakuratan informasi, namun kami tidak menjamin tidak adanya kesalahan.",
      s4_title: "4. Batasan Tanggung Jawab",
      s4_text: "Archipelago Luxury Estates tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau hukuman yang timbul dari akses atau penggunaan situs oleh Anda.",
      s5_title: "5. Perubahan Syarat",
      s5_text: "Kami berhak mengubah Syarat ini kapan saja. Perubahan berlaku sejak saat diterbitkan di halaman ini."
    },
    privacy: {
      s1_title: "1. Pengumpulan Informasi",
      s1_text: "Kami mengumpulkan informasi pribadi yang Anda berikan kepada kami secara sukarela saat mengisi formulir kontak, berlangganan buletin, atau menghubungi tim dukungan kami. Informasi ini mungkin termasuk nama, alamat email, dan nomor telepon Anda.",
      s2_title: "2. Penggunaan Informasi",
      s2_text: "Informasi yang kami kumpulkan digunakan untuk:",
      s2_li1: "- Menyediakan layanan dan informasi yang Anda minta.",
      s2_li2: "- Meningkatkan pengoperasian situs kami dan kualitas layanan.",
      s2_li3: "- Menghubungi Anda mengenai real estat dan penawaran kami.",
      s3_title: "3. Perlindungan Data",
      s3_text: "Kami menerapkan langkah-langkah keamanan yang tepat untuk melindungi informasi pribadi Anda dari akses, pengubahan, pengungkapan, atau penghancuran yang tidak sah. Namun, tidak ada metode transmisi data melalui Internet yang sepenuhnya aman.",
      s4_title: "4. Pengungkapan kepada Pihak Ketiga",
      s4_text: "Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda ke perusahaan pihak ketiga, kecuali jika diperlukan untuk memberikan layanan yang Anda minta (misalnya, mitra hukum) atau jika diwajibkan oleh hukum.",
      s5_title: "5. Hak-Hak Anda",
      s5_text: "Anda memiliki hak untuk meminta akses ke informasi pribadi Anda yang kami simpan, serta meminta perbaikan atau penghapusannya. Untuk melakukannya, silakan hubungi kami menggunakan detail kontak yang disediakan di situs."
    }
  }
};

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.terms = translations[lang].terms;
    data.privacy = translations[lang].privacy;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});

