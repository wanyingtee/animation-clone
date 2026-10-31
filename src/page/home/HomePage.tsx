import { ArticleCard } from "../../components/ArticleCard";
import { ProgramCTA } from "../../components/ProgramCTA";
import { JoinClubControl } from "../../components/JoinClubControl";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ScrollReveal } from "./HomeMotion";
import { FloatingPatch } from "../../components/FloatingPatch";
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

function SignupPrompt({ perks = false }: { perks?: boolean }) {
  return (
    <div
      className={`signup-placeholder w-[clamp(350px,28vw,540px)] max-w-full m-[clamp(40px,3.4vw,65px)_auto_0] text-(length:--home-body) text-left ${perks ? " with-perks" : ""}`}
      aria-label="Join the health club"
    >
      <div className="signup-placeholder-row flex items-center gap-[4px] uppercase">
        <span>Email:</span>
        <span
          className="signup-blank flex-1 self-stretch [border-bottom:1px_solid] min-h-[30px]"
          aria-hidden="true"
        />
        <JoinClubControl behavior="popup" appearance="inline" />
      </div>
      {perks && (
        <p className="signup-perks text-center italic m-[6px_auto_0] max-w-[340px]">
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
    <section
      className="home-hero relative text-center p-[clamp(115px,9vw,173px)_20px_clamp(96px,7.3vw,140px)]"
      aria-labelledby="home-title"
    >
      <FloatingPatch
        src={shoe}
        className="hero-shoe left-[19.5%] top-[19%]"
        rotation={-9}
      />
      <motion.p
        className="home-eyebrow tracking-[clamp(7px,0.73vw,14px)] uppercase pl-[0.7em]"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Weekly insights
      </motion.p>
      <h1 id="home-title" aria-label="Health Curated">
        {["Health", "Curated"].map((line, lineIndex) => (
          <span
            className="hero-line-mask block overflow-hidden py-[0.05em] my-[-0.05em]"
            key={line}
            aria-hidden="true"
          >
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
        <p className="home-intro mt-[clamp(28px,1.7vw,34px)]">
          Clear, actionable wellness insights delivered
          <br />
          in a 5-minute weekly newsletter.
          <br />
          Completely Free.
        </p>
        <SignupPrompt perks />
      </motion.div>
      <FloatingPatch
        src={varsity}
        className="hero-varsity right-[8%] bottom-[6%]"
        rotation={5}
      />
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
  const [axesComplete, setAxesComplete] = useState(
    delayedProgress.get() >= 0.5,
  );
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
    <section
      ref={ref}
      className="home-benefits relative m-[0_1.5%] pb-[clamp(100px,10.4vw,200px)]"
      aria-label="Why ORDR"
    >
      <div className="home-photo h-(--photo-height) overflow-hidden">
        <motion.img
          src={walking}
          alt="Two people walking in sportswear with a gym bag"
          style={{ scale: reduced ? 1 : scale }}
        />
      </div>
      <div className="benefits-grid h-(--grid-height) grid grid-cols-[1fr_1fr] relative mt-[clamp(50px,4.16vw,80px)]">
        <motion.div
          className="benefit-rule absolute pointer-events-none bg-[#3d433b] horizontal"
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
          className="benefit-rule absolute pointer-events-none bg-[#3d433b] vertical"
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
          <article
            className="benefit flex flex-col items-center justify-center text-center gap-[14px] p-[35px_25px]"
            key={item.title}
          >
            <ScrollReveal
              revealed={axesComplete}
              duration={1.2}
              delay={0.03 + (i % 2) * 0.1}
            >
              <h2>{item.title}</h2>
            </ScrollReveal>
            <ScrollReveal
              revealed={axesComplete}
              duration={1.2}
              delay={0.03 + 0.08 + (i % 2) * 0.1}
            >
              <p>{item.copy}</p>
            </ScrollReveal>
          </article>
        ))}
      </div>
      <div
        ref={crestTrackRef}
        className="crest-track absolute top-[calc(var(--photo-height)*0.5)] bottom-[calc(clamp(100px,10.4vw,200px)+var(--grid-height)/2-clamp(68px,6.2vw,118px))] left-[50%] w-[clamp(136px,12.4vw,236px)] pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          ref={crestRef}
          className="crest-disc relative top-0 grid place-items-center aspect-[1] bg-transparent p-[clamp(16px,1.5vw,28px)]"
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
      className="newsletter-preview relative m-[0_1.5%] h-[clamp(600px,46.88vw,900px)]"
      aria-labelledby="newsletter-title"
    >
      <FloatingPatch
        src={runner}
        className="preview-runner left-0 top-[4%]"
        rotation={-9}
      />
      <motion.div
        className="newsletter-clip h-full overflow-hidden bg-[#3d433b] text-[#e8dec4] text-center pt-[clamp(80px,7.3vw,140px)] flex flex-col items-center gap-[clamp(32px,2.9vw,56px)]"
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
          className="newsletter-sheet w-[clamp(330px,27vw,520px)] max-w-[75%] h-auto origin-[top_center]"
          src={newsletter}
          alt="The Weekly Order newsletter preview"
          loading="lazy"
        />
      </motion.div>
      <FloatingPatch
        src={atlas}
        className="preview-atlas right-[7%] bottom-[-3%]"
        rotation={5}
      />
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
      className="home-archive p-[clamp(110px,10.4vw,200px)_4%_0] relative text-center"
      id="archive"
      aria-labelledby="archive-title"
    >
      <ScrollReveal>
        <h2 id="archive-title">Archive</h2>
      </ScrollReveal>
      <div className="archive-stack m-[clamp(60px,6vw,116px)_auto_0] pb-[40px] relative">
        {articles.map((article) => (
          <ArticleCard
            key={article.path}
            variant="home"
            article={{
              ...article,
              description: article.copy,
              href: `https://www.ordrhealth.com/archive/${article.path}`,
            }}
          />
        ))}
      </div>
      <div className="program-reveal relative z-3 max-w-[610px] w-[31vw] min-w-[350px] m-[-65px_auto_0] p-[20px] overflow-visible">
        <motion.div style={{ y: reduced ? 0 : programY }}>
          <ProgramCTA variant="home" />
        </motion.div>
      </div>
    </section>
  );
}
function JoinClub() {
  return (
    <section
      id="join-club"
      className="home-join relative p-[clamp(190px,17vw,326px)_20px_clamp(180px,20vw,384px)] text-center scroll-mt-(--nav-height)"
      aria-labelledby="join-title"
    >
      <FloatingPatch
        src={club}
        className="join-club-patch right-[12%] top-[15%]"
        rotation={-10}
      />
      <ScrollReveal>
        <h2 id="join-title">Join the club</h2>
      </ScrollReveal>
      <ScrollReveal>
        <p className="home-join-copy mt-[clamp(28px,2.2vw,42px)]">
          Get free access to the library of exclusive
          <br />
          workout programs, evidence-based wellness
          <br />
          protocols, and curated health stacks.
        </p>
      </ScrollReveal>
      <SignupPrompt />
      <FloatingPatch
        src={anniversary}
        className="join-anniversary left-[10%] bottom-[20%]"
        rotation={10}
      />
    </section>
  );
}
export function HomePage() {
  return (
    <main id="home" className="home-page w-full overflow-clip">
      <HomeHero />
      <Benefits />
      <NewsletterPreview />
      <Archive />
      <JoinClub />
    </main>
  );
}
