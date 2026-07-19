import { products, type Product } from "@/data/products";

export type ProductDetails = Product & {
  fabric: string;
  colors: number;
  blouse: string;
  length: string;
  occasion: string;
  weight: string;
  care: string;
  description: string;
};

function pick<T>(arr: T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}

const fabrics = [
  "Soft Silk with zari border",
  "Pure Georgette with sequin work",
  "Banarasi Silk with meenakari weave",
  "Chanderi Cotton-Silk",
  "Tussar Silk with hand block print",
  "Organza with embroidered pallu",
  "Patola Silk with double ikat",
  "Kanjivaram Silk with contrast pallu",
];
const occasions = ["Festive & Wedding", "Bridal Trousseau", "Reception & Party", "Everyday Luxe", "Sangeet & Mehendi"];
const cares = ["Dry clean only. Store folded in muslin.", "Gentle hand wash in cold water. Iron on low.", "Dry clean recommended. Avoid direct sunlight."];

export function getDetails(p: Product): ProductDetails {
  return {
    ...p,
    fabric: "Fancy Fabric",
    colors: 8,
    blouse: "Blouse piece included",
    length: "6 meter with blouse",
    occasion: pick(occasions, p.slug + "o"),
    weight: `${(650 + ((p.slug.length * 17) % 350))}g approx.`,
    care: pick(cares, p.slug + "c"),
    description:
      `The ${p.title} catalogue from Devrani is a full 8-color set of premium fancy fabric, ` +
      `curated for boutique retailers. Each saree is 6 meters with blouse, and every colorway ships together — ` +
      `packed and dispatched as one carton — so your shelves land with the complete story of the design.`,
  };
}

export function getProduct(slug: string): ProductDetails | undefined {
  const p = products.find((x) => x.slug === slug);
  return p ? getDetails(p) : undefined;
}

export const featuredProducts: Product[] = [
  "devrani-patola-silk-8-110461-compressed",
  "padmavati-vol-02-devrani-8-111686",
  "gulabo-vol-13-devrani-8-111918",
  "mirzapur-vol-02-devrani-8",
  "brijwasi-vol-09-devrani-8-115472",
  "tasar-silk-vol-48",
  "neel-pari-5-99030-devrani-compressed",
  "kesar-milk-9",
]
  .map((s) => products.find((p) => p.slug === s))
  .filter((x): x is Product => !!x);
