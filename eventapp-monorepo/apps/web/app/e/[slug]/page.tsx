import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSubEventTheme, getTheme, type EventTheme } from "@/lib/theme";
import { formatDate, formatTime, getWhatsAppShareUrl, getEventUrl } from "@/lib/utils";
import PublicEventClient from "./PublicEventClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    select: { title: true, description: true, culturalTheme: true, eventCategory: true },
  });
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} — Utsav`,
    description: event.description ?? `You're invited to ${event.title}`,
  };
}

export default async function PublicEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ g?: string }>;
}) {
  const { slug } = await params;
  const { g: guestToken } = await searchParams;

  const event = await prisma.event.findUnique({
    where: { slug, isPublished: true },
    include: {
      host: { select: { name: true } },
      subEvents: { orderBy: { order: "asc" } },
    },
  });




  if (!event) notFound();

  let guest = null;
  if (guestToken) {
    guest = await prisma.guest.findUnique({
      where: { rsvpToken: guestToken },
      select: { id: true, name: true, phone: true, email: true, rsvpToken: true, rsvpStatus: true },
    });
  }

  const theme = getTheme((event.culturalTheme ?? event.eventCategory) as any);

  // Prefer explicit hostName override, fall back to auth user name
  const publicEvent: any = {
    ...event,
    hostName: event.hostName ?? event.host?.name ?? null,
    welcomeMessage: event.welcomeMessage ?? null,
  };

  return <PublicEventClient event={publicEvent as any} theme={theme} guest={guest as any} />;

}
