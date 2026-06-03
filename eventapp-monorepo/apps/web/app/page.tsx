"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const FLOATING_MOTIFS = ["🌸", "🌺", "✨", "💍", "🎊", "🌿", "💛", "🎶", "🌹", "🥂", "🪔", "🌼"];

function FloatingPetal({ motif, delay, x, y, size }: { motif: string; delay: number; x: number; y: number; size: number }) {
  return (
    <span
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        fontSize: `${size}rem`,
        opacity: 0.18,
        animation: `float ${4 + delay}s ease-in-out ${delay}s infinite`,
        userSelect: "none",
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 4px rgba(200,132,26,0.15))",
      }}
    >
      {motif}
    </span>
  );
}

const THEME_DEMOS = [
  { subType: "mehndi", label: "Mehndi", emoji: "🌿", primary: "#5a8a00", bg: "linear-gradient(135deg, #1a2410, #0d1a08)", desc: "Henna & Earthy Greens" },
  { subType: "haldi", label: "Haldi", emoji: "💛", primary: "#d4830a", bg: "linear-gradient(135deg, #2a1a00, #1a0f00)", desc: "Turmeric & Marigold" },
  { subType: "sangeet", label: "Sangeet", emoji: "🎶", primary: "#9333ea", bg: "linear-gradient(135deg, #1a0535, #0d0018)", desc: "Electric Purple & Pink" },
  { subType: "baraat", label: "Baraat", emoji: "🐴", primary: "#dc2626", bg: "linear-gradient(135deg, #1a0810, #0d0008)", desc: "Bold Red & Royal Gold" },
  { subType: "reception", label: "Reception", emoji: "🥂", primary: "#c8841a", bg: "linear-gradient(135deg, #0d1a2e, #07101e)", desc: "Midnight Blue & Champagne" },
  { subType: "engagement", label: "Ring Ceremony", emoji: "💍", primary: "#c2185b", bg: "linear-gradient(135deg, #1a0d24, #0e0818)", desc: "Rose Pink & Violet" },
  { subType: "birthday", label: "Birthday", emoji: "🎂", primary: "#0891b2", bg: "linear-gradient(135deg, #0d1a2a, #060d18)", desc: "Vibrant Cyan & Amber" },
];

