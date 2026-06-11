"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "taken" | "invalid" | "ok">("idle");
  const router = useRouter();

  const RESERVED = new Set(["api", "editor", "login", "logout", "admin", "dashboard", "settings", "resume", "projects", "static", "public", "profolyo"]);
  const USERNAME_RE = /^[a-z0-9-]{3,30}$/;

  function validate(val: string) {
    if (!val) return setStatus("idle");
    if (!USERNAME_RE.test(val)) return setStatus("invalid");
    if (RESERVED.has(val)) return setStatus("taken");
    setStatus("ok");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(val);
    validate(val);
  }

  function handleClaim() {
    if (status !== "ok") return;

    // Persist the claimed handle into localStorage before entering the editor.
    // We read the existing portfolio (if any) and patch only the handle so we
    // don't clobber data the user may have already entered.
    try {
      const KEY = "profolyo_portfolio_v1";
      const raw = localStorage.getItem(KEY);
      const existing = raw ? JSON.parse(raw) : {};
      const patched = {
        ...existing,
        user: { ...(existing.user ?? {}), handle: username },
      };
      localStorage.setItem(KEY, JSON.stringify(patched));
    } catch {
      // localStorage unavailable — editor will still work, just without the handle pre-filled
    }

    router.push("/editor");
  }

  const hint =
    status === "invalid"
      ? "3–30 characters, lowercase letters, numbers, and hyphens only."
      : status === "taken"
      ? "That username is reserved. Try another."
      : status === "ok"
      ? `Your portfolio will live at profolyo.me/${username}`
      : "Pick your username. You can change it later.";

  const hintClass =
    status === "invalid" || status === "taken"
      ? "text-red-500"
      : status === "ok"
      ? "text-green-500"
      : "text-ink-400";

  const wrapperStyle = {
    borderColor:
      status === "invalid" || status === "taken"
        ? "var(--color-red-500)"
        : status === "ok"
        ? "var(--color-green-500)"
        : "var(--color-ink-200)",
    boxShadow:
      status === "ok"
        ? "0 0 0 3px rgba(22,163,74,.12)"
        : status === "invalid" || status === "taken"
        ? "0 0 0 3px rgba(220,38,38,.12)"
        : "none",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-ink-50">
      {/* Wordmark */}
      <span className="font-display font-bold text-[28px] tracking-[-0.035em] leading-[0.92] text-ink-900 block mb-12">
        Profolyo<span className="text-brand-500">.</span>
      </span>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-ink-150 p-8 bg-white shadow-3">
        <div
          className="w-10 h-10 rounded-full mb-6 flex items-center justify-center text-white font-semibold text-base"
          style={{ background: "linear-gradient(135deg, var(--color-brand-600), var(--color-brand-400))" }}
        >
          ✦
        </div>

        <h1 className="font-display font-semibold text-[26px] tracking-[-0.015em] text-ink-900 mb-2">
          Claim your URL
        </h1>
        <p className="text-sm leading-relaxed text-ink-500 mb-8">
          This becomes your permanent portfolio address.
        </p>

        {/* Input */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="username" className="text-[13px] font-medium text-ink-700">
            Username
          </label>
          <div
            className="flex items-center rounded-md border transition-all overflow-hidden bg-white"
            style={wrapperStyle}
          >
            <span className="font-mono text-[13px] text-ink-400 border-r border-ink-200 bg-ink-50 flex items-center px-3 py-2.5">
              profolyo.me/
            </span>
            <input
              id="username"
              value={username}
              onChange={handleChange}
              placeholder="yourname"
              className="flex-1 outline-none bg-transparent font-mono text-sm text-ink-900 px-3 py-2.5"
              autoFocus
            />
          </div>
          <p className={`text-xs leading-relaxed ${hintClass}`}>{hint}</p>
        </div>

        <button
          onClick={handleClaim}
          disabled={status !== "ok"}
          className="w-full inline-flex items-center justify-center font-medium font-body text-sm text-white bg-brand-500 rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          style={{
            padding: "11px 16px",
            boxShadow: status === "ok" ? "var(--shadow-brand)" : "none",
          }}
        >
          Claim username →
        </button>
      </div>
    </div>
  );
}
