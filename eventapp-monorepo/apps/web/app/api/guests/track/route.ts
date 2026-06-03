import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/guests/track — record first-view timestamp when guest opens personalized link
export async function POST(req: NextRequest) {
  try {
    const { rsvpToken } = await req.json();

    if (!rsvpToken) {
      return NextResponse.json({ error: "rsvpToken is required" }, { status: 400 });
    }

    // Only record the FIRST view — don't overwrite if already tracked
    await prisma.guest.updateMany({
      where: {
        rsvpToken,
        inviteViewedAt: null,
      },
      data: {
        inviteViewedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track invite view error:", error);
    // Return success even on error — tracking should never break user experience
    return NextResponse.json({ success: false });
  }
}
