import { ScrollSection } from "../../components/scroll/ScrollSection";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";
import { SectionThree } from "./SectionThree";

export const AboutPage = () => {
  return (
    <main>
      {/* Has its own scroll animation, so no ScrollSection wrapper */}
      <SectionOne />

      {/* Move vertically */}
      <ScrollSection animation="slide">
        <SectionTwo />
      </ScrollSection>

      {/* Zoom in and out */}
      <ScrollSection animation="scale">
        <SectionThree />
      </ScrollSection>
    </main>
  );
};
