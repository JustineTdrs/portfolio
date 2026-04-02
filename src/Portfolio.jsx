import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   TRANSLATIONS — FR / EN / AR
   ═══════════════════════════════════════════ */
const T = {
  fr: {
    dir: "ltr",
    nav: ["À propos", "Parcours", "Projets", "Compétences", "Contact"],
    heroSub: "Développeuse Full Stack · Safran Aircraft Engines",
    heroTitle1: "L'art du",
    heroTitle2: "code",
    heroTitle3: "rencontre",
    heroTitle4: "l'aéronautique",
    heroDesc: "Développeuse Full Stack chez Safran Aircraft Engines, je conçois des solutions digitales à l'intersection de la technologie et de l'industrie aéronautique.",
    btnDiscover: "Découvrir",
    btnContact: "Contact",
    scroll: "Défiler",
    aboutNum: "01",
    aboutTitle: "À propos",
    aboutSub: "Profil · Formation · Langues",
    aboutP1: "De Paris au Caire, en passant par Québec — un parcours international forgé par la curiosité technique et la passion de l'industrie.",
    aboutP2: "Titulaire d'un Bachelor Responsable Projet Web et Mobile de l'ETNA, d'une formation en Design d'Interaction à l'Université Laval, je prépare actuellement un Master en Intelligence Artificielle et Big Data à l'École 89. Mon parcours mêle développement logiciel, architecture de données et transformation digitale dans le secteur aéronautique.",
    eduLabel: "Formation",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master IA & Big Data", note: "en cours" },
      { year: "2022", school: "Université Laval, Québec", diploma: "Formation Master Design d'Interaction", note: "" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor Responsable Projet Web et Mobile", note: "" },
    ],
    langLabel: "Langues",
    langs: [
      { lang: "Français", level: "Maternelle", pct: 100 },
      { lang: "Arabe (Dialecte Égyptien)", level: "Maternelle", pct: 100 },
      { lang: "Anglais", level: "Courant", pct: 90 },
    ],
    statsYears: "Années", statsProjects: "Projets", statsLangs: "Langues", statsTeam: "Équipiers",
    expNum: "02",
    expTitle: "Parcours",
    expSub: "Expérience professionnelle",
    experiences: [
      {
        year: "Présent", company: "Safran Aircraft Engines", role: "Analyste Support Planification", sub: "Supply Chain & Data", location: "Paris, France",
        bullets: [
          "Suivi de l'avancement des projets de transformation digitale et data en cours au sein des départements supply chain et production.",
          "Test et validation des solutions data développées par l'équipe DATA interne afin de garantir leur fiabilité et leur conformité aux standards Safran.",
          "Réalisation des tests de recette (UAT) et assistance au déploiement de nouveaux outils et tableaux de bord.",
          "Formation des utilisateurs finaux sur les solutions digitales déployées et support fonctionnel continu.",
          "Rédaction de documentation technique détaillée et de guides utilisateurs en anglais pour les équipes internationales.",
          "Support supplémentaire lors des pics de charge, assurant la collaboration interéquipes et la continuité des projets.",
        ],
      },
      {
        year: "2024–2025", company: "Shepherd of Egypt", role: "Développeuse Web", sub: "Infrastructure & WordPress", location: "Le Caire, Égypte",
        bullets: [
          "Diagnostic et résolution de problèmes critiques WordPress, incluant les conflits de plugins, les défaillances d'envoi d'e-mails et les erreurs de base de données.",
          "Configuration et maintenance des paramètres serveur, des services SMTP et des enregistrements DNS (SPF, DKIM, DMARC).",
          "Dépannage expert des environnements d'hébergement, incluant les configurations PHP, la mise en place SSL et les erreurs backend.",
        ],
      },
      {
        year: "2021–2022", company: "Tradespotting", role: "Développeuse Front End", sub: "Architecture & APIs", location: "Paris, France",
        bullets: [
          "Collaboration avec le directeur informatique pour examiner et améliorer les sites web et applications mobiles existants.",
          "Conception de l'architecture des données, incluant les sources, la stratégie de chargement, la sécurité et la visualisation.",
          "Création d'APIs avec spécifications et endpoints définis, permettant une communication fluide entre différentes applications.",
        ],
      },
      {
        year: "2020–2021", company: "ETNA", role: "Développeuse Full Stack", sub: "Plateformes universitaires", location: "Paris, France",
        bullets: [
          "Identification et correction de problèmes de plateforme à l'aide de Docker et PHP.",
          "Résolution de problèmes techniques au sein des plateformes universitaires, assurant un fonctionnement fluide et efficace.",
        ],
      },
      {
        year: "2019–2020", company: "SHIFT89", role: "Développeuse Web & Lead", sub: "Management d'équipe", location: "Paris, France",
        bullets: [
          "Responsable de l'évaluation et de l'amélioration des sites web et applications mobiles, animation de réunions quotidiennes pour accompagner deux membres de l'équipe.",
          "Supervision du recrutement et du mentorat des stagiaires.",
          "Présentation de solutions aux clients et orchestration des améliorations de projets en fonction de leurs retours.",
        ],
      },
    ],
    projNum: "03",
    projTitle: "Projets",
    projSub: "Réalisations techniques sélectionnées",
    projects: [
      { name: "E-Commerce Laravel", cat: "FULL STACK", desc: "Développement d'un site E-Commerce complet en HTML, CSS et JavaScript avec le framework Laravel.", tech: "Laravel · HTML/CSS · JavaScript" },
      { name: "TicketChainer", cat: "HACKATHON · CHEF DE PROJET", desc: "Direction d'une équipe de 8 personnes. Intégration et support du FrontEnd avec support et intégration d'APIs, adaptation du template avec Docker et Symfony.", tech: "Docker · Symfony · APIs" },
      { name: "Application Météo", cat: "iOS NATIVE", desc: "Création de ma propre application météo en Swift.", tech: "Swift · Xcode · API REST" },
      { name: "Clone Twitter", cat: "BACKEND", desc: "Création de mon propre réseau social en NodeJs.", tech: "Node.js · Backend" },
      { name: "Serveur Web Debian", cat: "DEVOPS", desc: "Mise en place d'un serveur web avec Debian - Shell avec VirtualBox et VMware.", tech: "Debian · Shell · VM" },
      { name: "Jeu RPG", cat: "GAME DEV", desc: "Création d'une interface graphique RPG en Java.", tech: "Java · Swing · OOP" },
      { name: "Microsoft Azure", cat: "CLOUD · IA", desc: "Service Cognitif, Reconnaissance Faciale avec l'API Face. Top 5 Camp Microsoft.", tech: "Azure · Cognitive Services" },
      { name: "Application Android", cat: "MOBILE", desc: "Création d'une application avec Android Studio en Java.", tech: "Java · Android Studio" },
      { name: "Structure CRUD en C", cat: "ALGORITHMIE", desc: "Création d'une structure de données modèle CRUD en C.", tech: "C · Structures de données" },
      { name: "Projet Fullstack Java", cat: "FULL STACK", desc: "Développement d'application backend et frontend en Java avec AndroidStudio.", tech: "Java · Android Studio" },
      { name: "C-BASH-Web", cat: "FORMATION", desc: "Formation intensive de 6 semaines en C, Bash, Web.", tech: "C · Bash · Web" },
      { name: "MySQL", cat: "BASE DE DONNÉES", desc: "Création de bases de données avec MySQL.", tech: "MySQL · SQL" },
    ],
    skillsNum: "04",
    skillsTitle: "Compétences",
    skillsSub: "Stack technique",
    skillCats: {
      "Langages": ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"],
      "Technologies Web": ["Angular", "Symfony", "PHP Framework"],
      "Outils": ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Adobe Illustrator", "Microsoft Office", "Docker", "Android Studio", "Machine Virtuelle", "Bash", "Shell"],
      "Services Cloud": ["Microsoft Azure SQL"],
      "DevOps": ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"],
      "Outils Data": ["Power BI", "SAP", "Excel (TCD, RECHERCHEV, Dashboards)"],
    },
    extraNum: "05",
    extraTitle: "Activités",
    extraSub: "Activités extrascolaires & récompenses",
    extras: [
      { title: "Cheffe de Projet — TicketChainer", year: "2019", desc: "Direction d'une équipe de 8 personnes, supervision de l'intégration et du support du Front End du site web. Gestion du support et intégration des APIs, adaptation des templates. Conseils tout au long des phases de conception, développement, maintenance et support de l'infrastructure de données." },
      { title: "Top 5 Camp Microsoft", year: "2020", desc: "Participation au Camp Microsoft : Service Cognitif, acquisition de connaissances sur l'API Faces, composant essentiel de la suite de Services Cognitifs de Microsoft." },
    ],
    courseworkTitle: "Cours Pertinents",
    coursework: "Développement Frontend, Développement Backend, Management de l'Innovation et Entrepreneuriat, Ingénierie d'Infrastructure Cloud, Réalité Virtuelle, Réalité Augmentée et Ingénierie de Jeux Vidéo, Ingénierie de Développement d'Applications Mobiles.",
    contactNum: "06",
    contactTitle: "Collaborons",
    contactTitle2: "ensemble",
    contactDesc: "Que ce soit pour une mission de développement, un projet de transformation digitale ou une collaboration dans l'aéronautique — je suis à l'écoute.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Téléphone" },
    footer: "Fait avec passion pour l'aviation",
  },

  en: {
    dir: "ltr",
    nav: ["About", "Experience", "Projects", "Skills", "Contact"],
    heroSub: "Full Stack Developer · Safran Aircraft Engines",
    heroTitle1: "Where",
    heroTitle2: "code",
    heroTitle3: "meets",
    heroTitle4: "aerospace",
    heroDesc: "Full Stack Developer at Safran Aircraft Engines, I design digital solutions at the intersection of technology and the aerospace industry.",
    btnDiscover: "Discover",
    btnContact: "Contact",
    scroll: "Scroll",
    aboutNum: "01",
    aboutTitle: "About",
    aboutSub: "Profile · Education · Languages",
    aboutP1: "From Paris to Cairo, through Quebec — an international journey shaped by technical curiosity and a passion for industry.",
    aboutP2: "Holding a Bachelor's in Web and Mobile Project Management from ETNA and training in Interaction Design from Université Laval, I am currently pursuing a Master's in Artificial Intelligence and Big Data at École 89. My path combines software development, data architecture, and digital transformation in the aerospace sector.",
    eduLabel: "Education",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master's AI & Big Data", note: "in progress" },
      { year: "2022", school: "Université Laval, Quebec", diploma: "Master's Interaction Design Training", note: "" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor's Web & Mobile Project Management", note: "" },
    ],
    langLabel: "Languages",
    langs: [
      { lang: "French", level: "Native", pct: 100 },
      { lang: "Arabic (Egyptian Dialect)", level: "Native", pct: 100 },
      { lang: "English", level: "Fluent", pct: 90 },
    ],
    statsYears: "Years", statsProjects: "Projects", statsLangs: "Languages", statsTeam: "Teammates",
    expNum: "02",
    expTitle: "Experience",
    expSub: "Professional experience",
    experiences: [
      {
        year: "Present", company: "Safran Aircraft Engines", role: "Planning Support Analyst", sub: "Supply Chain & Data", location: "Paris, France",
        bullets: [
          "Monitoring the progress of ongoing digital transformation and data projects across supply chain and production departments.",
          "Testing and validating data-driven solutions developed by the internal DATA team to ensure reliability and compliance with Safran standards.",
          "Performing acceptance testing (UAT) and assisting in the deployment of new tools and dashboards.",
          "Training end-users on implemented digital solutions and providing ongoing functional support.",
          "Drafting detailed technical documentation and user guides in English for global teams.",
          "Providing additional support during workload peaks, ensuring cross-team collaboration and project continuity.",
        ],
      },
      {
        year: "2024–2025", company: "Shepherd of Egypt", role: "Web Developer", sub: "Infrastructure & WordPress", location: "Cairo, Egypt",
        bullets: [
          "Diagnosed and resolved critical WordPress issues, including plugin conflicts, email delivery failures, and database errors.",
          "Configured and maintained server settings, SMTP services, and DNS records (SPF, DKIM, DMARC).",
          "Provided expert-level troubleshooting for hosting environments, including PHP configurations, SSL setup, and backend errors.",
        ],
      },
      {
        year: "2021–2022", company: "Tradespotting", role: "Front End Developer", sub: "Architecture & APIs", location: "Paris, France",
        bullets: [
          "Partnered with the IT director to review and enhance current websites and mobile apps.",
          "Designed data architecture, including sources, load strategy, security, and visualization.",
          "Created APIs with defined specifications and endpoints, enabling seamless communication between software applications.",
        ],
      },
      {
        year: "2020–2021", company: "ETNA", role: "Full Stack Developer", sub: "University platforms", location: "Paris, France",
        bullets: [
          "Identified and fixed platform issues using Docker and PHP.",
          "Addressed technical issues within university platforms, ensuring smooth and effective functionality for users.",
        ],
      },
      {
        year: "2019–2020", company: "SHIFT89", role: "Web Developer & Lead", sub: "Team management", location: "Paris, France",
        bullets: [
          "In charge of evaluating and enhancing established websites and mobile apps, conducting daily meetings to allocate tasks and guide two team members.",
          "Supervised the recruitment and mentorship of interns.",
          "Presented solutions to clients and orchestrated project enhancements based on their feedback.",
        ],
      },
    ],
    projNum: "03",
    projTitle: "Projects",
    projSub: "Selected technical achievements",
    projects: [
      { name: "E-Commerce Laravel", cat: "FULL STACK", desc: "Developed a complete E-Commerce website using HTML, CSS and JavaScript with the Laravel framework.", tech: "Laravel · HTML/CSS · JavaScript" },
      { name: "TicketChainer", cat: "HACKATHON · PROJECT LEAD", desc: "Led a team of 8. Front End integration and support with API integration and template adaptation using Docker and Symfony.", tech: "Docker · Symfony · APIs" },
      { name: "Weather App", cat: "iOS NATIVE", desc: "Built my own weather app using Swift.", tech: "Swift · Xcode · REST API" },
      { name: "Twitter Clone", cat: "BACKEND", desc: "Built my own Twitter using NodeJs.", tech: "Node.js · Backend" },
      { name: "Debian Web Server", cat: "DEVOPS", desc: "Setting up a web server with Debian - Shell with VirtualBox and VMware.", tech: "Debian · Shell · VM" },
      { name: "RPG Game", cat: "GAME DEV", desc: "Creating a graphical RPG interface in Java.", tech: "Java · Swing · OOP" },
      { name: "Microsoft Azure", cat: "CLOUD · AI", desc: "Cognitive Service, Facial Recognition with the Face API. Top 5 Microsoft Camp.", tech: "Azure · Cognitive Services" },
      { name: "Android App", cat: "MOBILE", desc: "Built an application with Android Studio using Java.", tech: "Java · Android Studio" },
      { name: "CRUD Structure in C", cat: "ALGORITHMS", desc: "Creating a CRUD model data structure in C.", tech: "C · Data Structures" },
      { name: "Fullstack Java Project", cat: "FULL STACK", desc: "Backend and frontend application development in Java with AndroidStudio.", tech: "Java · Android Studio" },
      { name: "C-BASH-Web", cat: "TRAINING", desc: "6-week intensive course in C, Bash, Web.", tech: "C · Bash · Web" },
      { name: "MySQL", cat: "DATABASE", desc: "Creating databases with MySQL.", tech: "MySQL · SQL" },
    ],
    skillsNum: "04",
    skillsTitle: "Skills",
    skillsSub: "Technical stack",
    skillCats: {
      "Languages": ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"],
      "Web Technologies": ["Angular", "Symfony", "PHP Framework"],
      "Tools": ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Adobe Illustrator", "Microsoft Office", "Docker", "Android Studio", "Virtual Machine", "Bash", "Shell"],
      "Cloud Services": ["Microsoft Azure SQL"],
      "DevOps": ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"],
      "Data Tools": ["Power BI", "SAP", "Excel (Pivot Tables, VLOOKUP, Dashboards)"],
    },
    extraNum: "05",
    extraTitle: "Activities",
    extraSub: "Extracurricular activities & awards",
    extras: [
      { title: "Project Leader — TicketChainer", year: "2019", desc: "Led a team of 8 individuals, overseeing the integration and support of the website's Front End. Managed API support and integration along with template adaptation. Provided guidance throughout the design, development, maintenance and support phases of the data infrastructure." },
      { title: "Top 5 Microsoft Camp", year: "2020", desc: "Participated in Microsoft Camp: Cognitive Service, gaining insights into API Faces, an integral component of Microsoft's Cognitive Services suite." },
    ],
    courseworkTitle: "Relevant Coursework",
    coursework: "Frontend Development, Backend Development, Innovation Management and Entrepreneurship, Cloud Infrastructure Engineering, Virtual Reality, Augmented Reality and Video Game Engineering, Mobile Application Development Engineering.",
    contactNum: "06",
    contactTitle: "Let's work",
    contactTitle2: "together",
    contactDesc: "Whether it's a development mission, a digital transformation project, or a collaboration in aerospace — I'm all ears.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Phone" },
    footer: "Made with passion for aviation",
  },

  ar: {
    dir: "rtl",
    nav: ["نبذة عني", "المسيرة", "المشاريع", "المهارات", "اتصل بي"],
    heroSub: "مطورة Full Stack · سافران لمحركات الطائرات",
    heroTitle1: "حيث يلتقي",
    heroTitle2: "البرمجة",
    heroTitle3: "بعالم",
    heroTitle4: "الطيران",
    heroDesc: "مطورة Full Stack في سافران لمحركات الطائرات، أصمم حلولاً رقمية عند تقاطع التكنولوجيا وصناعة الطيران.",
    btnDiscover: "اكتشف",
    btnContact: "اتصل بي",
    scroll: "مرر",
    aboutNum: "٠١",
    aboutTitle: "نبذة عني",
    aboutSub: "الملف الشخصي · التعليم · اللغات",
    aboutP1: "من باريس إلى القاهرة، مروراً بكيبيك — مسيرة دولية صقلتها الفضول التقني والشغف بالصناعة.",
    aboutP2: "حاصلة على بكالوريوس في إدارة مشاريع الويب والموبايل من ETNA وتدريب في تصميم التفاعل من جامعة لافال، أحضّر حالياً ماجستير في الذكاء الاصطناعي والبيانات الضخمة في مدرسة 89. مسيرتي تجمع بين تطوير البرمجيات وهندسة البيانات والتحول الرقمي في قطاع الطيران.",
    eduLabel: "التعليم",
    edu: [
      { year: "٢٠٢٥", school: "مدرسة 89", diploma: "ماجستير ذكاء اصطناعي وبيانات ضخمة", note: "قيد الدراسة" },
      { year: "٢٠٢٢", school: "جامعة لافال، كيبيك", diploma: "تدريب ماجستير تصميم التفاعل", note: "" },
      { year: "٢٠٢١", school: "ETNA، باريس", diploma: "بكالوريوس إدارة مشاريع الويب والموبايل", note: "" },
    ],
    langLabel: "اللغات",
    langs: [
      { lang: "الفرنسية", level: "لغة أم", pct: 100 },
      { lang: "العربية (اللهجة المصرية)", level: "لغة أم", pct: 100 },
      { lang: "الإنجليزية", level: "طلاقة", pct: 90 },
    ],
    statsYears: "سنوات", statsProjects: "مشاريع", statsLangs: "لغات", statsTeam: "زملاء",
    expNum: "٠٢",
    expTitle: "المسيرة",
    expSub: "الخبرة المهنية",
    experiences: [
      {
        year: "حالياً", company: "سافران لمحركات الطائرات", role: "محللة دعم التخطيط", sub: "سلسلة التوريد والبيانات", location: "باريس، فرنسا",
        bullets: [
          "متابعة تقدم مشاريع التحول الرقمي والبيانات الجارية في أقسام سلسلة التوريد والإنتاج.",
          "اختبار والتحقق من حلول البيانات المطورة من قبل فريق DATA الداخلي لضمان الموثوقية والامتثال لمعايير سافران.",
          "إجراء اختبارات القبول (UAT) والمساعدة في نشر الأدوات ولوحات المعلومات الجديدة.",
          "تدريب المستخدمين النهائيين على الحلول الرقمية المنشورة وتقديم الدعم الوظيفي المستمر.",
          "صياغة وثائق تقنية مفصلة وأدلة مستخدم باللغة الإنجليزية للفرق الدولية.",
          "تقديم دعم إضافي خلال أوقات الذروة، لضمان التعاون بين الفرق واستمرارية المشاريع.",
        ],
      },
      {
        year: "٢٠٢٤–٢٠٢٥", company: "شيبرد أوف إيجبت", role: "مطورة ويب", sub: "البنية التحتية ووردبريس", location: "القاهرة، مصر",
        bullets: [
          "تشخيص وحل مشاكل ووردبريس الحرجة، بما في ذلك تعارضات الإضافات وأعطال البريد الإلكتروني وأخطاء قاعدة البيانات.",
          "تكوين وصيانة إعدادات الخادم وخدمات SMTP وسجلات DNS (SPF, DKIM, DMARC).",
          "استكشاف الأخطاء وإصلاحها بمستوى خبير لبيئات الاستضافة، بما في ذلك تكوينات PHP وإعداد SSL.",
        ],
      },
      {
        year: "٢٠٢١–٢٠٢٢", company: "تريدسبوتينغ", role: "مطورة Front End", sub: "الهندسة والواجهات البرمجية", location: "باريس، فرنسا",
        bullets: [
          "التعاون مع مدير تكنولوجيا المعلومات لمراجعة وتحسين المواقع الإلكترونية وتطبيقات الهاتف المحمول.",
          "تصميم هندسة البيانات، بما في ذلك المصادر واستراتيجية التحميل والأمان والتصور.",
          "إنشاء واجهات برمجة التطبيقات بمواصفات ونقاط نهاية محددة.",
        ],
      },
      {
        year: "٢٠٢٠–٢٠٢١", company: "ETNA", role: "مطورة Full Stack", sub: "المنصات الجامعية", location: "باريس، فرنسا",
        bullets: [
          "تحديد وإصلاح مشاكل المنصة باستخدام Docker و PHP.",
          "حل المشاكل التقنية داخل المنصات الجامعية لضمان أداء سلس وفعال.",
        ],
      },
      {
        year: "٢٠١٩–٢٠٢٠", company: "SHIFT89", role: "مطورة ويب وقائدة فريق", sub: "إدارة الفريق", location: "باريس، فرنسا",
        bullets: [
          "مسؤولة عن تقييم وتحسين المواقع الإلكترونية وتطبيقات الهاتف المحمول، وإدارة اجتماعات يومية لتوزيع المهام ومرافقة عضوين في الفريق.",
          "الإشراف على توظيف وتوجيه المتدربين.",
          "تقديم الحلول للعملاء وتنسيق تحسينات المشاريع بناءً على ملاحظاتهم.",
        ],
      },
    ],
    projNum: "٠٣",
    projTitle: "المشاريع",
    projSub: "إنجازات تقنية مختارة",
    projects: [
      { name: "متجر إلكتروني Laravel", cat: "FULL STACK", desc: "تطوير موقع تجارة إلكترونية كامل بـ HTML و CSS و JavaScript مع إطار عمل Laravel.", tech: "Laravel · HTML/CSS · JavaScript" },
      { name: "TicketChainer", cat: "هاكاثون · قائدة مشروع", desc: "قيادة فريق من 8 أشخاص. دمج ودعم الواجهة الأمامية مع دمج APIs وتكييف القوالب باستخدام Docker و Symfony.", tech: "Docker · Symfony · APIs" },
      { name: "تطبيق الطقس", cat: "iOS أصلي", desc: "إنشاء تطبيق طقس خاص بي باستخدام Swift.", tech: "Swift · Xcode · REST API" },
      { name: "نسخة تويتر", cat: "BACKEND", desc: "إنشاء شبكة اجتماعية خاصة بي باستخدام NodeJs.", tech: "Node.js · Backend" },
      { name: "خادم ويب Debian", cat: "DEVOPS", desc: "إعداد خادم ويب باستخدام Debian و Shell مع VirtualBox و VMware.", tech: "Debian · Shell · VM" },
      { name: "لعبة RPG", cat: "تطوير ألعاب", desc: "إنشاء واجهة رسومية للعبة RPG في Java.", tech: "Java · Swing · OOP" },
      { name: "Microsoft Azure", cat: "سحابة · ذكاء اصطناعي", desc: "خدمة معرفية، التعرف على الوجوه باستخدام Face API. أفضل 5 في معسكر مايكروسوفت.", tech: "Azure · Cognitive Services" },
      { name: "تطبيق أندرويد", cat: "موبايل", desc: "إنشاء تطبيق باستخدام Android Studio و Java.", tech: "Java · Android Studio" },
      { name: "بنية CRUD في C", cat: "خوارزميات", desc: "إنشاء بنية بيانات نموذج CRUD في C.", tech: "C · هياكل البيانات" },
      { name: "مشروع Fullstack Java", cat: "FULL STACK", desc: "تطوير تطبيق Backend و Frontend في Java مع AndroidStudio.", tech: "Java · Android Studio" },
      { name: "C-BASH-Web", cat: "تدريب", desc: "دورة مكثفة لمدة 6 أسابيع في C و Bash و Web.", tech: "C · Bash · Web" },
      { name: "MySQL", cat: "قواعد بيانات", desc: "إنشاء قواعد بيانات باستخدام MySQL.", tech: "MySQL · SQL" },
    ],
    skillsNum: "٠٤",
    skillsTitle: "المهارات",
    skillsSub: "المجموعة التقنية",
    skillCats: {
      "لغات البرمجة": ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"],
      "تقنيات الويب": ["Angular", "Symfony", "PHP Framework"],
      "الأدوات": ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Adobe Illustrator", "Microsoft Office", "Docker", "Android Studio", "آلة افتراضية", "Bash", "Shell"],
      "خدمات سحابية": ["Microsoft Azure SQL"],
      "DevOps": ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"],
      "أدوات البيانات": ["Power BI", "SAP", "Excel (جداول محورية، VLOOKUP، لوحات معلومات)"],
    },
    extraNum: "٠٥",
    extraTitle: "الأنشطة",
    extraSub: "الأنشطة اللامنهجية والجوائز",
    extras: [
      { title: "قائدة مشروع — TicketChainer", year: "٢٠١٩", desc: "قيادة فريق من 8 أفراد، الإشراف على دمج ودعم الواجهة الأمامية للموقع. إدارة دعم ودمج الواجهات البرمجية وتكييف القوالب. تقديم التوجيه خلال مراحل التصميم والتطوير والصيانة والدعم." },
      { title: "أفضل 5 في معسكر مايكروسوفت", year: "٢٠٢٠", desc: "المشاركة في معسكر مايكروسوفت: الخدمة المعرفية، اكتساب معرفة حول واجهة برمجة الوجوه، مكون أساسي في مجموعة الخدمات المعرفية لمايكروسوفت." },
    ],
    courseworkTitle: "المقررات الدراسية ذات الصلة",
    coursework: "تطوير الواجهة الأمامية، تطوير الواجهة الخلفية، إدارة الابتكار وريادة الأعمال، هندسة البنية التحتية السحابية، الواقع الافتراضي، الواقع المعزز وهندسة ألعاب الفيديو، هندسة تطوير تطبيقات الهاتف المحمول.",
    contactNum: "٠٦",
    contactTitle: "لنعمل",
    contactTitle2: "معاً",
    contactDesc: "سواء كانت مهمة تطوير أو مشروع تحول رقمي أو تعاون في مجال الطيران — أنا مستعدة للاستماع.",
    contactLabels: { email: "البريد الإلكتروني", linkedin: "لينكد إن", github: "غيت هاب", phone: "الهاتف" },
    footer: "صُنع بشغف الطيران",
  },
};

