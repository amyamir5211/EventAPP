import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildIcsText, buildGoogleCalendarUrl } from "@/lib/calendar";

function toISODateTimeLocal(d: Date) {
  // ICS expects local-ish timestamps without timezone designator if we use DTSTART:YYYYMMDDTHHMMSS
  // We'll format using UTC to avoid environment inconsistencies; Google/Outlook still interpret correctly.
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    const { token } = await params;

    const guest = await prisma.guest.findUnique({
      where: { rsvpToken: token },
      include: {
        event: {
          include: {
            host: true,
            subEvents: true,
          },
        },
        subEventLinks: {
          where: { isInvited: true },
        },
      },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    if (guest.eventId !== eventId) {
      return NextResponse.json({ error: "eventId mismatch" }, { status: 400 });
    }

    const invitedSubEvents = guest.event.subEvents
      .filter((se) => {
        // If no explicit subEventLinks exist, assume all subEvents are invited
        if (!guest.subEventLinks || guest.subEventLinks.length === 0) return true;
        return guest.subEventLinks.some((l) => l.subEventId === se.id && l.isInvited);
      })
      .sort((a, b) => a.order - b.order);

    if (invitedSubEvents.length === 0) {
      return NextResponse.json({ error: "No sub-events to add" }, { status: 404 });
    }

    const now = new Date();

    // Pick a reasonable default duration (2 hours) if not specified.
    const defaultEndMinutes = 120;

    const icsText = buildIcsText({
      eventTitle: guest.event.title,
      guestName: guest.name,
      hostName: guest.event.host?.name ?? "The Family",
      venueLines: (se) => ({
        venue: se.venue ?? undefined,
        address: se.address ?? undefined,
      }),
      subEvents: invitedSubEvents.map((se) => {
        const start = new Date(se.date);
        const end = new Date(start.getTime() + defaultEndMinutes * 60 * 1000);
        return {
          id: se.id,
          name: se.name,
          start,
          end,
          venue: se.venue ?? null,
          address: se.address ?? null,
          description: se.description ?? null,
        };
      }),
      reminders: [
        { type: "DAYS_BEFORE", days: 30 },
        { type: "DAYS_BEFORE", days: 7 },
        { type: "DAYS_BEFORE", days: 1 },
      ],
      calendarUidSeed: `utsav-${guest.rsvpToken}-${guest.eventId}`,
      createdAt: now,
    });

    const googleUrl = buildGoogleCalendarUrl({
      eventTitle: guest.event.title,
      guestName: guest.name,
      hostName: guest.event.host?.name ?? "The Family",
      subEvents: invitedSubEvents.map((se) => {
        const start = new Date(se.date);
        const end = new Date(start.getTime() + defaultEndMinutes * 60 * 1000);
        return {
          name: se.name,
          start,
          end,
          venue: se.venue ?? null,
          address: se.address ?? null,
        };
      }),
      // reminders included in ICS; Google render url doesn't reliably support multiple alarms.
    });

    return NextResponse.json({
      guest: { id: guest.id, name: guest.name },
      googleUrl,
      icsText,
    });
  } catch (error) {
    console.error("calendar route error:", error);
    return NextResponse.json({ error: "Failed to build calendar" }, { status: 500 });
  }
}

