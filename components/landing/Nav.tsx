import Logo from "@/components/ui/Logo";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center gap-4 sm:gap-7 px-4 sm:px-8 border-b"
      style={{
        height: 56,
        background: "color-mix(in srgb, var(--color-ink-50) 80%, transparent)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottomColor: "color-mix(in srgb, var(--color-ink-200) 50%, transparent)",
      }}
    >
      {/* Wordmark */}
      <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Logo variant="wordmark" height={20} />
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex gap-1 ml-auto" aria-label="Main navigation">
        {[
          { label: "Why Profolyo", href: "#why" },
          { label: "Editor",       href: "#editor" },
          { label: "Templates",    href: "#templates" },
          { label: "Pricing",      href: "#pricing" },
          { label: "Changelog",    href: "#changelog" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-ink-600 hover:bg-ink-100 hover:text-ink-900 hover:no-underline rounded-[10px] transition-colors"
            style={{ fontSize: 13.5, fontWeight: 500, padding: "6px 10px", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA buttons */}
      <div className="flex items-center gap-2 ml-4 md:ml-0 shrink-0">
        <a
          href="/login"
          className="hidden sm:inline-flex items-center rounded-[10px] text-ink-700 hover:bg-ink-100 hover:text-ink-900 hover:no-underline transition-colors"
          style={{ fontSize: 14, fontWeight: 500, padding: "12px 18px", textDecoration: "none" }}
        >
          Sign in
        </a>
        <a
          href="/onboarding"
          className="inline-flex items-center gap-2 rounded-[10px] bg-brand-500 text-white hover:bg-brand-600 hover:no-underline transition-colors"
          style={{ fontSize: 14, fontWeight: 500, padding: "12px 18px", textDecoration: "none", boxShadow: "var(--shadow-brand)" }}
        >
          Get started <span className="font-mono opacity-80">→</span>
        </a>
      </div>
    </header>
  );
}
