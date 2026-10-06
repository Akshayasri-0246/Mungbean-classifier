import type { DiseaseResult } from '../types';

export const SAMPLE_DISEASES: DiseaseResult[] = [
  {
    id: 'greengram-cercospora',
    cropName: 'Green Gram Leaf',
    diseaseName: 'Cercospora Leaf Spot (Cercospora canescens)',
    scientificName: 'Cercospora canescens',
    severity: 'Moderate',
    overallConfidence: 97.4,
    affectedAreaPercentage: 24.5,
    overview: 'Cercospora leaf spot causes small, circular dark brown lesions with grey/ash-colored centers on green gram foliage, leading to premature defoliation if left untreated.',
    symptoms: [
      'Small circular spots with reddish-brown margins and greyish centers',
      'Spots coalesce into large necrotic patches on mature leaves',
      'Yellow halo surrounding active fungal infection zones',
      'Severe defoliation starting from lower plant canopy'
    ],
    organicRemedies: [
      'Foliar spray of 5% Neem seed kernel extract (NSKE) at 10-day intervals',
      'Apply Trichoderma viride bio-fungicide (5g/liter) at early flowering stage',
      'Spray 0.5% Pseudomonas fluorescens to boost plant systemic resistance'
    ],
    chemicalRemedies: [
      'Spray Carbendazim 50% WP at 1g/liter of water at first spot appearance',
      'Apply Mancozeb 75% WP at 2g/liter every 12-14 days',
      'Systemic spray of Difenoconazole 25% EC (1ml/liter)'
    ],
    preventionSteps: [
      'Use certified disease-resistant green gram seeds (e.g. VBN-2, Pusa Baisakhi)',
      'Practice 2-year crop rotation with non-legume crops (sorghum, maize)',
      'Destroy infected crop residues after harvest to eliminate overwintering spores'
    ],
    boundingBoxes: [
      {
        id: 'box-gg1',
        label: 'Cercospora Spot Lesion',
        x: 22,
        y: 28,
        width: 32,
        height: 28,
        confidence: 97.4,
        color: '#f43f5e',
        notes: 'Target spot pattern with chlorotic halo detected'
      }
    ],
    imageUrl: '/sample_mung_disease.jpg'
  },
  {
    id: 'greengram-halo-blight',
    cropName: 'Green Gram Foliage',
    diseaseName: 'Halo Blight (Pseudomonas syringae pv. phaseolicola)',
    scientificName: 'Pseudomonas syringae pv. phaseolicola',
    severity: 'Severe',
    overallConfidence: 98.6,
    affectedAreaPercentage: 38.0,
    overview: 'Halo Blight is a bacterial disease causing water-soaked spots surrounded by a distinctive wide yellowish-green halo on foliage during cool, rainy weather.',
    symptoms: [
      'Small water-soaked spots on leaf undersides',
      'Prominent light green to yellow chlorotic halo around brown spots',
      'Bacterial ooze droplets appearing under moist humid mornings',
      'Leaf distortion and stem girdle lesions'
    ],
    organicRemedies: [
      'Foliar spray of Copper Hydroxide organic formulation (2g/L)',
      'Apply bio-agent Bacillus subtilis to suppress bacterial spread',
      'Destroy heavily blighted plants immediately to protect field'
    ],
    chemicalRemedies: [
      'Copper Oxychloride 50% WP (3g/liter) mixed with Streptocycline (100 ppm)',
      'Kugamin spray applied at initial lesion development'
    ],
    preventionSteps: [
      'Sow pathogen-free disease-certified seed stock',
      'Avoid overhead sprinkler irrigation; use drip lines',
      'Do not enter wet fields to prevent physical bacterial transmission'
    ],
    boundingBoxes: [
      {
        id: 'box-hb1',
        label: 'Halo Blight Bacterial Spot',
        x: 18,
        y: 20,
        width: 44,
        height: 38,
        confidence: 98.6,
        color: '#ef4444',
        notes: 'Bacterial water-soaked zone detected'
      }
    ],
    imageUrl: '/sample_mung_halo_blight.jpg'
  },
  {
    id: 'greengram-powdery-mildew',
    cropName: 'Green Gram Foliage',
    diseaseName: 'Powdery Mildew (Erysiphe polygoni)',
    scientificName: 'Erysiphe polygoni',
    severity: 'Moderate',
    overallConfidence: 95.2,
    affectedAreaPercentage: 19.5,
    overview: 'Powdery mildew presents as white flour-like fungal coating on leaf surfaces, stems, and pods during cool, dry weather conditions following rain.',
    symptoms: [
      'White floury fungal growth on upper and lower leaf surfaces',
      'Infected leaves turn dull grey, curl, wither, and drop prematurely',
      'Pods turn brown, shrivel, and produce underdeveloped seeds'
    ],
    organicRemedies: [
      'Spray cow milk solution (1:9 ratio with water) on sunny mornings',
      'Foliar application of Liquid Sulfur (0.2%) or Potassium Bicarbonate',
      'Prune densely shaded branches to maximize canopy sunlight'
    ],
    chemicalRemedies: [
      'Wettable Sulfur 80% WP spray at 3g/liter of water',
      'Hexaconazole 5% EC at 1ml/liter at onset of white powdery patches',
      'Penconazole 10% EC spray (0.5ml/liter)'
    ],
    preventionSteps: [
      'Maintain adequate plant row spacing (30cm x 10cm)',
      'Avoid excessive nitrogen fertilization',
      'Collect and burn infected foliage post-harvest'
    ],
    boundingBoxes: [
      {
        id: 'box-pm1',
        label: 'Powdery Mildew Coating',
        x: 25,
        y: 35,
        width: 35,
        height: 25,
        confidence: 95.2,
        color: '#eab308',
        notes: 'White fungal powder patches'
      }
    ],
    imageUrl: '/sample_mung_powdery_mildew.jpg'
  },
  {
    id: 'greengram-tan-spot',
    cropName: 'Green Gram Leaf',
    diseaseName: 'Tan Spot (Corynespora cassiicola)',
    scientificName: 'Corynespora cassiicola',
    severity: 'Mild',
    overallConfidence: 93.8,
    affectedAreaPercentage: 14.0,
    overview: 'Tan spot manifests as circular tan to light-brown lesions with dark purplish borders on leaves and petioles under warm humid foliage conditions.',
    symptoms: [
      'Tan to parchment-colored central lesions with dark brown borders',
      'Target-like concentric ring bands within larger spots',
      'Shot-hole appearance when dry center tissue drops out'
    ],
    organicRemedies: [
      'Apply Bio-fungicide Trichoderma harzianum foliar spray',
      'Spray 1% Neem Oil solution every 7 days'
    ],
    chemicalRemedies: [
      'Azoxystrobin 23% SC spray at 1ml/liter of water',
      'Chlorothalonil 75% WP protective fungicide spray'
    ],
    preventionSteps: [
      'Deep plowing to bury crop residue after harvest',
      'Weed control along field borders'
    ],
    boundingBoxes: [
      {
        id: 'box-ts1',
        label: 'Tan Spot Lesion',
        x: 30,
        y: 40,
        width: 30,
        height: 20,
        confidence: 93.8,
        color: '#f97316',
        notes: 'Tan parchment central lesion'
      }
    ],
    imageUrl: '/sample_mung_tan_spot.jpg'
  },
  {
    id: 'greengram-tsv',
    cropName: 'Green Gram Foliage',
    diseaseName: 'Tobacco Streak Virus (TSV)',
    scientificName: 'Ilarvirus Tobacco streak virus',
    severity: 'Severe',
    overallConfidence: 98.9,
    affectedAreaPercentage: 45.0,
    overview: 'Tobacco Streak Virus causes characteristic necrosis of terminal buds, necrotic streak lines on stems, puckered leaves, and severe stunting transmitted by thrips.',
    symptoms: [
      'Necrotic spots and streaks on young growing leaf petioles and stems',
      'Death/browning of terminal growing point (top necrosis)',
      'Puckering, twisting, and malformation of uninfected leaves',
      'Drastic yield loss and pod necrosis'
    ],
    organicRemedies: [
      'Spray 5% Neem oil to control thrips vector population',
      'Install blue/yellow sticky traps (15 traps/acre)',
      'Uproot and burn virus-infected plants immediately'
    ],
    chemicalRemedies: [
      'Seed treatment with Imidacloprid 600 FS (5ml/kg seed)',
      'Foliar spray of Fipronil 5% SC (1.5ml/liter) or Spinetoram 11.7% SC for thrips'
    ],
    preventionSteps: [
      'Keep field borders free from Parthenium weed hosts',
      'Maintain barrier crops like maize or bajra around green gram fields'
    ],
    boundingBoxes: [
      {
        id: 'box-tsv1',
        label: 'TSV Necrotic Streak',
        x: 15,
        y: 20,
        width: 50,
        height: 40,
        confidence: 98.9,
        color: '#ef4444',
        notes: 'Terminal bud necrosis & thrips damage'
      }
    ],
    imageUrl: '/sample_mung_tsv.jpg'
  },
  {
    id: 'greengram-healthy',
    cropName: 'Green Gram Foliage',
    diseaseName: 'Healthy Green Gram Leaf (No Disease)',
    scientificName: 'Vigna radiata',
    severity: 'Healthy',
    overallConfidence: 99.6,
    affectedAreaPercentage: 0.0,
    overview: 'The leaf shows vibrant chlorophyll green pigmentation, smooth cuticle margins, and zero signs of fungal spots, viral chlorosis, or bacterial necrosis.',
    symptoms: [
      'Uniform vibrant green trifoliate leaf blades',
      'Clean epidermal surface without necrotic spots or white powdery spots',
      'Healthy pod formation and vascular integrity'
    ],
    organicRemedies: [
      'Continue routine organic vermicompost top dressing',
      'Maintain balanced drip irrigation schedule'
    ],
    chemicalRemedies: [
      'No chemical fungicide needed'
    ],
    preventionSteps: [
      'Inspect foliage every 4-5 days for early pest or disease signs',
      'Maintain field sanitation'
    ],
    boundingBoxes: [
      {
        id: 'box-h1',
        label: 'Healthy Green Gram ROI',
        x: 15,
        y: 15,
        width: 70,
        height: 70,
        confidence: 99.6,
        color: '#10b981',
        notes: 'Optimal green leaf reflectance'
      }
    ],
    imageUrl: '/sample_mung_healthy.jpg'
  }
];

