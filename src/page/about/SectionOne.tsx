import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import img1 from "../../assets/about-articles-portrait.webp";
import img2 from "../../assets/about-podcast-player.webp";
import img3 from "../../assets/about-sunglasses-portrait.webp";
const lines = [
  "You’ve read the articles.",
  "Heard the long podcasts with words you need to Google.",
  "Doom scrolled supplement threads about sleep at 1 am.",
];
function Word({
  progress,
  start,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  children: string;
}) {
  const opacity = useTransform(progress, [start, start + 0.09], [0.3, 1]);
  const reduced = useReducedMotion();
  return (
    <motion.span style={{ opacity: reduced ? 1 : opacity }}>
      {children}{" "}
    </motion.span>
  );
}
function Photo({
  progress,
  start,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  start: number;
  src: string;
  alt: string;
}) {
  const scale = useTransform(progress, [start, start + 0.12], [0.5, 1]);
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  return <motion.img src={src} alt={alt} style={{ scale, opacity }} />;
}
export const SectionOne = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .8", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const left = useTransform(progress, [0, 0.3], ["50%", "0%"]);
  const right = useTransform(progress, [0, 0.3], ["-50%", "0%"]);
  let word = 0;
  return (
    <section
      ref={ref}
      className="story h-[230vh] relative mt-[200px] mb-[120px]"
      aria-label="The health content overload"
    >
      <div className="story-sticky sticky top-[calc(var(--nav-height)+(100svh-var(--nav-height)-min(520px,60svh))/2)] h-[min(520px,60svh)] flex max-w-[1500px] m-auto">
        <motion.div
          className="photo-column w-1/2 flex items-center justify-center z-2"
          style={{ x: reduced ? 0 : left }}
        >
          <div className="photo-stack relative h-full w-[min(420px,33vw)]">
            <img
              src={img1}
              alt="Person holding a stack of articles against a blue background"
            />
            {!reduced && (
              <>
                <Photo
                  progress={progress}
                  start={0.4}
                  src={img2}
                  alt="Portable music player clipped to athletic shorts"
                />
                <Photo
                  progress={progress}
                  start={0.68}
                  src={img3}
                  alt="Close-up portrait wearing dark sunglasses"
                />
              </>
            )}
          </div>
        </motion.div>
        <motion.div
          className="story-copy w-1/2 flex items-center justify-center"
          style={{ x: reduced ? 0 : right }}
        >
          <div>
            {lines.map((line) => (
              <p key={line}>
                {line.split(" ").map((text) => (
                  <Word
                    key={word}
                    progress={progress}
                    start={0.3 + word++ * 0.019}
                  >
                    {text}
                  </Word>
                ))}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
