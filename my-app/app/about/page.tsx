import AboutClient from "./AboutClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the ASCE Student Chapter at MIST — mission, activities, leadership, and how we empower civil engineering students.",
  alternates: {
    canonical: "https://asce-ce.mist.ac.bd/about",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