/* ═══════ SVG COMPONENTS ═══════ */
const BlueprintGrid = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
    <defs>
      <pattern id="bpG" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a2744" strokeWidth="0.5" /></pattern>
      <pattern id="bpS" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M 12 0 L 0 0 0 12" fill="none" stroke="#1a2744" strokeWidth="0.3" /></pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bpS)" /><rect width="100%" height="100%" fill="url(#bpG)" />
  </svg>
);

const AircraftSVG = ({ style }) => (
  <svg viewBox="0 0 800 200" style={style} fill="none">
    <path d="M 50 100 Q 80 85 200 88 L 600 88 Q 720 88 760 95 L 770 100 Q 760 105 720 112 L 600 112 L 200 112 Q 80 115 50 100 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <path d="M 280 88 L 220 30 Q 215 26 225 26 L 380 26 Q 390 26 385 30 L 340 88" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
    <path d="M 280 112 L 220 170 Q 215 174 225 174 L 380 174 Q 390 174 385 170 L 340 112" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
    <path d="M 650 88 L 640 50 Q 638 44 645 44 L 710 44 Q 718 44 715 50 L 695 88" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
    <path d="M 650 112 L 640 150 Q 638 156 645 156 L 710 156 Q 718 156 715 150 L 695 112" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
    <ellipse cx="300" cy="30" rx="22" ry="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <ellipse cx="300" cy="170" rx="22" ry="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="50" y1="130" x2="770" y2="130" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 3" opacity="0.2" />
  </svg>
);

