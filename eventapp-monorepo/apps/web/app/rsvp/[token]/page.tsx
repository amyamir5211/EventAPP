import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import RsvpClient from "./RsvpClient";

export default async function RsvpPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const guest = await prisma.guest.findUnique({
    where: { rsvpToken: token },
    include: {
      event: {
        include: {
          subEvents: { orderBy: { order: "asc" } },
          host: { select: { name: true } },
        },
      },
      subEventLinks: true,
    },
  });

  if (!guest) notFound();

  return <RsvpClient guest={guest as any} />;
}
