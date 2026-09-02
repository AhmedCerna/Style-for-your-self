import { Product, Collection, Review, Testimonial, LookbookItem } from '../types';

export const COLLECTIONS_DATA: Collection[] = [
  {
    id: 'col-new-arrivals',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'The Autumn/Winter Capsule',
    description: 'Fresh silhouettes cut from premium wools, structured silks, and heavyweight organic cottons.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    itemCount: 12,
    featured: true
  },
  {
    id: 'col-women',
    handle: 'women',
    title: 'Women',
    subtitle: 'Modern Elegance',
    description: 'Effortless tailoring, fluid silk slip dresses, and elevated wardrobe essentials for her.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85',
    itemCount: 16,
    featured: true
  },
  {
    id: 'col-men',
    handle: 'men',
    title: 'Men',
    subtitle: 'Contemporary Tailoring',
    description: 'Impeccable wool overcoats, relaxed Japanese poplin shirts, and sharp pleated trousers.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    itemCount: 14,
    featured: true
  },
  {
    id: 'col-dresses',
    handle: 'dresses',
    title: 'Dresses',
    subtitle: 'Flowing & Sculptural',
    description: 'From evening column silhouettes to breezy linen day dresses for every occasion.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
    itemCount: 8,
    featured: true
  },
  {
    id: 'col-tops',
    handle: 'tops',
    title: 'Tops',
    subtitle: 'Elevated Everyday Knits',
    description: 'Cashmere-blend mock necks, ribbed modal tanks, and fine gauge long sleeves.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
    itemCount: 10,
    featured: false
  },
  {
    id: 'col-shirts',
    handle: 'shirts',
    title: 'Shirts',
    subtitle: 'Crisp & Relaxed',
    description: 'Structured French poplin, breathable Belgian linen, and fluid tencel button-downs.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
    itemCount: 9,
    featured: false
  },
  {
    id: 'col-pants',
    handle: 'pants',
    title: 'Pants',
    subtitle: 'Tailored & Wide-Leg',
    description: 'High-waisted pleated trousers, structured denim, and relaxed drawstring linen trousers.',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85',
    itemCount: 11,
    featured: false
  },
  {
    id: 'col-jackets',
    handle: 'jackets',
    title: 'Jackets',
    subtitle: 'Signature Outerwear',
    description: 'Double-breasted wool blazers, belted trench coats, and supple leather jackets.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
    itemCount: 8,
    featured: true
  },
  {
    id: 'col-accessories',
    handle: 'accessories',
    title: 'Accessories',
    subtitle: 'Refined Finishing Details',
    description: 'Sculpted leather belts, brushed cashmere scarves, minimal totes, and jewelry.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    itemCount: 6,
    featured: false
  },
  {
    id: 'col-sale',
    handle: 'sale',
    title: 'Sale',
    subtitle: 'Archival Seasonals',
    description: 'Limited quantities of signature archive pieces up to 40% off.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85',
    itemCount: 7,
    featured: true
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    handle: 'the-atelier-double-breasted-blazer',
    title: 'The Atelier Double-Breasted Blazer',
    subtitle: 'Tailored Italian Virgin Wool',
    description: 'An enduring pillar of modern tailoring. Cut from 100% fine Italian virgin wool with a relaxed yet sculpted silhouette, structured shoulders, horn-tone buttons, and a fully lined cupro interior.',
    details: [
      'Relaxed tailored fit with subtle waist suppression',
      'Peak lapels and double-breasted 6-button front',
      'Two flap front pockets and welt chest pocket',
      'Dual back vents for effortless movement',
      'Internal passport and pen pockets'
    ],
    materials: '100% Italian Virgin Wool. Lining: 100% Bemberg Cupro.',
    care: [
      'Dry clean only by luxury garment specialist',
      'Cool iron with pressing cloth',
      'Store on wide-shoulder cedar hanger'
    ],
    fit: 'True to size for a modern tailored fit. Size up for an intentionally oversized silhouette.',
    price: 320,
    compareAtPrice: 320,
    isNew: true,
    isBestSeller: true,
    isOnSale: false,
    category: 'Jackets',
    gender: 'Women',
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Oatmeal Taupe', hex: '#C9BCAC' },
      { name: 'Midnight Charcoal', hex: '#222326' },
      { name: 'Camel Tan', hex: '#A88056' }
    ],
    tags: ['Tailoring', 'Workwear', 'Outerwear', 'Bestseller'],
    createdAt: '2026-08-10',
    variants: [
      { id: 'v1-1', title: 'Oatmeal Taupe / S', size: 'S', color: 'Oatmeal Taupe', colorHex: '#C9BCAC', price: 320, compareAtPrice: 320, inventoryQuantity: 14, sku: 'SFY-BLZ-OAT-S' },
      { id: 'v1-2', title: 'Oatmeal Taupe / M', size: 'M', color: 'Oatmeal Taupe', colorHex: '#C9BCAC', price: 320, compareAtPrice: 320, inventoryQuantity: 8, sku: 'SFY-BLZ-OAT-M' },
      { id: 'v1-3', title: 'Oatmeal Taupe / L', size: 'L', color: 'Oatmeal Taupe', colorHex: '#C9BCAC', price: 320, compareAtPrice: 320, inventoryQuantity: 5, sku: 'SFY-BLZ-OAT-L' },
      { id: 'v1-4', title: 'Midnight Charcoal / S', size: 'S', color: 'Midnight Charcoal', colorHex: '#222326', price: 320, compareAtPrice: 320, inventoryQuantity: 12, sku: 'SFY-BLZ-BLK-S' },
      { id: 'v1-5', title: 'Midnight Charcoal / M', size: 'M', color: 'Midnight Charcoal', colorHex: '#222326', price: 320, compareAtPrice: 320, inventoryQuantity: 19, sku: 'SFY-BLZ-BLK-M' },
      { id: 'v1-6', title: 'Midnight Charcoal / L', size: 'L', color: 'Midnight Charcoal', colorHex: '#222326', price: 320, compareAtPrice: 320, inventoryQuantity: 7, sku: 'SFY-BLZ-BLK-L' }
    ]
  },
  {
    id: 'prod-2',
    handle: 'the-silk-bias-cut-maxi-dress',
    title: 'The Silk Bias-Cut Maxi Dress',
    subtitle: '100% Mulberry Sandwashed Silk',
    description: 'Spun from heavy 22-momme sandwashed mulberry silk that drapes naturally against the curves of the body. Features adjustable delicate rouleau straps, subtle cowl neckline, and French seams.',
    details: [
      'Bias cut for natural fluid movement without clinging',
      'Low open back with delicate cross-ties',
      'Floor-grazing maxi length with side hem slit',
      'Non-sheer premium double-faced silk'
    ],
    materials: '100% Organic Mulberry Sandwashed Silk (Grade 6A).',
    care: [
      'Hand wash cold with delicate silk detergent or dry clean',
      'Line dry in shade',
      'Steam only on low setting'
    ],
    fit: 'Skims effortlessly over the body. Fits true to size.',
    price: 260,
    compareAtPrice: 260,
    isNew: true,
    isBestSeller: true,
    isOnSale: false,
    category: 'Dresses',
    gender: 'Women',
    rating: 5.0,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Champagne Sand', hex: '#E6D7C3' },
      { name: 'Onyx Black', hex: '#1C1B1A' },
      { name: 'Olive Sage', hex: '#707765' }
    ],
    tags: ['Evening', 'Silk', 'Dresses', 'Summer'],
    createdAt: '2026-08-15',
    variants: [
      { id: 'v2-1', title: 'Champagne Sand / XS', size: 'XS', color: 'Champagne Sand', colorHex: '#E6D7C3', price: 260, compareAtPrice: 260, inventoryQuantity: 6, sku: 'SFY-DRS-CHM-XS' },
      { id: 'v2-2', title: 'Champagne Sand / S', size: 'S', color: 'Champagne Sand', colorHex: '#E6D7C3', price: 260, compareAtPrice: 260, inventoryQuantity: 15, sku: 'SFY-DRS-CHM-S' },
      { id: 'v2-3', title: 'Champagne Sand / M', size: 'M', color: 'Champagne Sand', colorHex: '#E6D7C3', price: 260, compareAtPrice: 260, inventoryQuantity: 11, sku: 'SFY-DRS-CHM-M' },
      { id: 'v2-4', title: 'Onyx Black / S', size: 'S', color: 'Onyx Black', colorHex: '#1C1B1A', price: 260, compareAtPrice: 260, inventoryQuantity: 9, sku: 'SFY-DRS-BLK-S' },
      { id: 'v2-5', title: 'Onyx Black / M', size: 'M', color: 'Onyx Black', colorHex: '#1C1B1A', price: 260, compareAtPrice: 260, inventoryQuantity: 14, sku: 'SFY-DRS-BLK-M' }
    ]
  },
  {
    id: 'prod-3',
    handle: 'the-relaxed-oxford-poplin-shirt',
    title: 'The Relaxed Oxford Poplin Shirt',
    subtitle: 'Extra-Long Staple Cotton',
    description: 'A contemporary update to the timeless button-down. Crafted from Japanese 120-thread-count poplin cotton with a softened washed finish, dropped shoulders, and mother-of-pearl buttons.',
    details: [
      'Generous relaxed boxy silhouette',
      'Spread collar and single patch chest pocket',
      'Curved hemline styled easily tucked or untucked',
      'Garment-washed for instant lived-in comfort'
    ],
    materials: '100% GOTS Certified Long-Staple Organic Cotton.',
    care: [
      'Machine wash gentle cold with like colors',
      'Tumble dry low or hang dry',
      'Warm iron'
    ],
    fit: 'Designed for an effortless relaxed drape. Take your regular size.',
    price: 125,
    compareAtPrice: 125,
    isNew: false,
    isBestSeller: true,
    isOnSale: false,
    category: 'Shirts',
    gender: 'Men',
    rating: 4.8,
    reviewCount: 62,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1620012253295-c15c429fcc71?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Crisp Cloud White', hex: '#FFFFFF' },
      { name: 'Sky Stripe Blue', hex: '#B2C7DE' },
      { name: 'French Navy', hex: '#1E2D4A' }
    ],
    tags: ['Essentials', 'Casual', 'Tailoring', 'Cotton'],
    createdAt: '2026-07-28',
    variants: [
      { id: 'v3-1', title: 'Crisp Cloud White / S', size: 'S', color: 'Crisp Cloud White', colorHex: '#FFFFFF', price: 125, compareAtPrice: 125, inventoryQuantity: 18, sku: 'SFY-SHT-WHT-S' },
      { id: 'v3-2', title: 'Crisp Cloud White / M', size: 'M', color: 'Crisp Cloud White', colorHex: '#FFFFFF', price: 125, compareAtPrice: 125, inventoryQuantity: 24, sku: 'SFY-SHT-WHT-M' },
      { id: 'v3-3', title: 'Crisp Cloud White / L', size: 'L', color: 'Crisp Cloud White', colorHex: '#FFFFFF', price: 125, compareAtPrice: 125, inventoryQuantity: 16, sku: 'SFY-SHT-WHT-L' },
      { id: 'v3-4', title: 'Sky Stripe Blue / M', size: 'M', color: 'Sky Stripe Blue', colorHex: '#B2C7DE', price: 125, compareAtPrice: 125, inventoryQuantity: 12, sku: 'SFY-SHT-BLU-M' },
      { id: 'v3-5', title: 'Sky Stripe Blue / L', size: 'L', color: 'Sky Stripe Blue', colorHex: '#B2C7DE', price: 125, compareAtPrice: 125, inventoryQuantity: 9, sku: 'SFY-SHT-BLU-L' }
    ]
  },
  {
    id: 'prod-4',
    handle: 'the-high-waisted-pleated-trouser',
    title: 'The High-Waisted Pleated Trouser',
    subtitle: 'Refined Wool & Viscose Drape',
    description: 'Designed with dual front knife pleats and an extended waistband tab, these trousers offer a sharp, elongated leg profile with comfortable all-day flexibility.',
    details: [
      'High-rise waist with tailored internal curtain waistband',
      'Dual deep front pleats and side slash pockets',
      'Wide straight leg with generous hem allowance for alterations',
      'Concealed zip fly with hook-and-bar closure'
    ],
    materials: '68% Eco-Viscose, 30% Virgin Wool, 2% Elastane.',
    care: [
      'Dry clean recommended',
      'Can be hand washed cold gently inside out',
      'Medium steam iron'
    ],
    fit: 'High rise with a wide relaxed leg. Model is 5\'10" wearing size S.',
    price: 170,
    compareAtPrice: 170,
    isNew: true,
    isBestSeller: true,
    isOnSale: false,
    category: 'Pants',
    gender: 'Women',
    rating: 4.9,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Desert Sand', hex: '#D8C6B1' },
      { name: 'Espresso Black', hex: '#1C1B1A' },
      { name: 'Muted Khaki', hex: '#7D806D' }
    ],
    tags: ['Pants', 'Workwear', 'Minimalist'],
    createdAt: '2026-08-01',
    variants: [
      { id: 'v4-1', title: 'Desert Sand / S', size: 'S', color: 'Desert Sand', colorHex: '#D8C6B1', price: 170, compareAtPrice: 170, inventoryQuantity: 10, sku: 'SFY-PNT-SAN-S' },
      { id: 'v4-2', title: 'Desert Sand / M', size: 'M', color: 'Desert Sand', colorHex: '#D8C6B1', price: 170, compareAtPrice: 170, inventoryQuantity: 18, sku: 'SFY-PNT-SAN-M' },
      { id: 'v4-3', title: 'Desert Sand / L', size: 'L', color: 'Desert Sand', colorHex: '#D8C6B1', price: 170, compareAtPrice: 170, inventoryQuantity: 7, sku: 'SFY-PNT-SAN-L' },
      { id: 'v4-4', title: 'Espresso Black / S', size: 'S', color: 'Espresso Black', colorHex: '#1C1B1A', price: 170, compareAtPrice: 170, inventoryQuantity: 15, sku: 'SFY-PNT-BLK-S' },
      { id: 'v4-5', title: 'Espresso Black / M', size: 'M', color: 'Espresso Black', colorHex: '#1C1B1A', price: 170, compareAtPrice: 170, inventoryQuantity: 21, sku: 'SFY-PNT-BLK-M' }
    ]
  },
  {
    id: 'prod-5',
    handle: 'the-belted-cashmere-overcoat',
    title: 'The Belted Cashmere-Blend Overcoat',
    subtitle: 'Heavyweight Double-Faced Wool',
    description: 'An architectural coat tailored for cold-weather refinement. Features a generous storm collar, detachable matching self-tie belt, deep hand pockets, and an unlined interior with hand-finished bound seams.',
    details: [
      'Unstructured raglan shoulders for easy layering over suits or knitwear',
      'Removable sash belt with tonal topstitching',
      'Mid-calf length with dramatic high back walking vent',
      'Hand-finished welt pocket entries'
    ],
    materials: '85% Virgin Wool, 15% Mongolian Cashmere.',
    care: [
      'Specialist dry clean only',
      'Brush with natural bristle garment brush after wear',
      'Store in breathable canvas garment bag'
    ],
    fit: 'Designed for layering. True to size. For a tailored slim look, size down one size.',
    price: 480,
    compareAtPrice: 480,
    isNew: true,
    isBestSeller: false,
    isOnSale: false,
    category: 'Jackets',
    gender: 'Unisex',
    rating: 5.0,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Camel Tan', hex: '#A88056' },
      { name: 'Charcoal Mélange', hex: '#3B3B3D' },
      { name: 'Warm Cream', hex: '#ECE6DD' }
    ],
    tags: ['Luxury', 'Winter', 'Overcoat', 'Cashmere'],
    createdAt: '2026-08-20',
    variants: [
      { id: 'v5-1', title: 'Camel Tan / S', size: 'S', color: 'Camel Tan', colorHex: '#A88056', price: 480, compareAtPrice: 480, inventoryQuantity: 4, sku: 'SFY-COT-CAM-S' },
      { id: 'v5-2', title: 'Camel Tan / M', size: 'M', color: 'Camel Tan', colorHex: '#A88056', price: 480, compareAtPrice: 480, inventoryQuantity: 8, sku: 'SFY-COT-CAM-M' },
      { id: 'v5-3', title: 'Camel Tan / L', size: 'L', color: 'Camel Tan', colorHex: '#A88056', price: 480, compareAtPrice: 480, inventoryQuantity: 5, sku: 'SFY-COT-CAM-L' },
      { id: 'v5-4', title: 'Charcoal Mélange / M', size: 'M', color: 'Charcoal Mélange', colorHex: '#3B3B3D', price: 480, compareAtPrice: 480, inventoryQuantity: 6, sku: 'SFY-COT-CHR-M' }
    ]
  },
  {
    id: 'prod-6',
    handle: 'the-pure-cashmere-crewneck-sweater',
    title: 'The Pure Cashmere Crewneck Sweater',
    subtitle: 'Grade-A 2-Ply Mongolian Cashmere',
    description: 'Exceptionally soft and light yet insulating. Knitted in a 12-gauge jersey stitch with ribbed collar, cuffs, and hem engineered to retain shape for years to come.',
    details: [
      'Classic crewneck collar with seamless tubular ribbing',
      'Fully fashioned raglan sleeve armholes',
      'Ultra-soft brushed finish with natural anti-pilling resistance',
      'Hypoallergenic and breathable across all seasons'
    ],
    materials: '100% Pure Mongolian Cashmere.',
    care: [
      'Hand wash cold using wool shampoo or gentle dry clean',
      'Never wring; roll in towel and dry flat',
      'Store folded with cedar blocks'
    ],
    fit: 'Classic regular fit. Fits true to size.',
    price: 210,
    compareAtPrice: 210,
    isNew: false,
    isBestSeller: true,
    isOnSale: false,
    category: 'Tops',
    gender: 'Men',
    rating: 4.9,
    reviewCount: 71,
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Oatmeal Heather', hex: '#D2C8BC' },
      { name: 'Deep Navy', hex: '#162238' },
      { name: 'Sage Forest', hex: '#4B5548' }
    ],
    tags: ['Cashmere', 'Knitwear', 'Essentials'],
    createdAt: '2026-07-15',
    variants: [
      { id: 'v6-1', title: 'Oatmeal Heather / S', size: 'S', color: 'Oatmeal Heather', colorHex: '#D2C8BC', price: 210, compareAtPrice: 210, inventoryQuantity: 11, sku: 'SFY-KNT-OAT-S' },
      { id: 'v6-2', title: 'Oatmeal Heather / M', size: 'M', color: 'Oatmeal Heather', colorHex: '#D2C8BC', price: 210, compareAtPrice: 210, inventoryQuantity: 18, sku: 'SFY-KNT-OAT-M' },
      { id: 'v6-3', title: 'Oatmeal Heather / L', size: 'L', color: 'Oatmeal Heather', colorHex: '#D2C8BC', price: 210, compareAtPrice: 210, inventoryQuantity: 14, sku: 'SFY-KNT-OAT-L' },
      { id: 'v6-4', title: 'Deep Navy / M', size: 'M', color: 'Deep Navy', colorHex: '#162238', price: 210, compareAtPrice: 210, inventoryQuantity: 16, sku: 'SFY-KNT-NVY-M' },
      { id: 'v6-5', title: 'Deep Navy / L', size: 'L', color: 'Deep Navy', colorHex: '#162238', price: 210, compareAtPrice: 210, inventoryQuantity: 9, sku: 'SFY-KNT-NVY-L' }
    ]
  },
  {
    id: 'prod-7',
    handle: 'the-sculpted-linen-halter-midi',
    title: 'The Sculpted Linen Halter Midi Dress',
    subtitle: '100% Normandy Certified Linen',
    description: 'Embrace effortless warm-weather sophistication. Tailored from premium European flax linen with a structured halter bodice, smocked back panel for flexibility, and a pleated A-line skirt with concealed side pockets.',
    details: [
      'High mock halter neckline with tortoiseshell button closure',
      'Fitted bodice with architectural waist seam',
      'Two discreet side seam pockets',
      'Fully lined bodice with lightweight cotton voile'
    ],
    materials: '100% French Normandy Flax Linen.',
    care: [
      'Machine wash gentle in cold water',
      'Hang to dry in shade',
      'Warm steam iron to enhance natural texture'
    ],
    fit: 'Fitted through bust and waist, flowing at hip. True to size.',
    price: 190,
    compareAtPrice: 190,
    isNew: true,
    isBestSeller: false,
    isOnSale: false,
    category: 'Dresses',
    gender: 'Women',
    rating: 4.7,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Terracotta Clay', hex: '#A85A44' },
      { name: 'Natural Ecru', hex: '#EBE5D8' },
      { name: 'Pitch Black', hex: '#181716' }
    ],
    tags: ['Linen', 'Summer', 'Resort', 'Dresses'],
    createdAt: '2026-08-05',
    variants: [
      { id: 'v7-1', title: 'Terracotta Clay / S', size: 'S', color: 'Terracotta Clay', colorHex: '#A85A44', price: 190, compareAtPrice: 190, inventoryQuantity: 9, sku: 'SFY-LND-TER-S' },
      { id: 'v7-2', title: 'Terracotta Clay / M', size: 'M', color: 'Terracotta Clay', colorHex: '#A85A44', price: 190, compareAtPrice: 190, inventoryQuantity: 7, sku: 'SFY-LND-TER-M' },
      { id: 'v7-3', title: 'Natural Ecru / S', size: 'S', color: 'Natural Ecru', colorHex: '#EBE5D8', price: 190, compareAtPrice: 190, inventoryQuantity: 12, sku: 'SFY-LND-ECR-S' },
      { id: 'v7-4', title: 'Natural Ecru / M', size: 'M', color: 'Natural Ecru', colorHex: '#EBE5D8', price: 190, compareAtPrice: 190, inventoryQuantity: 10, sku: 'SFY-LND-ECR-M' }
    ]
  },
  {
    id: 'prod-8',
    handle: 'the-relaxed-pleated-dress-pant',
    title: 'The Men’s Relaxed Pleated Dress Pant',
    subtitle: 'Tropical Wool Blend',
    description: 'A modern staple designed for versatile smart-casual dressing. Crafted from a breathable tropical wool blend with a relaxed taper, single front pleats, and side waist adjusters.',
    details: [
      'Side waist adjusters for a tailored fit without a belt',
      'Single reverse pleats for drape and leg mobility',
      'Slanted side pockets and button-through rear welt pockets',
      'Unhemmed or clean finished 32-inch inseam'
    ],
    materials: '55% Fine Wool, 43% Recycled Poly, 2% Spandex.',
    care: [
      'Dry clean or cold gentle machine wash',
      'Hang dry on pant hanger',
      'Steam iron on medium'
    ],
    fit: 'Relaxed thigh with a gentle modern taper to cuff.',
    price: 150,
    compareAtPrice: 150,
    isNew: false,
    isBestSeller: true,
    isOnSale: false,
    category: 'Pants',
    gender: 'Men',
    rating: 4.8,
    reviewCount: 43,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['30', '32', '34', '36', '38'],
    availableColors: [
      { name: 'Slate Grey', hex: '#5A5F66' },
      { name: 'Charcoal Black', hex: '#212224' },
      { name: 'Khaki Beige', hex: '#BFB5A3' }
    ],
    tags: ['Tailored', 'Menswear', 'Pants'],
    createdAt: '2026-07-20',
    variants: [
      { id: 'v8-1', title: 'Slate Grey / 30', size: '30', color: 'Slate Grey', colorHex: '#5A5F66', price: 150, compareAtPrice: 150, inventoryQuantity: 7, sku: 'SFY-MPN-SLT-30' },
      { id: 'v8-2', title: 'Slate Grey / 32', size: '32', color: 'Slate Grey', colorHex: '#5A5F66', price: 150, compareAtPrice: 150, inventoryQuantity: 15, sku: 'SFY-MPN-SLT-32' },
      { id: 'v8-3', title: 'Slate Grey / 34', size: '34', color: 'Slate Grey', colorHex: '#5A5F66', price: 150, compareAtPrice: 150, inventoryQuantity: 12, sku: 'SFY-MPN-SLT-34' },
      { id: 'v8-4', title: 'Charcoal Black / 32', size: '32', color: 'Charcoal Black', colorHex: '#212224', price: 150, compareAtPrice: 150, inventoryQuantity: 18, sku: 'SFY-MPN-BLK-32' }
    ]
  },
  {
    id: 'prod-9',
    handle: 'the-supple-leather-moto-jacket',
    title: 'The Supple Nappa Leather Moto Jacket',
    subtitle: 'Buttery Lambskin Leather',
    description: 'An iconic silhouette re-imagined with minimalist hardware and an ultra-soft lambskin finish. Designed with asymmetrical zipper closure, matte gunmetal hardware, and satin lining.',
    details: [
      '100% full-grain buttery lambskin that softens with wear',
      'Custom gunmetal Japanese YKK zip hardware',
      'Two zip hand pockets and one ticket pocket',
      'Contoured ergonomic sleeve seams'
    ],
    materials: '100% Full-Grain Lambskin Leather. Lining: 100% Polyester Satin.',
    care: [
      'Leather specialist clean only',
      'Condition annually with organic leather balm',
      'Keep away from prolonged dampness'
    ],
    fit: 'Slim tailored fit. If wearing heavy sweaters underneath, consider sizing up.',
    price: 420,
    compareAtPrice: 420,
    isNew: true,
    isBestSeller: true,
    isOnSale: false,
    category: 'Jackets',
    gender: 'Women',
    rating: 5.0,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Cognac Saddle', hex: '#784326' }
    ],
    tags: ['Leather', 'Jackets', 'Edgy Luxury'],
    createdAt: '2026-08-18',
    variants: [
      { id: 'v9-1', title: 'Onyx Black / S', size: 'S', color: 'Onyx Black', colorHex: '#111111', price: 420, compareAtPrice: 420, inventoryQuantity: 4, sku: 'SFY-LTH-BLK-S' },
      { id: 'v9-2', title: 'Onyx Black / M', size: 'M', color: 'Onyx Black', colorHex: '#111111', price: 420, compareAtPrice: 420, inventoryQuantity: 7, sku: 'SFY-LTH-BLK-M' },
      { id: 'v9-3', title: 'Cognac Saddle / S', size: 'S', color: 'Cognac Saddle', colorHex: '#784326', price: 420, compareAtPrice: 420, inventoryQuantity: 3, sku: 'SFY-LTH-COG-S' },
      { id: 'v9-4', title: 'Cognac Saddle / M', size: 'M', color: 'Cognac Saddle', colorHex: '#784326', price: 420, compareAtPrice: 420, inventoryQuantity: 5, sku: 'SFY-LTH-COG-M' }
    ]
  },
  {
    id: 'prod-10',
    handle: 'the-italian-leather-minimalist-tote',
    title: 'The Italian Leather Minimalist Tote',
    subtitle: 'Handcrafted Vegetable-Tanned Leather',
    description: 'Form meets function in this architectural everyday tote. Spacious enough to hold a 15-inch laptop and daily essentials, featuring reinforced handles, magnetic closure, and removable interior zip pouch.',
    details: [
      'Supple vegetable-tanned Italian leather with hand-painted raw edges',
      'Fits up to a 15" laptop with room for planner and water bottle',
      'Drop handles engineered for comfortable shoulder carry',
      'Reinforced structured base that stands upright'
    ],
    materials: '100% Full-Grain Tuscan Vegetable-Tanned Cowhide.',
    care: [
      'Wipe clean with a damp microfiber cloth',
      'Store in provided protective dust bag when not in use'
    ],
    fit: 'One Size: 14" H x 18" W x 5.5" D. Handle drop: 10".',
    price: 220,
    compareAtPrice: 220,
    isNew: false,
    isBestSeller: true,
    isOnSale: false,
    category: 'Accessories',
    gender: 'Unisex',
    rating: 4.9,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Saddle Tan', hex: '#8B5A2B' },
      { name: 'Jet Noir', hex: '#161616' },
      { name: 'Cream Latte', hex: '#E2D8C9' }
    ],
    tags: ['Accessories', 'Leather', 'Bags'],
    createdAt: '2026-06-10',
    variants: [
      { id: 'v10-1', title: 'Saddle Tan / One Size', size: 'One Size', color: 'Saddle Tan', colorHex: '#8B5A2B', price: 220, compareAtPrice: 220, inventoryQuantity: 15, sku: 'SFY-ACC-TOT-SAN' },
      { id: 'v10-2', title: 'Jet Noir / One Size', size: 'One Size', color: 'Jet Noir', colorHex: '#161616', price: 220, compareAtPrice: 220, inventoryQuantity: 20, sku: 'SFY-ACC-TOT-NOI' }
    ]
  },
  {
    id: 'prod-11',
    handle: 'the-heavyweight-organic-cotton-tee',
    title: 'The Heavyweight Organic Boxy Tee',
    subtitle: '280 GSM Compact Spun Cotton',
    description: 'The definitive luxury t-shirt. Substantial weight without stiffness, featuring a dense ribbed neckline that never sags, dropped shoulders, and a clean boxy drape.',
    details: [
      '280 GSM heavyweight organic cotton jersey',
      'Thick 1-inch bound collar ribbing with twin-needle stitch',
      'Pre-shrunk fabric to prevent post-wash shrinkage',
      'Smooth clean finish that pairs effortlessly under blazers'
    ],
    materials: '100% GOTS Certified Organic Combed Cotton.',
    care: [
      'Machine wash warm inside out with like colors',
      'Tumble dry low or hang dry'
    ],
    fit: 'Relaxed boxy cut. Fits true to size.',
    price: 60,
    compareAtPrice: 60,
    isNew: false,
    isBestSeller: true,
    isOnSale: false,
    category: 'Tops',
    gender: 'Unisex',
    rating: 4.9,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableColors: [
      { name: 'Chalk White', hex: '#F7F6F2' },
      { name: 'Pitch Black', hex: '#141414' },
      { name: 'Sage Leaf', hex: '#637061' },
      { name: 'Warm Sand', hex: '#CBBFA8' }
    ],
    tags: ['Tee', 'Essentials', 'Cotton'],
    createdAt: '2026-05-12',
    variants: [
      { id: 'v11-1', title: 'Chalk White / S', size: 'S', color: 'Chalk White', colorHex: '#F7F6F2', price: 60, compareAtPrice: 60, inventoryQuantity: 30, sku: 'SFY-TEE-WHT-S' },
      { id: 'v11-2', title: 'Chalk White / M', size: 'M', color: 'Chalk White', colorHex: '#F7F6F2', price: 60, compareAtPrice: 60, inventoryQuantity: 45, sku: 'SFY-TEE-WHT-M' },
      { id: 'v11-3', title: 'Chalk White / L', size: 'L', color: 'Chalk White', colorHex: '#F7F6F2', price: 60, compareAtPrice: 60, inventoryQuantity: 28, sku: 'SFY-TEE-WHT-L' },
      { id: 'v11-4', title: 'Pitch Black / M', size: 'M', color: 'Pitch Black', colorHex: '#141414', price: 60, compareAtPrice: 60, inventoryQuantity: 35, sku: 'SFY-TEE-BLK-M' }
    ]
  },
  {
    id: 'prod-12',
    handle: 'the-merino-ribbed-knit-midi-skirt',
    title: 'The Merino Ribbed Knit Midi Skirt',
    subtitle: 'Extra-Fine Australian Merino Wool',
    description: 'A versatile staple for elevated modular dressing. Crafted in a rich rib stitch that hugs comfortably without constriction, finished with a flexible elasticated waistband and side hem slit.',
    details: [
      'Substantial wide vertical rib knit that elongates the frame',
      'Comfort-stretch enclosed waistband with zero rolling',
      'Subtle 8-inch side walking slit',
      'Pairs perfectly with our Atelier Blazer and Knit Mocknecks'
    ],
    materials: '100% Extra-Fine Australian Merino Wool.',
    care: [
      'Hand wash in cold water or dry clean',
      'Dry flat on a towel',
      'Do not hang to preserve elastic shape'
    ],
    fit: 'Form-fitting with natural stretch. Model is 5\'9" wearing size S.',
    price: 140,
    compareAtPrice: 140,
    isNew: true,
    isBestSeller: false,
    isOnSale: false,
    category: 'Pants',
    gender: 'Women',
    rating: 4.8,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Oatmeal Taupe', hex: '#C9BCAC' },
      { name: 'Midnight Charcoal', hex: '#222326' }
    ],
    tags: ['Knitwear', 'Merino', 'Skirts', 'Sale'],
    createdAt: '2026-08-12',
    variants: [
      { id: 'v12-1', title: 'Oatmeal Taupe / S', size: 'S', color: 'Oatmeal Taupe', colorHex: '#C9BCAC', price: 140, compareAtPrice: 140, inventoryQuantity: 8, sku: 'SFY-SKT-OAT-S' },
      { id: 'v12-2', title: 'Oatmeal Taupe / M', size: 'M', color: 'Oatmeal Taupe', colorHex: '#C9BCAC', price: 140, compareAtPrice: 140, inventoryQuantity: 12, sku: 'SFY-SKT-OAT-M' },
      { id: 'v12-3', title: 'Midnight Charcoal / S', size: 'S', color: 'Midnight Charcoal', colorHex: '#222326', price: 140, compareAtPrice: 140, inventoryQuantity: 10, sku: 'SFY-SKT-BLK-S' }
    ]
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    date: 'August 24, 2026',
    title: 'Flawless tailoring and silhouette',
    comment: 'The quality of the wool and stitching on the Atelier Blazer is on par with luxury houses charging triple the price. The shoulder structure gives immediate polish. Will definitely be purchasing more.',
    verified: true,
    fitFeedback: 'True to Size',
    sizePurchased: 'Size M in Oatmeal Taupe',
    helpfulCount: 34
  },
  {
    id: 'rev-2',
    author: 'Marcus Sterling',
    rating: 5,
    date: 'August 18, 2026',
    title: 'The best poplin shirt I own',
    comment: 'Substantial crispness with a silky touch. The relaxed boxy cut looks effortlessly sharp both under a blazer or untucked over trousers on weekends.',
    verified: true,
    fitFeedback: 'True to Size',
    sizePurchased: 'Size L in Crisp Cloud White',
    helpfulCount: 21
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen-Laurent',
    rating: 5,
    date: 'August 12, 2026',
    title: 'The silk drape is breathtaking',
    comment: 'I wore the Silk Bias-Cut Maxi to an evening gala in Toronto and received non-stop compliments. The 22-momme silk is thick enough that it does not cling awkwardly.',
    verified: true,
    fitFeedback: 'True to Size',
    sizePurchased: 'Size S in Champagne Sand',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    author: 'David Kim',
    rating: 5,
    date: 'July 30, 2026',
    title: 'Exceptional craftsmanship and customer care',
    comment: 'I called customer support to ask for sizing advice before ordering the Belted Overcoat. They were extremely attentive and knowledgeable. The coat arrived packaged in a beautiful garment bag.',
    verified: true,
    fitFeedback: 'Runs Large',
    sizePurchased: 'Size M in Camel Tan',
    helpfulCount: 15
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Style For Yourself delivers that rare intersection of haute couture aesthetic and approachable, honest luxury. Every piece I own feels curated specifically for my wardrobe.',
    author: 'Claire Delacroix',
    location: 'Toronto, Canada',
    verified: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    productName: 'The Atelier Blazer & Silk Maxi'
  },
  {
    id: 'test-2',
    quote: 'Finding men\'s tailoring with this degree of modern proportion and heavyweight fabric was nearly impossible before Style For Yourself. The customer service is world-class.',
    author: 'Julian Montgomery',
    location: 'New York, NY',
    verified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    productName: 'The Relaxed Oxford & Overcoat'
  },
  {
    id: 'test-3',
    quote: 'The fabric quality speaks for itself. The trousers have transformed how I dress for both boardroom meetings and evening dinners.',
    author: 'Dr. Evelyn Morales',
    location: 'Vancouver, BC',
    verified: true,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    productName: 'High-Waisted Pleated Trouser'
  }
];

