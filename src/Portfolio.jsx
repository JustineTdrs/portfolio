import { useState, useEffect, useRef } from "react";

/* ═══════ TRANSLATIONS ═══════ */
const T = {
  fr: {
    dir: "ltr",
    nav: ["À propos", "Parcours", "Projets", "Compétences", "Contact"],
    heroSub: "Support Methode de Planification· Safran Aircraft Engines",
    heroTitle: ["L'art du", "code", "rencontre", "l'aéronautique"],
    heroDesc: "Actuellement en Support methode de Planification chez Safran Aircraft Engines, je conçois des solutions digitales à l'intersection de la technologie et de l'industrie aéronautique.",
    btnDiscover: "Découvrir", btnContact: "Contact",
    aboutNum: "01", aboutTitle: "À propos", aboutSub: "Profil · Formation · Langues",
    aboutP1: "De Paris au Caire, en passant par Québec — un parcours international forgé par la curiosité technique et la passion de l'industrie.",
    aboutP2: "Titulaire d'un Bachelor Responsable Projet Web et Mobile de l'ETNA, d'une formation en Design d'Interaction à l'Université Laval, je prépare actuellement un Master en Intelligence Artificielle et Big Data à l'École 89.",
    eduLabel: "Formation",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master IA & Big Data", note: "en cours" },
      { year: "2022", school: "Université Laval, Québec", diploma: "Formation Master Design d'Interaction" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor Responsable Projet Web et Mobile" },
    ],
    langLabel: "Langues",
    langs: [
      { lang: "Français", level: "Maternelle", pct: 100 },
      { lang: "Arabe (Dialecte Égyptien)", level: "Maternelle", pct: 100 },
      { lang: "Anglais", level: "Courant", pct: 90 },
    ],
    stats: [{ n: "5+", l: "Années" }, { n: "13", l: "Projets" }, { n: "3", l: "Langues" }, { n: "8", l: "Équipiers" }],
    expNum: "02", expTitle: "Parcours", expSub: "Expérience professionnelle",
    experiences: [
      { year: "Présent", company: "Safran Aircraft Engines", role: "Analyste Support Planification", sub: "Supply Chain & Data", location: "Paris, France", bullets: ["Suivi de l'avancement des projets de transformation digitale et data au sein des départements supply chain et production.", "Test et validation des solutions data développées par l'équipe DATA interne.", "Réalisation des tests de recette (UAT) et assistance au déploiement de nouveaux outils et tableaux de bord.", "Formation des utilisateurs finaux sur les solutions digitales déployées et support fonctionnel continu.", "Rédaction de documentation technique détaillée et de guides utilisateurs en anglais.", "Support supplémentaire lors des pics de charge, collaboration interéquipes et continuité des projets."] },
      { year: "2024–2025", company: "Shepherd of Egypt", role: "Développeuse Web", sub: "Infrastructure & WordPress", location: "Le Caire, Égypte", bullets: ["Diagnostic et résolution de problèmes critiques WordPress (conflits plugins, e-mails, BDD).", "Configuration serveur, services SMTP et enregistrements DNS (SPF, DKIM, DMARC).", "Dépannage expert : configurations PHP, mise en place SSL et erreurs backend."] },
      { year: "2021–2022", company: "Tradespotting", role: "Développeuse Front End", sub: "Architecture & APIs", location: "Paris, France", bullets: ["Collaboration avec le directeur IT pour améliorer sites web et applications mobiles.", "Conception de l'architecture des données : sources, chargement, sécurité, visualisation.", "Création d'APIs avec spécifications et endpoints définis."] },
      { year: "2020–2021", company: "ETNA", role: "Développeuse Full Stack", sub: "Plateformes universitaires", location: "Paris, France", bullets: ["Identification et correction de problèmes de plateforme avec Docker et PHP.", "Résolution de problèmes techniques au sein des plateformes universitaires."] },
      { year: "2019–2020", company: "SHIFT89", role: "Développeuse Web & Lead", sub: "Management d'équipe", location: "Paris, France", bullets: ["Évaluation et amélioration de sites web et apps mobiles, animation de réunions quotidiennes.", "Supervision du recrutement et du mentorat des stagiaires.", "Présentation de solutions aux clients et orchestration des améliorations."] },
    ],
    projNum: "03", projTitle: "Projets", projSub: "Réalisations techniques",
    projects: [
      { name: "E-Commerce Laravel", cat: "FULL STACK", desc: "Site E-Commerce complet en HTML, CSS, JS avec Laravel.", tech: "Laravel · JS · CSS" },
      { name: "TicketChainer", cat: "HACKATHON", desc: "Chef de projet, équipe de 8. FrontEnd, APIs, Docker, Symfony.", tech: "Docker · Symfony · APIs" },
      { name: "Application Météo", cat: "iOS", desc: "App météo native en Swift avec géolocalisation.", tech: "Swift · Xcode" },
      { name: "Clone Twitter", cat: "BACKEND", desc: "Réseau social complet en NodeJs.", tech: "Node.js · MongoDB" },
      { name: "Serveur Debian", cat: "DEVOPS", desc: "Serveur web from scratch avec Debian, VirtualBox, VMware.", tech: "Debian · Shell · VM" },
      { name: "Jeu RPG", cat: "GAME DEV", desc: "Interface graphique RPG complète en Java.", tech: "Java · Swing" },
      { name: "Azure Cognitive", cat: "CLOUD · IA", desc: "Reconnaissance faciale avec Face API. Top 5 Microsoft Camp.", tech: "Azure · API" },
      { name: "App Android", cat: "MOBILE", desc: "Application Android Studio en Java.", tech: "Java · Android" },
      { name: "CRUD en C", cat: "ALGO", desc: "Structure de données modèle CRUD en C.", tech: "C" },
      { name: "Fullstack Java", cat: "FULL STACK", desc: "App backend + frontend Java AndroidStudio.", tech: "Java · Android" },
      { name: "C-BASH-Web", cat: "FORMATION", desc: "Intensive 6 semaines en C, Bash, Web.", tech: "C · Bash · Web" },
      { name: "Bases MySQL", cat: "DATABASE", desc: "Création de bases de données avec MySQL.", tech: "MySQL" },
    ],
    showAll: "Voir tous les projets", showLess: "Voir moins",
    skillsNum: "04", skillsTitle: "Compétences", skillsSub: "Stack technique",
    skillCats: [
      { cat: "Langages", items: ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "Technologies Web", items: ["Angular", "Symfony", "PHP Framework"] },
      { cat: "Outils", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "Services Cloud", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "Outils Data", items: ["Power BI", "SAP", "Excel (TCD, RECHERCHEV, Dashboards)"] },
    ],
    courseworkLabel: "Cours Pertinents",
    coursework: "Développement Frontend, Développement Backend, Management de l'Innovation et Entrepreneuriat, Ingénierie d'Infrastructure Cloud, Réalité Virtuelle, Réalité Augmentée et Ingénierie de Jeux Vidéo, Ingénierie de Développement d'Applications Mobiles.",
    extraNum: "05", extraTitle: "Activités", extraSub: "Extrascolaire & récompenses",
    extras: [
      { title: "Cheffe de Projet — TicketChainer", year: "2019", desc: "Direction d'une équipe de 8 personnes, supervision de l'intégration FrontEnd, gestion APIs et adaptation templates. Conseils sur toutes les phases du projet." },
      { title: "Top 5 Camp Microsoft", year: "2020", desc: "Participation au Camp Microsoft : Service Cognitif, acquisition de connaissances sur l'API Faces de la suite Cognitive Services." },
    ],
    contactNum: "06", contactTitle: "Collaborons", contactTitle2: "ensemble",
    contactDesc: "Que ce soit pour du développement, de la transformation digitale ou l'aéronautique — je suis à l'écoute.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Téléphone" },
    footer: "Fait avec passion pour l'aviation",
    chatGreeting: "👋 Bonjour ! Je suis l'assistant de Justine. Que souhaitez-vous savoir ?",
    chatOptions: ["Parcours professionnel", "Compétences techniques", "Projets réalisés", "Me contacter"],
    chatReplies: [
      "Justine a 5+ ans d'expérience. Elle travaille actuellement chez **Safran Aircraft Engines** comme Analyste Support Planification (Supply Chain & Data). Avant cela : Shepherd of Egypt (Web Dev), Tradespotting (Front End), ETNA (Full Stack) et SHIFT89 (Web Dev & Lead).",
      "**Langages** : HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**Frameworks** : React, Laravel, Symfony, Angular, Node.js\n**Data & Cloud** : Power BI, SAP, Azure SQL, Docker\n**Design** : Figma, Adobe XD, Photoshop, Illustrator",
      "13+ projets incluant : E-Commerce Laravel, TicketChainer (hackathon, chef de projet), App Météo iOS, Clone Twitter, Serveur Debian, Jeu RPG Java, Azure Cognitive Services (Top 5 Microsoft Camp).",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "Choisissez une option ci-dessus...",
    darkMode: "Mode sombre", lightMode: "Mode clair",
  },
  en: {
    dir: "ltr",
    nav: ["About", "Experience", "Projects", "Skills", "Contact"],
    heroSub: "Planning Support Analyst  · Safran Aircraft Engines",
    heroTitle: ["Where", "code", "meets", "aerospace"],
    heroDesc: "Planning Support Analyst Safran Aircraft Engines, I design digital solutions at the intersection of technology and the aerospace industry.",
    btnDiscover: "Discover", btnContact: "Contact",
    aboutNum: "01", aboutTitle: "About", aboutSub: "Profile · Education · Languages",
    aboutP1: "From Paris to Cairo, through Quebec — an international journey shaped by technical curiosity and a passion for industry.",
    aboutP2: "Holding a Bachelor's in Web and Mobile Project Management from ETNA and training in Interaction Design from Université Laval, I am currently pursuing a Master's in AI and Big Data at École 89.",
    eduLabel: "Education",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master's AI & Big Data", note: "in progress" },
      { year: "2022", school: "Université Laval, Quebec", diploma: "Master's Interaction Design Training" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor's Web & Mobile Project Management" },
    ],
    langLabel: "Languages",
    langs: [
      { lang: "French", level: "Native", pct: 100 },
      { lang: "Arabic (Egyptian)", level: "Native", pct: 100 },
      { lang: "English", level: "Fluent", pct: 90 },
    ],
    stats: [{ n: "5+", l: "Years" }, { n: "13", l: "Projects" }, { n: "3", l: "Languages" }, { n: "8", l: "Teammates" }],
    expNum: "02", expTitle: "Experience", expSub: "Professional experience",
    experiences: [
      { year: "Present", company: "Safran Aircraft Engines", role: "Planning Support Analyst", sub: "Supply Chain & Data", location: "Paris, France", bullets: ["Monitoring digital transformation and data projects across supply chain and production.", "Testing and validating data solutions by the internal DATA team.", "Performing UAT and assisting deployment of new tools and dashboards.", "Training end-users on digital solutions and providing ongoing support.", "Drafting detailed technical documentation and user guides in English.", "Additional support during workload peaks, ensuring cross-team collaboration."] },
      { year: "2024–2025", company: "Shepherd of Egypt", role: "Web Developer", sub: "Infrastructure & WordPress", location: "Cairo, Egypt", bullets: ["Diagnosed and resolved critical WordPress issues (plugins, emails, DB).", "Configured server settings, SMTP, and DNS records (SPF, DKIM, DMARC).", "Expert troubleshooting: PHP configs, SSL setup, and backend errors."] },
      { year: "2021–2022", company: "Tradespotting", role: "Front End Developer", sub: "Architecture & APIs", location: "Paris, France", bullets: ["Partnered with IT director to enhance websites and mobile apps.", "Designed data architecture: sources, load strategy, security, visualization.", "Created APIs with defined specifications and endpoints."] },
      { year: "2020–2021", company: "ETNA", role: "Full Stack Developer", sub: "University platforms", location: "Paris, France", bullets: ["Identified and fixed platform issues using Docker and PHP.", "Resolved technical issues within university platforms."] },
      { year: "2019–2020", company: "SHIFT89", role: "Web Developer & Lead", sub: "Team management", location: "Paris, France", bullets: ["Evaluated and enhanced websites and mobile apps, ran daily standups.", "Supervised recruitment and mentorship of interns.", "Presented solutions to clients and orchestrated project enhancements."] },
    ],
    projNum: "03", projTitle: "Projects", projSub: "Technical achievements",
    projects: [
      { name: "E-Commerce Laravel", cat: "FULL STACK", desc: "Complete e-commerce site with HTML, CSS, JS and Laravel.", tech: "Laravel · JS · CSS" },
      { name: "TicketChainer", cat: "HACKATHON", desc: "Project lead, team of 8. FrontEnd, APIs, Docker, Symfony.", tech: "Docker · Symfony · APIs" },
      { name: "Weather App", cat: "iOS", desc: "Native weather app built in Swift.", tech: "Swift · Xcode" },
      { name: "Twitter Clone", cat: "BACKEND", desc: "Full social network in NodeJs.", tech: "Node.js · MongoDB" },
      { name: "Debian Server", cat: "DEVOPS", desc: "Web server from scratch with Debian, VirtualBox, VMware.", tech: "Debian · Shell · VM" },
      { name: "RPG Game", cat: "GAME DEV", desc: "Complete RPG graphical interface in Java.", tech: "Java · Swing" },
      { name: "Azure Cognitive", cat: "CLOUD · AI", desc: "Facial recognition with Face API. Top 5 Microsoft Camp.", tech: "Azure · API" },
      { name: "Android App", cat: "MOBILE", desc: "Android Studio application in Java.", tech: "Java · Android" },
      { name: "CRUD in C", cat: "ALGO", desc: "CRUD model data structure in C.", tech: "C" },
      { name: "Fullstack Java", cat: "FULL STACK", desc: "Backend + frontend Java AndroidStudio app.", tech: "Java · Android" },
      { name: "C-BASH-Web", cat: "TRAINING", desc: "6-week intensive in C, Bash, Web.", tech: "C · Bash · Web" },
      { name: "MySQL Databases", cat: "DATABASE", desc: "Creating databases with MySQL.", tech: "MySQL" },
    ],
    showAll: "Show all projects", showLess: "Show less",
    skillsNum: "04", skillsTitle: "Skills", skillsSub: "Technical stack",
    skillCats: [
      { cat: "Languages", items: ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "Web Technologies", items: ["Angular", "Symfony", "PHP Framework"] },
      { cat: "Tools", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "Cloud Services", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "Data Tools", items: ["Power BI", "SAP", "Excel (Pivot Tables, VLOOKUP, Dashboards)"] },
    ],
    courseworkLabel: "Relevant Coursework",
    coursework: "Frontend Development, Backend Development, Innovation Management, Cloud Infrastructure Engineering, VR/AR & Video Game Engineering, Mobile Application Development Engineering.",
    extraNum: "05", extraTitle: "Activities", extraSub: "Extracurricular & awards",
    extras: [
      { title: "Project Leader — TicketChainer", year: "2019", desc: "Led a team of 8, overseeing FrontEnd integration, API management, and template adaptation across all project phases." },
      { title: "Top 5 Microsoft Camp", year: "2020", desc: "Participated in Microsoft Camp: Cognitive Service, gaining insights into the Face API from Microsoft's Cognitive Services suite." },
    ],
    contactNum: "06", contactTitle: "Let's work", contactTitle2: "together",
    contactDesc: "Whether it's development, digital transformation, or aerospace — I'm all ears.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Phone" },
    footer: "Made with passion for aviation",
    chatGreeting: "👋 Hi! I'm Justine's assistant. What would you like to know?",
    chatOptions: ["Career path", "Technical skills", "Projects", "Contact info"],
    chatReplies: [
      "Justine has 5+ years of experience. Currently at **Safran Aircraft Engines** as Planning Support Analyst (Supply Chain & Data). Previously: Shepherd of Egypt (Web Dev), Tradespotting (Front End), ETNA (Full Stack), SHIFT89 (Web Dev & Lead).",
      "**Languages**: HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**Frameworks**: React, Laravel, Symfony, Angular, Node.js\n**Data & Cloud**: Power BI, SAP, Azure SQL, Docker\n**Design**: Figma, Adobe XD, Photoshop, Illustrator",
      "13+ projects including: E-Commerce Laravel, TicketChainer (hackathon lead), iOS Weather App, Twitter Clone, Debian Server, RPG Game, Azure Cognitive Services (Top 5 Microsoft Camp).",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "Pick an option above...",
    darkMode: "Dark mode", lightMode: "Light mode",
  },
  ar: {
    dir: "rtl",
    nav: ["نبذة عني", "المسيرة", "المشاريع", "المهارات", "اتصل بي"],
    heroSub: "مطورة Full Stack · سافران لمحركات الطائرات",
    heroTitle: ["حيث يلتقي", "البرمجة", "بعالم", "الطيران"],
    heroDesc: "مطورة Full Stack في سافران لمحركات الطائرات، أصمم حلولاً رقمية عند تقاطع التكنولوجيا وصناعة الطيران.",
    btnDiscover: "اكتشف", btnContact: "اتصل بي",
    aboutNum: "٠١", aboutTitle: "نبذة عني", aboutSub: "الملف الشخصي · التعليم · اللغات",
    aboutP1: "من باريس إلى القاهرة، مروراً بكيبيك — مسيرة دولية صقلتها الفضول التقني والشغف بالصناعة.",
    aboutP2: "حاصلة على بكالوريوس في إدارة مشاريع الويب والموبايل من ETNA وتدريب في تصميم التفاعل من جامعة لافال، أحضّر حالياً ماجستير في الذكاء الاصطناعي والبيانات الضخمة في مدرسة 89.",
    eduLabel: "التعليم",
    edu: [
      { year: "٢٠٢٥", school: "مدرسة 89", diploma: "ماجستير ذكاء اصطناعي وبيانات ضخمة", note: "قيد الدراسة" },
      { year: "٢٠٢٢", school: "جامعة لافال، كيبيك", diploma: "تدريب ماجستير تصميم التفاعل" },
      { year: "٢٠٢١", school: "ETNA، باريس", diploma: "بكالوريوس إدارة مشاريع الويب والموبايل" },
    ],
    langLabel: "اللغات",
    langs: [
      { lang: "الفرنسية", level: "لغة أم", pct: 100 },
      { lang: "العربية (المصرية)", level: "لغة أم", pct: 100 },
      { lang: "الإنجليزية", level: "طلاقة", pct: 90 },
    ],
    stats: [{ n: "٥+", l: "سنوات" }, { n: "١٣", l: "مشاريع" }, { n: "٣", l: "لغات" }, { n: "٨", l: "زملاء" }],
    expNum: "٠٢", expTitle: "المسيرة", expSub: "الخبرة المهنية",
    experiences: [
      { year: "حالياً", company: "سافران لمحركات الطائرات", role: "محللة دعم التخطيط", sub: "سلسلة التوريد والبيانات", location: "باريس، فرنسا", bullets: ["متابعة تقدم مشاريع التحول الرقمي والبيانات في أقسام سلسلة التوريد والإنتاج.", "اختبار والتحقق من حلول البيانات المطورة من فريق DATA الداخلي.", "إجراء اختبارات القبول (UAT) والمساعدة في نشر الأدوات ولوحات المعلومات.", "تدريب المستخدمين النهائيين وتقديم الدعم الوظيفي المستمر.", "صياغة وثائق تقنية مفصلة وأدلة مستخدم باللغة الإنجليزية.", "تقديم دعم إضافي خلال أوقات الذروة والتعاون بين الفرق."] },
      { year: "٢٠٢٤–٢٠٢٥", company: "شيبرد أوف إيجبت", role: "مطورة ويب", sub: "البنية التحتية ووردبريس", location: "القاهرة، مصر", bullets: ["تشخيص وحل مشاكل ووردبريس الحرجة.", "تكوين الخادم وخدمات SMTP وسجلات DNS.", "استكشاف الأخطاء وإصلاحها: PHP, SSL, أخطاء backend."] },
      { year: "٢٠٢١–٢٠٢٢", company: "تريدسبوتينغ", role: "مطورة Front End", sub: "الهندسة والواجهات البرمجية", location: "باريس، فرنسا", bullets: ["التعاون مع مدير IT لتحسين المواقع والتطبيقات.", "تصميم هندسة البيانات: المصادر، التحميل، الأمان، التصور.", "إنشاء واجهات برمجة التطبيقات بمواصفات محددة."] },
      { year: "٢٠٢٠–٢٠٢١", company: "ETNA", role: "مطورة Full Stack", sub: "المنصات الجامعية", location: "باريس، فرنسا", bullets: ["تحديد وإصلاح مشاكل المنصة باستخدام Docker و PHP.", "حل المشاكل التقنية لضمان أداء سلس."] },
      { year: "٢٠١٩–٢٠٢٠", company: "SHIFT89", role: "مطورة ويب وقائدة فريق", sub: "إدارة الفريق", location: "باريس، فرنسا", bullets: ["تقييم وتحسين المواقع والتطبيقات، إدارة اجتماعات يومية.", "الإشراف على توظيف وتوجيه المتدربين.", "تقديم الحلول للعملاء وتنسيق التحسينات."] },
    ],
    projNum: "٠٣", projTitle: "المشاريع", projSub: "إنجازات تقنية",
    projects: [
      { name: "متجر Laravel", cat: "FULL STACK", desc: "موقع تجارة إلكترونية كامل بـ Laravel.", tech: "Laravel · JS · CSS" },
      { name: "TicketChainer", cat: "هاكاثون", desc: "قيادة فريق من 8. FrontEnd, APIs, Docker, Symfony.", tech: "Docker · Symfony" },
      { name: "تطبيق الطقس", cat: "iOS", desc: "تطبيق طقس أصلي بـ Swift.", tech: "Swift · Xcode" },
      { name: "نسخة تويتر", cat: "BACKEND", desc: "شبكة اجتماعية بـ NodeJs.", tech: "Node.js" },
      { name: "خادم Debian", cat: "DEVOPS", desc: "خادم ويب من الصفر.", tech: "Debian · Shell" },
      { name: "لعبة RPG", cat: "ألعاب", desc: "واجهة رسومية RPG بـ Java.", tech: "Java · Swing" },
      { name: "Azure Cognitive", cat: "سحابة", desc: "التعرف على الوجوه. أفضل 5 معسكر مايكروسوفت.", tech: "Azure · API" },
      { name: "تطبيق أندرويد", cat: "موبايل", desc: "تطبيق Android Studio بـ Java.", tech: "Java · Android" },
      { name: "CRUD بلغة C", cat: "خوارزميات", desc: "بنية بيانات CRUD بلغة C.", tech: "C" },
      { name: "Fullstack Java", cat: "FULL STACK", desc: "تطبيق Backend + Frontend بـ Java.", tech: "Java · Android" },
      { name: "C-BASH-Web", cat: "تدريب", desc: "دورة مكثفة 6 أسابيع.", tech: "C · Bash · Web" },
      { name: "MySQL", cat: "قواعد بيانات", desc: "إنشاء قواعد بيانات.", tech: "MySQL" },
    ],
    showAll: "عرض الكل", showLess: "عرض أقل",
    skillsNum: "٠٤", skillsTitle: "المهارات", skillsSub: "المجموعة التقنية",
    skillCats: [
      { cat: "لغات البرمجة", items: ["HTML/CSS/JS", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "تقنيات الويب", items: ["Angular", "Symfony", "PHP Framework"] },
      { cat: "الأدوات", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "خدمات سحابية", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "أدوات البيانات", items: ["Power BI", "SAP", "Excel (جداول محورية, VLOOKUP, لوحات)"] },
    ],
    courseworkLabel: "المقررات الدراسية",
    coursework: "تطوير الواجهة الأمامية، تطوير الواجهة الخلفية، إدارة الابتكار، هندسة البنية التحتية السحابية، الواقع الافتراضي والمعزز وألعاب الفيديو، هندسة تطوير تطبيقات الموبايل.",
    extraNum: "٠٥", extraTitle: "الأنشطة", extraSub: "أنشطة لامنهجية وجوائز",
    extras: [
      { title: "قائدة مشروع — TicketChainer", year: "٢٠١٩", desc: "قيادة فريق من 8 أفراد، إدارة دمج الواجهة الأمامية والواجهات البرمجية عبر جميع مراحل المشروع." },
      { title: "أفضل 5 معسكر مايكروسوفت", year: "٢٠٢٠", desc: "المشاركة في معسكر مايكروسوفت: الخدمة المعرفية وواجهة التعرف على الوجوه." },
    ],
    contactNum: "٠٦", contactTitle: "لنعمل", contactTitle2: "معاً",
    contactDesc: "سواء كان تطويراً أو تحولاً رقمياً أو تعاوناً في الطيران — أنا مستعدة.",
    contactLabels: { email: "البريد", linkedin: "لينكد إن", github: "غيت هاب", phone: "الهاتف" },
    footer: "صُنع بشغف الطيران",
    chatGreeting: "👋 مرحباً! أنا مساعدة جوستين. ماذا تريد أن تعرف؟",
    chatOptions: ["المسيرة المهنية", "المهارات التقنية", "المشاريع", "معلومات الاتصال"],
    chatReplies: [
      "جوستين لديها ٥+ سنوات خبرة. تعمل حالياً في **سافران** كمحللة دعم تخطيط. سابقاً: Shepherd of Egypt, Tradespotting, ETNA, SHIFT89.",
      "**لغات**: HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**أطر عمل**: React, Laravel, Symfony, Angular, Node.js\n**بيانات وسحابة**: Power BI, SAP, Azure SQL, Docker",
      "١٣+ مشروع تشمل: متجر Laravel، TicketChainer (قائدة مشروع)، تطبيق طقس iOS، نسخة تويتر، خادم Debian، لعبة RPG، Azure Cognitive.",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "اختر خياراً أعلاه...",
    darkMode: "الوضع الداكن", lightMode: "الوضع الفاتح",
  },
};

/* ═══════ SVGs ═══════ */
const BlueprintGrid = ({ dark }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark ? 0.06 : 0.03, pointerEvents: "none" }}>
    <defs>
      <pattern id="bpG" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke={dark ? "#4a9eff" : "#1a2744"} strokeWidth="0.5" /></pattern>
      <pattern id="bpS" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M 12 0 L 0 0 0 12" fill="none" stroke={dark ? "#4a9eff" : "#1a2744"} strokeWidth="0.3" /></pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bpS)" /><rect width="100%" height="100%" fill="url(#bpG)" />
  </svg>
);

