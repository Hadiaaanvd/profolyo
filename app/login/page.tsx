export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-ink-50">
      {/* Wordmark */}
      <a
        href="/"
        className="font-display font-bold text-[28px] tracking-[-0.035em] leading-[0.92] text-ink-900 no-underline block mb-12"
      >
        Profolyo<span className="text-brand-500">.</span>
      </a>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-ink-150 p-8 bg-white shadow-3">
        <h1 className="font-display font-semibold text-[26px] tracking-[-0.015em] text-ink-900 mb-2">
          Sign in to Profolyo
        </h1>
        <p className="text-sm leading-relaxed text-ink-500 mb-8">
          Continue with GitHub to access your editor.
        </p>

        {/* GitHub button — will be wired to NextAuth */}
        <button
          className="w-full inline-flex items-center justify-center gap-3 font-medium font-body text-sm text-ink-800 bg-white rounded-md border border-ink-200 shadow-1 transition-colors hover:bg-ink-50 hover:border-ink-300 cursor-pointer"
          style={{ padding: "11px 16px" }}
        >
          <GitHubIcon />
          Continue with GitHub
        </button>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-400">
          By continuing you agree to our{" "}
          <a href="#" className="text-ink-600 underline underline-offset-[3px]">Terms</a>
          {" "}and{" "}
          <a href="#" className="text-ink-600 underline underline-offset-[3px]">Privacy Policy</a>.
        </p>
      </div>

      <p className="mt-6 text-[13px] text-ink-400">
        New here?{" "}
        <a href="/" className="text-ink-700 underline underline-offset-[3px]">
          Learn what Profolyo does
        </a>
      </p>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