export const LOOKBOOK_DATA: LookbookItem[] = [
  {
    id: 'look-1',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85',
    handle: 'look-1',
    caption: 'Modern minimalism in natural linen tones.',
    productId: 'prod-7',
    productName: 'The Sculpted Linen Halter Midi',
    price: 190
  },
  {
    id: 'look-2',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
    handle: 'look-2',
    caption: 'Effortless tailored layering for the modern gentleman.',
    productId: 'prod-6',
    productName: 'The Pure Cashmere Crewneck',
    price: 210
  },
  {
    id: 'look-3',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85',
    handle: 'look-3',
    caption: 'Golden hour in 100% sandwashed mulberry silk.',
    productId: 'prod-2',
    productName: 'The Silk Bias-Cut Maxi Dress',
    price: 260
  },
  {
    id: 'look-4',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
    handle: 'look-4',
    caption: 'Power tailoring refined: The Atelier double-breasted cut.',
    productId: 'prod-1',
    productName: 'The Atelier Double-Breasted Blazer',
    price: 320
  },
  {
    id: 'look-5',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=85',
    handle: 'look-5',
    caption: 'Architectural pleats and everyday ease.',
    productId: 'prod-4',
    productName: 'The High-Waisted Pleated Trouser',
    price: 170
  },
  {
    id: 'look-6',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
    handle: 'look-6',
    caption: 'Double-faced cashmere warmth for the city.',
    productId: 'prod-5',
    productName: 'The Belted Cashmere Overcoat',
    price: 480
  }
];