const AircraftSVG = ({ style, color = "currentColor", opacity = 0.35 }) => (
  <svg viewBox="0 0 800 200" style={style} fill="none">
    <path d="M 50 100 Q 80 85 200 88 L 600 88 Q 720 88 760 95 L 770 100 Q 760 105 720 112 L 600 112 L 200 112 Q 80 115 50 100 Z" stroke={color} strokeWidth="1.2" fill="none" opacity={opacity} />
    <path d="M 280 88 L 220 30 Q 215 26 225 26 L 380 26 Q 390 26 385 30 L 340 88" stroke={color} strokeWidth="1" fill="none" opacity={opacity * 0.8} />
    <path d="M 280 112 L 220 170 Q 215 174 225 174 L 380 174 Q 390 174 385 170 L 340 112" stroke={color} strokeWidth="1" fill="none" opacity={opacity * 0.8} />
    <path d="M 650 88 L 640 50 Q 638 44 645 44 L 710 44 Q 718 44 715 50 L 695 88" stroke={color} strokeWidth="1" fill="none" opacity={opacity * 0.8} />
    <path d="M 650 112 L 640 150 Q 638 156 645 156 L 710 156 Q 718 156 715 150 L 695 112" stroke={color} strokeWidth="1" fill="none" opacity={opacity * 0.8} />
    <ellipse cx="300" cy="30" rx="22" ry="8" stroke={color} strokeWidth="0.8" opacity={opacity * 0.7} />
    <ellipse cx="300" cy="170" rx="22" ry="8" stroke={color} strokeWidth="0.8" opacity={opacity * 0.7} />
    <line x1="50" y1="135" x2="770" y2="135" stroke={color} strokeWidth="0.5" strokeDasharray="6 4" opacity={opacity * 0.5} />
    <line x1="50" y1="132" x2="50" y2="138" stroke={color} strokeWidth="0.5" opacity={opacity * 0.5} />
    <line x1="770" y1="132" x2="770" y2="138" stroke={color} strokeWidth="0.5" opacity={opacity * 0.5} />
    <text x="410" y="145" textAnchor="middle" fill={color} fontSize="6" opacity={opacity * 0.4} fontFamily="monospace">720 mm</text>
    <line x1="395" y1="82" x2="395" y2="118" stroke={color} strokeWidth="0.4" strokeDasharray="3 3" opacity={opacity * 0.4} />
    <line x1="380" y1="100" x2="410" y2="100" stroke={color} strokeWidth="0.4" strokeDasharray="3 3" opacity={opacity * 0.4} />
    <circle cx="395" cy="100" r="2" fill={color} opacity={opacity * 0.3} />
  </svg>
);

