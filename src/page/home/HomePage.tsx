import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FloatingPatch, ScrollReveal } from "./HomeMotion";
import shoe from "../../assets/patch-winged-shoe.webp";
import varsity from "../../assets/patch-varsity-letter-o.webp";
import walking from "../../assets/home-walking-editorial.webp";
import crest from "../../assets/home-benefits-crest.webp";
import runner from "../../assets/patch-running-athlete.webp";
import newsletter from "../../assets/home-weekly-order-newsletter.webp";
import atlas from "../../assets/patch-atlas-carrier.webp";
import longevity from "../../assets/archive-longevity-protocols.webp";
import reset from "../../assets/archive-nervous-system-reset.webp";
import club from "../../assets/patch-health-club.webp";
import anniversary from "../../assets/patch-anniversary-25.webp";
import star from "../../assets/divider-star.svg";
import "./HomePage.css";

const benefits = [
  {
    title: "Time-saving",
    copy: (
      <>
        Deep research. Long podcasts.
        <br />
        Endless articles. We consume it all.
        <br />
        You get what matters.
      </>
    ),
  },
  {
    title: "Hand-curated",
    copy: (
      <>
        Research and ideas curated into practical,
        <br />
        actionable items.
      </>
    ),
  },
  {
    title: "Beyond news",
    copy: (
      <>
        Free workout programs
        <br />
        and health routines inspired
        <br />
        by top performers.
      </>
    ),
  },
  {
    title: "Evidence-based",
    copy: (
      <>
        Evidence-based research
        <br />
        and emerging trends, refined
        <br />
        into clear, easy-to-digest insight.
      </>
    ),
  },
];

function SignupPlaceholder({ perks = false }: { perks?: boolean }) {
  return (
    <div
      className={`signup-placeholder${perks ? " with-perks" : ""}`}
      aria-label="Email signup placeholder"
    >
      <div className="signup-placeholder-row">
        <span>Email:</span>
        <span className="signup-blank" aria-hidden="true" />
        <span className="signup-label">Join club</span>
      </div>
      {perks && (
        <p className="signup-perks">
          Club Member perks include workout programs &amp; health blueprints.{" "}
          <span>Completely free. Leave whenever.</span>
        </p>
      )}
    </div>
  );
}

