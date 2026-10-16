# Charbel Dib — Portfolio

Portfolio bilingue d’un ingénieur IA diplômé de l’ENSTA. Sept études de cas relient les problèmes abordés, les choix techniques, les livrables et les preuves publiques : FleetGuard, PosAIdon, ServicePilot, fact-checking climatique, Assistant ENSTA, ATLAS et recherche L-PBF.

Site : https://charbel-dib.vercel.app/  
Dépôt : https://github.com/charbel-dib/charbel-portfolio

## Démarrage

Node.js 22 ou supérieur. Le site livré est déjà généré : `index.html` peut s’ouvrir directement. Un serveur local permet de tester les téléchargements, la copie de l’email et la page 404 dans les conditions normales du Web.

```bash
npm ci
npm test
npm run preview
```

Ouvrir http://127.0.0.1:4173. Aucun compte, clé API ou service externe n’est requis. Le seul paquet de développement est Playwright ; le site publié n’embarque aucun framework JavaScript ni dépendance réseau.

## Modifier le contenu

| Fichier | Rôle |
| --- | --- |
| `content/projects.mjs` | Sept études de cas, FR/EN, périmètre, résultats et liens |
| `content/site.mjs` | Textes de la page d’accueil et navigation FR/EN |
| `scripts/build.mjs` | Génère les pages, les métadonnées et le sitemap |
| `styles.css` | Composition, responsive, états et préférence de mouvement réduit |
| `script.js` | Menu mobile, filtres, copie de l’email et indication de section |
| `assets/` | CV, capture FleetGuard, photo SPASEA et image de partage |

Après modification : `npm test`. Committer également les pages HTML régénérées. Le dossier `dist/`, généré à partir d’une liste explicite de fichiers publics, n’est pas committé.

Le français est à la racine, l’anglais dans `en/`. Chaque projet possède une page dans chaque langue. Le sélecteur de langue conserve le projet consulté. Le contenu principal, la navigation et les études de cas restent accessibles sans JavaScript.

## Vérifications

```bash
npm test
npx playwright install chromium
# Terminal 1
npm run preview
# Terminal 2
npm run test:browser
```

Le contrôle statique vérifie les liens locaux, les ancres, les identifiants HTML, les textes alternatifs et la complétude des deux langues. Le contrôle navigateur couvre les filtres, le menu mobile, Escape et le retour du focus, les liens de langue, le CV, le fonctionnement sans JavaScript, le mouvement réduit et les débordements de 320 à 1 440 pixels.

La CI GitHub exécute la génération, les vérifications et les tests navigateur. Elle conserve les pages publiables et les captures de contrôle comme artefacts. Consulter `docs/VALIDATION.md` pour distinguer les contrôles locaux réellement exécutés de ceux qui devront tourner après le push.

## Intégrer dans le dépôt existant

1. Décompresser l’archive.
2. Copier **le contenu** de son dossier `charbel-portfolio/` dans le clone local du dépôt existant, en remplaçant les fichiers correspondants. Conserver le dossier `.git` existant. Copier aussi `.github/` et les autres fichiers de configuration.
3. Depuis ce clone, créer une branche et vérifier :

```powershell
git switch -c design/portfolio-v2
npm ci
npm test
git status --short
git add .
git commit -m "Redesign portfolio with bilingual project case studies"
git push -u origin design/portfolio-v2
```

Ouvrir ensuite une pull request vers `main`. Si le projet Vercel est connecté à ce dépôt et que les previews sont activées, Vercel créera une prévisualisation pour la branche. Après vérification et fusion, le déploiement de production suivra la configuration de la branche de production Vercel.

## Vercel

Le fichier `vercel.json` configure :

- Framework : **Other** (`framework: null`).
- Build command : `npm run build`.
- Output directory : `dist`.
- Root directory : racine du dépôt.
- Aucun secret ni variable d’environnement.

La configuration ajoute une politique de ressources locales et des en-têtes de sécurité. Le site ne contient ni analytics, ni formulaire qui stocke des messages, ni scripts tiers. Les liens GitHub, LinkedIn, ENSTA et IEEE sont des navigations explicites.

Les URL des projets conservent `.html`. Ne pas activer une transformation d’URL différente sans adapter les liens, les URL canoniques et le sitemap. Le nom de domaine est défini dans `scripts/build.mjs`.

**Cette livraison prépare le code : elle ne signifie pas qu’un push ou un déploiement Vercel a été effectué.**

## Sources et direction visuelle

Le contenu public, les preuves consultées et les limites des affirmations sont consignés dans `docs/SOURCES.md`. Aucun rapport de stage confidentiel n’est inclus. Les projets expérimentaux ne sont pas présentés comme des services exploités en production.

Références consultées pour la hiérarchie et la lisibilité :

- [Brittany Chiang — v4](https://github.com/bchiang7/v4) : sélection de projets et mise en contexte des expériences.
- [Lee Robinson — next-mdx-blog](https://github.com/leerob/next-mdx-blog) : priorité donnée au contenu et à la navigation simple.
- [Charca — Astro blog template](https://github.com/Charca/astro-blog-template) : sobriété d’un site personnel centré sur la lecture.

L’implémentation HTML/CSS/JS de cette refonte est originale ; aucun de ces templates n’a été copié. Les détails et crédits des médias figurent dans `docs/ASSETS.md`.
