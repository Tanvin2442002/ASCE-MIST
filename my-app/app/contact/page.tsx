"use client";
import React, { useState, ChangeEvent, FormEvent, JSX } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage(): JSX.Element {
  // Prefer a public-prefixed env var for client-side use (NEXT_PUBLIC_GOOGLE for Next.js/Vite).
  const apiKey: string =
    (process.env.NEXT_PUBLIC_GOOGLE as string) ||
    (process.env.GOOGLE as string) ||
    "";

  const placeQuery =
    "Military Institute of Science and Technology, Dhaka, Bangladesh";
  const mapSrc: string = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        placeQuery
      )}`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        placeQuery
      )}&output=embed`;

  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    { type: "loading" | "success" | "error" | null; message: string | null } | null
  >(null);

  // Newsletter small form state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    | null
    | { type: "loading" | "success" | "error"; message: string }
  >(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      // Replace this simulated submission with your actual backend endpoint.
      await new Promise((r) => setTimeout(r, 700));
      setStatus({ type: "success", message: "Message sent. We will get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: "Failed to send message. Try again later." });
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterStatus({ type: "error", message: "Please provide a valid email." });
      return;
    }
    setNewsletterStatus({ type: "loading", message: "Subscribing..." });
    try {
      await new Promise((r) => setTimeout(r, 600));
      setNewsletterStatus({ type: "success", message: "Subscribed — check your inbox for confirmation." });
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus({ type: "error", message: "Subscription failed. Try again later." });
    }
  };

  // Example announcements (replace with dynamic data when available)
  const announcements = [
    {
      id: 1,
      title: "ASCE MIST — Annual Technical Workshop",
      date: "Oct 15, 2025",
      summary: "Hands-on workshops, industry speakers and project showcases. Registration opens soon.",
    },
    {
      id: 2,
      title: "Volunteer Drive: Campus Cleanup",
      date: "Sep 30, 2025",
      summary: "Join fellow students for a weekend campus cleanup and community service hours.",
    },
    {
      id: 3,
      title: "Resume Review Sessions",
      date: "Recurring",
      summary: "Drop by our office hours for resume feedback from seniors and alumni.",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">Contact ASCE — MIST</h1>
          <p className="mt-3 text-lg text-green-800 max-w-2xl mx-auto">
            We{"'"}re here to help — questions, collaborations or membership inquiries welcome.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: contact card & news/resources */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 ring-1 ring-green-100">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Contact Information</h2>

              <dl className="space-y-4 text-sm text-green-800">
                <div>
                  <dt className="font-medium">Address</dt>
                  <dd className="text-gray-600">
                    Military Institute of Science and Technology
                    <br />
                    Mirpur Cantonment, Dhaka-1216
                    <br />
                    Bangladesh
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Phone</dt>
                  <dd className="text-gray-600">+880-2-8040464 | +880-2-8040465</dd>
                </div>
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="text-gray-600">
                    asce@mist.ac.bd
                    <br />
                    info.asce.mist@gmail.com
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Office Hours</dt>
                  <dd className="text-gray-600">Sun–Thu 9:00–17:00 · Fri 9:00–12:00 · Sat Closed</dd>
                </div>
              </dl>

              <div className="mt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block w-full text-center py-2 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* NEWS & RESOURCES (replaces visit options) */}
            <div className="bg-white shadow-lg rounded-2xl p-6 ring-1 ring-green-100">
              <h2 className="text-xl font-semibold text-green-900 mb-3">News & Resources</h2>

              <div className="space-y-3">
                {/* Announcements */}
                <div>
                  <h3 className="text-sm font-medium text-green-900 mb-2">Latest Announcements</h3>
                  <ul className="divide-y divide-gray-100">
                    {announcements.map((a) => (
                      <li key={a.id} className="py-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{a.title}</p>
                            <p className="text-xs text-gray-500">{a.summary}</p>
                          </div>
                          <span className="text-xs text-gray-400 ml-4">{a.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h3 className="text-sm font-medium text-green-900 mb-2">Newsletter</h3>
                  <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
                    <input
                      type="email"
                      aria-label="Newsletter email"
                      placeholder="you@domain.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 rounded-md border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                    >
                      Subscribe
                    </button>
                  </form>
                  {newsletterStatus && (
                    <p className={`mt-2 text-xs ${newsletterStatus.type === "success" ? "text-green-700" : "text-red-600"}`}>
                      {newsletterStatus.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">Get event notifications, opportunities and announcements.</p>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-sm font-medium text-green-900 mb-2">Quick Links</h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()} className="underline">
                        Membership Benefits
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()} className="underline">
                        Student Resources & Guides
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => e.preventDefault()} className="underline">
                        Volunteer & Project Opportunities
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right: form + map */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 ring-1 ring-green-100">
              <h2 className="text-2xl font-semibold text-green-900 mb-4">Send Us a Message</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="you@domain.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-green-800 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full rounded-md border-gray-200 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Send Message
                </button>

                {status && (
                  <p
                    className={`text-sm ${
                      status.type === "success" ? "text-green-700" : status.type === "error" ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>

            <div className="bg-white shadow-lg rounded-2xl overflow-hidden ring-1 ring-green-100">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Location</h2>
                <p className="text-sm text-green-800 mb-4">
                  Interactive map powered by Google Maps. {apiKey ? "Key detected from environment." : "No API key detected — using public search embed."}
                </p>
              </div>

              <div className="w-full h-96">
                <iframe
                  title="MIST Location"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {!apiKey && (
                <div className="p-4 bg-yellow-50 text-sm text-yellow-800">
                  <strong>Tip:</strong> For full Google Maps Embed with your API key, set <code>NEXT_PUBLIC_GOOGLE</code> in your environment (for Next.js/Vite) or add <code>GOOGLE</code> in your env and restart the dev server.
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-green-700">© {new Date().getFullYear()} ASCE Student Chapter — MIST</footer>
      </div>
    </div>
  );
}
