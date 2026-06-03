"use client";
import React from "react";

interface DecoratorProps {
  themeKey: string;
  children?: React.ReactNode;
}

/**
 * 1. CULTURAL BACKGROUND PATTERNS
 * Repeating SVG vector grids positioned in the background of pages.
 */
export function CulturalBackground({ themeKey }: DecoratorProps) {
  let patternPath = "";
  let patternSize = 60;
  const normalizedKey = themeKey?.toLowerCase() || "wedding";

  switch (normalizedKey) {
    case "muslim":
      // Islamic geometric star lattice (Girih pattern)
      patternSize = 80;
      patternPath = "M40 0 L52 28 L80 40 L52 52 L40 80 L28 52 L0 40 L28 28 Z M0 0 L80 80 M80 0 L0 80 M40 0 V80 M0 40 H80";
      break;

    case "punjabi":
    case "sikh":
      // Sikh/Punjabi diagonal mesh
      patternSize = 50;
      patternPath = "M 0 0 L 50 50 M 50 0 L 0 50 M 25 0 L 25 50 M 0 25 H 50";
      break;

    case "christian":
      // Delicate French lace damask scrolls
      patternSize = 60;
      patternPath = "M30 5 C35 15 45 20 45 30 C45 40 35 45 30 55 C25 45 15 40 15 30 C15 20 25 15 30 5 Z M30 15 A15 15 0 0 0 15 30 A15 15 0 0 0 30 45 A15 15 0 0 0 45 30 A15 15 0 0 0 30 15 Z";
      break;

    case "buddhist":
      // Minimalist zen circle & waves pattern
      patternSize = 70;
      patternPath = "M 35 35 A 20 20 0 1 0 35 35.1 M 0 35 Q 17.5 10 35 35 T 70 35";
      break;

    case "tamil":
    case "bengali":
    case "hindu":
    case "wedding":
    default:
      // Hindu / Classic Indian floral mandala grid
      patternSize = 80;
      patternPath = "M40 10 C45 18 55 28 55 38 C55 48 45 53 40 53 C35 53 25 48 25 38 C25 28 35 18 40 10 Z Q52 5 58 18 Q58 28 40 38 M40 0 A40 40 0 1 1 0 40 A40 40 0 1 1 40 0 Z";
      break;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.08,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cultural-grid-pattern"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Intricate Gold Lattice Path */}
            <path
              d={patternPath}
              fill="none"
              stroke="#d4a017"
              strokeWidth="0.85"
              opacity="0.8"
            />
            {/* Intricate Green Lattice Path */}
            <path
              d={patternPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="0.5"
              opacity="0.55"
              transform="translate(1.5, 1.5)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cultural-grid-pattern)" />
      </svg>
    </div>
  );
}

/**
 * 2. CULTURAL DECORATIVE ARCHES (HEADERS)
 * Stunning ornamental framing components loaded above the Hero titles.
 */
export function CulturalArch({ themeKey, children }: DecoratorProps) {
  const normalizedKey = themeKey?.toLowerCase() || "wedding";

  switch (normalizedKey) {
    case "muslim":
      // Mihrab Dome Arch with hanging glass lantern
      return (
        <div className="w-full mx-auto relative pointer-events-none opacity-95 transition-all duration-500">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "contain", display: "block", pointerEvents: "none", zIndex: 0 }}>
            <path d="M2 400 V110 C2 50 300 25 400 5 C500 25 798 50 798 110 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="2.5" />
            <path d="M22 400 V115 C22 60 305 35 400 18 C495 35 778 60 778 115 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.2" strokeDasharray="5 5" />
            <path d="M2 110 Q100 95 126 55 Q152 95 250 110" stroke="var(--theme-secondary, #c2185b)" strokeWidth="1.5" />
            <path d="M798 110 Q700 95 674 55 Q648 95 550 110" stroke="var(--theme-secondary, #c2185b)" strokeWidth="1.5" />
            {/* Hanging Lantern */}
            <g transform="translate(400, 0)">
              <line x1="0" y1="0" x2="0" y2="70" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.5" />
              <path d="M-12 70 L0 55 L12 70 Z" fill="var(--theme-primary, #c8841a)" />
              <path d="M-15 70 L-10 95 H10 L15 70 Z" fill="rgba(200, 132, 26, 0.15)" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.5" />
              <line x1="-5" y1="70" x2="-5" y2="95" stroke="var(--theme-primary, #c8841a)" strokeWidth="0.8" />
              <line x1="5" y1="70" x2="5" y2="95" stroke="var(--theme-primary, #c8841a)" strokeWidth="0.8" />
              <path d="M-10 95 L-12 100 H12 L10 95 Z" fill="var(--theme-primary, #c8841a)" />
              <line x1="0" y1="100" x2="0" y2="115" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.5" />
              <circle cx="0" cy="115" r="2.5" fill="var(--theme-primary, #c8841a)" />
              <circle cx="0" cy="82" r="8" fill="var(--theme-primary, #c8841a)" opacity="0.65" style={{ filter: "blur(2.5px)" }} />
            </g>
            {/* Floating crescent moon and stars */}
            <path d="M150 80 L153 85 L159 86 L154 90 L156 96 L150 92 L144 96 L146 90 L141 86 L147 85 Z" fill="var(--theme-primary, #c8841a)" opacity="0.7" />
            <path d="M650 80 L653 85 L659 86 L654 90 L656 96 L650 92 L644 96 L646 90 L641 86 L647 85 Z" fill="var(--theme-primary, #c8841a)" opacity="0.7" />
          </svg>
          {children && (
            <div style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              paddingTop: "18%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              pointerEvents: "auto",
            }}>
              {children}
            </div>
          )}
        </div>
      );

    case "punjabi":
    case "sikh":
      // Sikh Golden Arch with Khanda medallions & hanging marigold garlands
      return (
        <div className="w-full mx-auto relative pointer-events-none opacity-95 transition-all duration-500">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "contain", display: "block", pointerEvents: "none", zIndex: 0 }}>
            {/* Golden Dome Arch */}
            <path d="M2 400 V130 C2 90 200 40 400 40 C600 40 798 90 798 130 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="3" />
            <path d="M22 400 V135 C22 100 210 55 400 55 C590 55 778 100 778 135 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.5" strokeDasharray="5 5" />
            {/* Khanda Medallion at Center */}
            <g transform="translate(400, 40) scale(0.7)">
              <circle cx="0" cy="0" r="25" fill="rgba(200, 132, 26, 0.15)" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" />
              <circle cx="0" cy="0" r="10" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" fill="none" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="var(--theme-primary, #c8841a)" strokeWidth="3" />
              <path d="M-14 -5 C-18 5 -10 14 0 14 C10 14 18 5 14 -5" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" fill="none" />
            </g>
            {/* Hanging Marigold Garlands */}
            <g fill="var(--theme-primary, #c8841a)">
              {[120, 220, 320, 480, 580, 680].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, 75)`}>
                  <line x1="0" y1="0" x2="0" y2="40" stroke="var(--theme-primary, #c8841a)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="0" cy="15" r="6" fill="#f59e0b" />
                  <circle cx="0" cy="30" r="6" fill="#ea580c" />
                  <path d="M-3 36 L0 44 L3 36 Z" fill="#15803d" />
                </g>
              ))}
            </g>
          </svg>
          {children && (
            <div style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              paddingTop: "22%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              pointerEvents: "auto",
            }}>
              {children}
            </div>
          )}
        </div>
      );

    case "christian":
      // Delicate French lace cathedral arch with intertwined rings & botanical eucalyptus leaves
      return (
        <div className="w-full mx-auto relative pointer-events-none opacity-90 transition-all duration-500">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "contain", display: "block", pointerEvents: "none", zIndex: 0 }}>
            {/* Pointed Gothic Arch */}
            <path d="M2 400 V120 Q2 50 400 25 Q798 50 798 120 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="2.2" />
            <path d="M22 400 V125 Q22 60 400 38 Q778 60 778 125 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="0.8" strokeDasharray="6 3" />
            {/* Cross symbol at the peak */}
            <g transform="translate(400, 25) scale(0.6)">
              <line x1="0" y1="-25" x2="0" y2="15" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3.5" />
              <line x1="-15" y1="-10" x2="15" y2="-10" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3.5" />
            </g>
            {/* Intertwined Gold Rings */}
            <g transform="translate(400, 70)" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" fill="none">
              <circle cx="-7" cy="0" r="12" />
              <circle cx="7" cy="0" r="12" />
            </g>
            {/* Eucalyptus branches */}
            <g stroke="#15803d" strokeWidth="1.2" fill="none">
              {[150, 250, 550, 650].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, 100)`}>
                  <path d="M0 0 Q10 20 20 40" />
                  <circle cx="5" cy="10" r="4.5" fill="#a4bfa8" />
                  <circle cx="15" cy="25" r="4.5" fill="#b8cfbc" />
                </g>
              ))}
            </g>
          </svg>
          {children && (
            <div style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              paddingTop: "22%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              pointerEvents: "auto",
            }}>
              {children}
            </div>
          )}
        </div>
      );

    case "buddhist":
      // Zen Torii/Lotus Arch with Dharma Wheel medallion
      return (
        <div className="w-full mx-auto relative pointer-events-none opacity-95 transition-all duration-500">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "contain", display: "block", pointerEvents: "none", zIndex: 0 }}>
            {/* Minimalist circular arch */}
            <path d="M2 400 V200 A398 398 0 0 1 798 200 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" />
            <path d="M22 400 V205 A378 378 0 0 1 778 205 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="0.75" strokeDasharray="8 4" />
            {/* Dharma Wheel (Dharmachakra) */}
            <g transform="translate(400, 50) scale(0.65)" stroke="var(--theme-primary, #c8841a)" strokeWidth="2" fill="none">
              <circle cx="0" cy="0" r="22" />
              <circle cx="0" cy="0" r="6" fill="var(--theme-primary, #c8841a)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                <line key={ang} x1="0" y1="0" x2="0" y2="-22" transform={`rotate(${ang})`} strokeWidth="2" />
              ))}
            </g>
            {/* Floating lotus flower outlines */}
            <g stroke="var(--theme-secondary, #c2185b)" strokeWidth="1" fill="none">
              <path d="M150 220 C140 210, 135 195, 150 185 C165 195, 160 210, 150 220 Z" />
              <path d="M650 220 C640 210, 635 195, 650 185 C665 195, 660 210, 650 220 Z" />
            </g>
          </svg>
          {children && (
            <div style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              paddingTop: "18%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              pointerEvents: "auto",
            }}>
              {children}
            </div>
          )}
        </div>
      );

    case "tamil":
    case "bengali":
    case "hindu":
    case "wedding":
    default:
      // Temple Gopuram Arch flanked by hanging lotuses, marigolds, and diya glow silhouettes
      return (
        <div className="w-full mx-auto relative pointer-events-none opacity-95 transition-all duration-500">
          <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "auto", objectFit: "contain", display: "block", pointerEvents: "none", zIndex: 0 }}>
            <path d="M2 400 V200 A398 398 0 0 1 798 200 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="2.5" />
            <path d="M22 400 V205 A378 378 0 0 1 778 205 V400" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.2" strokeDasharray="8 4" />
            {/* Central Temple Gopuram Peak Ornament */}
            <g transform="translate(400, 35)" stroke="var(--theme-primary, #c8841a)" strokeWidth="1.8" fill="none">
              <circle cx="0" cy="0" r="18" fill="rgba(200, 132, 26, 0.1)" />
              <circle cx="0" cy="0" r="8" fill="var(--theme-primary, #c8841a)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <path
                  key={angle}
                  d="M0 -8 C-4 -15 0 -22 0 -22 C0 -22 4 -15 0 -8 Z"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
            {/* Hanging Lotuses & Diya Lights */}
            <g stroke="var(--theme-secondary, #c2185b)" strokeWidth="1">
              {[100, 220, 320, 480, 580, 700].map((x, idx) => {
                const yPos = 200 - Math.sqrt(398 * 398 - Math.pow(x - 400, 2)) * 0.65;
                const isEven = idx % 2 === 0;
                return (
                  <g key={idx} transform={`translate(${x}, ${yPos - 35})`}>
                    <line x1="0" y1="0" x2="0" y2="25" stroke="var(--theme-primary, #c8841a)" strokeWidth="1" strokeDasharray="3 3" />
                    {isEven ? (
                      // Lotus shape
                      <path d="M-6 25 C-12 30 -6 42 0 42 C6 42 12 30 6 25 C3 28 0 32 0 32 C0 32 -3 28 -6 25 Z" fill="var(--theme-secondary, #c2185b)" />
                    ) : (
                      // Diya shape
                      <g transform="translate(0, 25)">
                        <path d="M-8 4 C-8 12 8 12 8 4 Z" fill="var(--theme-primary, #c8841a)" stroke="none" />
                        <path d="M0 4 Q-3 -3 0 -8 Q3 -3 0 4 Z" fill="#ea580c" stroke="none" />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          {children && (
            <div style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              paddingTop: "20%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              pointerEvents: "auto",
            }}>
              {children}
            </div>
          )}
        </div>
      );
  }
}

/**
 * 3. CULTURAL DIVIDERS
 * Replace generic horizontal lines with theme-aligned cultural dividers.
 */
export function CulturalDivider({ themeKey }: DecoratorProps) {
  let innerOrnament = null;
  const normalizedKey = themeKey?.toLowerCase() || "wedding";

  switch (normalizedKey) {
    case "muslim":
      // Crescent and star with arabesque leaf scrolls
      innerOrnament = (
        <g stroke="var(--theme-primary, #c8841a)" strokeWidth="1.8" fill="none">
          <path d="M-6 -8 A9 9 0 1 0 6 8 A7 7 0 1 1 -6 -8 Z" fill="var(--theme-primary, #c8841a)" stroke="none" />
          <polygon points="4,-4 6,-1 9,-1 6.5,1 7.5,4 4,2 0.5,4 1.5,1 -1,-1 2,-1" fill="var(--theme-primary, #c8841a)" stroke="none" />
          <path d="M-55 -2 Q-30 -12 -15 -2" />
          <path d="M55 -2 Q30 -12 15 -2" />
          <circle cx="-56" cy="-2" r="2.5" fill="var(--theme-primary, #c8841a)" />
          <circle cx="56" cy="-2" r="2.5" fill="var(--theme-primary, #c8841a)" />
        </g>
      );
      break;

    case "punjabi":
    case "sikh":
      // Khanda symbol flanked by golden lines and marigold buds
      innerOrnament = (
        <g stroke="var(--theme-primary, #c8841a)" strokeWidth="1.8" fill="none">
          <circle cx="0" cy="0" r="7" strokeWidth="1.8" />
          <line x1="0" y1="-14" x2="0" y2="14" strokeWidth="2.5" />
          <path d="M-10 -3 C-13 4 -7 10 0 10 C7 10 13 4 10 -3" strokeWidth="1.5" />
          <path d="M-55 0 H-15" />
          <path d="M55 0 H15" />
          <circle cx="-35" cy="0" r="3" fill="#f59e0b" stroke="none" />
          <circle cx="35" cy="0" r="3" fill="#f59e0b" stroke="none" />
        </g>
      );
      break;

    case "christian":
      //Slender gold olive branch with cross and wedding rings
      innerOrnament = (
        <g stroke="var(--theme-primary, #c8841a)" strokeWidth="1.5" fill="none">
          <circle cx="-5" cy="0" r="7" strokeWidth="2" />
          <circle cx="5" cy="0" r="7" strokeWidth="2" />
          <path d="M-50 0 H-18" strokeWidth="1.8" />
          <path d="M50 0 H18" strokeWidth="1.8" />
          <path d="M-35 0 C-35 -5 -30 -5 -30 0 C-30 5 -35 5 -35 0 Z" fill="rgba(200, 132, 26, 0.15)" />
          <path d="M35 0 C38 -5 32 -5 32 0 C32 5 38 5 38 0 Z" fill="rgba(200, 132, 26, 0.15)" />
        </g>
      );
      break;

    case "buddhist":
      // Dharma Wheel (Dharmachakra) with minimalist Zen scrolls
      innerOrnament = (
        <g stroke="var(--theme-primary, #c8841a)" strokeWidth="1.8" fill="none">
          <circle cx="0" cy="0" r="10" />
          <circle cx="0" cy="0" r="3" fill="var(--theme-primary, #c8841a)" />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1="0" y1="0" x2="0" y2="-10" transform={`rotate(${a})`} />
          ))}
          <path d="M-55 0 Q-32 -8 -15 0" />
          <path d="M55 0 Q32 -8 15 0" />
        </g>
      );
      break;

    case "tamil":
    case "bengali":
    case "hindu":
    case "wedding":
    default:
      // Golden Kuthuvilakku lamp flanked by lotus scrolls
      innerOrnament = (
        <g stroke="var(--theme-primary, #c8841a)" strokeWidth="1.8" fill="none">
          <path d="M-6 10 H6 L3 7 V-2 H-3 V7 Z" fill="var(--theme-primary, #c8841a)" />
          <path d="M-10 -2 C-10 -2 -6 -7 0 -7 C6 -7 10 -2 10 -2 Z" fill="var(--theme-primary, #c8841a)" />
          <path d="M0 -7 Q-3 -12 0 -18 Q3 -12 0 -7 Z" fill="#ea580c" stroke="none" />
          <path d="M-55 0 C-40 -10 -25 10 -14 -2" />
          <path d="M55 0 C40 -10 25 10 14 -2" />
        </g>
      );
      break;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2.5rem 0",
        width: "100%",
        opacity: 0.9,
      }}
    >
      <svg
        width="160"
        height="50"
        viewBox="-80 -25 160 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {innerOrnament}
      </svg>
    </div>
  );
}

