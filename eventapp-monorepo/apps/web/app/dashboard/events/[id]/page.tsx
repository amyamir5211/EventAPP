"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { toast, Toaster } from "sonner";
import { getTheme } from "@/lib/theme";

const SUB_EVENT_THEMES: Record<string, { primary: string; bg: string; emoji: string }> = {
  mehndi:     { primary: "#5a8a00", bg: "rgba(90,138,0,0.08)",   emoji: "🌿" },
  haldi:      { primary: "#d4830a", bg: "rgba(212,131,10,0.08)", emoji: "💛" },
  sangeet:    { primary: "#9333ea", bg: "rgba(147,51,234,0.08)", emoji: "🎶" },
  baraat:     { primary: "#dc2626", bg: "rgba(220,38,38,0.08)",  emoji: "🐴" },
  reception:  { primary: "#c8841a", bg: "rgba(200,132,26,0.08)", emoji: "🥂" },
  engagement: { primary: "#c2185b", bg: "rgba(194,24,91,0.08)",  emoji: "💍" },
  birthday:   { primary: "#0891b2", bg: "rgba(8,145,178,0.08)",  emoji: "🎂" },
  wedding:    { primary: "#c8841a", bg: "rgba(200,132,26,0.08)", emoji: "👰" },
};

const CEREMONY_SUBTYPES = [
  { value: "mehndi", label: "Mehndi 🌿", placeholder: "E.g. Traditional Mehendi Night" },
  { value: "haldi", label: "Haldi 💛", placeholder: "E.g. Joyful Haldi Ceremony" },
  { value: "sangeet", label: "Sangeet 🎶", placeholder: "E.g. Musical Sangeet Gala" },
  { value: "baraat", label: "Baraat 🐴", placeholder: "E.g. Royal Baraat & Varmala" },
  { value: "reception", label: "Reception 🥂", placeholder: "E.g. Elegant Grand Reception" },
  { value: "engagement", label: "Ring Ceremony 💍", placeholder: "E.g. Engagement Promise" },
  { value: "birthday", label: "Birthday Party 🎂", placeholder: "E.g. Birthday Celebration" },
  { value: "wedding", label: "Classic Wedding 🪔", placeholder: "E.g. Sacred Wedding Vows" },
];

const getDashThemeFromEvent = (category: string) => {
  if (category === "birthday") return "birthday";
  if (category === "corporate") return "anniversary";
  if (category === "engagement") return "anniversary";
  return "wedding";
};

