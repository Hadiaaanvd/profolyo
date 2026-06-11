import type { Portfolio, PortfolioUser, Project, Experience, Education, SkillCategory } from "@/types/portfolio";
import type { Template, TemplateSection, TemplateTokens, TemplateTypography } from "@/types/template";

/** Everything a section component needs */
export interface SectionProps {
  portfolio: Portfolio;
  template: Template;
  section: TemplateSection;
  accentColor: string;
}

/** Shorthand for the token + typography combo passed to many sub-renderers */
export interface TemplateStyle {
  tokens: TemplateTokens;
  typography: TemplateTypography;
  accentColor: string;
}

export type { Portfolio, PortfolioUser, Project, Experience, Education, SkillCategory, Template, TemplateSection, TemplateTokens, TemplateTypography };
