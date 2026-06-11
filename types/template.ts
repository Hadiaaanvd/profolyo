export type ColorMode = "light" | "dark";
export type Density = "compact" | "comfortable" | "spacious";
export type SectionType =
  | "hero"
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
  | "custom"
  | "contact";

export interface TemplateDefaults {
  accent_color: string;
  color_mode: ColorMode;
  density: Density;
}

export interface TemplateTypographyStyle {
  font_family: string;
  font_weights: number[];
  font_size_pt: number;
  line_height: number;
  letter_spacing_em?: number;
}

export interface TemplateTypography {
  heading: TemplateTypographyStyle;
  body: TemplateTypographyStyle;
  mono: TemplateTypographyStyle;
}

export interface TemplateLayout {
  kind: string;
  container_max_px: number;
  section_gap_px: number;
  page_padding_x_px: number;
  page_padding_y_px: number;
}

export interface TemplateTokens {
  background: string;
  surface: string;
  ink: string;
  ink_muted: string;
  border: string;
  radius_card_px: number;
  radius_button_px: number;
  radius_image_px: number;
}

export interface TemplateSection {
  id: string;
  type: SectionType;
  layout: string;
  visible: boolean;
  order: number;
  options?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  tagline: string;
  description: string;
  best_for: string[];
  preview_image: string;
  defaults: TemplateDefaults;
  typography: TemplateTypography;
  layout: TemplateLayout;
  tokens: TemplateTokens;
  sections: TemplateSection[];
}

/** Display metadata added on top of raw Template for UI use */
export interface TemplateDisplayMeta {
  tag: string;          // e.g. "EDITORIAL", "DARK · DEV"
}

export type TemplateWithMeta = Template & TemplateDisplayMeta;
