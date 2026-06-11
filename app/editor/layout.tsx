import { EditorProvider } from "@/contexts/EditorContext";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorHeader from "@/components/editor/EditorHeader";
import PortfolioPreview from "@/components/editor/PortfolioPreview";

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider>
      <div className="flex h-screen overflow-hidden bg-ink-50">
        <EditorSidebar />
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Top bar */}
          <EditorHeader />

          {/* Main area + preview panel */}
          <div className="flex flex-1 overflow-hidden">
            {/* Scrollable main content */}
            <main className="flex-1 overflow-y-auto bg-white min-w-0">
              {children}
            </main>

            {/* Live preview panel — desktop only, resizable */}
            <PortfolioPreview />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
