import { useJoinClub } from "./JoinClubContext";
import type { ComponentProps } from "react";
import { localHref } from "../routes";
import { OvalControl } from "./OvalControl";

type JoinClubControlProps =
  | ({
      behavior: "popup";
      appearance?: "nav" | "inline" | "mobile";
    } & ComponentProps<"button">)
  | ({ behavior: "link"; mobile?: boolean } & ComponentProps<"a">)
  | ({ behavior: "submit" | "button" } & ComponentProps<"button">)
  | ({ behavior: "placeholder" } & ComponentProps<"span">);

function JoinClubTrigger({
  appearance = "nav",
  children,
  className = "",
  onClick,
  ...rest
}: Omit<Extract<JoinClubControlProps, { behavior: "popup" }>, "behavior">) {
  const openSignup = useJoinClub();
  return (
    <OvalControl
      as="button"
      appearance={
        appearance === "inline"
          ? "home"
          : appearance === "mobile"
            ? "plain"
            : "nav"
      }
      className={`${appearance === "inline" ? "signup-label bg-transparent text-inherit" : appearance === "mobile" ? "mobile-join text-inherit p-0 border-0 bg-transparent self-start" : "join-link text-inherit"} ${className}`}
      aria-haspopup="dialog"
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openSignup();
      }}
    >
      {children ?? (appearance === "mobile" ? "Join club ↗" : "Join club")}
    </OvalControl>
  );
}

export function JoinClubControl(props: JoinClubControlProps) {
  if (props.behavior === "popup") {
    const { behavior: _behavior, ...rest } = props;
    void _behavior;
    return <JoinClubTrigger {...rest} />;
  }
  if (props.behavior === "link") {
    const {
      behavior: _behavior,
      mobile = false,
      children,
      className = "",
      ...rest
    } = props;
    void _behavior;
    return (
      <OvalControl
        as="a"
        appearance={mobile ? "plain" : "nav"}
        href={localHref("/#join-club")}
        className={`${mobile ? "mobile-join" : "join-link"} ${className}`}
        {...rest}
      >
        {children ?? (mobile ? "Join club ↗" : "Join club")}
      </OvalControl>
    );
  }
  if (props.behavior === "placeholder") {
    const {
      behavior: _behavior,
      children = "Join club",
      className = "",
      ...rest
    } = props;
    void _behavior;
    return (
      <OvalControl as="span" className={`signup-label ${className}`} {...rest}>
        {children}
      </OvalControl>
    );
  }
  const { behavior, children = "Join Club", ...rest } = props;
  return (
    <OvalControl as="button" appearance="plain" type={behavior} {...rest}>
      {children}
    </OvalControl>
  );
}
