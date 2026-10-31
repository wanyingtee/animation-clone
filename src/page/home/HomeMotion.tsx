import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/** A stationary mask with scroll-scrubbed type rising through its baseline. */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  revealed,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  revealed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .96", "end .55"],
  });
  const y = useTransform(
    scrollYProgress,
    [delay, Math.min(delay + 0.55, 1)],
    ["110%", "0%"],
  );
  const opacity = useTransform(
    scrollYProgress,
    [delay, Math.min(delay + 0.45, 1)],
    [0, 1],
  );
  return (
    <div
      ref={ref}
      className={`home-reveal overflow-hidden py-[0.08em] my-[-0.08em] ${className}`}
    >
      <motion.div
        initial={false}
        style={
          revealed === undefined
            ? { y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }
            : undefined
        }
        animate={
          revealed === undefined
            ? undefined
            : {
                y: reduced || revealed ? "0%" : "110%",
                opacity: reduced || revealed ? 1 : 0,
              }
        }
        transition={{
          duration: reduced ? 0 : duration,
          delay: reduced || !revealed ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
