import { JoinClubControl } from "./JoinClubControl";
import { OvalControl } from "./OvalControl";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { currentPage, localHref } from "../routes";
const base = "https://www.ordrhealth.com";
const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Archive", "/archive"],
  ["Contact", "/contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const currentPath = currentPage();
  const linkTo = (path: string) =>
    ["/", "/about", "/archive"].includes(path) ? localHref(path) : base + path;
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          button.current,
          ...Array.from(menu.current?.querySelectorAll("a, button") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          items.at(-1)?.focus();
        }
        if (!event.shiftKey && index === items.length - 1) {
          event.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <header className="fixed inset-[0_0_auto] z-50 bg-[#fff] h-(--nav-height)">
      <div className="nav-bar w-[97%] h-full m-auto flex items-center justify-between [border-bottom:3px_double_#3d433b] pb-[8px] relative">
        <a
          className="brand uppercase text-[17px] w-[144px]"
          href={localHref("/")}
        >
          Ordr
        </a>
        <nav
          className="desktop-nav flex gap-[40px] text-[17px]"
          aria-label="Main navigation"
        >
          {links.map(([label, path]) => (
            <a
              key={label}
              href={linkTo(path)}
              aria-current={path === currentPath ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <JoinClubControl behavior="popup" />
        <OvalControl
          as="button"
          appearance="nav"
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </OvalControl>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menu}
            id="mobile-nav"
            className="mobile-nav fixed inset-[var(--nav-height)_0_0] bg-[#fff] flex flex-col justify-center p-[30px] gap-[20px]"
            aria-label="Mobile navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map(([label, path], i) => (
              <motion.a
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i }}
                key={label}
                href={linkTo(path)}
                onClick={() => setOpen(false)}
                aria-current={path === currentPath ? "page" : undefined}
              >
                {label}
              </motion.a>
            ))}
            <JoinClubControl
              behavior="popup"
              appearance="mobile"
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
