import type { SectionConfig, SectionType } from "@/types/portfolio";

// Hero and contact are pinned — they use id-based lookup since both share type "about"
type PinnedId = "hero" | "contact";
type LookupKey = SectionType | PinnedId;

/** Returns true if the section is visible */
export function sectionVisible(sections: SectionConfig[], key: LookupKey): boolean {
  if (key === "hero")    return sections.find((s) => s.id === "hero")?.visible    ?? true;
  if (key === "contact") return sections.find((s) => s.id === "contact")?.visible ?? true;
  return sections.find((s) => s.type === key && s.id !== "hero" && s.id !== "contact")?.visible ?? true;
}

/** Returns the user-editable label for a section */
export function sectionLabel(
  sections: SectionConfig[],
  key: LookupKey,
  fallback: string,
): string {
  if (key === "hero")    return sections.find((s) => s.id === "hero")?.label    ?? fallback;
  if (key === "contact") return sections.find((s) => s.id === "contact")?.label ?? fallback;
  return sections.find((s) => s.type === key && s.id !== "hero" && s.id !== "contact")?.label ?? fallback;
}

/** Returns sections of type "custom", sorted by order */
export function customSections(sections: SectionConfig[]): SectionConfig[] {
  return sections.filter((s) => s.type === "custom").sort((a, b) => a.order - b.order);
}

/**
 * Returns built-in section types in the user's chosen order.
 * Hero (order 0) and Contact (order 999) are excluded — templates pin them.
 * Only visible sections are returned.
 */
export function orderedBuiltInTypes(sections: SectionConfig[]): SectionType[] {
  return sections
    .filter((s) => s.type !== "custom" && s.id !== "hero" && s.id !== "contact" && s.visible)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.type);
}

/** Safe first name — falls back to full name for mononyms */
export function firstName(name: string): string {
  return name.split(" ")[0] ?? name;
}

/** Safe last name — falls back to full name for mononyms */
export function lastName(name: string): string {
  return name.split(" ").slice(1).join(" ") || name;
}

/** Derive a year-range string from an array of period strings like "2019 — 2024" */
export function yearRange(periods: string[]): string {
  const years: number[] = [];
  periods.forEach((p) => {
    const matches = p.match(/\d{4}/g);
    if (matches) years.push(...matches.map(Number));
  });
  if (years.length === 0) return "";
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min}—${max}`;
}

/** Fallback cover color when none is provided */
export const COVER_COLOR_FALLBACK = "#E5E2D8";

/** Human-readable label for a publication type */
export const PUBLICATION_TYPE_LABEL: Record<string, string> = {
  article: "Article",
  talk:    "Talk",
  podcast: "Podcast",
  paper:   "Paper",
  book:    "Book",
  other:   "Other",
};

/** Human-readable label for language proficiency */
export const PROFICIENCY_LABEL: Record<string, string> = {
  Native:           "Native",
  Fluent:           "Fluent",
  Professional:     "Professional",
  Conversational:   "Conversational",
  Beginner:         "Beginner",
};