const TurbineBlueprint = ({ size = 200, style }) => (
  <svg viewBox="0 0 200 200" style={{ width: size, height: size, ...style }} fill="none">
    <circle cx="100" cy="100" r="95" stroke="var(--gold)" strokeWidth="0.3" opacity="0.3" />
    <circle cx="100" cy="100" r="70" stroke="var(--gold)" strokeWidth="0.3" opacity="0.25" />
    <circle cx="100" cy="100" r="45" stroke="var(--gold)" strokeWidth="0.3" opacity="0.2" />
    <circle cx="100" cy="100" r="20" stroke="var(--gold)" strokeWidth="0.4" opacity="0.4" />
    <circle cx="100" cy="100" r="6" fill="var(--gold)" opacity="0.15" />
    {Array.from({ length: 24 }).map((_, i) => { const a = i * 15 * Math.PI / 180; return <line key={i} x1={100 + 22 * Math.cos(a)} y1={100 + 22 * Math.sin(a)} x2={100 + 93 * Math.cos(a)} y2={100 + 93 * Math.sin(a)} stroke="var(--gold)" strokeWidth="0.2" opacity="0.12" />; })}
    {Array.from({ length: 8 }).map((_, i) => { const a = i * 45 * Math.PI / 180; const n = (i * 45 + 22) * Math.PI / 180; return <path key={i} d={`M ${100 + 20 * Math.cos(a)} ${100 + 20 * Math.sin(a)} Q ${100 + 55 * Math.cos(n)} ${100 + 55 * Math.sin(n)} ${100 + 85 * Math.cos(a)} ${100 + 85 * Math.sin(a)}`} stroke="var(--gold)" strokeWidth="0.5" opacity="0.25" />; })}
  </svg>
);

