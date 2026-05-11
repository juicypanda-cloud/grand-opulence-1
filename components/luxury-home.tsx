"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Collection, Product } from "@/lib/data";
import { blurDataUrl, heroImage } from "@/lib/data";
import { MagneticButton } from "@/components/magnetic-button";

const LuxuryScene = dynamic(
  () => import("@/components/luxury-scene").then((module) => module.LuxuryScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,183,111,0.16),transparent_54%)]" />
    )
  }
);

type LuxuryHomeProps = {
  collections: Collection[];
  products: Product[];
  testimonials: { quote: string; source: string }[];
};

const menuItems = [
  { label: "Collections", href: "#collections" },
  { label: "Atelier", href: "#story" },
  { label: "Objects", href: "#products" },
  { label: "Experience", href: "#experience" }
];

export function LuxuryHome({ collections, products, testimonials }: LuxuryHomeProps) {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  useEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 64, filter: "blur(18px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element) => {
        const distance = Number(element.dataset.float || 36);
        gsap.to(element, {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.3
          }
        });
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="relative overflow-hidden bg-[#050505] text-stone-100">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence>{menuOpen ? <MenuOverlay close={() => setMenuOpen(false)} /> : null}</AnimatePresence>

      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden px-5 pb-12 pt-24 sm:px-8 lg:px-12"
      >
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <Image
            src={heroImage}
            alt="A cinematic high-fashion editorial portrait for Maison Aurum"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataUrl}
            sizes="100vw"
            className="object-cover opacity-[0.58]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.68)_34%,rgba(5,5,5,0.18)_58%,#050505_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(224,183,111,0.32),transparent_28%),radial-gradient(circle_at_18%_70%,rgba(224,183,111,0.16),transparent_28%)]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <span className="luxury-streak left-[18%] top-[18%]" />
          <span className="luxury-streak left-[72%] top-[28%] animation-delay-700" />
          <span className="luxury-streak left-[44%] top-[74%] animation-delay-1200" />
        </div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-[1680px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.48em] text-[#e0b76f]"
            >
              Private collection 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 48, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.25, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl font-serif text-[clamp(4.8rem,16vw,18rem)] uppercase leading-[0.72] tracking-[-0.09em] text-balance"
            >
              Maison
              <span className="block pl-[0.12em] text-[#f6e0af]">Aurum</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
              className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center"
            >
              <MagneticButton href="#products">Shop signature pieces</MagneticButton>
              <MagneticButton href="#story" variant="ghost">
                Enter the atelier
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.72, ease: "easeOut" }}
            className="ml-auto max-w-md rounded-[2rem] border border-white/10 bg-black/24 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            <div className="mb-12 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-white/48">
              <span>001 / Cinematic retail</span>
              <span>Paris</span>
            </div>
            <p className="text-lg leading-8 text-stone-200/84">
              A digital flagship for tailored silhouettes, sculptural jewelry, and ritual objects
              composed with black, light, gold, and restraint.
            </p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] uppercase tracking-[0.4em] text-white/45">
          Scroll
          <span className="h-16 w-px overflow-hidden bg-white/12">
            <span className="block h-6 w-px animate-scroll-indicator bg-[#e0b76f]" />
          </span>
        </div>
      </section>

      <section id="collections" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <SectionHeader
          eyebrow="Featured collection"
          title="Editorial silhouettes for night, ritual, and arrival."
          description="Asymmetrical campaign compositions, tactile hover states, and quiet gold details guide shoppers through a private collection."
        />

        <div className="mx-auto mt-16 grid max-w-[1500px] gap-5 lg:grid-cols-12 lg:auto-rows-[240px]">
          {collections.map((collection) => (
            <motion.article
              data-reveal
              key={collection.title}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className={[
                "group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#101010] shadow-2xl shadow-black/40",
                collection.size === "tall" ? "min-h-[620px] lg:col-span-5 lg:row-span-2" : "",
                collection.size === "wide" ? "min-h-[380px] lg:col-span-7" : "",
                collection.size === "compact" ? "min-h-[380px] lg:col-span-7" : ""
              ].join(" ")}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                placeholder="blur"
                blurDataURL={blurDataUrl}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/28 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="mb-3 text-[0.65rem] uppercase tracking-[0.38em] text-[#e0b76f]">
                  {collection.eyebrow}
                </p>
                <h3 className="font-serif text-4xl uppercase leading-none tracking-[-0.04em] sm:text-6xl">
                  {collection.title}
                </h3>
                <div className="mt-6 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.3em] text-white/62">
                  Explore edit
                  <span className="h-px w-16 bg-[#e0b76f] transition-all duration-500 group-hover:w-28" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="story" className="relative border-y border-white/8 bg-[#090909] px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(224,183,111,0.13),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-float="52" className="relative min-h-[560px] overflow-hidden rounded-[2.4rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85"
              alt="Gold jewelry on a dark luxury surface"
              fill
              placeholder="blur"
              blurDataURL={blurDataUrl}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/16" />
          </div>

          <div data-reveal className="lg:pl-10">
            <p className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.46em] text-[#e0b76f]">
              Brand story
            </p>
            <h2 className="font-serif text-[clamp(3.6rem,8vw,10rem)] uppercase leading-[0.82] tracking-[-0.075em]">
              Crafted like cinema. Sold like art.
            </h2>
            <div className="mt-10 grid gap-7 text-stone-300/82 sm:grid-cols-2">
              <p className="text-lg leading-8">
                The maison balances exacting atelier codes with spatial digital storytelling:
                oversized type, slow reveals, precision product cards, and cinematic light.
              </p>
              <p className="text-lg leading-8">
                Every screen is designed to feel quiet, deliberate, and collectible, with motion
                reserved for depth, touch, and dramatic transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <SectionHeader
          eyebrow="Signature products"
          title="Objects of desire with a private-client rhythm."
          description="Hover, inspect, and move through a refined commerce layer built for fashion, jewelry, and lifestyle."
        />

        <div className="mx-auto mt-16 grid max-w-[1500px] gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <motion.article
              data-reveal
              key={product.name}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 190, damping: 22 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur"
            >
              <div className="relative aspect-[0.82] overflow-hidden bg-[#111]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-transparent to-black/10 opacity-80" />
                <div className="absolute left-5 top-5 rounded-full border border-[#e0b76f]/30 bg-black/35 px-4 py-2 text-[0.58rem] uppercase tracking-[0.25em] text-[#f3d99f] backdrop-blur">
                  {product.accent}
                </div>
                <button
                  type="button"
                  className="absolute bottom-5 left-5 right-5 translate-y-5 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white opacity-0 backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Quick preview
                </button>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-3xl uppercase leading-none tracking-[-0.04em]">
                    {product.name}
                  </h3>
                  <span className="text-sm text-[#f3d99f]">{product.price}</span>
                </div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/42">{product.category}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-[#e0b76f]/70 via-white/10 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="relative min-h-[820px] overflow-hidden border-y border-white/8 bg-[#080807] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="absolute inset-0 opacity-70">
          <LuxuryScene />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.16)_34%,#050505_88%)]" />
        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div data-reveal>
            <p className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.46em] text-[#e0b76f]">
              Immersive showcase
            </p>
            <h2 className="font-serif text-[clamp(3.6rem,9vw,11rem)] uppercase leading-[0.78] tracking-[-0.08em]">
              Light becomes material.
            </h2>
          </div>
          <div data-reveal className="max-w-2xl rounded-[2rem] border border-white/10 bg-black/35 p-7 backdrop-blur-2xl lg:ml-auto">
            <p className="text-xl leading-9 text-stone-200/82">
              Subtle Three.js depth, gold refractions, and pointer-reactive motion add a luxury
              signature without overwhelming the commerce experience.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["90+", "Edge", "Motion-safe"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[#f3d99f]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div data-reveal>
              <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.46em] text-[#e0b76f]">
                Social proof
              </p>
              <h2 className="max-w-4xl font-serif text-6xl uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl">
                Quiet praise. Global presence.
              </h2>
            </div>
            <MagneticButton href="#collections" variant="ghost">
              View collection
            </MagneticButton>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.figure
                data-reveal
                key={testimonial.source}
                animate={reducedMotion ? undefined : { y: index % 2 === 0 ? [0, -10, 0] : [0, 10, 0] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-[2rem] border border-white/10 bg-[#0e0e0e] p-7 shadow-xl shadow-black/20"
              >
                <blockquote className="text-xl leading-8 text-stone-200/86">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 text-[0.62rem] uppercase tracking-[0.32em] text-[#e0b76f]">
                  {testimonial.source}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Navigation({
  menuOpen,
  setMenuOpen
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-2xl">
        <a href="#" className="font-serif text-2xl uppercase tracking-[-0.04em] text-[#f6e0af]">
          Aurum
        </a>
        <nav className="hidden items-center gap-8 text-[0.62rem] uppercase tracking-[0.28em] text-white/62 md:flex">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-[#f3d99f]">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="group flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.28em] text-white/72"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          Menu
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition group-hover:border-[#e0b76f]/70">
            <span className="relative h-px w-4 bg-[#f3d99f] before:absolute before:-top-1.5 before:left-0 before:h-px before:w-4 before:bg-[#f3d99f] after:absolute after:left-0 after:top-1.5 after:h-px after:w-4 after:bg-[#f3d99f]" />
          </span>
        </button>
      </div>
    </header>
  );
}

function MenuOverlay({ close }: { close: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#050505]/96 px-6 py-8 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-full max-w-[1500px] flex-col">
        <div className="flex items-center justify-between">
          <span className="font-serif text-3xl uppercase text-[#f6e0af]">Aurum</span>
          <button
            type="button"
            onClick={close}
            className="rounded-full border border-white/15 px-5 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-white/72"
          >
            Close
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-5">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={close}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.18, duration: 0.7 }}
              className="group font-serif text-[clamp(3.8rem,12vw,12rem)] uppercase leading-[0.82] tracking-[-0.08em] text-white/86 transition hover:text-[#f3d99f]"
            >
              {item.label}
              <span className="ml-6 inline-block h-px w-0 align-middle bg-[#e0b76f] transition-all duration-700 group-hover:w-40" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div data-reveal className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div>
        <p className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.46em] text-[#e0b76f]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-[clamp(3.4rem,7.8vw,9rem)] uppercase leading-[0.86] tracking-[-0.075em]">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-lg leading-8 text-stone-300/78 lg:ml-auto">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="font-serif text-6xl uppercase leading-none tracking-[-0.06em] text-[#f6e0af] md:text-8xl">
            Aurum
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            A premium ecommerce concept blending cinematic editorial design, modern performance,
            and subtle immersive technology.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-[0.62rem] uppercase tracking-[0.28em] text-white/48">
          {["Instagram", "Concierge", "Privacy", "Vercel-ready"].map((item) => (
            <a key={item} href="#" className="transition hover:text-[#f3d99f]">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
