// Two editorial views of the same projects and credentials.
export const publication = {
  title: 'Cluster-Based Learning for Relative Density Prediction in Laser Powder Bed Fusion',
  authors: 'Charbel Dib, Rima Hleiss',
  venue: '2026 IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA)',
  doi: '10.1109/3SCEA68071.2026.11603067',
  url: 'https://doi.org/10.1109/3SCEA68071.2026.11603067'
};
export const certificate = {
  title: 'Google Data Analytics', issuer: 'Google · Coursera', date: '2024-03-23',
  courses: 8, skills: ['SQL', 'R', 'Tableau', 'Spreadsheets'],
  url: 'https://coursera.org/verify/professional-cert/PABFJT9RQLLB',
  file: 'assets/Google-Data-Analytics-Charbel-Dib.pdf'
};
export const profiles = {
  pro: {
    order: ['fleetguard','posaidon','servicepilot','ensta-assistant','fact-checking','atlas','lpbf'],
    fr: {
      title: 'Charbel Dib — Ingénieur IA · Portfolio professionnel',
      description: 'RAG, agents IA, machine learning et données : projets, expériences et résultats de Charbel Dib, ingénieur diplômé de l’ENSTA.',
      label: 'Professionnel', overline: 'Ingénieur IA · RAG, agents & machine learning',
      hero: 'Des données à une solution que l’on peut utiliser.',
      heroNote: 'Des modèles évalués, des API et des interfaces pour rendre l’IA utilisable.',
      selectedDesc: 'Du modèle évalué au prototype utilisable : trois réalisations, leurs choix techniques et leurs limites.',
      availability: 'Ouvert aux opportunités en IA, ML & data',
      contactText: 'Je recherche un poste d’ingénieur en IA, machine learning ou data, avec une équipe attentive à la qualité des données, à l’évaluation et à l’usage des solutions.'
    },
    en: {
      title: 'Charbel Dib — AI Engineer · Professional Portfolio',
      description: 'RAG, AI agents, machine learning and data: projects, experience and results from Charbel Dib, an ENSTA engineering graduate.',
      label: 'Professional', overline: 'AI engineer · RAG, agents & machine learning',
      hero: 'From data to a solution people can use.',
      heroNote: 'Evaluated models, APIs and interfaces that make AI usable.',
      selectedDesc: 'From an evaluated model to a usable prototype: three projects, their technical decisions and their limits.',
      availability: 'Open to AI, ML & data opportunities',
      contactText: 'I’m looking for an AI, machine learning or data engineering role with a team that values data quality, evaluation and the way people use its solutions.'
    }
  },
  research: {
    order: ['lpbf','fact-checking','ensta-assistant','fleetguard','posaidon','servicepilot','atlas'],
    fr: {
      title: 'Charbel Dib — Recherche en IA · Publication & travaux',
      description: 'Publication IEEE en premier auteur, stages de recherche chez CESI/LINEACT et Astek : machine learning, RAG et évaluation expérimentale.',
      label: 'Recherche', overline: 'Recherche en intelligence artificielle',
      hero: 'Comprendre ce qu’un modèle apprend. Mesurer ce qu’il apporte.',
      heroNote: 'Machine learning en fabrication additive et évaluation de systèmes RAG.',
      availability: 'Ouvert aux opportunités de doctorat en IA', discover: 'Découvrir mes travaux',
      all: 'Les projets, en complément',
      allDesc: 'Les mêmes travaux et réalisations, avec la recherche en premier. Les prototypes montrent aussi ma capacité à mettre une méthode en œuvre.',
      aboutTitle: 'Une formation d’ingénieur. Une démarche expérimentale.',
      aboutText: 'Diplômé de l’ENSTA en systèmes d’observation et intelligence artificielle, j’ai étudié des problèmes de machine learning en fabrication additive, puis l’évaluation de systèmes RAG appliqués au fact-checking.',
      aboutText2: 'Ces expériences m’ont donné envie de poursuivre en recherche : poser une question précise, construire un protocole, comparer des méthodes et expliquer les limites des conclusions.',
      skillsTitle: 'Méthodes & mise en œuvre',
      skills: [
        ['Évaluation expérimentale','Comparaison de configurations, métriques, analyse d’erreurs, reproductibilité','Stage Astek · RAG & fact-checking'],
        ['Apprentissage & données','Python, scikit-learn, modèles prédictifs, clustering, préparation des données','Stage CESI / LINEACT · L-PBF'],
        ['Prototypage scientifique','Transformers, PyTorch, FAISS, FastAPI, Docker, Git','Des expériences aux démonstrateurs']
      ],
      contactTitle: 'Une question de recherche ?<br>Échangeons.',
      contactText: 'Je souhaite poursuivre en doctorat en intelligence artificielle, autour de l’apprentissage à partir de données, du traitement du langage ou de l’évaluation des modèles. Je suis disponible pour échanger sur vos sujets et les besoins de votre équipe.'
    },
    en: {
      title: 'Charbel Dib — AI Research · Publication & Projects',
      description: 'First-author IEEE publication and research internships at CESI/LINEACT and Astek: machine learning, RAG and experimental evaluation.',
      label: 'Research', overline: 'Artificial intelligence research',
      hero: 'Understand what a model learns. Measure what it contributes.',
      heroNote: 'Machine learning for additive manufacturing and evaluation of RAG systems.',
      availability: 'Open to PhD opportunities in AI', discover: 'Explore my research',
      all: 'Projects beyond the studies',
      allDesc: 'The same work and projects, with research first. The prototypes also demonstrate my ability to implement a method.',
      aboutTitle: 'Engineering foundations. An experimental approach.',
      aboutText: 'An ENSTA graduate in observation systems and artificial intelligence, I studied machine learning problems in additive manufacturing, then the evaluation of RAG systems for fact-checking.',
      aboutText2: 'These experiences motivated me to pursue research: define a precise question, build a protocol, compare methods and explain the limits of the conclusions.',
      skillsTitle: 'Methods & implementation',
      skills: [
        ['Experimental evaluation','Configuration comparisons, metrics, error analysis, reproducibility','Astek internship · RAG & fact-checking'],
        ['Learning & data','Python, scikit-learn, predictive models, clustering, data preparation','CESI / LINEACT internship · L-PBF'],
        ['Research prototyping','Transformers, PyTorch, FAISS, FastAPI, Docker, Git','From experiments to demonstrators']
      ],
      contactTitle: 'A research question?<br>Let’s discuss it.',
      contactText: 'I’m interested in PhD opportunities in artificial intelligence, spanning learning from data, natural language processing and model evaluation. I would welcome a conversation about your research questions and your team’s needs.'
    }
  }
};
export const researchStudies = {
  fr: [
    {slug:'lpbf', label:'CESI / LINEACT · 2025', title:'Prédire la densité relative à partir des paramètres du procédé.',
      question:'Comment exploiter les paramètres de fabrication pour étudier la densité relative de pièces obtenues par fusion laser sur lit de poudre ?',
      method:'Construction et structuration d’une base expérimentale, analyse des configurations de fabrication, clustering et comparaison de modèles prédictifs.',
      contribution:'Une étude reliant données, apprentissage automatique et qualité des pièces, valorisée par un article de conférence IEEE en premier auteur avec Rima Hleiss.',
      limit:'Les résultats concernent le cadre de l’étude ; ils ne constituent pas une validation en production industrielle.'},
    {slug:'fact-checking', label:'Astek Innovation Lab · 2026', title:'Comprendre où un pipeline de fact-checking perd en qualité.',
      question:'Comment distinguer les erreurs de recherche documentaire, d’extraction de preuves et de classification dans un pipeline RAG ?',
      method:'Comparaison de stratégies de segmentation, recherche hybride et reranking ; évaluation séparée des étapes, puis analyse de leur effet sur la classification finale.',
      contribution:'Une méthode de diagnostic pour localiser les pertes de qualité et orienter les améliorations à partir des résultats, avec des protocoles communs et des expériences reproductibles.',
      limit:'Les contributions sont présentées à haut niveau. Le rapport interne et les résultats détaillés ne sont pas publiés sur ce site.'}
  ],
  en: [
    {slug:'lpbf', label:'CESI / LINEACT · 2025', title:'Predict relative density from process parameters.',
      question:'How can manufacturing parameters help study the relative density of parts produced by laser powder bed fusion?',
      method:'Build and structure an experimental database, analyse manufacturing configurations, use clustering and compare predictive models.',
      contribution:'A study connecting data, machine learning and part quality, developed into a first-author IEEE conference paper with Rima Hleiss.',
      limit:'The findings concern the study setting; they do not establish validation in industrial production.'},
    {slug:'fact-checking', label:'Astek Innovation Lab · 2026', title:'Understand where a fact-checking pipeline loses quality.',
      question:'How can retrieval, evidence-extraction and classification errors be distinguished within a RAG pipeline?',
      method:'Compare chunking, hybrid retrieval and reranking configurations; evaluate the stages separately, then examine their effect on final classification.',
      contribution:'A diagnostic approach to locate quality losses and guide improvements using results, shared protocols and reproducible experiments.',
      limit:'Contributions are presented at a high level. The internal report and detailed results are not published on this website.'}
  ]
};
