# Livraison locale — 18 octobre 2026

La révision demandée dans `Pack_Codex_Portfolio_Charbel_Dib.zip` est implémentée dans les sources du générateur statique. La stack HTML/CSS/JS, l’identité crème/terre cuite et les URL publiques sont conservées. Aucune dépendance ajoutée.

## Contenu et navigation

- Quatre CV originaux intégrés et associés au parcours et à la langue. SHA-256 identiques au cahier des charges, 1 page pour emploi FR/EN et 2 pages pour recherche FR/EN. Les anciennes URL `/assets/CV_Charbel_Dib.pdf` et `/CV_Charbel_Dib.pdf` servent le nouveau CV emploi FR. Aucun lien éditorial ne pointe vers l’ancien fichier.
- Heroes FR/EN : métier, recherche CDI ou doctorale, mobilité, description visible sur mobile, formation immédiatement après le profil, CV et contact directs.
- Emploi : synthèse Astek avant trois réalisations développées, dans l’ordre FleetGuard, ServicePilot, Assistant ENSTA ; sept projets dans l’index compact, publication, parcours, compétences et contact.
- Recherche : publication complète, stages Astek puis CESI, question/contribution/méthode/apport/limites, deux intérêts scientifiques reliés aux travaux, puis projets complémentaires et parcours.
- Sept fiches bilingues : contribution personnelle, livrables, évaluation, limites et contact. FleetGuard explicite 359/375 cas détectés, rappel/précision, fausses alertes et unités du challenge ; ServicePilot précise le mode déterministe et le scénario fictif ; ENSTA distingue ingestion/réponse et mises à jour web/documents ; Astek distingue le classifieur LoRA préexistant ; L-PBF présente la référence complète ; PosAIdon reste collectif ; ATLAS sépare réalisé et suite envisagée.
- Filtres multiples : Agents 2, RAG 3, ML 3, Data 5, Tous 7, dans chaque langue et parcours. Pas d’état de filtre dans l’URL ni de préférence persistante.
- `profile=pro` / `profile=research` conserve logo, menu, retour, langue, tous les CV et suivant. Le dernier projet revient à l’index. Sans query valide : recherche pour L-PBF/Astek, emploi pour les autres. Sans JS, le défaut HTML reste fonctionnel et un choix explicite des deux CV dans la langue courante reste disponible.
- Menu : correction d’une transition de visibilité qui pouvait faire sauter les liens lors d’un Tab immédiat après ouverture. Publication conserve son propre surlignage sur le parcours recherche.
- Capture FleetGuard agrandissable ; schémas fidèles pour les autres prototypes, sans capture fictive. Images sociales FR/EN régénérées. Métadonnées des fiches précisées.

## Fichiers et routes

| Sources | Rôle |
| --- | --- |
| `content/cvs.mjs`, `assets/cv/` | Mapping, libellés, empreintes, PDF originaux |
| `content/profiles.mjs`, `content/site.mjs` | Deux accueils, ordres, parcours, traduction |
| `content/projects.mjs`, `content/visuals.mjs` | Sept fiches et schémas FR/EN, catégories, métriques centralisées |
| `scripts/lib/pages.mjs`, `scripts/lib/components.mjs` | Composition commune, CV, contact, navigation et métadonnées |
| `script.js`, `styles.css` | Contexte URL, filtres, clavier, presse-papiers, rendu responsive |
| `scripts/build.mjs`, `scripts/check.mjs` | Alias CV, sortie autorisée, contrôles PDF/SEO/contenu |
| `scripts/browser-check.mjs`, `scripts/revision-check.mjs`, `package.json` | Vérifications navigateur existantes et ciblées |
| `README.md`, `INSTALLATION.md`, `docs/ASSETS.md`, `docs/SOURCES.md` | Maintenance et traçabilité |

HTML régénérés : `/`, `/en/`, `/pro/`, `/recherche/`, `/en/pro/`, `/en/research/`, les sept slugs sous `/projects/` et `/en/projects/`, et `/404.html`. Sitemap conservé : 18 URL canoniques sans query, doublons `index.html` ni date artificielle. Robots conserve l’indexation. La configuration Vercel reste inchangée.

## Vérifications exécutées

Environnement : Windows, Node.js 24.13.1, Playwright 1.58.2, Chromium 145.0.7632.6, serveur local `http://127.0.0.1:4173` servant `dist/`.

