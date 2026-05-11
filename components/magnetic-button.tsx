"use client";

import { HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode } from "react";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function MagneticButton({
  children,
  className = "",
  variant = "solid",
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.7 });

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
        props.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        x.set(0);
        y.set(0);
        props.onMouseLeave?.(event);
      }}
      whileTap={{ scale: 0.97 }}
      className={[
        "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] transition duration-500",
        variant === "solid"
          ? "border border-[#f3d99f]/50 bg-[#e0b76f] text-black shadow-[0_0_34px_rgba(224,183,111,0.18)] hover:border-[#fff1c9] hover:bg-[#f3d99f]"
          : "border border-white/15 bg-white/[0.03] text-[#f3d99f] backdrop-blur-xl hover:border-[#e0b76f]/70 hover:bg-[#e0b76f]/10",
        className
      ].join(" ")}
    >
      <span className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
