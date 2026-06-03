"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const SUB_EVENT_THEMES: Record<string, { primary: string; bg: string; emoji: string }> = {
  mehndi:     { primary: "#5a8a00", bg: "rgba(90,138,0,0.1)",    emoji: "🌿" },
  haldi:      { primary: "#d4830a", bg: "rgba(212,131,10,0.1)",  emoji: "💛" },
  sangeet:    { primary: "#9333ea", bg: "rgba(147,51,234,0.1)",  emoji: "🎶" },
  baraat:     { primary: "#dc2626", bg: "rgba(220,38,38,0.1)",   emoji: "🐴" },
  reception:  { primary: "#c8841a", bg: "rgba(200,132,26,0.1)",  emoji: "🥂" },
  engagement: { primary: "#c2185b", bg: "rgba(194,24,91,0.1)",   emoji: "💍" },
  birthday:   { primary: "#0891b2", bg: "rgba(8,145,178,0.1)",   emoji: "🎂" },
  wedding:    { primary: "#c8841a", bg: "rgba(200,132,26,0.1)",  emoji: "👰" },
};

const THEME_DETAILS = {
  wedding: {
    tagline: "Celebrate with Joy",
    welcome: "Welcome back! 🎊",
    subWelcome: "Let's make memories that last a lifetime.",
    emoji: "💍",
    icon: "👰",
    particles: ["🌸", "🌹", "🌼", "🪔", "✨"]
  },
  birthday: {
    tagline: "Unforgettable Birthdays",
    welcome: "Another year of joy! 🎂",
    subWelcome: "Plan the ultimate birthday bash with ease.",
    emoji: "🎉",
    icon: "🎈",
    particles: ["🎈", "🎉", "🎁", "🎂", "🥳"]
  },
  anniversary: {
    tagline: "Love & Togetherness",
    welcome: "Cheers to Love! 💖",
    subWelcome: "Commemorate years of shared happiness and dreams.",
    emoji: "🥂",
    icon: "🌹",
    particles: ["💖", "🥂", "🌹", "✨", "🌟"]
  },
  babyshower: {
    tagline: "Welcome Little One",
    welcome: "New Beginnings! 🧸",
    subWelcome: "Celebrate the arrival of your bundle of joy.",
    emoji: "🍼",
    icon: "👶",
    particles: ["🍼", "🧸", "🎈", "👶", "🌈"]
  }
};

