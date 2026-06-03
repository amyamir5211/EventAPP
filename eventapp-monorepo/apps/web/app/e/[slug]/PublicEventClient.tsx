"use client";
import { useState, useEffect } from "react";
import { getSubEventTheme, type EventTheme } from "@/lib/theme";
import { formatDate, formatTime, getWhatsAppShareUrl, getEventUrl } from "@/lib/utils";
import { CulturalCanvasFrame, CulturalCanvasHeader, CulturalArch, CulturalDivider } from "@/components/CulturalDecorator";
import culturalQuotes from "@/lib/culturalQuotes.json";
import themeConfig from "@/lib/themeConfig.json";

interface SubEvent {
  id: string;
  name: string;
  subType: string | null;
  date: string;
  venue: string | null;
  address: string | null;
  dressCode: string | null;
  description: string | null;
}

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  eventCategory: string;
  culturalTheme: string | null;
  host: { name: string | null };
  subEvents: SubEvent[];
  hostName?: string | null;
  welcomeMessage?: string | null;
}

interface Guest {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  rsvpToken: string;
  rsvpStatus: string;
}

interface Props {
  event: Event;
  theme: EventTheme;
  guest?: Guest | null;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function SubEventCard({ se, isActive, onClick }: { se: SubEvent; isActive: boolean; onClick: () => void }) {
  const t = getSubEventTheme(se.subType);
  return (
    <button
      onClick={onClick}
      style={{
        padding: "1rem 1.25rem", borderRadius: "0.875rem", border: "2px solid",
        borderColor: isActive ? t.primaryColor : `${t.primaryColor}33`,
        background: isActive ? `${t.primaryColor}18` : `${t.primaryColor}08`,
        cursor: "pointer", textAlign: "left", transition: "all 0.3s ease", width: "100%",
        boxShadow: isActive ? `0 0 20px ${t.glowColor}` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.5rem" }}>{t.motifs[0]}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: t.primaryColor }}>{se.name}</div>
          <div style={{ fontSize: "0.78rem", color: "var(--theme-muted, rgba(245,240,235,0.6))", marginTop: "0.1rem" }}>
            {formatDate(se.date)}
          </div>
        </div>
      </div>
    </button>
  );
}

function ShagunModal({ event, theme, onClose }: { event: Event; theme: EventTheme; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", amount: "1100", message: "" });
  const [step, setStep] = useState<"form" | "pay" | "done">("form");

  const PRESET_AMOUNTS = ["501", "1100", "2100", "5100", "11000"];

  function simulatePayment() {
    setStep("pay");
    setTimeout(() => setStep("done"), 2000);
  }

  return (
    <div style={{
      background: "rgba(44, 24, 16, 0.4)", backdropFilter: "blur(14px)",
      position: "fixed", inset: 0, zIndex: 300, display: "flex",
      alignItems: "center", justifyContent: "center", padding: "1rem",
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: theme.cardBg, backdropFilter: "blur(20px)",
        border: `2px solid var(--theme-border, ${theme.borderColor})`,
        borderRadius: "1.5rem", padding: "2rem", width: "100%", maxWidth: "420px",
        boxShadow: `0 0 60px ${theme.glowColor}`,
        color: "var(--theme-text)"
      }}>
        {step === "form" && (
          <>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🧧</div>
              <h3 className="font-playfair" style={{ fontSize: "1.4rem", color: theme.textColor, fontWeight: 700 }}>
                Send Shagun
              </h3>
              <p style={{ color: theme.mutedColor, fontSize: "0.85rem", marginTop: "0.25rem", fontWeight: 500 }}>
                Bless the family with your gift
              </p>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: theme.mutedColor, marginBottom: "0.35rem", fontWeight: 600 }}>Your Name</label>
              <input className="input-field" placeholder="Your name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ background: "#ffffff", border: "1.5px solid var(--theme-border)", padding: "0.6rem", borderRadius: "0.5rem" }} />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: theme.mutedColor, marginBottom: "0.5rem", fontWeight: 600 }}>Amount (₹)</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {PRESET_AMOUNTS.map((a) => (
                  <button key={a} onClick={() => setForm({ ...form, amount: a })} style={{
                    padding: "0.4rem 0.85rem", borderRadius: "9999px", fontSize: "0.82rem", fontWeight: 700,
                    border: "1.5px solid", cursor: "pointer", transition: "all 0.2s",
                    borderColor: form.amount === a ? theme.primaryColor : `${theme.primaryColor}44`,
                    background: form.amount === a ? `${theme.primaryColor}22` : "#ffffff",
                    color: form.amount === a ? theme.primaryColor : theme.mutedColor,
                  }}>₹{parseInt(a).toLocaleString("en-IN")}</button>
                ))}
              </div>
              <input className="input-field" type="number" placeholder="Custom amount"
                value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
                style={{ background: "#ffffff", border: "1.5px solid var(--theme-border)", padding: "0.6rem", borderRadius: "0.5rem" }} />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: theme.mutedColor, marginBottom: "0.35rem", fontWeight: 600 }}>Blessing Message</label>
              <textarea className="input-field" rows={2} placeholder="With best wishes..." value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ resize: "none", background: "#ffffff", border: "1.5px solid var(--theme-border)", padding: "0.6rem", borderRadius: "0.5rem" }} />
            </div>
            <button onClick={simulatePayment} disabled={!form.name || !form.amount}
              style={{
                width: "100%", padding: "0.875rem", borderRadius: "9999px", border: "none",
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: "pointer",
                boxShadow: `0 4px 20px ${theme.glowColor}`,
              }}>
              💳 Pay ₹{parseInt(form.amount || "0").toLocaleString("en-IN")} via UPI
            </button>
            <button onClick={onClose} style={{ width: "100%", marginTop: "0.75rem", padding: "0.6rem", background: "transparent", border: "none", color: theme.mutedColor, cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              Cancel
            </button>
          </>
        )}
        {step === "pay" && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", animation: "spin 1s linear infinite" }}>⟳</div>
            <p style={{ color: theme.textColor, fontWeight: 600 }}>Processing payment...</p>
          </div>
        )}
        {step === "done" && (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧧✨</div>
            <h3 className="font-playfair" style={{ color: theme.primaryColor, fontSize: "1.4rem", marginBottom: "0.5rem", fontWeight: 700 }}>Shagun Sent!</h3>
            <p style={{ color: theme.mutedColor, fontSize: "0.9rem", marginBottom: "1.5rem", fontWeight: 500 }}>
              ₹{parseInt(form.amount).toLocaleString("en-IN")} · Your blessings have been received 🙏
            </p>
            <button onClick={onClose} style={{
              padding: "0.75rem 2rem", borderRadius: "9999px",
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              border: "none", color: "#fff", fontWeight: 700, cursor: "pointer",
            }}>Done 🎉</button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PublicEventClient({ event, theme, guest }: Props) {
  const [activeSubEvent, setActiveSubEvent] = useState(0);
  const [showShagun, setShowShagun] = useState(false);
  const se = event.subEvents[activeSubEvent];
  const seTheme = se ? getSubEventTheme(se.subType) : theme;
  const [eventUrl, setEventUrl] = useState(() => getEventUrl(event.slug));
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties; motif: string }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEventUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const list = [];
    const motifs = seTheme.motifs && seTheme.motifs.length > 0 ? seTheme.motifs : ["✨", "🌸", "✨"];
    for (let i = 0; i < 28; i++) {
      const left = Math.random() * 92 + 4;
      const delay = Math.random() * 8;
      const duration = Math.random() * 7 + 8; // 8s to 15s
      const size = Math.random() * 0.9 + 0.7; // 0.7rem to 1.6rem
      const motif = motifs[i % motifs.length] || "✨";
      list.push({
        id: i,
        motif,
        style: {
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          fontSize: `${size}rem`,
        }
      });
    }
    setParticles(list);
  }, [seTheme.key]);

  useEffect(() => {
    if (guest?.rsvpToken) {
      fetch("/api/guests/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rsvpToken: guest.rsvpToken }),
      }).catch(() => {});
    }
  }, [guest?.rsvpToken]);

  const waMessage = `🎉 You're invited to *${event.title}*!\n\nView the full invitation & RSVP:\n${eventUrl}`;

  // Get dynamic couple names
  const getCoupleNames = () => {
    if (event.hostName) return event.hostName;
    const cleaned = event.title
      .replace(/(wedding|marriage|celebration|ceremony|gala|party)/gi, "")
      .trim();
    return cleaned || "Celebrate With Us";
  };

  // Get cultural scripture block
  const culturalTheme = event.culturalTheme || "wedding";
  const getQuotesConfig = () => {
    const key = culturalTheme.toLowerCase();
    if (key === "muslim") return culturalQuotes.muslim;
    if (key === "christian") return culturalQuotes.christian;
    if (key === "punjabi" || key === "sikh") return culturalQuotes.sikh;
    if (key === "buddhist") return culturalQuotes.buddhist;
    return culturalQuotes.hindu;
  };
  const currentQuote = getQuotesConfig();

  // Witty ceremony line
  const wittyLine = (currentQuote.wittyOneLiners as Record<string, string>)[se?.subType?.toLowerCase() || "wedding"];

  return (
    <div
      data-theme={seTheme.key}
      className="font-poppins select-none"
      style={{
        minHeight: "100vh",
        color: seTheme.textColor,
        background: `linear-gradient(160deg, ${seTheme.bgFrom} 0%, ${seTheme.bgTo} 100%)`,
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── CANVAS FRAMES & BACKGROUND LATTICES ── */}
      <CulturalCanvasFrame themeKey={culturalTheme} />
      <CulturalCanvasHeader themeKey={culturalTheme} />

      {/* ── ANIMATED FALLING PARTICLES (PETALS / SPARKLES) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute text-current opacity-30 select-none pointer-events-none animate-float-slow"
            style={{
              top: "-2.5rem",
              animation: "petal-drift-fall 11s linear infinite",
              color: seTheme.primaryColor,
              ...p.style,
            }}
          >
            {p.motif}
          </span>
        ))}
      </div>

      {/* Main Container */}
      <div
        className="event-page-container pb-[3.5rem]"
        style={{
          position: "relative",
          maxWidth: themeConfig.layout.containerMaxWidth,
          margin: `0 auto ${themeConfig.layout.containerMarginBottom}`,
          zIndex: 20,
          "--container-width-mobile": themeConfig.layout.containerWidthMobile,
          "--container-width-desktop": themeConfig.layout.containerWidthDesktop,
          "--container-padding-top-mobile": themeConfig.layout.paddingTopMobile,
          "--container-padding-top-desktop": themeConfig.layout.paddingTopDesktop,
        } as React.CSSProperties}
      >

        {/* ── CULTURAL ARCH ORNAMENT WITH NESTED SCRIPTURE ── */}
        <div className="stretched-arch-wrapper">
          <CulturalArch themeKey={culturalTheme}>
            {currentQuote.shloka && (
              <p className="text-center font-amiri gold-text-glow leading-relaxed mb-1 md:mb-2 transition-all duration-500" style={{
                fontSize: "clamp(1.35rem, 4vw, 2.25rem)",
                fontWeight: "normal",
                filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
              }}>
                {currentQuote.shloka}
              </p>
            )}
            <p className="font-playfair text-center italic leading-relaxed mb-1 md:mb-2.5 transition-all duration-500" style={{
              fontSize: "clamp(0.82rem, 2.5vw, 1.15rem)",
              color: seTheme.textColor,
              opacity: 0.95,
              textShadow: seTheme.key === "wedding" 
                ? "0 2px 4px rgba(0,0,0,0.15)" 
                : "0 2px 6px rgba(0,0,0,0.4)"
            }}>
              &ldquo;{currentQuote.verse}&rdquo;
            </p>
            <span className="font-poppins block text-center font-bold tracking-widest uppercase transition-all duration-500" style={{
              fontSize: "clamp(0.65rem, 2vw, 0.78rem)",
              color: seTheme.key === "wedding" ? "#C0392B" : "#d4a017",
              textShadow: seTheme.key === "wedding" 
                ? "0 1px 2px rgba(0,0,0,0.1)" 
                : "0 1px 3px rgba(0,0,0,0.35)"
            }}>
              — {currentQuote.citation}
            </span>

            {/* ── SHIMMERING GOLD CARD FOLDER ── */}
            <div 
              className="shimmering-gold-border animate-fade-in-up" 
              style={{ 
                marginTop: "2.5rem", 
                position: "relative", 
                zIndex: 25, 
                animationDelay: themeConfig.animation.cardFadeInDelay, 
                animationFillMode: "both", 
                width: "100%", 
                maxWidth: "800px",
              }}
            >
              <div className="premium-3d-glass-card">
                
                {/* ── Symmetrical Gold Corner Filigrees ── */}
                <div style={{ position: "absolute", top: "16px", left: "16px", width: "42px", height: "42px", pointerEvents: "none", opacity: 0.75 }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 0 60 L 0 15 A 15 15 0 0 1 15 0 L 60 0" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
                    <circle cx="15" cy="15" r="4.5" fill="#d4a017" />
                  </svg>
                </div>
                <div style={{ position: "absolute", top: "16px", right: "16px", width: "42px", height: "42px", pointerEvents: "none", opacity: 0.75, transform: "scaleX(-1)" }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 0 60 L 0 15 A 15 15 0 0 1 15 0 L 60 0" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
                    <circle cx="15" cy="15" r="4.5" fill="#d4a017" />
                  </svg>
                </div>
                <div style={{ position: "absolute", bottom: "16px", left: "16px", width: "42px", height: "42px", pointerEvents: "none", opacity: 0.75, transform: "scaleY(-1)" }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 0 60 L 0 15 A 15 15 0 0 1 15 0 L 60 0" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
                    <circle cx="15" cy="15" r="4.5" fill="#d4a017" />
                  </svg>
                </div>
                <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "42px", height: "42px", pointerEvents: "none", opacity: 0.75, transform: "scale(-1, -1)" }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 0 60 L 0 15 A 15 15 0 0 1 15 0 L 60 0" stroke="var(--theme-secondary, #c2185b)" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
                    <circle cx="15" cy="15" r="4.5" fill="#d4a017" />
                  </svg>
                </div>

                {/* ── Subtle Geometric Background Watermark Lattice ── */}
                <div className="gold-filigree-pattern">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="card-lattice-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M40 0 L52 28 L80 40 L52 52 L40 80 L28 52 L0 40 L28 28 Z" fill="none" stroke="#d4a017" strokeWidth="0.8" opacity="0.6" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#card-lattice-pattern)" />
                  </svg>
                </div>

                {/* Couple names in flowing script */}
                <div className="font-playfair" style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "3.5rem",
                  color: "#C0392B",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1), 0 0 10px rgba(192,57,43,0.15)",
                  position: "relative",
                  zIndex: 5,
                }}>
                  {getCoupleNames()}
                </div>

                {/* Event Title */}
                <h1 className="font-playfair" style={{
                  fontSize: "clamp(1.8rem, 6vw, 2.8rem)", 
                  fontWeight: 700, 
                  lineHeight: 1.25,
                  marginBottom: "1.25rem", 
                  color: "#2C1810", 
                  textAlign: "center",
                  textShadow: "0 2px 3px rgba(0,0,0,0.06)",
                  position: "relative",
                  zIndex: 5,
                }}>
                  {event.title}
                </h1>

                {/* Host Name details */}
                <p className="font-poppins" style={{
                  color: "#8A6D4B", 
                  fontSize: "0.92rem",
                  textAlign: "center", 
                  marginBottom: "1.75rem", 
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  position: "relative",
                  zIndex: 5,
                }}>
                  Hosted by {event.hostName ?? event.host.name ?? "The Family"}
                </p>

                {/* Optional welcome message */}
                {event.welcomeMessage && (
                  <p className="font-poppins" style={{
                    color: "#2C1810", opacity: 0.9, maxWidth: "600px",
                    margin: "0 auto 1.5rem", lineHeight: 1.75, fontSize: "0.98rem",
                    fontStyle: "italic", textAlign: "center",
                    position: "relative",
                    zIndex: 5,
                  }}>
                    {renderMarkdown(event.welcomeMessage)}
                  </p>
                )}

                {/* Optional description */}
                {event.description && (
                  <p className="font-poppins" style={{
                    color: "#2C1810", opacity: 0.85, maxWidth: "600px",
                    margin: "0 auto 1.5rem", lineHeight: 1.6, fontSize: "0.92rem",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 5,
                  }}>
                    {event.description}
                  </p>
                )}

                {/* Guest Welcome & Personalized RSVP Panel */}
                {guest && (
                  <div style={{
                    marginTop: "2rem",
                    background: "rgba(255, 255, 255, 0.45)",
                    border: "2px solid rgba(212, 160, 23, 0.25)",
                    borderRadius: "1.25rem",
                    padding: "1.75rem 2rem",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(212, 160, 23, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                    animation: "fadeInUp 0.8s ease-out",
                    position: "relative",
                    zIndex: 5,
                    backdropFilter: "blur(12px)",
                  }}>
                    <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>🌸✨</div>
                    <h3 className="font-playfair" style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#C0392B",
                      marginBottom: "0.5rem"
                    }}>
                      Special Invitation for {guest.name}
                    </h3>
                    <p className="font-poppins" style={{
                      color: "#2C1810",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      opacity: 0.95,
                      marginBottom: "1.5rem"
                    }}>
                      We invite you to share our joy and bless us with your presence. Your support is our greatest gift. Please confirm your attendance below!
                    </p>
                    <a href={`/rsvp/${guest.rsvpToken}`} className="tactile-btn" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.8rem 2.2rem",
                      borderRadius: "9999px",
                      background: "linear-gradient(135deg, #d4a017, #C0392B)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      boxShadow: "0 6px 20px rgba(212, 160, 23, 0.3)",
                    }}>
                      👉 Tap to RSVP for Ceremonies
                    </a>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "1rem", marginTop: "2.2rem", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 5 }}>
                  <a href={getWhatsAppShareUrl(waMessage)} target="_blank" rel="noreferrer" className="tactile-btn" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.85rem 1.75rem", borderRadius: "9999px",
                    background: "linear-gradient(135deg, #25d366, #128c7e)",
                    color: "#fff", fontWeight: 700, fontSize: "0.92rem", textDecoration: "none",
                    boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
                  }}>
                    📲 Share on WhatsApp
                  </a>
                  <button onClick={() => setShowShagun(true)} className="tactile-btn" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.85rem 1.75rem", borderRadius: "9999px",
                    background: "linear-gradient(135deg, #d4a017, #C0392B)",
                    color: "#fff", fontWeight: 700, fontSize: "0.92rem", border: "none", cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(212, 160, 23, 0.3)",
                  }}>
                    🧧 Send Shagun
                  </button>
                </div>

                {/* ── TIMELINE CEREMONIES SECTION ── */}
                {event.subEvents.length > 0 && (
                  <div style={{ marginTop: "3rem", position: "relative", zIndex: 5 }}>
                    <CulturalDivider themeKey={culturalTheme} />

                    <h2 className="font-playfair" style={{
                      fontSize: "1.75rem",
                      color: "#b45309",
                      marginBottom: "1.5rem",
                      textAlign: "center",
                      fontWeight: 700,
                      textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}>
                      Celebration Schedule
                    </h2>

                    {/* Sub-event selector */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
                      gap: "0.75rem", marginBottom: "2rem",
                    }}>
                      {event.subEvents.map((s, i) => (
                        <div key={s.id} className="tactile-btn" style={{ width: "100%" }}>
                          <SubEventCard se={s} isActive={i === activeSubEvent} onClick={() => setActiveSubEvent(i)} />
                        </div>
                      ))}
                    </div>

                    {/* Active sub-event detail card */}
                    {se && (
                      <div className="premium-3d-glass-card" style={{
                        padding: "2rem",
                        boxShadow: "0 10px 36px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                        border: "1.5px solid rgba(212, 160, 23, 0.22)",
                        transition: "all 0.5s ease",
                      }}>
                        
                        {/* Elegant Corner Filigrees inside sub-event card */}
                        <div style={{ position: "absolute", top: "12px", left: "12px", width: "24px", height: "24px", pointerEvents: "none", opacity: 0.5 }}>
                          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="10" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div style={{ position: "absolute", top: "12px", right: "12px", width: "24px", height: "24px", pointerEvents: "none", opacity: 0.5, transform: "scaleX(-1)" }}>
                          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0 100 L 0 10 A 10 10 0 0 1 10 0 L 100 0" stroke="#d4a017" strokeWidth="10" strokeLinecap="round" />
                          </svg>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                          <div>
                            <div style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>{seTheme.motifs[0]}</div>
                            <h3 className="font-playfair" style={{ fontSize: "1.6rem", color: "#C0392B", fontWeight: 700 }}>
                              {se.name}
                            </h3>
                            {se.dressCode && (
                              <span className="ornament-accent" style={{ marginTop: "0.35rem", display: "inline-block" }}>
                                👗 Dress Code: {se.dressCode}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Witty Ceremony one-liner callout */}
                        {wittyLine && (
                          <p className="font-playfair" style={{
                            fontStyle: "italic",
                            fontSize: "1.2rem",
                            color: "#b45309",
                            textAlign: "center",
                            margin: "1.75rem 0 1.5rem",
                            fontWeight: 700,
                            textShadow: "0 1px 1px rgba(255, 255, 255, 0.5)"
                          }}>
                            &ldquo;{wittyLine}&rdquo;
                          </p>
                        )}

                        {/* Glowing ticket boxes for Date & Venue */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                          gap: "1.25rem",
                          marginTop: "1.5rem",
                        }}>
                          <div className="glass-ticket">
                            <div className="font-poppins" style={{ fontSize: "0.78rem", color: "#8A6D4B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>📅 Date & Time</div>
                            <div className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 700, color: "#C0392B", marginTop: "0.35rem" }}>{formatDate(se.date)}</div>
                            <div className="font-poppins" style={{ fontSize: "0.88rem", color: "#2C1810", marginTop: "0.15rem", opacity: 0.9, fontWeight: 500 }}>{formatTime(se.date)}</div>
                          </div>

                          <div className="glass-ticket">
                            <div className="font-poppins" style={{ fontSize: "0.78rem", color: "#8A6D4B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>📍 Venue Details</div>
                            <div className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 700, color: "#C0392B", marginTop: "0.35rem" }}>{se.venue}</div>
                            {se.address && <div className="font-poppins" style={{ fontSize: "0.85rem", color: "#2C1810", marginTop: "0.15rem", opacity: 0.9, fontWeight: 500 }}>{se.address}</div>}
                          </div>
                        </div>

                        {/* Ceremony details description */}
                        {se.description && (
                          <p className="font-poppins" style={{ color: "#2C1810", opacity: 0.92, fontSize: "0.95rem", marginTop: "1.75rem", lineHeight: 1.75, textAlign: "center" }}>
                            {se.description}
                          </p>
                        )}

                        {/* Ceremony action links */}
                        <div style={{ marginTop: "1.75rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                          <a href={guest ? `/rsvp/${guest.rsvpToken}` : `/rsvp/demo-token`} className="festive-btn-primary tactile-btn" style={{
                            padding: "0.7rem 2rem", fontSize: "0.9rem",
                          }}>
                            ✅ RSVP Now
                          </a>
                          {se.venue && (
                            <a href={`https://maps.google.com?q=${encodeURIComponent(se.venue)}`}
                              target="_blank" rel="noreferrer"
                              className="festive-btn-ghost tactile-btn"
                              style={{
                                padding: "0.7rem 2rem", fontSize: "0.9rem",
                              }}>
                                🗺️ Get Directions
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </CulturalArch>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", padding: "2.5rem", marginTop: "2rem" }}>
          <p style={{ color: seTheme.mutedColor, fontSize: "0.85rem", fontWeight: 500 }}>
            Powered by <span style={{ color: "var(--theme-primary, #F0A500)", fontWeight: 700 }}>Utsav ✨</span> · India&apos;s digital celebration platform
          </p>
        </div>

      </div>

      {showShagun && <ShagunModal event={event} theme={seTheme} onClose={() => setShowShagun(false)} />}

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </div>
  );
}
