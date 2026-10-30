import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionThree } from "./SectionThree";
function MovingLine({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(
    progress,
    [0.02 + index * 0.045, 0.18 + index * 0.045],
    [150, 0],
  );
  const opacity = useTransform(
    progress,
    [0.02 + index * 0.045, 0.14 + index * 0.045],
    [0, 1],
  );
  return (
    <motion.div
      className={`statement-line line-${index}`}
      style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }}
    >
      {children}
    </motion.div>
  );
}
export const SectionTwo = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <section ref={ref} className="manifesto">
      <div className="manifesto-sticky">
        <div className="manifesto-content">
          <h2>
            You start <em>curious</em>
            <br />
            but end <em>overwhelmed</em>
          </h2>
          <div className="statement">
            <MovingLine progress={progress} index={0}>
              Finding the
            </MovingLine>
            <MovingLine progress={progress} index={1}>
              <em>“Good Stuff”</em>
            </MovingLine>
            <MovingLine progress={progress} index={2}>
              Shouldn't feel
            </MovingLine>
            <MovingLine progress={progress} index={3}>
              Like a <em>second job</em>
            </MovingLine>
          </div>
        </div>
        <SectionThree progress={progress} />
      </div>
    </section>
  );
};
