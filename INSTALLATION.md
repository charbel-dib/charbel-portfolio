# Installation et configuration

## Développement

Le dossier contenant `package.json` et `.git` est la racine du dépôt. Utiliser Node.js 22 ou supérieur.

```powershell
npm ci
npm test
npm run preview
```

Ouvrir http://127.0.0.1:4173. Le serveur lit `dist/` ; régénérer les fichiers après chaque modification avec `npm run build`.

Pour les contrôles navigateur, installer Chromium une fois, puis exécuter la suite pendant que le serveur est actif :

```powershell
npx playwright install chromium
npm run test:browser
```

## Vercel

Conserver le projet existant avec :

- Root Directory : racine du dépôt, champ vide ou valeur par défaut.
- Framework Preset : Other.
- Build Command : `npm run build`.
- Output Directory : `dist`.
- Aucune variable d’environnement requise.

`vercel.json` contient les en-têtes de sécurité. Les pages de projet utilisent `.html` ; conserver ces URL.

## Préparer une contribution

Modifier les sources de contenu ou les templates, puis exécuter `npm test` et `npm run test:browser`. Examiner `git diff` et committer les HTML régénérés avec leurs sources. La CI vérifie leur cohérence.

Les dossiers `dist/`, `reports/` et `node_modules/` ne sont pas committés. Les sources maintenues et les ressources publiques restent à la racine ; aucun sous-dossier supplémentaire n’est nécessaire.

Le CV source est `assets/CV_Charbel_Dib.pdf`. L’ancienne URL `/CV_Charbel_Dib.pdf` est conservée par une copie générée à partir de cette source unique.

Un build local ne réalise aucun push ni déploiement.
