# Charbel Dib — Portfolio professionnel & recherche

Portfolio bilingue d’un ingénieur IA diplômé de l’ENSTA. Deux parcours présentent sept études de cas communes, avec leurs contributions, résultats, sources et limites.

| Parcours | Français | Anglais |
| --- | --- | --- |
| Professionnel | `/pro/` | `/en/pro/` |
| Recherche | `/recherche/` | `/en/research/` |

Les accueils `/` et `/en/` restent disponibles, avec une URL canonique vers le parcours professionnel. Les pages de projet conservent leurs URL `.html`.

## Développement local

Node.js 22 ou supérieur :

```powershell
npm ci
npm test
npm run preview
```

Ouvrir http://127.0.0.1:4173. Le serveur utilise les fichiers générés dans `dist/`. Après une modification de contenu, de CSS ou de JavaScript, relancer `npm run build` pour actualiser la prévisualisation.

Le site publié utilise HTML, CSS et JavaScript sans framework, police distante, analytics, compte ni clé API. Le contenu et les liens de navigation sont accessibles sans JavaScript.

## Sources à modifier

| Fichier | Rôle |
| --- | --- |
| `content/projects.mjs` | Sept dossiers FR/EN, noms, descriptions, métriques et sources |
| `content/profiles.mjs` | Accroches, ordre des projets, recherche, publication et certificat |
| `content/site.mjs` | Textes communs et navigation FR/EN |
| `content/visuals.mjs` | Schémas explicatifs des démarches publiques |
| `scripts/lib/pages.mjs` | Composition des accueils, dossiers et page 404 |
| `scripts/lib/components.mjs` | Navigation, métadonnées, schémas et résultats |
| `scripts/lib/html.mjs` | Chemins, liens contextualisés et fonctions HTML |
| `scripts/build.mjs` | Génération et liste explicite de publication |
| `styles.css` | Typographie, composants, responsive et préférences d’accessibilité |
| `script.js` | Contexte de navigation, menu, filtres, copie de l’email et section active |
| `assets/` | Source unique du CV, certificat, captures et images de partage |

Les noms éditoriaux, descriptions et tags sont localisés. Les noms de produits restent stables. Les chiffres FleetGuard viennent d’un objet commun et sont formatés selon la langue.

Les liens de dossier portent `?profile=pro` ou `?profile=research`. JavaScript conserve ce contexte dans la navigation, le retour à l’index, le changement de langue et le projet suivant. Les URL canoniques restent sans paramètre. En accès direct ou sans JavaScript, chaque dossier conserve une destination par défaut et propose les deux parcours explicitement.

Le CV est maintenu uniquement dans `assets/CV_Charbel_Dib.pdf`. La génération copie ce même fichier dans `dist/CV_Charbel_Dib.pdf` pour préserver l’ancienne URL de téléchargement.

## Vérification

```powershell
npm test
npx playwright install chromium
# Terminal 1
npm run preview
# Terminal 2
npm run test:browser
```

Les contrôles statiques vérifient les 21 pages, les ressources et ancres, la structure des titres, les champs localisés, l’ordre des projets, les métadonnées, le certificat et l’alias du CV.

Les contrôles navigateur couvrent les interactions, les parcours et langues, les contrôles tactiles, le fonctionnement sans JavaScript, les préférences de mouvement et les débordements de 320 à 1 440 pixels, y compris avec le texte agrandi à 200 %. Les captures sont enregistrées dans `reports/`, ignoré par Git.

Après modification, committer également les HTML régénérés. `dist/` reste ignoré. La CI contrôle la cohérence des pages générées et conserve les fichiers publiables et captures comme artefacts. Voir [docs/VALIDATION.md](docs/VALIDATION.md) pour les résultats effectivement obtenus.

Les quatre images de partage FR/EN et professionnel/recherche sont fournies dans `assets/`. Pour les régénérer avec Chromium installé :

```powershell
npm run assets:social
npm test
```

Cette commande est facultative ; le build de production n’a pas besoin d’un navigateur.

## Déploiement existant

Le projet conserve sa configuration Vercel : framework **Other**, racine du dépôt, commande `npm run build`, sortie `dist`, sans secret ni variable d’environnement. Aucun autre hébergement n’est nécessaire.

Les en-têtes de sécurité limitent les ressources au site. Les liens GitHub, LinkedIn, ENSTA, Coursera et IEEE sont des navigations explicites. Le domaine et les chemins publics sont définis dans `scripts/lib/html.mjs`. Voir [INSTALLATION.md](INSTALLATION.md) pour la configuration.

## Contenu et médias

Les schémas représentent les démarches décrites publiquement ; ils ne sont pas des captures d’application ni de nouveaux résultats expérimentaux. Les limites des prototypes et la confidentialité des stages restent explicites.

Les sources sont consignées dans [docs/SOURCES.md](docs/SOURCES.md), les crédits dans [docs/ASSETS.md](docs/ASSETS.md).

La direction éditoriale conserve les couleurs chaudes, les titres Georgia, le monogramme et les preuves documentées. La révision du 17 octobre 2026 améliore la hiérarchie, la lecture, la continuité entre parcours et les interactions.
