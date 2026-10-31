import { OvalControl } from "./OvalControl";

type ProgramCTAProps =
  { variant: "home" } | { variant: "archive"; onStart: () => void };

function ProgramDescription({ archive = false }: { archive?: boolean }) {
  return (
    <p>
      Take a short survey and we’ll match you with {archive ? "the" : "a"} free
      workout plan that best fits your goals, schedule, and experience.
    </p>
  );
}

export function ProgramCTA(props: ProgramCTAProps) {
  if (props.variant === "archive")
    return (
      <>
        <h2 id="archive-program-heading">Find your program</h2>
        <ProgramDescription archive />
        <div className="archive-program-action relative mt-[1.75em]">
          <OvalControl as="button" appearance="program" onClick={props.onStart}>
            Get started
          </OvalControl>
          <span className="archive-free absolute tracking-[0.15em] whitespace-nowrap left-full top-[60%] w-[5em]">
            FOR FREE
          </span>
        </div>
      </>
    );
  return (
    <div className="program-card bg-[#3d433b] text-[#e8dec4] p-[clamp(28px,2vw,40px)] [border:1px_solid_#e8dec4] [outline:5px_solid_#3d433b] [box-shadow:0_8px_16px_#0002] text-center">
      <h3>
        Find <em>your</em> program
      </h3>
      <ProgramDescription />
      <OvalControl
        as="a"
        href="https://www.ordrhealth.com/archive/the-longevity-protocols"
        className="home-oval"
        target="_blank"
        rel="noreferrer"
      >
        Get started
      </OvalControl>
      <span className="handwritten font-[Kurt,cursive] block uppercase text-[18px]">
        For free
      </span>
    </div>
  );
}
