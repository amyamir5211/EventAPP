import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH /api/guests/restore — restore an archived guest
export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const guest = await prisma.guest.update({
      where: { id },
      data: {
        isArchived: false,
        archivedAt: null,
      },
    });

    return NextResponse.json({ success: true, guest });
  } catch (error) {
    console.error("Restore guest error:", error);
    return NextResponse.json({ error: "Failed to restore guest" }, { status: 500 });
  }
}

// DELETE /api/guests/restore?id=xxx — permanently delete an archived guest
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.guest.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Permanent delete guest error:", error);
    return NextResponse.json({ error: "Failed to permanently delete guest" }, { status: 500 });
  }
}
