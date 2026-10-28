// src/data/cropsData.js
// Curated botanical and pathological data for the 5 supported crops

export const SUPPORTED_CROPS = [
  {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    family: 'Rosaceae',
    emoji: '🍎',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    accentBorder: '#FECDD3',
    tagline: 'Orchard fruit susceptible to foliar fungal pathogens and rusts',
    overview: 'Apples are vulnerable to foliar fungal infections during humid spring flowering and early fruit development.',
    diseases: [
      {
        name: 'Apple Scab',
        pathogen: 'Venturia inaequalis (Fungus)',
        symptoms: 'Olive-green to velvety brown or black circular spots on leaves, causing premature defoliation and fruit lesions.',
        culturalPractices: 'Prune canopy to promote air circulation; clear and destroy fallen leaves in autumn; select resistant cultivars.',
      },
      {
        name: 'Black Rot',
        pathogen: 'Botryosphaeria obtusa (Fungus)',
        symptoms: 'Small purple spots enlarging into "frog-eye" lesions with light brown centers and distinct purple margins.',
        culturalPractices: 'Remove dead twigs, cankers, and mummified fruit; maintain adequate tree vigor through balanced fertilization.',
      },
      {
        name: 'Cedar Apple Rust',
        pathogen: 'Gymnosporangium juniperi-virginianae (Heteroecious Fungus)',
        symptoms: 'Bright yellow-orange or reddish spots on upper leaf surfaces; tube-like aecia structures beneath leaves later in summer.',
        culturalPractices: 'Eradicate nearby wild eastern red cedars within 1-2 miles where feasible; apply protective horticultural sprays in early spring.',
      },
      {
        name: 'Healthy Foliage',
        pathogen: 'None (Healthy)',
        symptoms: 'Glossy, uniform green surface without chlorotic discoloration, necrotic borders, or fungal sporulation.',
        culturalPractices: 'Maintain regular orchard monitoring, optimal moisture balance, and integrated pest management (IPM).',
      }
    ]
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    family: 'Poaceae',
    emoji: '🌽',
    color: '#D97706',
    bgColor: '#FFFBEB',
    accentBorder: '#FDE68A',
    tagline: 'Cereal grain sensitive to foliar blights and rust fungal pustules',
    overview: 'Maize is globally critical for food, feed, and biofuel; leaf infections impair photosynthetic efficiency during grain fill.',
    diseases: [
      {
        name: 'Common Rust',
        pathogen: 'Puccinia sorghi (Fungus)',
        symptoms: 'Oval to elongate golden-brown to cinnamon pustules scattered across both leaf surfaces that erupt with powdery rust spores.',
        culturalPractices: 'Plant rust-resistant hybrids; avoid excess nitrogen; rotate fields with non-host crops.',
      },
      {
        name: 'Gray Leaf Spot',
        pathogen: 'Cercospora zeae-maydis (Fungus)',
        symptoms: 'Rectangular, narrow tan lesions strictly bounded by leaf veins; can coalesce to cause extensive leaf blighting.',
        culturalPractices: 'Adopt crop rotation with soybeans; deep tillage where appropriate to decompose infected crop residue; plant tolerant hybrids.',
      },
      {
        name: 'Northern Leaf Blight',
        pathogen: 'Exserohilum turcicum (Fungus)',
        symptoms: 'Long, elliptical, cigar-shaped grayish-green to tan lesions (1 to 6 inches) on lower leaves progressing upwards.',
        culturalPractices: 'Use resistant hybrid seed lines; manage crop residue; practice strategic crop rotation.',
      },
      {
        name: 'Healthy Foliage',
        pathogen: 'None (Healthy)',
        symptoms: 'Broad, vigorous dark-green parallel-veined leaves free of rust pustules, lesions, or leaf striping.',
        culturalPractices: 'Conduct regular soil nutrient testing, scout fields early in the vegetative stage, and practice conservation irrigation.',
      }
    ]
  },
  {
    id: 'grape',
    name: 'Grape',
    scientificName: 'Vitis vinifera',
    family: 'Vitaceae',
    emoji: '🍇',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    accentBorder: '#DDD6FE',
    tagline: 'Vineyard crop susceptible to berry rot and foliar trunk diseases',
    overview: 'Viticulture relies on healthy canopy leaf area for sugar synthesis and berry ripening; fungal blights can ruin entire vintages.',
    diseases: [
      {
        name: 'Black Rot',
        pathogen: 'Guignardia bidwellii (Fungus)',
        symptoms: 'Small, circular reddish-brown leaf spots with minute black pycnidia specks; leads to shriveled black mummified berries.',
        culturalPractices: 'Remove and burn mummified berry clusters during dormant pruning; ensure canopy sunlight penetration through shoot positioning.',
      },
      {
        name: 'Esca (Black Measles)',
        pathogen: 'Phaeomoniella chlamydospora & fungal complex',
        symptoms: '"Tiger-stripe" interveinal chlorosis and necrosis on leaves; dark spots ("measles") on berries.',
        culturalPractices: 'Avoid large pruning wounds during wet weather; sterilize pruning shears between vines; renew diseased cordons.',
      },
      {
        name: 'Isariopsis Leaf Blight',
        pathogen: 'Pseudocercospora vitis (Fungus)',
        symptoms: 'Irregular dark brown necrotic patches on leaves with dark borders, often causing late-season premature defoliation.',
        culturalPractices: 'Improve vineyard air drainage; manage vine vigor to prevent overly dense foliage; apply organic copper fungicides if needed.',
      },
      {
        name: 'Healthy Foliage',
        pathogen: 'None (Healthy)',
        symptoms: 'Lobed, vibrant green leaves with crisp margins and clear venation free from spotting or wilting.',
        culturalPractices: 'Maintain balanced vine trellis training, regulated deficit irrigation, and routine seasonal scouting.',
      }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    family: 'Solanaceae',
    emoji: '🥔',
    color: '#B45309',
    bgColor: '#FEF3C7',
    accentBorder: '#FDE68A',
    tagline: 'Staple tuber crop vulnerable to destructive historical blights',
    overview: 'Potatoes share vulnerability with tomatoes; foliar blights can destroy full plant canopies within days in wet conditions.',
    diseases: [
      {
        name: 'Early Blight',
        pathogen: 'Alternaria solani (Fungus)',
        symptoms: 'Concentric "target-board" brown rings surrounded by a chlorotic yellow halo, primarily on older bottom foliage.',
        culturalPractices: 'Avoid overhead sprinkler irrigation; maintain adequate plant nutrition (nitrogen/potassium); destroy infected crop debris.',
      },
      {
        name: 'Late Blight',
        pathogen: 'Phytophthora infestans (Oomycete)',
        symptoms: 'Water-soaked irregular dark green/brown lesions with pale margins; white fuzzy fungal growth on leaf undersides in humid mornings.',
        culturalPractices: 'Plant certified disease-free seed tubers; eliminate cull piles; destroy volunteer potato plants; apply protective preventative fungicides.',
      },
      {
        name: 'Healthy Foliage',
        pathogen: 'None (Healthy)',
        symptoms: 'Lush, compound pinnate leaves with bright green luster and no blighted margins or water-soaked lesions.',
        culturalPractices: 'Practice 3-year crop rotation outside Solanaceae; hill tubers properly to prevent spore wash; scout during cool, wet spells.',
      }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    emoji: '🍅',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    accentBorder: '#FECACA',
    tagline: 'Popular horticultural crop prone to bacterial, viral, and fungal issues',
    overview: 'Tomatoes are the most intensively grown garden and greenhouse crop, requiring early foliar screening against fast-spreading blights.',
    diseases: [
      {
        name: 'Early Blight',
        pathogen: 'Alternaria solani (Fungus)',
        symptoms: 'Dark brown spots with concentric target-pattern rings; leaf yellowing starts from lower canopy and progresses upward.',
        culturalPractices: 'Mulch soil surface to prevent soil splash; prune lower 12 inches of suckers/leaves; ensure drip irrigation only at soil level.',
      },
      {
        name: 'Late Blight',
        pathogen: 'Phytophthora infestans (Oomycete)',
        symptoms: 'Dark greasy lesions that expand rapidly across leaves and stems; white mildew underneath under humid conditions.',
        culturalPractices: 'Remove and seal infected plants immediately; space plants widely for airflow; avoid overhead watering.',
      },
      {
        name: 'Septoria Leaf Spot',
        pathogen: 'Septoria lycopersici (Fungus)',
        symptoms: 'Numerous small circular spots (1/8 inch) with dark borders and tan or gray centers featuring tiny black specks.',
        culturalPractices: 'Stake plants off the ground; rotate crops away from solanaceous plants for 2 seasons; sanitize tools.',
      },
      {
        name: 'Tomato Yellow Leaf Curl',
        pathogen: 'Tomato yellow leaf curl virus (TYLCV, Geminiviridae)',
        symptoms: 'Severe upward leaf curling, stunted growth, thick leathery texture, and yellowing margins; transmitted by silverleaf whitefly.',
        culturalPractices: 'Use insect exclusion netting; control whitefly vector with sticky traps; plant virus-resistant tomato varieties.',
      },
      {
        name: 'Healthy Foliage',
        pathogen: 'None (Healthy)',
        symptoms: 'Deep green serrated leaflets with crisp edges, upright stems, and no chlorotic or necrotic mottling.',
        culturalPractices: 'Ensure consistent soil moisture, adequate calcium to prevent blossom end rot, and good ventilation.',
      }
    ]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Upload Leaf Image',
    description: 'Capture or select a clear, well-lit photo of a single crop leaf (JPG, JPEG, or PNG format).',
    icon: 'Upload',
    details: 'Supports drag-and-drop or direct file browsing with instant client-side format & size validation.'
  },
  {
    step: '02',
    title: 'AI Feature Extraction',
    description: 'Deep convolutional neural network analyzes leaf venation, chlorosis patterns, and lesion morphology.',
    icon: 'Cpu',
    details: 'Phase 1 frontend demonstrates the diagnostic workflow; ready to connect to a high-speed FastAPI CNN backend.'
  },
  {
    step: '03',
    title: 'Review Diagnostics',
    description: 'Receive instantaneous classification of crop species, identified condition, and model confidence score.',
    icon: 'FileCheck2',
    details: 'Review non-prescriptive cultural advisories and archive predictions in your browser session history.'
  }
];

export const SYSTEM_STATS = [
  { label: 'Supported Crop Species', value: '5 Crops', sub: 'Apple, Corn, Grape, Potato, Tomato' },
  { label: 'Diagnostic Classes', value: '25 Classes', sub: 'Verified across 5 agricultural crops' },
  { label: 'Inference Backend', value: 'FastAPI + CNN', sub: 'MobileNetV2 Keras 3 runtime' },
  { label: 'System Status', value: 'Full-Stack Active', sub: 'Live Model & Session History Connected' },
];
