import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        subEvents: { orderBy: { order: "asc" } },
        guests: true,
        shagunEntries: true,
        _count: { select: { guests: true, shagunEntries: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Calculate total shagun collected
    const totalShagun = event.shagunEntries
      .filter((s) => s.status === "CAPTURED")
      .reduce((sum, s) => sum + s.amount, 0);

    return NextResponse.json({ event: { ...event, totalShagun } });
  } catch (error) {
    console.error("Get event details error:", error);
    return NextResponse.json({ error: "Failed to load event details" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { isPublished, title, coverImage, description, hostName, welcomeMessage } = body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...(typeof isPublished === "boolean" ? { isPublished } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(coverImage !== undefined ? { coverImage } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(hostName !== undefined ? { hostName } : {}),
        ...(welcomeMessage !== undefined ? { welcomeMessage } : {}),
      },
    });

    return NextResponse.json({ event: updatedEvent });
  } catch (error) {
    console.error("Update event error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}
