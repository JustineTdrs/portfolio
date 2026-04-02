import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─── */
const EXP = [
  { year: "2025", company: "Safran Aircraft Engines", role: "Analyste Support Planification", sub: "Supply Chain & Data", location: "Paris", bullets: ["Pilotage de la transformation digitale supply chain & production", "Validation et recette (UAT) de solutions data internes", "Déploiement de dashboards et formation des utilisateurs", "Rédaction de documentation technique pour les équipes internationales"] },
  { year: "2024", company: "Shepherd of Egypt", role: "Développeuse Web", sub: "Infrastructure & WordPress", location: "Le Caire", bullets: ["Résolution de problèmes critiques WordPress et serveur", "Configuration DNS (SPF, DKIM, DMARC) et services SMTP", "Dépannage PHP, SSL et environnements d'hébergement"] },
  { year: "2021", company: "Tradespotting", role: "Développeuse Front End", sub: "Architecture & APIs", location: "Paris", bullets: ["Conception de l'architecture des données et stratégie de chargement", "Création d'APIs avec spécifications et endpoints définis", "Collaboration avec la direction IT sur les applications mobiles"] },
  { year: "2020", company: "ETNA", role: "Développeuse Full Stack", sub: "Plateformes universitaires", location: "Paris", bullets: ["Correction de problèmes de plateforme avec Docker et PHP", "Maintenance et optimisation des systèmes universitaires"] },
  { year: "2019", company: "SHIFT89", role: "Développeuse Web & Lead", sub: "Management d'équipe", location: "Paris", bullets: ["Évaluation et amélioration de sites web et apps mobiles", "Supervision du recrutement et mentorat de stagiaires", "Présentation de solutions et gestion de la relation client"] },
];

const PROJECTS = [
  { name: "E-Commerce Laravel", cat: "FULL STACK", desc: "Plateforme e-commerce complète avec système de paiement, gestion d'inventaire et interface d'administration.", tech: "Laravel · HTML/CSS · JavaScript" },
  { name: "TicketChainer", cat: "HACKATHON", desc: "Direction d'une équipe de 8 personnes. Intégration FrontEnd, APIs et orchestration avec Docker et Symfony.", tech: "Docker · Symfony · APIs" },
  { name: "Application Météo", cat: "iOS NATIVE", desc: "Application météo native avec géolocalisation, prévisions et interface intuitive.", tech: "Swift · Xcode · API REST" },
  { name: "Clone Twitter", cat: "BACKEND", desc: "Réseau social avec authentification, posts, followers et messagerie en temps réel.", tech: "Node.js · MongoDB · WebSocket" },
  { name: "Serveur Web Debian", cat: "DEVOPS", desc: "Configuration complète d'un serveur web from scratch avec virtualisation.", tech: "Debian · Shell · VirtualBox" },
  { name: "RPG Game", cat: "GAME DEV", desc: "Moteur de jeu RPG avec interface graphique, système de combat et inventaire.", tech: "Java · Swing · OOP" },
];

const SKILLS = [
  { cat: "Langages", items: ["HTML/CSS/JS", "TypeScript", "PHP", "Swift", "Java", "C", "Bash"] },
  { cat: "Frameworks", items: ["React", "React Native", "Laravel", "Symfony", "Angular", "Node.js"] },
  { cat: "Outils", items: ["Docker", "Git", "Figma", "Adobe XD", "Postman", "VS Code", "Xcode"] },
  { cat: "Data & Cloud", items: ["Power BI", "SAP", "Azure SQL", "MySQL", "Excel Avancé"] },
];

/* ─── HOOKS ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── BLUEPRINT SVG BACKGROUND ─── */
const BlueprintGrid = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none" }}>
    <defs>
      <pattern id="bpGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a2744" strokeWidth="0.5" />
      </pattern>
      <pattern id="bpGridSm" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#1a2744" strokeWidth="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bpGridSm)" />
    <rect width="100%" height="100%" fill="url(#bpGrid)" />
  </svg>
);

