import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, name, subType, date, venue, address, dressCode, description, order } = body;

    if (!eventId || !name || !date) {
      return NextResponse.json({ error: "eventId, name, and date are required" }, { status: 400 });
    }

    const subEvent = await prisma.subEvent.create({
      data: {
        eventId,
        name,
        subType: subType || null,
        date: new Date(date),
        venue: venue || null,
        address: address || null,
        dressCode: dressCode || null,
        description: description || null,
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json({ subEvent });
  } catch (error) {
    console.error("Create sub-event error:", error);
    return NextResponse.json({ error: "Failed to create sub-event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.subEvent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete sub-event error:", error);
    return NextResponse.json({ error: "Failed to delete sub-event" }, { status: 500 });
  }
}
