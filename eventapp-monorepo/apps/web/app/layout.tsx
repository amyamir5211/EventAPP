import type { Metadata } from "next";
import "./globals.css";
import PerformanceMeasureGuard from "./PerformanceMeasureGuard";


export const metadata: Metadata = {
  title: "Utsav — Indian Celebration Platform",
  description:
    "India's most beautiful way to celebrate. Create stunning multi-day event pages, collect Shagun digitally, and manage guests for your wedding, birthday, and celebrations.",
  keywords: "wedding invitation, digital shagun, RSVP, Indian wedding, event management",
  openGraph: {
    title: "Utsav — Indian Celebration Platform",
    description: "Create beautiful event pages for your Indian celebrations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=El+Messiri:wght@400;500;600;700&family=Marcellus&family=Rozha+One&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Great+Vibes&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PerformanceMeasureGuard />
        {children}
      </body>
    </html>
  );
}
