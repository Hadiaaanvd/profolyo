"use client";
import { useRef, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Project, ProjectStatus } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";
import TagsInput from "@/components/ui/TagsInput";

export default function ProjectsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { projects } = portfolio;
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const STATUS_CLASSES: Record<string, string> = {
    live:        "bg-green-50 text-green-700 border-green-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    archived:    "bg-ink-100 text-ink-500 border-ink-200",
  };
  const STATUS_LABEL: Record<ProjectStatus, string> = { live: "Live", in_progress: "In progress", archived: "Archived" };

  function deleteProject(id: string) {
    updatePortfolio({ projects: projects.filter((p) => p.id !== id) });
    setDeleteConfirmId(null);
  }

  function saveProject(draft: Project) {
    if (editingId === "new") updatePortfolio({ projects: [...projects, draft] });
    else updatePortfolio({ projects: projects.map((p) => (p.id === draft.id ? draft : p)) });
    setEditingId(null);
  }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : projects.find((p) => p.id === editingId);
    return <ProjectForm initial={base} onSave={saveProject} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[800px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Projects" title="Your work" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>
          + New project
        </button>
      </div>
      {projects.length === 0 ? (
        <EmptyState icon="🚀" title="No projects yet" description="Add your first project to show off your work." action="+ New project" onAction={() => setEditingId("new")} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article key={p.id} className="border border-ink-150 rounded-xl bg-white overflow-hidden group">
              <div className="h-28 w-full relative overflow-hidden" style={{ background: p.cover_color ?? "var(--color-ink-100)" }}>
                {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.35)" }}>
                  <button type="button" onClick={() => setEditingId(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-ink-800 text-[12px] font-medium hover:bg-ink-50 transition-colors cursor-pointer">
                    <Pencil size={12} /> Edit
                  </button>
                  {deleteConfirmId === p.id ? (
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={() => deleteProject(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-[12px] font-medium cursor-pointer hover:bg-red-600">Delete</button>
                      <button type="button" onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 rounded-lg bg-white text-ink-600 text-[12px] cursor-pointer hover:bg-ink-50"><X size={12} /></button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setDeleteConfirmId(p.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red-600 text-[12px] font-medium hover:bg-red-50 cursor-pointer">
                      <Trash2 size={12} /> Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 cursor-pointer" onClick={() => setEditingId(p.id)}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-display font-semibold text-[14px] text-ink-900 leading-tight">{p.title}</h2>
                  {p.featured && <span className="shrink-0 text-[11px] font-mono text-brand-500 bg-brand-50 border border-brand-200 rounded-full px-2 py-0.5">★ featured</span>}
                </div>
                <p className="text-ink-500 text-[12px] leading-relaxed mb-3 line-clamp-2">{p.tagline}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${STATUS_CLASSES[p.status]}`}>
                    {p.status === "live" ? "● " : p.status === "in_progress" ? "◐ " : "○ "}{STATUS_LABEL[p.status]}
                  </span>
                  <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                    {p.tech_stack.slice(0, 3).map((t) => (
                      <span key={t} className="shrink-0 text-[10px] font-mono text-ink-500 bg-ink-50 border border-ink-150 rounded px-1.5 py-0.5">{t}</span>
                    ))}
                    {p.tech_stack.length > 3 && <span className="text-[10px] font-mono text-ink-400">+{p.tech_stack.length - 3}</span>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

const COVER_PRESETS = [
  "linear-gradient(135deg,#E5E2D8,#CECCBF)",
  "linear-gradient(135deg,#FFD4A8,#E76F51)",
  "linear-gradient(135deg,#A8D8EA,#6C98B7)",
  "linear-gradient(135deg,#D4A8FF,#7C3AED)",
  "linear-gradient(135deg,#A8FFD4,#059669)",
  "linear-gradient(135deg,#FFD4D4,#E11D48)",
  "linear-gradient(135deg,#FFF3A8,#D97706)",
  "linear-gradient(135deg,#1a1a2e,#16213e)",
  "#F0EDE8", "#1A1A1A",
];
const LINK_TYPES = ["live", "repo", "case_study", "design", "other"] as const;
const LINK_TYPE_LABEL: Record<string, string> = {
  live: "Live site", repo: "Repository", case_study: "Case study", design: "Design file", other: "Other",
};
const STATUS_OPTIONS: { value: ProjectStatus; label: string; dot: string }[] = [
  { value: "live",        label: "Live",        dot: "bg-green-500" },
  { value: "in_progress", label: "In progress", dot: "bg-amber-400" },
  { value: "archived",    label: "Archived",    dot: "bg-ink-300"   },
];

function ProjectForm({ initial, onSave, onCancel }: { initial?: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [title,       setTitle]       = useState(initial?.title ?? "");
  const [tagline,     setTagline]     = useState(initial?.tagline ?? "");
  const [description, setDesc]        = useState(initial?.description ?? "");
  const [role,        setRole]        = useState(initial?.role ?? "");
  const [period,      setPeriod]      = useState(initial?.period ?? "");
  const [coverTab,    setCoverTab]    = useState<"color" | "image">(initial?.cover_image_url ? "image" : "color");
  const [coverColor,  setCoverColor]  = useState(initial?.cover_color ?? "linear-gradient(135deg, #E5E2D8, #CECCBF)");
  const [coverImage,  setCoverImage]  = useState<string | null>(initial?.cover_image_url ?? null);
  const coverInputRef                 = useRef<HTMLInputElement>(null);
  const [techStack,   setTechStack]   = useState<string[]>(initial?.tech_stack ?? []);
  const [featured,    setFeatured]    = useState(initial?.featured ?? false);
  const [status,      setStatus]      = useState<ProjectStatus>(initial?.status ?? "in_progress");
  const [links,       setLinks]       = useState<{ type: string; url: string; label: string }[]>(
    (initial?.links ?? []).map((l) => ({ type: l.type, url: l.url, label: l.label ?? "" }))
  );

  function addLink() { setLinks((p) => [...p, { type: "live", url: "", label: "" }]); }
  function patchLink(i: number, field: "type" | "url" | "label", value: string) {
    setLinks((p) => p.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  }
  function removeLink(i: number) { setLinks((p) => p.filter((_, idx) => idx !== i)); }

  function handleSave() {
    if (!title.trim()) return;
    onSave({
      id:              initial?.id ?? `p_${Date.now()}`,
      slug:            initial?.slug ?? title.toLowerCase().replace(/\s+/g, "-"),
      title:           title.trim(),
      tagline:         tagline.trim(),
      description:     description.trim() || undefined,
      role:            role.trim() || undefined,
      period:          period.trim() || undefined,
      status,
      cover_image_url: coverImage ?? null,
      cover_color:     coverTab === "color" ? (coverColor || undefined) : undefined,
      tech_stack:      techStack,
      links:           links.filter((l) => l.url.trim()).map((l) => ({
        type: l.type as import("@/types/portfolio").LinkType,
        url: l.url.trim(),
        label: l.label.trim() || undefined,
      })),
      featured: featured || undefined,
    });
  }

  const isPreset = COVER_PRESETS.includes(coverColor);
  const solidHex = /^#[0-9A-Fa-f]{3,8}$/.test(coverColor) ? coverColor : "#F0EDE8";
  const fieldCls = "mb-5";

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add project" : "Edit project"} title={isNew ? "New project" : (title || "Untitled")} onBack={onCancel} />

      {/* Cover */}
      <div className={fieldCls}>
        <label className={labelCls}>Cover</label>
        <div className="rounded-xl h-28 w-full mb-3 overflow-hidden"
          style={{ background: coverTab === "image" && coverImage ? "transparent" : coverColor }}>
          {coverTab === "image" && coverImage && <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />}
        </div>
        <div className="flex gap-1 mb-3 p-0.5 rounded-lg bg-ink-100 w-fit">
          {(["color", "image"] as const).map((tab) => (
            <button key={tab} type="button" onClick={() => setCoverTab(tab)}
              className="px-3 py-1 rounded-md text-[12px] font-medium transition-colors cursor-pointer capitalize"
              style={{
                background: coverTab === tab ? "white" : "transparent",
                color: coverTab === tab ? "var(--color-ink-900)" : "var(--color-ink-400)",
                boxShadow: coverTab === tab ? "0 1px 3px rgba(0,0,0,.08)" : "none",
              }}>{tab}</button>
          ))}
        </div>
        {coverTab === "color" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {COVER_PRESETS.map((p) => (
                <button key={p} type="button" title={p} onClick={() => setCoverColor(p)}
                  className="w-8 h-8 rounded-md border-2 transition-all cursor-pointer flex-shrink-0"
                  style={{ background: p, borderColor: coverColor === p ? "var(--color-brand-500)" : "transparent", outline: coverColor === p ? "2px solid var(--color-brand-200)" : "none" }} />
              ))}
              <label title="Custom color" className="w-8 h-8 rounded-md border-2 cursor-pointer flex-shrink-0 relative overflow-hidden"
                style={{ background: !isPreset ? coverColor : "conic-gradient(red,#ff0,lime,cyan,blue,magenta,red)", borderColor: !isPreset ? "var(--color-brand-500)" : "transparent", outline: !isPreset ? "2px solid var(--color-brand-200)" : "none" }}>
                <input type="color" value={solidHex} onChange={(e) => setCoverColor(e.target.value)} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
              </label>
            </div>
            <input type="text" value={coverColor} onChange={(e) => setCoverColor(e.target.value)} className={inputCls} placeholder="e.g. #E76F51 or linear-gradient(135deg, …)" />
            <p className="text-[11px] text-ink-400 mt-1">Any CSS color or gradient value.</p>
          </div>
        )}
        {coverTab === "image" && (
          <div>
            <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => setCoverImage(r.result as string); r.readAsDataURL(f); }} />
            {coverImage ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => coverInputRef.current?.click()}
                  className="flex-1 px-3 py-2 text-[12px] font-medium text-ink-700 bg-ink-50 border border-ink-200 rounded-md hover:bg-ink-100 cursor-pointer">Change image</button>
                <button type="button" onClick={() => setCoverImage(null)}
                  className="px-3 py-2 text-[12px] font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 cursor-pointer">Remove</button>
              </div>
            ) : (
              <button type="button" onClick={() => coverInputRef.current?.click()}
                className="w-full px-3 py-4 text-[13px] font-medium text-ink-500 bg-ink-50 border-2 border-dashed border-ink-200 rounded-xl hover:border-ink-300 hover:bg-ink-100 cursor-pointer">
                Click to upload an image
              </button>
            )}
          </div>
        )}
      </div>

      <div className={fieldCls}><label className={labelCls}>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Givency" /></div>
      <div className={fieldCls}><label className={labelCls}>Tagline</label><input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputCls} placeholder="A short one-liner describing the project" /></div>
      <div className={fieldCls}><label className={labelCls}>Description</label><RichTextEditor value={description} onChange={setDesc} placeholder="Longer description for case study view" rows={3} /></div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div><label className={labelCls}>Your role</label><input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} placeholder="Frontend Lead" /></div>
        <div><label className={labelCls}>Period</label><input value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} placeholder="2021 — 2024" /></div>
      </div>
      <div className={fieldCls}>
        <label className={labelCls}>Status</label>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button key={opt.value} type="button" onClick={() => setStatus(opt.value)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors cursor-pointer"
              style={{ borderColor: status === opt.value ? "var(--color-brand-400)" : "var(--color-ink-200)", background: status === opt.value ? "var(--color-brand-50)" : "white", color: status === opt.value ? "var(--color-brand-700)" : "var(--color-ink-600)" }}>
              <span className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />{opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className={fieldCls}><label className={labelCls}>Tech stack</label><TagsInput tags={techStack} onChange={setTechStack} placeholder="React, TypeScript… (Enter or comma)" /></div>
      <div className={fieldCls}>
        <label className={labelCls}>Links</label>
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <select value={link.type} onChange={(e) => patchLink(i, "type", e.target.value)}
                className="text-[12px] px-2 py-2 rounded-lg border border-ink-200 bg-white text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-400 shrink-0 cursor-pointer">
                {LINK_TYPES.map((t) => <option key={t} value={t}>{LINK_TYPE_LABEL[t]}</option>)}
              </select>
              <input type="url" value={link.url} onChange={(e) => patchLink(i, "url", e.target.value)} placeholder="https://..." className={`${inputCls} flex-1`} />
              <input type="text" value={link.label} onChange={(e) => patchLink(i, "label", e.target.value)} placeholder="Label (optional)"
                className="text-[13px] px-3 py-2 rounded-lg border border-ink-200 text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white w-36 shrink-0" />
              <button type="button" onClick={() => removeLink(i)}
                className="w-7 h-7 flex items-center justify-center rounded text-ink-300 hover:text-red-500 hover:bg-red-50 cursor-pointer shrink-0"><Trash2 size={13} /></button>
            </div>
          ))}
          <button type="button" onClick={addLink} className="mt-1 text-[12px] text-brand-600 hover:text-brand-700 font-medium cursor-pointer text-left">+ Add link</button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-8 p-3 rounded-xl border border-ink-150 bg-ink-50">
        <button type="button" role="switch" aria-checked={featured} onClick={() => setFeatured((v) => !v)}
          className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${featured ? "bg-brand-500" : "bg-ink-200"}`}>
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${featured ? "translate-x-4" : ""}`} />
        </button>
        <div>
          <div className="text-[13px] font-medium text-ink-800">Featured project</div>
          <div className="text-[11px] text-ink-400">Some templates highlight featured projects on the hero or in a special grid.</div>
        </div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add project" : "Save changes"} disabled={!title.trim()} />
    </div>
  );
}
