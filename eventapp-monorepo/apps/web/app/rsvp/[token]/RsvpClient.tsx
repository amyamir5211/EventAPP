"use client";
import { useState, useEffect } from "react";
import { getTheme, getSubEventTheme } from "@/lib/theme";
import { formatDate } from "@/lib/utils";
import { CulturalBackground, CulturalDivider } from "@/components/CulturalDecorator";

interface SubEvent { id: string; name: string; subType: string | null; date: string; venue: string | null; }
interface GuestSubEvent { subEventId: string; isInvited: boolean; }
interface Guest {
  id: string; name: string; rsvpStatus: string; mealPreference: string | null;
  rsvpToken: string;
  expectedPersons: number | null;
  actualPersons: number | null;
  event: { id: string; title: string; culturalTheme: string | null; eventCategory: string; host: { name: string | null }; subEvents: SubEvent[]; };
  subEventLinks: GuestSubEvent[];
}

export default function RsvpClient({ guest }: { guest: Guest }) {
  const theme = getTheme((guest.event.culturalTheme ?? guest.event.eventCategory) as any);
  const invitedSubEvents = guest.event.subEvents.filter((se) =>
    guest.subEventLinks.find((l) => l.subEventId === se.id && l.isInvited) || guest.subEventLinks.length === 0
  );

  const [status, setStatus] = useState<"pending" | "confirmed" | "declined">("pending");
  const [meal, setMeal] = useState(guest.mealPreference ?? "");
  const [attending, setAttending] = useState<string[]>(invitedSubEvents.map((s) => s.id));
  const [actualPersons, setActualPersons] = useState<number>(guest.actualPersons ?? guest.expectedPersons ?? 1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(decision: "confirmed" | "declined") {
    setLoading(true);
    setStatus(decision);
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: guest.rsvpToken,
        status: decision,
        mealPreference: meal,
        attendingSubEvents: attending,
        actualPersons: decision === "confirmed" ? actualPersons : null,
      }),
    }).catch(() => {});
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <RsvpSuccessScreen
        status={status}
        theme={theme}
        guest={guest}
        invitedSubEvents={invitedSubEvents}
      />
    );
  }

  function RsvpSuccessScreen({
    status,
    theme,
    guest,
    invitedSubEvents,
  }: {
    status: "pending" | "confirmed" | "declined";
    theme: any;
    guest: Guest;
    invitedSubEvents: SubEvent[];
  }) {
    const [loadingCal, setLoadingCal] = useState(false);
    const [googleUrl, setGoogleUrl] = useState<string | null>(null);
    const [icsText, setIcsText] = useState<string | null>(null);

    async function loadCalendar() {
      if (loadingCal) return;
      setLoadingCal(true);
      try {
        const res = await fetch(
          `/api/guests/${guest.rsvpToken}/calendar?eventId=${guest.event.id}`
        );
        const data = await res.json();
        if (res.ok) {
          setGoogleUrl(data.googleUrl ?? null);
          setIcsText(data.icsText ?? null);
        }
      } catch {
        // ignore
      } finally {
        setLoadingCal(false);
      }
    }

    function handleDownloadIcs() {
      if (!icsText) return;
      // create a client-side blob download
      const blob = new Blob([icsText], {
        type: "text/calendar;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safe = guest.event.title.replace(/[^a-z0-9]+/gi, "-").slice(0, 60);
      a.href = url;
      a.download = `${safe}-${guest.name}.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    const hasCalendar = status === "confirmed" && invitedSubEvents.length > 0;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(160deg, ${theme.bgFrom}, ${theme.bgTo})`,
          fontFamily: "'Inter', sans-serif",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CulturalBackground themeKey={theme.key} />
        <div
          style={{
            background: theme.cardBg,
            border: `1.5px solid ${theme.borderColor}`,
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            textAlign: "center",
            maxWidth: "520px",
            boxShadow: `0 0 60px ${theme.glowColor}`,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            {status === "confirmed" ? "🎉" : "💌"}
          </div>
          <h2
            style={{
              fontFamily: theme.fontHeading,
              fontSize: "1.75rem",
              color: theme.primaryColor,
              marginBottom: "0.5rem",
            }}
          >
            {status === "confirmed" ? "See you there!" : "We'll miss you!"}
          </h2>
          <p
            style={{
              color: theme.mutedColor,
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            {status === "confirmed"
              ? `Your RSVP for ${guest.event.title} is confirmed. We look forward to celebrating with you! 🙏`
              : "Thank you for letting us know. We hope to meet you at the next celebration!"}
          </p>

          <div
            style={{
              marginTop: "1.75rem",
              padding: "1rem",
              background: `${theme.primaryColor}12`,
              borderRadius: "0.75rem",
            }}
          >
            <div style={{ color: theme.primaryColor, fontWeight: 600, fontSize: "0.85rem" }}>
              {theme.motifs[0]} {guest.event.title}
            </div>
            <div style={{ color: theme.mutedColor, fontSize: "0.8rem", marginTop: "0.25rem" }}>
              Hosted by {guest.event.host.name ?? "The Family"}
            </div>
          </div>

          {hasCalendar && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "0.85rem",
                border: `1px solid rgba(212,160,23,0.25)`,
                background: "rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ fontWeight: 800, color: theme.textColor, marginBottom: "0.75rem" }}>
                🗓️ Add ceremonies to your calendar
              </div>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  onClick={loadCalendar}
                  disabled={loadingCal}
                  style={{
                    padding: "0.85rem 1.2rem",
                    borderRadius: "9999px",
                    border: `1px solid ${theme.borderColor}`,
                    background: "transparent",
                    color: theme.mutedColor,
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  {loadingCal ? "Preparing..." : "Add to Calendar"}
                </button>

                {googleUrl && (
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "0.85rem 1.2rem",
                      borderRadius: "9999px",
                      border: "none",
                      background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    ✅ Open in Google
                  </a>
                )}

                <button
                  onClick={handleDownloadIcs}
                  disabled={!icsText}
                  style={{
                    padding: "0.85rem 1.2rem",
                    borderRadius: "9999px",
                    border: `1px solid ${theme.borderColor}`,
                    background: "transparent",
                    color: icsText ? theme.primaryColor : theme.mutedColor,
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    cursor: icsText ? "pointer" : "not-allowed",
                  }}
                >
                  ⤓ Download .ics
                </button>
              </div>

              <div style={{ color: theme.mutedColor, fontSize: "0.78rem", marginTop: "0.85rem", opacity: 0.9 }}>
                Includes reminders: 30 days, 7 days, and 1 day before.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }


  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(160deg, ${theme.bgFrom}, ${theme.bgTo})`,
      fontFamily: "'Inter', sans-serif", color: theme.textColor, padding: "2rem 1rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <CulturalBackground themeKey={theme.key} />
      <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", animation: "float 3s ease-in-out infinite" }}>
            {theme.motifs[0]}
          </div>
          <div style={{ color: theme.mutedColor, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            You&apos;re invited to
          </div>
          <h1 style={{ fontFamily: theme.fontHeading, fontSize: "2.2rem", color: theme.textColor, marginBottom: "0.25rem" }}>
            {guest.event.title}
          </h1>
          <p style={{ color: theme.mutedColor, fontSize: "0.85rem" }}>
            Hosted by {guest.event.host.name ?? "The Family"}
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: theme.cardBg, backdropFilter: "blur(16px)",
          border: `1.5px solid ${theme.borderColor}`, borderRadius: "1.25rem", padding: "1.75rem",
          boxShadow: `0 0 40px ${theme.glowColor}`,
        }}>
          <h2 style={{ fontSize: "1.2rem", fontFamily: theme.fontHeading, fontWeight: 700, marginBottom: "0.35rem", color: theme.textColor }}>
            Hello, {guest.name}! 👋
          </h2>
          <p style={{ color: theme.mutedColor, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            Please confirm your attendance for the following ceremonies:
          </p>

          {/* Sub-events */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: theme.mutedColor, marginBottom: "0.75rem", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Which ceremonies will you attend?
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {invitedSubEvents.map((se) => {
                const t = getSubEventTheme(se.subType);
                const checked = attending.includes(se.id);
                return (
                  <label key={se.id} style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.75rem 1rem", borderRadius: "0.75rem", cursor: "pointer",
                    border: `1px solid ${checked ? t.primaryColor + "55" : theme.borderColor}`,
                    background: checked ? `${t.primaryColor}12` : "rgba(255,255,255,0.03)",
                    transition: "all 0.2s",
                  }}>
                    <input type="checkbox" checked={checked} onChange={(e) => {
                      setAttending(e.target.checked ? [...attending, se.id] : attending.filter((id) => id !== se.id));
                    }} style={{ accentColor: t.primaryColor, width: "1rem", height: "1rem" }} />
                    <span style={{ fontSize: "1.1rem" }}>{t.motifs[0]}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: checked ? t.primaryColor : theme.textColor }}>{se.name}</div>
                      <div style={{ fontSize: "0.75rem", color: theme.mutedColor }}>{formatDate(se.date)}{se.venue ? ` · ${se.venue}` : ""}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Headcount */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: theme.mutedColor, marginBottom: "0.5rem", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              How many guests are attending? (including you)
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button
                onClick={() => setActualPersons(Math.max(1, actualPersons - 1))}
                style={{
                  width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: `1px solid ${theme.borderColor}`,
                  background: "transparent", color: theme.textColor, fontSize: "1.2rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                }}
              >−</button>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: theme.primaryColor, minWidth: "2rem", textAlign: "center" }}>
                {actualPersons}
              </span>
              <button
                onClick={() => setActualPersons(Math.min(20, actualPersons + 1))}
                style={{
                  width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: `1px solid ${theme.borderColor}`,
                  background: "transparent", color: theme.textColor, fontSize: "1.2rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                }}
              >+</button>
              <span style={{ fontSize: "0.78rem", color: theme.mutedColor }}>
                {actualPersons === 1 ? "Just me" : `${actualPersons} guests total`}
              </span>
            </div>
          </div>

          {/* Meal preference */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: theme.mutedColor, marginBottom: "0.5rem", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Meal Preference
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[
                { label: "🥦 Vegetarian", value: "Vegetarian" },
                { label: "🍗 Non-Veg", value: "Non-Vegetarian" },
                { label: "🌱 Jain", value: "Jain" },
                { label: "🚫 No Preference", value: "No Preference" },
              ].map((opt) => (
                <button key={opt.value} onClick={() => setMeal(opt.value)} style={{
                  padding: "0.45rem 1rem", borderRadius: "9999px", fontSize: "0.82rem",
                  fontWeight: 500, border: "1px solid", cursor: "pointer", transition: "all 0.2s",
                  borderColor: meal === opt.value ? theme.primaryColor : `${theme.primaryColor}33`,
                  background: meal === opt.value ? `${theme.primaryColor}22` : "transparent",
                  color: meal === opt.value ? theme.primaryColor : theme.mutedColor,
                }}>{opt.label}</button>
              ))}
            </div>
          </div>

          {/* RSVP buttons */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => handleSubmit("declined")}
              disabled={loading}
              style={{
                flex: 1, padding: "0.875rem", borderRadius: "9999px", border: `1px solid ${theme.borderColor}`,
                background: "transparent", color: theme.mutedColor, fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", transition: "all 0.2s",
              }}>
              😔 Can&apos;t Attend
            </button>
            <button
              onClick={() => handleSubmit("confirmed")}
              disabled={loading || attending.length === 0}
              style={{
                flex: 2, padding: "0.875rem", borderRadius: "9999px", border: "none",
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                boxShadow: `0 4px 20px ${theme.glowColor}`,
                opacity: attending.length === 0 ? 0.5 : 1,
              }}>
              {loading ? "Saving..." : "🎉 Confirm RSVP"}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
    </div>
  );
}