const FEATURES = [
  { icon: "🎨", title: "Theme-Matched Event Pages", desc: "Every sub-event gets its own stunning visual identity. Mehndi glows green, Haldi shines golden, Sangeet pulses purple." },
  { icon: "💸", title: "Digital Shagun Gifting", desc: "Ceremonial digital envelopes with UPI/card. Host gets a live ledger. Guest gets a blessed receipt card." },
  { icon: "📲", title: "WhatsApp Invites in Seconds", desc: "Animated invite links shareable on WhatsApp or QR code on physical cards. No app download needed for guests." },
  { icon: "✅", title: "Smart RSVP Management", desc: "Per sub-event RSVPs with meal preference and travel needs. QR check-in at venue. Real-time headcount for caterers." },
  { icon: "🌏", title: "Cultural Deep Dive", desc: "Punjabi, Tamil, Bengali, Muslim, Christian — correct terminology, ritual schedules, and regional language text." },
  { icon: "🤖", title: "Automated Thank-You", desc: "Post-event WhatsApp + email thank-yous. Acknowledges shagun gracefully. Sends in regional language with event photo." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", event: "Sharma-Gupta Wedding · Delhi", quote: "Our 300 guests got a personalised Mehndi-themed invite. 87% RSVPd within 2 days. The shagun ledger saved us from a spreadsheet nightmare!", avatar: "👰" },
  { name: "Rajesh Iyer", event: "Iyer Family Wedding · Chennai", quote: "The Tamil wedding theme with temple motifs was breathtaking. Our NRI relatives sent shagun from the US with a single tap.", avatar: "🤵" },
  { name: "Aisha Khan", event: "Nikah Ceremony · Hyderabad", quote: "The Muslim wedding theme with crescent patterns was exactly what we wanted. Our guests loved the blessed receipt card after sending Shagun.", avatar: "👸" },
];

const STATS = [
  { value: "12,000+", label: "Families Celebrated", icon: "👨‍👩‍👧‍👦" },
  { value: "₹4.2Cr+", label: "Shagun Collected", icon: "💰" },
  { value: "8.4L+", label: "Invites Sent", icon: "📩" },
  { value: "94%", label: "RSVP Rate", icon: "✅" },
];

export default function LandingPage() {
  const [particles] = useState(() =>
    FLOATING_MOTIFS.map((m, i) => ({
      motif: m,
      delay: i * 0.5,
      x: (i * 8.3) % 90 + 5,
      y: (i * 13.7) % 80 + 5,
      size: 1.2 + (i % 3) * 0.4,
    }))
  );

  const [activeTheme, setActiveTheme] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTheme((p) => (p + 1) % THEME_DEMOS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const demo = THEME_DEMOS[activeTheme]!;

  return (
    <div style={{ background: "#fdf8f2", color: "#2d1f0e", minHeight: "100vh", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0.9rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(253,248,242,0.95)" : "rgba(253,248,242,0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(200,132,26,0.15)" : "1px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 24px rgba(200,132,26,0.08)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🪔</span>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", fontWeight: 700,
            background: "linear-gradient(135deg, #c8841a, #c2185b)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Utsav</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link href="/dashboard" className="btn-ghost" style={{ padding: "0.45rem 1.1rem", fontSize: "0.875rem" }}>Dashboard</Link>
          <Link href="/auth/signin" className="btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.875rem" }}>
            Create Event ✨
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 50%, rgba(200,132,26,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(194,24,91,0.08) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(247,201,72,0.07) 0%, transparent 50%), #fdf8f2",
        paddingTop: "5rem",
      }}>
        {/* Floating petals */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {particles.map((p, i) => <FloatingPetal key={i} {...p} />)}
        </div>

        {/* Decorative arch top */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(200,132,26,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "920px", position: "relative", zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.45rem 1.2rem",
            background: "linear-gradient(135deg, rgba(200,132,26,0.1), rgba(194,24,91,0.08))",
            border: "1px solid rgba(200,132,26,0.25)",
            borderRadius: "9999px",
            fontSize: "0.8rem", fontWeight: 600, color: "#a06010", marginBottom: "2rem",
            letterSpacing: "0.04em",
            boxShadow: "0 2px 12px rgba(200,132,26,0.1)",
          }}>
            🇮🇳 Built with ❤️ for Indian Celebrations
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 7vw, 5.2rem)",
            fontWeight: 700, lineHeight: 1.12, marginBottom: "1.5rem",
            color: "#1e1208",
          }}>
            Every ceremony deserves{" "}
            <span style={{
              background: "linear-gradient(135deg, #c8841a, #f7c948, #c2185b, #f7c948, #c8841a)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}>
              its own magic
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#6b4c2a",
            maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.75,
          }}>
            Create breathtaking multi-day celebration pages where Mehndi glows green, Haldi shines golden,
            Sangeet pulses purple, and Baraat blazes red. Share on WhatsApp. Collect Shagun digitally. 🌸
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/signin" className="btn-primary" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}>
              Create Your Event ✨
            </Link>
            <Link href="/e/demo-wedding-2026" className="btn-ghost" style={{ fontSize: "1.05rem", padding: "0.9rem 2.5rem" }}>
              View Demo 🎊
            </Link>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#b49a7a" }}>
            ₹499 to start · No credit card required · Cancel anytime
          </p>

          {/* Trust badges */}
          <div style={{
            display: "flex", gap: "2rem", justifyContent: "center", marginTop: "3rem",
            flexWrap: "wrap",
          }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem",
              }}>
                <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                <span style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700,
                  color: "#c8841a",
                }}>{s.value}</span>
                <span style={{ fontSize: "0.75rem", color: "#8a6d4b" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(245,237,224,0.5))",
          pointerEvents: "none",
        }} />
      </section>

      {/* ── LIVE THEME DEMO ── */}
      <section style={{ background: "#f5ede0", padding: "5rem 2rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-block", padding: "0.3rem 1rem", marginBottom: "1rem",
            background: "rgba(194,24,91,0.08)", border: "1px solid rgba(194,24,91,0.2)",
            borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 600, color: "#9a1050",
          }}>
            ✨ LIVE THEME PREVIEW
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            marginBottom: "0.75rem", color: "#1e1208",
          }}>
            One wedding, seven visual universes
          </h2>
          <p style={{ color: "#6b4c2a", marginBottom: "3rem", fontSize: "1.05rem" }}>
            Each sub-event auto-applies its own immersive theme
          </p>

          {/* Theme Picker */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            {THEME_DEMOS.map((t, i) => (
              <button
                key={t.subType}
                onClick={() => setActiveTheme(i)}
                style={{
                  padding: "0.5rem 1.1rem", borderRadius: "9999px", fontSize: "0.85rem",
                  fontWeight: 600, cursor: "pointer", border: "2px solid",
                  borderColor: i === activeTheme ? t.primary : "rgba(200,132,26,0.2)",
                  background: i === activeTheme ? `${t.primary}18` : "rgba(255,255,255,0.7)",
                  color: i === activeTheme ? t.primary : "#6b4c2a",
                  transition: "all 0.25s ease",
                  boxShadow: i === activeTheme ? `0 4px 16px ${t.primary}30` : "none",
                }}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          {/* Theme Preview Card */}
          <div style={{
            maxWidth: "440px", margin: "0 auto",
            background: demo.bg, border: `2px solid ${demo.primary}44`,
            borderRadius: "1.75rem", padding: "2.5rem",
            boxShadow: `0 0 60px ${demo.primary}33, 0 20px 60px rgba(0,0,0,0.15)`,
            transition: "all 0.5s ease",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>
              {demo.emoji}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: demo.primary, marginBottom: "0.5rem", fontWeight: 700 }}>
              {demo.label} Ceremony
            </div>
            <div style={{ color: "rgba(245,240,235,0.65)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              {demo.desc}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.3)", borderRadius: "0.875rem", padding: "1rem" }}>
              {[["243", "Guests"], ["186", "RSVPs"], ["₹2.4L", "Shagun"]].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ color: demo.primary, fontWeight: 700, fontSize: "1.2rem" }}>{val}</div>
                  <div style={{ color: "rgba(245,240,235,0.5)", fontSize: "0.75rem" }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "1.5rem", padding: "0.75rem 1.5rem",
              background: `linear-gradient(135deg, ${demo.primary}, ${demo.primary}bb)`,
              borderRadius: "9999px", color: "#fff", fontSize: "0.9rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              📲 Share on WhatsApp
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: "#fdf8f2", padding: "5rem 2rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block", padding: "0.3rem 1rem", marginBottom: "1rem",
              background: "rgba(200,132,26,0.1)", border: "1px solid rgba(200,132,26,0.25)",
              borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 600, color: "#a06010",
            }}>🌟 FEATURES</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "0.75rem", color: "#1e1208" }}>
              Everything a family needs
            </h2>
            <p style={{ color: "#6b4c2a", fontSize: "1.05rem" }}>
              Built specifically for multi-day Indian celebrations
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  background: "#ffffff", border: "1px solid rgba(200,132,26,0.12)",
                  borderRadius: "1.25rem", padding: "1.75rem",
                  boxShadow: "0 4px 20px rgba(200,132,26,0.06)",
                  transition: "all 0.3s ease", cursor: "default",
                  animation: `fade-in-up 0.6s ease ${i * 0.08}s both`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,132,26,0.3)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 36px rgba(200,132,26,0.14)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,132,26,0.12)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(200,132,26,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "3rem", height: "3rem", borderRadius: "0.875rem", marginBottom: "1rem",
                  background: "linear-gradient(135deg, rgba(200,132,26,0.12), rgba(194,24,91,0.08))",
                  border: "1px solid rgba(200,132,26,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem", color: "#1e1208" }}>{f.title}</h3>
                <p style={{ color: "#6b4c2a", fontSize: "0.9rem", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "linear-gradient(135deg, #fef3e2, #fde8f0)", padding: "5rem 2rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-block", padding: "0.3rem 1rem", marginBottom: "1rem",
            background: "rgba(194,24,91,0.08)", border: "1px solid rgba(194,24,91,0.2)",
            borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 600, color: "#9a1050",
          }}>✨ HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "0.75rem", color: "#1e1208" }}>
            Live in 3 simple steps
          </h2>
          <p style={{ color: "#6b4c2a", marginBottom: "3.5rem", fontSize: "1.05rem" }}>Start celebrating in minutes</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            {[
              { step: "01", icon: "✍️", title: "Create Your Event", desc: "Choose your wedding category, cultural theme, and upload your event details in minutes." },
              { step: "02", icon: "🎨", title: "Design Ceremonies", desc: "Add each sub-event — Mehndi, Haldi, Sangeet — each with its own stunning visual theme." },
              { step: "03", icon: "📲", title: "Share & Celebrate", desc: "Send personalized WhatsApp invites to your guests and watch RSVPs roll in instantly!" },
            ].map((s) => (
              <div key={s.step} style={{
                background: "rgba(255,255,255,0.7)", borderRadius: "1.5rem", padding: "2rem",
                border: "1px solid rgba(200,132,26,0.15)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(200,132,26,0.08)",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: "-1rem", left: "50%", transform: "translateX(-50%)",
                  width: "2rem", height: "2rem", borderRadius: "9999px",
                  background: "linear-gradient(135deg, #c8841a, #c2185b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700, color: "#fff",
                }}>
                  {s.step}
                </div>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem", marginTop: "0.5rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.5rem", color: "#1e1208" }}>{s.title}</h3>
                <p style={{ color: "#6b4c2a", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: "#fdf8f2", padding: "5rem 2rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block", padding: "0.3rem 1rem", marginBottom: "1rem",
              background: "rgba(200,132,26,0.1)", border: "1px solid rgba(200,132,26,0.25)",
              borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 600, color: "#a06010",
            }}>💰 PRICING</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "0.5rem", color: "#1e1208" }}>
              Simple, honest pricing
            </h2>
            <p style={{ color: "#6b4c2a" }}>No hidden costs. No surprises. Just celebrations.</p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem", maxWidth: "1000px", margin: "0 auto",
          }}>
            {[
              { name: "Starter", price: "₹499", color: "#0891b2", features: ["1 event", "1 sub-event", "50 guests", "Basic template", "WhatsApp invite"] },
              { name: "Classic", price: "₹999", color: "#c8841a", features: ["1 event", "5 sub-events", "200 guests", "All 7 themes", "Shagun gifting", "QR check-in"], popular: true },
              { name: "Grand", price: "₹2,499", color: "#9333ea", features: ["1 event", "Unlimited sub-events", "600 guests", "All themes", "Shagun + analytics", "Thank-you automation", "Priority support"] },
            ].map((plan) => (
              <div
                key={plan.name}
                style={{
                  background: plan.popular
                    ? "linear-gradient(160deg, #fff8ee, #fff2f7)"
                    : "#ffffff",
                  border: `${plan.popular ? "2px" : "1px"} solid ${plan.popular ? plan.color + "55" : "rgba(200,132,26,0.12)"}`,
                  borderRadius: "1.5rem", padding: "2rem", textAlign: "center", position: "relative",
                  boxShadow: plan.popular
                    ? `0 8px 40px ${plan.color}22, 0 4px 20px rgba(200,132,26,0.1)`
                    : "0 4px 20px rgba(200,132,26,0.06)",
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: "-0.85rem", left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${plan.color}, #c2185b)`,
                    color: "#fff", fontSize: "0.7rem", fontWeight: 700,
                    padding: "0.3rem 1.1rem", borderRadius: "9999px",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    boxShadow: `0 4px 12px ${plan.color}44`,
                  }}>⭐ Most Popular</div>
                )}
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: plan.color, marginBottom: "0.4rem" }}>{plan.name}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 700, color: "#1e1208", marginBottom: "1.5rem" }}>{plan.price}</div>
                <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ color: "#4a3520", fontSize: "0.9rem", padding: "0.35rem 0", display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                      <span style={{ color: plan.color, fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signin" style={{
                  display: "block", padding: "0.85rem", borderRadius: "9999px",
                  fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
                  color: plan.popular ? "#fff" : plan.color,
                  background: plan.popular ? `linear-gradient(135deg, ${plan.color}, #c2185b)` : "transparent",
                  border: plan.popular ? "none" : `1.5px solid ${plan.color}`,
                  transition: "all 0.3s",
                  boxShadow: plan.popular ? `0 4px 20px ${plan.color}44` : "none",
                }}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#8a6d4b", fontSize: "0.85rem" }}>
            + 1.5–2% platform fee on Shagun transactions
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "linear-gradient(135deg, #fef3e2, #fde8f0)", padding: "5rem 2rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block", padding: "0.3rem 1rem", marginBottom: "1rem",
              background: "rgba(194,24,91,0.08)", border: "1px solid rgba(194,24,91,0.2)",
              borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 600, color: "#9a1050",
            }}>💌 LOVE STORIES</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1e1208" }}>
              Families love Utsav
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.75)", border: "1px solid rgba(200,132,26,0.15)",
                borderRadius: "1.25rem", padding: "1.75rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(200,132,26,0.08)",
              }}>
                <div style={{ fontSize: "1.5rem", color: "#c8841a", marginBottom: "0.75rem" }}>❝</div>
                <p style={{ color: "#4a3520", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "2.75rem", height: "2.75rem", borderRadius: "9999px",
                    background: "linear-gradient(135deg, rgba(200,132,26,0.15), rgba(194,24,91,0.12))",
                    border: "1.5px solid rgba(200,132,26,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem"
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e1208" }}>{t.name}</div>
                    <div style={{ color: "#8a6d4b", fontSize: "0.8rem" }}>{t.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "6rem 2rem", textAlign: "center",
        background: "linear-gradient(135deg, #c8841a 0%, #d4950a 30%, #c2185b 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>🎊</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem",
          color: "#ffffff",
        }}>
          Your celebration deserves the best
        </h2>
        <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: "500px", margin: "0 auto 2.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
          Join thousands of families who made their celebrations unforgettable with Utsav. 🌸
        </p>
        <Link href="/auth/signin" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "#ffffff", color: "#c8841a",
          padding: "1rem 3rem", borderRadius: "9999px",
          fontWeight: 700, fontSize: "1.1rem", textDecoration: "none",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          transition: "all 0.3s",
        }}>
          Start for ₹499 ✨
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "2.5rem 2rem", textAlign: "center",
        borderTop: "1px solid rgba(200,132,26,0.15)",
        background: "#fdf0e4",
        color: "#8a6d4b", fontSize: "0.85rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "1.2rem" }}>🪔</span>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "#c8841a", fontWeight: 600 }}>Utsav</span>
        </div>
        <p style={{ color: "#8a6d4b" }}>
          © 2026 · Made with ❤️ for Indian families ·{" "}
          <Link href="/privacy" style={{ color: "#c8841a", textDecoration: "none" }}>Privacy</Link>
          <span style={{ margin: "0 0.5rem" }}>·</span>
          <Link href="/terms" style={{ color: "#c8841a", textDecoration: "none" }}>Terms</Link>
        </p>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
