import type { ComponentProps } from "react";

const styles = {
  home: "inline-flex justify-center items-center [border:1px_solid_currentColor] rounded-[50%] p-[0.6em_0.95em] whitespace-nowrap uppercase text-(length:--home-body) leading-none",
  nav: "oval uppercase text-[17px] items-center justify-center [border:1px_solid_#3d433b] rounded-[50%] w-[144px] h-[44px] [background:none]",
  archive:
    "[border:1px_solid_currentColor] rounded-[50%] shrink-0 w-[8.5em] h-[2.75em] grid place-items-center",
  program:
    "archive-program-button uppercase w-[14em] h-[4em] [border:none] text-inherit text-[max(1.06em,14px)]",
  plain: "",
};

type Appearance = { appearance?: keyof typeof styles };
export type OvalControlProps = Appearance &
  (
    | ({ as: "a" } & ComponentProps<"a">)
    | ({ as: "button" } & ComponentProps<"button">)
    | ({ as: "span" } & ComponentProps<"span">)
  );

export function OvalControl({
  appearance = "home",
  className = "",
  ...props
}: OvalControlProps) {
  const classes = `${styles[appearance]} ${className}`.trim();
  if (props.as === "a") {
    const { as: Tag, ...rest } = props;
    return <Tag {...rest} className={classes} />;
  }
  if (props.as === "button") {
    const { as: Tag, type = "button", ...rest } = props;
    return <Tag {...rest} type={type} className={classes} />;
  }
  const { as: Tag, ...rest } = props;
  return <Tag {...rest} className={classes} />;
}
