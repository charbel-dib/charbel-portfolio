# Charbel Dib — Portfolio professionnel & recherche

Portfolio bilingue d’un ingénieur IA diplômé de l’ENSTA, avec deux parcours construits à partir des mêmes projets et preuves. Sept études de cas relient les problèmes abordés, les choix techniques, les livrables et les preuves publiques : FleetGuard, PosAIdon, ServicePilot, fact-checking climatique, Assistant ENSTA, ATLAS et recherche L-PBF.

Site : https://charbel-dib.vercel.app/  
Dépôt : https://github.com/charbel-dib/charbel-portfolio

## Deux liens selon la candidature

Après déploiement sur le domaine existant :

| Parcours | Français | Anglais |
| --- | --- | --- |
| Professionnel | `/pro/` | `/en/pro/` |
| Recherche | `/recherche/` | `/en/research/` |

La racine conserve le parcours professionnel ; aucun écran de choix ne bloque l’accès au contenu. Les boutons **Professionnel / Recherche** restent disponibles sur toutes les pages. Changer de langue conserve le parcours ou le dossier consulté.

- **Professionnel** : réalisations, résultats, intégration, compétences et expériences. Ouverture aux postes en IA, ML et data.
- **Recherche** : publication IEEE en premier auteur, stages CESI / LINEACT et Astek présentés par question, démarche, apport et limites, puis projets complémentaires. Ouverture aux opportunités de doctorat.
- **Commun** : mêmes sept dossiers, mêmes faits, même CV fourni, certification Google Data Analytics, coordonnées et liens de preuve. Aucun second CV n’a été inventé.
- **Certification** : Google Data Analytics Professional Certificate, 23 mars 2024, huit cours ; lien Coursera de vérification et PDF fourni par l’auteur.

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
| `content/site.mjs` | Textes communs et navigation FR/EN |
| `content/profiles.mjs` | Accroches, ordre des projets, recherche, publication et certification |
| `scripts/build.mjs` | Génère les pages, les métadonnées et le sitemap |
| `styles.css` | Composition, responsive, états et préférence de mouvement réduit |
| `script.js` | Menu mobile, filtres, copie de l’email et indication de section |
| `assets/` | CV, certificat Google, capture FleetGuard, photo SPASEA et image de partage |

Après modification : `npm test`. Committer également les pages HTML régénérées. Le dossier `dist/`, généré à partir d’une liste explicite de fichiers publics, n’est pas committé.

Le français utilise `pro/` et `recherche/`, l’anglais `en/pro/` et `en/research/`. Les accueils historiques `/` et `/en/` restent disponibles et ont une URL canonique vers leur parcours professionnel. Chaque projet possède une page dans chaque langue. Le sélecteur de langue conserve le projet consulté. Le contenu principal, la navigation et les études de cas restent accessibles sans JavaScript.

## Vérifications

```bash
npm test
npx playwright install chromium
# Terminal 1
npm run preview
# Terminal 2
npm run test:browser
```

Le contrôle statique vérifie les 21 pages, les liens locaux, les ancres, les identifiants HTML, les textes alternatifs, les quatre parcours, la priorité des projets, la présence de la publication en tête du parcours recherche et le certificat PDF. Le contrôle navigateur couvre les filtres, le menu mobile, Escape et le retour du focus, les liens de langue et de parcours, le CV, le certificat, le fonctionnement sans JavaScript, le mouvement réduit et les débordements de 320 à 1 440 pixels.

La CI GitHub exécute la génération, les vérifications et les tests navigateur. Elle conserve les pages publiables et les captures de contrôle comme artefacts. Consulter `docs/VALIDATION.md` pour distinguer les contrôles locaux réellement exécutés de ceux qui devront tourner après le push.

## Intégrer dans le dépôt existant

1. Décompresser l’archive.
2. Cette archive corrective est **sans dossier enveloppe**. Copier tous ses fichiers directement à la racine du clone local : `package.json`, `scripts/`, `content/`, `.github/`, `pro/`, `recherche/`, etc. Conserver le dossier `.git` existant. Ne pas créer un second dossier `charbel-portfolio/` à l’intérieur du dépôt. Consulter `INSTALLATION.md` pour corriger le dépôt actuellement imbriqué.
3. Depuis ce clone, créer une branche et vérifier :

```powershell
git switch -c feat/portfolio-pro-research
npm ci
npm test
git status --short
git add .
git commit -m "Add professional and research profiles with Google certificate"
git push -u origin feat/portfolio-pro-research
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


## Correctif CI 3.0.1

- Rétablit la livraison complète du générateur v3 : les parcours `pro/`, `recherche/`, `en/pro/` et `en/research/` sont générés et copiés dans `dist/`.
- Le test du presse-papiers attend le message de réussite avec `expect(...).toHaveText(...)`, puis vérifie l’adresse effectivement copiée avec `expect.poll(...)`. Une lecture immédiate du texte pouvait échouer avant la résolution de `navigator.clipboard.writeText`.
- `expect` est fourni par `playwright/test`, inclus dans la dépendance Playwright déjà verrouillée ; aucune nouvelle dépendance n’est ajoutée.
- Les tests restent stricts : aucun contournement de lien manquant et aucune suppression du test de copie.
