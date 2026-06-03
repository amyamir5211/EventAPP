import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { eventTitle, eventCategory, culturalTheme, hostName, subEvents } =
      await req.json();

    if (!eventTitle) {
      return NextResponse.json({ error: "eventTitle is required" }, { status: 400 });
    }

    const ceremonies =
      Array.isArray(subEvents) && subEvents.length > 0
        ? subEvents.join(", ")
        : "the celebrations";

    const prompt = `You are a warm, eloquent wedding invite writer.
Write a heartfelt WhatsApp invitation message for an event with these details:
- Event: ${eventTitle}
- Category: ${eventCategory ?? "wedding"}
- Cultural theme: ${culturalTheme ?? "not specified"}
- Hosted by: ${hostName || "the family"}
- Ceremonies / sub-events: ${ceremonies}

Rules:
1. Start with a greeting to [Guest Name] (use this exact placeholder).
2. Keep it warm, joyful, and personal — avoid generic corporate language.
3. Include exactly one occurrence of [Invitation Link] near the end.
4. Use 2–3 relevant emojis throughout but don't overdo it.
5. Length: 4–6 short paragraphs, conversational tone.
6. Do NOT add a subject line or extra headings — plain WhatsApp-style text only.
7. End with a warm closing on behalf of ${hostName || "the hosts"}.

Return ONLY the message text, nothing else.`;

    // ── Try Gemini ──────────────────────────────────────────────────
    if (GEMINI_API_KEY) {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.85, maxOutputTokens: 512 },
          }),
        }
      );

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const template =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (template) {
          return NextResponse.json({ template });
        }
      }
      // Fall through to built-in fallback on any Gemini error
      console.warn("Gemini API failed, using built-in fallback.");
    }

    // ── Built-in heartfelt fallback (no API key needed) ─────────────
    const category = (eventCategory ?? "wedding").toLowerCase();
    const emoji =
      category === "birthday"
        ? "🎂"
        : category === "engagement"
        ? "💍"
        : "🌸";

    const template = `${emoji} Dear [Guest Name],

With hearts full of joy and gratitude, ${hostName || "we"} cordially invite you to be a part of our special celebrations — *${eventTitle}*.

Your presence will mean the world to us. We have lovingly planned ${ceremonies} and we cannot imagine this occasion without you by our side.

Please find your personal invitation and RSVP details here: [Invitation Link]

We look forward to celebrating this beautiful milestone together with you and your loved ones. ✨

With warmth and love,
${hostName || "The Family"}`;

    return NextResponse.json({ template });
  } catch (error) {
    console.error("AI invite template error:", error);
    return NextResponse.json({ error: "Failed to generate template" }, { status: 500 });
  }
}