export const DISCOUNT_CODES: Record<string, { discountPercent: number; description: string }> = {
  'STYLE15': { discountPercent: 15, description: '15% Off First Order' },
  'WELCOME20': { discountPercent: 20, description: '20% VIP Welcome Discount' },
  'LUXURY10': { discountPercent: 10, description: '10% Seasonal Privilege' },
  'FREESHIP': { discountPercent: 0, description: 'Complimentary Express Shipping' }
};

export const PRESS_MENTIONS = [
  {
    outlet: 'VOGUE EDITORIAL',
    quote: 'Style For Yourself is rewriting the codes of modern tailoring with architectural silhouettes and peerless fabric weight.'
  },
  {
    outlet: 'GQ STYLE GUIDE',
    quote: 'The elusive holy grail: impeccably tailored virgin wool blazers and poplin shirts priced honestly without retail markup.'
  },
  {
    outlet: 'HARPER’S BAZAAR',
    quote: 'Fluid silk slip dresses cut on the bias to perfection. A standout wardrobe foundation for the discerning minimalist.'
  }
];

export const INSTAGRAM_FEED = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    handle: '@clairedelacroix',
    caption: 'Monday tailored in the Atelier double-breasted blazer.'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    handle: '@marcus.sartorial',
    caption: 'Subtle drape of pure Mongolian cashmere in Toronto.'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    handle: '@sophia.laurent',
    caption: 'Evening dusk in sandwashed silk slip dress.'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    handle: '@julian_atelier',
    caption: 'Autumn outerwear crafted to endure.'
  }
];

