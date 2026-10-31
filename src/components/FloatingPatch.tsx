import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/** Independent layers keep scroll, pointer, and idle movements from competing. */
export function FloatingPatch({
  src,
  className,
  rotation = 0,
}: {
  src: string;
  className: string;
  rotation?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseRotation = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const pointerY = useSpring(mouseY, { stiffness: 45, damping: 20 });
  const pointerRotation = useSpring(mouseRotation, {
    stiffness: 45,
    damping: 20,
  });
  const rotate = useTransform(pointerRotation, (value) => rotation + value);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const patchNames = [
    "hero-shoe",
    "hero-varsity",
    "preview-runner",
    "preview-atlas",
    "join-anniversary",
    "join-club-patch",
  ];
  // Utility classes can be added or reordered without changing the motion preset.
  const patchIndex = patchNames.findIndex((name) =>
    className.split(/\s+/).includes(name),
  );
  const patchName = patchNames[patchIndex] ?? "";
  const speed = 0.08 + (Math.max(patchIndex, 0) % 5) * 0.025;
  const mouseDistance = 8 + (Math.max(patchIndex, 0) % 4) * 4;
  const y = useTransform(
    scrollYProgress,
    (value) =>
      (value - 0.5) *
      (window.innerHeight + (ref.current?.offsetHeight ?? 0)) *
      speed,
  );
  useEffect(() => {
    const fine = window.matchMedia("(min-width: 992px) and (pointer: fine)");
    if (reduced) return;
    const move = (event: PointerEvent) => {
      if (!fine.matches) return;
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      mouseX.set(normalizedX * mouseDistance);
      mouseY.set(normalizedY * mouseDistance);
      mouseRotation.set(
        (normalizedX - normalizedY) * (2 + (Math.max(patchIndex, 0) % 3) * 1.5),
      );
    };
    const reset = () => {
      mouseX.set(0);
      mouseY.set(0);
      mouseRotation.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    fine.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      fine.removeEventListener("change", reset);
    };
  }, [reduced, mouseX, mouseY, mouseRotation, mouseDistance, patchIndex]);
  return (
    <div
      ref={ref}
      className={`floating-patch absolute z-4 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.div style={{ y: reduced ? 0 : y }}>
        <motion.div
          initial={
            reduced || !patchName.startsWith("hero-")
              ? false
              : {
                  x: patchName === "hero-shoe" ? "-30%" : "30%",
                  y: patchName === "hero-shoe" ? "-30%" : "30%",
                  opacity: 0,
                }
          }
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: patchName === "hero-shoe" ? 1 : 1.1,
            ease: "easeOut",
          }}
        >
          <motion.div
            style={{
              x: reduced ? 0 : x,
              y: reduced ? 0 : pointerY,
              rotate: reduced ? rotation : rotate,
            }}
          >
            <img className="patch-idle" src={src} alt="" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
