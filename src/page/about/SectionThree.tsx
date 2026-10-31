import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import image from "../../assets/about-mission-walking.webp";

// Finish both image animations before any text begins at 0.62.
const IMAGE_RANGE = [0.47, 0.6];

function RevealLine({
  progress,
  range,
  children,
  className,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  // Each line rises inside a stationary mask, so it never overlaps its neighbor.
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, ["110%", "0%"], {
    ease: (value) => 1 - Math.pow(1 - value, 3),
  });

  return (
    <span className={`mission-line-mask block overflow-hidden py-[0.06em] my-[-0.06em] ${className ? ` ${className}` : ""}`}>
      <motion.span
        className="block [will-change:transform,_opacity]"
        style={{
          opacity: reduced ? 1 : opacity,
          y: reduced ? 0 : y,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export const SectionThree = ({
  progress,
}: {
  progress: MotionValue<number>;
}) => {
  const reduced = useReducedMotion();
  const clipPath = useTransform(progress, IMAGE_RANGE, [
    "inset(50% 50% 50% 50%)",
    "inset(0% 0% 0% 0%)",
  ]);
  const scale = useTransform(progress, IMAGE_RANGE, [1.35, 1]);
  return (
    <motion.div
      className="mission absolute [inset:0] grid place-items-center text-[#fff] [will-change:clip-path]"
      style={{ clipPath: reduced ? "none" : clipPath }}
    >
      <motion.img
        src={image}
        alt="Two people walking in sportswear, carrying a gym bag"
        style={{ scale: reduced ? 1 : scale }}
      />
      <div className="relative text-center">
        <h2>
          <RevealLine progress={progress} range={[0.62, 0.72]}>
            So we made it
          </RevealLine>
          <RevealLine
            progress={progress}
            range={[0.63, 0.82]}
            className="mission-ours"
          >
            ours
          </RevealLine>
        </h2>
        <p>
          <RevealLine progress={progress} range={[0.72, 0.87]}>
            We filter.
          </RevealLine>
          <RevealLine progress={progress} range={[0.77, 0.92]}>
            We translate.
          </RevealLine>
          <RevealLine progress={progress} range={[0.82, 0.97]}>
            We deliver.
          </RevealLine>
        </p>
      </div>
    </motion.div>
  );
};
