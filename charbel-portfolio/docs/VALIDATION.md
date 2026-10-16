# Validation — version 3.0.1

Contrôles exécutés localement le 16 octobre 2026 après l’ajout des parcours.

## Exécutés sur cette version

- `npm test` : génération et contrôle de 21 pages (18 pages canoniques, 2 accueils historiques et 404).
- Vérification de 469 références locales : pages, ressources, ancres, CV et certificat.
- Quatre pages d’entrée : professionnel et recherche en français et en anglais.
- Priorité des sept projets vérifiée pour chaque parcours ; publication placée avant les expériences sur les pages recherche.
- Vérification du nom, de la date, du lien de vérification et de la signature PDF du certificat Google Data Analytics.
- Sept dossiers FR/EN communs aux deux parcours, un seul H1 par page, IDs uniques, textes alternatifs présents.
- Vérification syntaxique du générateur, du JavaScript client et du script de tests navigateur.
- Liste de publication explicite : aucun rapport interne, donnée de recherche privée, secret ou node_modules dans `dist/`.

## Vérifications encore à exécuter

Le navigateur de contrôle prévu par l’environnement n’était pas disponible pour cette modification. Le rendu visuel et les interactions de la version 3 n’ont donc pas été revérifiés en navigateur ici.

Le script Playwright et la CI existants ont été adaptés pour couvrir les nouvelles pages, les changements de parcours et de langue, la publication, le certificat et les largeurs 320, 390, 768 et 1440 px. Ils restent à exécuter sur cette version via `npm run test:browser` ou GitHub Actions.

La version 2 avait été testée en navigateur ; ces résultats antérieurs ne valident pas les ajouts de cette version.

À contrôler après intégration : preview Vercel, navigation sur mobile, téléchargement du certificat, déploiement sur le domaine et résultats GitHub Actions. Aucun push ou déploiement Vercel n’a été effectué dans cette livraison.

Les résultats ML présentés proviennent des sources des projets ; ils n’ont pas été recalculés pour le portfolio.


## Correctif après échec de GitHub Actions

Les logs transmis montraient le générateur v2 (16 pages bilingues) exécuté avec des liens vers les parcours v3. Le dépôt `main` a ensuite été consulté au commit `a2bf5c5fbd129ecff15badbd01cde19b06269909` : tous les fichiers applicatifs, y compris le workflow, se trouvaient sous `charbel-portfolio/` et non à la racine.

Le correctif complet est livré dans une archive sans dossier enveloppe. Il faut l’intégrer à la racine du clone et remettre le workflow sous `.github/workflows/ci.yml`.

Le test du presse-papiers attend maintenant la réussite et contrôle le contenu réellement copié. Import de `playwright/test` et disponibilité de `expect.poll` vérifiés localement. La suite de génération/liens repasse sur 21 pages et 469 références. Le test navigateur complet n’a pas été exécuté dans cet environnement ; sa validation distante reste à confirmer après le push.

Référence : https://playwright.dev/docs/test-assertions (assertions avec attente automatique).
