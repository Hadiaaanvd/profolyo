// Logo component — renders Profolyo brand mark as inline SVG.
// Uses inline font styles so it works with the page's loaded Bricolage Grotesque.
// variant="wordmark"  → full "Profolyo." (use in nav, headers)
// variant="monogram"  → compact "P."     (use in sidebar, tight corners)

const FONT: React.CSSProperties = {
  fontFamily: "'Bricolage Grotesque', 'Helvetica Neue', sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.035em",
};

interface LogoProps {
  variant?: "wordmark" | "monogram";
  /** Rendered height in px. Width scales automatically. Default: 20 */
  height?: number;
  className?: string;
  /** Ink color. Defaults to #0A0A09 (brand ink-black). */
  color?: string;
  /** Period accent color. Defaults to #3358FF (brand blue). */
  accentColor?: string;
}

export default function Logo({
  variant = "wordmark",
  height = 20,
  className,
  color = "#0A0A09",
  accentColor = "#3358FF",
}: LogoProps) {
  if (variant === "monogram") {
    // viewBox: 180 × 200, text baseline at y=170, fontSize≈180
    const width = height * (180 / 200);
    return (
      <svg
        viewBox="0 0 180 200"
        width={width}
        height={height}
        className={className}
        aria-label="Profolyo"
        role="img"
        style={{ display: "block", overflow: "visible" }}
      >
        <text x="0" y="170" fill={color} style={{ ...FONT, fontSize: 180 }}>
          P<tspan fill={accentColor}>.</tspan>
        </text>
      </svg>
    );
  }

  // wordmark — viewBox: 520 × 120, text baseline at y=95, fontSize≈96
  const width = height * (520 / 120);
  return (
    <svg
      viewBox="0 0 520 120"
      width={width}
      height={height}
      className={className}
      aria-label="Profolyo"
      role="img"
      style={{ display: "block", overflow: "visible" }}
    >
      <text x="0" y="95" fill={color} style={{ ...FONT, fontSize: 96 }}>
        Profolyo<tspan fill={accentColor}>.</tspan>
      </text>
    </svg>
  );
}
