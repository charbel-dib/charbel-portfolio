# Médias et crédits

- `assets/posaidon.webp` : photographie de l’équipe PosAIdon sur scène, publiée par l’ENSTA dans son compte rendu SPASEA 2025. Le crédit visible renvoie à l’article. Source : https://www.ensta.fr/sites/default/files/styles/paragraph_image/public/content/paragraphs/images/HackathonSpasea2025-PosAIdon.jpg.webp?itok=LEI-62pU . Cette photo tierce n’est pas placée sous une nouvelle licence par ce dépôt ; les droits restent à leur titulaire.
- `assets/fleetguard.webp` : conversion WebP de la capture `docs/results/web-06-home.png` du dépôt public FleetGuard de Charbel Dib. Source : https://github.com/charbel-dib/fleetguard/blob/main/docs/results/web-06-home.png . L’image représente l’interface existante, pas une nouvelle exécution du modèle.
- `assets/Google-Data-Analytics-Charbel-Dib.pdf` : certificat Google Data Analytics fourni par Charbel Dib, daté du 23 mars 2024, copié sans modification. Identifiant de vérification : PABFJT9RQLLB.
- `assets/cv/CV_Charbel_Dib_{Emploi,These}_{FR,EN}.pdf` : les quatre originaux fournis dans `Pack_Codex_Portfolio_Charbel_Dib.zip`, version du 18 octobre 2026. Empreintes SHA-256 et pagination vérifiées (1/1/2/2). Aucun PDF reconstruit.
- `assets/CV_Charbel_Dib.pdf` : copie du nouveau CV emploi FR, remplaçant l’ancien document.
- `assets/social-card.png` : composition typographique propre au portfolio, 1 200 × 630 px.
- `assets/social-fr-pro.png`, `social-en-pro.png`, `social-fr-research.png` et `social-en-research.png` : cartes de partage localisées, 1 200 × 630 px, générées à partir du contenu par `npm run assets:social`. Le build utilise les PNG fournis et ne lance pas de navigateur.
- `favicon.svg` : monogramme typographique c/d, créé pour cette refonte.
- Schéma ServicePilot : représentation HTML/CSS simplifiée du workflow documenté. Ce n’est pas une capture d’écran de l’application.
- Schémas PosAIdon, fact-checking, Assistant ENSTA, ATLAS et L-PBF : diagrammes HTML/CSS de la démarche, écrits dans `content/visuals.mjs` à partir du contenu public déjà documenté. Ils ne représentent ni de nouvelles évaluations ni des interfaces existantes.
- Résultats FleetGuard : panneau textuel généré à partir des mêmes métriques que le dossier et les cartes. Les coûts restent en unités du challenge.
- CV : quatre sources dans `assets/cv/`, mapping dans `content/cvs.mjs`. Les deux anciennes URL servent le nouveau CV emploi FR. Les captures de vérification et le cahier des charges restent hors `dist/`.

Les polices sont celles du système : Georgia pour les titres, la pile système de la plateforme pour le texte et une pile monospace locale pour les repères. Aucun téléchargement de police ni appel à un CDN au chargement du site.
