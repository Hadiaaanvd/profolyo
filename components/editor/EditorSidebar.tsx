"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PanelLeftClose, PanelLeftOpen,
  GripVertical, Eye, EyeOff, Pencil, Trash2, Plus,
  Palette, User, LayoutGrid, Briefcase, GraduationCap, Layers,
  BookOpen, MessageSquare, Trophy, BadgeCheck, Languages, Heart,
  Mail, Sparkles, Home,
} from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { SectionConfig } from "@/types/portfolio";
import CreateSectionModal from "./CreateSectionModal";
import Logo from "@/components/ui/Logo";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 52;

// ── Icon per section type ─────────────────────────────────────────────────────
const TYPE_ICON: Record<string, React.ElementType> = {
  hero:           Home,
  about:          User,
  projects:       LayoutGrid,
  experience:     Briefcase,
  education:      GraduationCap,
  skills:         Layers,
  publications:   BookOpen,
  testimonials:   MessageSquare,
  awards:         Trophy,
  certifications: BadgeCheck,
  languages:      Languages,
  volunteer:      Heart,
  contact:        Mail,
  custom:         Sparkles,
};

function SectionIcon({ type, size = 14 }: { type: string; size?: number }) {
  const Icon = TYPE_ICON[type] ?? Sparkles;
  return <Icon size={size} />;
}

