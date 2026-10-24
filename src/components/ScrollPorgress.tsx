import { useState } from "react";
import { SectionOne } from "./SectionOne";

export const ScrollPorgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const screenHeight = window.innerHeight;

  const progress1 = Math.min(Math.max(scrollY / screenHeight, 0), 1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main
      className="
            relative
            h-[200vh]
          "
    >
      <SectionOne progress1={progress1} />
    </main>
  );
};
