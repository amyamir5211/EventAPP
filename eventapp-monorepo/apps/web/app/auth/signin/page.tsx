"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // In production: call NextAuth signIn or registration API
    await new Promise((r) => setTimeout(r, 1200));
    window.location.href = "/dashboard";
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%), #0a0a0f",
      fontFamily: "'Inter', sans-serif", padding: "2rem",
    }}>
      {/* Background motifs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {["🌸", "💍", "✨", "🌹", "🎊"].map((m, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: "2rem", opacity: 0.06,
            left: `${[10,80,20,70,50][i]}%`,
            top: `${[20,15,75,70,40][i]}%`,
            animation: `float ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
          }}>{m}</span>
        ))}
      </div>

      <div style={{
        width: "100%", maxWidth: "420px",
        background: "rgba(20,18,28,0.9)",
        border: "1px solid rgba(212,160,23,0.2)",
        borderRadius: "1.5rem", padding: "2.5rem",
        boxShadow: "0 0 60px rgba(212,160,23,0.1)",
        backdropFilter: "blur(20px)",
        position: "relative",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "block", textAlign: "center", marginBottom: "2rem", textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700,
            background: "linear-gradient(135deg, #d4a017, #f7c948)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Utsav ✨
          </span>
        </Link>

        {/* Toggle */}
        <div style={{
          display: "flex", background: "rgba(255,255,255,0.05)",
          borderRadius: "0.75rem", padding: "0.25rem", marginBottom: "2rem",
        }}>
          {(["signin", "signup"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "none",
              cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, transition: "all 0.2s",
              background: mode === m ? "rgba(212,160,23,0.2)" : "transparent",
              color: mode === m ? "#d4a017" : "rgba(245,240,235,0.5)",
            }}>
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.4rem", color: "rgba(245,240,235,0.7)" }}>
                Your Name
              </label>
              <input
                type="text" required placeholder="Priya Sharma"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
              />
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.4rem", color: "rgba(245,240,235,0.7)" }}>
              Email
            </label>
            <input
              type="email" required placeholder="priya@example.com"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.4rem", color: "rgba(245,240,235,0.7)" }}>
              Password
            </label>
            <input
              type="password" required placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", fontSize: "1rem" }} disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        {/* Google OAuth */}
        <div style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: "rgba(245,240,235,0.3)", fontSize: "0.8rem" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        <button className="btn-ghost" style={{ width: "100%", gap: "0.75rem" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.8rem", color: "rgba(245,240,235,0.3)" }}>
          By continuing, you agree to our Terms of Service
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