const TurbineBlueprint = ({ size = 200, style, color = "var(--gold)" }) => (
  <svg viewBox="0 0 200 200" style={{ width: size, height: size, ...style }} fill="none">
    <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="0.4" opacity="0.35" />
    <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.4" opacity="0.3" />
    <circle cx="100" cy="100" r="45" stroke={color} strokeWidth="0.4" opacity="0.25" />
    <circle cx="100" cy="100" r="20" stroke={color} strokeWidth="0.5" opacity="0.45" />
    <circle cx="100" cy="100" r="6" fill={color} opacity="0.2" />
    {Array.from({ length: 24 }).map((_, i) => { const a = i * 15 * Math.PI / 180; return <line key={i} x1={100 + 22 * Math.cos(a)} y1={100 + 22 * Math.sin(a)} x2={100 + 93 * Math.cos(a)} y2={100 + 93 * Math.sin(a)} stroke={color} strokeWidth="0.3" opacity="0.15" />; })}
    {Array.from({ length: 8 }).map((_, i) => { const a = i * 45 * Math.PI / 180; const n = (i * 45 + 22) * Math.PI / 180; return <path key={i} d={`M ${100 + 20 * Math.cos(a)} ${100 + 20 * Math.sin(a)} Q ${100 + 55 * Math.cos(n)} ${100 + 55 * Math.sin(n)} ${100 + 85 * Math.cos(a)} ${100 + 85 * Math.sin(a)}`} stroke={color} strokeWidth="0.7" opacity="0.3" />; })}
  </svg>
);

