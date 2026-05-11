import { LuxuryHome } from "@/components/luxury-home";
import { collections, products, testimonials } from "@/lib/data";

export const runtime = "edge";
export const revalidate = 3600;

export default function Home() {
  return <LuxuryHome collections={collections} products={products} testimonials={testimonials} />;
}
