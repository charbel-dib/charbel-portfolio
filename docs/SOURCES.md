# Sources éditoriales

Révision de présentation du 17 octobre 2026 : les noms et tags ont été localisés ; les schémas reformulent les démarches déjà décrites ci-dessous. Aucun résultat expérimental, déploiement ou nouvelle source externe n’a été ajouté. Les métriques FleetGuard sont désormais structurées dans un objet commun et leur coût est calculé à partir des valeurs documentées.

Consultation : 16 octobre 2026. Les chiffres sont attribués au document qui les publie ; cette refonte ne réexécute pas les entraînements ML ou les évaluations des projets sous-jacents.

| Sujet | Source | Utilisation |
| --- | --- | --- |
| Site existant | https://charbel-dib.vercel.app/ | Audit du contenu, de la navigation et de l’apparence |
| Répertoire des projets | https://api.github.com/users/charbel-dib/repos?per_page=100 | Identification des quatre dépôts applicatifs publics et du portfolio |
| FleetGuard | https://github.com/charbel-dib/fleetguard | README, code et structure du projet |
| Résultats FleetGuard | https://github.com/charbel-dib/fleetguard/blob/main/docs/results/release-04.md | Rappel 95,73 %, précision 43,05 %, 16 FN, 475 FP sur 16 000 observations du test officiel ; coût en unités du challenge |
| Limite cloud FleetGuard | https://github.com/charbel-dib/fleetguard/blob/main/docs/results/cloud-07.json | AWS préparé ; `aws_deployment_observed: false` dans ce rapport |
| ServicePilot | https://github.com/charbel-dib/servicepilot | SDK, trois outils de lecture, validation serveur, modes hors ligne et OpenAI, limites du prototype |
| Assistant ENSTA | https://github.com/charbel-dib/ensta_chatbot | README et `app.py` : corpus, index FAISS, sessions, citations, escalade, renouvellement |
| ATLAS | https://github.com/charbel-dib/atlas-ai | README, arbre de fichiers, modèles, downloader et parser SEC ; état actuel d’ingestion |
| SPASEA | https://www.ensta.fr/actualites/lia-au-service-des-marins-avec-le-hackathon-spasea | Source institutionnelle du premier prix PosAIdon et du contexte du hackathon |
| Équipe PosAIdon | https://fr.linkedin.com/posts/sei-bayle-9b823b347_hackathon-winner-defensetech-activity-7405256238898311168-o5w5 | Publication d’un coéquipier citant Charbel Dib |
| Publication L-PBF | https://doi.org/10.1109/3SCEA68071.2026.11603067 | Titre, référence de publication, DOI |
| Publication L-PBF, contexte | https://www.linkedin.com/posts/rimahleiss_flashback-to-the-2026-ieee-international-activity-7453487410535063554-Exty | Publication de la coautrice Rima Hleiss sur l’article et sa présentation |
| Parcours et contributions | CV fourni par Charbel Dib | Formation ENSTA, stages, contributions individuelles et coordonnées professionnelles |

## Règles de rédaction

- Présenter PosAIdon comme un projet d’équipe. Ne pas attribuer la totalité de la réalisation à une seule personne.
- Présenter ATLAS comme un travail en cours, sans prétendre que l’assistant financier complet est livré.
- FleetGuard : ne pas transformer des unités du challenge en euros ni des résultats sur données publiques en économies industrielles.
- ServicePilot : distinguer le workflow déterministe du mode utilisant un vrai LLM. Les tests hors ligne ne sont pas une mesure de qualité du fournisseur LLM.
- Astek : résumé de contributions déjà présentes dans le CV ; pas de rapport interne, de corpus interne ni de nouvelle divulgation de résultats détaillés.
- Le classifieur LoRA Astek est présenté comme préexistant et évalué, pas comme un modèle entraîné intégralement par Charbel.
- Aucun nombre d’utilisateurs, client, témoignage, gain financier ou déploiement non documenté n’a été ajouté.


## Ajout des parcours professionnel / recherche

- Le contenu de chaque projet reste partagé entre les deux entrées ; seuls l’ordre, les introductions et le contexte de candidature changent.
- Les deux stages sont présentés par question, méthode, contribution et limites. Astek reste au niveau des contributions déjà décrites publiquement : aucun rapport interne n’est inclus dans le site ou l’archive.
- Publication : titre, auteurs Charbel Dib et Rima Hleiss, conférence IEEE 3SCEA et DOI. Aucun facteur d’impact, classement de conférence ou gain quantitatif non vérifié n’est ajouté.
- Google Data Analytics : PDF original fourni dans cette conversation, au nom de Charbel Dib, daté du 23 mars 2024 ; huit cours, SQL, R, Tableau et tableurs. Vérification : https://coursera.org/verify/professional-cert/PABFJT9RQLLB . Le certificat atteste une formation ; il n’est pas présenté comme un diplôme universitaire ou comme une certification avancée en IA.
- Le rapport ENSTA fourni concerne l’assistant documentaire ; il n’est pas utilisé comme preuve de résultats du stage CESI.