/* ─── AIRCRAFT SILHOUETTE ─── */
const AircraftSVG = ({ style }) => (
  <svg viewBox="0 0 800 200" style={{ ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fuselage */}
    <path d="M 50 100 Q 80 85 200 88 L 600 88 Q 720 88 760 95 L 770 100 Q 760 105 720 112 L 600 112 L 200 112 Q 80 115 50 100 Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
    {/* Wings */}
    <path d="M 280 88 L 220 30 Q 215 26 225 26 L 380 26 Q 390 26 385 30 L 340 88" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M 280 112 L 220 170 Q 215 174 225 174 L 380 174 Q 390 174 385 170 L 340 112" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    {/* Tail */}
    <path d="M 650 88 L 640 50 Q 638 44 645 44 L 710 44 Q 718 44 715 50 L 695 88" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    <path d="M 650 112 L 640 150 Q 638 156 645 156 L 710 156 Q 718 156 715 150 L 695 112" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.35" />
    {/* Engines */}
    <ellipse cx="300" cy="30" rx="22" ry="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <ellipse cx="300" cy="170" rx="22" ry="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    {/* Dimension lines */}
    <line x1="50" y1="130" x2="770" y2="130" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 3" opacity="0.2" />
    <line x1="50" y1="127" x2="50" y2="133" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
    <line x1="770" y1="127" x2="770" y2="133" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
    {/* Center cross */}
    <line x1="395" y1="85" x2="395" y2="115" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
    <line x1="380" y1="100" x2="410" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.2" />
  </svg>
);

/* ─── TURBINE BLUEPRINT ─── */
const TurbineBlueprint = ({ size = 200, style }) => (
  <svg viewBox="0 0 200 200" style={{ width: size, height: size, ...style }} fill="none">
    <circle cx="100" cy="100" r="95" stroke="var(--gold)" strokeWidth="0.3" opacity="0.3" />
    <circle cx="100" cy="100" r="70" stroke="var(--gold)" strokeWidth="0.3" opacity="0.25" />
    <circle cx="100" cy="100" r="45" stroke="var(--gold)" strokeWidth="0.3" opacity="0.2" />
    <circle cx="100" cy="100" r="20" stroke="var(--gold)" strokeWidth="0.4" opacity="0.4" />
    <circle cx="100" cy="100" r="6" fill="var(--gold)" opacity="0.15" />
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i * 15) * Math.PI / 180;
      return <line key={i} x1={100 + 22 * Math.cos(a)} y1={100 + 22 * Math.sin(a)} x2={100 + 93 * Math.cos(a)} y2={100 + 93 * Math.sin(a)} stroke="var(--gold)" strokeWidth="0.2" opacity="0.12" />;
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * 45) * Math.PI / 180;
      const na = ((i * 45) + 22) * Math.PI / 180;
      return <path key={i} d={`M ${100 + 20 * Math.cos(a)} ${100 + 20 * Math.sin(a)} Q ${100 + 55 * Math.cos(na)} ${100 + 55 * Math.sin(na)} ${100 + 85 * Math.cos(a)} ${100 + 85 * Math.sin(a)}`} stroke="var(--gold)" strokeWidth="0.5" opacity="0.25" />;
    })}
    <g>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30) * Math.PI / 180;
        return <circle key={i} cx={100 + 70 * Math.cos(a)} cy={100 + 70 * Math.sin(a)} r="1.5" fill="var(--gold)" opacity="0.2" />;
      })}
    </g>
  </svg>
);

/* ─── SECTION HEADING ─── */
const SectionHead = ({ number, title, subtitle }) => {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 64, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>{number}</span>
        <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} />
      </div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "var(--navy)", letterSpacing: -1, lineHeight: 1.1 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>{subtitle}</p>}
    </div>
  );
};

