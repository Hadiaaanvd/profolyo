"use client";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import type { Template } from "@/types/template";
import { getHeadingFont, getBodyFont } from "@/lib/fonts";

import AtelierTemplate  from "./renders/AtelierTemplate";
import ConsoleTemplate  from "./renders/ConsoleTemplate";
import CoverTemplate    from "./renders/CoverTemplate";
import HalcyonTemplate  from "./renders/HalcyonTemplate";
import IndexTemplate    from "./renders/IndexTemplate";
import LedgerTemplate   from "./renders/LedgerTemplate";
import MarqueeTemplate  from "./renders/MarqueeTemplate";
import PressTemplate    from "./renders/PressTemplate";
import PrismTemplate    from "./renders/PrismTemplate";
import ShowcaseTemplate from "./renders/ShowcaseTemplate";
import ShowreelTemplate from "./renders/ShowreelTemplate";
import SplitTemplate    from "./renders/SplitTemplate";
import StudioTemplate   from "./renders/StudioTemplate";
import TimelineTemplate from "./renders/TimelineTemplate";

interface PortfolioPageProps {
  portfolio: Portfolio;
  template: Template;
  accentColor: string;
  headingFont?: string;
  bodyFont?: string;
}

export default function PortfolioPage({ portfolio, template, accentColor, headingFont, bodyFont }: PortfolioPageProps) {
  const sections: SectionConfig[] = portfolio.sections ?? [];

  // Resolve font IDs to CSS stack strings
  const headingStack = headingFont ? getHeadingFont(headingFont).stack : undefined;
  const bodyStack    = bodyFont    ? getBodyFont(bodyFont).stack       : undefined;

  const props = { portfolio, accent: accentColor, sections, headingFont: headingStack, bodyFont: bodyStack };

  switch (template.id) {
    case "atelier":  return <AtelierTemplate  {...props} />;
    case "console":  return <ConsoleTemplate  {...props} />;
    case "cover":    return <CoverTemplate    {...props} />;
    case "halcyon":  return <HalcyonTemplate  {...props} />;
    case "index":    return <IndexTemplate    {...props} />;
    case "ledger":   return <LedgerTemplate   {...props} />;
    case "marquee":  return <MarqueeTemplate  {...props} />;
    case "press":    return <PressTemplate    {...props} />;
    case "prism":    return <PrismTemplate    {...props} />;
    case "showcase": return <ShowcaseTemplate {...props} />;
    case "showreel": return <ShowreelTemplate {...props} />;
    case "split":    return <SplitTemplate    {...props} />;
    case "studio":   return <StudioTemplate   {...props} />;
    case "timeline": return <TimelineTemplate {...props} />;
    default:         return <AtelierTemplate  {...props} />;
  }
}
