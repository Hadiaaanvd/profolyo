// ─── Primitive types ──────────────────────────────────────────────────────────

/** @deprecated Use SocialLink.type (free string) instead */
export type SocialType =
  | "github" | "twitter" | "linkedin" | "readcv"
  | "instagram" | "dribbble" | "behance" | "youtube"
  | "website" | "other";

export type ProjectStatus = "live" | "in_progress" | "archived";

export type LinkType = "live" | "repo" | "case_study" | "design" | "other";

export type SectionType =
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "publications"
  | "testimonials"
  | "awards"
  | "certifications"
  | "languages"
  | "volunteer"
  | "custom";

export type LanguageProficiency =
  | "Native" | "Fluent" | "Professional" | "Conversational" | "Beginner";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface SocialLink {
  /** Unique id for React keys and editing */
  id: string;
  /** User-defined display name, e.g. "GitHub", "Newsletter" */
  label: string;
  url: string;
  /** Optional platform slug for icon lookup, e.g. "github", "linkedin" */
  type?: string;
}

export interface PortfolioUser {
  name: string;
  handle: string;
  headline: string;
  pronouns?: string;
  location: string;
  available: boolean;
  availability_text?: string;
  avatar_url?: string | null;
  cover_image_url?: string | null;
  /** ~200–250 chars — shown in the hero block */
  bio: string;
  /** Free-form, unlimited — shown in the About section */
  bio_long?: string;
  email: string;
  phone?: string;
  website?: string;
  social: SocialLink[];
  /** Optional note shown in the contact section instead of a hardcoded blurb */
  contact_note?: string;
  /** Resume file stored as a data URL (base64). Profolyo-generated résumés coming soon. */
  resume_url?: string;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectLink {
  type: LinkType;
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description?: string;
  role?: string;
  period?: string;
  team?: string;
  status: ProjectStatus;
  cover_image_url?: string | null;
  cover_color?: string;
  gallery?: string[];
  tech_stack: string[];
  links?: ProjectLink[];
  featured?: boolean;
}

// ─── Experience / Education / Skills ─────────────────────────────────────────

export interface Experience {
  id: string;
  company: string;
  title: string;
  period: string;
  location?: string;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  description?: string;
}

export interface SkillCategory {
  category?: string;
  items: string[];
}

// ─── Additional section types ─────────────────────────────────────────────────

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: string;
  type: "article" | "talk" | "podcast" | "paper" | "book" | "other";
  url?: string;
  summary?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar_url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  summary?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  period: string;
  description?: string;
}

// ─── Custom sections ──────────────────────────────────────────────────────────

/** A single item inside a user-defined custom section */
export interface CustomSectionItem {
  id: string;
  heading: string;
  subheading?: string;
  date?: string;
  description?: string;
  link?: string;
}

// ─── Section config (user-owned, stored on portfolio) ────────────────────────

/** Per-section config stored in the portfolio (user-owned overrides of template defaults) */
export interface SectionConfig {
  id: string;
  /** Built-in type or "custom" */
  type: SectionType;
  /** User-editable heading label, e.g. "Work" instead of "Projects" */
  label: string;
  visible: boolean;
  /** Lower = higher on the page. Hero = 0, Contact = 999 (always pinned) */
  order: number;
  /** Only present for type === "custom" — the section's content items */
  items?: CustomSectionItem[];
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface Portfolio {
  user: PortfolioUser;

  // Core sections
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];

  // Optional additional sections
  publications?: Publication[];
  testimonials?: Testimonial[];
  awards?: Award[];
  certifications?: Certification[];
  languages?: Language[];
  volunteer?: Volunteer[];

  /** Section configuration (visibility, order, labels). User-owned. */
  sections: SectionConfig[];
}
