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
    <main id="archive" className="archive-page">
      <section className="archive-library" aria-labelledby="archive-heading">
        <div className="archive-heading-mask">
          <motion.h1
            id="archive-heading"
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Archive
          </motion.h1>
        </div>
        <div className="archive-papers-window">
          <ol className="archive-papers">
            {archiveArticles.map((article, index) => (
              <li
                className="archive-paper"
                key={article.href}
                style={{ backgroundColor: article.color, color: article.ink }}
              >
                <article>
                  <div className="archive-paper-heading">
                    <div className="archive-paper-copy">
                      <h2>{article.title}</h2>
                      <p>{article.description}</p>
                    </div>
                    <a
                      className="archive-read-more"
                      href={article.href}
                      aria-label={`Read more: ${article.title}`}
                    >
                      <span>Read more</span>
                    </a>
                  </div>
                  <div className="archive-cover">
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
        <div className="archive-double-rule" aria-hidden="true" />
      </section>
      <section
        className="archive-program"
        aria-labelledby="archive-program-heading"
      >
        <h2 id="archive-program-heading">Find your program</h2>
        <p>
          Take a short survey and we’ll match you with the free workout plan
          that best fits your goals, schedule, and experience.
        </p>
        <div className="archive-program-action">
          <button className="archive-program-button" onClick={openSignup}>
            Get started
          </button>
          <span className="archive-free">FOR FREE</span>
        </div>
        <FloatingPatch
          src={newspapers}
          className="archive-newspapers"
          rotation={11}
        />
      </section>
      <footer className="archive-footer">
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
        className="archive-signup"
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
        <div className="archive-member-card">
          <button
            className="archive-signup-close"
            aria-label="Close signup"
            onClick={closeSignup}
          >
            <img src={closePatch} alt="" />
          </button>
          <div className="archive-member-border" aria-hidden="true" />
          <h2 id="archive-signup-title">
            Health club
            <br />
            member card
          </h2>
          <div className="archive-membership-copy">
            <p className="archive-membership-label">
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
            <p className="archive-demo-result" role="status">
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
              <p className="archive-dues">Annual dues: $0</p>
            </form>
          )}
        </div>
      </dialog>
    </main>
  );
}
