import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH /api/sub-events/:id
// Body: { name?, subType?, date?, venue?, address?, dressCode?, description?, order? }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      subType,
      date,
      venue,
      address,
      dressCode,
      description,
      order,
    } = body as {
      name?: string;
      subType?: string | null;
      date?: string;
      venue?: string | null;
      address?: string | null;
      dressCode?: string | null;
      description?: string | null;
      order?: number;
    };

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (subType !== undefined) data.subType = subType || null;
    if (date !== undefined) data.date = new Date(date);
    if (venue !== undefined) data.venue = venue || null;
    if (address !== undefined) data.address = address || null;
    if (dressCode !== undefined) data.dressCode = dressCode || null;
    if (description !== undefined) data.description = description || null;
    if (order !== undefined) data.order = order;

    const updated = await prisma.subEvent.update({
      where: { id },
      data,
    });

    return NextResponse.json({ subEvent: updated });
  } catch (error) {
    console.error("Update sub-event error:", error);
    return NextResponse.json({ error: "Failed to update sub-event" }, { status: 500 });
  }
}

