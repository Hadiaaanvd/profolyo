const PRODUCT_LINKS  = ["Editor", "Templates", "Pricing", "Changelog", "Roadmap"];
const RESOURCE_LINKS = ["Documentation", "Design system", "Examples", "API", "Self-host"];
const COMPANY_LINKS  = ["About", "Press kit", "Privacy", "Terms", "Contact"];

export default function Footer() {
  return (
    <footer style={{ padding: "56px 32px 36px", borderTop: "1px solid var(--color-ink-150)" }} aria-label="Site footer">
      {/* 4-column grid */}
      <div
        className="max-w-[1280px] mx-auto grid gap-8"
        style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1fr" }}
      >
        {/* Brand col */}
        <div>
          <div
            className="font-display font-bold text-ink-900"
            style={{ fontSize: 20, letterSpacing: "-0.035em", marginBottom: 12 }}
          >
            Profolyo<span className="text-brand-500">.</span>
          </div>
          <p className="text-ink-500" style={{ fontSize: 13 }}>
            One profile. Two outputs. Built in Berlin, shipped globally.
          </p>
        </div>

        {/* Link cols */}
        {[
          { title: "Product",   links: PRODUCT_LINKS },
          { title: "Resources", links: RESOURCE_LINKS },
          { title: "Company",   links: COMPANY_LINKS },
        ].map((col) => (
          <div key={col.title}>
            <h5
              className="font-mono font-semibold text-ink-500 uppercase"
              style={{ fontSize: 11, letterSpacing: "0.14em", margin: "0 0 16px" }}
            >
              {col.title}
            </h5>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {col.links.map((link) => (
                <li key={link}>
                  <span className="text-ink-700 cursor-default" style={{ fontSize: 14 }}>
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-3 font-mono text-ink-500"
        style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid var(--color-ink-150)", fontSize: 11, letterSpacing: "0.06em" }}
      >
        <span>© {new Date().getFullYear()} Profolyo — All rights reserved.</span>
        <span>Built with care · profolyo.me</span>
      </div>
    </footer>
  );
}
