import { useJoinClub } from "../../components/JoinClubContext";
import { ArticleCard } from "../../components/ArticleCard";
import { ProgramCTA } from "../../components/ProgramCTA";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingPatch } from "../../components/FloatingPatch";
import { archiveArticles } from "./archiveData";
import newspapers from "../../assets/program-newspaper-stack.webp";
import "./ArchivePage.css";

export function ArchivePage() {
  const reduced = useReducedMotion();
  const openSignup = useJoinClub();
  return (
    <main
      id="archive"
      className="archive-page overflow-clip text-(length:--archive-unit)"
    >
      <section
        className="archive-library w-[97%] m-auto pt-[max(10.75em,calc(var(--nav-height)+48px))]"
        aria-labelledby="archive-heading"
      >
        <div className="archive-heading-mask overflow-hidden">
          <motion.h1
            id="archive-heading"
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Archive
          </motion.h1>
        </div>
        <div className="archive-papers-window flow-root overflow-clip h-[139em]">
          <ol className="archive-papers flex flex-col list-none p-0 m-[44.5em_0_0]">
            {archiveArticles.map((article, index) => (
              <li
                className="archive-paper relative w-[110.31em] max-w-[96%] m-[-40em_auto_0] [border-top:1px_solid_#ffffff80] [border-right:1px_solid_#ffffff80] [box-shadow:inset_1px_0_4px_#0004,inset_0_4px_16.6px_#ffffff26,-4px_16px_26.8px_#39393947,-3px_4px_6.7px_#0004]"
                key={article.href}
                style={{ backgroundColor: article.color, color: article.ink }}
              >
                <ArticleCard
                  variant="archive"
                  article={article}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </li>
            ))}
          </ol>
        </div>
        <div
          className="h-[9px] [border-block:1px_solid_currentColor]"
          aria-hidden="true"
        />
      </section>
      <section
        className="archive-program flex flex-col items-center relative p-[19.5em_1.5%_20em] gap-[1.5em]"
        aria-labelledby="archive-program-heading"
      >
        <ProgramCTA variant="archive" onStart={openSignup} />
        <FloatingPatch
          src={newspapers}
          className="archive-newspapers"
          rotation={11}
        />
      </section>
    </main>
  );
}
