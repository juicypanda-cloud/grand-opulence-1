export type Collection = {
  title: string;
  eyebrow: string;
  image: string;
  size: "tall" | "wide" | "compact";
};

export type Product = {
  name: string;
  category: string;
  price: string;
  image: string;
  accent: string;
};

export const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSdnJyBjeD0nNTAlJyBjeT0nNDAlJyByPSc3MCUnPjxzdG9wIHN0b3AtY29sb3I9JyNiYjg3MzUnLz48c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyMwNTA1MDUnLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCBmaWxsPSd1cmwoI2cpJyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnLz48L3N2Zz4=";

export const heroImage =
  "/visuals/hero-cinematic.svg";

export const collections: Collection[] = [
  {
    title: "Nocturne Tailoring",
    eyebrow: "Atelier 01",
    image: "/visuals/nocturne-tailoring.svg",
    size: "tall"
  },
  {
    title: "Gilded Objects",
    eyebrow: "Jewelry",
    image: "/visuals/gilded-objects.svg",
    size: "wide"
  },
  {
    title: "Maison Essentials",
    eyebrow: "Lifestyle",
    image: "/visuals/maison-object.svg",
    size: "compact"
  }
];

export const products: Product[] = [
  {
    name: "Eclipse Pavé Cuff",
    category: "18k gold / black diamond",
    price: "$4,900",
    image: "/visuals/gilded-objects.svg",
    accent: "Limited edition"
  },
  {
    name: "Obsidian Silk Coat",
    category: "Tailored silk faille",
    price: "$3,240",
    image: "/visuals/nocturne-tailoring.svg",
    accent: "Runway reserve"
  },
  {
    name: "Aurum Travel Case",
    category: "Leather / brushed brass",
    price: "$1,180",
    image: "/visuals/maison-object.svg",
    accent: "Maison icon"
  },
  {
    name: "Velvet Night Serum",
    category: "Lifestyle ritual",
    price: "$290",
    image: "/visuals/product-ritual.svg",
    accent: "New arrival"
  }
];

export const testimonials = [
  {
    quote:
      "A digital flagship with the restraint of couture and the confidence of a museum installation.",
    source: "LUXE INDEX"
  },
  {
    quote:
      "Every interaction feels composed, tactile, and deliberately expensive.",
    source: "MODE REVIEW"
  },
  {
    quote:
      "The kind of experience that makes minimalism feel maximal in emotion.",
    source: "ATELIER JOURNAL"
  }
];
