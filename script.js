/* Réglages facultatifs : ajouter le PDF dans dist/, puis renseigner son chemin.
   Ne publier que la version du CV que vous souhaitez rendre publique. */
const portfolioConfig = { cvUrl: 'CV_Charbel_Dib.pdf' };
const english = {
 skip:'Skip to content',navProjects:'Projects',navJourney:'Background',navContact:'Contact',
 heroEyebrow:'ENSTA ENGINEERING GRADUATE',heroOne:'From data',heroTwo:'to useful AI.',
 intro:'I’m Charbel Dib, an AI engineer. I build and evaluate systems that connect models, data and practical needs, with a particular focus on reliable answers.',
 discover:'Explore my projects',talk:'Let’s talk ↗',availability:'Open to full-time roles from October 2026 · Paris region preferred · Mobile across France',
 focusLabel:'AREAS OF WORK',focusRag:'Find the right sources.\nBuild evidence-based answers.',focusAgentTitle:'AI agents',focusAgent:'Connect tools and data\nto support decision-making.',focusMl:'Explore, compare and evaluate\nto understand the results.',
 proofEnsta:'Engineering degree · 2026',proofPrize:'1st prize · SPASEA',proofPaper:'First-author publication',
 projectsEyebrow:'01 / SELECTED WORK',projectsTitle:'Four fields of application.',projectsIntro:'From fact-checking to maritime surveillance, projects where data quality and evaluation matter as much as the model.',
 p1Context:'ASTEK · FINAL-YEAR INTERNSHIP',p1Title:'Check the facts.\nTrace the evidence.',p1Desc:'Design and evaluation of a RAG pipeline for climate fact-checking: retrieving relevant passages, extracting evidence and classifying claims.',
 details:'My contribution',p1a:'Compared chunking, hybrid retrieval and reranking strategies.',p1b:'Worked on evidence-extraction prompts and evaluated a Phi-3 classifier adapted with LoRA.',p1c:'Designed evaluation protocols, analysed error propagation and made GPU experiments reproducible with Docker, caching and logs.',p1Note:'R&D project. High-level overview only; internal reports and data are not shared.',
 p2Context:'ENSTA · ACADEMIC PROJECT',p2Title:'A document assistant\nthat cites its sources.',p2Desc:'A bilingual assistant for web, PDF and XLSX content: semantic search, sourced answers and abstention when there is not enough information.',p2a:'Collected, cleaned, chunked and indexed documents.',p2b:'Automated daily index updates and developed the FastAPI backend.',p2c:'Implemented multi-session handling, verifiable citations and email escalation with human validation.',
 award:'1ST PRIZE',p3Title:'Connect the signals.\nSupport the decision.',p3Desc:'A maritime AI copilot prototype developed as a team at the hackathon organised by Naval Group and the DGA, awarded first prize.',agents:'AI agents',satellites:'Satellite data',p3a:'Developed agent tools for AIS trajectories, RF signals and satellite ephemerides.',p3b:'Correlated multiple sources to identify non-cooperative vessels and assess anomalies.',p3c:'Generated decision-support reports from the analysed information.',
 p4Context:'CESI / LINEACT · RESEARCH INTERNSHIP',p4Title:'Predicting quality\nin additive manufacturing.',p4Desc:'Compared machine learning models to predict the relative density and porosity of L-PBF parts from manufacturing process parameters.',dataAnalysis:'Data analysis',p4a:'Built and structured the experimental dataset.',p4b:'Analysed process configurations, applied clustering and compared predictive models.',p4c:'Contributed this work to an IEEE paper as first author.',readPaper:'Read the publication ↗',
 skillsEyebrow:'02 / SKILLS',skillsTitle:'Build.\nMeasure. Improve.',skillsIntro:'My foundations: Python, natural language processing and evaluation. A machine learning background helps me choose approaches suited to the problem.',evalTitle:'Evaluation & analysis',evalBody:'Precision, recall, F1 · NDCG · Context Recall · LLM-based evaluation · Error analysis',engineeringTitle:'Development & tools',
 journeyEyebrow:'03 / BACKGROUND',journeyTitle:'Engineering foundations.\nHands-on experience.',enstaRole:'Engineering degree in Observation Systems and Artificial Intelligence',enstaDesc:'Machine learning, deep learning, computer vision, signal processing and data fusion.',brest:'Brest, France',astekDates:'MARCH — SEPTEMBER 2026',astekRole:'Final-year internship · NLP, RAG and LLM evaluation',astekJourney:'Designed and analysed a pipeline for climate fact-checking.',cesiDates:'MAY — AUGUST 2025',cesiRole:'AI / ML internship · Additive manufacturing',cesiJourney:'Predictive modelling and clustering to analyse the quality of L-PBF parts.',
 pubEyebrow:'PUBLICATION · IEEE 2026',pubDesc:'First author · Machine learning and clustering applied to additive manufacturing.',pubLink:'View publication ↗',
 contactEyebrow:'WHAT’S NEXT?',contactTitle:'Let’s build what’s next.',contactDesc:'I’m looking for a full-time role in AI, NLP or machine learning to build practical solutions and keep learning alongside a technical team.',emailMe:'Get in touch',cvRequest:'Request my CV ↗',contactMeta:'From October 2026 · Paris / Île-de-France · Mobile across France',spoken:'French · English · Arabic',backTop:'Back to top ↑'
};
const elements = [...document.querySelectorAll('[data-i18n]')];
const french = Object.fromEntries(elements.map(el => [el.dataset.i18n, el.innerText]));
function setLanguage(lang) {
  const selected = lang === 'en' ? 'en' : 'fr';
  const dictionary = selected === 'en' ? english : french;
  elements.forEach(el => { const value = dictionary[el.dataset.i18n]; if (value !== undefined) { el.textContent = value; el.style.whiteSpace = 'pre-line'; } });
  document.documentElement.lang = selected;
  document.title = selected === 'en' ? 'Charbel Dib | AI Engineer' : 'Charbel Dib | Ingénieur IA';
  document.querySelector('meta[name="description"]').content = selected === 'en'
    ? 'Charbel Dib, ENSTA engineering graduate. NLP, RAG, AI agents and machine learning: projects, experience and an IEEE publication.'
    : 'Charbel Dib, ingénieur diplômé de l’ENSTA. NLP, RAG, agents IA et machine learning : projets, expériences et publication IEEE.';
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === selected)));
  document.querySelector('nav').setAttribute('aria-label',selected === 'en' ? 'Main navigation' : 'Navigation principale');
  if (portfolioConfig.cvUrl) {
    const cv = document.getElementById('cv-link');
    cv.href = portfolioConfig.cvUrl;
    cv.textContent = selected === 'en' ? 'Download my CV ↗' : 'Télécharger mon CV ↗';
    cv.setAttribute('download','CV_Charbel_Dib.pdf');
  }
  try { localStorage.setItem('portfolio-language', selected); } catch { /* Private browsing may restrict storage. */ }
}
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let initialLanguage = 'fr';
try { initialLanguage = localStorage.getItem('portfolio-language') || 'fr'; } catch { /* French stays the default. */ }
setLanguage(initialLanguage);
