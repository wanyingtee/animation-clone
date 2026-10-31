export function Footer() {
  return (
    <footer className="relative grid w-[97%] grid-cols-[1fr_auto_1fr] items-center gap-[20px] m-[24px_auto_0] p-[32px_0_24px] [border-top:1px_solid_currentColor] text-[#3d433b] [font-family:'Times_New_Roman',Times,serif] text-[16px] leading-[1.25] font-normal before:content-[''] before:absolute before:top-[8px] before:inset-x-0 before:[border-top:1px_solid_currentColor] [&_a]:whitespace-nowrap [&_a:hover]:not-italic [&_a:hover]:underline [&_a:hover]:underline-offset-[3px] [@media(max-width:700px)]:w-[calc(100%-24px)] [@media(max-width:700px)]:grid-cols-1 [@media(max-width:700px)]:justify-items-center [@media(max-width:700px)]:gap-[18px] [@media(max-width:700px)]:text-center [@media(max-width:700px)]:text-[13px]">
      <p className="m-0">@ 2026 ORDR. All rights reserved.</p>
      <a
        href="https://www.instagram.com/ordrhealth/"
        target="_blank"
        rel="noreferrer"
      >
        Instagram
      </a>
      <div className="flex justify-self-end gap-[20px] [@media(max-width:700px)]:justify-self-center [@media(max-width:700px)]:flex-wrap [@media(max-width:700px)]:justify-center [@media(max-width:700px)]:gap-[12px_20px]">
        <a href="https://www.ordrhealth.com/terms-of-conditions">
          Terms of Conditions
        </a>
        <a href="https://www.ordrhealth.com/privacy-policy">Privacy Policy</a>
      </div>
    </footer>
  );
}