/**
 * 4. FULL CANVAS BORDER FRAME & FILIGREES
 * Surrounds the viewport with double gold/green border frames and dynamic corner caps.
 */
export function CulturalCanvasFrame({ themeKey }: DecoratorProps) {
  const normalizedKey = themeKey?.toLowerCase() || "wedding";
  
  let accentColor = "#10b981"; // Muslim Emerald Green
  let innerCornerSvg = null;

  if (normalizedKey === "hindu" || normalizedKey === "wedding" || normalizedKey === "tamil" || normalizedKey === "bengali") {
    accentColor = "#dc2626"; // Hindu Saffron/Red
    innerCornerSvg = (
      // Ornate lotus petal in corner
      <path d="M12 12 C18 6, 24 12, 24 24 C12 24, 6 18, 12 12 Z" fill={accentColor} />
    );
  } else if (normalizedKey === "punjabi" || normalizedKey === "sikh") {
    accentColor = "#ea580c"; // Sikh Orange/Marigold
    innerCornerSvg = (
      // Circular medallion / khanda ring segment
      <circle cx="20" cy="20" r="6" stroke={accentColor} strokeWidth="1.5" fill="none" />
    );
  } else if (normalizedKey === "christian") {
    accentColor = "#db2777"; // Christian Rose Pink
    innerCornerSvg = (
      // Rosebud
      <path d="M16 16 C20 12, 22 20, 20 20 C20 20, 12 22, 16 16 Z" fill={accentColor} />
    );
  } else if (normalizedKey === "buddhist") {
    accentColor = "#8b5cf6"; // Buddhist Purple
    innerCornerSvg = (
      // Zen dot
      <circle cx="20" cy="20" r="4.5" fill={accentColor} />
    );
  } else {
    // Muslim / Default
    accentColor = "#10b981"; // Emerald
    innerCornerSvg = (
      // Star/crescent
      <path d="M16 24 A4 4 0 0 1 24 16 A3 3 0 1 0 16 24 Z" fill="#d4a017" />
    );
  }

  return (
    <>
      {/* ── Background Geometric Grid ── */}
      <CulturalBackground themeKey={themeKey} />

      {/* ── Double Border Canvas Frame ── */}
      <div className="canvas-outer-border" />
      <div className="canvas-inner-border" style={{ borderColor: accentColor }} />

      {/* ── Four Corner Ornaments ── */}
      {/* Top Left */}
      <svg
        className="corner-svg-base corner-top-left"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0 H50 L0 50 Z" fill="currentColor" opacity="0.08" />
        <path d="M0 2 C15 2 25 12 25 25 C25 35 15 45 2 45" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M2 0 C2 15 12 25 25 25 C35 25 45 15 45 2" stroke="currentColor" strokeWidth="2" fill="none" />
        <g transform="translate(15, 15) scale(1.2)">
          {innerCornerSvg}
        </g>
      </svg>

      {/* Top Right */}
      <svg
        className="corner-svg-base corner-top-right"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 0) scale(-1, 1)">
          <path d="M0 0 H50 L0 50 Z" fill="currentColor" opacity="0.08" />
          <path d="M0 2 C15 2 25 12 25 25 C25 35 15 45 2 45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 0 C2 15 12 25 25 25 C35 25 45 15 45 2" stroke="currentColor" strokeWidth="2" fill="none" />
          <g transform="translate(15, 15) scale(1.2)">
            {innerCornerSvg}
          </g>
        </g>
      </svg>

      {/* Bottom Left */}
      <svg
        className="corner-svg-base corner-bottom-left"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0, 100) scale(1, -1)">
          <path d="M0 0 H50 L0 50 Z" fill="currentColor" opacity="0.08" />
          <path d="M0 2 C15 2 25 12 25 25 C25 35 15 45 2 45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 0 C2 15 12 25 25 25 C35 25 45 15 45 2" stroke="currentColor" strokeWidth="2" fill="none" />
          <g transform="translate(15, 15) scale(1.2)">
            {innerCornerSvg}
          </g>
        </g>
      </svg>

      {/* Bottom Right */}
      <svg
        className="corner-svg-base corner-bottom-right"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 100) scale(-1, -1)">
          <path d="M0 0 H50 L0 50 Z" fill="currentColor" opacity="0.08" />
          <path d="M0 2 C15 2 25 12 25 25 C25 35 15 45 2 45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 0 C2 15 12 25 25 25 C35 25 45 15 45 2" stroke="currentColor" strokeWidth="2" fill="none" />
          <g transform="translate(15, 15) scale(1.2)">
            {innerCornerSvg}
          </g>
        </g>
      </svg>
    </>
  );
}