const CoupleSilhouette = () => (
  <svg viewBox="0 0 100 100" style={{ width: "80px", height: "80px", opacity: 0.12, position: "absolute", bottom: "10px", right: "10px", fill: "var(--dash-secondary)" }}>
    <path d="M50 15 C40 15, 35 25, 35 35 C35 45, 45 50, 50 65 C55 50, 65 45, 65 35 C65 25, 60 15, 50 15 Z" />
    <path d="M50 65 C43 65, 30 70, 30 85 L70 85 C70 70, 57 65, 50 65 Z" />
    <circle cx="50" cy="27" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const PartyBalloons = () => (
  <svg viewBox="0 0 100 100" style={{ width: "80px", height: "80px", opacity: 0.12, position: "absolute", bottom: "10px", right: "10px", fill: "var(--dash-primary)" }}>
    <circle cx="40" cy="40" r="20" />
    <circle cx="65" cy="50" r="18" />
    <path d="M40 60 Q40 85 45 90 M65 68 Q65 85 60 92" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ToastingGlasses = () => (
  <svg viewBox="0 0 100 100" style={{ width: "80px", height: "80px", opacity: 0.12, position: "absolute", bottom: "10px", right: "10px", fill: "var(--dash-primary)" }}>
    <path d="M35 25 L45 50 L45 75 L35 75 L35 80 L65 80 L65 75 L55 75 L55 50 L65 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M30 30 L40 50 L60 50 L70 30" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M48 20 L52 20 L50 15 Z" fill="currentColor" />
  </svg>
);

function EventCard({ event }: { event: any }) {
  const theme = SUB_EVENT_THEMES[event.eventCategory] ?? SUB_EVENT_THEMES.wedding!;
  const isWedding = event.eventCategory === "wedding";
  const isBirthday = event.eventCategory === "birthday";
  const isAnniversary = event.eventCategory === "anniversary" || event.title?.toLowerCase().includes("anniversary");

  return (
    <div
      className={`festive-card ${event.isPublished ? "festive-card-live" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "340px"
      }}
    >
      {/* Colored top accent bar */}
      <div style={{
        height: "6px",
        background: `linear-gradient(90deg, var(--dash-primary), var(--dash-secondary))`,
      }} />

      {/* Silhouette Graphic in Background */}
      {isWedding && <CoupleSilhouette />}
      {isBirthday && <PartyBalloons />}
      {isAnniversary && <ToastingGlasses />}

      {/* Header */}
      <div style={{
        padding: "1.5rem",
        background: `linear-gradient(135deg, ${theme.bg}, transparent)`,
        borderBottom: "1.5px solid var(--dash-card-border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 2,
      }}>
        <div>
          <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>{theme.emoji}</div>
          <h3 className="font-playfair" style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--dash-text)",
            letterSpacing: "-0.01em",
          }}>
            {event.title}
          </h3>
          <div className="font-poppins" style={{ fontSize: "0.8rem", color: "var(--dash-muted)", marginTop: "0.3rem", fontWeight: 500 }}>
            {event._count?.guests ?? 0} guests · {event.subEvents?.length ?? 0} ceremonies
          </div>
        </div>
        <span className="font-poppins" style={{
          padding: "0.4rem 0.9rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: 700,
          background: event.isPublished ? "rgba(34,197,94,0.15)" : "rgba(180,83,9,0.15)",
          color: event.isPublished ? "#1a7a3a" : "#b45309",
          border: `1.5px solid ${event.isPublished ? "rgba(34,197,94,0.4)" : "rgba(180,83,9,0.4)"}`,
        }}>
          {event.isPublished ? "● Live" : "○ Draft"}
        </span>
      </div>

      {/* Sub-events row */}
      <div style={{ padding: "0.9rem 1.5rem", display: "flex", gap: "0.6rem", flexWrap: "wrap", minHeight: "2.75rem", position: "relative", zIndex: 2 }}>
        {event.subEvents && event.subEvents.length > 0 ? (
          event.subEvents.map((se: any) => {
            const t = SUB_EVENT_THEMES[se.subType] ?? SUB_EVENT_THEMES.wedding!;
            return (
              <span key={se.id} className="font-poppins" style={{
                padding: "0.3rem 0.8rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 500,
                background: t.bg,
                color: t.primary,
                border: `1.5px solid ${t.primary}66`,
              }}>
                {t.emoji} {se.name}
              </span>
            );
          })
        ) : (
          <span className="font-poppins" style={{ fontSize: "0.8rem", color: "var(--dash-muted)", fontStyle: "italic" }}>No ceremonies yet</span>
        )}
      </div>

      {/* Stats */}
      <div style={{
        padding: "0.9rem 1.5rem 1.25rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1.25rem",
        borderTop: "1.5px solid var(--dash-card-border)",
        position: "relative",
        zIndex: 2,
      }}>
        {[
          { label: "Guests", value: (event._count?.guests ?? 0).toString() },
          { label: "Shagun", value: (event._count?.shagunEntries ?? 0).toString() },
          { label: "Collected", value: `₹${((event.totalShagun ?? 0) / 100).toLocaleString("en-IN")}` },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div className="font-playfair" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--dash-secondary)" }}>{s.value}</div>
            <div className="font-poppins" style={{ fontSize: "0.75rem", color: "var(--dash-muted)", marginTop: "0.15rem", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding: "0.9rem 1.5rem 1.35rem", display: "flex", gap: "0.75rem", position: "relative", zIndex: 2 }}>
        <Link href={`/dashboard/events/${event.id}`} className="festive-btn-primary" style={{
          flex: 1,
          padding: "0.55rem",
          fontSize: "0.85rem",
        }}>
          ⚙️ Manage
        </Link>
        <Link href={`/e/${event.slug}`} target="_blank" className="festive-btn-ghost" style={{
          flex: 1,
          padding: "0.55rem",
          fontSize: "0.85rem",
        }}>
          👁️ View ↗
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashTheme, setDashTheme] = useState<"wedding" | "birthday" | "anniversary" | "babyshower">("wedding");
  const [particles, setParticles] = useState<any[]>([]);

  // Confetti Burst State
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<any[]>([]);

  // Top Nav Tab State for demo underline animation
  const [activeTab, setActiveTab] = useState("Events");

  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await fetch("/api/events?hostId=demo");
      const data = await res.json();
      if (data.events) setEvents(data.events);
    } catch (e) {
      console.error("Failed to fetch events", e);
      toast.error("Error loading events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  // Update floating particles dynamically based on active theme
  useEffect(() => {
    const pool = THEME_DETAILS[dashTheme].particles;
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      motif: pool[i % pool.length],
      delay: i * 0.4,
      x: (i * 7) % 90 + 5,
      y: (i * 11) % 80 + 5,
      size: 1.0 + (i % 3) * 0.4
    }));
    setParticles(generated);
  }, [dashTheme]);

  function triggerConfetti() {
    const pArray = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      color: ["#F0A500", "#C0392B", "#E8A7A1", "#FFE066", "#34D399", "#A78BFA", "#F472B6"][Math.floor(Math.random() * 7)],
      tx: `${(Math.random() - 0.5) * 320}px`,
      ty: `${-Math.random() * 250 - 50}px`,
      rot: `${Math.random() * 360}deg`,
      delay: `${Math.random() * 0.2}s`,
      left: `${50 + (Math.random() - 0.5) * 12}%`,
      top: `45%`
    }));
    setConfettiParticles(pArray);
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
      setConfettiParticles([]);
    }, 1500);
  }

  const totalGuests = events.reduce((sum, e) => sum + (e._count?.guests ?? 0), 0);
  const totalShagun = events.reduce((sum, e) => sum + (e.totalShagun ?? 0), 0);
  const details = THEME_DETAILS[dashTheme];

  return (
    <div
      data-dash-theme={dashTheme}
      className="font-poppins"
      style={{
        minHeight: "100vh",
        background: "var(--dash-bg)",
        color: "var(--dash-text)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.5s ease, color 0.5s ease"
      }}
    >
      {/* Dynamic Floating celebration particles */}
      <div className="falling-petals-container">
        {particles.map(p => (
          <span key={p.id} className="petal-particle" style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${10 + p.delay}s`
          }}>
            {p.motif}
          </span>
        ))}
      </div>

      {/* Confetti Explosion Burst */}
      {confettiActive && confettiParticles.map(p => (
        <div key={p.id} className="confetti-particle" style={{
          background: p.color,
          left: p.left,
          top: p.top,
          animationDelay: p.delay,
          '--tx': p.tx,
          '--ty': p.ty,
          '--rot': p.rot
        } as any} />
      ))}

      <Toaster theme="light" closeButton richColors />

      {/* Top Nav */}
      <nav style={{
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid var(--dash-card-border)",
        background: "var(--dash-nav-bg)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
        transition: "background 0.5s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.6rem" }}>{details.emoji}</span>
            <div>
              <span className="font-playfair" style={{
                fontSize: "1.6rem", fontWeight: 700,
                background: "linear-gradient(135deg, var(--dash-secondary) 0%, var(--dash-primary) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Utsav</span>
              <div style={{ fontSize: "0.65rem", color: "var(--dash-muted)", marginTop: "-3px", fontWeight: 600 }}>{details.tagline}</div>
            </div>
          </Link>
          <div style={{ display: "flex", gap: "0.5rem", position: "relative" }} className="tab-underline-container">
            {["Events", "Guests", "Shagun", "Analytics"].map((item) => {
              const isSelected = activeTab === item;
              return (
                <Link
                  key={item}
                  href={`/dashboard/${item.toLowerCase()}`}
                  onClick={(e) => {
                    // Pre-empt navigation for demo visual styling selection
                    setActiveTab(item);
                  }}
                  style={{
                    padding: "0.5rem 1.125rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    color: isSelected ? "var(--dash-secondary)" : "var(--dash-muted)",
                    background: isSelected ? "rgba(255,255,255,0.5)" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected ? "1.5px solid var(--dash-card-border)" : "1px solid transparent",
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dynamic Theme Switcher Panel */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", background: "rgba(255,255,255,0.4)", padding: "0.3rem", borderRadius: "9999px", border: "1px solid var(--dash-card-border)" }}>
          <button onClick={() => setDashTheme("wedding")} style={{ background: dashTheme === "wedding" ? "var(--dash-button-grad)" : "transparent", border: "none", width: "2.1rem", height: "2.1rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: dashTheme === "wedding" ? "#fff" : "inherit" }} title="Wedding Theme">💍</button>
          <button onClick={() => setDashTheme("birthday")} style={{ background: dashTheme === "birthday" ? "var(--dash-button-grad)" : "transparent", border: "none", width: "2.1rem", height: "2.1rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: dashTheme === "birthday" ? "#fff" : "inherit" }} title="Birthday Theme">🎈</button>
          <button onClick={() => setDashTheme("anniversary")} style={{ background: dashTheme === "anniversary" ? "var(--dash-button-grad)" : "transparent", border: "none", width: "2.1rem", height: "2.1rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: dashTheme === "anniversary" ? "#fff" : "inherit" }} title="Anniversary Theme">🥂</button>
          <button onClick={() => setDashTheme("babyshower")} style={{ background: dashTheme === "babyshower" ? "var(--dash-button-grad)" : "transparent", border: "none", width: "2.1rem", height: "2.1rem", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: dashTheme === "babyshower" ? "#fff" : "inherit" }} title="Baby Shower Theme">🍼</button>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            onClick={() => setShowCreateModal(true)}
            className="festive-btn-primary"
            style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem" }}
          >
            ✨ Create Event
          </button>
          <div style={{
            width: "2.5rem", height: "2.5rem", borderRadius: "9999px",
            background: "rgba(255,255,255,0.8)",
            border: "2px solid var(--dash-card-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}>👤</div>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem", position: "relative", zIndex: 10 }}>

        {/* Welcome Banner */}
        <div style={{
          marginBottom: "2.5rem",
          background: "linear-gradient(135deg, var(--dash-card-bg) 0%, rgba(255,255,255,0.7) 100%)",
          borderRadius: "2rem",
          padding: "2.5rem",
          border: "2.5px solid var(--dash-card-border)",
          boxShadow: "0 12px 40px var(--dash-card-shadow), inset 0 1px 0 rgba(255,255,255,0.8)",
          backdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Animated Mandala Motif Icon Overlay */}
          <svg viewBox="0 0 100 100" className="mandala-motif" style={{ width: "200px", height: "200px", position: "absolute", right: "-30px", top: "-30px", opacity: 0.08 }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M 50 5 C 55 25, 45 25, 50 5 Z M 50 95 C 55 75, 45 75, 50 95 Z M 5 50 C 25 55, 25 45, 5 50 Z M 95 50 C 75 55, 75 45, 95 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M 18 18 C 35 30, 30 35, 18 18 Z M 82 82 C 65 70, 70 65, 82 82 Z M 18 82 C 30 65, 35 70, 18 82 Z M 82 18 C 70 35, 65 30, 82 18 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 className="font-playfair" style={{
              fontSize: "2.3rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "var(--dash-text)",
              letterSpacing: "-0.02em",
            }}>
              {details.welcome}
            </h1>
            <p className="font-poppins" style={{ color: "var(--dash-muted)", fontSize: "1rem", fontWeight: 500 }}>
              {events.length} celebrations · {totalGuests} guests · {details.subWelcome}
            </p>
          </div>
          <div style={{ fontSize: "4.5rem", animation: "float 4s ease-in-out infinite", position: "relative", zIndex: 2 }}>
            {details.emoji}
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}>
          {[
            { label: "Total Events", value: events.length.toString(), icon: "🎉", bg: "rgba(240,165,0,0.08)" },
            { label: "Total Guests", value: totalGuests.toString(), icon: "👥", bg: "rgba(192,57,43,0.06)" },
            { label: "Shagun Collected", value: `₹${(totalShagun / 100).toLocaleString("en-IN")}`, icon: "💰", bg: "rgba(240,165,0,0.06)" },
            { label: "Celebrations", value: events.filter(e => e.isPublished).length.toString() + " Live", icon: "🌸", bg: "rgba(192,57,43,0.04)" },
          ].map((s) => (
            <div key={s.label} className="festive-card" style={{
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
            }}>
              <div style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "1.125rem",
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.75rem",
                flexShrink: 0,
                border: "1px solid var(--dash-card-border)"
              }}>{s.icon}</div>
              <div>
                <div className="font-playfair" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--dash-secondary)", lineHeight: 1.1 }}>{s.value}</div>
                <div className="font-poppins" style={{ fontSize: "0.8rem", color: "var(--dash-muted)", marginTop: "0.25rem", fontWeight: 600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Events Grid header */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 className="font-playfair" style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "var(--dash-text)",
              letterSpacing: "-0.01em",
            }}>Your Celebrations</h2>
            <p className="font-poppins" style={{ fontSize: "0.85rem", color: "var(--dash-muted)", marginTop: "0.15rem", fontWeight: 500 }}>Manage and track all your special events</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="festive-btn-ghost" style={{
            fontSize: "0.85rem",
            padding: "0.5rem 1.25rem",
          }}>
            + New Event
          </button>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.5rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: "300px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
                borderRadius: "1.5rem",
                border: "2px solid var(--dash-card-border)",
                animation: "skeleton-pulse 1.5s ease-in-out infinite",
              }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.5rem" }}>
            {events.map((e) => <EventCard key={e.id} event={e} />)}

            {/* Create new card */}
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(192,57,43,0.04))",
                border: "2.5px dashed var(--dash-card-border)",
                borderRadius: "1.5rem",
                padding: "3rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                minHeight: "340px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--dash-primary)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 30px var(--dash-glow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--dash-card-border)";
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(192,57,43,0.04))";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "3.5rem" }}>✨</span>
              <span className="font-playfair" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--dash-secondary)" }}>Create New Event</span>
              <span className="font-poppins" style={{ fontSize: "0.85rem", color: "var(--dash-muted)" }}>Wedding, Birthday, Engagement & more</span>
            </button>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(44, 24, 16, 0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200,
          padding: "1rem",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreateModal(false); }}
        >
          <CreateEventModal
            onClose={() => setShowCreateModal(false)}
            onEventCreated={triggerConfetti}
          />
        </div>
      )}

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes skeleton-pulse { 0%,100%{opacity:0.8} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}

function CreateEventModal({ onClose, onEventCreated }: { onClose: () => void; onEventCreated: () => void }) {
  const [step, setStep] = useState(1);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", eventCategory: "wedding", culturalTheme: "wedding" });

  const EVENT_TYPES = [
    { key: "wedding", label: "Wedding", emoji: "👰", desc: "Multi-day celebration suite" },
    { key: "engagement", label: "Engagement / Ring", emoji: "💍", desc: "Ring ceremony & promise" },
    { key: "birthday", label: "Birthday", emoji: "🎂", desc: "Birthday bash & party" },
    { key: "corporate", label: "Corporate", emoji: "🏢", desc: "Product launch, conference" },
  ];

  const CULTURAL_THEMES = [
    { key: "punjabi", label: "Punjabi", emoji: "🌾" },
    { key: "tamil", label: "Tamil", emoji: "🌺" },
    { key: "bengali", label: "Bengali", emoji: "🏮" },
    { key: "muslim", label: "Muslim", emoji: "🌙" },
    { key: "christian", label: "Christian", emoji: "⛪" },
    { key: "wedding", label: "Classic Indian", emoji: "🪔" },
  ];

  async function handleCreateEvent() {
    try {
      setCreating(true);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, eventCategory: form.eventCategory, culturalTheme: form.culturalTheme, hostId: "demo" }),
      });
      const data = await res.json();
      if (res.ok && data.event) {
        toast.success("Event created! 🎉");
        onEventCreated();
        setTimeout(() => { window.location.href = `/dashboard/events/${data.event.id}`; }, 1200);
      } else {
        toast.error(data.error || "Failed to create event");
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.98)",
      border: "2px solid var(--dash-card-border)",
      borderRadius: "2rem",
      padding: "2.5rem",
      width: "100%",
      maxWidth: "560px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 24px 80px rgba(44, 24, 16, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
      backdropFilter: "blur(16px)",
      color: "var(--dash-text)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 className="font-playfair" style={{
            fontSize: "1.7rem",
            color: "var(--dash-text)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}>
            {step === 1 ? "✨ Create Your Event" : step === 2 ? "🎨 Choose Theme" : "🎉 Almost Done!"}
          </h2>
          <p className="font-poppins" style={{ fontSize: "0.8rem", color: "var(--dash-muted)", marginTop: "0.3rem", fontWeight: 600 }}>Step {step} of 3</p>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(240,165,0,0.1)",
          border: "1.5px solid var(--dash-card-border)",
          color: "var(--dash-muted)",
          cursor: "pointer",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: "9999px",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}>✕</button>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem" }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{
            flex: 1,
            height: "5px",
            borderRadius: "9999px",
            background: s <= step
              ? "var(--dash-button-grad)"
              : "rgba(240,165,0,0.15)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.6rem", color: "var(--dash-text)" }}>
              Event Title
            </label>
            <input
              type="text"
              placeholder="e.g. Sharma-Gupta Wedding 2026"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{
                width: "100%",
                padding: "0.875rem 1.125rem",
                borderRadius: "0.9rem",
                background: "#ffffff",
                border: "2px solid var(--dash-card-border)",
                color: "var(--dash-text)",
                outline: "none",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "var(--dash-secondary)";
                (e.target as HTMLInputElement).style.boxShadow = "0 0 0 4px var(--dash-glow), 0 4px 12px var(--dash-glow)";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "var(--dash-card-border)";
                (e.target as HTMLInputElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)";
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.9rem", color: "var(--dash-text)" }}>
              Event Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setForm({ ...form, eventCategory: t.key })}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "1rem",
                    border: "2px solid",
                    borderColor: form.eventCategory === t.key ? "var(--dash-secondary)" : "var(--dash-card-border)",
                    background: form.eventCategory === t.key ? "rgba(240,165,0,0.08)" : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    color: "var(--dash-text)",
                    boxShadow: form.eventCategory === t.key ? "0 6px 20px var(--dash-glow)" : "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{t.emoji}</div>
                  <div className="font-playfair" style={{ fontSize: "1.05rem", fontWeight: 700, color: form.eventCategory === t.key ? "var(--dash-secondary)" : "var(--dash-text)" }}>{t.label}</div>
                  <div className="font-poppins" style={{ fontSize: "0.75rem", color: "var(--dash-muted)", marginTop: "0.2rem" }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="festive-btn-primary"
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "0.95rem",
              opacity: form.title ? 1 : 0.6,
              cursor: form.title ? "pointer" : "not-allowed"
            }}
            disabled={!form.title}
            onClick={() => setStep(2)}
          >
            Next: Choose Theme →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="font-poppins" style={{ color: "var(--dash-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", fontWeight: 500 }}>
            Choose the cultural theme for your event page
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.9rem", marginBottom: "2rem" }}>
            {CULTURAL_THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => setForm({ ...form, culturalTheme: t.key })}
                style={{
                  padding: "1.2rem 0.9rem",
                  borderRadius: "1rem",
                  border: "2px solid",
                  borderColor: form.culturalTheme === t.key ? "var(--dash-secondary)" : "var(--dash-card-border)",
                  background: form.culturalTheme === t.key ? "rgba(240,165,0,0.08)" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                  color: "var(--dash-text)",
                  boxShadow: form.culturalTheme === t.key ? "0 6px 20px var(--dash-glow)" : "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>{t.emoji}</div>
                <div className="font-poppins" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--dash-text)" }}>{t.label}</div>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.9rem" }}>
            <button
              className="festive-btn-ghost"
              style={{
                flex: 1,
                padding: "0.95rem",
              }}
              onClick={() => setStep(1)}
            >← Back</button>
            <button
              className="festive-btn-primary"
              style={{
                flex: 2,
                padding: "0.95rem",
              }}
              onClick={() => setStep(3)}
            >Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4.5rem", marginBottom: "1.5rem", animation: "float 2s ease-in-out infinite" }}>💍</div>
          <h3 className="font-playfair" style={{
            fontSize: "1.6rem",
            marginBottom: "0.75rem",
            color: "var(--dash-text)",
            letterSpacing: "-0.01em",
            fontWeight: 700
          }}>
            {form.title}
          </h3>
          <p className="font-poppins" style={{ color: "var(--dash-muted)", marginBottom: "0.75rem", fontSize: "0.95rem", fontWeight: 600 }}>
            {CULTURAL_THEMES.find(t => t.key === form.culturalTheme)?.emoji}{" "}
            {CULTURAL_THEMES.find(t => t.key === form.culturalTheme)?.label} · {form.eventCategory}
          </p>
          <p className="font-poppins" style={{ color: "var(--dash-muted)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>Ready to create your celebration page!</p>
          <div style={{ display: "flex", gap: "0.9rem" }}>
            <button
              className="festive-btn-ghost"
              style={{
                flex: 1,
                padding: "0.95rem",
              }}
              onClick={() => setStep(2)}
              disabled={creating}
            >← Back</button>
            <button
              className="festive-btn-primary"
              style={{
                flex: 2,
                padding: "0.95rem",
              }}
              onClick={handleCreateEvent}
              disabled={creating}
            >
              {creating ? "Creating... 🌸" : "🚀 Create Event!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
