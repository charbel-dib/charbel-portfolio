# Validation de la refonte

Contrôles réalisés localement le 16 octobre 2026.

## Exécutés

- Installation des dépendances verrouillées avec `npm ci`.
- Build Node.js réussi : 16 pages de contenu FR/EN, plus la page 404.
- Vérification de 307 références locales : pages, ressources, ancres et CV.
- Sept dossiers complets dans chaque langue, un seul titre H1 par page, IDs uniques et textes alternatifs présents.
- Vérification syntaxique du JavaScript.
- Tests navigateur avec Playwright 1.58.2 et Chrome Headless Shell 131, sur le serveur local appliquant les en-têtes de `vercel.json`.
- Navigation et absence de débordement sur les 16 pages à 320, 390, 768 et 1 440 px.
- Filtres : tous, agents, RAG, ML et data ; état actif et nombre de projets.
- Menu mobile : ouverture, fermeture, navigation, Escape et restitution du focus.
- Passage FR/EN sur l’accueil et sur un dossier, avec conservation du projet consulté.
- Copie de l’adresse email, téléchargement du vrai PDF et affichage des images.
- Contenu et navigation utilisables sans JavaScript.
- Préférence de mouvement réduit respectée.
- Page 404 accessible depuis une URL profonde, avec retour à l’accueil.
- Revue visuelle des captures desktop, mobile et travaux sélectionnés.
- Aucune erreur JavaScript ni ressource manquante détectée pendant ces contrôles.

## À vérifier après intégration

- Exécution distante des deux jobs GitHub Actions avec le Chromium installé par Playwright.
- Preview Vercel, réglages de branche et déploiement sur le domaine existant.
- Rendu sur Safari/iOS et Firefox : non exécuté dans cet environnement.
- Les tests ne constituent pas une certification d’accessibilité ni un score Lighthouse.

Les résultats des projets ML cités dans le portfolio viennent des rapports publiés dans leurs dépôts. Ils n’ont pas été recalculés pour la refonte du site.