export default function EventHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [addingCeremony, setAddingCeremony] = useState(false);

  // Tab State: "ceremonies" | "guests"
  const [activeTab, setActiveTab] = useState<"ceremonies" | "guests">("ceremonies");

  // Ceremony Form State
  const [ceremonyForm, setCeremonyForm] = useState({
    name: "",
    subType: "mehndi",
    date: "",
    venue: "",
    address: "",
    dressCode: "",
    description: "",
  });

  // Guest Hub State
  const [guests, setGuests] = useState<any[]>([]);
  const [archivedGuests, setArchivedGuests] = useState<any[]>([]);
  const [guestLoading, setGuestLoading] = useState(false);
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [addingGuest, setAddingGuest] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);

  // Filter state: "all" | "confirmed" | "declined" | "pending" | "seen" | "archived"
  const [guestFilter, setGuestFilter] = useState<"all"|"confirmed"|"declined"|"pending"|"seen"|"archived">("all");

  // Inline edit expected persons
  const [editingExpected, setEditingExpected] = useState<string | null>(null);
  const [editExpectedValue, setEditExpectedValue] = useState<number>(1);

  // Multi-Selection State
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);

  // Bulk Dispatch Confirmation Modal
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchBatch, setDispatchBatch] = useState(0); // for batching >5 guests
  const [dispatchDone, setDispatchDone] = useState(false);

  // Customizable Message Template
  const [inviteTemplate, setInviteTemplate] = useState(
    "🌸 Dear [Guest Name],\n\nWith warm hearts and joyful blessings, we would be absolutely honored to welcome you to our celebrations. ✨\n\nPlease find our personalized invitation card and RSVP details here: [Invitation Link]\n\nCan't wait to celebrate together! 🪔"
  );
  const [generatingAI, setGeneratingAI] = useState(false);

  // ── Inline event-level editing ───────────────────────────────────
  const [savingEventField, setSavingEventField] = useState(false);

  // ── Inline sub-event (ceremony card) editing ─────────────────────
  const [editingSubEventId, setEditingSubEventId] = useState<string | null>(null);
  const [subEventDraft, setSubEventDraft] = useState<Record<string, string>>({});
  const [savingSubEvent, setSavingSubEvent] = useState(false);

  // Floating background motifs pool
  const [particles, setParticles] = useState<any[]>([]);

  async function fetchEventDetails() {
    try {
      setLoading(true);
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      if (res.ok && data.event) {
        setEvent(data.event);
      } else {
        toast.error("Failed to load event details");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred loading event details");
    } finally {
      setLoading(false);
    }
  }

  async function fetchGuests() {
    try {
      setGuestLoading(true);
      const [activeRes, archivedRes] = await Promise.all([
        fetch(`/api/guests?eventId=${id}&archived=false`),
        fetch(`/api/guests?eventId=${id}&archived=true`),
      ]);
      const activeData = await activeRes.json();
      const archivedData = await archivedRes.json();
      if (activeRes.ok && activeData.guests) {
        setGuests(activeData.guests);
        setSelectedGuestIds([]);
      }
      if (archivedRes.ok && archivedData.guests) {
        setArchivedGuests(archivedData.guests);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load guests");
    } finally {
      setGuestLoading(false);
    }
  }

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (activeTab === "guests") {
      fetchGuests();
    }
  }, [activeTab, id]);

  // Set background particles based on event type
  useEffect(() => {
    if (event) {
      const category = event.eventCategory || "wedding";
      const pool = category === "birthday" 
        ? ["🎈", "🎉", "🎁", "🎂", "🥳"]
        : (category === "corporate" || category === "engagement"
          ? ["💖", "🥂", "🌹", "✨", "🌟"]
          : ["🌸", "🌹", "🌼", "🪔", "✨"]);
      
      const generated = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        motif: pool[i % pool.length],
        delay: i * 0.4,
        x: (i * 7) % 90 + 5,
        y: (i * 11) % 80 + 5,
        size: 1.0 + (i % 3) * 0.4
      }));
      setParticles(generated);
    }
  }, [event]);

  async function handleTogglePublish() {
    try {
      setPublishing(true);
      const newPublishState = !event.isPublished;
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newPublishState }),
      });

      if (res.ok) {
        setEvent((prev: any) => ({ ...prev, isPublished: newPublishState }));
        toast.success(newPublishState ? "Your event page is now LIVE! 🚀" : "Event reverted to draft status.");
      } else {
        toast.error("Failed to update event status");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred");
    } finally {
      setPublishing(false);
    }
  }

  async function handleAddCeremony(e: React.FormEvent) {
    e.preventDefault();
    if (!ceremonyForm.name || !ceremonyForm.date) {
      toast.warning("Ceremony name and date are required!");
      return;
    }

    try {
      setAddingCeremony(true);
      const res = await fetch("/api/sub-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          ...ceremonyForm,
          order: event.subEvents?.length ?? 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.subEvent) {
        toast.success(`${ceremonyForm.name} added successfully! 🎊`);
        setCeremonyForm({
          name: "",
          subType: "mehndi",
          date: "",
          venue: "",
          address: "",
          dressCode: "",
          description: "",
        });
        fetchEventDetails();
      } else {
        toast.error(data.error || "Failed to add ceremony");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding ceremony");
    } finally {
      setAddingCeremony(false);
    }
  }

  async function handleDeleteCeremony(subId: string) {
    if (!confirm("Are you sure you want to delete this ceremony?")) return;

    try {
      const res = await fetch(`/api/sub-events?id=${subId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Ceremony deleted successfully.");
        fetchEventDetails();
      } else {
        toast.error("Failed to delete ceremony");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred");
    }
  }

  async function handlePatchEventField(field: string, value: string) {
    const trimmed = value.trim();
    if (trimmed === (event[field] ?? "")) return;
    if (field === "title" && !trimmed) { toast.warning("Title cannot be empty"); return; }
    try {
      setSavingEventField(true);
      const res = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: trimmed }),
      });
      if (res.ok) {
        setEvent((prev: any) => ({ ...prev, [field]: trimmed }));
        toast.success("Saved ✓");
      } else {
        toast.error("Failed to save");
      }
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    } finally {
      setSavingEventField(false);
    }
  }

  async function handleSaveSubEvent(subId: string) {
    try {
      setSavingSubEvent(true);
      const res = await fetch(`/api/sub-events/${subId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subEventDraft),
      });
      const data = await res.json();
      if (res.ok && data.subEvent) {
        setEvent((prev: any) => ({
          ...prev,
          subEvents: prev.subEvents.map((se: any) =>
            se.id === subId ? { ...se, ...data.subEvent } : se
          ),
        }));
        setEditingSubEventId(null);
        toast.success("Ceremony updated ✓");
      } else {
        toast.error(data.error || "Failed to save ceremony");
      }
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    } finally {
      setSavingSubEvent(false);
    }
  }

  async function handleGenerateAITemplate() {
    if (!event) return;
    setGeneratingAI(true);
    try {
      const res = await fetch("/api/ai/invite-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTitle: event.title,
          eventCategory: event.eventCategory,
          culturalTheme: event.culturalTheme,
          hostName: event.hostName || event.host?.name || "",
          subEvents: event.subEvents?.map((s: any) => s.name) ?? [],
        }),
      });
      const data = await res.json();
      if (res.ok && data.template) {
        setInviteTemplate(data.template);
        toast.success("✨ AI invite text generated!");
      } else {
        toast.error(data.error || "AI generation failed");
      }
    } catch (e) {
      console.error(e);
      toast.error("Could not reach AI service");
    } finally {
      setGeneratingAI(false);
    }
  }

  async function handleAddGuest(e: React.FormEvent) {
    e.preventDefault();
    if (!newGuestName) {
      toast.warning("Guest Name is required!");
      return;
    }

    try {
      setAddingGuest(true);
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          name: newGuestName,
          phone: newGuestPhone,
          email: newGuestEmail,
        }),
      });

      const data = await res.json();
      if (res.ok && data.guest) {
        toast.success(`${newGuestName} added successfully! 👥`);
        setNewGuestName("");
        setNewGuestPhone("");
        setNewGuestEmail("");
        fetchGuests();
        setEvent((prev: any) => ({
          ...prev,
          _count: { ...prev._count, guests: (prev._count?.guests ?? 0) + 1 }
        }));
      } else {
        toast.error(data.error || "Failed to add guest");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred adding guest");
    } finally {
      setAddingGuest(false);
    }
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!bulkText.trim()) {
      toast.warning("Please paste guest data first!");
      return;
    }

    try {
      setBulkUploading(true);
      const lines = bulkText.split("\n");
      const guestsToUpload = [];

      for (const line of lines) {
        if (!line.trim()) continue;
        const parts = line.split(/[,;\t]/);
        const name = parts[0]?.trim();
        const phone = parts[1]?.trim() || "";

        if (name) {
          guestsToUpload.push({ name, phone });
        }
      }

      if (guestsToUpload.length === 0) {
        toast.warning("No valid guest entries found in paste!");
        return;
      }

      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          guests: guestsToUpload,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Ingested ${data.count} guests successfully in bulk! 🚀`);
        setBulkText("");
        fetchGuests();
        setEvent((prev: any) => ({
          ...prev,
          _count: { ...prev._count, guests: (prev._count?.guests ?? 0) + data.count }
        }));
      } else {
        toast.error(data.error || "Bulk upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error bulk uploading guests");
    } finally {
      setBulkUploading(false);
    }
  }

  async function handleDeleteGuest(guestId: string, name: string) {
    if (!confirm(`Archive ${name}? You can restore them later from the Archived section.`)) return;

    try {
      const res = await fetch(`/api/guests?id=${guestId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`${name} archived. Restore anytime from the Archived filter.`);
        fetchGuests();
        setEvent((prev: any) => ({
          ...prev,
          _count: { ...prev._count, guests: Math.max(0, (prev._count?.guests ?? 1) - 1) }
        }));
      } else {
        toast.error("Failed to archive guest");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred");
    }
  }

  async function handleRestoreGuest(guestId: string, name: string) {
    try {
      const res = await fetch("/api/guests/restore", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: guestId }),
      });
      if (res.ok) {
        toast.success(`${name} restored to active guest list! 🎉`);
        fetchGuests();
        setEvent((prev: any) => ({
          ...prev,
          _count: { ...prev._count, guests: (prev._count?.guests ?? 0) + 1 }
        }));
      } else {
        toast.error("Failed to restore guest");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  }

  async function handlePermanentDelete(guestId: string, name: string) {
    if (!confirm(`Permanently delete ${name}? This CANNOT be undone.`)) return;
    try {
      const res = await fetch(`/api/guests/restore?id=${guestId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`${name} permanently deleted.`);
        fetchGuests();
      } else {
        toast.error("Failed to permanently delete guest");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  }

  async function handleSaveExpectedPersons(guestId: string) {
    try {
      const res = await fetch("/api/guests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: guestId, expectedPersons: editExpectedValue }),
      });
      if (res.ok) {
        setGuests(prev => prev.map(g => g.id === guestId ? { ...g, expectedPersons: editExpectedValue } : g));
        toast.success("Expected headcount updated!");
      }
    } catch (e) {
      toast.error("Failed to update expected persons");
    } finally {
      setEditingExpected(null);
    }
  }

  function handleToggleSelectGuest(guestId: string) {
    setSelectedGuestIds((prev) =>
      prev.includes(guestId) ? prev.filter((id) => id !== guestId) : [...prev, guestId]
    );
  }

  function handleToggleSelectAll() {
    const filtered = getFilteredGuests();
    if (selectedGuestIds.length === filtered.length && filtered.length > 0) {
      setSelectedGuestIds([]);
    } else {
      setSelectedGuestIds(filtered.map((g) => g.id));
    }
  }

  function getFilteredGuests() {
    switch (guestFilter) {
      case "confirmed": return guests.filter(g => g.rsvpStatus === "CONFIRMED");
      case "declined": return guests.filter(g => g.rsvpStatus === "DECLINED");
      case "pending": return guests.filter(g => g.rsvpStatus === "PENDING" && !g.inviteViewedAt);
      case "seen": return guests.filter(g => g.rsvpStatus === "PENDING" && g.inviteViewedAt);
      case "archived": return archivedGuests;
      default: return guests;
    }
  }

  function handleLaunchBulkDispatch() {
    setDispatchBatch(0);
    setDispatchDone(false);
    setShowDispatchModal(true);
  }

  function handleFireBatch(batchIndex: number) {
    const validGuests = guests
      .filter(g => selectedGuestIds.includes(g.id) && g.phone);
    const batchSize = 5;
    const start = batchIndex * batchSize;
    const batch = validGuests.slice(start, start + batchSize);

    batch.forEach((guest, i) => {
      setTimeout(() => {
        const cleanedPhone = cleanPhone(guest.phone);
        const message = compileMessage(guest);
        const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, `_wa_${guest.id}`);
      }, i * 200);
    });

    const nextBatch = batchIndex + 1;
    const totalBatches = Math.ceil(validGuests.length / batchSize);
    if (nextBatch >= totalBatches) {
      setDispatchDone(true);
    } else {
      setDispatchBatch(nextBatch);
    }

    toast.success(`📲 Opened ${batch.length} WhatsApp chats! Go tap Send in each tab.`);
  }

  function compileMessage(guest: any) {
    const hostOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
    const inviteLink = `${hostOrigin}/e/${event.slug}?g=${guest.rsvpToken}`;
    return inviteTemplate
      .replace(/\[Guest Name\]/g, guest.name)
      .replace(/\[Invitation Link\]/g, inviteLink);
  }

  function cleanPhone(phone: string) {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      cleaned = "91" + cleaned;
    }
    return cleaned;
  }

  function handleSendWhatsApp(guest: any) {
    if (!guest.phone) {
      toast.error(`No phone number provided for ${guest.name}!`);
      return;
    }

    const cleanedPhone = cleanPhone(guest.phone);
    const message = compileMessage(guest);
    const waUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
    
    toast.success(`Opening WhatsApp invite for ${guest.name}! 📲`);
    window.open(waUrl, "_blank");
  }

  const currentFormTypeTheme = SUB_EVENT_THEMES[ceremonyForm.subType] ?? SUB_EVENT_THEMES.wedding!;
  const currentCeremonyLabel = CEREMONY_SUBTYPES.find(c => c.value === ceremonyForm.subType)?.label || ceremonyForm.subType;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #FEF9EC 0%, #FFF1F3 100%)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#2C1810", fontFamily: "'Poppins', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", animation: "spin 2s linear infinite", marginBottom: "1rem" }}>✨</div>
          <div className="font-playfair" style={{ fontWeight: 600 }}>Loading luxury event hub...</div>
        </div>
        <style>{`@keyframes spin { 100%{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(135deg, #FEF9EC 0%, #FFF1F3 100%)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#2C1810", fontFamily: "'Poppins', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <div className="font-playfair" style={{ fontWeight: 700, fontSize: "1.5rem" }}>Event not found.</div>
          <Link href="/dashboard" className="festive-btn-ghost" style={{ marginTop: "1rem", display: "inline-block" }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const eventTheme = getTheme(event.culturalTheme || "wedding");
  const dashTheme = getDashThemeFromEvent(event.eventCategory);

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
        transition: "background 0.5s ease"
      }}
    >
      {/* Falling background decoration elements */}
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

      <Toaster theme="light" closeButton richColors />

      {/* Top Nav */}
      <nav style={{
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "2px solid var(--dash-card-border)", background: "var(--dash-nav-bg)",
        backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 6px 24px rgba(0,0,0,0.04)", transition: "background 0.5s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <span className="font-playfair" style={{
              fontSize: "1.5rem", fontWeight: 700,
              background: "linear-gradient(135deg, var(--dash-secondary), var(--dash-primary))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Utsav ✨</span>
          </Link>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <Link href="/dashboard" className="festive-btn-ghost" style={{
              padding: "0.45rem 1.1rem", fontSize: "0.82rem",
            }}>← Dashboard</Link>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span className="font-poppins" style={{ fontSize: "0.85rem", color: "var(--dash-muted)", fontWeight: 600 }}>Host Console</span>
          <div style={{
            width: "2.25rem", height: "2.25rem", borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.8)", border: "2px solid var(--dash-card-border)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem"
          }}>👤</div>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", paddingBottom: "8rem", position: "relative", zIndex: 10 }}>
        
        {/* Header Block */}
        <div className="festive-card" style={{
          padding: "2rem", marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}>
          {/* Editable event metadata */}
          <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{eventTheme.emoji}</span>
              <span className="font-poppins" style={{
                textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em",
                color: "var(--dash-secondary)"
              }}>
                {event.eventCategory} · {event.culturalTheme} Theme
              </span>
              {savingEventField && <span style={{ fontSize: "0.7rem", color: "var(--dash-muted)", marginLeft: "0.5rem" }}>saving…</span>}
            </div>

            {/* Editable Title */}
            <input
              defaultValue={event.title}
              onBlur={(e) => handlePatchEventField("title", e.target.value)}
              className="font-playfair"
              style={{
                fontSize: "1.9rem", fontWeight: 700,
                color: "var(--dash-text)", background: "transparent", border: "none", outline: "none",
                borderBottom: "1.5px dashed var(--dash-card-border)", width: "100%",
                marginBottom: "0.5rem", padding: "0.1rem 0", cursor: "text"
              }}
            />

            {/* Editable Description */}
            <textarea
              key={event.id + "-desc"}
              defaultValue={event.description ?? ""}
              onBlur={(e) => handlePatchEventField("description", e.target.value)}
              placeholder="Add a short event description…"
              rows={2}
              style={{
                color: "var(--dash-text)", fontSize: "0.92rem", maxWidth: "600px",
                background: "transparent", border: "none", outline: "none",
                borderBottom: "1px dashed var(--dash-card-border)", width: "100%",
                resize: "none", fontFamily: "inherit", padding: "0.1rem 0", marginBottom: "0.75rem"
              }}
            />

            {/* Editable Host Display Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--dash-muted)", whiteSpace: "nowrap" }}>🎐 Hosted by:</span>
              <input
                key={event.id + "-host"}
                defaultValue={event.hostName ?? ""}
                onBlur={(e) => handlePatchEventField("hostName", e.target.value)}
                placeholder="Your display name (e.g. Ravi & Priya)"
                style={{
                  fontSize: "0.88rem", fontWeight: 600, color: "var(--dash-text)",
                  background: "transparent", border: "none", outline: "none",
                  borderBottom: "1px dashed var(--dash-card-border)", flex: 1,
                  padding: "0.1rem 0", fontFamily: "inherit"
                }}
              />
            </div>
          </div>

          {/* Right: actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "220px", position: "relative", zIndex: 2 }}>
            <button
              onClick={handleTogglePublish}
              disabled={publishing}
              style={{
                padding: "0.6rem 1.25rem", borderRadius: "9999px", border: "2px solid",
                borderColor: event.isPublished ? "rgba(74,222,128,0.3)" : "rgba(251,191,36,0.3)",
                background: event.isPublished ? "rgba(74,222,128,0.15)" : "rgba(251,191,36,0.15)",
                color: event.isPublished ? "#15803d" : "#b45309",
                fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              {event.isPublished ? "● Live (Switch to Draft)" : "○ Draft (Publish Live)"}
            </button>
            <Link
              href={`/e/${event.slug}`}
              target="_blank"
              className="festive-btn-ghost"
              style={{
                padding: "0.6rem 1.25rem", fontSize: "0.85rem", textAlign: "center"
              }}
            >
              View Public Page ↗
            </Link>
          </div>
        </div>

        {/* Dynamic Metrics row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem", marginBottom: "2rem"
        }}>
          {[
            { label: "Guests Invited", value: (event._count?.guests ?? 0).toString(), icon: "👥", color: "var(--dash-secondary)" },
            { label: "Sub-Events (Ceremonies)", value: (event.subEvents?.length ?? 0).toString(), icon: "🌟", color: "var(--dash-secondary)" },
            { label: "Shagun Collected", value: `₹${((event.totalShagun ?? 0) / 100).toLocaleString("en-IN")}`, icon: "💸", color: "var(--dash-secondary)" },
          ].map((m) => (
            <div key={m.label} className="festive-card" style={{
              padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "center"
            }}>
              <div style={{ fontSize: "2rem" }}>{m.icon}</div>
              <div>
                <div className="font-playfair" style={{ fontSize: "1.6rem", fontWeight: 700, color: m.color }}>{m.value}</div>
                <div className="font-poppins" style={{ fontSize: "0.8rem", color: "var(--dash-muted)", marginTop: "0.1rem", fontWeight: 600 }}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Console Switcher (Tabs) */}
        <div style={{
          display: "flex", background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "0.75rem", padding: "0.3rem", marginBottom: "2.5rem", maxWidth: "480px",
          border: "1px solid var(--dash-card-border)"
        }}>
          <button
            onClick={() => setActiveTab("ceremonies")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "none",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, transition: "all 0.2s",
              background: activeTab === "ceremonies" ? "var(--dash-button-grad)" : "transparent",
              color: activeTab === "ceremonies" ? "#ffffff" : "var(--dash-muted)"
            }}
          >
            🗓️ Ceremonies & Timeline ({event.subEvents?.length ?? 0})
          </button>
          <button
            onClick={() => setActiveTab("guests")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "none",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, transition: "all 0.2s",
              background: activeTab === "guests" ? "var(--dash-button-grad)" : "transparent",
              color: activeTab === "guests" ? "#ffffff" : "var(--dash-muted)"
            }}
          >
            👥 Guests & Invites ({event._count?.guests ?? 0})
          </button>
        </div>

        {/* Tab 1: Ceremonies TIMELINE */}
        {activeTab === "ceremonies" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "start" }}>
            
            {/* Timeline cards */}
            <div>
              <h2 className="font-playfair" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--dash-text)", marginBottom: "1.5rem" }}>
                🗓️ Ceremony Schedule
              </h2>

              {event.subEvents && event.subEvents.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {event.subEvents.map((se: any) => {
                    const t = SUB_EVENT_THEMES[se.subType] ?? SUB_EVENT_THEMES.wedding!;
                    const isEditing = editingSubEventId === se.id;
                    const eventDate = new Date(se.date).toLocaleString("en-IN", {
                      day: "numeric", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit", hour12: true
                    });
                    const isoLocal = new Date(se.date).toISOString().slice(0, 16);

                    return (
                      <div key={se.id} className="festive-card" style={{
                        padding: "1.5rem", position: "relative"
                      }}>
                        {/* Top action buttons */}
                        <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", display: "flex", gap: "0.5rem", zIndex: 3 }}>
                          {!isEditing && (
                            <button
                              onClick={() => {
                                setEditingSubEventId(se.id);
                                setSubEventDraft({
                                  name: se.name,
                                  subType: se.subType ?? "wedding",
                                  date: isoLocal,
                                  venue: se.venue ?? "",
                                  address: se.address ?? "",
                                  dressCode: se.dressCode ?? "",
                                  description: se.description ?? "",
                                });
                              }}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "var(--dash-secondary)", fontSize: "0.82rem", fontWeight: 700
                              }}
                            >✏️ Edit</button>
                          )}
                          {!isEditing && (
                            <button
                              onClick={() => handleDeleteCeremony(se.id)}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "#ef4444", fontSize: "0.82rem", fontWeight: 700
                              }}
                            >🗑️ Delete</button>
                          )}
                        </div>

                        {/* ── VIEW MODE ── */}
                        {!isEditing && (
                          <>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                              <span style={{ fontSize: "1.5rem" }}>{t.emoji}</span>
                              <h3 className="font-playfair" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--dash-text)" }}>{se.name}</h3>
                              <span className="font-poppins" style={{
                                padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700,
                                background: t.bg, color: t.primary, border: `1px solid ${t.primary}33`, marginLeft: "0.5rem"
                              }}>{se.subType}</span>
                            </div>
                            <div className="font-poppins" style={{
                              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem",
                              fontSize: "0.85rem", color: "var(--dash-text)", marginTop: "0.75rem"
                            }}>
                              <div>📅 <strong>Date:</strong> {eventDate}</div>
                              <div>👗 <strong>Dress Code:</strong> {se.dressCode || "Ethnic/Festive Wear"}</div>
                              <div style={{ gridColumn: "1/3" }}>📍 <strong>Venue:</strong> {se.venue} ({se.address || "No address"})</div>
                            </div>
                            {se.description && (
                              <p className="font-poppins" style={{
                                fontSize: "0.8rem", color: "var(--dash-muted)", marginTop: "0.75rem",
                                borderTop: "1px solid var(--dash-card-border)", paddingTop: "0.75rem"
                              }}>{se.description}</p>
                            )}
                          </>
                        )}

                        {/* ── EDIT MODE ── */}
                        {isEditing && (
                          <div style={{ paddingRight: "0" }}>
                            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <span style={{ fontSize: "1.5rem" }}>{t.emoji}</span>
                              <span className="font-playfair" style={{ fontWeight: 700, color: "var(--dash-secondary)", fontSize: "1.05rem" }}>Editing Ceremony Details</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
                              {/* Name */}
                              <div style={{ gridColumn: "1/3" }}>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Ceremony Name</label>
                                <input
                                  value={subEventDraft.name ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, name: e.target.value }))}
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.9rem", fontFamily: "inherit"
                                  }}
                                />
                              </div>
                              {/* Sub-type */}
                              <div>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Type</label>
                                <select
                                  value={subEventDraft.subType ?? "wedding"}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, subType: e.target.value }))}
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem"
                                  }}
                                >
                                  {CEREMONY_SUBTYPES.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                  ))}
                                </select>
                              </div>
                              {/* Date */}
                              <div>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Date & Time</label>
                                <input
                                  type="datetime-local"
                                  value={subEventDraft.date ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, date: e.target.value }))}
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem"
                                  }}
                                />
                              </div>
                              {/* Dress Code */}
                              <div>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Dress Code</label>
                                <input
                                  value={subEventDraft.dressCode ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, dressCode: e.target.value }))}
                                  placeholder="E.g. Ethnic/Festive Wear"
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem", fontFamily: "inherit"
                                  }}
                                />
                              </div>
                              {/* Venue */}
                              <div style={{ gridColumn: "1/3" }}>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Venue Name</label>
                                <input
                                  value={subEventDraft.venue ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, venue: e.target.value }))}
                                  placeholder="E.g. JW Marriott Ballroom"
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem", fontFamily: "inherit"
                                  }}
                                />
                              </div>
                              {/* Address */}
                              <div style={{ gridColumn: "1/3" }}>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Address</label>
                                <input
                                  value={subEventDraft.address ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, address: e.target.value }))}
                                  placeholder="Full venue address"
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem", fontFamily: "inherit"
                                  }}
                                />
                              </div>
                              {/* Description */}
                              <div style={{ gridColumn: "1/3" }}>
                                <label style={{ display: "block", fontSize: "0.73rem", color: "var(--dash-muted)", marginBottom: "0.25rem", fontWeight: 600 }}>Welcome / Description</label>
                                <textarea
                                  value={subEventDraft.description ?? ""}
                                  onChange={(e) => setSubEventDraft(d => ({ ...d, description: e.target.value }))}
                                  rows={2}
                                  placeholder="A short message guests will see for this ceremony…"
                                  style={{
                                    width: "100%", padding: "0.55rem 0.75rem", borderRadius: "0.5rem",
                                    background: "#ffffff", border: "2px solid var(--dash-card-border)",
                                    color: "var(--dash-text)", outline: "none", fontSize: "0.88rem",
                                    resize: "none", fontFamily: "inherit"
                                  }}
                                />
                              </div>
                            </div>
                            {/* Edit mode action row */}
                            <div style={{ display: "flex", gap: "0.65rem", justifyContent: "flex-end" }}>
                              <button
                                onClick={() => setEditingSubEventId(null)}
                                className="festive-btn-ghost"
                                style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }}
                              >✖ Cancel</button>
                              <button
                                onClick={() => handleSaveSubEvent(se.id)}
                                disabled={savingSubEvent}
                                className="festive-btn-primary"
                                style={{ padding: "0.4rem 1.25rem", fontSize: "0.78rem" }}
                              >{savingSubEvent ? "Saving…" : "💾 Save Changes"}</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="festive-card" style={{
                  padding: "3rem 1.5rem", textAlign: "center"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🪔</div>
                  <div className="font-playfair" style={{ fontWeight: 600 }}>No ceremonies added yet.</div>
                  <p className="font-poppins" style={{ fontSize: "0.85rem", color: "var(--dash-muted)", marginTop: "0.25rem" }}>Use the dynamic builder on the right to append your first ceremony!</p>
                </div>
              )}
            </div>

            {/* Creator form */}
            <div>
              <h2 className="font-playfair" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--dash-text)", marginBottom: "1.5rem" }}>
                ✨ Ceremony Creator
              </h2>

              <form
                onSubmit={handleAddCeremony}
                className="festive-card"
                style={{
                  padding: "2rem",
                  boxShadow: `0 12px 40px var(--dash-card-shadow)`,
                  border: "2.5px solid var(--dash-card-border)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "2rem" }}>{currentFormTypeTheme.emoji}</span>
                  <div>
                    <h3 className="font-playfair" style={{
                      fontSize: "1.2rem", fontWeight: 700,
                      color: "var(--dash-secondary)"
                    }}>
                      Add Ceremony
                    </h3>
                    <div className="font-poppins" style={{ fontSize: "0.75rem", color: "var(--dash-muted)" }}>
                      Accents dynamically matched to ceremony type
                    </div>
                  </div>
                </div>

                {/* Ceremony Subtype Selector */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Ceremony Type
                  </label>
                  <select
                    value={ceremonyForm.subType}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      const match = CEREMONY_SUBTYPES.find((s) => s.value === selectedType);
                      setCeremonyForm((prev) => ({
                        ...prev,
                        subType: selectedType,
                        name: prev.name === "" ? (match?.label.replace(/[^a-zA-Z\s]/g, "").trim() || "") : prev.name
                      }));
                    }}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: `2px solid var(--dash-card-border)`,
                      color: "var(--dash-text)", outline: "none", fontSize: "0.95rem"
                    }}
                  >
                    {CEREMONY_SUBTYPES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Ceremony Title */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Ceremony Name
                  </label>
                  <input
                    type="text"
                    placeholder={CEREMONY_SUBTYPES.find((s) => s.value === ceremonyForm.subType)?.placeholder || "E.g. Musical Evening"}
                    value={ceremonyForm.name}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, name: e.target.value })}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.95rem"
                    }}
                    required
                  />
                </div>

                {/* Ceremony Date & Time */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={ceremonyForm.date}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, date: e.target.value })}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.85rem"
                    }}
                    required
                  />
                </div>

                {/* Venue Name */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Venue Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. The Grand Ballroom, Hotel Leela"
                    value={ceremonyForm.venue}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, venue: e.target.value })}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.95rem"
                    }}
                  />
                </div>

                {/* Venue Address */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Diplomatic Enclave, Chanakyapuri, New Delhi"
                    value={ceremonyForm.address}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, address: e.target.value })}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.95rem", fontFamily: "inherit"
                    }}
                  />
                </div>

                {/* Dress Code */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Dress Code
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Traditional Ethnic — yellows & oranges"
                    value={ceremonyForm.dressCode}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, dressCode: e.target.value })}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.85rem"
                    }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <label className="font-poppins" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--dash-text)" }}>
                    Welcome / Description
                  </label>
                  <textarea
                    placeholder="E.g. Join us for a fun-filled afternoon of music, dance, and henna! 🌿"
                    value={ceremonyForm.description}
                    onChange={(e) => setCeremonyForm({ ...ceremonyForm, description: e.target.value })}
                    rows={3}
                    style={{
                      width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                      background: "#ffffff", border: "2px solid var(--dash-card-border)",
                      color: "var(--dash-text)", outline: "none", fontSize: "0.95rem", fontFamily: "inherit"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={addingCeremony}
                  className="festive-btn-primary"
                  style={{
                    width: "100%", padding: "0.8rem", fontSize: "0.95rem",
                  }}
                >
                  {addingCeremony ? "Adding Ceremony..." : `🚀 Add ${currentCeremonyLabel}`}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Guest Management Hub */}
        {activeTab === "guests" && (() => {
          const filteredGuests = getFilteredGuests();
          const totalGuests = guests.length;
          const confirmed = guests.filter(g => g.rsvpStatus === "CONFIRMED").length;
          const declined = guests.filter(g => g.rsvpStatus === "DECLINED").length;
          const seenNoReply = guests.filter(g => g.rsvpStatus === "PENDING" && g.inviteViewedAt).length;
          const notOpened = guests.filter(g => g.rsvpStatus === "PENDING" && !g.inviteViewedAt).length;
          const expectedTotal = guests.filter(g => g.rsvpStatus !== "DECLINED").reduce((sum, g) => sum + (g.expectedPersons || 0), 0);
          const actualTotal = guests.filter(g => g.rsvpStatus === "CONFIRMED").reduce((sum, g) => sum + (g.actualPersons || 0), 0);
          const vegCount = guests.filter(g => g.mealPreference === "Vegetarian").length;
          const nonVegCount = guests.filter(g => g.mealPreference === "Non-Vegetarian").length;
          const jainCount = guests.filter(g => g.mealPreference === "Jain").length;

          const FILTERS: { key: string; label: string; count: number; color: string }[] = [
            { key: "all", label: "All", count: totalGuests, color: "var(--dash-text)" },
            { key: "confirmed", label: "✅ Confirmed", count: confirmed, color: "#16a34a" },
            { key: "declined", label: "❌ Declined", count: declined, color: "#dc2626" },
            { key: "pending", label: "⏳ Not Opened", count: notOpened, color: "var(--dash-muted)" },
            { key: "seen", label: "👁️ Seen — No Reply", count: seenNoReply, color: "#d97706" },
            { key: "archived", label: "🗑️ Archived", count: archivedGuests.length, color: "#475569" },
          ];

          return (
            <div>
              {/* Analytics Tiles */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.85rem", marginBottom: "1.75rem" }}>
                {[
                  { icon: "👥", label: "Total Guests", value: totalGuests, color: "var(--dash-secondary)" },
                  { icon: "✅", label: "Confirmed", value: confirmed, color: "#16a34a" },
                  { icon: "❌", label: "Declined", value: declined, color: "#dc2626" },
                  { icon: "👁️", label: "Seen — No Reply", value: seenNoReply, color: "#d97706" },
                  { icon: "⏳", label: "Not Opened", value: notOpened, color: "var(--dash-muted)" },
                  { icon: "👥", label: "Exp. Headcount", value: expectedTotal || "—", color: "var(--dash-secondary)" },
                  { icon: "👤", label: "Actual Persons", value: actualTotal || "—", color: "var(--dash-primary)" },
                ].map((m) => (
                  <div key={m.label} className="festive-card" style={{
                    padding: "1rem", display: "flex", gap: "0.75rem", alignItems: "center"
                  }}>
                    <div style={{ fontSize: "1.4rem" }}>{m.icon}</div>
                    <div>
                      <div className="font-playfair" style={{ fontSize: "1.3rem", fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.value}</div>
                      <div className="font-poppins" style={{ fontSize: "0.7rem", color: "var(--dash-muted)", marginTop: "0.2rem", fontWeight: 600 }}>{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meal Breakdown */}
              {(vegCount + nonVegCount + jainCount) > 0 && (
                <div className="festive-card" style={{
                  padding: "0.75rem 1.25rem", marginBottom: "1.5rem",
                  display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap"
                }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--dash-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>🍽️ Meal Preferences:</span>
                  {vegCount > 0 && <span style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 600 }}>🥦 Veg: {vegCount}</span>}
                  {nonVegCount > 0 && <span style={{ fontSize: "0.82rem", color: "#ea580c", fontWeight: 600 }}>🍗 Non-Veg: {nonVegCount}</span>}
                  {jainCount > 0 && <span style={{ fontSize: "0.82rem", color: "#65a30d", fontWeight: 600 }}>🌱 Jain: {jainCount}</span>}
                </div>
              )}

              {/* Main Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", alignItems: "start" }}>

                {/* Left: Directory */}
                <div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {guestFilter !== "archived" && (
                          <input
                            type="checkbox"
                            checked={filteredGuests.length > 0 && filteredGuests.every(g => selectedGuestIds.includes(g.id))}
                            onChange={handleToggleSelectAll}
                            style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer", accentColor: "var(--dash-secondary)" }}
                            title="Select / Deselect All Visible"
                          />
                        )}
                        <h2 className="font-playfair" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--dash-text)" }}>
                          👥 Guest Directory
                        </h2>
                      </div>
                      <button onClick={fetchGuests} style={{ background: "transparent", border: "none", color: "var(--dash-secondary)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>⟳ Sync</button>
                    </div>

                    {/* Filter pills */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {FILTERS.map(f => (
                        <button key={f.key} onClick={() => setGuestFilter(f.key as any)} style={{
                          padding: "0.3rem 0.8rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700,
                          border: `1.5px solid ${guestFilter === f.key ? f.color : "var(--dash-card-border)"}`,
                          background: guestFilter === f.key ? `${f.color}15` : "#ffffff",
                          color: guestFilter === f.key ? f.color : "var(--dash-muted)",
                          cursor: "pointer", transition: "all 0.2s",
                          display: "flex", alignItems: "center", gap: "0.35rem"
                        }}>
                          {f.label}
                          <span style={{
                            background: guestFilter === f.key ? f.color : "var(--dash-card-border)",
                            color: guestFilter === f.key ? "#ffffff" : "var(--dash-text)",
                            borderRadius: "9999px", padding: "0.05rem 0.4rem", fontSize: "0.7rem", fontWeight: 700
                          }}>{f.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {guestLoading ? (
                    <div style={{ padding: "3rem", textAlign: "center", color: "var(--dash-muted)" }}>Loading guests...</div>
                  ) : guestFilter === "archived" ? (
                    // Archive Drawer
                    archivedGuests.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {archivedGuests.map((g) => (
                          <div key={g.id} className="festive-card" style={{
                            padding: "1rem 1.25rem",
                            display: "flex", alignItems: "center", gap: "1rem", opacity: 0.8
                          }}>
                            <div style={{
                              width: "2.25rem", height: "2.25rem", borderRadius: "50%",
                              background: "var(--dash-card-border)", display: "flex", alignItems: "center",
                              justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "var(--dash-text)"
                            }}>{g.name.charAt(0).toUpperCase()}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, color: "var(--dash-text)", fontSize: "0.9rem" }}>{g.name}</div>
                              <div style={{ fontSize: "0.72rem", color: "var(--dash-muted)", marginTop: "0.1rem" }}>
                                {g.phone || "No phone"} · Archived {g.archivedAt ? new Date(g.archivedAt).toLocaleDateString("en-IN") : ""}
                              </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                onClick={() => handleRestoreGuest(g.id, g.name)}
                                className="festive-btn-ghost"
                                style={{ padding: "0.35rem 0.8rem", fontSize: "0.75rem", borderRadius: "0.35rem" }}
                              >↩ Restore</button>
                              <button
                                onClick={() => handlePermanentDelete(g.id, g.name)}
                                style={{
                                  padding: "0.35rem 0.8rem", borderRadius: "0.35rem", border: "1px solid #ef4444",
                                  background: "rgba(239,68,68,0.08)", color: "#ef4444",
                                  fontSize: "0.75rem", fontWeight: 600, cursor: "pointer"
                                }}
                              >🗑️ Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="festive-card" style={{
                        padding: "3rem 1.5rem", textAlign: "center", color: "var(--dash-muted)"
                      }}>
                        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🗑️</div>
                        <div className="font-playfair" style={{ fontWeight: 600 }}>No archived guests.</div>
                        <p style={{ fontSize: "0.85rem" }}>Deleted guests will appear here so you can restore them if needed.</p>
                      </div>
                    )
                  ) : filteredGuests.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {filteredGuests.map((g) => {
                        const hostOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
                        const personalLink = `${hostOrigin}/e/${event.slug}?g=${g.rsvpToken}`;
                        const isSelected = selectedGuestIds.includes(g.id);
                        const isSeen = g.inviteViewedAt && g.rsvpStatus === "PENDING";

                        let statusColor = "#b45309";
                        let statusBg = "rgba(245,158,11,0.08)";
                        if (g.rsvpStatus === "CONFIRMED") { statusColor = "#16a34a"; statusBg = "rgba(22,163,74,0.08)"; }
                        else if (g.rsvpStatus === "DECLINED") { statusColor = "#dc2626"; statusBg = "rgba(220,38,38,0.08)"; }

                        return (
                          <div key={g.id} className="festive-card" style={{
                            background: isSelected ? "rgba(240, 165, 0, 0.05)" : "var(--dash-card-bg)",
                            border: isSelected ? "2.5px solid var(--dash-secondary)" : "2px solid var(--dash-card-border)",
                            padding: "1rem 1.25rem",
                            display: "flex", alignItems: "flex-start", gap: "0.85rem", transition: "all 0.2s"
                          }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectGuest(g.id)}
                              style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer", accentColor: "var(--dash-secondary)", marginTop: "0.25rem", flexShrink: 0 }}
                            />

                            {/* Avatar */}
                            <div style={{
                              width: "2.25rem", height: "2.25rem", borderRadius: "50%", flexShrink: 0,
                              background: `${statusColor}18`, border: `1px solid ${statusColor}44`,
                              display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                              fontSize: "0.95rem", fontWeight: 700, color: statusColor
                            }}>{g.name.charAt(0).toUpperCase()}</div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              {/* Row 1: Name + badges */}
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                                <span style={{ fontWeight: 700, color: "var(--dash-text)", fontSize: "0.95rem" }}>{g.name}</span>
                                <span style={{
                                  padding: "0.12rem 0.45rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700,
                                  color: statusColor, background: statusBg, border: `1px solid ${statusColor}33`
                                }}>{g.rsvpStatus}</span>
                                {isSeen && (
                                  <span style={{
                                    padding: "0.12rem 0.45rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 700,
                                    color: "#b45309", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)"
                                  }}>👁️ Seen</span>
                                )}
                                {g.mealPreference && (
                                  <span style={{
                                    padding: "0.12rem 0.45rem", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 600,
                                    color: "var(--dash-muted)", background: "rgba(255,255,255,0.8)", border: "1px solid var(--dash-card-border)"
                                  }}>🍽️ {g.mealPreference}</span>
                                )}
                              </div>

                              {/* Row 2: Phone + headcount */}
                              <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--dash-muted)", marginBottom: "0.4rem", flexWrap: "wrap", fontWeight: 500 }}>
                                {g.phone && <span>📞 {g.phone}</span>}
                                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                  👥 Headcount:
                                  {editingExpected === g.id ? (
                                    <>
                                      <input
                                        type="number" min={1} max={50}
                                        value={editExpectedValue}
                                        onChange={e => setEditExpectedValue(Number(e.target.value))}
                                        style={{
                                          width: "3rem", padding: "0.1rem 0.3rem", borderRadius: "0.25rem",
                                          background: "#ffffff", border: "2px solid var(--dash-secondary)",
                                          color: "var(--dash-text)", fontSize: "0.8rem", outline: "none"
                                        }}
                                        onKeyDown={e => { if (e.key === "Enter") handleSaveExpectedPersons(g.id); if (e.key === "Escape") setEditingExpected(null); }}
                                        autoFocus
                                      />
                                      <button onClick={() => handleSaveExpectedPersons(g.id)} style={{ background: "none", border: "none", color: "#16a34a", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}>✓</button>
                                      <button onClick={() => setEditingExpected(null)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}>✕</button>
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => { setEditingExpected(g.id); setEditExpectedValue(g.expectedPersons || 1); }}
                                      style={{
                                        background: "none", border: "none", cursor: "pointer",
                                        color: "var(--dash-secondary)",
                                        fontSize: "0.8rem", textDecoration: "underline dotted", fontWeight: 600
                                      }}
                                    >{g.expectedPersons || "Set"}</button>
                                  )}
                                  {g.actualPersons && <span style={{ color: "var(--dash-primary)", fontWeight: 600 }}>· Attending: {g.actualPersons}</span>}
                                </span>
                              </div>

                              {/* Row 3: Invite link */}
                              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                                <span style={{ fontSize: "0.7rem", color: "var(--dash-muted)", fontWeight: 600 }}>Link:</span>
                                <input
                                  type="text" readOnly value={personalLink}
                                  onClick={(e) => {
                                    (e.target as HTMLInputElement).select();
                                    navigator.clipboard.writeText(personalLink);
                                    toast.success("Copied invite link!");
                                  }}
                                  style={{
                                    flex: 1, background: "#ffffff", border: "1.5px solid var(--dash-card-border)",
                                    borderRadius: "0.35rem", padding: "0.15rem 0.4rem", fontSize: "0.72rem",
                                    color: "var(--dash-secondary)", cursor: "pointer", outline: "none", minWidth: 0,
                                    fontWeight: 500
                                  }}
                                />
                              </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end", flexShrink: 0 }}>
                              <button
                                onClick={() => handleSendWhatsApp(g)}
                                disabled={!g.phone}
                                style={{
                                  padding: "0.4rem 0.85rem", borderRadius: "0.4rem", border: "none",
                                  background: g.phone ? "linear-gradient(135deg, #25d366, #128c7e)" : "var(--dash-card-border)",
                                  color: g.phone ? "#fff" : "var(--dash-muted)",
                                  fontWeight: 700, fontSize: "0.75rem", cursor: g.phone ? "pointer" : "not-allowed",
                                  whiteSpace: "nowrap"
                                }}
                              >📲 Send</button>
                              <button
                                onClick={() => handleDeleteGuest(g.id, g.name)}
                                style={{
                                  background: "none", border: "none", color: "#dc2626", opacity: 0.6,
                                  cursor: "pointer", fontSize: "0.85rem", padding: "0.2rem", fontWeight: 700
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
                                title={`Archive ${g.name}`}
                              >🗑️ Archive</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="festive-card" style={{
                      padding: "3rem 1.5rem", textAlign: "center", color: "var(--dash-muted)"
                    }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>👥</div>
                      <div className="font-playfair" style={{ fontWeight: 600 }}>No guests found.</div>
                      <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>{guestFilter === "all" ? "No guests added yet. Paste a bulk list or add individually below!" : `No ${guestFilter} guests found.`}</p>
                    </div>
                  )}
                </div>

                {/* Right: Management Tools */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                  {/* Invite Text Template */}
                  <div className="festive-card" style={{ padding: "1.5rem" }}>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--dash-secondary)" }}>💬 Invite Template</h3>
                      <button
                        onClick={handleGenerateAITemplate}
                        disabled={generatingAI}
                        title="Generate a heartfelt invite message using AI"
                        style={{
                          display: "flex", alignItems: "center", gap: "0.4rem",
                          padding: "0.4rem 0.9rem", borderRadius: "9999px",
                          border: "none",
                          background: generatingAI
                            ? "var(--dash-card-border)"
                            : "linear-gradient(135deg, #a855f7 0%, #db2777 100%)",
                          color: "#ffffff",
                          fontWeight: 700, fontSize: "0.78rem", cursor: generatingAI ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {generatingAI ? "Generating…" : "✨ AI Generate"}
                      </button>
                    </div>
                    <p className="font-poppins" style={{ fontSize: "0.72rem", color: "var(--dash-muted)", marginBottom: "0.85rem", fontWeight: 500 }}>
                      Use tags <code style={{ background: "rgba(0,0,0,0.04)", padding: "0.1rem 0.35rem", borderRadius: "0.25rem", color: "var(--dash-secondary)" }}>[Guest Name]</code> and{" "}
                      <code style={{ background: "rgba(0,0,0,0.04)", padding: "0.1rem 0.35rem", borderRadius: "0.25rem", color: "var(--dash-secondary)" }}>[Invitation Link]</code>
                    </p>
                    <textarea
                      value={inviteTemplate}
                      onChange={(e) => setInviteTemplate(e.target.value)}
                      rows={7}
                      style={{
                        width: "100%", padding: "0.85rem", borderRadius: "0.5rem",
                        background: "#ffffff",
                        border: "2px solid var(--dash-card-border)",
                        color: "var(--dash-text)", outline: "none",
                        fontSize: "0.85rem", fontFamily: "inherit",
                        resize: "vertical", lineHeight: "1.65",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  {/* Bulk Uploader */}
                  <form onSubmit={handleBulkUpload} className="festive-card" style={{ padding: "1.5rem" }}>
                    <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--dash-secondary)", marginBottom: "0.35rem" }}>🚀 Bulk Guest Importer</h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--dash-muted)", marginBottom: "1rem" }}>
                      One guest per line: <code>Name, Phone</code>
                    </p>
                    <textarea
                      placeholder={"Amit Kumar, +91 9876543210\nSunita Patel, 9876543211"}
                      value={bulkText} onChange={(e) => setBulkText(e.target.value)} rows={4}
                      style={{
                        width: "100%", padding: "0.75rem", borderRadius: "0.5rem",
                        background: "#ffffff", border: "2px solid var(--dash-card-border)",
                        color: "var(--dash-text)", outline: "none", fontSize: "0.85rem", fontFamily: "monospace",
                        resize: "vertical", marginBottom: "1rem"
                      }}
                    />
                    <button type="submit" disabled={bulkUploading} className="festive-btn-primary" style={{
                      width: "100%", padding: "0.7rem", fontSize: "0.88rem",
                    }}>{bulkUploading ? "Ingesting list..." : "🚀 Load Guests & Links"}</button>
                  </form>

                  {/* Single Add Form */}
                  <form onSubmit={handleAddGuest} className="festive-card" style={{ padding: "1.5rem" }}>
                    <h3 className="font-playfair" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--dash-secondary)", marginBottom: "1rem" }}>👤 Add Single Guest</h3>
                    {[
                      { label: "Guest Name", value: newGuestName, set: setNewGuestName, ph: "E.g. Alia Bhatt", req: true, type: "text" },
                      { label: "WhatsApp / Phone", value: newGuestPhone, set: setNewGuestPhone, ph: "E.g. +91 9876543210", req: false, type: "text" },
                      { label: "Email (Optional)", value: newGuestEmail, set: setNewGuestEmail, ph: "E.g. alia@example.com", req: false, type: "email" },
                    ].map(f => (
                      <div key={f.label} style={{ marginBottom: "0.85rem" }}>
                        <label style={{ display: "block", fontSize: "0.78rem", color: "var(--dash-muted)", marginBottom: "0.3rem", fontWeight: 600 }}>{f.label}</label>
                        <input
                          type={f.type} placeholder={f.ph} value={f.value}
                          onChange={(e) => f.set(e.target.value)}
                          required={f.req}
                          style={{
                            width: "100%", padding: "0.6rem", borderRadius: "0.4rem",
                            background: "#ffffff", border: "2px solid var(--dash-card-border)",
                            color: "var(--dash-text)", outline: "none", fontSize: "0.88rem"
                          }}
                        />
                      </div>
                    ))}
                    <button type="submit" disabled={addingGuest} className="festive-btn-primary" style={{
                      width: "100%", padding: "0.65rem", fontSize: "0.88rem"
                    }}>{addingGuest ? "Adding..." : "➕ Add to Guestlist"}</button>
                  </form>

                </div>
              </div>
            </div>
          );
        })()}

      </div>

      {/* Sticky Bulk Actions Panel */}
      {activeTab === "guests" && selectedGuestIds.length > 0 && guestFilter !== "archived" && (
        <div style={{
          position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          background: "rgba(255, 255, 255, 0.98)", border: "2px solid var(--dash-primary)",
          borderRadius: "1rem", padding: "0.9rem 1.75rem", zIndex: 100, display: "flex",
          alignItems: "center", gap: "1.5rem",
          boxShadow: "0 12px 40px var(--dash-card-shadow)",
          backdropFilter: "blur(14px)", animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <span className="font-poppins" style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--dash-text)" }}>
            📋 {selectedGuestIds.length} guest{selectedGuestIds.length > 1 ? "s" : ""} selected
          </span>
          <div style={{ display: "flex", gap: "0.65rem" }}>
            <button
              onClick={handleLaunchBulkDispatch}
              className="festive-btn-primary"
              style={{
                padding: "0.55rem 1.4rem",
                fontSize: "0.85rem",
              }}
            >🚀 Send All Now</button>
            <button
              onClick={() => setSelectedGuestIds([])}
              className="festive-btn-ghost"
              style={{
                padding: "0.55rem 1.1rem",
                fontSize: "0.85rem",
              }}
            >Clear</button>
          </div>
        </div>
      )}

      {/* Rapid-Fire Bulk Dispatch Modal */}
      {showDispatchModal && (() => {
        const validGuests = guests.filter(g => selectedGuestIds.includes(g.id) && g.phone);
        const skipCount = selectedGuestIds.length - validGuests.length;
        const batchSize = 5;
        const totalBatches = Math.ceil(validGuests.length / batchSize);
        const currentBatchStart = dispatchBatch * batchSize;
        const currentBatchGuests = validGuests.slice(currentBatchStart, currentBatchStart + batchSize);

        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(44, 24, 16, 0.5)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "1rem"
          }}>
            <div style={{
              background: "#ffffff", border: "2px solid var(--dash-card-border)",
              borderRadius: "1.5rem", padding: "2rem", width: "100%", maxWidth: "500px",
              boxShadow: "0 15px 50px var(--dash-card-shadow)",
              color: "var(--dash-text)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 className="font-playfair" style={{ fontSize: "1.4rem", color: "var(--dash-text)", fontWeight: 700 }}>🚀 Bulk WhatsApp Dispatch</h3>
                <button onClick={() => { setShowDispatchModal(false); setDispatchDone(false); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dash-muted)", fontSize: "1.25rem" }}>✕</button>
              </div>

              {dispatchDone ? (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem", animation: "float 2s ease-in-out infinite" }}>🎉✨</div>
                  <h3 className="font-playfair" style={{ fontSize: "1.6rem", color: "#16a34a", marginBottom: "0.5rem", fontWeight: 700 }}>All Chats Opened!</h3>
                  <p className="font-poppins" style={{ color: "var(--dash-muted)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
                    <strong>{validGuests.length} WhatsApp chats</strong> have been opened. Go to each tab and tap <strong>Send</strong> to dispatch the invites! 📲
                  </p>
                  <button
                    onClick={() => { setShowDispatchModal(false); setSelectedGuestIds([]); setDispatchDone(false); }}
                    className="festive-btn-primary"
                    style={{
                      padding: "0.75rem 2.5rem", fontSize: "0.95rem"
                    }}>Done 🎉</button>
                </div>
              ) : (
                <>
                  <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid var(--dash-card-border)", borderRadius: "0.875rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.88rem" }}>
                      <span style={{ color: "#16a34a", fontWeight: 700 }}>✅ {validGuests.length} will be sent</span>
                      {skipCount > 0 && <span style={{ color: "var(--dash-muted)", fontWeight: 600 }}>⚠️ {skipCount} skipped (no phone)</span>}
                    </div>
                    {totalBatches > 1 && (
                      <div style={{ marginTop: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--dash-muted)", marginBottom: "0.35rem", fontWeight: 600 }}>
                          <span>Batch {dispatchBatch + 1} of {totalBatches}</span>
                          <span>{currentBatchGuests.length} chats this batch</span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "var(--dash-card-border)", borderRadius: "9999px" }}>
                          <div style={{ width: `${(dispatchBatch / totalBatches) * 100}%`, height: "100%", background: "var(--dash-button-grad)", borderRadius: "9999px", transition: "width 0.4s" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {currentBatchGuests.length > 0 && (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--dash-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                        {totalBatches > 1 ? `Batch ${dispatchBatch + 1} — opening:` : "Opening WhatsApp for:"}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {currentBatchGuests.map(g => (
                          <span key={g.id} className="font-poppins" style={{
                            padding: "0.25rem 0.7rem", borderRadius: "9999px", fontSize: "0.78rem",
                            background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", color: "#16a34a", fontWeight: 600
                          }}>{g.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skipCount > 0 && (
                    <div style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: "0.625rem", fontSize: "0.8rem", color: "#dc2626", fontWeight: 500 }}>
                      ⚠️ {skipCount} guest{skipCount > 1 ? "s" : ""} will be skipped — no phone number added.
                    </div>
                  )}

                  <button
                    onClick={() => handleFireBatch(dispatchBatch)}
                    disabled={validGuests.length === 0}
                    className="festive-btn-primary"
                    style={{
                      width: "100%", padding: "0.9rem", fontSize: "0.95rem"
                    }}
                  >
                    {totalBatches > 1
                      ? `📲 Open Batch ${dispatchBatch + 1} of {totalBatches} (${currentBatchGuests.length} chats)`
                      : `📲 Open All ${validGuests.length} WhatsApp Chats Now`
                    }
                  </button>
                  {totalBatches > 1 && dispatchBatch === 0 && (
                    <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--dash-muted)", marginTop: "0.75rem", fontWeight: 500 }}>
                      Lists &gt;5 guests open in batches of 5 to ensure all tabs open reliably
                  </p>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes slideUp { from { transform: translate(-50%, 100px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  );
}