function HomeHero() {
  const reduced = useReducedMotion();
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <FloatingPatch src={shoe} className="hero-shoe" rotation={-9} />
      <motion.p
        className="home-eyebrow"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Weekly insights
      </motion.p>
      <h1 id="home-title" aria-label="Health Curated">
        {["Health", "Curated"].map((line, lineIndex) => (
          <span className="hero-line-mask" key={line} aria-hidden="true">
            {Array.from(line).map((letter, letterIndex) => (
              <span className="hero-char-mask" key={letterIndex}>
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.12 + (lineIndex * 6 + letterIndex) * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </h1>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <p className="home-intro">
          Clear, actionable wellness insights delivered
          <br />
          in a 5-minute weekly newsletter.
          <br />
          Completely Free.
        </p>
        <SignupPlaceholder perks />
      </motion.div>
      <FloatingPatch src={varsity} className="hero-varsity" rotation={5} />
    </section>
  );
}

function Benefits() {
  const ref = useRef<HTMLElement>(null);
  const crestTrackRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const [crestTravel, setCrestTravel] = useState(0);

  useEffect(() => {
    const track = crestTrackRef.current;
    const crest = crestRef.current;
    if (!track || !crest) return;
    const measureTravel = () => {
      // The track ends half a crest below the grid center.
      // Mobile keeps its separate stacked layout and sticky crest.
      setCrestTravel(
        getComputedStyle(crest).position === "sticky"
          ? 0
          : Math.max(
              0,
              track.getBoundingClientRect().height -
                crest.getBoundingClientRect().height,
            ),
      );
    };
    const observer = new ResizeObserver(measureTravel);
    observer.observe(track);
    observer.observe(crest);
    window.addEventListener("resize", measureTravel);
    measureTravel();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTravel);
    };
  }, []);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const delayedProgress = useMotionValue(scrollYProgress.get());
  const [axesComplete, setAxesComplete] = useState(delayedProgress.get() >= 0.5);
  useMotionValueEvent(delayedProgress, "change", (progress) => {
    setAxesComplete(progress >= 0.5);
  });
  // Share the 200 ms delay and settle at the center before the axes reveal.
  const crestY = useTransform(delayedProgress, [0.35, 0.47], [0, crestTravel]);

  useEffect(() => {
    if (reduced) return;
    const pending = new Set<ReturnType<typeof setTimeout>>();
    // Replay each progress update 200 ms later without waiting for scrolling to stop.
    const delayProgress = (progress: number) => {
      const timer = setTimeout(() => {
        delayedProgress.set(progress);
        pending.delete(timer);
      }, 40);
      pending.add(timer);
    };
    delayProgress(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", delayProgress);
    return () => {
      unsubscribe();
      pending.forEach(clearTimeout);
    };
  }, [scrollYProgress, delayedProgress, reduced]);

  // Reveal across 47–50% progress, with the axes and stars delayed together.
  const axisScale = useTransform(delayedProgress, [0.47, 0.5], [0, 1]);
  const starOpacity = useTransform(delayedProgress, [0.47, 0.5], [0, 1]);
  const starRotation = useTransform(delayedProgress, [0.47, 0.5], [180, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  return (
    <section ref={ref} className="home-benefits" aria-label="Why ORDR">
      <div className="home-photo">
        <motion.img
          src={walking}
          alt="Two people walking in sportswear with a gym bag"
          style={{ scale: reduced ? 1 : scale }}
        />
      </div>
      <div className="benefits-grid">
        <motion.div
          className="benefit-rule horizontal"
          aria-hidden="true"
          style={{ scaleX: reduced ? 1 : axisScale }}
        >
          <motion.img
            src={star}
            alt=""
            style={{
              opacity: reduced ? 1 : starOpacity,
              rotate: reduced ? 0 : starRotation,
            }}
          />
          <motion.img
            src={star}
            alt=""
            style={{
              opacity: reduced ? 1 : starOpacity,
              rotate: reduced ? 0 : starRotation,
            }}
          />
        </motion.div>
        <motion.div
          className="benefit-rule vertical"
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : axisScale }}
        >
          <motion.img
            src={star}
            alt=""
            style={{
              opacity: reduced ? 1 : starOpacity,
              rotate: reduced ? 0 : starRotation,
            }}
          />
          <motion.img
            src={star}
            alt=""
            style={{
              opacity: reduced ? 1 : starOpacity,
              rotate: reduced ? 0 : starRotation,
            }}
          />
        </motion.div>
        {benefits.map((item, i) => (
          <article className="benefit" key={item.title}>
            <ScrollReveal revealed={axesComplete} duration={1.2} delay={0.03 + (i % 2) * 0.1}>
              <h2>{item.title}</h2>
            </ScrollReveal>
            <ScrollReveal revealed={axesComplete} duration={1.2} delay={0.03 + 0.08 + (i % 2) * 0.1}>
              <p>{item.copy}</p>
            </ScrollReveal>
          </article>
        ))}
      </div>
      <div ref={crestTrackRef} className="crest-track" aria-hidden="true">
        <motion.div
          ref={crestRef}
          className="crest-disc"
          style={{ y: reduced ? 0 : crestY }}
        >
          <img src={crest} alt="" />
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["100%", "97%"]);
  return (
    <section
      ref={ref}
      className="newsletter-preview"
      aria-labelledby="newsletter-title"
    >
      <FloatingPatch src={runner} className="preview-runner" rotation={-9} />
      <motion.div
        className="newsletter-clip"
        style={{ width: reduced ? "97%" : width }}
      >
        <ScrollReveal>
          <h2 id="newsletter-title">
            New here?
            <br />
            Check it out
          </h2>
        </ScrollReveal>
        <motion.img
          className="newsletter-sheet"
          src={newsletter}
          alt="The Weekly Order newsletter preview"
          loading="lazy"
        />
      </motion.div>
      <FloatingPatch src={atlas} className="preview-atlas" rotation={5} />
    </section>
  );
}

const articles = [
  {
    title: "The Longevity Protocols",
    copy: "Free training programs built from the most consistent insights from modern longevity experts. Strength. Zone 2. VO₂ max. Recovery. Structured into a weekly plan you can actually follow. From beginner to intermediate.",
    image: longevity,
    path: "the-longevity-protocols",
    tone: "sage",
  },
  {
    title: "The 7-Day Nervous System Reset",
    copy: "The 7-Day Nervous System Reset is a guided series designed to help you slow down and recalibrate. Each day includes a short, structured session—about 3 minutes of breathwork followed by a 7-minute meditation—to help shift your body out of stress and into a more balanced state. The sessions are simple, easy to follow, and built to fit into your day. No experience needed. Just click play and follow along!",
    image: reset,
    path: "the-7-day-nervous-system-reset",
    tone: "coral",
  },
];
function ArchiveCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <article className={`home-archive-card ${article.tone}`}>
      <div className="archive-card-heading">
        <h3>{article.title}</h3>
        <p>{article.copy}</p>
        <a
          className="home-oval"
          href={`https://www.ordrhealth.com/archive/${article.path}`}
          target="_blank"
          rel="noreferrer"
        >
          Read more
        </a>
      </div>
      <div className="archive-image-frame">
        <img src={article.image} alt={article.title} loading="lazy" />
      </div>
    </article>
  );
}
function Archive() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const programY = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);
  return (
    <section
      ref={ref}
      className="home-archive"
      id="archive"
      aria-labelledby="archive-title"
    >
      <ScrollReveal>
        <h2 id="archive-title">Archive</h2>
      </ScrollReveal>
      <div className="archive-stack">
        {articles.map((article) => (
          <ArchiveCard key={article.path} article={article} />
        ))}
      </div>
      <div className="program-reveal">
        <motion.div style={{ y: reduced ? 0 : programY }}>
          <div className="program-card">
            <h3>
              Find <em>your</em> program
            </h3>
            <p>
              Take a short survey and we’ll match you with a free workout plan
              that best fits your goals, schedule, and experience.
            </p>
            <a
              href="https://www.ordrhealth.com/archive/the-longevity-protocols"
              className="home-oval"
              target="_blank"
              rel="noreferrer"
            >
              Get started
            </a>
            <span className="handwritten">For free</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function JoinClub() {
  return (
    <section id="join-club" className="home-join" aria-labelledby="join-title">
      <FloatingPatch src={club} className="join-club-patch" rotation={-10} />
      <ScrollReveal>
        <h2 id="join-title">Join the club</h2>
      </ScrollReveal>
      <ScrollReveal>
        <p className="home-join-copy">
          Get free access to the library of exclusive
          <br />
          workout programs, evidence-based wellness
          <br />
          protocols, and curated health stacks.
        </p>
      </ScrollReveal>
      <SignupPlaceholder />
      <FloatingPatch
        src={anniversary}
        className="join-anniversary"
        rotation={10}
      />
    </section>
  );
}
export function HomePage() {
  return (
    <main id="home" className="home-page">
      <HomeHero />
      <Benefits />
      <NewsletterPreview />
      <Archive />
      <JoinClub />
      <footer className="home-footer">
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
          <a href="https://www.ordrhealth.com/privacy-policy">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}
