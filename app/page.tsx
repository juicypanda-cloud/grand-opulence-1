import { LuxuryHome } from "@/components/luxury-home";
import { collections, products, testimonials } from "@/lib/data";

export const dynamic = "force-static";
export const preferredRegion = "global";

export default function Home() {
  return <LuxuryHome collections={collections} products={products} testimonials={testimonials} />;
}
