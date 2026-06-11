"use client";
import { useRef, useState, useEffect } from "react";
import type { TemplateWithMeta } from "@/types/template";
import { thumbnailPortfolio } from "@/lib/mock-data";
import PortfolioPage from "@/components/templates/PortfolioPage";

interface TemplatePreviewProps {
  template: TemplateWithMeta;
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const renderWidth = template.layout.container_max_px;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.1);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setScale(w / renderWidth);
      }
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [renderWidth]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      {/* Scaled-down template render — hero + about + projects only */}
      <div
        style={{
          width: renderWidth,
          zoom: scale,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <PortfolioPage
          portfolio={thumbnailPortfolio}
          template={template}
          accentColor={template.defaults.accent_color}
        />
      </div>

      {/* Bottom fade — makes the crop look intentional */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "50%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
