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

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

      {/* Hero Section */}
      <LampContainer className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/524640275_1288113439631694_7476496094961356942_n.jpg-QhwDoJNPfxOPoGf7UXvNrsAc08FdNb.jpeg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-primary/35"></div>
        </div>

        <FloatingBlobs />
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 text-center relative z-10"
        >
          <h1 className="bg-gradient-to-br from-white to-white py-4 bg-clip-text text-4xl md:text-7xl font-bold tracking-tight text-transparent mb-6 text-balance drop-shadow-2xl">
            Building Leaders in <br /> Civil Engineering
          </h1>
          <p className="text-xl text-white mb-8 text-pretty max-w-2xl mx-auto drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-lg p-6">
            Join the ASCE Student Chapter at Military Institute of Science and
            Technology (MIST), Bangladesh. Connect with professionals, engage in
            research, and shape the future of civil engineering from our
            state-of-the-art campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-2xl font-semibold"
            >
              Join Our Chapter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary bg-white/20 backdrop-blur-sm shadow-2xl font-semibold"
            >
              Explore Campus
            </Button>
          </div>
        </motion.div>
      </LampContainer>

      <CurvyDivider className="text-primary -mt-1" />

      {/* Announcements Section */}
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
                        {/* Optionally show a short preview, or remove this line if you don't want description */}
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
                {/* Link with className (no passHref / legacyBehavior) */}
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
                        /* stopPropagation so Register opens the external link and doesn't trigger card navigation */
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

      {/* Why Join Section */}
      <section id="membership" className="py-16 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-full blur-xl animate-float" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-center text-foreground mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Why Join ASCE @ MIST?
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Professional Networking",
                    desc: "Connect with industry professionals and build lasting relationships",
                  },
                  {
                    icon: BookOpen,
                    title: "Research Opportunities",
                    desc: "Participate in cutting-edge research and publication opportunities",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Award,
                    title: "Leadership Development",
                    desc: "Develop leadership skills through competitions and chapter activities",
                  },
                  {
                    icon: ExternalLink,
                    title: "Global Community",
                    desc: "Access to the worldwide ASCE network and resources",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => (window.location.href = "/membership")}
              >
                Become a Member Today
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-primary/10 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>Event Photo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
                      SA
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Ahmed</p>
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
                      AH
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Ahmed Hassan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Student Member
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full flex flex-col">
              <CardHeader className="flex-1">
                <CardDescription className="text-base italic">
                  &quot;The research opportunities and mentorship from faculty
                  advisors have been invaluable for my academic and professional
                  development.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      MR
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Dr. Mohammad Rahman
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faculty Advisor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
