import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import img1 from "../../assets/SectionOne_1.webp";
import img2 from "../../assets/SectionOne_2.webp";
import img3 from "../../assets/SectionOne_3.webp";

// Placeholder copy, swap in your own
const lines = [
  "You start a new habit on Monday.",
  "By Wednesday the plan is buried under ten browser tabs.",
  "By Friday you are back to guessing what actually works.",
];

// Timeline (in "seconds", mapped onto scroll progress)
const WORD_DURATION = 1;
const WORD_STAGGER = 0.2;
const IMG_DURATION = 0.6;
const IMG2_START = 0.84;
const IMG3_START = 2.86;

const words = lines.map((line) => line.split(" "));
const wordCount = words.flat().length;
const TIMELINE_LENGTH = Math.max(
  WORD_DURATION + WORD_STAGGER * (wordCount - 1),
  IMG3_START + IMG_DURATION,
);

// Smooths scroll progress so the animation trails the scrollbar slightly (like GSAP scrub)
const SCRUB = { stiffness: 120, damping: 30, restDelta: 0.001 };

const Word = ({
  progress,
  start,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  children: string;
}) => {
  const opacity = useTransform(
    progress,
    [start / TIMELINE_LENGTH, (start + WORD_DURATION) / TIMELINE_LENGTH],
    [0.5, 1],
  );
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
};

const PopImage = ({
  progress,
  start,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  start: number;
  src: string;
  alt: string;
}) => {
  const range = [
    start / TIMELINE_LENGTH,
    (start + IMG_DURATION) / TIMELINE_LENGTH,
  ];
  const scale = useTransform(progress, range, [0.5, 1]);
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ scale, opacity }}
      className="absolute h-[23.25rem] w-[20.63rem] object-cover lg:h-[32.5rem] lg:w-[26.25rem]"
    />
  );
};

export const SectionOne = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  // Halves slide apart as the section comes into view
  const { scrollYProgress: enterRaw } = useScroll({
    target: leftRef,
    offset: ["start 0.8", "center 0.5"],
  });
  const enter = useSpring(enterRaw, SCRUB);
  const leftX = useTransform(enter, [0, 1], ["50%", "10%"]);
  const leftY = useTransform(enter, [0, 1], ["-10%", "0%"]);
  const rightX = useTransform(enter, [0, 1], ["-50%", "-10%"]);
  const rightY = useTransform(enter, [0, 1], ["-15%", "0%"]);

  // Words and images reveal while the content is stuck
  const { scrollYProgress: pinnedRaw } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const pinned = useSpring(pinnedRaw, SCRUB);

  let wordIndex = 0;

  return (
    <section ref={sectionRef} className="relative z-[3] h-[200vh]">
      <div className="sticky top-[33%] flex h-[23.25rem] items-stretch lg:top-[30%] lg:h-[32.5rem]">
        <motion.div
          ref={leftRef}
          style={{ x: leftX, y: leftY }}
          className="relative z-[2] flex h-full w-1/2 items-center justify-center"
        >
          <img
            src={img1}
            alt="Portrait one"
            className="absolute h-[23.25rem] w-[20.63rem] object-cover lg:h-[32.5rem] lg:w-[26.25rem]"
          />
          <PopImage
            progress={pinned}
            start={IMG2_START}
            src={img2}
            alt="Portrait two"
          />
          <PopImage
            progress={pinned}
            start={IMG3_START}
            src={img3}
            alt="Portrait three"
          />
        </motion.div>

        <motion.div
          style={{ x: rightX, y: rightY }}
          className="relative z-[1] flex h-full w-1/2 flex-col items-center justify-center"
        >
          <div className="flex max-w-[10.5rem] flex-col gap-[4.25rem]">
            {words.map((lineWords, i) => (
              <p
                key={i}
                className="text-center font-['Times_New_Roman',TimesNewRoman,Times,Baskerville,Georgia,serif] text-[0.94rem] leading-[120%] text-[#3d433b] lg:text-[1.06rem]"
              >
                {lineWords.map((word, j) => (
                  <Word
                    key={j}
                    progress={pinned}
                    start={WORD_STAGGER * wordIndex++}
                  >
                    {word}
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
