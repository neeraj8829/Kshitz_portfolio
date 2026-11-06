import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeSwitcherButton from "@/components/theme/ThemeSwitcherButton";
import ThemePanel from "@/components/theme/ThemePanel";
import PresentationMode from "@/components/theme/PresentationMode";
import { siteData } from "@/data/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kshitiz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteData.profile.name} — ${siteData.profile.role}`,
  description: `${siteData.profile.intro}`,
  keywords: [
    siteData.profile.name,
    "Full-Stack Developer",
    "UI Designer",
    "Creative Technologist",
    "Next.js Portfolio",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
  ],
  authors: [{ name: siteData.profile.name, url: siteUrl }],
  creator: siteData.profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteData.profile.name} — ${siteData.profile.role}`,
    description: siteData.profile.intro,
    siteName: `${siteData.profile.name} Portfolio`,
    images: [
      {
        url: siteData.profile.heroImage,
        width: 1200,
        height: 630,
        alt: `Portrait of ${siteData.profile.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.profile.name} — ${siteData.profile.role}`,
    description: siteData.profile.intro,
    images: [siteData.profile.heroImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteData.profile.name,
    url: siteUrl,
    image: siteData.profile.heroImage,
    jobTitle: siteData.profile.role,
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Independent",
    },
    sameAs: [
      siteData.profile.socials.github,
      siteData.profile.socials.linkedin,
      siteData.profile.socials.twitter,
      siteData.profile.socials.instagram,
    ],
    description: siteData.profile.intro,
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${manrope.variable} ${dmSans.variable} scroll-smooth`}
      data-theme="warm-beige"
      data-font="jakarta"
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash theme script: applies stored or URL theme before first paint */}
        <script
          id="theme-anti-flash"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var pt=p.get('theme');var pf=p.get('font');var st=localStorage.getItem('kshitiz-theme');var sf=localStorage.getItem('kshitiz-font');var t=pt||st||'warm-beige';var f=pf||sf||'jakarta';document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-font',f);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-primaryText font-body antialiased selection:bg-accent selection:text-onAccent min-h-screen relative overflow-x-hidden">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-onAccent focus:font-semibold text-xs font-body"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <ToastProvider>
            <NoiseOverlay />
            <ScrollProgress />
            <CustomCursor />
            <BackToTop />
            <ThemeSwitcherButton />
            <ThemePanel />
            <PresentationMode />
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
