import { LOGOS, type LogoName } from "./logos";

type Props = {
  /** A known logo, or "chat" for a neutral glyph (used where no licensed mark exists). */
  name: LogoName | "chat";
  /** "brand" uses the owner's colour; "mono" inherits the text colour. */
  tone?: "brand" | "mono";
  className?: string;
};

/** A single brand mark. Decorative: the visible label next to it carries the name. */
export function BrandMark({ name, tone = "mono", className }: Props) {
  if (name === "chat") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M4 3h16a2 2 0 012 2v11a2 2 0 01-2 2H9l-5 4v-4a2 2 0 01-2-2V5a2 2 0 012-2zm3 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        />
      </svg>
    );
  }
  const logo = LOGOS[name];
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill={tone === "brand" ? logo.hex : "currentColor"} d={logo.path} />
    </svg>
  );
}