// ── Sortable row ──────────────────────────────────────────────────────────────
function SortableRow({
  section, active, collapsed, onActivate, onToggle, onDelete, onRename,
}: {
  section: SectionConfig; active: boolean; collapsed: boolean;
  onActivate: () => void; onToggle: () => void; onDelete: () => void; onRename: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  return (
    <div
      ref={setNodeRef}
      suppressHydrationWarning
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className={`group flex items-center gap-1 rounded-[7px] transition-colors${active ? " bg-brand-50" : " hover:bg-ink-100"}`}
    >
      {/* Drag handle */}
      {!collapsed && (
        <button
          type="button"
          {...attributes}
          {...listeners}
          suppressHydrationWarning
          className="flex items-center justify-center w-5 h-7 shrink-0 text-ink-300 hover:text-ink-500 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity pl-1"
          tabIndex={-1}
          aria-label="Drag to reorder"
        >
          <GripVertical size={12} />
        </button>
      )}

      {/* Main button */}
      <button
        type="button"
        onClick={onActivate}
        title={collapsed ? section.label : undefined}
        className="flex items-center gap-2 flex-1 min-w-0 py-[7px] text-left cursor-pointer transition-colors"
        style={{
          paddingLeft: collapsed ? 0 : 4,
          paddingRight: collapsed ? 0 : 2,
          justifyContent: collapsed ? "center" : "flex-start",
          color: active ? "var(--color-brand-600)" : section.visible ? "var(--color-ink-700)" : "var(--color-ink-350)",
        }}
      >
        <span className="shrink-0" style={{ color: active ? "var(--color-brand-500)" : "var(--color-ink-400)" }}>
          <SectionIcon type={section.type} size={14} />
        </span>
        {!collapsed && (
          <span className="text-[13px] font-medium font-body truncate flex-1"
            style={{ color: active ? "var(--color-brand-700)" : section.visible ? "var(--color-ink-700)" : "var(--color-ink-400)" }}>
            {section.label}
          </span>
        )}
      </button>

      {/* Actions */}
      {!collapsed && (
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pr-1.5">
          <button type="button" onClick={onRename}
            className="w-5 h-5 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-200 transition-colors cursor-pointer"
            title="Rename">
            <Pencil size={10} />
          </button>
          <button type="button" onClick={onToggle}
            className="w-5 h-5 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-200 transition-colors cursor-pointer"
            title={section.visible ? "Hide" : "Show"}>
            {section.visible ? <Eye size={11} /> : <EyeOff size={11} />}
          </button>
          {section.type === "custom" && (
            <button type="button" onClick={onDelete}
              className="w-5 h-5 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete">
              <Trash2 size={10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Pinned row (hero / contact) ────────────────────────────────────────────────
function PinnedRow({
  section, active, collapsed, onActivate, onToggle,
}: {
  section: SectionConfig; active: boolean; collapsed: boolean;
  onActivate: () => void; onToggle: () => void;
}) {
  const type = section.id === "hero" ? "hero" : "contact";
  return (
    <div className={`group flex items-center gap-1 rounded-[7px] transition-colors${active ? " bg-brand-50" : " hover:bg-ink-100"}`}>
      {!collapsed && <div className="w-5 shrink-0" />}
      <button
        type="button"
        onClick={onActivate}
        title={collapsed ? section.label : undefined}
        className="flex items-center gap-2 flex-1 min-w-0 py-[7px] text-left cursor-pointer transition-colors"
        style={{
          paddingLeft: collapsed ? 0 : 4,
          paddingRight: collapsed ? 0 : 2,
          justifyContent: collapsed ? "center" : "flex-start",
          color: active ? "var(--color-brand-600)" : section.visible ? "var(--color-ink-700)" : "var(--color-ink-350)",
        }}
      >
        <span className="shrink-0" style={{ color: active ? "var(--color-brand-500)" : "var(--color-ink-400)" }}>
          <SectionIcon type={type} size={14} />
        </span>
        {!collapsed && (
          <span className="text-[13px] font-medium font-body truncate flex-1"
            style={{ color: active ? "var(--color-brand-700)" : section.visible ? "var(--color-ink-700)" : "var(--color-ink-400)" }}>
            {section.label}
          </span>
        )}
      </button>
      {!collapsed && (
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity pr-1.5">
          <button type="button" onClick={onToggle}
            className="w-5 h-5 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-200 transition-colors cursor-pointer"
            title={section.visible ? "Hide" : "Show"}>
            {section.visible ? <Eye size={11} /> : <EyeOff size={11} />}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Rename inline popover ─────────────────────────────────────────────────────
function RenamePopover({ initial, onSave, onCancel }: { initial: string; onSave: (v: string) => void; onCancel: () => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="px-2 pb-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onSave(value.trim() || initial); if (e.key === "Escape") onCancel(); }}
        className="w-full text-[12px] font-body px-2 py-1.5 rounded-md border border-ink-200 bg-white text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
        placeholder="Section label"
      />
      <div className="flex gap-1 mt-1.5">
        <button type="button" onClick={() => onSave(value.trim() || initial)}
          className="flex-1 text-[11px] font-medium py-1 rounded-md bg-brand-600 text-white hover:bg-brand-700 transition-colors cursor-pointer">
          Save
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 text-[11px] font-medium py-1 rounded-md bg-ink-100 text-ink-600 hover:bg-ink-200 transition-colors cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main sidebar ──────────────────────────────────────────────────────────────
export default function EditorSidebar() {
  const {
    portfolio, activePanel, setActivePanel,
    reorderSections, toggleSectionVisibility, renameSection, deleteSection,
    hydrated,
  } = useEditor();

  const [collapsed, setCollapsed] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { sections } = portfolio;
  const hero    = sections.find((s) => s.id === "hero");
  const contact = sections.find((s) => s.id === "contact");
  const reorderable = sections
    .filter((s) => s.id !== "hero" && s.id !== "contact")
    .sort((a, b) => a.order - b.order);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = reorderable.findIndex((s) => s.id === active.id);
    const newIndex = reorderable.findIndex((s) => s.id === over.id);
    reorderSections(arrayMove(reorderable, oldIndex, newIndex).map((s) => s.id));
  }

  const globalPanels = [
    { id: "appearance" as const, label: "Appearance", Icon: Palette },
  ];

  return (
    <>
      <aside
        className="relative flex flex-col h-full border-r border-ink-150 bg-ink-50 shrink-0 transition-all duration-200"
        style={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      >
        {/* Skeleton overlay — shown until localStorage has hydrated to prevent icon mismatch */}
        {!hydrated && (
          <div className="absolute inset-0 z-10 bg-ink-50" style={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }} />
        )}
        {/* Logo + collapse */}
        <div
          className="flex items-center border-b border-ink-150 shrink-0 px-3 pt-5 pb-4"
          style={{ justifyContent: collapsed ? "center" : "space-between" }}
        >
          {collapsed ? (
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }} aria-label="Profolyo home">
              <Logo variant="monogram" height={24} />
            </Link>
          ) : (
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }} aria-label="Profolyo home">
              <Logo variant="wordmark" height={18} />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex items-center justify-center w-7 h-7 rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        {/* Global panels */}
        <div className="flex flex-col gap-0.5 px-2 pt-3 pb-1 shrink-0">
          {globalPanels.map(({ id, label, Icon }) => {
            const active = activePanel === id;
            return (
              <button key={id} type="button" onClick={() => setActivePanel(id)}
                title={collapsed ? label : undefined}
                className="flex items-center gap-2 rounded-[8px] transition-colors cursor-pointer"
                style={{
                  padding: collapsed ? "7px 0" : "7px 10px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: active ? "var(--color-brand-50)" : "transparent",
                  color: active ? "var(--color-brand-700)" : "var(--color-ink-600)",
                }}
              >
                <Icon size={14} className="shrink-0" />
                {!collapsed && <span className="text-[13px] font-medium">{label}</span>}
              </button>
            );
          })}
        </div>

        {/* Divider + "Sections" label */}
        <div className="shrink-0">
          <div className="mx-3 my-2 border-t border-ink-150" />
          {!collapsed && (
            <div className="px-3 mb-1">
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-400">Sections</span>
            </div>
          )}
        </div>

        {/* Section list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 min-h-0">
          {hero && (
            <PinnedRow
              section={hero} active={activePanel === hero.id} collapsed={collapsed}
              onActivate={() => setActivePanel(hero.id)}
              onToggle={() => toggleSectionVisibility(hero.id)}
            />
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={reorderable.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {reorderable.map((section) => (
                <div key={section.id}>
                  {renaming === section.id ? (
                    <RenamePopover
                      initial={section.label}
                      onSave={(v) => { renameSection(section.id, v); setRenaming(null); }}
                      onCancel={() => setRenaming(null)}
                    />
                  ) : (
                    <SortableRow
                      section={section} active={activePanel === section.id} collapsed={collapsed}
                      onActivate={() => setActivePanel(section.id)}
                      onToggle={() => toggleSectionVisibility(section.id)}
                      onDelete={() => deleteSection(section.id)}
                      onRename={() => setRenaming(section.id)}
                    />
                  )}
                </div>
              ))}
            </SortableContext>
          </DndContext>

          {contact && (
            <PinnedRow
              section={contact} active={activePanel === contact.id} collapsed={collapsed}
              onActivate={() => setActivePanel(contact.id)}
              onToggle={() => toggleSectionVisibility(contact.id)}
            />
          )}

          {/* Add section */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            title={collapsed ? "Add section" : undefined}
            className="flex items-center gap-2 w-full mt-1 rounded-[7px] text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
            style={{ padding: collapsed ? "7px 0" : "7px 8px", justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <Plus size={13} />
            {!collapsed && <span className="text-[12px] font-medium font-body">Add section</span>}
          </button>
        </div>

        {/* User footer */}
        <div
          className="px-2 py-4 border-t border-ink-150 flex items-center gap-2.5 shrink-0"
          style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          {portfolio.user.avatar_url ? (
            <img
              src={portfolio.user.avatar_url}
              alt={portfolio.user.name || "Your photo"}
              className="w-7 h-7 rounded-full object-cover shrink-0 cursor-pointer border border-ink-200"
              title={collapsed ? (portfolio.user.name || "Your profile") : undefined}
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold font-display shrink-0 cursor-pointer"
              style={{ background: "linear-gradient(135deg, var(--color-brand-600), var(--color-brand-400))" }}
              title={collapsed ? (portfolio.user.name || "Your profile") : undefined}
            >
              {portfolio.user.name
                ? portfolio.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                : "?"}
            </div>
          )}
          {!collapsed && (
            <div className="leading-[1.3] min-w-0">
              <div className="text-[12px] font-medium text-ink-800 truncate">{portfolio.user.name || <span className="text-ink-300 italic">Your name</span>}</div>
              <div className="font-mono text-[10px] text-ink-400 truncate">{portfolio.user.handle ? <a href={`https://profolyo.me/${portfolio.user.handle}`} target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-600 transition-colors" style={{ textDecoration: "none" }}>profolyo.me/{portfolio.user.handle}</a> : "profolyo.me/…"}</div>
            </div>
          )}
        </div>
      </aside>

      {showCreateModal && <CreateSectionModal onClose={() => setShowCreateModal(false)} />}
    </>
  );
}