/* ═══════ ANIMATED SECTION ═══════ */
const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(30px)", transition: `all 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`, ...style }}>{children}</div>;
};

const SectionHead = ({ number, title, subtitle, dark }) => (
  <FadeIn style={{ marginBottom: 64 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>{number}</span>
      <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} />
    </div>
    <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, color: dark ? "var(--fg)" : "var(--navy)", letterSpacing: -1, lineHeight: 1.1 }}>{title}</h2>
    {subtitle && <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>{subtitle}</p>}
  </FadeIn>
);

/* ═══════ CHATBOT ═══════ */
const Chatbot = ({ t, dark }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [answered, setAnswered] = useState(new Set());
  const chatEnd = useRef(null);

  useEffect(() => { setMsgs([]); setAnswered(new Set()); }, [t]);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const handleOption = (i) => {
    if (answered.has(i)) return;
    setAnswered(prev => new Set([...prev, i]));
    setMsgs(prev => [...prev, { type: "user", text: t.chatOptions[i] }, { type: "bot", text: t.chatReplies[i] }]);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, width: 56, height: 56, borderRadius: "50%", background: "var(--gold)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all 0.3s", transform: open ? "rotate(45deg)" : "none" }}>
        <span style={{ fontSize: 24, color: "#fff", lineHeight: 1 }}>{open ? "+" : "✈"}</span>
      </button>

      {open && (
        <div style={{ position: "fixed", bottom: 92, right: 24, zIndex: 200, width: 360, maxWidth: "calc(100vw - 48px)", height: 480, maxHeight: "60vh", background: dark ? "#1a1a2e" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, borderRadius: 16, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 2, color: "var(--muted)" }}>ASSISTANT DE JUSTINE</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Greeting */}
            <div style={{ padding: "12px 16px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: "4px 16px 16px 16px", maxWidth: "85%", fontSize: 13, lineHeight: 1.7, color: "var(--fg)" }}>{t.chatGreeting}</div>

            {/* Options */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.chatOptions.map((opt, i) => (
                <button key={i} onClick={() => handleOption(i)} style={{ padding: "8px 16px", border: `1px solid ${answered.has(i) ? "var(--gold)" : dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, borderRadius: 20, background: answered.has(i) ? "rgba(184,134,11,0.1)" : "transparent", color: answered.has(i) ? "var(--gold)" : "var(--fg)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, cursor: answered.has(i) ? "default" : "pointer", transition: "all 0.3s", opacity: answered.has(i) ? 0.6 : 1 }}>{opt}</button>
              ))}
            </div>

            {/* Conversation */}
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.type === "user" ? "flex-end" : "flex-start", padding: "12px 16px", background: m.type === "user" ? "var(--gold)" : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", color: m.type === "user" ? "#fff" : "var(--fg)", borderRadius: m.type === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", maxWidth: "85%", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-line", fontFamily: "var(--sans)", animation: "fadeUp 0.3s ease" }}>
                {m.text.split("**").map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════ MAIN PORTFOLIO ═══════ */
export default function Portfolio() {
  const [lang, setLang] = useState("fr");
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeExp, setActiveExp] = useState(0);
  const [hoveredProj, setHoveredProj] = useState(null);
  const [showAllProj, setShowAllProj] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];
  const isRtl = t.dir === "rtl";

  useEffect(() => { setTimeout(() => setLoaded(true), 100); const h = () => setScrollY(window.scrollY); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { setActiveExp(0); setShowAllProj(false); }, [lang]);

  const visibleProjects = showAllProj ? t.projects : t.projects.slice(0, 6);

  // Theme colors
  const theme = dark
    ? { bg: "#0a0e1a", bg2: "#0f1424", fg: "#e8e6e1", navy: "#e8e6e1", muted: "#7a8899", cardBg: "#131830", cardBorder: "rgba(255,255,255,0.06)", projBg: "#060a14", gold: "#D4A843" }
    : { bg: "#F5F0E8", bg2: "#FAF7F2", fg: "#0D1B2A", navy: "#0D1B2A", muted: "#6B7B8D", cardBg: "#FAF7F2", cardBorder: "rgba(13,27,42,0.06)", projBg: "#0D1B2A", gold: "#B8860B" };

  const df = isRtl ? "'Noto Sans Arabic', sans-serif" : "var(--serif)";
  const bf = isRtl ? "'Noto Sans Arabic', sans-serif" : "var(--sans)";

  return (
    <div dir={t.dir} style={{ background: theme.bg, color: theme.fg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        :root { --serif:'Playfair Display',Georgia,serif; --sans:'DM Sans',sans-serif; --mono:'IBM Plex Mono',monospace; --display:${df}; --gold:${theme.gold}; --navy:${theme.navy}; --fg:${theme.fg}; --muted:${theme.muted}; --bg:${theme.bg}; --bg2:${theme.bg2}; }
        * { margin:0; padding:0; box-sizing:border-box; } html { scroll-behavior:smooth; } body { background:${theme.bg}; }
        ::selection { background:var(--gold); color:${dark ? "#0a0e1a" : "#FAF7F2"}; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        .nav-item { font-family:var(--mono); font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); cursor:pointer; padding:8px 0; position:relative; transition:color 0.3s; text-decoration:none; } .nav-item:hover{color:var(--fg)} .nav-item::after{content:'';position:absolute;bottom:4px;left:0;width:0;height:1px;background:var(--gold);transition:width 0.4s} .nav-item:hover::after{width:100%}
        .chip { display:inline-block; padding:8px 18px; border:1px solid ${theme.cardBorder}; font-family:var(--mono); font-size:11px; letter-spacing:1.5px; color:var(--fg); transition:all 0.3s; cursor:default; border-radius:1px; } .chip:hover{border-color:var(--gold);color:var(--gold);background:rgba(184,134,11,0.05)}
        .exp-tab { font-family:var(--mono); font-size:12px; letter-spacing:2px; padding:16px 24px; cursor:pointer; border:none; background:none; color:var(--muted); position:relative; transition:all 0.4s; text-align:${isRtl?"right":"left"}; width:100%; } .exp-tab:hover{color:var(--fg)} .exp-tab.active{color:var(--fg)} .exp-tab.active::before{content:'';position:absolute;${isRtl?"right":"left"}:0;top:0;bottom:0;width:2px;background:var(--gold)}
        .btn-sm { padding:6px 14px; border:1px solid ${theme.cardBorder}; background:transparent; color:var(--muted); font-family:var(--mono); font-size:10px; letter-spacing:2px; cursor:pointer; transition:all 0.3s; border-radius:1px; } .btn-sm:hover{border-color:var(--gold);color:var(--gold)} .btn-sm.active{background:${dark?"var(--gold)":"var(--navy)"};color:${dark?"#0a0e1a":"#FAF7F2"};border-color:transparent}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:${theme.bg}} ::-webkit-scrollbar-thumb{background:rgba(184,134,11,0.2)} ::-webkit-scrollbar-thumb:hover{background:rgba(184,134,11,0.4)}
        .exp-mobile{display:none}
        @media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;text-align:center}.hero-right{display:none!important}.exp-grid{display:none!important}.exp-mobile{display:block!important}.proj-grid{grid-template-columns:1fr!important}.about-grid{grid-template-columns:1fr!important}.contact-row{flex-direction:column!important}.footer-inner{flex-direction:column!important;gap:16px!important;text-align:center!important}.desktop-nav{display:none!important}.hamburger{display:flex!important}section{padding-left:20px!important;padding-right:20px!important}nav{padding-left:20px!important;padding-right:20px!important}}
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 80 ? (dark ? "rgba(10,14,26,0.92)" : "rgba(245,240,232,0.92)") : "transparent", backdropFilter: scrollY > 80 ? "blur(16px)" : "none", borderBottom: scrollY > 80 ? `1px solid ${theme.cardBorder}` : "none", transition: "all 0.4s" }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }} fill="none"><circle cx="16" cy="16" r="15" stroke="var(--gold)" strokeWidth="0.8" /><text x="16" y="20" textAnchor="middle" fill="var(--fg)" fontFamily="var(--serif)" fontSize="13" fontWeight="500">JT</text></svg>
          <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 500, color: "var(--fg)", letterSpacing: 2 }}>JUSTINE TADROS</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>{t.nav.map((s, i) => <a key={i} href={`#s${i}`} className="nav-item">{s}</a>)}</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[["fr","FR"],["en","EN"],["ar","AR"]].map(([k,l]) => <button key={k} className={`btn-sm ${lang===k?"active":""}`} onClick={() => setLang(k)}>{l}</button>)}
          </div>
          <button className="btn-sm" onClick={() => setDark(!dark)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px" }}>
            <span style={{ fontSize: 14 }}>{dark ? "☀" : "☾"}</span>
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8, zIndex: 300 }}>
            <span style={{ width: 22, height: 1.5, background: "var(--gold)", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ width: 22, height: 1.5, background: "var(--gold)", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 1.5, background: "var(--gold)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 150, background: dark ? "rgba(10,14,26,0.98)" : "rgba(245,240,232,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          {t.nav.map((s, i) => (
            <a key={i} href={`#s${i}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: 5, color: "var(--fg)", textDecoration: "none", textTransform: "uppercase" }}>{s}</a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {[["fr","FR"],["en","EN"],["ar","AR"]].map(([k,l]) => <button key={k} className={`btn-sm ${lang===k?"active":""}`} onClick={() => { setLang(k); setMenuOpen(false); }}>{l}</button>)}
          </div>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        <BlueprintGrid dark={dark} />
        <div className="hero-grid" style={{ maxWidth: 1300, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <div style={{ opacity: loaded ? 1 : 0, transition: "all 0.8s 0.2s", transform: loaded ? "none" : "translateY(20px)" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 5, color: "var(--gold)", marginBottom: 24, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 1, background: "var(--gold)" }} />{t.heroSub}
              </div>
            </div>
            <h1 style={{ fontFamily: df, fontSize: isRtl ? "clamp(32px,5vw,64px)" : "clamp(40px,6.5vw,80px)", fontWeight: isRtl ? 700 : 300, lineHeight: 1.1, letterSpacing: isRtl ? 0 : -2, color: "var(--fg)", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 1s 0.4s" }}>
              {t.heroTitle[0]}<br /><span style={{ fontWeight: isRtl ? 700 : 600, fontStyle: isRtl ? "normal" : "italic" }}>{t.heroTitle[1]}</span> {t.heroTitle[2]}<br /><span style={{ color: "var(--gold)", fontWeight: isRtl ? 700 : 600 }}>{t.heroTitle[3]}</span>
            </h1>
            <p style={{ fontFamily: bf, fontSize: 16, lineHeight: 1.9, color: "var(--muted)", maxWidth: 460, marginTop: 32, fontWeight: 300, opacity: loaded ? 1 : 0, transition: "all 0.8s 0.7s" }}>{t.heroDesc}</p>
            <div style={{ display: "flex", gap: 24, marginTop: 48, opacity: loaded ? 1 : 0, transition: "all 0.8s 0.9s" }}>
              <a href="#s0" style={{ padding: "16px 36px", background: dark ? "var(--gold)" : "var(--navy)", color: dark ? "#0a0e1a" : "#FAF7F2", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", borderRadius: 1, transition: "all 0.3s" }}>{t.btnDiscover} →</a>
              <a href="#s4" style={{ padding: "16px 36px", border: `1px solid ${theme.cardBorder}`, color: "var(--fg)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", borderRadius: 1, background: "transparent", transition: "all 0.3s" }}>{t.btnContact}</a>
            </div>
          </div>
          <div className="hero-right" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TurbineBlueprint size={380} style={{ opacity: loaded ? 0.6 : 0, transition: "opacity 1.5s 0.5s", animation: "rotateSlow 120s linear infinite" }} color="var(--gold)" />
            <AircraftSVG style={{ position: "absolute", width: "90%", color: dark ? "var(--gold)" : "var(--navy)", opacity: loaded ? 0.35 : 0, transition: "opacity 1.2s 0.8s", animation: "float 8s ease-in-out infinite" }} color={dark ? "var(--gold)" : "var(--navy)"} opacity={0.4} />
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="s0" style={{ padding: "120px 48px", background: theme.bg2, position: "relative" }}>
        <BlueprintGrid dark={dark} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number={t.aboutNum} title={t.aboutTitle} subtitle={t.aboutSub} dark={dark} />
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80 }}>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: df, fontSize: 22, lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>{t.aboutP1}</p>
              <p style={{ fontFamily: bf, fontSize: 15, lineHeight: 2, color: "var(--muted)", fontWeight: 300 }}>{t.aboutP2}</p>
              <div style={{ marginTop: 48 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>{t.eduLabel}</div>
                {t.edu.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 24, padding: "20px 0", borderBottom: `1px solid ${theme.cardBorder}` }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--gold)", letterSpacing: 2, minWidth: 50 }}>{e.year}</span>
                    <div><div style={{ fontFamily: bf, fontSize: 15, fontWeight: 500 }}>{e.school}</div><div style={{ fontFamily: bf, fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{e.diploma} {e.note && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)" }}>— {e.note}</span>}</div></div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ padding: 32, border: `1px solid ${theme.cardBorder}`, marginBottom: 24, background: theme.bg, borderRadius: 2 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24 }}>{t.langLabel}</div>
                {t.langs.map((l, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontFamily: bf, fontSize: 14, fontWeight: 500 }}>{l.lang}</span><span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>{l.level}</span></div>
                    <div style={{ height: 2, background: theme.cardBorder, borderRadius: 1 }}><div style={{ height: "100%", width: `${l.pct}%`, background: "linear-gradient(90deg, var(--gold), #C17F59)", borderRadius: 1, transition: "width 1s" }} /></div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {t.stats.map((s, i) => (
                  <div key={i} style={{ padding: 24, border: `1px solid ${theme.cardBorder}`, textAlign: "center", background: theme.bg, borderRadius: 2 }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 600, color: "var(--gold)" }}>{s.n}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)", marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="s1" style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead number={t.expNum} title={t.expTitle} subtitle={t.expSub} dark={dark} />
          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0 }}>
            <div className="exp-sidebar" style={{ borderRight: isRtl ? "none" : `1px solid ${theme.cardBorder}`, borderLeft: isRtl ? `1px solid ${theme.cardBorder}` : "none" }}>
              {t.experiences.map((exp, i) => (
                <button key={i} className={`exp-tab ${activeExp === i ? "active" : ""}`} onClick={() => setActiveExp(i)}>
                  <div style={{ fontSize: 10, color: "var(--gold)", marginBottom: 4 }}>{exp.year}</div>
                  <div style={{ fontFamily: bf, fontSize: 13, fontWeight: activeExp === i ? 500 : 400 }}>{exp.company}</div>
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
                  <h3 style={{ fontFamily: df, fontSize: isRtl ? 26 : 32, fontWeight: isRtl ? 600 : 400, marginBottom: 4 }}>{exp.company}</h3>
                  <div style={{ fontFamily: bf, fontSize: 16, color: "#C17F59", marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: 1, marginBottom: 32 }}>{exp.sub}</div>
                  <div style={{ borderTop: `1px solid ${theme.cardBorder}`, paddingTop: 24 }}>
                    {exp.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontFamily: bf, fontSize: 14, lineHeight: 1.8, color: "var(--muted)", fontWeight: 300 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile: toutes les expériences empilées */}
          <div className="exp-mobile">
            {t.experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ marginBottom: 28, padding: 24, border: `1px solid ${theme.cardBorder}`, background: theme.bg2, borderRadius: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h3 style={{ fontFamily: df, fontSize: 20, fontWeight: isRtl ? 600 : 400, marginBottom: 4 }}>{exp.company}</h3>
                      <div style={{ fontFamily: bf, fontSize: 14, color: "#C17F59" }}>{exp.role}</div>
                    </div>
                    <div style={{ textAlign: isRtl ? "left" : "right" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)", letterSpacing: 2 }}>{exp.year}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", letterSpacing: 1, marginTop: 2 }}>{exp.location}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: 1, marginBottom: 14 }}>{exp.sub}</div>
                  <div style={{ borderTop: `1px solid ${theme.cardBorder}`, paddingTop: 14 }}>
                    {exp.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", marginTop: 7, flexShrink: 0 }} />
                        <p style={{ fontFamily: bf, fontSize: 13, lineHeight: 1.7, color: "var(--muted)", fontWeight: 300 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="s2" style={{ padding: "120px 48px", background: theme.projBg, color: dark ? theme.fg : "#FAF7F2", position: "relative", overflow: "hidden" }}>
        <TurbineBlueprint size={500} style={{ position: "absolute", right: -150, top: -150, opacity: 0.08, animation: "rotateSlow 200s linear infinite" }} color={dark ? "var(--gold)" : "rgba(255,255,255,0.3)"} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeIn style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>{t.projNum}</span><div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} /></div>
            <h2 style={{ fontFamily: df, fontSize: "clamp(32px,5vw,56px)", fontWeight: isRtl ? 600 : 300, color: dark ? theme.fg : "#FAF7F2" }}>{t.projTitle}</h2>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>{t.projSub}</p>
          </FadeIn>
          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {visibleProjects.map((p, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div onMouseEnter={() => setHoveredProj(i)} onMouseLeave={() => setHoveredProj(null)} style={{ padding: 32, border: "1px solid rgba(255,255,255,0.06)", background: hoveredProj === i ? "rgba(255,255,255,0.04)" : "transparent", transition: "all 0.5s", cursor: "default", borderRadius: 2, transform: hoveredProj === i ? "translateY(-4px)" : "none", position: "relative", overflow: "hidden", height: "100%" }}>
                  {hoveredProj === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />}
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", marginBottom: 16 }}>{p.cat}</div>
                  <h3 style={{ fontFamily: df, fontSize: 20, fontWeight: isRtl ? 600 : 400, marginBottom: 12, color: hoveredProj === i ? "var(--gold)" : (dark ? theme.fg : "#FAF7F2"), transition: "color 0.4s" }}>{p.name}</h3>
                  <p style={{ fontFamily: bf, fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>{p.tech}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          {t.projects.length > 6 && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => setShowAllProj(!showAllProj)} style={{ padding: "14px 36px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: dark ? theme.fg : "#FAF7F2", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s", borderRadius: 1 }}>{showAllProj ? `− ${t.showLess}` : `+ ${t.showAll}`}</button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="s3" style={{ padding: "120px 48px", background: theme.bg2, position: "relative" }}>
        <BlueprintGrid dark={dark} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number={t.skillsNum} title={t.skillsTitle} subtitle={t.skillsSub} dark={dark} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {t.skillCats.map((group, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 16, height: 1, background: "var(--gold)" }} />{group.cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {group.items.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 64, padding: 32, border: `1px solid ${theme.cardBorder}`, background: theme.bg, borderRadius: 2 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>{t.courseworkLabel}</div>
              <p style={{ fontFamily: bf, fontSize: 14, lineHeight: 1.9, color: "var(--muted)", fontWeight: 300 }}>{t.coursework}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ EXTRAS ═══ */}
      <section style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead number={t.extraNum} title={t.extraTitle} subtitle={t.extraSub} dark={dark} />
          {t.extras.map((e, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ padding: 32, border: `1px solid ${theme.cardBorder}`, background: theme.bg2, borderRadius: 2, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ fontFamily: df, fontSize: 20, fontWeight: isRtl ? 600 : 400 }}>{e.title}</h3>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 2 }}>{e.year}</span>
                </div>
                <p style={{ fontFamily: bf, fontSize: 14, lineHeight: 1.8, color: "var(--muted)", fontWeight: 300 }}>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="s4" style={{ padding: "120px 48px", background: theme.bg2, position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionHead number={t.contactNum} title={<span>{t.contactTitle}<br /><span style={{ fontStyle: isRtl ? "normal" : "italic", color: "var(--gold)" }}>{t.contactTitle2}</span></span>} dark={dark} />
          <p style={{ fontFamily: bf, fontSize: 16, lineHeight: 2, color: "var(--muted)", fontWeight: 300, maxWidth: 500, margin: "0 auto 48px" }}>{t.contactDesc}</p>
          <div className="contact-row" style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: t.contactLabels.email, value: "tadrosjustine21@gmail.com", href: "mailto:tadrosjustine21@gmail.com" },
              { label: t.contactLabels.linkedin, value: "justinetadros", href: "https://www.linkedin.com/in/justinetadros/" },
              { label: t.contactLabels.github, value: "JustineTdrs", href: "https://github.com/JustineTdrs" },
              { label: t.contactLabels.phone, value: "+33 7 68 98 59 03", href: "tel:+33768985903" },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ padding: "28px 32px", border: `1px solid ${theme.cardBorder}`, textDecoration: "none", minWidth: 200, transition: "all 0.4s", background: theme.bg, textAlign: "center", borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${dark ? "rgba(0,0,0,0.3)" : "rgba(13,27,42,0.06)"}` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 10 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--fg)", fontWeight: 400 }}>{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "40px 48px", borderTop: `1px solid ${theme.cardBorder}`, background: theme.bg2 }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>© 2025 JUSTINE TADROS</span>
          <span style={{ fontFamily: df, fontSize: 13, color: "var(--muted)", fontStyle: isRtl ? "normal" : "italic" }}>{t.footer} ✈</span>
        </div>
      </footer>

      {/* ═══ CHATBOT ═══ */}
      <Chatbot t={t} dark={dark} />
    </div>
  );
}
