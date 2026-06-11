import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Thesis from "@/components/landing/Thesis";
import ValueProps from "@/components/landing/ValueProps";
import EditorDemo from "@/components/landing/EditorDemo";
import TemplateRail from "@/components/landing/TemplateRail";
import ProofStrip from "@/components/landing/ProofStrip";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function RootPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Thesis />
        <ValueProps />
        <EditorDemo />
        <TemplateRail />
        <ProofStrip />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
