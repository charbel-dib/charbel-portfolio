// Public editorial content. Technical claims are tied to the sources below.
export const fleetguardMetrics = {
  observations: 16000, positives: 375, truePositives: 369, recall: 98.4, precision: 40.02,
  missedFailures: 6, falseAlerts: 553, missedFailureCost: 500, falseAlertCost: 10
};
const totalCost = fleetguardMetrics.missedFailures * fleetguardMetrics.missedFailureCost
  + fleetguardMetrics.falseAlerts * fleetguardMetrics.falseAlertCost;
export function fleetguardResult(lang) {
  const number = value => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB').format(value);
  const m = fleetguardMetrics;
  return lang === 'fr'
    ? `Sur les ${number(m.observations)} observations du test officiel : ${number(m.recall)} % de rappel et ${number(m.precision)} % de précision. ${m.truePositives} cas APS détectés sur ${m.positives} ; ${m.missedFailures} défaillances manquées et ${m.falseAlerts} fausses alertes. Coût : ${m.falseAlertCost} × ${m.falseAlerts} + ${m.missedFailureCost} × ${m.missedFailures} = ${number(totalCost)}, sous le vainqueur du challenge IDA 2016 (9 920) et contre 12 750 pour ma version précédente. Unités du challenge, pas des euros économisés ; rapport complet dans le dépôt.`
    : `On the ${number(m.observations)}-row official test: ${number(m.recall)}% recall and ${number(m.precision)}% precision. ${m.truePositives} APS cases detected out of ${m.positives}; ${m.missedFailures} missed failures and ${m.falseAlerts} false alarms. Cost: ${m.falseAlertCost} × ${m.falseAlerts} + ${m.missedFailureCost} × ${m.missedFailures} = ${number(totalCost)}, below the IDA 2016 challenge winner (9,920) and down from 12,750 for my previous release. Challenge units, not euros saved; full report in the repository.`;
}
export const projects = [
  {
    "slug": "fleetguard",
    "name": {
      "fr": "FleetGuard",
      "en": "FleetGuard"
    },
    "year": "2026",
    "kind": {
      "fr": "Projet personnel · ML appliqué",
      "en": "Personal project · Applied ML"
    },
    "descriptor": {
      "fr": "Classification de défaillances guidée par les coûts",
      "en": "Cost-aware failure classification"
    },
    "metrics": fleetguardMetrics,
    "status": {
      "fr": "Modèle évalué · API & interface",
      "en": "Evaluated model · API & interface"
    },
    "headline": {
      "fr": "Classifier les défaillances APS en tenant compte du coût des erreurs.",
      "en": "Classify APS failures while accounting for the cost of errors."
    },
    "summary": {
      "fr": "Sur le jeu public Scania APS (système de pression d’air), classifier les défaillances et choisir un seuil selon le coût des erreurs, puis rendre la décision inspectable dans une application.",
      "en": "On the public Scania APS (Air Pressure System) dataset, classify failures and choose a threshold based on error costs, then make the decision inspectable in an application."
    },
    "tags": {
      "fr": [
        "Python",
        "XGBoost",
        "scikit-learn",
        "FastAPI",
        "React"
      ],
      "en": [
        "Python",
        "XGBoost",
        "scikit-learn",
        "FastAPI",
        "React"
      ]
    },
    "role": {
      "fr": "Conception du pipeline ML, protocole d’évaluation, API et interface de consultation.",
      "en": "ML pipeline, evaluation protocol, API and review interface."
    },
    "problem": {
      "fr": "Sur un jeu déséquilibré, un bon taux d’exactitude peut masquer les défaillances les plus coûteuses. Le défi Scania attribue un coût de 10 à une fausse alerte et de 500 à une panne APS manquée. C’est ce compromis qui doit guider la décision.",
      "en": "On an imbalanced dataset, high accuracy can hide the most costly failures. The Scania challenge assigns a cost of 10 to a false alarm and 500 to a missed APS failure. That trade-off should drive the decision."
    },
    "decisions": {
      "fr": [
        [
          "Évaluer avant d’optimiser",
          "Baselines explicites et validation croisée par groupes de doublons sur les 60 000 lignes d’entraînement ; le seuil minimise le coût du challenge sur les prédictions hors pli."
        ],
        [
          "Figer une décision complète",
          "Le modèle et son seuil sont figés avec leurs empreintes avant toute lecture du test officiel, qui n’est évalué qu’une fois."
        ],
        [
          "Rendre le modèle utilisable",
          "API FastAPI, revue de lots CSV et interface React. Les scores et les données manquantes restent visibles pour interpréter une décision."
        ]
      ],
      "en": [
        [
          "Evaluate before optimising",
          "Explicit baselines and duplicate-aware grouped cross-validation on all 60,000 training rows; the threshold minimises the challenge cost on out-of-fold scores."
        ],
        [
          "Freeze the entire decision",
          "Model and threshold are frozen with checksums before the official test is read, and the test is scored only once."
        ],
        [
          "Make the model usable",
          "FastAPI service, CSV batch review and a React interface. Scores and missing values remain visible to help interpret decisions."
        ]
      ]
    },
    "result": {fr: fleetguardResult("fr"), en: fleetguardResult("en")},
    "value": {
      "fr": "Relier une métrique ML à une décision opérationnelle, sans dissimuler le prix à payer en fausses alertes.",
      "en": "Connect an ML metric to an operational decision while keeping the false-alarm trade-off visible."
    },
    "limit": {
      "fr": "Il s’agit d’une classification sur un jeu public anonymisé, pas d’une prévision de panne : ces résultats ne suffisent pas à valider un usage sur une flotte réelle. Le modèle a été déployé sur AWS (CloudFront, ECS Fargate, rôles GitHub OIDC) puis l’environnement a été éteint pour limiter les coûts ; la démo publique tourne sur Hugging Face. L’écart avec le vainqueur reste dans l’intervalle de bootstrap du coût (6 410 à 11 160).",
      "en": "This is classification on an anonymised public dataset, not failure forecasting: the results are not enough to validate use on a real fleet. The model was deployed on AWS (CloudFront, ECS Fargate, GitHub OIDC roles), then the environment was shut down to limit costs; the public demo runs on Hugging Face. The gap to the winner lies within the cost bootstrap interval (6,410 to 11,160)."
    },
    "links": [
      {
        "label": {
          "fr": "Code source",
          "en": "Source code"
        },
        "url": "https://github.com/charbel-dib/fleetguard"
      },
      {
        "label": {
          "fr": "Résultats & model card",
          "en": "Results & model card"
        },
        "url": "https://github.com/charbel-dib/fleetguard/blob/main/docs/results/fulltrain-08.md"
      },
      {
        "label": {
          "fr": "Démo en ligne",
          "en": "Live demo"
        },
        "url": "https://huggingface.co/spaces/Charbeld77/fleetguard"
      }
    ],
    "image": "fleetguard.webp",
    "imageAlt": {
      "fr": "Interface FleetGuard : chargement d’un lot et consultation du modèle figé.",
      "en": "FleetGuard interface: batch upload and frozen model information."
    },
    "caption": {
      "fr": "Capture de l’interface publiée dans le dépôt FleetGuard.",
      "en": "Interface screenshot published in the FleetGuard repository."
    },
    "categories": [
      "ml",
      "data"
    ],
    "evaluation": {
      "fr": "Moyenne de trois modèles de gradient boosting pondérés, entraînés sur tout le jeu d’entraînement, hyperparamètres fixés a priori. Une panne manquée coûte autant que 50 fausses alertes : la précision de 40 % est le compromis voulu, pas un défaut.",
      "en": "Average of three class-weighted gradient boosting models trained on the full training set, with hyperparameters fixed a priori. A missed failure costs as much as 50 false alarms: 40% precision is the intended trade-off, not a defect."
    }
  },
  {
    "slug": "posaidon",
    "name": {
      "fr": "PosAIdon",
      "en": "PosAIdon"
    },
    "year": "2025",
    "kind": {
      "fr": "Projet d’équipe · Hackathon SPASEA",
      "en": "Team project · SPASEA hackathon"
    },
    "descriptor": {
      "fr": "Copilote maritime multi-sources",
      "en": "Maritime copilot combining multiple sources"
    },
    "status": {
      "fr": "1er prix · SPASEA 2025",
      "en": "1st prize · SPASEA 2025"
    },
    "headline": {
      "fr": "Voir ce qu’un signal seul ne raconte pas.",
      "en": "See what a single signal cannot reveal."
    },
    "summary": {
      "fr": "Un copilote maritime qui croise les positions de navires AIS (système d’identification automatique), les signaux RF (radiofréquences) et les éphémérides satellites pour aider à comprendre une situation.",
      "en": "A maritime copilot combining vessel positions from AIS (Automatic Identification System), RF (radio-frequency) signals and satellite ephemerides to help interpret a situation."
    },
    "tags": {
      "fr": [
        "Agents IA",
        "AIS",
        "RF",
        "Fusion de données"
      ],
      "en": [
        "AI agents",
        "AIS",
        "RF",
        "Data fusion"
      ]
    },
    "role": {
      "fr": "Contribution aux outils agentiques, à la corrélation multi-sources et aux rapports d’aide à la décision, au sein de l’équipe PosAIdon.",
      "en": "Contributed agent tools, multi-source correlation and decision-support reports as part of the PosAIdon team."
    },
    "problem": {
      "fr": "Un navire qui ne transmet plus sa position AIS n’est pas nécessairement suspect. L’enjeu est de croiser plusieurs observations pour fournir à un opérateur une situation explicable, plutôt qu’une alerte isolée.",
      "en": "A vessel that stops transmitting its AIS position is not necessarily suspicious. The challenge is to combine observations into an explainable situation for an operator, rather than an isolated alert."
    },
    "decisions": {
      "fr": [
        [
          "Croiser les observations",
          "Exploiter les trajectoires AIS, les signaux radiofréquences et les éphémérides satellites à travers des outils dédiés."
        ],
        [
          "Donner une place à l’opérateur",
          "Une interface de type assistant permet d’interroger la situation et d’obtenir une synthèse des éléments analysés."
        ],
        [
          "Livrer en équipe et sous contrainte",
          "Concentrer le prototype sur un scénario démontrable et présenter l’approche à un jury technique et opérationnel."
        ]
      ],
      "en": [
        [
          "Combine observations",
          "Use dedicated tools for AIS tracks, radio-frequency signals and satellite ephemerides."
        ],
        [
          "Keep the operator involved",
          "An assistant-style interface supports questions about the situation and summarises the analysed evidence."
        ],
        [
          "Deliver together under time pressure",
          "Focus the prototype on a demonstrable scenario and present the approach to a technical and operational jury."
        ]
      ]
    },
    "result": {
      "fr": "Premier prix du hackathon SPASEA 2025, organisé par Naval Group et la DGA en partenariat avec l’ENSTA. L’événement et le classement de l’équipe sont documentés par l’ENSTA.",
      "en": "First prize at the 2025 SPASEA hackathon, organised by Naval Group and the DGA in partnership with ENSTA. ENSTA documents the event and the team’s award."
    },
    "value": {
      "fr": "Faire le lien entre des données hétérogènes, une analyse technique et une question concrète posée par un opérateur.",
      "en": "Bridge heterogeneous data, technical analysis and a concrete question from an operator."
    },
    "limit": {
      "fr": "Prototype de hackathon réalisé en équipe, non validé en conditions opérationnelles en mer. Le code du prototype n’est pas public.",
      "en": "A team-built hackathon prototype, not validated under operational conditions at sea. The prototype code is not public."
    },
    "links": [
      {
        "label": {
          "fr": "L’article de l’ENSTA",
          "en": "ENSTA’s event report"
        },
        "url": "https://www.ensta.fr/actualites/lia-au-service-des-marins-avec-le-hackathon-spasea"
      }
    ],
    "image": "posaidon.webp",
    "imageAlt": {
      "fr": "L’équipe PosAIdon sur scène lors du hackathon SPASEA 2025.",
      "en": "The PosAIdon team on stage at the SPASEA 2025 hackathon."
    },
    "caption": {
      "fr": "L’équipe PosAIdon, lauréate de SPASEA 2025. Photo publiée par l’ENSTA.",
      "en": "The PosAIdon team, SPASEA 2025 winners. Photo published by ENSTA."
    },
    "categories": [
      "agents",
      "data"
    ],
    "evaluation": {
      "fr": "Démonstration et présentation d’un prototype d’équipe au jury du hackathon. Le premier prix distingue ce travail collectif ; il ne mesure pas une performance de détection en mer.",
      "en": "A team prototype demonstrated and presented to the hackathon jury. First prize recognises this collective work; it does not measure detection performance at sea."
    }
  },
  {
    "slug": "servicepilot",
    "name": {
      "fr": "ServicePilot",
      "en": "ServicePilot"
    },
    "year": "2026",
    "kind": {
      "fr": "Projet personnel · Agents & backend",
      "en": "Personal project · Agents & backend"
    },
    "descriptor": {
      "fr": "Agent de support avec validation humaine",
      "en": "Support agent with human approval"
    },
    "status": {
      "fr": "Prototype local · SDK Python · données fictives",
      "en": "Local prototype · Python SDK · synthetic data"
    },
    "headline": {
      "fr": "Un workflow de support où l’humain autorise l’action.",
      "en": "A support workflow where a human authorises the action."
    },
    "summary": {
      "fr": "Un assistant de support qui rapproche procédures, état des services et incidents, puis demande une validation explicite avant de créer un ticket.",
      "en": "A support assistant that combines procedures, service health and incidents, then requires explicit approval before creating a ticket."
    },
    "tags": {
      "fr": [
        "LangGraph",
        "FastAPI",
        "SQLite",
        "FAISS"
      ],
      "en": [
        "LangGraph",
        "FastAPI",
        "SQLite",
        "FAISS"
      ]
    },
    "role": {
      "fr": "Conception du SDK Python, du workflow agentique, des connecteurs et du parcours de validation. Développement de l’API.",
      "en": "Python SDK, agent workflow, connectors and approval experience. API development."
    },
    "problem": {
      "fr": "Répondre à une question de support demande souvent de consulter plusieurs outils. Donner à un agent le droit d’écrire dans ces outils introduit une autre question : qui autorise exactement quelle action ?",
      "en": "Answering a support question often requires multiple tools. Giving an agent write access introduces another question: who authorises exactly which action?"
    },
    "decisions": {
      "fr": [
        [
          "Trois outils de lecture",
          "Recherche de procédures autorisées, consultation d’une API de statut et recherche d’incidents. Le modèle n’a pas d’outil direct de création de ticket."
        ],
        [
          "Une proposition avant l’action",
          "Le contenu proposé est figé, associé à un propriétaire, à une empreinte et à une expiration. Le serveur vérifie la validation et les droits au moment de l’écriture."
        ],
        [
          "Un workflow que l’on peut reprendre",
          "LangGraph et SQLite conservent l’état. La création du ticket est idempotente, pour éviter les doublons lors d’une reprise."
        ]
      ],
      "en": [
        [
          "Three read-only tools",
          "Search authorised procedures, call a status API and retrieve incidents. The model has no direct ticket-creation tool."
        ],
        [
          "A proposal before an action",
          "The proposed content is frozen and linked to an owner, digest and expiry. The server checks approval and permissions when writing."
        ],
        [
          "A resumable workflow",
          "LangGraph and SQLite persist state. Ticket creation is idempotent to avoid duplicates on resumption."
        ]
      ]
    },
    "result": {
      "fr": "Un SDK, une API et un espace de support exécutables localement, avec tests, scénarios d’évaluation, Docker Compose et workflows CI. Le mode par défaut est déterministe et sans LLM ; un adaptateur OpenAI est disponible en option.",
      "en": "A locally runnable SDK, API and support workspace, with tests, evaluation scenarios, Docker Compose and CI workflows. The default mode is deterministic and uses no LLM; an optional OpenAI adapter is available."
    },
    "value": {
      "fr": "Traiter les autorisations et la validation comme des règles du logiciel, indépendantes des instructions données au modèle.",
      "en": "Treat permissions and approval as software rules, independent of instructions given to the model."
    },
    "limit": {
      "fr": "Preuve de concept sur données fictives, avec des jetons statiques et une base SQLite locale. Mes tests hors ligne vérifient les règles du workflow ; ils ne mesurent ni la qualité d’un vrai modèle, ni une résistance générale aux injections de prompt.",
      "en": "Proof of concept on fictional data, with static tokens and a local SQLite database. My offline tests check the workflow rules; they measure neither real-model quality nor general prompt-injection resistance."
    },
    "links": [
      {
        "label": {
          "fr": "Code source",
          "en": "Source code"
        },
        "url": "https://github.com/charbel-dib/servicepilot"
      },
      {
        "label": {
          "fr": "Architecture & limites",
          "en": "Architecture & limits"
        },
        "url": "https://github.com/charbel-dib/servicepilot/blob/main/docs/architecture.md"
      }
    ],
    "categories": [
      "agents",
      "rag"
    ],
    "evaluation": {
      "fr": "J’ai écrit des tests logiciels et des scénarios hors ligne, exécutés avec Docker Compose et en CI. Ils couvrent le workflow et ses règles d’autorisation, pas la qualité d’un LLM en conditions réelles.",
      "en": "I wrote software tests and offline scenarios, run with Docker Compose and in CI. They cover the workflow and its authorisation rules, not real-world LLM quality."
    },
    "example": {
      "fr": "Scénario illustratif sur données fictives : un service est indisponible. Le workflow consulte la procédure, le statut et les incidents, propose un ticket figé, puis attend l’accord de l’utilisateur. Le serveur vérifie les droits avant de créer le ticket.",
      "en": "Illustrative scenario using synthetic data: a service is unavailable. The workflow consults procedures, health and incidents, proposes a frozen ticket, then waits for user approval. The server checks permissions before creating the ticket."
    }
  },
  {
    "slug": "fact-checking",
    "name": {
      "fr": "Fact-checking climatique",
      "en": "Climate fact-checking"
    },
    "year": "2026",
    "kind": {
      "fr": "Astek Research Network · Stage R&D",
      "en": "Astek Research Network · R&D internship"
    },
    "status": {
      "fr": "Stage de fin d’études · mars–septembre 2026",
      "en": "Final-year internship · March–September 2026"
    },
    "descriptor": {
      "fr": "Évaluation d’un pipeline RAG, étape par étape",
      "en": "Stage-by-stage evaluation of a RAG pipeline"
    },
    "headline": {
      "fr": "Évaluer un pipeline de fact-checking, étape par étape.",
      "en": "Evaluate a fact-checking pipeline, stage by stage."
    },
    "summary": {
      "fr": "Pendant mon stage de fin d’études chez Astek, j’ai comparé des stratégies de segmentation, de recherche hybride et de reranking, puis étudié l’extraction de preuves et la classification de déclarations climatiques. L’objectif était d’identifier les pertes de qualité et la propagation des erreurs entre les étapes du pipeline RAG (génération augmentée par recherche documentaire).",
      "en": "During my final-year internship at Astek, I compared chunking, hybrid retrieval and reranking strategies, then studied evidence extraction and climate-claim classification. The aim was to identify quality losses and error propagation across the RAG (retrieval-augmented generation) pipeline."
    },
    "tags": {
      "fr": [
        "RAG",
        "DPR + BM25",
        "Reranking",
        "Phi-3",
        "Évaluation"
      ],
      "en": [
        "RAG",
        "DPR + BM25",
        "Reranking",
        "Phi-3",
        "Evaluation"
      ]
    },
    "role": {
      "fr": "Comparaison des configurations, cadre d’évaluation commun, prompts d’extraction, analyse d’erreurs et organisation des expériences.",
      "en": "Configuration comparisons, shared evaluation framework, extraction prompts, error analysis and experiment organisation."
    },
    "problem": {
      "fr": "Trouver le bon document ne suffit pas : le système doit retrouver le bon passage, en extraire une preuve pertinente et classifier la déclaration sans amplifier les erreurs des étapes précédentes.",
      "en": "Finding the right document is not enough: the system must retrieve the right passage, extract relevant evidence and classify the claim without amplifying upstream errors."
    },
    "decisions": {
      "fr": [
        [
          "Comparer les unités de recherche",
          "Benchmark de stratégies de segmentation, recherche hybride DPR + BM25 et comparaison de rerankers."
        ],
        [
          "Séparer les erreurs du pipeline",
          "Évaluer la recherche, l’extraction et la classification pour comprendre à quelle étape la qualité se dégrade."
        ],
        [
          "Rendre les expériences reproductibles",
          "Protocoles communs, métriques de retrieval et de classification, expériences GPU avec Docker, cache et logs."
        ]
      ],
      "en": [
        [
          "Compare retrieval units",
          "Benchmark chunking strategies, DPR + BM25 hybrid retrieval and rerankers."
        ],
        [
          "Separate pipeline errors",
          "Evaluate retrieval, extraction and classification to identify where quality deteriorates."
        ],
        [
          "Make experiments reproducible",
          "Shared protocols, retrieval and classification metrics, GPU experiments with Docker, caching and logs."
        ]
      ]
    },
    "result": {
      "fr": "Une méthode de diagnostic et de comparaison expérimentale, de la recherche documentaire à la décision finale. J’ai évalué le classifieur Phi-3, déjà adapté par LoRA dans des travaux antérieurs ; je ne l’ai pas fine-tuné.",
      "en": "A diagnostic and experimental comparison method, from retrieval to the final decision. I evaluated the Phi-3 classifier, already LoRA-adapted in earlier work; I did not fine-tune it."
    },
    "value": {
      "fr": "Identifier ce qui améliore réellement la réponse finale, au-delà d’un score isolé sur un composant.",
      "en": "Identify what actually improves the final answer, beyond an isolated component score."
    },
    "limit": {
      "fr": "Vue d’ensemble de mes contributions : le rapport, les données internes et les résultats détaillés restent confidentiels.",
      "en": "An overview of my contributions: the report, internal data and detailed results remain confidential."
    },
    "links": [
      {
        "cv": true,
        "label": {
          "fr": "CV",
          "en": "CV"
        }
      }
    ],
    "categories": [
      "rag",
      "ml"
    ],
    "evaluation": {
      "fr": "NDCG mesure la qualité du classement des passages, le rappel leur couverture et la macro-F1 l’équilibre de la classification entre classes. Séparer ces mesures permet de comprendre pourquoi un meilleur classement ne garantit pas une meilleure décision finale.",
      "en": "NDCG measures passage-ranking quality, recall measures coverage, and macro-F1 balances classification performance across classes. Separating these measures helps explain why better rankings do not guarantee a better final decision."
    }
  },
  {
    "slug": "ensta-assistant",
    "name": {
      "fr": "Assistant ENSTA",
      "en": "ENSTA assistant"
    },
    "year": "2026",
    "kind": {
      "fr": "Projet académique · Assistant documentaire",
      "en": "Academic project · Document assistant"
    },
    "descriptor": {
      "fr": "Réponses documentaires bilingues et sourcées",
      "en": "Bilingual answers with source citations"
    },
    "status": {
      "fr": "Prototype · Corpus web, PDF & XLSX",
      "en": "Prototype · Web, PDF & XLSX corpus"
    },
    "headline": {
      "fr": "Un assistant documentaire bilingue, de la collecte aux réponses sourcées.",
      "en": "A bilingual document assistant, from ingestion to sourced answers."
    },
    "summary": {
      "fr": "Un assistant bilingue qui indexe les informations du campus, répond avec des citations et prévoit une escalade lorsqu’il ne dispose pas d’une réponse suffisante. Le prototype utilise un pipeline RAG (génération augmentée par recherche documentaire).",
      "en": "A bilingual assistant indexing campus information, answering with citations and providing escalation when it cannot answer adequately. The prototype uses a RAG (retrieval-augmented generation) pipeline."
    },
    "tags": {
      "fr": [
        "FastAPI",
        "FAISS",
        "multilingual-E5",
        "Python"
      ],
      "en": [
        "FastAPI",
        "FAISS",
        "multilingual-E5",
        "Python"
      ]
    },
    "role": {
      "fr": "Pipeline documentaire, service de réponse, gestion des sessions et intégration web.",
      "en": "Document pipeline, answer service, session management and web integration."
    },
    "problem": {
      "fr": "Les informations d’un campus sont réparties entre pages web, PDF et tableaux. Il faut les rendre interrogeables tout en conservant les sources et en tenant compte de leur mise à jour.",
      "en": "Campus information is spread across webpages, PDFs and spreadsheets. It needs to become searchable while retaining source references and handling updates."
    },
    "decisions": {
      "fr": [
        [
          "Un pipeline distinct du service",
          "Collecter, nettoyer, segmenter et indexer les documents en amont du service de réponse."
        ],
        [
          "Des sources dans la réponse",
          "Embeddings multilingual-E5, index FAISS, seuil de recherche et citations pour rattacher la réponse aux documents."
        ],
        [
          "Prévoir le renouvellement du corpus",
          "Reconstruction quotidienne du corpus web et rechargement de l’index sans redémarrer le service. Les mises à jour des PDF et XLSX sont manuelles, selon le rapport académique."
        ]
      ],
      "en": [
        [
          "Separate ingestion from serving",
          "Collect, clean, chunk and index documents upstream of the answering service."
        ],
        [
          "Keep sources in the answer",
          "Multilingual-E5 embeddings, a FAISS index, retrieval threshold and citations connect answers to documents."
        ],
        [
          "Account for corpus updates",
          "Daily web-corpus rebuild and index reloading without restarting the service. PDF and XLSX updates are manual, according to the academic report."
        ]
      ]
    },
    "result": {
      "fr": "Sur 60 questions annotées en français et en anglais, la bonne source fait partie des 8 passages transmis au modèle dans 55 cas (91,7 %). Un reranker fait passer la bonne source dans les 3 premiers de 81,2 % à 89,6 % des cas. Un seuil recalibré à 0,84 écarte 10 questions hors sujet sur 11 jamais vues, en gardant 10 questions valides sur 12. Prototype de bout en bout : API FastAPI, sessions, interface de chat, widget intégrable, refus et escalade par email.",
      "en": "On 60 annotated questions in French and English, the right source is among the 8 passages sent to the model in 55 cases (91.7%). A reranker lifts the right source into the top 3 from 81.2% to 89.6% of cases. A threshold recalibrated to 0.84 turns away 10 of 11 unseen off-topic questions while keeping 10 of 12 valid ones. End-to-end prototype: FastAPI service, sessions, chat interface, embeddable widget, refusal and email escalation."
    },
    "value": {
      "fr": "Passer d’une collection de documents à un service consultable dont les réponses restent rattachées à leur origine.",
      "en": "Turn a document collection into a usable service whose answers remain connected to their origin."
    },
    "limit": {
      "fr": "Prototype académique, non déployé officiellement par l’école. Le premier jeu de questions s’est révélé optimiste : sur des questions jamais vues, la bonne source n’arrive dans le contexte que dans 83 % des cas, contre 94 %. Le seuil de 0,84 a été choisi après avoir vu les deux jeux. La qualité des réponses elles-mêmes reste à mesurer.",
      "en": "Academic prototype, not officially deployed by the school. The first question set turned out optimistic: on unseen questions, the right source reaches the context in 83% of cases, versus 94%. The 0.84 threshold was chosen after seeing both sets. Answer quality itself is still to be measured."
    },
    "links": [
      {
        "label": {
          "fr": "Code source",
          "en": "Source code"
        },
        "url": "https://github.com/charbel-dib/ensta_chatbot"
      },
      {
        "label": {
          "fr": "Résultats de l’évaluation",
          "en": "Evaluation results"
        },
        "url": "https://github.com/charbel-dib/ensta_chatbot#results-november-2026-retrieval"
      }
    ],
    "categories": [
      "rag",
      "data"
    ],
    "evaluation": {
      "fr": "Un jeu principal de 60 questions et un jeu de contrôle de 23 questions jamais vues, tirés du corpus indexé et relus un à un, avec source et faits attendus ; mesures Hit@k et MRR, avec et sans reranking. Avec si peu de questions, un écart de quelques points n’est pas significatif. Les citations, le seuil de similarité, le refus et la transmission humaine sont des mécanismes de contrôle, pas une garantie d’absence d’hallucinations. Projet de 3A encadré par le Dr Abdelmalek Toumi.",
      "en": "A 60-question main set and a 23-question held-out set of unseen questions, drawn from the indexed corpus and reviewed one by one, with expected source and facts; Hit@k and MRR, with and without reranking. With so few questions, a gap of a few points is not significant. Citations, a similarity threshold, refusal and human escalation are controls, not a guarantee against hallucinations. Final-year project supervised by Dr Abdelmalek Toumi."
    }
  },
  {
    "slug": "algorithm-tags",
    "name": {
      "fr": "Algorithm tags",
      "en": "Algorithm tags"
    },
    "year": "2026",
    "kind": {
      "fr": "Projet personnel · Classification multi-label",
      "en": "Personal project · Multi-label classification"
    },
    "descriptor": {
      "fr": "Énoncé, solution Python et AST",
      "en": "Statement, Python solution and AST"
    },
    "status": {
      "fr": "Terminé · validation croisée",
      "en": "Completed · cross-validated"
    },
    "headline": {
      "fr": "Prédire les tags algorithmiques d’un problème de programmation à partir de son énoncé et de sa solution.",
      "en": "Predict the algorithm tags of a programming problem from its statement and its solution."
    },
    "summary": {
      "fr": "4 982 problèmes Codeforces, 8 tags, dont 46 % sans aucun tag : F1 macro9 de 67,5 en validation croisée contre 64,4 pour un SVM sur l’énoncé seul.",
      "en": "4,982 Codeforces problems, 8 tags, 46% with no tag at all: macro9 F1 of 67.5 in cross-validation versus 64.4 for a statement-only SVM."
    },
    "tags": {
      "fr": ["Python", "scikit-learn", "TF-IDF", "AST Python", "pytest"],
      "en": ["Python", "scikit-learn", "TF-IDF", "Python AST", "pytest"]
    },
    "role": {
      "fr": "Projet individuel : exploration, features, protocole d’évaluation, modèles, CLI et tests.",
      "en": "Individual project: exploration, features, evaluation protocol, models, CLI and tests."
    },
    "problem": {
      "fr": "Un problème peut avoir plusieurs tags ou aucun. Un modèle qui tague tout semble bon sur les tags fréquents mais se trompe sur près de la moitié des problèmes.",
      "en": "A problem can have several tags or none. A model that tags everything looks good on frequent tags but is wrong on almost half of the problems."
    },
    "decisions": {
      "fr": [
        ["Mesurer aussi l’absence de tag", "F1 macro9 : les 8 tags plus l’état « aucun tag », traité comme une 9e classe et utilisé comme critère de sélection."],
        ["Lire le code, pas seulement l’énoncé", "Six blocs de features, dont les jetons de l’AST Python de la solution, la difficulté et les exemples d’entrée/sortie."],
        ["Préférer le modèle simple quand il suffit", "Environ 130 variantes essayées (LightGBM, MLP, embeddings gelés, stacking) ; aucune ne justifiait sa complexité face aux SVM linéaires."]
      ],
      "en": [
        ["Measure the no-tag case too", "Macro9 F1: the 8 tags plus the no-tag state, treated as a 9th class and used as the selection criterion."],
        ["Read the code, not only the statement", "Six feature blocks, including Python AST tokens from the solution, difficulty and input/output examples."],
        ["Keep the simple model when it is enough", "About 130 variants tried (LightGBM, MLP, frozen embeddings, stacking); none justified its complexity over linear SVMs."]
      ]
    },
    "result": {
      "fr": "F1 macro9 de 67,5 en validation croisée contre 64,4 pour la référence, devant à chacune des 4 répétitions ; 65,7 contre 64,6 sur le test, tenu à l’écart de toute décision.",
      "en": "Macro9 F1 of 67.5 in cross-validation versus 64.4 for the baseline, ahead in each of the 4 repeats; 65.7 versus 64.6 on the test set, kept out of every decision."
    },
    "value": {
      "fr": "Choisir la métrique qui reflète l’usage réel avant de choisir le modèle.",
      "en": "Choose the metric that reflects real use before choosing the model."
    },
    "limit": {
      "fr": "Sur le test seul, l’écart (1 point) reste dans l’intervalle de confiance (±2,5 points) : c’est pourquoi les choix reposent sur la validation croisée. Les confusions trees/graphs et number theory/math viennent en partie d’annotations floues.",
      "en": "On the test set alone, the 1-point gap is within the confidence interval (±2.5 points), which is why choices rely on cross-validation. The trees/graphs and number theory/math confusions partly reflect fuzzy annotations."
    },
    "links": [
      {
        "label": {
          "fr": "Code source",
          "en": "Source code"
        },
        "url": "https://github.com/charbel-dib/algorithm-tags"
      }
    ],
    "categories": [
      "ml"
    ],
    "roadmap": {
      "fr": "Suite envisagée : un encodeur de code fine-tuné, comparé à ces SVM sur le même protocole.",
      "en": "Planned next: a fine-tuned code encoder, compared with these SVMs under the same protocol."
    },
    "evaluation": {
      "fr": "Validation croisée répétée sur train + validation, test évalué une fois ; intervalles par bootstrap ; résultats par tag et matrices de confusion publiés dans le dépôt.",
      "en": "Repeated cross-validation on train + validation, test evaluated once; bootstrap intervals; per-tag results and confusion matrices published in the repository."
    }
  },
  {
    "slug": "lpbf",
    "name": {
      "fr": "Qualité en fabrication additive",
      "en": "Quality in additive manufacturing"
    },
    "year": "2025–26",
    "kind": {
      "fr": "CESI / LINEACT · Recherche",
      "en": "CESI / LINEACT · Research"
    },
    "descriptor": {
      "fr": "Apprentissage et prédiction de densité relative",
      "en": "Learning to predict relative density"
    },
    "status": {
      "fr": "Stage · mai–août 2025 · Article de conférence · 2026",
      "en": "Internship · May–August 2025 · Conference paper · 2026"
    },
    "headline": {
      "fr": "Étudier la densité relative de pièces fabriquées par fusion laser sur lit de poudre.",
      "en": "Study relative density in laser powder bed fusion parts."
    },
    "summary": {
      "fr": "À partir d’une base expérimentale associant paramètres du procédé et propriétés des pièces, comparaison de modèles prédictifs et clustering pour étudier la densité relative en fusion laser sur lit de poudre (L-PBF).",
      "en": "Using an experimental database linking process parameters with part properties, compare predictive models and clustering to study relative density in laser powder bed fusion (L-PBF)."
    },
    "tags": {
      "fr": [
        "Machine learning",
        "Clustering",
        "L-PBF",
        "Recherche"
      ],
      "en": [
        "Machine learning",
        "Clustering",
        "L-PBF",
        "Research"
      ]
    },
    "role": {
      "fr": "Construction de la base expérimentale, comparaison de modèles et analyse des configurations pendant mon stage au CESI / LINEACT. Contribution à l’article en premier auteur avec Rima Hleiss.",
      "en": "Experimental database construction, model comparison and configuration analysis during my CESI / LINEACT internship. First-author contribution to the paper with Rima Hleiss."
    },
    "problem": {
      "fr": "Les paramètres du procédé L-PBF influencent la densité relative et la porosité des pièces. L’objectif est d’étudier ces relations à partir de données expérimentales et de modèles prédictifs.",
      "en": "L-PBF process parameters affect part relative density and porosity. The goal is to study those relationships using experimental data and predictive models."
    },
    "decisions": {
      "fr": [
        [
          "Construire la base d’étude",
          "Structurer les observations expérimentales et les paramètres du procédé."
        ],
        [
          "Comparer les approches",
          "Étudier des modèles de machine learning et le clustering des configurations de fabrication."
        ],
        [
          "Formaliser les résultats",
          "Contribuer à un article scientifique en premier auteur, avec Rima Hleiss."
        ]
      ],
      "en": [
        [
          "Build the study dataset",
          "Structure experimental observations and process parameters."
        ],
        [
          "Compare approaches",
          "Study machine learning models and clusters of manufacturing configurations."
        ],
        [
          "Formalise the findings",
          "Contribute a first-author research paper with Rima Hleiss."
        ]
      ]
    },
    "result": {
      "fr": "Charbel Dib, Rima Hleiss. « Cluster-Based Learning for Relative Density Prediction in Laser Powder Bed Fusion ». 2026 IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA), 2026. Article de conférence en premier auteur. DOI : 10.1109/3SCEA68071.2026.11603067.",
      "en": "Charbel Dib, Rima Hleiss. “Cluster-Based Learning for Relative Density Prediction in Laser Powder Bed Fusion”. 2026 IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA), 2026. First-author conference paper. DOI: 10.1109/3SCEA68071.2026.11603067."
    },
    "value": {
      "fr": "Relier la préparation des données et l’évaluation de modèles à une question d’ingénierie industrielle.",
      "en": "Connect data preparation and model evaluation to an industrial engineering question."
    },
    "limit": {
      "fr": "Travaux de recherche : résultats valables dans le cadre expérimental de l’étude, pas encore validés en production.",
      "en": "Research work: results hold within the study’s experimental setting and are not yet validated in production."
    },
    "links": [
      {
        "label": {
          "fr": "Lire la publication",
          "en": "Read the paper"
        },
        "url": "https://doi.org/10.1109/3SCEA68071.2026.11603067"
      }
    ],
    "categories": [
      "ml",
      "data"
    ],
    "evaluation": {
      "fr": "La démarche relie la structuration d’observations expérimentales, la comparaison de modèles et l’analyse de configurations par clustering à la densité relative, propriété liée à la porosité et à la qualité des pièces. L’article de conférence constitue le résultat public de cette étude.",
      "en": "The approach links structured experimental observations, model comparison and clustering of configurations to relative density, a property related to porosity and part quality. The conference paper is the public outcome of this study."
    }
  }
];
