"use client";
import { useEditor } from "@/contexts/EditorContext";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { PanelHeader } from "./shared";

export default function AboutPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { user } = portfolio;

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <PanelHeader eyebrow="About" title="About section" subtitle="A longer bio shown in your About section. No length limit." />
      <div>
        <label className="block text-[11px] font-mono uppercase tracking-widest text-ink-400 mb-1.5">Long bio</label>
        <RichTextEditor
          value={user.bio_long ?? ""}
          onChange={(html) => updatePortfolio({ user: { ...user, bio_long: html } })}
          placeholder="Your background, what you care about, what you're working on…"
          rows={10}
        />
      </div>
    </div>
  );
}
