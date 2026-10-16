# Installer le correctif 3.0.1

L’archive contient directement les fichiers du site, sans dossier parent supplémentaire.

## 1. Dans le clone local du dépôt GitHub

La racine du dépôt est le dossier qui contient `.git`. Copier **tout le contenu de cette archive** dans ce dossier, en remplaçant les fichiers correspondants. Conserver `.git`.

Ces éléments doivent être au même niveau :

- `.git/` : déjà présent dans votre clone, à conserver ;
- `.github/workflows/ci.yml` ;
- `package.json` (version `3.0.1`) et `package-lock.json` ;
- `scripts/`, `content/`, `assets/` ;
- `pro/`, `recherche/`, `en/`, `projects/` ;
- `index.html`, `styles.css`, `script.js`, `vercel.json`.

Le dépôt actuel contient un ancien sous-dossier `charbel-portfolio/`. Une fois les fichiers de cette archive copiés à la racine, retirer ce sous-dossier ancien. Depuis la racine du clone, cette commande retire uniquement ce dossier suivi par Git (sans forcer la perte de modifications locales) :

```powershell
git rm -r -- charbel-portfolio
```

Ne pas exécuter cette commande si ce sous-dossier n’existe plus. Ne pas supprimer le dossier `.git`.

## 2. Vérifier et envoyer

Dans PowerShell, à la racine du clone :

```powershell
npm ci
npm test
git status --short
git add .
git commit -m "Fix portfolio layout and asynchronous clipboard test"
git push
```

`npm test` doit annoncer `charbel-portfolio@3.0.1`, puis :

```text
Built 18 canonical content pages + 2 root aliases + 404 into dist/.
PASS: 21 pages, 469 local references, ...
```

Si `2.0.0` ou `16 bilingual content pages` apparaît encore, les fichiers complets n’ont pas remplacé l’ancienne version ou la commande est lancée depuis un autre dossier.

## 3. Vérifier Vercel

Pour cette structure, la **Root Directory** du projet Vercel doit être la racine du dépôt (champ vide / valeur par défaut), avec `npm run build` et sortie `dist`.

GitHub Actions trouvera alors le workflow à la racine et relancera les deux jobs. Le test navigateur attend maintenant la fin de la copie de l’adresse email.

Aucun push ou déploiement n’est réalisé par cette archive. Les tests navigateur distants devront confirmer le correctif.
