import { prisma } from "../lib/db";

async function main() {
  console.log("🌱 Seeding demo data...");

  // Create demo host user
  const host = await prisma.user.upsert({
    where: { email: "demo@utsav.app" },
    update: {},
    create: {
      name: "Priya Sharma",
      email: "demo@utsav.app",
    },
  });

  // Create demo wedding event
  const weddingEvent = await prisma.event.upsert({
    where: { slug: "demo-wedding-2026" },
    update: {},
    create: {
      slug: "demo-wedding-2026",
      title: "Sharma-Gupta Wedding 2026",
      hostId: host.id,
      eventCategory: "wedding",
      culturalTheme: "punjabi",
      description: "Join us as we celebrate the union of Priya & Rahul across five beautiful ceremonies. 🌸",
      isPublished: true,
      subEvents: {
        create: [
          { name: "Mehndi", subType: "mehndi", date: new Date("2026-06-10T16:00:00"), venue: "Sharma Residence", address: "12 Green Park, New Delhi", dressCode: "Ethnic — greens & yellows", order: 1 },
          { name: "Haldi", subType: "haldi", date: new Date("2026-06-11T10:00:00"), venue: "Sharma Residence", address: "12 Green Park, New Delhi", dressCode: "White or Yellow — old clothes!", order: 2 },
          { name: "Sangeet", subType: "sangeet", date: new Date("2026-06-11T19:00:00"), venue: "The Grand Ballroom", address: "Hotel Leela, Delhi", dressCode: "Festive — pinks, purples & blues", order: 3 },
          { name: "Baraat & Wedding", subType: "baraat", date: new Date("2026-06-12T08:00:00"), venue: "Gupta House", address: "45 Defence Colony, New Delhi", dressCode: "Sherwani / Lehenga — reds & golds", order: 4 },
          { name: "Reception", subType: "reception", date: new Date("2026-06-12T19:00:00"), venue: "The Grand Ballroom", address: "Hotel Leela, Delhi", dressCode: "Formal / Cocktail attire", order: 5 },
        ],
      },
    },
    include: { subEvents: true },
  });

  // Add demo guests
  const guests = [
    { name: "Amit Kumar", email: "amit@example.com", phone: "9876543210" },
    { name: "Sunita Patel", email: "sunita@example.com", phone: "9876543211" },
    { name: "Rohit Singh", email: "rohit@example.com", phone: "9876543212" },
  ];

  for (const g of guests) {
    await prisma.guest.upsert({
      where: { rsvpToken: `demo-${g.email}` },
      update: {},
      create: {
        eventId: weddingEvent.id,
        name: g.name,
        email: g.email,
        phone: g.phone,
        rsvpToken: `demo-${g.email}`,
        rsvpStatus: "CONFIRMED",
      },
    });
  }

  // Create chhotu-weds-chhoti event
  const chhotuWedsChhotiEvent = await prisma.event.upsert({
    where: { slug: "chhotu-weds-chhoti" },
    update: {},
    create: {
      slug: "chhotu-weds-chhoti",
      title: "Chhotu weds Chhoti",
      hostId: host.id,
      eventCategory: "wedding",
      culturalTheme: "muslim",
      description: "Join us as we celebrate the Nikah of Chhotu & Chhoti. 🌹",
      isPublished: true,
      subEvents: {
        create: [
          { name: "Mehndi", subType: "mehndi", date: new Date("2026-07-15T16:00:00"), venue: "Royal Palace, Hall A", address: "G.T. Road, Lucknow", dressCode: "Traditional Green / Mustard", order: 1 },
          { name: "Haldi", subType: "haldi", date: new Date("2026-07-16T10:00:00"), venue: "Royal Palace Garden", address: "G.T. Road, Lucknow", dressCode: "Sunny Yellow or White", order: 2 },
          { name: "Sangeet", subType: "sangeet", date: new Date("2026-07-16T19:00:00"), venue: "Crystal Banquet", address: "Hazratganj, Lucknow", dressCode: "Glitz & Glamour — Pinks / Purples", order: 3 },
          { name: "Nikah", subType: "nikah", date: new Date("2026-07-17T11:00:00"), venue: "Royal Palace Main Lawn", address: "G.T. Road, Lucknow", dressCode: "Formal Ethnic — Emerald & Gold", order: 4 },
          { name: "Walima", subType: "walima", date: new Date("2026-07-18T19:00:00"), venue: "Mughal Hall", address: "Hazratganj, Lucknow", dressCode: "Formal Suits / Elegant Sarees", order: 5 },
        ],
      },
    },
  });

  // Create guest for chhotu weds chhoti
  await prisma.guest.upsert({
    where: { rsvpToken: "demo-chhotu-guest" },
    update: {},
    create: {
      eventId: chhotuWedsChhotiEvent.id,
      name: "Sajid Khan",
      email: "sajid@example.com",
      phone: "9876540000",
      rsvpToken: "demo-chhotu-guest",
      rsvpStatus: "CONFIRMED",
    },
  });

  // Create demo birthday event
  await prisma.event.upsert({
    where: { slug: "arjun-25th-birthday-bash" },
    update: {},
    create: {
      slug: "arjun-25th-birthday-bash",
      title: "Arjun's 25th Birthday Bash 🎂",
      hostId: host.id,
      eventCategory: "birthday",
      description: "Come celebrate 25 years of awesomeness! 🎉",
      isPublished: true,
      subEvents: {
        create: [
          { name: "Birthday Party", subType: "birthday", date: new Date("2026-06-20T18:00:00"), venue: "Skybar Lounge", address: "Connaught Place, Delhi", dressCode: "Casually Fabulous", order: 1 },
        ],
      },
    },
  });

  console.log("✅ Seed complete!");
  console.log("📎 Visit: http://localhost:3001/e/demo-wedding-2026");
  console.log("📎 Visit: http://localhost:3001/e/chhotu-weds-chhoti");
  console.log("📎 Visit: http://localhost:3001/e/chhotu-weds-chhoti?g=demo-chhotu-guest");
  console.log("📎 Visit: http://localhost:3001/e/arjun-25th-birthday-bash");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
