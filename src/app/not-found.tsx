import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteData } from "@/data/site";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <div className="eyebrow-label mb-4">
          Error 404 • Page Not Found
        </div>
        <h1 className="hero-h1 text-primaryText mb-4">
          Lost in Space.
        </h1>
        <p className="body-large mx-auto mb-8">
          The coordinates you navigated to do not exist or have been relocated across the portfolio.
        </p>
        <MagneticButton strength={0.3} as="a" href="/">
          <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-bg font-heading font-semibold text-sm hover:bg-accent-hover transition-colors shadow-card">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to {siteData.profile.name}&apos;s Portfolio</span>
          </span>
        </MagneticButton>
      </main>
      <Footer />
    </>
  );
}