/**
 * 5. FULL VIEWPORT BACKGROUND HEADER PATTERNS
 * A background overlay extending width: 100vw; height: 100vh;
 * Renders symmetrical concentric circular motifs and top decorative arches without cropped segments.
 */
export function CulturalCanvasHeader({ themeKey }: DecoratorProps) {
  const normalizedKey = themeKey?.toLowerCase() || "wedding";
  
  let primaryColor = "#d4a017"; // Gold
  let secondaryColor = "#10b981"; // Emerald Green

  if (normalizedKey === "hindu" || normalizedKey === "wedding" || normalizedKey === "tamil" || normalizedKey === "bengali") {
    secondaryColor = "#dc2626"; // Hindu Saffron/Red
  } else if (normalizedKey === "punjabi" || normalizedKey === "sikh") {
    secondaryColor = "#ea580c"; // Sikh Orange/Marigold
  } else if (normalizedKey === "christian") {
    secondaryColor = "#db2777"; // Christian Rose Pink
  } else if (normalizedKey === "buddhist") {
    secondaryColor = "#8b5cf6"; // Buddhist Purple
  }

  // Choose symmetrical concentric rosette / mandala based on theme
  let circularMotifSvg = null;

  if (normalizedKey === "muslim") {
    // Symmetrical Islamic 8-point star rosette centered at the top area
    circularMotifSvg = (
      <svg
        viewBox="0 0 200 200"
        className="rosette-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="1" />
        <path d="M100 10 L125 70 L180 70 L140 100 L180 130 L125 130 L100 190 L75 130 L20 130 L60 100 L20 70 L75 70 Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M100 25 L118 78 L165 78 L128 100 L165 122 L118 122 L100 175 L82 122 L35 122 L72 100 L35 78 L82 78 Z" stroke={secondaryColor} strokeWidth="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="100" y1="100" x2="100" y2="10" transform={`rotate(${angle} 100 100)`} stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        ))}
      </svg>
    );
  } else {
    // Symmetrical concentric floral mandala centered at the top area
    circularMotifSvg = (
      <svg
        viewBox="0 0 200 200"
        className="rosette-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1" />
        <path d="M100 40 C80 60 80 80 100 100 C120 80 120 60 100 40 Z" stroke="currentColor" strokeWidth="1.2" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 40 C85 60 85 80 100 100 C115 80 115 60 100 40 Z" stroke={secondaryColor} strokeWidth="0.8" />
            <circle cx="100" cy="35" r="2" fill="currentColor" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div className="canvas-header-container">
      {/* ── Top-Center Symmetrical Rosette ── */}
      <div className="rosette-wrapper">
        {circularMotifSvg}
      </div>

      {/* ── Left & Right Side Symmetrical Border Lines (Desktop Only) ── */}
      <div 
        className="side-border-left-solid" 
        style={{ borderColor: primaryColor }} 
      />
      <div 
        className="side-border-left-dashed" 
        style={{ borderColor: secondaryColor }} 
      />

      <div 
        className="side-border-right-solid" 
        style={{ borderColor: primaryColor }} 
      />
      <div 
        className="side-border-right-dashed" 
        style={{ borderColor: secondaryColor }} 
      />
    </div>
  );
}
