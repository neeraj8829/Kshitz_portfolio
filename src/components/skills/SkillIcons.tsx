"use client";

import React from "react";

export function SkillIcon({
  name,
  className = "w-7 h-7",
}: {
  name: string;
  className?: string;
}) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (normalized) {
    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" stroke="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
          <g strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case "nextjs":
      return (
        <svg viewBox="0 0 180 180" className={className} fill="currentColor">
          <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
            <circle cx="90" cy="90" fill="black" r="90" />
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" fill="currentColor" r="90" opacity="0.12" />
            <path d="M149.508 157.086L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 159.998 149.508 157.086Z" fill="currentColor" />
            <rect fill="currentColor" height="72" width="12" x="115" y="54" />
          </g>
        </svg>
      );

    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7 8h6m-3 0v8" />
          <path d="M17.5 10.5c-.8-.5-1.7-.5-2.2 0-.8.7-.2 1.8.8 2.2 1.1.5 1.5 1.4.9 2.3-.6.9-1.8.9-2.5.4" />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 8v6a2 2 0 0 1-2 2H6" />
          <path d="M17.5 10.5c-.8-.5-1.7-.5-2.2 0-.8.7-.2 1.8.8 2.2 1.1.5 1.5 1.4.9 2.3-.6.9-1.8.9-2.5.4" />
        </svg>
      );

    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 22V12" />
          <path d="M21 7l-9 5-9-5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );

    case "tailwind":
    case "tailwindcss":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      );

    case "htmlcss":
    case "html":
    case "css":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
          <path d="M14 4l-4 16" />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15.5" cy="8.5" r="3.5" />
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        </svg>
      );

    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C7 8 7 14 12 22c5-8 5-14 0-20z" />
          <path d="M12 2v20" />
        </svg>
      );

    case "postgresql":
    case "postgres":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="7" rx="8" ry="3" />
          <path d="M4 7v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );

    case "git":
    case "github":
    case "gitgithub":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M9 6h4a5 5 0 0 1 5 5v4" />
        </svg>
      );

    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14h16c.8 0 1.5-.7 1.5-1.5A7.5 7.5 0 0 0 7.5 7h-.7A7.5 7.5 0 0 0 2 13.5c0 .8.7 1.5 2 1.5z" />
          <rect x="5" y="10" width="3" height="3" />
          <rect x="9" y="10" width="3" height="3" />
          <rect x="13" y="10" width="3" height="3" />
          <rect x="9" y="6" width="3" height="3" />
          <rect x="13" y="6" width="3" height="3" />
        </svg>
      );

    case "gsap":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );

    case "framermotion":
    case "framer":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );

    case "graphql":
    case "restgraphql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="2" y1="7" x2="9" y2="10.5" />
          <line x1="15" y1="13.5" x2="22" y2="17" />
          <line x1="2" y1="17" x2="9" y2="13.5" />
          <line x1="15" y1="10.5" x2="22" y2="7" />
        </svg>
      );

    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 1L24 22H0L12 1z" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 8 8 12 12 16 16 12 12 8" />
        </svg>
      );
  }
}

