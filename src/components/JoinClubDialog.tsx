import { useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { JoinClubControl } from "./JoinClubControl";
import underline from "../assets/program-handwritten-underline.svg";
import closePatch from "../assets/signup-close-patch.webp";
import joinOval from "../assets/signup-join-club-oval.svg";

type JoinClubDialogProps = { open: boolean; onClose: () => void };

export function JoinClubDialog({ open, onClose }: JoinClubDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => dialog.current?.close(), 350);
    return () => window.clearTimeout(timer);
  }, [closing]);

  function closeSignup() {
    if (reduced) dialog.current?.close();
    else setClosing(true);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="club-signup-title"
      className="fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-[40px_20px] min-[480px]:p-[48px_20px] [border:0] bg-transparent text-[#e8dec4] overflow-auto text-(length:--card-unit) [--card-unit:16px] min-[480px]:[--card-unit:clamp(12px,2.086vw,16px)] min-[768px]:[--card-unit:clamp(12px,1.6145vw,16px)] min-[992px]:[--card-unit:clamp(11px,0.833333vw,16px)] open:flex open:items-center open:justify-center open:animate-club-popup-in backdrop:bg-[#fffc] backdrop:animate-club-popup-in data-closing:animate-club-popup-out data-closing:backdrop:animate-club-popup-out [@media(max-height:560px)]:open:items-start motion-reduce:animate-none motion-reduce:backdrop:animate-none"
      data-closing={closing || undefined}
      onCancel={(event) => {
        event.preventDefault();
        closeSignup();
      }}
      onClose={() => {
        if (!dialog.current?.open) onClose();
      }}
      onAnimationEnd={(event) => {
        if (closing && event.target === event.currentTarget)
          dialog.current?.close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeSignup();
      }}
    >
      <div className="max-w-full shrink-0 relative bg-[#3d433b] flex flex-col items-center w-[21.25em] min-h-[26em] p-[1.5em_2em_2em] gap-[1.25em] min-[480px]:w-[39em] min-[480px]:min-h-0 min-[480px]:p-[2.5em] min-[480px]:gap-[2.5em] min-[768px]:w-[43.5em] min-[768px]:px-[6.25em] min-[992px]:w-[58.38em] min-[992px]:p-[4em_10.3em] min-[992px]:gap-[3.25em] after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-[url('/assets/paper-texture-overlay.webp')] after:bg-center after:bg-size-[100%_100%] after:mix-blend-multiply after:opacity-45">
        <button
          className="absolute right-[-0.75em] top-[-1.25em] w-[3.75em] min-[480px]:right-[-1em] min-[480px]:top-[-1.5em] min-[480px]:w-[5em] min-[768px]:right-[-3em] min-[768px]:top-[-2.5em] min-[768px]:w-[7em] p-0 [border:0] bg-transparent text-[#e8dec4] rounded-[50%] z-1 -rotate-15 hover:rotate-0 transition-transform duration-300"
          aria-label="Close signup"
          onClick={closeSignup}
        >
          <img src={closePatch} alt="" />
        </button>
        <div
          className="absolute pointer-events-none [border:1px_solid_#e8dec4] inset-[2%_1.5%]"
          aria-hidden="true"
        />
        <h2
          id="club-signup-title"
          className="font-[Condensed,serif] font-normal text-[clamp(28px,8.45vw,33px)] min-[480px]:text-[3.19em] min-[768px]:text-[3.88em] min-[992px]:text-[5.75em] leading-none tracking-[-0.01em] text-center uppercase m-0 whitespace-nowrap"
        >
          Health club
          <br />
          member card
        </h2>
        <div className="text-center mt-0 min-[480px]:mt-[-1.25em]">
          <p className="uppercase font-[Heros,sans-serif] text-[0.88em] min-[480px]:text-[1.06em] min-[992px]:text-[1.25em] leading-[1.4] tracking-[0.55em] min-[480px]:tracking-[0.704em] whitespace-normal min-[480px]:whitespace-nowrap">
            Membership{" "}
            <span className="relative">
              includes
              <img
                className="absolute top-[-45%] left-[-12%] w-[115%] max-w-none h-[180%]"
                src={underline}
                alt=""
              />
            </span>
            :
          </p>
          <p className="text-[0.94em] min-[480px]:text-[1.06em] leading-[1.2] mt-[1em]">
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
            This preview is not connected to a mailing list. Your email has not
            been saved or sent.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="w-full grid items-center gap-x-[0.5em] gap-y-0 relative grid-cols-[auto_minmax(0,1fr)] text-[0.94em] min-[480px]:grid-cols-[auto_minmax(0,1fr)_auto_auto] min-[480px]:gap-0 min-[480px]:text-[1.06em]"
          >
            <label className="uppercase" htmlFor="club-email">
              Email:
            </label>
            <input
              className="min-w-0 w-full h-[3em] [border:0] [border-bottom:1px_solid_#e8dec4] p-[0.5em] bg-transparent [font:inherit] text-inherit rounded-none focus-visible:[outline:1px_solid_currentColor] focus-visible:outline-offset-[3px]"
              id="club-email"
              type="email"
              autoComplete="email"
              maxLength={256}
              required
            />
            <JoinClubControl
              behavior="submit"
              style={{ backgroundImage: `url(${joinOval})` }}
              className="p-[1em_0.9em] [border:0] bg-transparent bg-center bg-contain bg-no-repeat text-inherit whitespace-nowrap uppercase col-span-full justify-self-center mt-[0.75em] min-[480px]:col-auto min-[480px]:justify-self-auto min-[480px]:mt-0"
            />
            <p className="opacity-50 italic max-w-none p-0 text-[0.94em] col-span-full justify-self-center min-[480px]:max-w-[4em] min-[480px]:pl-[0.5em] min-[480px]:col-auto min-[480px]:justify-self-auto">
              Annual dues: $0
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
