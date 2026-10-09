import { useState, useEffect, useRef } from "react";

/* ═══════ TRANSLATIONS ═══════ */
const T = {
  fr: {
    dir: "ltr",
    nav: ["À propos", "Parcours", "Projets", "Compétences", "Contact"],
    heroSub: "Alternante Innovation & IA · EDF",
    heroTitle: ["L'art de la", "donnée", "rencontre", "l'innovation"],
    heroDesc: "Étudiante en Master IA et Data, en alternance au sein du département innovation stratégique d'EDF, je conçois des solutions digitales et des agents IA à l'intersection de la donnée, de l'énergie et de l'industrie.",
    btnDiscover: "Découvrir", btnContact: "Contact",
    aboutNum: "01", aboutTitle: "À propos", aboutSub: "Profil · Formation · Langues",
    aboutP1: "De Paris au Caire, en passant par Québec, un parcours international forgé par la curiosité technique et la passion de l'industrie.",
    aboutP2: "Titulaire d'un Bachelor Responsable Projet Web et Mobile de l'ETNA, d'une formation en Design d'Interaction à l'Université Laval, je prépare actuellement un Master 2 Expert IA à l'École 89, en alternance chez EDF.",
    eduLabel: "Formation",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master IA & Big Data (M2 Expert IA)", note: "en cours" },
      { year: "2022", school: "Université Laval, Québec", diploma: "Formation Master Design d'Interaction" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor Responsable Projet Web et Mobile" },
    ],
    langLabel: "Langues",
    langs: [
      { lang: "Français", level: "Maternelle", pct: 100 },
      { lang: "Arabe (Dialecte Égyptien)", level: "Maternelle", pct: 100 },
      { lang: "Anglais", level: "Courant", pct: 90 },
    ],
    stats: [{ n: "5+", l: "Années" }, { n: "14", l: "Projets" }, { n: "3", l: "Langues" }, { n: "8", l: "Équipiers" }],
    expNum: "02", expTitle: "Parcours", expSub: "Expérience professionnelle",
    experiences: [
      { year: "Présent", company: "EDF", role: "Alternante Innovation Stratégique", sub: "Direction DIPP · IA & Data", location: "La Défense, France", bullets: ["Conception d'un agent IA prospectif pour nourrir la réflexion stratégique de la direction.", "Animation de la veille innovation et préparation d'une newsletter dédiée, avec des pistes d'automatisation.", "Évaluation de solutions de start-ups, notamment sur les volets SI et sécurité.", "Mise en route d'un outil local d'anonymisation de documents."] },
      { year: "2025–2026", company: "Safran Aircraft Engines", role: "Analyste Support Planification", sub: "Supply Chain & Data", location: "Paris, France", bullets: ["Suivi de l'avancement des projets de transformation digitale et data au sein des départements supply chain et production.", "Test et validation des solutions data développées par l'équipe DATA interne.", "Réalisation des tests de recette (UAT) et assistance au déploiement de nouveaux outils et tableaux de bord.", "Formation des utilisateurs finaux sur les solutions digitales déployées et support fonctionnel continu.", "Rédaction de documentation technique détaillée et de guides utilisateurs en anglais.", "Support supplémentaire lors des pics de charge, collaboration interéquipes et continuité des projets."] },
      { year: "2024–2025", company: "Shepherd of Egypt", role: "Développeuse Web", sub: "Infrastructure & WordPress", location: "Le Caire, Égypte", bullets: ["Diagnostic et résolution de problèmes critiques WordPress (conflits plugins, e-mails, BDD).", "Configuration serveur, services SMTP et enregistrements DNS (SPF, DKIM, DMARC).", "Dépannage expert : configurations PHP, mise en place SSL et erreurs backend."] },
      { year: "2021–2022", company: "Tradespotting", role: "Développeuse Front End", sub: "Architecture & APIs", location: "Paris, France", bullets: ["Collaboration avec le directeur IT pour améliorer sites web et applications mobiles.", "Conception de l'architecture des données : sources, chargement, sécurité, visualisation.", "Création d'APIs avec spécifications et endpoints définis."] },
      { year: "2020–2021", company: "ETNA", role: "Développeuse Full Stack", sub: "Plateformes universitaires", location: "Paris, France", bullets: ["Identification et correction de problèmes de plateforme avec Docker et PHP.", "Résolution de problèmes techniques au sein des plateformes universitaires."] },
      { year: "2019–2020", company: "SHIFT89", role: "Développeuse Web & Lead", sub: "Management d'équipe", location: "Paris, France", bullets: ["Évaluation et amélioration de sites web et apps mobiles, animation de réunions quotidiennes.", "Supervision du recrutement et du mentorat des stagiaires.", "Présentation de solutions aux clients et orchestration des améliorations."] },
    ],
    projNum: "03", projTitle: "Projets", projSub: "Réalisations techniques",
    projects: [
      { name: "Agent IA prospectif", cat: "IA · INNOVATION", desc: "Agent IA d'aide à la réflexion prospective, développé en alternance chez EDF.", tech: "IA · Innovation" },
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
      { cat: "Langages", items: ["HTML/CSS/JS", "Python", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "Technologies Web", items: ["Angular", "Symfony", "Spring Boot", "PHP Framework"] },
      { cat: "Outils", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "Services Cloud", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "Outils Data", items: ["Power BI", "SQL", "Oracle", "MongoDB", "SAP", "Excel (TCD, RECHERCHEV, Dashboards)"] },
    ],
    courseworkLabel: "Cours Pertinents",
    coursework: "Développement Frontend, Développement Backend, Management de l'Innovation et Entrepreneuriat, Ingénierie d'Infrastructure Cloud, Réalité Virtuelle, Réalité Augmentée et Ingénierie de Jeux Vidéo, Ingénierie de Développement d'Applications Mobiles.",
    extraNum: "05", extraTitle: "Activités", extraSub: "Extrascolaire & récompenses",
    extras: [
      { title: "Cheffe de Projet, TicketChainer", year: "2019", desc: "Direction d'une équipe de 8 personnes, supervision de l'intégration FrontEnd, gestion APIs et adaptation templates. Conseils sur toutes les phases du projet." },
      { title: "Top 5 Camp Microsoft", year: "2020", desc: "Participation au Camp Microsoft : Service Cognitif, acquisition de connaissances sur l'API Faces de la suite Cognitive Services." },
    ],
    contactNum: "06", contactTitle: "Collaborons", contactTitle2: "ensemble",
    contactDesc: "Que ce soit pour du développement, de la transformation digitale ou de l'innovation, je suis à l'écoute.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Téléphone" },
    footer: "Conçu et codé par Justine",
    chatTitle: "Assistant de Justine", chatGreeting: "Bonjour ! Je suis l'assistant de Justine. Que souhaitez-vous savoir ?",
    chatOptions: ["Parcours professionnel", "Compétences techniques", "Projets réalisés", "Me contacter"],
    chatReplies: [
      "Justine a 5+ ans d'expérience. Elle est actuellement alternante innovation stratégique (IA & Data) chez **EDF**. Avant cela : Safran Aircraft Engines (Support Planification), Shepherd of Egypt (Web Dev), Tradespotting (Front End), ETNA (Full Stack) et SHIFT89 (Web Dev & Lead).",
      "**Langages** : HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**Frameworks** : React, Laravel, Symfony, Angular, Node.js\n**Data & Cloud** : Python, SQL, Oracle, Power BI, SAP, Azure SQL, Docker\n**Design** : Figma, Adobe XD, Photoshop, Illustrator",
      "13+ projets incluant : E-Commerce Laravel, TicketChainer (hackathon, chef de projet), App Météo iOS, Clone Twitter, Serveur Debian, Jeu RPG Java, Azure Cognitive Services (Top 5 Microsoft Camp).",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "Choisissez une option ci-dessus...",
    darkMode: "Mode sombre", lightMode: "Mode clair",
  },
  en: {
    dir: "ltr",
    nav: ["About", "Experience", "Projects", "Skills", "Contact"],
    heroSub: "Strategic Innovation Work-Study · EDF",
    heroTitle: ["Where", "data", "meets", "innovation"],
    heroDesc: "AI & Data Master's student and work-study at EDF's strategic innovation department, I design digital solutions and AI agents at the intersection of data, energy and industry.",
    btnDiscover: "Discover", btnContact: "Contact",
    aboutNum: "01", aboutTitle: "About", aboutSub: "Profile · Education · Languages",
    aboutP1: "From Paris to Cairo, through Quebec, an international journey shaped by technical curiosity and a passion for industry.",
    aboutP2: "Holding a Bachelor's in Web and Mobile Project Management from ETNA and training in Interaction Design from Université Laval, I am currently pursuing a Master's 2 (Expert in AI) at École 89 as a work-study student at EDF.",
    eduLabel: "Education",
    edu: [
      { year: "2025", school: "École 89", diploma: "Master's AI & Big Data (M2 Expert AI)", note: "in progress" },
      { year: "2022", school: "Université Laval, Quebec", diploma: "Master's Interaction Design Training" },
      { year: "2021", school: "ETNA, Paris", diploma: "Bachelor's Web & Mobile Project Management" },
    ],
    langLabel: "Languages",
    langs: [
      { lang: "French", level: "Native", pct: 100 },
      { lang: "Arabic (Egyptian)", level: "Native", pct: 100 },
      { lang: "English", level: "Fluent", pct: 90 },
    ],
    stats: [{ n: "5+", l: "Years" }, { n: "14", l: "Projects" }, { n: "3", l: "Languages" }, { n: "8", l: "Teammates" }],
    expNum: "02", expTitle: "Experience", expSub: "Professional experience",
    experiences: [
      { year: "Present", company: "EDF", role: "Strategic Innovation Work-Study", sub: "DIPP Directorate · AI & Data", location: "La Défense, France", bullets: ["Designing a forward-looking AI agent to support the directorate's strategic thinking.", "Running innovation watch and preparing a dedicated newsletter, with automation in mind.", "Assessing start-up solutions, particularly on IT and security aspects.", "Setting up a local document anonymization tool."] },
      { year: "2025–2026", company: "Safran Aircraft Engines", role: "Planning Support Analyst", sub: "Supply Chain & Data", location: "Paris, France", bullets: ["Monitoring digital transformation and data projects across supply chain and production.", "Testing and validating data solutions by the internal DATA team.", "Performing UAT and assisting deployment of new tools and dashboards.", "Training end-users on digital solutions and providing ongoing support.", "Drafting detailed technical documentation and user guides in English.", "Additional support during workload peaks, ensuring cross-team collaboration."] },
      { year: "2024–2025", company: "Shepherd of Egypt", role: "Web Developer", sub: "Infrastructure & WordPress", location: "Cairo, Egypt", bullets: ["Diagnosed and resolved critical WordPress issues (plugins, emails, DB).", "Configured server settings, SMTP, and DNS records (SPF, DKIM, DMARC).", "Expert troubleshooting: PHP configs, SSL setup, and backend errors."] },
      { year: "2021–2022", company: "Tradespotting", role: "Front End Developer", sub: "Architecture & APIs", location: "Paris, France", bullets: ["Partnered with IT director to enhance websites and mobile apps.", "Designed data architecture: sources, load strategy, security, visualization.", "Created APIs with defined specifications and endpoints."] },
      { year: "2020–2021", company: "ETNA", role: "Full Stack Developer", sub: "University platforms", location: "Paris, France", bullets: ["Identified and fixed platform issues using Docker and PHP.", "Resolved technical issues within university platforms."] },
      { year: "2019–2020", company: "SHIFT89", role: "Web Developer & Lead", sub: "Team management", location: "Paris, France", bullets: ["Evaluated and enhanced websites and mobile apps, ran daily standups.", "Supervised recruitment and mentorship of interns.", "Presented solutions to clients and orchestrated project enhancements."] },
    ],
    projNum: "03", projTitle: "Projects", projSub: "Technical achievements",
    projects: [
      { name: "Forward-looking AI agent", cat: "AI · INNOVATION", desc: "AI agent supporting strategic foresight, built during my work-study at EDF.", tech: "AI · Innovation" },
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
      { cat: "Languages", items: ["HTML/CSS/JS", "Python", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "Web Technologies", items: ["Angular", "Symfony", "Spring Boot", "PHP Framework"] },
      { cat: "Tools", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "Cloud Services", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "Data Tools", items: ["Power BI", "SQL", "Oracle", "MongoDB", "SAP", "Excel (Pivot Tables, VLOOKUP, Dashboards)"] },
    ],
    courseworkLabel: "Relevant Coursework",
    coursework: "Frontend Development, Backend Development, Innovation Management, Cloud Infrastructure Engineering, VR/AR & Video Game Engineering, Mobile Application Development Engineering.",
    extraNum: "05", extraTitle: "Activities", extraSub: "Extracurricular & awards",
    extras: [
      { title: "Project Leader, TicketChainer", year: "2019", desc: "Led a team of 8, overseeing FrontEnd integration, API management, and template adaptation across all project phases." },
      { title: "Top 5 Microsoft Camp", year: "2020", desc: "Participated in Microsoft Camp: Cognitive Service, gaining insights into the Face API from Microsoft's Cognitive Services suite." },
    ],
    contactNum: "06", contactTitle: "Let's work", contactTitle2: "together",
    contactDesc: "Whether it's development, digital transformation, or innovation, I'm all ears.",
    contactLabels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Phone" },
    footer: "Designed and coded by Justine",
    chatTitle: "Justine's assistant", chatGreeting: "Hi! I'm Justine's assistant. What would you like to know?",
    chatOptions: ["Career path", "Technical skills", "Projects", "Contact info"],
    chatReplies: [
      "Justine has 5+ years of experience. Currently a work-study in strategic innovation (AI & Data) at **EDF**. Previously: Safran Aircraft Engines (Planning Support), Shepherd of Egypt (Web Dev), Tradespotting (Front End), ETNA (Full Stack), SHIFT89 (Web Dev & Lead).",
      "**Languages**: HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**Frameworks**: React, Laravel, Symfony, Angular, Node.js\n**Data & Cloud**: Python, SQL, Oracle, Power BI, SAP, Azure SQL, Docker\n**Design**: Figma, Adobe XD, Photoshop, Illustrator",
      "13+ projects including: E-Commerce Laravel, TicketChainer (hackathon lead), iOS Weather App, Twitter Clone, Debian Server, RPG Game, Azure Cognitive Services (Top 5 Microsoft Camp).",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "Pick an option above...",
    darkMode: "Dark mode", lightMode: "Light mode",
  },
  ar: {
    dir: "rtl",
    nav: ["نبذة عني", "المسيرة", "المشاريع", "المهارات", "اتصل بي"],
    heroSub: "ابتكار استراتيجي وذكاء اصطناعي · EDF",
    heroTitle: ["حيث تلتقي", "البيانات", "بعالم", "الابتكار"],
    heroDesc: "طالبة ماجستير في الذكاء الاصطناعي والبيانات ومتدربة في قسم الابتكار الاستراتيجي في EDF، أصمم حلولاً رقمية ووكلاء ذكاء اصطناعي عند تقاطع البيانات والطاقة والصناعة.",
    btnDiscover: "اكتشف", btnContact: "اتصل بي",
    aboutNum: "٠١", aboutTitle: "نبذة عني", aboutSub: "الملف الشخصي · التعليم · اللغات",
    aboutP1: "من باريس إلى القاهرة، مروراً بكيبيك, مسيرة دولية صقلتها الفضول التقني والشغف بالصناعة.",
    aboutP2: "حاصلة على بكالوريوس في إدارة مشاريع الويب والموبايل من ETNA وتدريب في تصميم التفاعل من جامعة لافال، أحضّر حالياً الماجستير 2 (خبير في الذكاء الاصطناعي) في مدرسة 89 بنظام التناوب في EDF.",
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
    stats: [{ n: "٥+", l: "سنوات" }, { n: "١٤", l: "مشاريع" }, { n: "٣", l: "لغات" }, { n: "٨", l: "زملاء" }],
    expNum: "٠٢", expTitle: "المسيرة", expSub: "الخبرة المهنية",
    experiences: [
      { year: "حالياً", company: "EDF", role: "متدربة ابتكار استراتيجي", sub: "إدارة DIPP · ذكاء اصطناعي وبيانات", location: "لا ديفانس، فرنسا", bullets: ["تصميم وكيل ذكاء اصطناعي استشرافي لدعم التفكير الاستراتيجي للإدارة.", "متابعة رصد الابتكار وإعداد نشرة إخبارية مخصصة مع أفكار للأتمتة.", "تقييم حلول الشركات الناشئة، خاصة في جوانب نظم المعلومات والأمان.", "إطلاق أداة محلية لإخفاء هوية المستندات."] },
      { year: "٢٠٢٥–٢٠٢٦", company: "سافران لمحركات الطائرات", role: "محللة دعم التخطيط", sub: "سلسلة التوريد والبيانات", location: "باريس، فرنسا", bullets: ["متابعة تقدم مشاريع التحول الرقمي والبيانات في أقسام سلسلة التوريد والإنتاج.", "اختبار والتحقق من حلول البيانات المطورة من فريق DATA الداخلي.", "إجراء اختبارات القبول (UAT) والمساعدة في نشر الأدوات ولوحات المعلومات.", "تدريب المستخدمين النهائيين وتقديم الدعم الوظيفي المستمر.", "صياغة وثائق تقنية مفصلة وأدلة مستخدم باللغة الإنجليزية.", "تقديم دعم إضافي خلال أوقات الذروة والتعاون بين الفرق."] },
      { year: "٢٠٢٤–٢٠٢٥", company: "شيبرد أوف إيجبت", role: "مطورة ويب", sub: "البنية التحتية ووردبريس", location: "القاهرة، مصر", bullets: ["تشخيص وحل مشاكل ووردبريس الحرجة.", "تكوين الخادم وخدمات SMTP وسجلات DNS.", "استكشاف الأخطاء وإصلاحها: PHP, SSL, أخطاء backend."] },
      { year: "٢٠٢١–٢٠٢٢", company: "تريدسبوتينغ", role: "مطورة Front End", sub: "الهندسة والواجهات البرمجية", location: "باريس، فرنسا", bullets: ["التعاون مع مدير IT لتحسين المواقع والتطبيقات.", "تصميم هندسة البيانات: المصادر، التحميل، الأمان، التصور.", "إنشاء واجهات برمجة التطبيقات بمواصفات محددة."] },
      { year: "٢٠٢٠–٢٠٢١", company: "ETNA", role: "مطورة Full Stack", sub: "المنصات الجامعية", location: "باريس، فرنسا", bullets: ["تحديد وإصلاح مشاكل المنصة باستخدام Docker و PHP.", "حل المشاكل التقنية لضمان أداء سلس."] },
      { year: "٢٠١٩–٢٠٢٠", company: "SHIFT89", role: "مطورة ويب وقائدة فريق", sub: "إدارة الفريق", location: "باريس، فرنسا", bullets: ["تقييم وتحسين المواقع والتطبيقات، إدارة اجتماعات يومية.", "الإشراف على توظيف وتوجيه المتدربين.", "تقديم الحلول للعملاء وتنسيق التحسينات."] },
    ],
    projNum: "٠٣", projTitle: "المشاريع", projSub: "إنجازات تقنية",
    projects: [
      { name: "وكيل ذكاء اصطناعي استشرافي", cat: "ذكاء اصطناعي", desc: "وكيل ذكاء اصطناعي لدعم الاستشراف، طُوّر خلال التناوب في EDF.", tech: "AI · Innovation" },
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
      { cat: "لغات البرمجة", items: ["HTML/CSS/JS", "Python", "Node.js", "TypeScript", "Swift", "React Native", "Bootstrap", "Tailwind"] },
      { cat: "تقنيات الويب", items: ["Angular", "Symfony", "Spring Boot", "PHP Framework"] },
      { cat: "الأدوات", items: ["Git", "GitHub/GitLab", "Xcode", "VS Code", "Postman", "Adobe XD", "Figma", "Photoshop", "Illustrator", "Microsoft Office", "Docker", "Android Studio", "Bash", "Shell"] },
      { cat: "خدمات سحابية", items: ["Microsoft Azure SQL"] },
      { cat: "DevOps", items: ["Docker", "Git", "GitHub/GitLab", "VS Code", "Bash", "Shell"] },
      { cat: "أدوات البيانات", items: ["Power BI", "SQL", "Oracle", "MongoDB", "SAP", "Excel (جداول محورية, VLOOKUP, لوحات)"] },
    ],
    courseworkLabel: "المقررات الدراسية",
    coursework: "تطوير الواجهة الأمامية، تطوير الواجهة الخلفية، إدارة الابتكار، هندسة البنية التحتية السحابية، الواقع الافتراضي والمعزز وألعاب الفيديو، هندسة تطوير تطبيقات الموبايل.",
    extraNum: "٠٥", extraTitle: "الأنشطة", extraSub: "أنشطة لامنهجية وجوائز",
    extras: [
      { title: "قائدة مشروع, TicketChainer", year: "٢٠١٩", desc: "قيادة فريق من 8 أفراد، إدارة دمج الواجهة الأمامية والواجهات البرمجية عبر جميع مراحل المشروع." },
      { title: "أفضل 5 معسكر مايكروسوفت", year: "٢٠٢٠", desc: "المشاركة في معسكر مايكروسوفت: الخدمة المعرفية وواجهة التعرف على الوجوه." },
    ],
    contactNum: "٠٦", contactTitle: "لنعمل", contactTitle2: "معاً",
    contactDesc: "سواء كان تطويراً أو تحولاً رقمياً أو تعاوناً في الابتكار, أنا مستعدة.",
    contactLabels: { email: "البريد", linkedin: "لينكد إن", github: "غيت هاب", phone: "الهاتف" },
    footer: "صُمم وبُرمج بواسطة جوستين",
    chatTitle: "مساعدة جوستين", chatGreeting: "مرحباً! أنا مساعدة جوستين. ماذا تريد أن تعرف؟",
    chatOptions: ["المسيرة المهنية", "المهارات التقنية", "المشاريع", "معلومات الاتصال"],
    chatReplies: [
      "جوستين لديها ٥+ سنوات خبرة. تعمل حالياً في **EDF** كمتدربة في الابتكار الاستراتيجي (ذكاء اصطناعي وبيانات). سابقاً: سافران, Shepherd of Egypt, Tradespotting, ETNA, SHIFT89.",
      "**لغات**: HTML/CSS/JS, TypeScript, PHP, Swift, Java, C\n**أطر عمل**: React, Laravel, Symfony, Angular, Node.js\n**بيانات وسحابة**: Python, SQL, Oracle, Power BI, SAP, Azure SQL, Docker",
      "١٣+ مشروع تشمل: متجر Laravel، TicketChainer (قائدة مشروع)، تطبيق طقس iOS، نسخة تويتر، خادم Debian، لعبة RPG، Azure Cognitive.",
      "📧 tadrosjustine21@gmail.com\n🔗 linkedin.com/in/justinetadros\n💻 github.com/JustineTdrs\n📞 +33 7 68 98 59 03",
    ],
    chatPlaceholder: "اختر خياراً أعلاه...",
    darkMode: "الوضع الداكن", lightMode: "الوضع الفاتح",
  },
};


/* ═══════ HELPERS ═══════ */
const KEEP = new Set(["IA", "AI"]);
const sentence = (s) => {
  if (s !== s.toUpperCase() || s === s.toLowerCase()) return s;
  return s.split(" ").map((w, i) => (KEEP.has(w) ? w : i === 0 ? w[0] + w.slice(1).toLowerCase() : w.toLowerCase())).join(" ");
};

// Courbe lisse (Catmull-Rom → Bézier) passant par tous les points
const smoothPath = (pts) => {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
};

/* ═══════ CAREER CURVE (hero) ═══════ */
const W = 1000, H = 280;
const LEVELS = [0.8, 0.64, 0.72, 0.46, 0.54, 0.16];

const CareerCurve = ({ experiences, isRtl, on }) => {
  const items = [...experiences].reverse(); // du plus ancien au plus récent
  const n = items.length;
  const [active, setActive] = useState(n - 1);
  useEffect(() => { setActive(n - 1); }, [n, isRtl]);

  const pts = items.map((e, i) => {
    const f = 0.07 + 0.86 * (i / (n - 1));
    const fx = isRtl ? 1 - f : f;
    const lvl = LEVELS[i] ?? 0.5;
    return { e, fx, lvl, x: fx * W, y: lvl * H, delay: 0.3 + 2 * (i / (n - 1)) };
  });
  const line = smoothPath(pts);
  const area = `${line} L ${pts[n - 1].x} ${H} L ${pts[0].x} ${H} Z`;
  const a = pts[active] || pts[n - 1];

  const onMove = (ev) => {
    const r = ev.currentTarget.getBoundingClientRect();
    const f = (ev.clientX - r.left) / r.width;
    let best = 0, d = 9;
    pts.forEach((p, i) => { const dd = Math.abs(p.fx - f); if (dd < d) { d = dd; best = i; } });
    setActive(best);
  };

  return (
    <div className="curve">
      <div className="curve-plot" onPointerMove={onMove} onPointerDown={onMove}>
        <svg viewBox={`0 0 ${W} ${H}`} focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: "var(--signal)", stopOpacity: 0.28 }} />
              <stop offset="1" style={{ stopColor: "var(--signal)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={g * H} y2={g * H} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />)}
          <line x1="0" x2={W} y1={H} y2={H} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d={area} fill="url(#curveFill)" className={`curve-area ${on ? "on" : ""}`} />
          <path d={line} pathLength="1" fill="none" stroke="var(--signal)" strokeWidth="3" strokeLinecap="round" className={`curve-line ${on ? "on" : ""}`} />
          <line x1={a.x} x2={a.x} y1={a.y} y2={H} stroke="var(--signal)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 5" className={`cursor-line ${on ? "on" : ""}`} />
        </svg>
        {pts.map((p, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${p.e.company}, ${p.e.year}`}
            className={`dot ${i === n - 1 ? "dot-now" : ""} ${on ? "on" : ""} ${i === active ? "act" : ""}`}
            style={{ left: `${p.fx * 100}%`, top: `${p.lvl * 100}%`, transitionDelay: `${p.delay}s` }}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <div className={`readout ${on ? "on" : ""}`} aria-live="polite">
        <div className="ro-year">{a.e.year}</div>
        <div className="ro-co">{a.e.company}</div>
        <div className="ro-role">{a.e.role}</div>
        <div className="ro-role">{a.e.sub}</div>
      </div>
      <div className="curve-labels" aria-hidden="true">
        {pts.map((p, i) => (
          <div key={i} className={`curve-label ${on ? "on" : ""} ${i === active ? "act" : ""}`} style={{ left: `${p.fx * 100}%`, transitionDelay: `${p.delay}s` }}>
            <div className="cl-year">{p.e.year}</div>
            <div className="cl-name">{p.e.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════ CHATBOT ═══════ */
const Chatbot = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [answered, setAnswered] = useState(new Set());
  const chatEnd = useRef(null);

  useEffect(() => { setMsgs([]); setAnswered(new Set()); }, [t]);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const handleOption = (i) => {
    if (answered.has(i)) return;
    setAnswered((prev) => new Set([...prev, i]));
    setMsgs((prev) => [...prev, { type: "user", text: t.chatOptions[i] }, { type: "bot", text: t.chatReplies[i] }]);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.chatTitle}>
        {open ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M4 5h16v11H9l-5 4z" /></svg>
        )}
      </button>
      {open && (
        <div className="chat-panel" role="dialog" aria-label={t.chatTitle}>
          <div className="chat-head">{t.chatTitle}</div>
          <div className="chat-body">
            <div className="bubble bot">{t.chatGreeting}</div>
            <div className="chat-opts">
              {t.chatOptions.map((opt, i) => (
                <button key={i} className="chat-opt" disabled={answered.has(i)} onClick={() => handleOption(i)}>{opt}</button>
              ))}
            </div>
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.type}`}>
                {m.text.split("**").map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
        </div>
      )}
    </>
  );
};

/* ═══════ STYLES ═══════ */
const LIGHT = { bg: "#EEF2F4", bg2: "#E3EAEE", ink: "#0F1E2B", muted: "#4F6173", line: "rgba(15,30,43,0.16)", accent: "#17509E", onAccent: "#FFFFFF", signal: "#E8920B", dark: "#0F1E2B", darkFg: "#E9F0F4", darkMuted: "#93A7B7" };
const DARK = { bg: "#0A141D", bg2: "#101D2A", ink: "#E7EEF3", muted: "#9BAEBD", line: "rgba(231,238,243,0.16)", accent: "#7FB2F0", onAccent: "#07121C", signal: "#F4B63F", dark: "#060C12", darkFg: "#E7EEF3", darkMuted: "#8FA3B3" };

const css = (c, isRtl) => `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
:root{--bg:${c.bg};--bg2:${c.bg2};--ink:${c.ink};--muted:${c.muted};--line:${c.line};--accent:${c.accent};--on-accent:${c.onAccent};--signal:${c.signal};--dark:${c.dark};--dark-fg:${c.darkFg};--dark-muted:${c.darkMuted};
--head:${isRtl ? "'Noto Sans Arabic'" : "'Bricolage Grotesque'"},system-ui,sans-serif;--body:${isRtl ? "'Noto Sans Arabic'" : "'Newsreader'"},${isRtl ? "system-ui,sans-serif" : "Georgia,serif"};}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:${isRtl ? 16 : 18}px;line-height:${isRtl ? 1.9 : 1.65};-webkit-font-smoothing:antialiased}
::selection{background:var(--signal);color:#0F1E2B}
a{color:inherit}
ul{list-style:none}
a:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.sec-dark a:focus-visible,.sec-dark button:focus-visible{outline-color:var(--signal)}

.wrap{max-width:1160px;margin:0 auto;padding:0 40px}
.sec{padding:112px 0}
.sec-alt{background:var(--bg2)}
.sec-dark{background:var(--dark);color:var(--dark-fg)}
.h2{font-family:var(--head);font-size:clamp(30px,4.4vw,52px);font-weight:${isRtl ? 700 : 600};letter-spacing:${isRtl ? 0 : "-0.025em"};line-height:1.1}
.sub{color:var(--muted);margin-top:10px;font-size:17px}
.sec-dark .sub{color:var(--dark-muted)}
.sec-head{margin-bottom:56px}
.label{font-family:var(--head);font-size:16px;font-weight:600;margin-bottom:14px}

/* nav */
.nav{position:fixed;inset:0 0 auto 0;z-index:100;height:68px;transition:background .3s,border-color .3s;border-bottom:1px solid transparent}
.nav.scrolled{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(14px);border-bottom-color:var(--line)}
.nav-in{height:100%;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand{white-space:nowrap;font-family:var(--head);font-weight:700;font-size:17px;text-decoration:none;letter-spacing:${isRtl ? 0 : "-0.01em"}}
.nav-right{display:flex;align-items:center;gap:28px}
.nav-links{display:flex;gap:26px}
.nav:not(.scrolled){color:var(--dark-fg)}
.nav:not(.scrolled) .nav-links a,.nav:not(.scrolled) .lang button,.nav:not(.scrolled) .icon-btn{color:var(--dark-muted)}
.nav:not(.scrolled) .nav-links a:hover,.nav:not(.scrolled) .lang button[aria-pressed="true"],.nav:not(.scrolled) .icon-btn:hover,.nav:not(.scrolled) .burger{color:var(--dark-fg)}
.nav:not(.scrolled) .lang button[aria-pressed="true"]{border-color:rgba(255,255,255,0.3)}
.nav-links a{font-family:var(--head);font-size:15px;text-decoration:none;color:var(--muted);transition:color .2s}
.nav-links a:hover{color:var(--ink)}
.lang{display:flex;gap:2px}
.lang button,.icon-btn{font-family:var(--head);font-size:13px;font-weight:500;background:none;border:1px solid transparent;color:var(--muted);padding:5px 9px;border-radius:4px;cursor:pointer}
.lang button:hover,.icon-btn:hover{color:var(--ink)}
.lang button[aria-pressed="true"]{color:var(--ink);border-color:var(--line)}
.icon-btn{display:flex;align-items:center;padding:6px}
.burger{display:none;background:none;border:none;color:var(--ink);cursor:pointer;padding:6px}
.menu{position:fixed;inset:0;z-index:90;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
.menu a{font-family:var(--head);font-size:28px;font-weight:600;text-decoration:none}

/* hero */
.hero{padding:112px 0 64px;background-color:var(--dark);color:var(--dark-fg);background-image:radial-gradient(rgba(255,255,255,0.09) 1px,transparent 1px);background-size:28px 28px}
.hero h1{font-family:var(--head);font-weight:${isRtl ? 700 : 600};font-size:clamp(40px,6vw,88px);line-height:${isRtl ? 1.25 : 1.02};letter-spacing:${isRtl ? 0 : "-0.035em"};max-width:11em}
.hero-row{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end;margin-top:36px}
.hero-sub{font-family:var(--head);font-weight:600;font-size:19px}
.hero-desc{color:var(--dark-muted);max-width:52ch;margin-top:8px;font-size:${isRtl ? 17 : 20}px}
.hero-cta{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.btn{font-family:var(--head);font-weight:600;font-size:15px;text-decoration:none;background:var(--signal);color:#0F1E2B;padding:14px 26px;border-radius:4px;transition:background .2s,color .2s}
.btn:hover{background:var(--dark-fg);color:var(--dark)}
.link{font-family:var(--head);font-weight:600;font-size:15px;text-decoration:underline;text-decoration-color:var(--signal);text-decoration-thickness:2px;text-underline-offset:6px}

/* curve */
.curve{margin-top:56px;position:relative}
.curve-plot{position:relative;aspect-ratio:${W}/${H};touch-action:pan-y;cursor:crosshair}
.curve-plot svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.curve-line{filter:drop-shadow(0 0 7px var(--signal));stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.3s cubic-bezier(.65,0,.35,1) .1s}
.curve-line.on{stroke-dashoffset:0}
.curve-area{opacity:0;transition:opacity 1.2s ease 1.6s}
.curve-area.on{opacity:1}
.dot{position:absolute;width:13px;height:13px;margin:-6.5px 0 0 -6.5px;border-radius:50%;background:var(--dark);border:2px solid var(--signal);padding:0;cursor:pointer;opacity:0;transform:scale(.4);transition:opacity .4s,transform .25s}
.dot.on{opacity:1;transform:none}
.dot.on.act{transform:scale(1.5)}
.cursor-line{transition:opacity .3s;opacity:0}.cursor-line.on{opacity:1}
.readout{position:absolute;inset-inline-start:0;top:0;z-index:2;max-width:300px;padding:14px 18px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);backdrop-filter:blur(6px);border-radius:6px;opacity:0;transition:opacity .6s ease 1.2s;pointer-events:none}
.readout.on{opacity:1}
.ro-year{font-size:14px;color:var(--dark-muted);font-variant-numeric:tabular-nums}
.ro-co{font-family:var(--head);font-weight:600;font-size:22px;letter-spacing:${isRtl ? 0 : "-0.01em"}}
.ro-role{font-size:15px;color:var(--dark-muted);line-height:1.45}
.dot-now{background:var(--signal)}
.curve-labels{position:relative;height:76px;margin-top:16px}
.curve-label{position:absolute;top:0;width:15%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .5s}
.curve-label.on{opacity:1}
.cl-year{font-size:13px;color:var(--dark-muted);font-variant-numeric:tabular-nums}
.cl-name{font-family:var(--head);font-size:14px;font-weight:600;line-height:1.3;color:var(--dark-fg);transition:color .25s}
.curve-label.act .cl-name{color:var(--signal)}

/* about */
.about{display:grid;grid-template-columns:1.5fr 1fr;gap:88px}
.lead{font-size:${isRtl ? 24 : 28}px;line-height:1.5;font-weight:400}
.about p.body{color:var(--muted);margin-top:24px;max-width:60ch}
.edu{margin-top:56px}
.edu-row{display:grid;grid-template-columns:64px 1fr;gap:20px;padding:16px 0;border-top:1px solid var(--line)}
.edu-row:last-child{border-bottom:1px solid var(--line)}
.edu-year{color:var(--muted);font-variant-numeric:tabular-nums}
.edu-school{font-family:var(--head);font-weight:600}
.edu-dip{color:var(--muted);font-size:16px}
.lang-row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-top:1px solid var(--line)}
.lang-row:last-of-type{border-bottom:1px solid var(--line)}
.lang-row span:last-child{color:var(--muted)}
.facts{display:flex;flex-wrap:wrap;gap:8px 28px;margin-top:40px;color:var(--muted)}
.facts b{font-family:var(--head);font-weight:700;color:var(--ink);font-size:20px;margin-inline-end:6px}

/* experience */
.xp{border-top:1px solid var(--line)}
.xp:last-child{border-bottom:1px solid var(--line)}
.xp-sum{display:grid;grid-template-columns:150px 1fr 24px;gap:24px;align-items:baseline;padding:24px 0;cursor:pointer;list-style:none}
.xp-sum::-webkit-details-marker{display:none}
.xp-year{color:var(--muted);font-variant-numeric:tabular-nums}
.xp-co{display:block;font-family:var(--head);font-weight:600;font-size:22px;letter-spacing:${isRtl ? 0 : "-0.01em"}}
.xp-role{display:block;color:var(--muted);font-size:16px}
.xp-chev{width:9px;height:9px;border-inline-end:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);transition:transform .25s;justify-self:end}
.xp[open] .xp-chev{transform:rotate(-135deg)}
.xp-body{padding:0 0 32px 174px}
.xp-sub{font-family:var(--head);font-weight:500;font-size:15px;margin-bottom:14px}
.xp-body li{position:relative;padding-inline-start:22px;color:var(--muted);margin-bottom:10px;max-width:68ch;font-size:${isRtl ? 15 : 17}px}
.xp-body li::before{content:"";position:absolute;inset-inline-start:0;top:.8em;width:10px;height:2px;background:var(--signal)}

/* projects */
.pj{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.7fr) minmax(0,1fr);gap:32px;padding:26px 16px;margin:0 -16px;border-top:1px solid rgba(255,255,255,0.14);transition:background .25s}
.pj:last-child{border-bottom:1px solid rgba(255,255,255,0.14)}
.pj:hover{background:rgba(255,255,255,0.045)}
.pj h3{font-family:var(--head);font-weight:600;font-size:21px;letter-spacing:${isRtl ? 0 : "-0.01em"};transition:color .25s}
.pj:hover h3{color:var(--signal)}
.pj-cat{display:block;color:var(--dark-muted);font-size:15px}
.pj-desc{color:var(--dark-muted);font-size:${isRtl ? 15 : 17}px}
.pj-tech{color:var(--dark-fg);font-size:15px;text-align:end;opacity:.8}
.more{margin-top:36px;background:none;border:1px solid rgba(255,255,255,0.3);color:var(--dark-fg);font-family:var(--head);font-weight:600;font-size:15px;padding:13px 26px;border-radius:4px;cursor:pointer;transition:border-color .2s,color .2s}
.more:hover{border-color:var(--signal);color:var(--signal)}

/* skills */
.sk{display:grid;grid-template-columns:220px 1fr;gap:32px;padding:20px 0;border-top:1px solid var(--line)}
.sk:last-of-type{border-bottom:1px solid var(--line)}
.sk h3{font-family:var(--head);font-weight:600;font-size:17px}
.sk p{color:var(--muted);max-width:64ch}
.course{margin-top:56px;max-width:72ch}
.course p{color:var(--muted)}

/* extras */
.ex{padding:28px 0;border-top:1px solid var(--line);display:grid;grid-template-columns:150px 1fr;gap:24px}
.ex:last-child{border-bottom:1px solid var(--line)}
.ex-year{color:var(--muted);font-variant-numeric:tabular-nums}
.ex h3{font-family:var(--head);font-weight:600;font-size:21px;margin-bottom:6px}
.ex p{color:var(--muted);max-width:64ch}

/* contact */
.ct-desc{color:var(--muted);max-width:50ch;margin-top:18px}
.ct{margin-top:56px}
.ct a{display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:22px 0;border-top:1px solid var(--line);text-decoration:none;transition:padding .25s,color .25s}
.ct a:last-child{border-bottom:1px solid var(--line)}
.ct a:hover{color:var(--accent);padding-inline-start:12px}
.ct-l{color:var(--muted);font-size:16px}
.ct-v{font-family:var(--head);font-weight:600;font-size:clamp(18px,2.6vw,28px);letter-spacing:${isRtl ? 0 : "-0.01em"};overflow-wrap:anywhere;text-align:end}

footer{padding:32px 0;border-top:1px solid var(--line);color:var(--muted);font-size:15px}
.foot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}

/* chat */
.chat-fab{position:fixed;bottom:24px;inset-inline-end:24px;z-index:200;width:54px;height:54px;border-radius:50%;border:none;background:var(--signal);color:#0F1E2B;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.22)}
.chat-panel{position:fixed;bottom:90px;inset-inline-end:24px;z-index:200;width:360px;max-width:calc(100vw - 48px);height:480px;max-height:62vh;background:var(--bg);border:1px solid var(--line);border-radius:10px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.chat-head{padding:16px 20px;border-bottom:1px solid var(--line);font-family:var(--head);font-weight:600;font-size:15px}
.chat-body{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px}
.bubble{padding:11px 15px;border-radius:10px;max-width:88%;font-size:15px;line-height:1.6;white-space:pre-line;font-family:var(--head);font-weight:400}
.bubble.bot{background:var(--bg2);align-self:flex-start}
.bubble.user{background:var(--accent);color:var(--on-accent);align-self:flex-end}
.chat-opts{display:flex;flex-wrap:wrap;gap:8px}
.chat-opt{font-family:var(--head);font-size:13px;font-weight:500;padding:7px 14px;border-radius:999px;border:1px solid var(--line);background:none;color:var(--ink);cursor:pointer}
.chat-opt:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
.chat-opt:disabled{opacity:.5;cursor:default}

@media(max-width:900px){
  .wrap{padding:0 22px}
  .sec{padding:80px 0}
  .nav-links{display:none}
  .burger{display:block}
  .nav-right{gap:12px}
  .about{grid-template-columns:1fr;gap:56px}
  .xp-sum{grid-template-columns:1fr 24px;gap:6px 16px}
  .xp-year{grid-column:1}
  .xp-main{grid-column:1}
  .xp-chev{grid-column:2;grid-row:1 / span 2}
  .xp-body{padding-inline-start:0}
  .pj{grid-template-columns:1fr;gap:8px}
  .pj-tech{text-align:start}
  .sk{grid-template-columns:1fr;gap:8px}
  .ex{grid-template-columns:1fr;gap:4px}
  .hero{padding-top:100px}
  .hero-row{grid-template-columns:1fr;gap:28px}
}
@media(max-width:760px){.curve-labels{display:none}.curve{margin-top:48px}.readout{position:static;max-width:none;margin-top:18px}}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .curve-line{stroke-dashoffset:0}.curve-area,.dot,.curve-label{opacity:1;transform:none}.curve-label{transform:translateX(-50%)}
}
`;

/* ═══════ MAIN PORTFOLIO ═══════ */
const CONTACTS = (t) => [
  { label: t.contactLabels.email, value: "tadrosjustine21@gmail.com", href: "mailto:tadrosjustine21@gmail.com" },
  { label: t.contactLabels.linkedin, value: "linkedin.com/in/justinetadros", href: "https://www.linkedin.com/in/justinetadros/" },
  { label: t.contactLabels.github, value: "github.com/JustineTdrs", href: "https://github.com/JustineTdrs" },
  { label: t.contactLabels.phone, value: "+33 7 68 98 59 03", href: "tel:+33768985903" },
];

export default function Portfolio() {
  const [lang, setLang] = useState("fr");
  const [dark, setDark] = useState(() => {
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches; } catch { return false; }
  });
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllProj, setShowAllProj] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];
  const isRtl = t.dir === "rtl";

  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 150);
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => { clearTimeout(id); window.removeEventListener("scroll", h); };
  }, []);
  useEffect(() => { setShowAllProj(false); }, [lang]);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = t.dir; }, [lang, t.dir]);

  const projects = showAllProj ? t.projects : t.projects.slice(0, 6);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div dir={t.dir}>
      <style>{css(dark ? DARK : LIGHT, isRtl)}</style>

      {/* ═══ NAV ═══ */}
      <header className={`nav ${scrolled || menuOpen ? "scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#top" className="brand">Justine Tadros</a>
          <div className="nav-right">
            <nav className="nav-links" aria-label="Navigation">{t.nav.map((s, i) => <a key={i} href={`#s${i}`}>{s}</a>)}</nav>
            <div className="lang">
              {[["fr", "FR"], ["en", "EN"], ["ar", "AR"]].map(([k, l]) => <button key={k} aria-pressed={lang === k} onClick={() => setLang(k)}>{l}</button>)}
            </div>
            <button className="icon-btn" onClick={() => setDark(!dark)} aria-label={dark ? t.lightMode : t.darkMode}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" /></svg>
            </button>
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menu">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="menu">
          {t.nav.map((s, i) => <a key={i} href={`#s${i}`} onClick={closeMenu}>{s}</a>)}
        </div>
      )}

      <main id="top">
        {/* ═══ HERO ═══ */}
        <section className="hero">
          <div className="wrap" style={{ width: "100%" }}>
            <h1>{t.heroTitle.join(" ")}</h1>
            <div className="hero-row">
              <div>
                <p className="hero-sub">{t.heroSub}</p>
                <p className="hero-desc">{t.heroDesc}</p>
              </div>
              <div className="hero-cta">
                <a href="#s1" className="btn">{t.btnDiscover}</a>
                <a href="#s4" className="link">{t.btnContact}</a>
              </div>
            </div>
            <CareerCurve experiences={t.experiences} isRtl={isRtl} on={loaded} />
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="s0" className="sec sec-alt">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{t.aboutTitle}</h2>
              <p className="sub">{t.aboutSub}</p>
            </div>
            <div className="about">
              <div>
                <p className="lead">{t.aboutP1}</p>
                <p className="body">{t.aboutP2}</p>
                <div className="edu">
                  <h3 className="label">{t.eduLabel}</h3>
                  {t.edu.map((e, i) => (
                    <div key={i} className="edu-row">
                      <span className="edu-year">{e.year}</span>
                      <div>
                        <div className="edu-school">{e.school}</div>
                        <div className="edu-dip">{e.diploma}{e.note ? `, ${e.note}` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="label">{t.langLabel}</h3>
                {t.langs.map((l, i) => (
                  <div key={i} className="lang-row"><span>{l.lang}</span><span>{l.level}</span></div>
                ))}
                <p className="facts">{t.stats.map((s, i) => <span key={i}><b>{s.n}</b>{s.l}</span>)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="s1" className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{t.expTitle}</h2>
              <p className="sub">{t.expSub}</p>
            </div>
            <div>
              {t.experiences.map((exp, i) => (
                <details key={`${lang}-${i}`} className="xp" open={i < 2}>
                  <summary className="xp-sum">
                    <span className="xp-year">{exp.year}</span>
                    <span className="xp-main">
                      <span className="xp-co">{exp.company}</span>
                      <span className="xp-role">{exp.role}, {exp.location}</span>
                    </span>
                    <span className="xp-chev" aria-hidden="true" />
                  </summary>
                  <div className="xp-body">
                    <p className="xp-sub">{exp.sub}</p>
                    <ul>{exp.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="s2" className="sec sec-dark">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{t.projTitle}</h2>
              <p className="sub">{t.projSub}</p>
            </div>
            <ul>
              {projects.map((p, i) => (
                <li key={`${lang}-${p.name}`} className="pj">
                  <div><h3>{p.name}</h3><span className="pj-cat">{sentence(p.cat)}</span></div>
                  <p className="pj-desc">{p.desc}</p>
                  <p className="pj-tech">{p.tech}</p>
                </li>
              ))}
            </ul>
            {t.projects.length > 6 && (
              <button className="more" onClick={() => setShowAllProj(!showAllProj)} aria-expanded={showAllProj}>{showAllProj ? t.showLess : t.showAll}</button>
            )}
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="s3" className="sec sec-alt">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{t.skillsTitle}</h2>
              <p className="sub">{t.skillsSub}</p>
            </div>
            <div>
              {t.skillCats.map((g, i) => (
                <div key={i} className="sk"><h3>{g.cat}</h3><p>{g.items.join(isRtl ? "، " : ", ")}</p></div>
              ))}
            </div>
            <div className="course">
              <h3 className="label">{t.courseworkLabel}</h3>
              <p>{t.coursework}</p>
            </div>
          </div>
        </section>

        {/* ═══ EXTRAS ═══ */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="h2">{t.extraTitle}</h2>
              <p className="sub">{t.extraSub}</p>
            </div>
            <div>
              {t.extras.map((e, i) => (
                <div key={i} className="ex">
                  <span className="ex-year">{e.year}</span>
                  <div><h3>{e.title}</h3><p>{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="s4" className="sec sec-alt">
          <div className="wrap">
            <h2 className="h2">{t.contactTitle} {t.contactTitle2}</h2>
            <p className="ct-desc">{t.contactDesc}</p>
            <div className="ct">
              {CONTACTS(t).map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="ct-l">{c.label}</span>
                  <span className="ct-v">{c.value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© 2026 Justine Tadros</span>
          <span>{t.footer}</span>
        </div>
      </footer>

      <Chatbot t={t} />
    </div>
  );
}
