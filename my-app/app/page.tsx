"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Award,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import Navigation from "@/components/navigation";
import { LampContainer } from "@/components/lamp-container";
import { FloatingBlobs, CurvyDivider } from "@/components/organic-shape";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

const backend = process.env.NEXT_PUBLIC_BACKEND;

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/541658753_122236759676185156_6443978270411591295_n.jpg",
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/542265422_122236757816185156_3620413485046174193_n.jpg",
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/542482835_122236759658185156_4528303572163965139_n.jpg",
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/554924841_122240018294185156_7291714668580965779_n.jpg",
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/543429453_122236759520185156_5532737984210934021_n.jpg",
    "https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/random_images/555485973_122240018714185156_5264440853786801971_n.jpg",
  ];

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      try {
        const res = await fetch(`${backend}/api/announcements`);
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        setAnnouncements([]);
      }
      setLoading(false);
    }
    async function fetchevents() {
      setLoading(true);
      try {
        const res = await fetch(`${backend}/api/upcoming-events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setEvents([]);
      }
      setLoading(false);
    }
    fetchAnnouncements();
    fetchevents();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Component */}
      {/* <Navigation currentPath="/" /> */}

      {/* =========================
          HERO (video confined to this block)
          ========================= */}
      <header
        id="hero"
        className="relative min-h-[60vh] md:min-h-screen max-h-[60vh] flex items-center"
        aria-label="Hero"
      >
        {/* video layer (absolute inside header only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            className="w-full h-full object-cover"
            src="/MIST.mp4"
            poster="/placeholder.svg"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          />
        </div>
      </header>
      <section
        id="announcements"
        className="py-16 bg-muted/20 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recent Announcements
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stay updated with the latest news, achievements, and important
            updates from our ASCE chapter
          </motion.p>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/90 backdrop-blur-sm border-border/50 overflow-hidden group h-full flex flex-col">
                    <div className="aspect-video overflow-hidden flex-shrink-0">
                      <img
                        src={
                          Array.isArray(announcement.image_url)
                            ? announcement.image_url[0]
                            : announcement.image_url || "/placeholder.svg"
                        }
                        alt={announcement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-3 flex-shrink-0">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant={
                            announcement.priority === "high"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            announcement.priority === "high"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent/20 text-accent-foreground border-accent/30"
                          }
                        >
                          {announcement.status || "Announcement"}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {announcement.created_at
                            ? new Date(
                                announcement.created_at
                              ).toLocaleDateString()
                            : ""}
                        </div>
                      </div>
                      <CardTitle className="text-card-foreground text-balance leading-tight group-hover:text-primary transition-colors">
                        {announcement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <CardDescription className="text-pretty mb-4 leading-relaxed flex-1">
                        {announcement.description?.slice(0, 120)}...
                      </CardDescription>
                      <Button
                        variant="outline"
                        className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent mt-auto"
                        onClick={() =>
                          (window.location.href = `/activities/announcement/${announcement.id}`)
                        }
                      >
                        Read Full Story
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ... rest of your sections unchanged ... */}

      {/* About Section */}
      <section id="about" className="py-16 bg-card/50 relative overflow-hidden">
        <FloatingBlobs />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About ASCE @ MIST
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8 text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The American Society of Civil Engineers (ASCE) is the world&apos;s
              oldest national engineering society. Our student chapter at MIST
              focuses on professional development, networking, research
              opportunities, and preparing the next generation of civil
              engineering leaders in Bangladesh.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Quick Access
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/activities/upcoming-events",
                icon: Calendar,
                title: "Upcoming Events",
                desc: "Seminars, workshops, and competitions",
              },
              {
                href: "/publication",
                icon: BookOpen,
                title: "Projects & Research",
                desc: "Ongoing research and student projects",
              },
              {
                href: "/membership",
                icon: Users,
                title: "Membership",
                desc: "Join our growing community",
              },
              {
                href: "/activities/announcement",
                icon: Award,
                title: "News & Updates",
                desc: "Latest achievements and announcements",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-border/50 bg-card/80 backdrop-blur-sm">
                      <CardHeader className="text-center">
                        <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                        <CardTitle className="text-card-foreground">
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CurvyDivider className="text-card rotate-180" />

      {/* Events Section */}
      <section
        id="events"
        className="py-16 bg-card/30 relative overflow-hidden"
      >
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-blob" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Upcoming Events
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={`activities/upcoming-events/${event.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm h-full flex flex-col cursor-pointer">
                    {event.image ? (
                      <div
                        className="aspect-video bg-cover bg-center rounded-t-lg flex-shrink-0"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex-shrink-0" />
                    )}

                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        {event.category && (
                          <Badge
                            variant="secondary"
                            className="bg-accent text-accent-foreground"
                          >
                            {event.category}
                          </Badge>
                        )}

                        <span className="text-sm text-muted-foreground">
                          {event.date
                            ? new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                          {event.time ? ` • ${event.time}` : ""}
                        </span>
                      </div>

                      <CardTitle className="text-card-foreground">
                        {event.title}
                      </CardTitle>

                      <CardDescription className="flex-1 text-gray-600">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-auto">
                      {event.registration_link ? (
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Register Now
                          </Button>
                        </a>
                      ) : (
                        <Button
                          disabled
                          className="w-full bg-gray-400 cursor-not-allowed"
                          onClick={(e) => e.stopPropagation()}
                        >
                          No Registration
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Message from Leadership
                </h2>
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  &quot;The ASCE Student Chapter at MIST represents the future
                  of civil engineering in Bangladesh. Through innovative
                  thinking, collaborative learning, and practical application of
                  engineering principles, our students are preparing to tackle
                  the infrastructure challenges of tomorrow. I am proud to
                  witness their dedication to excellence and their commitment to
                  building a better, more sustainable future for our
                  nation.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src="https://mist.ac.bd/storage/files/ce/WhatsApp%20Image%202025-01-11%20at%2015.06.05_f543d5cd.jpg"
                      alt="Brig General A N M Foyezur Rahman"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      Brig General A N M Foyezur Rahman
                    </p>
                    <p className="text-gray-600 text-sm">ndc, psc</p>
                    <p className="text-gray-600 text-sm font-medium">
                      Head of the Department of CE, MIST
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                    <img
                      src="https://mist.ac.bd/storage/files/ce/WhatsApp%20Image%202025-01-11%20at%2015.06.05_f543d5cd.jpg"
                      alt="Brig General A N M Foyezur Rahman, ndc, psc"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-200/30 to-blue-300/30 rounded-full translate-y-24 -translate-x-24"></div>
      </section>

      {/* Faculty Advisor Message Section */}
      <section className="py-12 bg-gradient-to-l from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Faculty Advisor's Message
                </h3>
                <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                  &quot;As Faculty Advisor of the ASCE Student Chapter at MIST,
                  I am continually inspired by our students&apos; passion for civil
                  engineering excellence. Their dedication to learning,
                  innovation, and professional development makes me confident
                  they will become the leaders who will shape the future of
                  infrastructure and construction in Bangladesh and
                  beyond.&quot;
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src="https://mist.ac.bd/storage/files/ce/image/Sakil-sir.jpeg"
                      alt="Lt Col Khondaker Sakil Ahmed"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      Lt Col Khondaker Sakil Ahmed, PhD, PEng, Engrs
                    </p>
                    <p className="text-gray-600 text-sm">
                      Associate Professor, Department of Civil Engineering (CE)
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      Faculty Advisor, ASCE Student Chapter, MIST
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-white">
                    <img
                      src="https://mist.ac.bd/storage/files/ce/image/Sakil-sir.jpeg"
                      alt="Lt Col Khondaker Sakil Ahmed, Faculty Advisor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-green-200/20 to-emerald-300/20 rounded-full -translate-y-20 -translate-x-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-200/20 to-green-300/20 rounded-full translate-y-16 translate-x-16"></div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <CardDescription className="text-base italic">
                  &quot;Being part of ASCE @ MIST has opened doors to incredible
                  networking opportunities and helped me grow as a future civil
                  engineer.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      AI
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Ariful Islam
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Chapter President
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <CardDescription className="text-base italic">
                  &quot;The competitions and workshops have enhanced my
                  technical skills and prepared me for real-world engineering
                  challenges.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      MKS
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Mohd. Mostafa Hossain Khan Samrat
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vice President
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <CardDescription className="text-base italic">
                  &quot;Being part of the ASCE Student Chapter has given me
                  amazing research opportunities, and the guidance from our
                  faculty advisors has really helped me learn and grow
                  professionally.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      AAI
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Ahsan Azim Imran
                    </p>
                    <p className="text-sm text-muted-foreground">Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
