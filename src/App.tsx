import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import { AboutPage } from "./page/about/AboutPage";
import { HomePage } from "./page/home/HomePage";
import "./App.css";
import { ArchivePage } from "./page/archive/ArchivePage";
import { currentPage } from "./routes";

export default function App() {
  const isAbout = currentPage() === "/about";
  const isArchive = currentPage() === "/archive";
  useEffect(() => {
    document.title = isArchive ? "Archive: Sample Health & Fitness Newsletters | ORDR" : isAbout
      ? "About ORDR | We Filter. We Translate. We Deliver."
      : "Health & Wellness News in 5-Minutes | ORDR";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        isArchive ? "Explore the ORDR archive of health guides, wellness protocols, and workout programs." : isAbout
          ? "We love health. We hate health content. We filter, we translate, we deliver."
          : "Clear, actionable wellness insights delivered in a 5-minute weekly newsletter. Health, curated by ORDR.",
      );
  }, [isAbout, isArchive]);
  return (
    <MotionConfig reducedMotion="user">
      <div className={isArchive ? "archive-shell" : isAbout ? "about-shell" : "home-shell"}>
        <a className="skip-link" href={isArchive ? "#archive" : isAbout ? "#about" : "#home"}>
          Skip to content
        </a>
        <Navbar />
        {isArchive ? <ArchivePage /> : isAbout ? <AboutPage /> : <HomePage />}
        <div className="paper" aria-hidden="true" />
      </div>
    </MotionConfig>
  );
}