/* ═══════ HOOKS ═══════ */
function useInView(th = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, [th]);
  return [ref, v];
}

/* ═══════ SUB-COMPONENTS ═══════ */
const SectionHead = ({ number, title, subtitle }) => { const [ref, vis] = useInView(); return (<div ref={ref} style={{ marginBottom: 64, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)" }}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>{number}</span><div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} /></div><h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, color: "var(--navy)", letterSpacing: -1, lineHeight: 1.1 }}>{title}</h2>{subtitle && <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>{subtitle}</p>}</div>); };

/* ═══════ MAIN ═══════ */
export default function Portfolio() {
  const [lang, setLang] = useState("fr");
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeExp, setActiveExp] = useState(0);
  const [hoveredProj, setHoveredProj] = useState(null);
  const [showAllProj, setShowAllProj] = useState(false);
  const t = T[lang];
  const isRtl = t.dir === "rtl";

  useEffect(() => { setTimeout(() => setLoaded(true), 100); const h = () => setScrollY(window.scrollY); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { setActiveExp(0); setShowAllProj(false); }, [lang]);

  const visibleProjects = showAllProj ? t.projects : t.projects.slice(0, 6);

  return (
    <div dir={t.dir} style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh", fontFamily: "var(--sans)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        :root { --cream:#F5F0E8; --ivory:#FAF7F2; --navy:#0D1B2A; --navy-light:#1B2D45; --gold:#B8860B; --gold-light:#D4A843; --copper:#C17F59; --slate:#6B7B8D; --slate-light:#9AACBD; --serif:'Playfair Display',Georgia,serif; --sans:'DM Sans',sans-serif; --mono:'IBM Plex Mono',monospace; }
        * { margin:0; padding:0; box-sizing:border-box; } html { scroll-behavior:smooth; } body { background:var(--cream); }
        ::selection { background:var(--gold); color:var(--cream); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes rotateSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-8px) rotate(1deg); } }
        .nav-item { font-family:var(--mono); font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--slate); cursor:pointer; padding:8px 0; position:relative; transition:color 0.3s; text-decoration:none; } .nav-item:hover { color:var(--navy); } .nav-item::after { content:''; position:absolute; bottom:4px; left:0; width:0; height:1px; background:var(--gold); transition:width 0.4s; } .nav-item:hover::after { width:100%; }
        .skill-chip { display:inline-block; padding:8px 18px; border:1px solid rgba(13,27,42,0.08); font-family:var(--mono); font-size:11px; letter-spacing:1.5px; color:var(--navy-light); transition:all 0.3s; cursor:default; border-radius:1px; } .skill-chip:hover { border-color:var(--gold); color:var(--gold); background:rgba(184,134,11,0.03); }
        .exp-tab { font-family:var(--mono); font-size:12px; letter-spacing:2px; padding:16px 24px; cursor:pointer; border:none; background:none; color:var(--slate); position:relative; transition:all 0.4s; text-align:left; width:100%; } .exp-tab:hover { color:var(--navy); } .exp-tab.active { color:var(--navy); } .exp-tab.active::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--gold); }
        .exp-tab-rtl { text-align:right; } .exp-tab-rtl.active::before { left:auto; right:0; }
        .lang-btn { padding:6px 14px; border:1px solid rgba(13,27,42,0.1); background:transparent; color:var(--slate); font-family:var(--mono); font-size:10px; letter-spacing:2px; cursor:pointer; transition:all 0.3s; border-radius:1px; } .lang-btn:hover { border-color:var(--gold); color:var(--gold); } .lang-btn.active { background:var(--navy); color:var(--cream); border-color:var(--navy); }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:var(--cream); } ::-webkit-scrollbar-thumb { background:rgba(184,134,11,0.2); } ::-webkit-scrollbar-thumb:hover { background:rgba(184,134,11,0.4); }
        @media(max-width:900px) { .hero-grid{grid-template-columns:1fr!important;text-align:center;} .hero-right{display:none!important;} .exp-grid{grid-template-columns:1fr!important;} .exp-sidebar{display:none!important;} .proj-grid{grid-template-columns:1fr!important;} .about-grid{grid-template-columns:1fr!important;} .contact-row{flex-direction:column!important;} .footer-inner{flex-direction:column!important;gap:24px!important;text-align:center!important;} .desktop-nav{display:none!important;} }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 80 ? "rgba(245,240,232,0.92)" : "transparent", backdropFilter: scrollY > 80 ? "blur(16px)" : "none", borderBottom: scrollY > 80 ? "1px solid rgba(13,27,42,0.05)" : "none", transition: "all 0.4s" }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }} fill="none"><circle cx="16" cy="16" r="15" stroke="var(--gold)" strokeWidth="0.8" /><text x="16" y="20" textAnchor="middle" fill="var(--navy)" fontFamily="var(--serif)" fontSize="13" fontWeight="500">JT</text></svg>
          <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 500, color: "var(--navy)", letterSpacing: 2 }}>JUSTINE TADROS</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
            {t.nav.map((s, i) => <a key={i} href={`#s${i}`} className="nav-item">{s}</a>)}
          </div>
          <div style={{ display: "flex", gap: 4, marginLeft: 16 }}>
            {[["fr", "FR"], ["en", "EN"], ["ar", "AR"]].map(([k, label]) => (
              <button key={k} className={`lang-btn ${lang === k ? "active" : ""}`} onClick={() => setLang(k)}>{label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        <BlueprintGrid />
        <div className="hero-grid" style={{ maxWidth: 1300, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.2s" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 5, color: "var(--gold)", marginBottom: 24, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 1, background: "var(--gold)" }} />
                {t.heroSub}
              </div>
            </div>
            <h1 style={{ fontFamily: isRtl ? "'Noto Sans Arabic', sans-serif" : "var(--serif)", fontSize: isRtl ? "clamp(32px,5vw,64px)" : "clamp(40px,6.5vw,80px)", fontWeight: isRtl ? 700 : 300, lineHeight: 1.1, letterSpacing: isRtl ? 0 : -2, color: "var(--navy)", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 1s 0.4s" }}>
              {t.heroTitle1}<br /><span style={{ fontWeight: isRtl ? 700 : 600, fontStyle: isRtl ? "normal" : "italic" }}>{t.heroTitle2}</span> {t.heroTitle3}<br /><span style={{ color: "var(--gold)", fontWeight: isRtl ? 700 : 600 }}>{t.heroTitle4}</span>
            </h1>
            <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic', sans-serif" : "var(--sans)", fontSize: 16, lineHeight: 1.9, color: "var(--slate)", maxWidth: 460, marginTop: 32, fontWeight: 300, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.7s" }}>{t.heroDesc}</p>
            <div style={{ display: "flex", gap: 24, marginTop: 48, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.9s" }}>
              <a href="#s0" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: "var(--navy)", color: "var(--cream)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.4s", borderRadius: 1 }}>{t.btnDiscover} →</a>
              <a href="#s4" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", border: "1px solid rgba(13,27,42,0.15)", color: "var(--navy)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.4s", borderRadius: 1, background: "transparent" }}>{t.btnContact}</a>
            </div>
          </div>
          <div className="hero-right" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TurbineBlueprint size={380} style={{ opacity: loaded ? 0.5 : 0, transition: "opacity 1.5s 0.5s", animation: "rotateSlow 120s linear infinite" }} />
            <AircraftSVG style={{ position: "absolute", width: "90%", color: "var(--navy)", opacity: loaded ? 0.15 : 0, transition: "opacity 1.2s 0.8s", animation: "float 8s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="s0" style={{ padding: "120px 48px", background: "var(--ivory)", position: "relative" }}>
        <BlueprintGrid />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number={t.aboutNum} title={t.aboutTitle} subtitle={t.aboutSub} />
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80 }}>
            <div>
              <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: 22, lineHeight: 1.8, color: "var(--navy)", fontWeight: 300, marginBottom: 32 }}>{t.aboutP1}</p>
              <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 15, lineHeight: 2, color: "var(--slate)", fontWeight: 300 }}>{t.aboutP2}</p>
              <div style={{ marginTop: 48 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>{t.eduLabel}</div>
                {t.edu.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 24, padding: "20px 0", borderBottom: "1px solid rgba(13,27,42,0.05)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--gold)", letterSpacing: 2, minWidth: 50 }}>{e.year}</span>
                    <div>
                      <div style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 15, fontWeight: 500, color: "var(--navy)" }}>{e.school}</div>
                      <div style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 13, color: "var(--slate)", marginTop: 2 }}>{e.diploma} {e.note && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)", letterSpacing: 1 }}>— {e.note}</span>}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ padding: 32, border: "1px solid rgba(13,27,42,0.06)", marginBottom: 24, background: "var(--cream)", borderRadius: 2 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24 }}>{t.langLabel}</div>
                {t.langs.map((l, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 14, fontWeight: 500 }}>{l.lang}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate)", letterSpacing: 1 }}>{l.level}</span>
                    </div>
                    <div style={{ height: 2, background: "rgba(13,27,42,0.06)", borderRadius: 1 }}><div style={{ height: "100%", width: `${l.pct}%`, background: "linear-gradient(90deg, var(--gold), var(--copper))", borderRadius: 1 }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ n: "5+", l: t.statsYears }, { n: "13", l: t.statsProjects }, { n: "3", l: t.statsLangs }, { n: "8", l: t.statsTeam }].map((s, i) => (
                  <div key={i} style={{ padding: 24, border: "1px solid rgba(13,27,42,0.06)", textAlign: "center", background: "var(--cream)", borderRadius: 2 }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--gold)" }}>{s.n}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--slate)", marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="s1" style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead number={t.expNum} title={t.expTitle} subtitle={t.expSub} />
          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0 }}>
            <div className="exp-sidebar" style={{ borderRight: isRtl ? "none" : "1px solid rgba(13,27,42,0.06)", borderLeft: isRtl ? "1px solid rgba(13,27,42,0.06)" : "none" }}>
              {t.experiences.map((exp, i) => (
                <button key={i} className={`exp-tab ${activeExp === i ? "active" : ""} ${isRtl ? "exp-tab-rtl" : ""}`} onClick={() => setActiveExp(i)}>
                  <div style={{ fontSize: 10, color: "var(--gold)", marginBottom: 4 }}>{exp.year}</div>
                  <div style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 13, fontWeight: activeExp === i ? 500 : 400 }}>{exp.company}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: isRtl ? "0 48px 0 0" : "0 0 0 48px", minHeight: 360 }}>
              {t.experiences.map((exp, i) => (
                <div key={i} style={{ display: activeExp === i ? "block" : "none", animation: "fadeUp 0.5s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", border: "2px solid var(--gold)" }} />
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)" }}>{exp.location.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: isRtl ? 26 : 32, fontWeight: isRtl ? 600 : 400, color: "var(--navy)", marginBottom: 4, letterSpacing: isRtl ? 0 : -0.5 }}>{exp.company}</h3>
                  <div style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 16, color: "var(--copper)", fontWeight: 400, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate-light)", letterSpacing: 1, marginBottom: 32 }}>{exp.sub}</div>
                  <div style={{ borderTop: "1px solid rgba(13,27,42,0.05)", paddingTop: 24 }}>
                    {exp.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--slate)", fontWeight: 300 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile: show all experiences stacked */}
          <div style={{ display: "none" }} className="exp-mobile">
            {t.experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 40, padding: 24, border: "1px solid rgba(13,27,42,0.06)", borderRadius: 2 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)", letterSpacing: 2, marginBottom: 8 }}>{exp.year} · {exp.location}</div>
                <h3 style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{exp.company}</h3>
                <div style={{ fontSize: 14, color: "var(--copper)", marginBottom: 16 }}>{exp.role}</div>
                {exp.bullets.map((b, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", marginTop: 8, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--slate)", fontWeight: 300 }}>{b}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="s2" style={{ padding: "120px 48px", background: "var(--navy)", color: "var(--cream)", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}><defs><pattern id="bpD" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.3" /></pattern></defs><rect width="100%" height="100%" fill="url(#bpD)" /></svg>
        <TurbineBlueprint size={500} style={{ position: "absolute", right: -150, top: -150, opacity: 0.06, animation: "rotateSlow 200s linear infinite" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>{t.projNum}</span><div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} /></div>
            <h2 style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: "clamp(32px,5vw,56px)", fontWeight: isRtl ? 600 : 300, color: "var(--cream)", letterSpacing: isRtl ? 0 : -1 }}>{t.projTitle}</h2>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate-light)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>{t.projSub}</p>
          </div>
          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {visibleProjects.map((p, i) => (
              <div key={i} onMouseEnter={() => setHoveredProj(i)} onMouseLeave={() => setHoveredProj(null)} style={{ padding: 32, border: "1px solid rgba(255,255,255,0.06)", background: hoveredProj === i ? "rgba(255,255,255,0.03)" : "transparent", transition: "all 0.5s", cursor: "default", borderRadius: 2, transform: hoveredProj === i ? "translateY(-4px)" : "none", position: "relative", overflow: "hidden" }}>
                {hoveredProj === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />}
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", marginBottom: 16 }}>{p.cat}</div>
                <h3 style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: 22, fontWeight: isRtl ? 600 : 400, marginBottom: 12, color: hoveredProj === i ? "var(--gold-light)" : "var(--cream)", transition: "color 0.4s" }}>{p.name}</h3>
                <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 13, lineHeight: 1.8, color: "var(--slate-light)", fontWeight: 300, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "var(--slate)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>{p.tech}</div>
              </div>
            ))}
          </div>
          {t.projects.length > 6 && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => setShowAllProj(!showAllProj)} style={{ padding: "14px 36px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "var(--cream)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s", borderRadius: 1 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "var(--cream)"; }}>
                {showAllProj ? "−" : "+"} {showAllProj ? (lang === "ar" ? "أقل" : lang === "en" ? "Show less" : "Voir moins") : (lang === "ar" ? "عرض الكل" : lang === "en" ? "Show all projects" : "Voir tous les projets")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SKILLS */}
      <section id="s3" style={{ padding: "120px 48px", background: "var(--ivory)", position: "relative" }}>
        <BlueprintGrid />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number={t.skillsNum} title={t.skillsTitle} subtitle={t.skillsSub} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {Object.entries(t.skillCats).map(([cat, items], i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={cat} ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1)` }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 16, height: 1, background: "var(--gold)" }} />{cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {items.map(s => <span key={s} className="skill-chip">{s}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Coursework */}
          <div style={{ marginTop: 64, padding: 32, border: "1px solid rgba(13,27,42,0.06)", background: "var(--cream)", borderRadius: 2 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>{t.courseworkTitle}</div>
            <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 14, lineHeight: 1.9, color: "var(--slate)", fontWeight: 300 }}>{t.coursework}</p>
          </div>
        </div>
      </section>

      {/* EXTRA */}
      <section style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead number={t.extraNum} title={t.extraTitle} subtitle={t.extraSub} />
          <div style={{ display: "grid", gap: 24 }}>
            {t.extras.map((e, i) => {
              const [ref, vis] = useInView();
              return (
                <div key={i} ref={ref} style={{ padding: 32, border: "1px solid rgba(13,27,42,0.06)", background: "var(--ivory)", borderRadius: 2, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.7s ${i * 0.15}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: 20, fontWeight: isRtl ? 600 : 400 }}>{e.title}</h3>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 2 }}>{e.year}</span>
                  </div>
                  <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--slate)", fontWeight: 300 }}>{e.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="s4" style={{ padding: "120px 48px", background: "var(--ivory)", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionHead number={t.contactNum} title={<span>{t.contactTitle}<br /><span style={{ fontStyle: isRtl ? "normal" : "italic", color: "var(--gold)" }}>{t.contactTitle2}</span></span>} />
          <p style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--sans)", fontSize: 16, lineHeight: 2, color: "var(--slate)", fontWeight: 300, maxWidth: 500, margin: "0 auto 48px" }}>{t.contactDesc}</p>
          <div className="contact-row" style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: t.contactLabels.email, value: "tadrosjustine21@gmail.com", href: "mailto:tadrosjustine21@gmail.com" },
              { label: t.contactLabels.linkedin, value: "justinetadros", href: "https://www.linkedin.com/in/justinetadros/" },
              { label: t.contactLabels.github, value: "JustineTdrs", href: "https://github.com/JustineTdrs" },
              { label: t.contactLabels.phone, value: "+33 7 68 98 59 03", href: "tel:+33768985903" },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ padding: "28px 32px", border: "1px solid rgba(13,27,42,0.06)", textDecoration: "none", minWidth: 200, transition: "all 0.4s", background: "var(--cream)", textAlign: "center", borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(13,27,42,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,27,42,0.06)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 10 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--navy)", fontWeight: 400 }}>{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(13,27,42,0.06)", background: "var(--ivory)" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--slate-light)" }}>© 2025 JUSTINE TADROS</span>
          <span style={{ fontFamily: isRtl ? "'Noto Sans Arabic'" : "var(--serif)", fontSize: 13, color: "var(--slate)", fontStyle: isRtl ? "normal" : "italic" }}>{t.footer} ✈</span>
        </div>
      </footer>
    </div>
  );
}
