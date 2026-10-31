import wordmark from "../../assets/ordr-wordmark.svg";
import { motion, useReducedMotion } from "framer-motion";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";
export const AboutPage = () => {
  const reduced = useReducedMotion();
  return (
    <main id="about">
      <section
        className="hero p-[192px_2.5vw_0] text-center"
        aria-labelledby="hero-title"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow tracking-[14px] uppercase">Note from Ordr</p>
          <h1 id="hero-title">We love health</h1>
          <motion.div
            className="hero-rule h-px bg-[#3d433b] w-full origin-center"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.25 }}
          />
          <p className="hero-subtitle text-[clamp(65px,6.41vw,123px)] italic leading-[0.8] tracking-[-1px] mt-[52px]">
            We hate health content
          </p>
        </motion.div>
      </section>
      <SectionOne />
      <SectionTwo />
      <section
        className="about-closing min-h-[85svh] p-[110px_2.5vw_28px] flex flex-col items-center justify-end gap-[68px]"
        aria-label="Our purpose"
      >
        <p className="eyebrow tracking-[14px] uppercase">
          All with the goal of bringing everything into
        </p>
        <img className="w-full" src={wordmark} alt="ORDR" />
      </section>
    </main>
  );
};
