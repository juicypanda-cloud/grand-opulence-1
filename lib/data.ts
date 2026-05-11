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
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90";

export const collections: Collection[] = [
  {
    title: "Nocturne Tailoring",
    eyebrow: "Atelier 01",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    size: "tall"
  },
  {
    title: "Gilded Objects",
    eyebrow: "Jewelry",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=85",
    size: "wide"
  },
  {
    title: "Maison Essentials",
    eyebrow: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1506629905607-d9d297d8f1f3?auto=format&fit=crop&w=1200&q=85",
    size: "compact"
  }
];

export const products: Product[] = [
  {
    name: "Eclipse Pavé Cuff",
    category: "18k gold / black diamond",
    price: "$4,900",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
    accent: "Limited edition"
  },
  {
    name: "Obsidian Silk Coat",
    category: "Tailored silk faille",
    price: "$3,240",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    accent: "Runway reserve"
  },
  {
    name: "Aurum Travel Case",
    category: "Leather / brushed brass",
    price: "$1,180",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    accent: "Maison icon"
  },
  {
    name: "Velvet Night Serum",
    category: "Lifestyle ritual",
    price: "$290",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
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
