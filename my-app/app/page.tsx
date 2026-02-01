import type { Metadata } from "next";
import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  title: "Home | MIST Student Chapter",
  description:
    "Discover ASCE Student Chapter at MIST: activities, seminars, webinars, site visits, achievements, and membership information.",
  alternates: {
    canonical: "https://asce-ce.mist.ac.bd/",
  },
  openGraph: {
    title: "MIST Student Chapter",
    description:
      "Discover ASCE Student Chapter at MIST: activities, seminars, webinars, site visits, achievements, and membership information.",
    url: "https://asce-ce.mist.ac.bd/",
    images: [{ url: "/images/og-default.png" }],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
