import { motion, useReducedMotion } from "framer-motion";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";
export const AboutPage = () => {
  const reduced = useReducedMotion();
  return (
    <main id="about">
      <section className="hero" aria-labelledby="hero-title">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Note from Ordr</p>
          <h1 id="hero-title">We love health</h1>
          <motion.div
            className="hero-rule"
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.25 }}
          />
          <p className="hero-subtitle">We hate health content</p>
        </motion.div>
      </section>
      <SectionOne />
      <SectionTwo />
      <footer className="footer">
        <p className="eyebrow">All with the goal of bringing everything into</p>
        <img className="footer-logo" src="/assets/ordr-wordmark.svg" alt="ORDR" />
        <div className="footer-links">
          <p>© 2026 ORDR. All rights reserved.</p>
          <a
            href="https://www.instagram.com/ordrhealth/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <div>
            <a href="https://www.ordrhealth.com/terms-of-conditions">
              Terms of Conditions
            </a>
            <a href="https://www.ordrhealth.com/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
