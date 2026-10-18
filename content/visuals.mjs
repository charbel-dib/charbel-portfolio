// Faithful explanatory diagrams, not application screenshots or measured results.
export const visuals = {
  "posaidon": {
    "fr": {
      "title": "Des observations à une situation explicable",
      "steps": [
        [
          "Observer",
          "Trajectoires AIS · signaux RF · satellites"
        ],
        [
          "Corréler",
          "Outils agentiques et analyse multi-sources"
        ],
        [
          "Restituer",
          "Synthèse pour l’opérateur"
        ]
      ],
      "note": "Schéma du prototype de hackathon. Ma contribution : outils agentiques, corrélation et rapports, au sein de l’équipe."
    },
    "en": {
      "title": "From observations to an explainable situation",
      "steps": [
        [
          "Observe",
          "AIS tracks · RF signals · satellites"
        ],
        [
          "Correlate",
          "Agent tools and multi-source analysis"
        ],
        [
          "Report",
          "A summary for the operator"
        ]
      ],
      "note": "Hackathon prototype overview. My contribution: agent tools, correlation and reports, within the team."
    }
  },
  "fact-checking": {
    "fr": {
      "title": "Évaluer chaque étape, puis la réponse finale",
      "steps": [
        [
          "Préparer",
          "Corpus → segmentation"
        ],
        [
          "Rechercher",
          "Recherche hybride → reranking · évaluation NDCG et rappel"
        ],
        [
          "Extraire et classifier",
          "Extraction de preuves → classification Phi-3 préexistant · analyse d’erreurs et macro-F1"
        ]
      ],
      "note": "Schéma de la démarche. Les erreurs sont étudiées séparément pour comprendre leur propagation. Aucun résultat interne n’est présenté."
    },
    "en": {
      "title": "Evaluate each stage, then the final answer",
      "steps": [
        [
          "Prepare",
          "Corpus → chunking"
        ],
        [
          "Retrieve",
          "Hybrid retrieval → reranking · NDCG and recall evaluation"
        ],
        [
          "Extract and classify",
          "Evidence extraction → existing Phi-3 classifier · error analysis and macro-F1"
        ]
      ],
      "note": "Method overview. Errors are examined separately to understand how they propagate. No internal results are shown."
    }
  },
  "ensta-assistant": {
    "fr": {
      "title": "Deux étapes : préparer les données, puis répondre",
      "steps": [
        [
          "Préparer les données",
          "Web / PDF / XLSX → nettoyage → segmentation → embeddings multilingual-E5 → index FAISS"
        ],
        [
          "Répondre",
          "Recherche → seuil de similarité → réponse avec citations ou refus et transmission humaine"
        ]
      ],
      "note": "Architecture du prototype académique : API FastAPI, interface et sessions. Corpus web reconstruit quotidiennement ; documents PDF/XLSX mis à jour manuellement."
    },
    "en": {
      "title": "Two stages: prepare data, then answer",
      "steps": [
        [
          "Prepare data",
          "Web / PDF / XLSX → cleaning → chunking → multilingual-E5 embeddings → FAISS index"
        ],
        [
          "Answer",
          "Retrieval → similarity threshold → cited answer or refusal and human escalation"
        ]
      ],
      "note": "Academic prototype architecture: FastAPI service, interface and sessions. Web corpus rebuilt daily; PDF/XLSX documents updated manually."
    }
  },
  "atlas": {
    "fr": {
      "title": "Les fondations déjà présentes dans le dépôt",
      "steps": [
        [
          "Collecter",
          "Métadonnées et documents SEC EDGAR"
        ],
        [
          "Structurer",
          "Identifiants · provenance · contraintes d’unicité"
        ],
        [
          "Vérifier",
          "Tests de téléchargement et de parsing"
        ]
      ],
      "note": "État actuel : ingestion et stockage. Prochaine étape : rapprocher données quantitatives et documents, puis construire la couche d’assistance."
    },
    "en": {
      "title": "The foundations already present in the repository",
      "steps": [
        [
          "Collect",
          "SEC EDGAR metadata and documents"
        ],
        [
          "Structure",
          "Identifiers · provenance · uniqueness constraints"
        ],
        [
          "Check",
          "Download and parser tests"
        ]
      ],
      "note": "Current stage: ingestion and storage. Next: connect quantitative data with documents, then build the assistant layer."
    }
  },
  "lpbf": {
    "fr": {
      "title": "Des paramètres du procédé à l’étude de la densité",
      "steps": [
        [
          "Structurer",
          "Observations expérimentales et paramètres L-PBF"
        ],
        [
          "Comparer",
          "Modèles prédictifs et clustering des configurations"
        ],
        [
          "Formaliser",
          "Article IEEE 3SCEA · premier auteur · 2026"
        ]
      ],
      "note": "Schéma de la démarche publiée. Le travail étudie les relations entre paramètres et densité relative ; aucune performance industrielle n’est revendiquée."
    },
    "en": {
      "title": "From process parameters to the study of density",
      "steps": [
        [
          "Structure",
          "Experimental observations and L-PBF parameters"
        ],
        [
          "Compare",
          "Predictive models and configuration clustering"
        ],
        [
          "Publish",
          "IEEE 3SCEA paper · first author · 2026"
        ]
      ],
      "note": "Published-method overview. The work studies relationships between parameters and relative density; no industrial performance is claimed."
    }
  }
};
