type Reminder =
  | { type: "DAYS_BEFORE"; days: number }
  | { type: "MINUTES_BEFORE"; minutes: number };

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatICSDateTimeUTC(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function ensureUid(id: string) {
  // Remove spaces / unsafe chars
  return id.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export function buildIcsText(args: {
  eventTitle: string;
  guestName: string;
  hostName: string;
  venueLines: (se: {
    venue: string | null;
    address: string | null;
  }) => { venue?: string; address?: string };
  subEvents: Array<{
    id: string;
    name: string;
    start: Date;
    end: Date;
    venue: string | null;
    address: string | null;
    description: string | null;
  }>;
  reminders: Reminder[];
  calendarUidSeed: string;
  createdAt: Date;
}) {
  const {
    eventTitle,
    guestName,
    hostName,
    subEvents,
    reminders,
    calendarUidSeed,
    createdAt,
  } = args;

  const dtStamp = formatICSDateTimeUTC(createdAt);

  // VCALENDAR with multiple VEVENTs
  const lines: string[] = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//utsav//EventApp//EN");
  lines.push("CALSCALE:GREGORIAN");
  lines.push(`METHOD:PUBLISH`);

  for (const se of subEvents) {
    const uid = ensureUid(`${calendarUidSeed}-${se.id}`);
    const summary = `${eventTitle} — ${se.name} (${guestName})`;

    const locationParts = [se.venue, se.address].filter(Boolean) as string[];
    const location = locationParts.join(" — ");

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART:${formatICSDateTimeUTC(se.start)}`);
    lines.push(`DTEND:${formatICSDateTimeUTC(se.end)}`);

    lines.push(`SUMMARY:${escapeIcsText(summary)}`);
    lines.push(`DESCRIPTION:${escapeIcsText(`${hostName}. ${se.description ?? ""}`.trim())}`);

    if (location.trim()) {
      lines.push(`LOCATION:${escapeIcsText(location.trim())}`);
    }

    // Add alarms
    for (const r of reminders) {
      if (r.type === "DAYS_BEFORE") {
        // Google supports VALARM triggers in minutes/weeks/days via -P?D
        lines.push("BEGIN:VALARM");
        lines.push("ACTION:DISPLAY");
        lines.push("DESCRIPTION:Reminder");
        lines.push(`TRIGGER:-P${r.days}D`);
        lines.push("END:VALARM");
      } else if (r.type === "MINUTES_BEFORE") {
        lines.push("BEGIN:VALARM");
        lines.push("ACTION:DISPLAY");
        lines.push("DESCRIPTION:Reminder");
        lines.push(`TRIGGER:-PT${r.minutes}M`);
        lines.push("END:VALARM");
      }
    }

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  // Use CRLF per RFC
  return lines.join("\r\n") + "\r\n";
}

function formatGoogleDateTime(d: Date) {
  // Google expects YYYYMMDDTHHMMSSZ
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export function buildGoogleCalendarUrl(args: {
  eventTitle: string;
  guestName: string;
  hostName: string;
  subEvents: Array<{
    name: string;
    start: Date;
    end: Date;
    venue: string | null;
    address: string | null;
  }>;
}) {
  // Google render URL supports a single event reliably.
  // We'll pick the first subEvent for render URL; user can also download ICS for full multi-event.
  const first = args.subEvents[0];
  if (!first) {
    // Fallback URL (should not happen because caller checks for sub-events)
    return "https://www.google.com/calendar/";
  }

  const location = [first.venue, first.address].filter(Boolean).join(" — ");


  const params = new URLSearchParams();
  params.set("action", "TEMPLATE");
  params.set("text", `${args.eventTitle} — ${first.name} (${args.guestName})`);
  params.set("dates", `${formatGoogleDateTime(first.start)}/${formatGoogleDateTime(first.end)}`);
  if (args.hostName) params.set("details", `${args.hostName}`);
  if (location) params.set("location", location);


  // NOTE: reminders/alarms are not consistently supported via this URL.
  // Reminders are fully supported via the generated ICS.
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function downloadTextFile(filename: string, content: string, mime = "text/calendar;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

