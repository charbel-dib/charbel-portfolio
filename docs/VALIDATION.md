# Validation — révision du 17 octobre 2026

## Exécuté localement sur cette révision

- `npm test` : génération et validation de 21 pages, dont 18 pages canoniques, deux accueils historiques et une page 404.
- 664 références locales contrôlées : pages, ressources, ancres et destinations de navigation contextualisées.
- Sept dossiers communs aux parcours, dans les deux langues ; noms, descriptions et tags localisés.
- Un H1 par page, IDs uniques et hiérarchie de titres sans saut de niveau.
- Quatre pages d’entrée ; ordre des projets et priorité de la publication en recherche vérifiés.
- Signature PDF du certificat et identité binaire du CV publié sous ses deux URL.
- Quatre images de partage FR/EN et professionnel/recherche générées localement.
- `npm run test:browser` : **306 contrôles réussis**, sans erreur navigateur.
- Conservation du parcours lors de l’ouverture d’un dossier, du changement de langue, du projet suivant et du retour à l’index ; paramètre invalide rejeté au profit du parcours par défaut.
- Filtres avec état sélectionné et compteur de résultats accessible sur mobile.
- Menu mobile : contenu stable à l’ouverture, Escape, focus rendu au bouton, fermeture sur navigation.
- Zones tactiles d’au moins 44 × 44 pixels pour le menu, la langue, l’identité et les filtres.
- Copie de l’adresse email avec attente du message de réussite et contrôle du contenu du presse-papiers.
- Navigation sans JavaScript, certificat, CV, préférence de mouvement réduit et récupération depuis une URL inexistante.
- Toutes les pages de contenu vérifiées aux largeurs 320, 390, 768 et 1440 pixels, sans débordement horizontal ni image cassée.
- Ces mêmes pages et largeurs vérifiées avec une taille de texte de 200 %, sans débordement horizontal.
- Inspection visuelle des entrées professionnel/recherche sur desktop et mobile et des dossiers représentatifs. Captures dans `reports/`.

## Résultats de composition

Au format 1440 × 900, le premier visuel professionnel commence vers Y=704, contre Y=936 avant la révision. Au format 390 × 844, il commence vers Y=727, contre Y=954. Sur l’entrée recherche mobile, le titre de la publication commence vers Y=744.

Les pages professionnelles passent d’environ 5902 à 4642 pixels sur desktop et de 8575 à 7347 pixels sur mobile, tout en agrandissant les textes de soutien. Ces mesures décrivent le rendu Chromium local, pas un gain de conversion mesuré.

## Périmètre de ces vérifications

Les tests utilisent Chromium et le serveur local avec les en-têtes de sécurité Vercel. L’agrandissement du texte est simulé en doublant la taille de police racine ; ce contrôle ne remplace pas les réglages de texte et de zoom propres à chaque navigateur.

Les contrôles d’arbre accessible, de navigation clavier et de structure ne constituent pas un audit exhaustif WCAG. Safari et VoiceOver n’ont pas été validés ici.

Les évaluations ML, sources externes et liens de preuve n’ont pas été réexécutés ou revérifiés sur Internet. Les schémas expliquent les contributions déjà documentées ; aucun nouveau chiffre de performance n’a été ajouté.

## À vérifier après intégration

GitHub Actions, preview Vercel et production restent des vérifications séparées. Aucun push ou déploiement n’a été effectué pendant cette révision.
