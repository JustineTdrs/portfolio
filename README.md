# ✈ Portfolio Justine Tadros

Portfolio personnel avec thème aéronautique, construit avec React + Vite.

---

## 🚀 Déployer sur GitHub Pages — Guide pas à pas

### Étape 1 : Créer le repo GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Nom du repo : `portfolio` (ou ce que tu veux)
3. Laisse-le **Public**
4. Ne coche rien (pas de README, pas de .gitignore)
5. Clique **Create repository**

### Étape 2 : Modifier le base path

Ouvre le fichier `vite.config.js` et remplace `portfolio` par le **nom exact de ton repo** :

```js
base: '/portfolio/',  // ← le nom de ton repo ici
```

> Si ton repo s'appelle `mon-site`, mets `/mon-site/`

### Étape 3 : Envoyer le code sur GitHub

Ouvre un terminal dans le dossier du projet et tape :

```bash
# Initialiser git
git init
git add .
git commit -m "🚀 Premier déploiement du portfolio"

# Connecter à ton repo (remplace l'URL par la tienne)
git remote add origin https://github.com/JustineTdrs/portfolio.git

# Envoyer le code
git branch -M main
git push -u origin main
```

### Étape 4 : Activer GitHub Pages

1. Va dans ton repo sur GitHub
2. Clique sur **Settings** (⚙️)
3. Dans le menu à gauche, clique sur **Pages**
4. Sous **Source**, sélectionne **GitHub Actions**
5. C'est tout ! Le workflow se lance automatiquement

### Étape 5 : Attendre le déploiement

1. Va dans l'onglet **Actions** de ton repo
2. Tu verras le workflow **"Deploy to GitHub Pages"** en cours
3. Attends 1-2 minutes qu'il passe au vert ✅

### Étape 6 : Voir ton site ! 🎉

Ton portfolio est maintenant en ligne à :

```
https://JustineTdrs.github.io/portfolio/
```

(Remplace `portfolio` par le nom de ton repo)

---

## 💻 Développement local

```bash
# Installer les dépendances
npm install

# Lancer en local
npm run dev

# Construire pour la production
npm run build
```

---

## 📁 Structure du projet

```
portfolio/
├── .github/workflows/deploy.yml   ← Déploiement automatique
├── src/
│   ├── main.jsx                   ← Point d'entrée
│   └── Portfolio.jsx              ← Le portfolio complet
├── index.html
├── package.json
└── vite.config.js                 ← ⚠️ Modifier le "base" ici
```
