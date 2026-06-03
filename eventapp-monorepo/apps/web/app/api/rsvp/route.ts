import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { token, status, mealPreference, attendingSubEvents, actualPersons } = await req.json();

    if (!token || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      rsvpStatus: status.toUpperCase(),
    };

    if (mealPreference !== undefined) updateData.mealPreference = mealPreference;
    if (actualPersons !== undefined) updateData.actualPersons = Number(actualPersons);

    const guest = await prisma.guest.update({
      where: { rsvpToken: token },
      data: updateData,
    });

    return NextResponse.json({ success: true, guest });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Failed to update RSVP" }, { status: 500 });
  }
}
