import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import { AboutPage } from "./page/about/AboutPage";
import { HomePage } from "./page/home/HomePage";
import "./App.css";

export default function App() {
  const isAbout = window.location.pathname.replace(/\/$/, "") === "/about";
  useEffect(() => {
    document.title = isAbout
      ? "About ORDR | We Filter. We Translate. We Deliver."
      : "Health & Wellness News in 5-Minutes | ORDR";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        isAbout
          ? "We love health. We hate health content. We filter, we translate, we deliver."
          : "Clear, actionable wellness insights delivered in a 5-minute weekly newsletter. Health, curated by ORDR.",
      );
  }, [isAbout]);
  return (
    <MotionConfig reducedMotion="user">
      <div className={isAbout ? "about-shell" : "home-shell"}>
        <a className="skip-link" href={isAbout ? "#about" : "#home"}>
          Skip to content
        </a>
        <Navbar />
        {isAbout ? <AboutPage /> : <HomePage />}
        <div className="paper" aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
