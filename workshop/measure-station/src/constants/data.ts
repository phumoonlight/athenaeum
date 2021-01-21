export enum Package {
  Standard = 'standard',
  StandardOltc = 'standard-oltc',
  MiniSuite = 'mini-suite',
  Small = 'small',
}

export const dataSource = [
  {
    key: 1,
    featureName: 'Dissolved Gas Analysis (DGA)',
    packages: [
      Package.Standard,
      Package.StandardOltc,
      Package.MiniSuite,
      Package.Small,
    ],
  },
  {
    key: 2,
    featureName: 'Moisture Content',
    packages: [
      Package.Standard,
      Package.StandardOltc,
      Package.MiniSuite,
      Package.Small,
    ],
  },
  {
    key: 3,
    featureName: 'Dielectric Breakdown Voltage',
    packages: [
      Package.Standard,
      Package.StandardOltc,
      Package.MiniSuite,
      Package.Small,
    ],
  },
  {
    key: 4,
    featureName: 'Acid Number',
    packages: [Package.Standard, Package.StandardOltc, Package.MiniSuite],
  },
  {
    key: 5,
    featureName: 'Interfacial Tension (IFT)',
    packages: [Package.Standard, Package.StandardOltc, Package.MiniSuite],
  },
  {
    key: 6,
    featureName: 'Colour',
    packages: [Package.Standard, Package.StandardOltc, Package.MiniSuite],
  },
  {
    key: 7,
    featureName: 'Power Factor (at one temperature)',
    packages: [Package.Standard],
  },
  {
    key: 8,
    featureName: 'Oxidation Inhibitor',
    packages: [Package.Standard],
  },
  {
    key: 9,
    featureName: 'Furan Analysis',
    packages: [Package.Standard],
  },
  {
    key: 10,
    featureName: 'Particle Count',
    packages: [Package.Standard, Package.StandardOltc],
  },
  {
    key: 11,
    featureName: 'Special TCA Diagnostic',
    packages: [Package.Standard],
  },
  {
    key: 12,
    featureName: 'Special TASA Diagnostic',
    packages: [Package.StandardOltc],
  },
]
