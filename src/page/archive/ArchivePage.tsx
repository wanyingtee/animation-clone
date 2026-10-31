import { useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingPatch } from "../home/HomeMotion";
import { archiveArticles } from "./archiveData";
import newspapers from "../../assets/program-newspaper-stack.webp";
import underline from "../../assets/program-handwritten-underline.svg";
import closePatch from "../../assets/signup-close-patch.webp";
import "./ArchivePage.css";

export function ArchivePage() {
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const previousOverflow = useRef("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  function openSignup() {
    setSubmitted(false);
    setClosing(false);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  }
  function closeSignup() {
    if (reduced) dialog.current?.close();
    else setClosing(true);
  }
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
                <article>
                  <div className="archive-paper-heading flex justify-between items-start gap-[2em] min-h-[11.25em]">
                    <div className="archive-paper-copy flex items-start gap-[5em]">
                      <h2>{article.title}</h2>
                      <p>{article.description}</p>
                    </div>
                    <a
                      className="archive-read-more [border:1px_solid_currentColor] rounded-[50%] shrink-0 w-[8.5em] h-[2.75em] grid place-items-center"
                      href={article.href}
                      aria-label={`Read more: ${article.title}`}
                    >
                      <span>Read more</span>
                    </a>
                  </div>
                  <div className="archive-cover flex justify-center w-full overflow-clip items-center h-[41em] max-h-[41em]">
                    <img
                      src={article.image}
                      alt={`${article.title} editorial cover`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </article>
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
        <h2 id="archive-program-heading">Find your program</h2>
        <p>
          Take a short survey and we’ll match you with the free workout plan
          that best fits your goals, schedule, and experience.
        </p>
        <div className="archive-program-action relative mt-[1.75em]">
          <button
            className="archive-program-button uppercase w-[14em] h-[4em] [border:none] text-inherit text-[max(1.06em,14px)]"
            onClick={openSignup}
          >
            Get started
          </button>
          <span className="archive-free absolute tracking-[0.15em] whitespace-nowrap left-full top-[60%] w-[5em]">
            FOR FREE
          </span>
        </div>
        <FloatingPatch
          src={newspapers}
          className="archive-newspapers"
          rotation={11}
        />
      </section>
      <footer className="archive-footer flex justify-between items-center m-[0_auto_1.5em] w-[97%] pb-[2em] [border-bottom:8px_double_currentColor] gap-[20px] text-[max(1em,13px)]">
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
      <dialog
        ref={dialog}
        aria-labelledby="archive-signup-title"
        className="archive-signup fixed inset-[0] w-full h-full max-w-none max-h-none m-0 p-[48px_20px] [border:0] bg-transparent text-[#e8dec4] overflow-auto text-(length:--card-unit)"
        data-closing={closing || undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeSignup();
        }}
        onClose={() => {
          document.body.style.overflow = previousOverflow.current;
        }}
        onAnimationEnd={(event) => {
          if (closing && event.target === event.currentTarget)
            dialog.current?.close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSignup();
        }}
      >
        <div className="archive-member-card max-w-full shrink-0 relative bg-[#3d433b] flex flex-col items-center w-[58.38em] p-[4em_10.3em] gap-[3.25em]">
          <button
            className="archive-signup-close absolute right-[-3em] top-[-2.5em] w-[7em] p-0 [border:0] [background:none] text-[#e8dec4] rounded-[50%] z-1"
            aria-label="Close signup"
            onClick={closeSignup}
          >
            <img src={closePatch} alt="" />
          </button>
          <div
            className="absolute pointer-events-none [border:1px_solid_#e8dec4] inset-[2%_1.5%]"
            aria-hidden="true"
          />
          <h2 id="archive-signup-title">
            Health club
            <br />
            member card
          </h2>
          <div className="archive-membership-copy text-center mt-[-1.25em]">
            <p className="archive-membership-label uppercase tracking-[0.704em] whitespace-nowrap">
              Membership{" "}
              <span>
                includes
                <img src={underline} alt="" />
              </span>
              :
            </p>
            <p>
              A PhD in practical health. Diploma not included.
              <br />
              Executive access to advice. No seriously—email us. We’ll respond.
              <br />
              Permission to say “I’ve already read about that”.
            </p>
          </div>
          {submitted ? (
            <p
              className="text-center text-[max(1.06em,14px)] leading-[1.3]"
              role="status"
            >
              This preview is not connected to a mailing list. Your email has
              not been saved or sent.
            </p>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="archive-email">Email:</label>
              <input
                id="archive-email"
                type="email"
                autoComplete="email"
                maxLength={256}
                required
              />
              <button type="submit">Join Club</button>
              <p className="archive-dues opacity-[0.5] italic max-w-[4em] pl-[0.5em] text-[0.94em]">
                Annual dues: $0
              </p>
            </form>
          )}
        </div>
      </dialog>
    </main>
  );
}
