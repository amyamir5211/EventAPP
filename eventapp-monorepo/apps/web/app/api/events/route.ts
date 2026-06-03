import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, eventCategory, culturalTheme, description, hostId } = body;

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    let finalHostId = hostId;
    if (!finalHostId || finalHostId === "demo") {
      const demoUser = await prisma.user.findUnique({ where: { email: "demo@utsav.app" } });
      if (demoUser) {
        finalHostId = demoUser.id;
      } else {
        return NextResponse.json({ error: "No host user found, please seed first" }, { status: 400 });
      }
    }

    const slug = generateSlug(title);

    const event = await prisma.event.create({
      data: {
        slug,
        title,
        eventCategory: eventCategory ?? "wedding",
        culturalTheme,
        description,
        hostId: finalHostId,
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hostId = searchParams.get("hostId");

  let finalHostId = hostId;
  if (!finalHostId || finalHostId === "demo") {
    const demoUser = await prisma.user.findUnique({ where: { email: "demo@utsav.app" } });
    if (demoUser) {
      finalHostId = demoUser.id;
    } else {
      return NextResponse.json({ error: "hostId required" }, { status: 400 });
    }
  }

  const events = await prisma.event.findMany({
    where: { hostId: finalHostId },
    include: {
      subEvents: { orderBy: { order: "asc" } },
      shagunEntries: {
        where: { status: "CAPTURED" },
        select: { amount: true }
      },
      _count: { select: { guests: true, shagunEntries: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const eventsWithTotal = events.map(event => {
    const totalShagun = event.shagunEntries.reduce((sum, entry) => sum + entry.amount, 0);
    return {
      ...event,
      totalShagun,
    };
  });

  return NextResponse.json({ events: eventsWithTotal });
}