| Commande / contrôle | Résultat |
| --- | --- |
| `npm run assets:social` | Quatre images 1200 × 630 générées |
| `npm test` | Build réussi ; 21 pages, 788 références locales valides ; titres, ancres, ressources, traductions, ordres, canonical et alternates réciproques, OG et sitemap vérifiés |
| `npm run test:browser` | 452 contrôles existants réussis, puis suite ciblée réussie sur les 28 contextes projet × langue × parcours |
| PDF via HTTP | MIME `application/pdf`, SHA-256 et nombre de pages exacts pour les quatre CV ; les deux alias correspondent à emploi FR |
| Ouverture PDF | Les quatre documents ouverts dans le lecteur natif Chromium ; pagination 1/1/2/2 confirmée, captures examinées |
| Filtres | Contenu et compteur exacts pour chaque catégorie, langue et parcours ; ordre stable et `aria-pressed` correct |
| Navigation | Accès direct, rechargement, query absente/invalide, FR→EN→FR avec ancre, retour, suivant et fin d’index ; aucune erreur JS |
| Tolérance du script | Locale et bloc suivant retirés dans une réponse de test : les autres initialisations continuent |
| Clavier | Tab, Maj+Tab, Entrée, Échap, lien d’évitement, restitution du focus et changement de breakpoint ; navigation fermée `inert` |
| Presse-papiers | Succès, API absente et refus : retours accessibles, adresse mail toujours utilisable |
| Sans JavaScript | Quatre accueils et fiches représentatives dans les deux langues/deux profils ; contenu, preuves, contact et alternatives CV accessibles |
| Rendu | 320, 375, 390, 768, 1024, 1440 px ; texte à 200 % ; paysage 844 × 390 ; aucun débordement global détecté |
| 404 | Une URL inexistante renvoie réellement HTTP 404 ; liens de retour utilisables |
| Confidentialité de sortie | Archive, instructions, notes, rapports et sources internes exclus de `dist/` par liste de publication explicite |
| `git diff --check` | Aucun problème d’espacement |

Les captures complètes des quatre accueils à 390/1440 px, de FleetGuard (fiche dense) et de ServicePilot (schéma) ont été examinées. Des captures de premier écran et des détails complètent l’inspection. La qualification reste lisible sur mobile ; les cartes, schémas, index et contact se réorganisent. Les captures et résultats bruts restent dans `reports/`, ignoré par Git et exclu de la publication.

Contrastes calculés depuis les styles réellement affichés : 88 échantillons représentatifs (descriptions, textes secondaires, statuts, tags, métriques, boutons et fond sombre). Minimum observé 5,03:1 ; exigences 4,5:1 pour texte courant et 3:1 pour grand texte respectées dans cet échantillon. Ce contrôle ne constitue pas une certification WCAG complète ni un test avec lecteur d’écran.

## Performance locale

La suite enregistre les valeurs finales dans `reports/revision-results.json`. Conditions : contextes neufs, cache désactivé, viewport 390 × 844, CPU ralenti ×4, débit descendant 1,6 Mbit/s et latence 150 ms, une navigation par accueil. Observation initiale par PerformanceObserver, après un frame de composition réel.

Les quatre accueils ont présenté un LCP voisin de 1,1 s et un CLS initial d’environ 0,051. Les mesures exactes du dernier passage figurent ci-dessous. Ce sont des observations de laboratoire sur serveur local, pas des données terrain au 75e percentile ni un score Lighthouse. L’INP terrain n’a pas été mesuré. Aucun test de charge des projets applicatifs n’a été effectué.

| Accueil | LCP local | CLS initial |
| --- | ---: | ---: |
| /pro/ | 1.164 s | 0.051 |
| /recherche/ | 1.100 s | 0.051 |
| /en/pro/ | 1.216 s | 0.051 |
| /en/research/ | 1.084 s | 0.051 |

## Sources non vérifiables et limites

- **L-PBF** : absence de texte intégral/version auteur partageable. Le DOI redirige bien vers IEEE document 11603067, mais l’éditeur retourne HTTP 202 sans article exploitable. L’enrichissement numérique (effectifs, partitions, métriques, tableaux) attend cette source ; aucun chiffre n’a été inventé. La fiche qualitative et la référence sont livrées.
- **Captures ENSTA/ServicePilot** : aucune nouvelle capture réelle et partageable fournie ; schémas d’architecture fidèles utilisés comme prévu par le cahier des charges. Le scénario ServicePilot est explicitement illustratif.
- **LinkedIn** : réponse 999 limitant les robots ; destination conservée, accessibilité du profil non confirmée par ce contrôle. Les quatre dépôts GitHub, la model card, l’architecture ServicePilot, ENSTA et Coursera répondent en 200.
- **Projets sous-jacents** : aucun entraînement, test logiciel applicatif ou benchmark scientifique réexécuté. Les résultats sont attribués aux sources ; les contrôles réalisés portent sur le portfolio.
- **Hébergement** : routage et PDF testés sur le serveur local du dépôt, pas sur une nouvelle version Vercel.

## État de livraison

Branche existante `main`, modifications dans l’arbre de travail, sans commit, push, fusion ni déploiement de production. L’archive initiale reste intacte et non suivie. Les HTML générés sont prêts à être versionnés avec les sources ; `dist/` contient la version publiable. Aucun rapport privé n’a été ajouté.

L’aperçu local a été démarré et testé, puis arrêté après vérification. Pour le relancer : `npm run preview`, puis ouvrir `http://127.0.0.1:4173`. Après toute modification de source : `npm run build`.
