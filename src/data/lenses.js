// Canon RF and RF-S lens ecosystem compatible with the EOS R50.
// Specs reflect each lens's own published focal length / aperture range —
// not camera body specifications.
export const lensCategories = ['ALL', 'WIDE', 'STANDARD', 'PORTRAIT', 'MACRO', 'TELEPHOTO', 'PRIME', 'ZOOM']

export const lenses = [
  {
    id: 1,
    file: '01_RF-S_18-45mm_f4.5-6.3_IS_STM.jpg',
    name: 'RF-S 18-45mm F4.5-6.3 IS STM',
    mount: 'RF-S',
    focal: '18-45mm',
    aperture: 'F4.5-6.3',
    type: 'Zoom Lens',
    categories: ['STANDARD', 'ZOOM'],
    description: 'A compact everyday zoom, ideal as a lightweight walk-around lens for the R50.'
  },
  {
    id: 2,
    file: '02_RF-S_18-150mm_f3.5-6.3_IS_STM.jpg',
    name: 'RF-S 18-150mm F3.5-6.3 IS STM',
    mount: 'RF-S',
    focal: '18-150mm',
    aperture: 'F3.5-6.3',
    type: 'Zoom Lens',
    categories: ['STANDARD', 'TELEPHOTO', 'ZOOM'],
    description: 'An all-in-one travel zoom covering wide to telephoto without a lens change.'
  },
  {
    id: 3,
    file: '03_RF_15-35mm_f2.8L_IS_USM.jpg',
    name: 'RF 15-35mm F2.8L IS USM',
    mount: 'RF',
    focal: '15-35mm',
    aperture: 'F2.8',
    type: 'L-Series Zoom',
    categories: ['WIDE', 'ZOOM'],
    description: 'A professional-grade ultra-wide zoom built for landscapes, interiors and astro work.'
  },
  {
    id: 4,
    file: '04_RF_24-70mm_f2.8L_IS_USM.jpg',
    name: 'RF 24-70mm F2.8L IS USM',
    mount: 'RF',
    focal: '24-70mm',
    aperture: 'F2.8',
    type: 'L-Series Zoom',
    categories: ['STANDARD', 'ZOOM'],
    description: 'The benchmark standard zoom, trusted for weddings, events and editorial work.'
  },
  {
    id: 5,
    file: '05_RF_24-105mm_f4L_IS_USM.jpg',
    name: 'RF 24-105mm F4L IS USM',
    mount: 'RF',
    focal: '24-105mm',
    aperture: 'F4',
    type: 'L-Series Zoom',
    categories: ['STANDARD', 'TELEPHOTO', 'ZOOM'],
    description: 'A versatile L-series zoom that balances range, speed and portability.'
  },
  {
    id: 6,
    file: '06_RF_24-105mm_f4-7.1_IS_STM.jpg',
    name: 'RF 24-105mm F4-7.1 IS STM',
    mount: 'RF',
    focal: '24-105mm',
    aperture: 'F4-7.1',
    type: 'Zoom Lens',
    categories: ['STANDARD', 'TELEPHOTO', 'ZOOM'],
    description: 'A lightweight, affordable alternative for everyday shooting across focal lengths.'
  },
  {
    id: 7,
    file: '07_RF_50mm_f1.8_STM.jpg',
    name: 'RF 50mm F1.8 STM',
    mount: 'RF',
    focal: '50mm',
    aperture: 'F1.8',
    type: 'Prime Lens',
    categories: ['STANDARD', 'PORTRAIT', 'PRIME'],
    description: 'A fast, affordable nifty-fifty prime with beautiful background separation.'
  },
  {
    id: 8,
    file: '08_RF_85mm_f2_Macro_IS_STM.jpg',
    name: 'RF 85mm F2 Macro IS STM',
    mount: 'RF',
    focal: '85mm',
    aperture: 'F2',
    type: 'Prime Macro Lens',
    categories: ['PORTRAIT', 'MACRO', 'PRIME'],
    description: 'A flattering portrait focal length that doubles as a half-life-size macro lens.'
  },
  {
    id: 9,
    file: '09_RF_35mm_f1.8_Macro_IS_STM.jpg',
    name: 'RF 35mm F1.8 Macro IS STM',
    mount: 'RF',
    focal: '35mm',
    aperture: 'F1.8',
    type: 'Prime Macro Lens',
    categories: ['STANDARD', 'MACRO', 'PRIME'],
    description: 'A versatile wide-standard prime for everyday, low-light and close-up shooting.'
  },
  {
    id: 10,
    file: '10_RF_16mm_f2.8_STM.jpg',
    name: 'RF 16mm F2.8 STM',
    mount: 'RF',
    focal: '16mm',
    aperture: 'F2.8',
    type: 'Prime Lens',
    categories: ['WIDE', 'PRIME'],
    description: 'An ultra-wide, ultra-compact prime for landscapes, vlogging and creative angles.'
  },
  {
    id: 11,
    file: '11_RF_100-400mm_f5.6-8_IS_USM.jpg',
    name: 'RF 100-400mm F5.6-8 IS USM',
    mount: 'RF',
    focal: '100-400mm',
    aperture: 'F5.6-8',
    type: 'Telephoto Zoom',
    categories: ['TELEPHOTO', 'ZOOM'],
    description: 'A budget-friendly telephoto zoom that reaches deep into wildlife and sports.'
  },
  {
    id: 12,
    file: '12_RF_600mm_f11_IS_STM.jpg',
    name: 'RF 600mm F11 IS STM',
    mount: 'RF',
    focal: '600mm',
    aperture: 'F11',
    type: 'Super Telephoto Prime',
    categories: ['TELEPHOTO', 'PRIME'],
    description: 'An ultra-compact super-telephoto prime built for distant subjects and travel.'
  }
]

export const lensesPath = '/assets/lenses/'
