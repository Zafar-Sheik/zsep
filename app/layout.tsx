import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zsep.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZS Elite Partners | Integrated Business Growth Solutions",
    template: "%s | ZS Elite Partners",
  },
  description:
    "ZS Elite Partners helps South African businesses grow through integrated marketing, branding, promotional staffing, software development, database solutions and CCTV installation.",
  keywords: [
    "ZS Elite Partners",
    "South Africa marketing agency",
    "promotions agency",
    "custom software development South Africa",
    "ERP development",
    "CCTV installation",
    "business growth partner",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "ZS Elite Partners",
    title: "ZS Elite Partners",
    description:
      "Strategy, people and technology working as one business growth ecosystem.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
