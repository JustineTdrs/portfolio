# ✈️ Portfolio — Justine Tadros

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-GitHub_Pages-181717?style=flat-square&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Theme-Aéronautique-B8860B?style=flat-square" />
</p>

<p align="center">
  <em>Portfolio personnel avec une esthétique inspirée de l'ingénierie aéronautique — plans techniques, turbines blueprint et typographie éditoriale de luxe.</em>
</p>

<p align="center">
  <a href="https://JustineTdrs.github.io/portfolio/">🌐 Voir le site en ligne</a> · 
  <a href="https://www.linkedin.com/in/justinetadros/">LinkedIn</a> · 
  <a href="mailto:tadrosjustine21@gmail.com">Contact</a>
</p>

---

## 🖼️ Aperçu

Le portfolio adopte un design **luxe éditorial aéronautique** :

- **Palette** — Ivoire, bleu marine profond et accents dorés
- **Typographie** — Playfair Display (titres), DM Sans (corps), IBM Plex Mono (détails techniques)
- **Illustrations SVG** — Silhouette d'avion avec cotations techniques, turbine blueprint en rotation lente
- **Grille blueprint** — Arrière-plan subtil rappelant le papier millimétré d'ingénieur
- **Animations** — Entrées au scroll, transitions fluides, micro-interactions sur hover
- **Responsive** — Adapté mobile, tablette et desktop

---

## 🛠️ Stack

| Outil | Usage |
|-------|-------|
| **React 18** | Composants et hooks |
| **Vite 5** | Build rapide et HMR |
| **CSS-in-JS** | Styles inline avec variables CSS |
| **SVG** | Illustrations aéronautiques dessinées à la main |
| **GitHub Actions** | Déploiement automatique sur GitHub Pages |

---

## 🚀 Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm ou yarn

### En local

```bash
# Cloner le repo
git clone https://github.com/JustineTdrs/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site est accessible à `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

---

## 📁 Structure du projet

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Pages
├── src/
│   ├── main.jsx                # Point d'entrée React
│   └── Portfolio.jsx           # Composant principal (tout-en-un)
├── index.html                  # HTML racine
├── package.json
├── vite.config.js              # Config Vite + base path
└── README.md
```

---

## 🌐 Déploiement

Le site se déploie automatiquement sur **GitHub Pages** à chaque push sur `main` grâce au workflow GitHub Actions inclus.

### Configuration

1. Dans `vite.config.js`, vérifier que le `base` correspond au nom du repo :
   ```js
   base: '/portfolio/',
   ```

2. Dans GitHub → **Settings** → **Pages** → Source : **GitHub Actions**

3. Chaque `git push` sur `main` déclenche un nouveau déploiement automatique

---

## ✏️ Personnalisation

Le portfolio est contenu dans un seul fichier `src/Portfolio.jsx`. Les données sont facilement modifiables en haut du fichier :

- **`EXP`** — Expériences professionnelles
- **`PROJECTS`** — Projets réalisés
- **`SKILLS`** — Compétences techniques

Les variables CSS sont définies dans le composant via `:root` :

```css
--cream: #F5F0E8;      /* Fond principal */
--navy: #0D1B2A;       /* Texte et accents foncés */
--gold: #B8860B;       /* Accents dorés */
--copper: #C17F59;     /* Accents secondaires */
--slate: #6B7B8D;      /* Texte secondaire */
```

---

## 📬 Contact

- **Email** — [tadrosjustine21@gmail.com](mailto:tadrosjustine21@gmail.com)
- **LinkedIn** — [justinetadros](https://www.linkedin.com/in/justinetadros/)
- **GitHub** — [JustineTdrs](https://github.com/JustineTdrs)
- **Téléphone** — +33 7 68 98 59 03

---

<p align="center">
  Fait avec ☕ et une passion pour l'aviation ✈️
</p>
