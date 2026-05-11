"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.18,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.15
    });

    let frame = 0;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
