import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH /api/events/:id/guest-welcome
// Body: { hostName?: string; welcomeMessage?: string }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { hostName, welcomeMessage } = body as {
      hostName?: string;
      welcomeMessage?: string;
    };

    const data: Record<string, unknown> = {};

    // Store host name override on the Event model
    if (hostName !== undefined) data.hostName = hostName;

    // Store welcome message override on the Event model
    if (welcomeMessage !== undefined) data.guestWelcomeMessage = welcomeMessage;

    const updated = await prisma.event.update({
      where: { id },
      data,
    });

    return NextResponse.json({ event: updated });
  } catch (error) {
    console.error("Update guest-welcome error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

