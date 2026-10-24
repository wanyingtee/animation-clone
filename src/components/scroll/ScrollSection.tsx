import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollSectionProps = {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale" | "none";
};

export const ScrollSection = ({
  children,
  animation = "fade",
}: ScrollSectionProps) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const slideY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [80, 0, 0, -80],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8],
  );

  return (
    <section ref={ref} className="relative min-h-screen">
      <motion.div
        style={{
          opacity: animation === "fade" ? opacity : 1,
          y: animation === "slide" ? slideY : 0,
          scale: animation === "scale" ? scale : 1,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};
