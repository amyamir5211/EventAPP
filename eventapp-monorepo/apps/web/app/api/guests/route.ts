import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";

// GET /api/guests?eventId=xxx&archived=true|false
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const archived = searchParams.get("archived") === "true";

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    const guests = await prisma.guest.findMany({
      where: { eventId, isArchived: archived },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ guests });
  } catch (error) {
    console.error("Fetch guests error:", error);
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
  }
}

// POST /api/guests — singular or bulk create
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, name, phone, email, guests } = body;

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    // Handle Bulk Upload
    if (Array.isArray(guests)) {
      const createdGuests = [];
      for (const g of guests) {
        if (!g.name) continue;
        const guest = await prisma.guest.create({
          data: {
            eventId,
            name: g.name.trim(),
            phone: g.phone ? g.phone.trim() : null,
            email: g.email ? g.email.trim() : null,
            rsvpToken: `inv-${nanoid(8)}`,
            rsvpStatus: "PENDING",
          },
        });
        createdGuests.push(guest);
      }
      return NextResponse.json({ success: true, count: createdGuests.length, guests: createdGuests });
    }

    // Handle Singular Add
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const guest = await prisma.guest.create({
      data: {
        eventId,
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        email: email ? email.trim() : null,
        rsvpToken: `inv-${nanoid(8)}`,
        rsvpStatus: "PENDING",
      },
    });

    return NextResponse.json({ guest });
  } catch (error) {
    console.error("Create guest error:", error);
    return NextResponse.json({ error: "Failed to create guest(s)" }, { status: 500 });
  }
}

// PATCH /api/guests — update expectedPersons or mealPreference for a guest
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, expectedPersons, mealPreference } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (expectedPersons !== undefined) data.expectedPersons = expectedPersons;
    if (mealPreference !== undefined) data.mealPreference = mealPreference;

    const guest = await prisma.guest.update({
      where: { id },
      data,
    });

    return NextResponse.json({ guest });
  } catch (error) {
    console.error("Update guest error:", error);
    return NextResponse.json({ error: "Failed to update guest" }, { status: 500 });
  }
}

// DELETE /api/guests?id=xxx — soft-delete (archive)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Soft-delete: set isArchived = true, record archivedAt timestamp
    await prisma.guest.update({
      where: { id },
      data: {
        isArchived: true,
        archivedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete guest error:", error);
    return NextResponse.json({ error: "Failed to archive guest" }, { status: 500 });
  }
}
