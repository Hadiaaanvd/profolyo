"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { SkillCategory } from "@/types/portfolio";
import { PanelHeader, EmptyState, inputCls } from "./shared";
import TagsInput from "@/components/ui/TagsInput";

export default function SkillsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { skills } = portfolio;

  function addGroup() { updatePortfolio({ skills: [...skills, { category: "", items: [] }] }); }
  function deleteGroup(i: number) { updatePortfolio({ skills: skills.filter((_, idx) => idx !== i) }); }
  function patchGroup(i: number, patch: Partial<SkillCategory>) {
    updatePortfolio({ skills: skills.map((g, idx) => idx === i ? { ...g, ...patch } : g) });
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Skills" title="Expertise & tools" />
        <button type="button" onClick={addGroup}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-200 text-ink-700 text-[13px] font-medium hover:bg-ink-50 transition-colors cursor-pointer">
          + Add group
        </button>
      </div>
      {skills.length === 0 ? (
        <EmptyState icon="🛠" title="No skills yet" description="Group your skills — e.g. Languages, Frameworks, Tools." action="Add your first group" onAction={addGroup} />
      ) : (
        <div className="flex flex-col gap-6">
          {skills.map((group, i) => (
            <section key={i} className="p-4 rounded-xl border border-ink-150 bg-white">
              <div className="flex items-start gap-3 mb-3">
                <input type="text" value={group.category ?? ""} onChange={(e) => patchGroup(i, { category: e.target.value })}
                  placeholder="Group name (optional)"
                  className="flex-1 text-[13px] font-semibold text-ink-800 bg-transparent border-0 focus:outline-none placeholder-ink-300 font-display" />
                <button type="button" onClick={() => deleteGroup(i)}
                  className="w-6 h-6 flex items-center justify-center rounded text-ink-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0">
                  <Trash2 size={12} />
                </button>
              </div>
              <TagsInput tags={group.items} onChange={(items) => patchGroup(i, { items })} placeholder="Type a skill and press Enter" />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