/* ─── MAIN COMPONENT ─── */
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeExp, setActiveExp] = useState(0);
  const [hoveredProj, setHoveredProj] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "var(--cream)", color: "var(--navy)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        :root {
          --cream: #F5F0E8;
          --ivory: #FAF7F2;
          --navy: #0D1B2A;
          --navy-light: #1B2D45;
          --gold: #B8860B;
          --gold-light: #D4A843;
          --copper: #C17F59;
          --slate: #6B7B8D;
          --slate-light: #9AACBD;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'DM Sans', sans-serif;
          --mono: 'IBM Plex Mono', monospace;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--cream); }

        ::selection { background: var(--gold); color: var(--cream); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes drawLine { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        @keyframes expandW { from { width: 0; } to { width: 100%; } }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .serif { font-family: var(--serif); }
        .mono { font-family: var(--mono); }
        .sans { font-family: var(--sans); }

        .nav-item { font-family: var(--mono); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--slate); cursor: pointer; padding: 8px 0; position: relative; transition: color 0.3s; text-decoration: none; }
        .nav-item:hover { color: var(--navy); }
        .nav-item::after { content: ''; position: absolute; bottom: 4px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .nav-item:hover::after { width: 100%; }

        .card-elegant { background: var(--ivory); border: 1px solid rgba(13,27,42,0.06); border-radius: 2px; transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); position: relative; overflow: hidden; }
        .card-elegant:hover { border-color: rgba(184,134,11,0.2); box-shadow: 0 20px 60px rgba(13,27,42,0.06); transform: translateY(-3px); }
        .card-elegant::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.5s; }
        .card-elegant:hover::after { opacity: 1; }

        .exp-tab { font-family: var(--mono); font-size: 12px; letter-spacing: 2px; padding: 16px 24px; cursor: pointer; border: none; background: none; color: var(--slate); position: relative; transition: all 0.4s; text-align: left; width: 100%; }
        .exp-tab:hover { color: var(--navy); }
        .exp-tab.active { color: var(--navy); }
        .exp-tab.active::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); }

        .skill-chip { display: inline-block; padding: 8px 18px; border: 1px solid rgba(13,27,42,0.08); font-family: var(--mono); font-size: 11px; letter-spacing: 1.5px; color: var(--navy-light); transition: all 0.3s; cursor: default; border-radius: 1px; }
        .skill-chip:hover { border-color: var(--gold); color: var(--gold); background: rgba(184,134,11,0.03); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: rgba(184,134,11,0.2); }
        ::-webkit-scrollbar-thumb:hover { background: rgba(184,134,11,0.4); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-right { display: none !important; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .exp-sidebar { display: none !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .contact-row { flex-direction: column !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 24px !important; text-align: center !important; }
        }
      `}</style>

      {/* ═══════ NAVIGATION ═══════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 80 ? "rgba(245,240,232,0.92)" : "transparent", backdropFilter: scrollY > 80 ? "blur(16px)" : "none", borderBottom: scrollY > 80 ? "1px solid rgba(13,27,42,0.05)" : "none", transition: "all 0.4s" }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }} fill="none">
            <circle cx="16" cy="16" r="15" stroke="var(--gold)" strokeWidth="0.8" />
            <text x="16" y="20" textAnchor="middle" fill="var(--navy)" fontFamily="var(--serif)" fontSize="13" fontWeight="500">JT</text>
          </svg>
          <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 500, color: "var(--navy)", letterSpacing: 2 }}>JUSTINE TADROS</span>
        </a>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["À propos", "Parcours", "Projets", "Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase().replace("à ", "")}`} className="nav-item">{s}</a>
          ))}
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
        <BlueprintGrid />

        <div className="hero-grid" style={{ maxWidth: 1300, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.2s" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 5, color: "var(--gold)", marginBottom: 24, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 1, background: "var(--gold)" }} />
                Portfolio 2025
              </div>
            </div>

            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6.5vw, 80px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: -2, color: "var(--navy)", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 1s 0.4s" }}>
              L'art du<br />
              <span style={{ fontWeight: 600, fontStyle: "italic" }}>code</span> rencontre<br />
              l'<span style={{ color: "var(--gold)", fontWeight: 600 }}>aéronautique</span>
            </h1>

            <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.9, color: "var(--slate)", maxWidth: 460, marginTop: 32, fontWeight: 300, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.7s" }}>
              Développeuse Full Stack chez Safran Aircraft Engines, je conçois des solutions digitales à l'intersection de la technologie et de l'industrie aéronautique.
            </p>

            <div style={{ display: "flex", gap: 24, marginTop: 48, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.9s" }}>
              <a href="#propos" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: "var(--navy)", color: "var(--cream)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.4s", borderRadius: 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--navy-light)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(13,27,42,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--navy)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                Découvrir →
              </a>
              <a href="mailto:tadrosjustine21@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", border: "1px solid rgba(13,27,42,0.15)", color: "var(--navy)", textDecoration: "none", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", transition: "all 0.4s", borderRadius: 1, background: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,27,42,0.15)"; e.currentTarget.style.color = "var(--navy)"; }}>
                Contact
              </a>
            </div>
          </div>

          <div className="hero-right" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TurbineBlueprint size={380} style={{ opacity: loaded ? 0.5 : 0, transition: "opacity 1.5s 0.5s", animation: "rotateSlow 120s linear infinite" }} />
            <AircraftSVG style={{ position: "absolute", width: "90%", color: "var(--navy)", opacity: loaded ? 0.15 : 0, transition: "opacity 1.2s 0.8s", animation: "float 8s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Decorative corner marks */}
        <div style={{ position: "absolute", top: 100, left: 48, width: 16, height: 16, borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)", opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: 48, right: 48, width: 16, height: 16, borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)", opacity: 0.3 }} />
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="propos" style={{ padding: "120px 48px", background: "var(--ivory)", position: "relative" }}>
        <BlueprintGrid />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number="01" title="À propos" subtitle="Profil · Formation · Langues" />

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80 }}>
            <div>
              <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.8, color: "var(--navy)", fontWeight: 300, marginBottom: 32 }}>
                De <em style={{ color: "var(--gold)" }}>Paris</em> au <em style={{ color: "var(--gold)" }}>Caire</em>, en passant par <em style={{ color: "var(--gold)" }}>Québec</em> — un parcours international forgé par la curiosité technique et la passion de l'industrie.
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 2, color: "var(--slate)", fontWeight: 300 }}>
                Titulaire d'une Licence en Ingénierie Informatique de l'ETNA et d'études en Design d'Interaction à l'Université Laval, je prépare actuellement un Master en Intelligence Artificielle et Big Data à l'École 89. Mon parcours mêle développement logiciel, architecture de données et transformation digitale dans le secteur aéronautique.
              </p>

              {/* Education timeline */}
              <div style={{ marginTop: 48 }}>
                {[
                  { year: "2025", school: "École 89", diploma: "Master IA & Big Data", note: "en cours" },
                  { year: "2022", school: "Université Laval", diploma: "Master Design d'Interaction", note: "Québec" },
                  { year: "2021", school: "ETNA Paris", diploma: "Licence Ingénierie Informatique", note: "" },
                ].map((edu, i) => (
                  <div key={i} style={{ display: "flex", gap: 24, padding: "20px 0", borderBottom: "1px solid rgba(13,27,42,0.05)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--gold)", letterSpacing: 2, minWidth: 50 }}>{edu.year}</span>
                    <div>
                      <div style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 500, color: "var(--navy)" }}>{edu.school}</div>
                      <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--slate)", marginTop: 2 }}>
                        {edu.diploma} {edu.note && <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold)", letterSpacing: 1 }}>— {edu.note}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages + Quick stats */}
            <div>
              <div style={{ padding: 32, border: "1px solid rgba(13,27,42,0.06)", marginBottom: 24, background: "var(--cream)", borderRadius: 2 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 24 }}>Langues</div>
                {[
                  { lang: "Arabe", level: "Maternelle", pct: 100 },
                  { lang: "Français", level: "Courant", pct: 95 },
                  { lang: "Anglais", level: "Courant", pct: 90 },
                ].map((l, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500 }}>{l.lang}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--slate)", letterSpacing: 1 }}>{l.level}</span>
                    </div>
                    <div style={{ height: 2, background: "rgba(13,27,42,0.06)", borderRadius: 1 }}>
                      <div style={{ height: "100%", width: `${l.pct}%`, background: `linear-gradient(90deg, var(--gold), var(--copper))`, borderRadius: 1 }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ n: "5+", l: "Années" }, { n: "13", l: "Projets" }, { n: "3", l: "Langues" }, { n: "8", l: "Équipiers" }].map((s, i) => (
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

      {/* ═══════ EXPERIENCE ═══════ */}
      <section id="parcours" style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHead number="02" title="Parcours" subtitle="Expérience professionnelle" />

          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0 }}>
            {/* Sidebar tabs */}
            <div className="exp-sidebar" style={{ borderRight: "1px solid rgba(13,27,42,0.06)" }}>
              {EXP.map((exp, i) => (
                <button key={i} className={`exp-tab ${activeExp === i ? "active" : ""}`} onClick={() => setActiveExp(i)}>
                  <div style={{ fontSize: 10, color: "var(--gold)", marginBottom: 4 }}>{exp.year}</div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: activeExp === i ? 500 : 400 }}>{exp.company}</div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding: "0 48px", minHeight: 360 }}>
              {EXP.map((exp, i) => (
                <div key={i} style={{ display: activeExp === i ? "block" : "none", animation: "fadeUp 0.5s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", border: "2px solid var(--gold)" }} />
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)" }}>{exp.location.toUpperCase()}</span>
                  </div>

                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 400, color: "var(--navy)", marginBottom: 4, letterSpacing: -0.5 }}>{exp.company}</h3>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 16, color: "var(--copper)", fontWeight: 400, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate-light)", letterSpacing: 1, marginBottom: 32 }}>{exp.sub}</div>

                  <div style={{ borderTop: "1px solid rgba(13,27,42,0.05)", paddingTop: 24 }}>
                    {exp.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", marginTop: 8, flexShrink: 0 }} />
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.8, color: "var(--slate)", fontWeight: 300 }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projets" style={{ padding: "120px 48px", background: "var(--navy)", color: "var(--cream)", position: "relative", overflow: "hidden" }}>
        {/* Blueprint on dark */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
          <defs>
            <pattern id="bpDark" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bpDark)" />
        </svg>

        <TurbineBlueprint size={500} style={{ position: "absolute", right: -150, top: -150, opacity: 0.06, animation: "rotateSlow 200s linear infinite" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", letterSpacing: 3 }}>03</span>
              <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.4 }} />
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300, color: "var(--cream)", letterSpacing: -1 }}>Projets</h2>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--slate-light)", letterSpacing: 3, marginTop: 12, textTransform: "uppercase" }}>Réalisations techniques sélectionnées</p>
          </div>

          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} onMouseEnter={() => setHoveredProj(i)} onMouseLeave={() => setHoveredProj(null)} style={{ padding: 32, border: "1px solid rgba(255,255,255,0.06)", background: hoveredProj === i ? "rgba(255,255,255,0.03)" : "transparent", transition: "all 0.5s", cursor: "default", position: "relative", borderRadius: 2, transform: hoveredProj === i ? "translateY(-4px)" : "none" }}>
                {hoveredProj === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, var(--gold), transparent)`, animation: "fadeIn 0.4s" }} />}

                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", marginBottom: 16 }}>{p.cat}</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400, marginBottom: 12, color: hoveredProj === i ? "var(--gold-light)" : "var(--cream)", transition: "color 0.4s" }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.8, color: "var(--slate-light)", fontWeight: 300, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "var(--slate)", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>{p.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section style={{ padding: "120px 48px", background: "var(--ivory)", position: "relative" }}>
        <BlueprintGrid />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <SectionHead number="04" title="Compétences" subtitle="Stack technique" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {SKILLS.map((group, i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={i} ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `all 0.7s ${i * 0.15}s cubic-bezier(0.22, 1, 0.36, 1)` }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 16, height: 1, background: "var(--gold)" }} />
                    {group.cat}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {group.items.map(s => <span key={s} className="skill-chip">{s}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionHead number="05" title={<span>Collaborons<br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>ensemble</span></span>} subtitle="Opportunités · Projets · Échanges" />

          <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 2, color: "var(--slate)", fontWeight: 300, maxWidth: 500, margin: "0 auto 48px" }}>
            Que ce soit pour une mission de développement, un projet de transformation digitale ou une collaboration dans l'aéronautique — je suis à l'écoute.
          </p>

          <div className="contact-row" style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Email", value: "tadrosjustine21@gmail.com", href: "mailto:tadrosjustine21@gmail.com" },
              { label: "LinkedIn", value: "justinetadros", href: "https://www.linkedin.com/in/justinetadros/" },
              { label: "GitHub", value: "JustineTdrs", href: "https://github.com/JustineTdrs" },
              { label: "Téléphone", value: "+33 768 985 903", href: "tel:+33768985903" },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ padding: "28px 32px", border: "1px solid rgba(13,27,42,0.06)", textDecoration: "none", minWidth: 200, transition: "all 0.4s", background: "var(--ivory)", textAlign: "center", borderRadius: 2 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(13,27,42,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,27,42,0.06)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 10 }}>{c.label}</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--navy)", fontWeight: 400 }}>{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(13,27,42,0.06)", background: "var(--ivory)" }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--slate-light)" }}>© 2025 JUSTINE TADROS</span>
          <span style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--slate)", fontStyle: "italic" }}>Conçu avec passion pour l'aviation ✈</span>
        </div>
      </footer>
    </div>
  );
}
