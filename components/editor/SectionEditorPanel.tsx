"use client";
import { useEditor } from "@/contexts/EditorContext";
import AppearancePanel   from "./panels/AppearancePanel";
import AboutPanel        from "./panels/AboutPanel";
import HeroPanel         from "./panels/HeroPanel";
import ContactPanel      from "./panels/ContactPanel";
import ExperiencePanel   from "./panels/ExperiencePanel";
import EducationPanel    from "./panels/EducationPanel";
import SkillsPanel       from "./panels/SkillsPanel";
import ProjectsPanel     from "./panels/ProjectsPanel";
import PublicationsPanel from "./panels/PublicationsPanel";
import AwardsPanel       from "./panels/AwardsPanel";
import CertificationsPanel from "./panels/CertificationsPanel";
import LanguagesPanel    from "./panels/LanguagesPanel";
import TestimonialsPanel from "./panels/TestimonialsPanel";
import VolunteerPanel    from "./panels/VolunteerPanel";
import CustomSectionPanel from "./panels/CustomSectionPanel";
import WelcomePanel      from "./panels/WelcomePanel";

export default function SectionEditorPanel() {
  const { activePanel, portfolio } = useEditor();

  if (activePanel === null)         return <WelcomePanel />;
  if (activePanel === "appearance") return <AppearancePanel />;

  const section = portfolio.sections.find((s) => s.id === activePanel);
  if (!section) return <WelcomePanel />;

  if (section.id === "hero")             return <HeroPanel />;
  if (section.id === "about")            return <AboutPanel />;
  if (section.id === "contact")          return <ContactPanel />;
  if (section.type === "projects")       return <ProjectsPanel />;
  if (section.type === "experience")     return <ExperiencePanel />;
  if (section.type === "education")      return <EducationPanel />;
  if (section.type === "skills")         return <SkillsPanel />;
  if (section.type === "publications")   return <PublicationsPanel />;
  if (section.type === "awards")         return <AwardsPanel />;
  if (section.type === "certifications") return <CertificationsPanel />;
  if (section.type === "languages")      return <LanguagesPanel />;
  if (section.type === "testimonials")   return <TestimonialsPanel />;
  if (section.type === "volunteer")      return <VolunteerPanel />;
  if (section.type === "custom")         return <CustomSectionPanel section={section} />;

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400 mb-1">{section.type}</p>
      <h1 className="font-display font-bold text-[24px] tracking-tight text-ink-900 mb-6">{section.label}</h1>
      <div className="p-6 rounded-xl border border-dashed border-ink-200 text-center text-ink-400 text-[13px]">
        Editor for this section type coming soon.
      </div>
    </div>
  );
}
