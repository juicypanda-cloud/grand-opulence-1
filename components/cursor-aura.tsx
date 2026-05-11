"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    if (!aura || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const animate = () => {
      aura.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,183,111,0.20),rgba(224,183,111,0.06)_38%,transparent_70%)] blur-xl mix-blend-screen md:block"
    />
  );
}
