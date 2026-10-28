// src/data/sampleLeaves.js
// Pre-configured SVG-based sample leaves for instant frontend demo testing

const createLeafSvg = (type) => {
  switch (type) {
    case 'tomato-early-blight':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#FAF6EE" />
        <defs>
          <radialGradient id="eb-spot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#3E2723" />
            <stop offset="40%" stop-color="#5D4037" />
            <stop offset="75%" stop-color="#8D6E63" />
            <stop offset="95%" stop-color="#FBC02D" />
            <stop offset="100%" stop-color="#689F38" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#558B2F" />
            <stop offset="60%" stop-color="#689F38" />
            <stop offset="100%" stop-color="#33691E" />
          </linearGradient>
        </defs>
        <!-- Stem -->
        <path d="M 200 370 Q 195 280 200 200" stroke="#795548" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Main Leaf Blade -->
        <path d="M 200 60 C 270 90 320 180 290 270 C 260 330 220 340 200 340 C 180 340 140 330 110 270 C 80 180 130 90 200 60 Z" fill="url(#leaf-grad)" stroke="#2E7D32" stroke-width="3"/>
        <!-- Veins -->
        <path d="M 200 60 Q 200 200 200 340" stroke="#9CCC65" stroke-width="4" fill="none"/>
        <path d="M 200 130 Q 240 110 270 120" stroke="#9CCC65" stroke-width="2.5" fill="none"/>
        <path d="M 200 170 Q 250 150 285 180" stroke="#9CCC65" stroke-width="2.5" fill="none"/>
        <path d="M 200 220 Q 240 210 275 240" stroke="#9CCC65" stroke-width="2" fill="none"/>
        <path d="M 200 130 Q 160 110 130 120" stroke="#9CCC65" stroke-width="2.5" fill="none"/>
        <path d="M 200 170 Q 150 150 115 180" stroke="#9CCC65" stroke-width="2.5" fill="none"/>
        <path d="M 200 220 Q 160 210 125 240" stroke="#9CCC65" stroke-width="2" fill="none"/>
        <!-- Concentric Target Early Blight Lesions -->
        <circle cx="230" cy="160" r="28" fill="url(#eb-spot)" />
        <circle cx="230" cy="160" r="18" fill="none" stroke="#2B1D0C" stroke-width="1.5" stroke-dasharray="3,2" />
        <circle cx="230" cy="160" r="10" fill="none" stroke="#2B1D0C" stroke-width="1.5" />
        <circle cx="160" cy="220" r="32" fill="url(#eb-spot)" />
        <circle cx="160" cy="220" r="20" fill="none" stroke="#2B1D0C" stroke-width="1.5" stroke-dasharray="3,2" />
        <circle cx="160" cy="220" r="9" fill="none" stroke="#2B1D0C" stroke-width="1.5" />
        <circle cx="240" cy="250" r="20" fill="url(#eb-spot)" />
        <text x="20" y="380" font-family="sans-serif" font-size="12" fill="#8C8270">Sample: Tomato Leaf with Early Blight Concentric Rings</text>
      </svg>`;

    case 'apple-scab':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#FAF6EE" />
        <defs>
          <linearGradient id="apple-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#33691E" />
            <stop offset="50%" stop-color="#558B2F" />
            <stop offset="100%" stop-color="#2E7D32" />
          </linearGradient>
        </defs>
        <path d="M 200 370 Q 196 320 200 280" stroke="#5D4037" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M 200 50 C 290 80 330 190 280 280 C 250 330 220 330 200 330 C 180 330 150 330 120 280 C 70 190 110 80 200 50 Z" fill="url(#apple-leaf)" stroke="#1B5E20" stroke-width="3"/>
        <path d="M 200 50 L 200 330" stroke="#8BC34A" stroke-width="3.5" fill="none"/>
        <!-- Scab velvety lesions -->
        <ellipse cx="230" cy="140" rx="22" ry="16" fill="#2E3A23" opacity="0.9" />
        <ellipse cx="170" cy="190" rx="26" ry="18" fill="#1F2817" opacity="0.9" />
        <ellipse cx="220" cy="230" rx="30" ry="20" fill="#26331C" opacity="0.92" />
        <ellipse cx="150" cy="130" rx="14" ry="12" fill="#3D4D2C" opacity="0.85" />
        <text x="20" y="380" font-family="sans-serif" font-size="12" fill="#8C8270">Sample: Apple Foliage with Olive-Green Scab Lesions</text>
      </svg>`;

    case 'corn-rust':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#FAF6EE" />
        <defs>
          <linearGradient id="corn-blade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#689F38" />
            <stop offset="50%" stop-color="#7CB342" />
            <stop offset="100%" stop-color="#558B2F" />
          </linearGradient>
        </defs>
        <!-- Elongated Corn Leaf Blade -->
        <path d="M 200 40 C 260 120 260 280 240 370 L 160 370 C 140 280 140 120 200 40 Z" fill="url(#corn-blade)" stroke="#33691E" stroke-width="3"/>
        <!-- Central Midrib and parallel veins -->
        <line x1="200" y1="40" x2="200" y2="370" stroke="#C5E1A5" stroke-width="4"/>
        <line x1="180" y1="90" x2="175" y2="370" stroke="#AED581" stroke-width="1.5"/>
        <line x1="220" y1="90" x2="225" y2="370" stroke="#AED581" stroke-width="1.5"/>
        <!-- Cinnamon rust pustules -->
        <ellipse cx="190" cy="130" rx="6" ry="12" fill="#B45309" stroke="#78350F" stroke-width="1"/>
        <ellipse cx="215" cy="150" rx="5" ry="14" fill="#D97706" stroke="#92400E" stroke-width="1"/>
        <ellipse cx="185" cy="180" rx="7" ry="15" fill="#B45309" stroke="#78350F" stroke-width="1"/>
        <ellipse cx="210" cy="220" rx="6" ry="13" fill="#B45309" stroke="#78350F" stroke-width="1"/>
        <ellipse cx="180" cy="260" rx="5" ry="12" fill="#92400E" stroke="#78350F" stroke-width="1"/>
        <ellipse cx="215" cy="290" rx="7" ry="16" fill="#B45309" stroke="#78350F" stroke-width="1"/>
        <text x="20" y="380" font-family="sans-serif" font-size="12" fill="#8C8270">Sample: Corn Blade displaying Common Rust Pustules</text>
      </svg>`;

    case 'grape-healthy':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#FAF6EE" />
        <defs>
          <linearGradient id="grape-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#43A047" />
            <stop offset="100%" stop-color="#2E7D32" />
          </linearGradient>
        </defs>
        <!-- Petiole -->
        <path d="M 200 370 Q 198 320 200 270" stroke="#6D4C41" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Palmate 5-lobed Grape Leaf -->
        <path d="M 200 80 C 230 60 260 100 270 120 C 310 110 340 150 330 190 C 340 230 300 260 280 270 C 260 280 220 270 200 270 C 180 270 140 280 120 270 C 100 260 60 230 70 190 C 60 150 90 110 130 120 C 140 100 170 60 200 80 Z" fill="url(#grape-grad)" stroke="#1B5E20" stroke-width="3"/>
        <!-- Palmate veins -->
        <line x1="200" y1="270" x2="200" y2="80" stroke="#A5D6A7" stroke-width="3"/>
        <line x1="200" y1="270" x2="310" y2="140" stroke="#A5D6A7" stroke-width="2.5"/>
        <line x1="200" y1="270" x2="90" y2="140" stroke="#A5D6A7" stroke-width="2.5"/>
        <line x1="200" y1="270" x2="310" y2="230" stroke="#A5D6A7" stroke-width="2"/>
        <line x1="200" y1="270" x2="90" y2="230" stroke="#A5D6A7" stroke-width="2"/>
        <text x="20" y="380" font-family="sans-serif" font-size="12" fill="#8C8270">Sample: Healthy Grape Canopy Leaf (Lobed, Vibrant)</text>
      </svg>`;

    default: // Potato Healthy
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#FAF6EE" />
        <defs>
          <linearGradient id="potato-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4CAF50" />
            <stop offset="100%" stop-color="#1B5E20" />
          </linearGradient>
        </defs>
        <!-- Stem -->
        <path d="M 200 370 Q 198 300 200 250" stroke="#5D4037" stroke-width="7" stroke-linecap="round" fill="none"/>
        <!-- Compound Oval Leaf -->
        <path d="M 200 70 C 270 100 300 200 270 280 C 240 330 210 330 200 330 C 190 330 160 330 130 280 C 100 200 130 100 200 70 Z" fill="url(#potato-grad)" stroke="#1B5E20" stroke-width="3"/>
        <line x1="200" y1="70" x2="200" y2="330" stroke="#C8E6C9" stroke-width="3"/>
        <line x1="200" y1="140" x2="260" y2="120" stroke="#C8E6C9" stroke-width="2"/>
        <line x1="200" y1="140" x2="140" y2="120" stroke="#C8E6C9" stroke-width="2"/>
        <line x1="200" y1="200" x2="270" y2="180" stroke="#C8E6C9" stroke-width="2"/>
        <line x1="200" y1="200" x2="130" y2="180" stroke="#C8E6C9" stroke-width="2"/>
        <text x="20" y="380" font-family="sans-serif" font-size="12" fill="#8C8270">Sample: Healthy Potato Leaf (Pinnate, Uniform Green)</text>
      </svg>`;
  }
};

export const SAMPLE_LEAVES = [
  {
    id: 'sample-tomato-eb',
    cropId: 'tomato',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    expectedCondition: 'Early Blight',
    pathogen: 'Alternaria solani',
    isHealthy: false,
    label: 'Tomato (Early Blight)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    fileName: 'tomato_early_blight_sample.png',
    fileSize: '48.2 KB',
    description: 'Distinctive concentric target-board lesions on leaflet.',
    svgData: createLeafSvg('tomato-early-blight')
  },
  {
    id: 'sample-apple-scab',
    cropId: 'apple',
    cropName: 'Apple',
    scientificName: 'Malus domestica',
    expectedCondition: 'Apple Scab',
    pathogen: 'Venturia inaequalis',
    isHealthy: false,
    label: 'Apple (Apple Scab)',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    fileName: 'apple_scab_sample.png',
    fileSize: '44.8 KB',
    description: 'Velvety olive-brown circular patches on foliar surface.',
    svgData: createLeafSvg('apple-scab')
  },
  {
    id: 'sample-corn-rust',
    cropId: 'corn',
    cropName: 'Corn (Maize)',
    scientificName: 'Zea mays',
    expectedCondition: 'Common Rust',
    pathogen: 'Puccinia sorghi',
    isHealthy: false,
    label: 'Corn (Common Rust)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    fileName: 'corn_common_rust_sample.png',
    fileSize: '51.4 KB',
    description: 'Elongate powdery cinnamon-brown fungal pustules.',
    svgData: createLeafSvg('corn-rust')
  },
  {
    id: 'sample-grape-healthy',
    cropId: 'grape',
    cropName: 'Grape',
    scientificName: 'Vitis vinifera',
    expectedCondition: 'Healthy Foliage',
    pathogen: 'None (Healthy)',
    isHealthy: true,
    label: 'Grape (Healthy Leaf)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    fileName: 'grape_healthy_sample.png',
    fileSize: '42.1 KB',
    description: 'Vibrant 5-lobed vine leaf without foliar lesions or chlorosis.',
    svgData: createLeafSvg('grape-healthy')
  },
  {
    id: 'sample-potato-healthy',
    cropId: 'potato',
    cropName: 'Potato',
    scientificName: 'Solanum tuberosum',
    expectedCondition: 'Healthy Foliage',
    pathogen: 'None (Healthy)',
    isHealthy: true,
    label: 'Potato (Healthy Leaf)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    fileName: 'potato_healthy_sample.png',
    fileSize: '41.3 KB',
    description: 'Unblemished compound leaf with vigorous green coloration.',
    svgData: createLeafSvg('potato-healthy')
  }
];

// Helper to convert SVG to a real File object for the file uploader
export function sampleToFile(sample) {
  const blob = new Blob([sample.svgData], { type: 'image/svg+xml' });
  const file = new File([blob], sample.fileName, { type: 'image/png', lastModified: Date.now() });
  return file;
}
