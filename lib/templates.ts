import type { TemplateWithMeta } from "@/types/template";
import type { SectionConfig } from "@/types/portfolio";

import atelier  from "@/templates/01-atelier.json";
import console_ from "@/templates/03-console.json";
import cover    from "@/templates/04-cover.json";
import halcyon  from "@/templates/05-halcyon.json";
import index    from "@/templates/06-index.json";
import ledger   from "@/templates/07-ledger.json";
import marquee  from "@/templates/08-marquee.json";
import press    from "@/templates/09-press.json";
import prism    from "@/templates/10-prism.json";
import showcase from "@/templates/11-showcase.json";
import showreel from "@/templates/12-showreel.json";
import split    from "@/templates/13-split.json";
import studio   from "@/templates/14-studio.json";
import timeline from "@/templates/15-timeline.json";

const TAG_MAP: Record<string, string> = {
  atelier:  "STUDIO SPLIT",
  console:  "DARK · DEV",
  cover:    "DARK · PHOTO",
  halcyon:  "DARK · MINIMAL",
  index:    "MASONRY",
  ledger:   "EDITORIAL",
  marquee:  "PORTRAIT HERO",
  press:    "NEWSPRINT",
  prism:    "BOLD HEADLINE",
  showcase: "BOLD",
  showreel: "DARK · REEL",
  split:    "SIDEBAR SPLIT",
  studio:   "STUDIO",
  timeline: "TIMELINE",
};

/** Default section label for each built-in type */
const DEFAULT_LABELS: Record<string, string> = {
  about:          "About",
  projects:       "Projects",
  experience:     "Experience",
  education:      "Education",
  skills:         "Skills",
  publications:   "Publications",
  awards:         "Awards",
  certifications: "Certifications",
  languages:      "Languages",
  testimonials:   "Testimonials",
  volunteer:      "Volunteer",
};

/** Extended sections always appended after the template's own sections */
const EXTENDED_SECTIONS: SectionConfig[] = [
  { id: "publications",   type: "publications",   label: "Publications",   visible: true,  order: 100 },
  { id: "awards",         type: "awards",         label: "Awards",         visible: true,  order: 101 },
  { id: "certifications", type: "certifications", label: "Certifications", visible: true,  order: 102 },
  { id: "languages",      type: "languages",      label: "Languages",      visible: true,  order: 103 },
  { id: "testimonials",   type: "testimonials",   label: "Testimonials",   visible: false, order: 104 },
  { id: "volunteer",      type: "volunteer",      label: "Volunteer",      visible: false, order: 105 },
];

const raw = [atelier, console_, cover, halcyon, index, ledger, marquee, press, prism, showcase, showreel, split, studio, timeline];

export const templates: TemplateWithMeta[] = raw.map((t) => ({
  ...(t as unknown as TemplateWithMeta),
  tag: TAG_MAP[t.id] ?? t.id.toUpperCase(),
}));

export function getTemplate(id: string): TemplateWithMeta | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Build the default SectionConfig array for a template.
 * Hero (order 0) and Contact (order 999) are always included and pinned.
 * The remaining sections come from template.sections, sorted by their order.
 */
export function getDefaultSections(template: TemplateWithMeta): SectionConfig[] {
  const builtIn = template.sections
    .filter((s) => s.type !== "hero" && s.type !== "contact")
    .sort((a, b) => a.order - b.order)
    .map((s, i) => ({
      id: s.id,
      type: s.type as SectionConfig["type"],
      label: DEFAULT_LABELS[s.type] ?? s.type,
      visible: s.visible,
      order: i + 1,           // 1-based; hero is 0, contact is 999
    }));

  const builtInTypes = new Set(builtIn.map((s) => s.type));
  const extras = EXTENDED_SECTIONS.filter((s) => !builtInTypes.has(s.type));
  const maxOrder = builtIn.length + 1;

  return [
    { id: "hero",    type: "about",    label: "Hero",    visible: true, order: 0   },
    ...builtIn,
    ...extras.map((s, i) => ({ ...s, order: maxOrder + i })),
    { id: "contact", type: "about",    label: "Contact", visible: true, order: 999 },
  ];
}
