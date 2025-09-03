"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Award, BookOpen, MapPin, Mail, Phone, ExternalLink } from "lucide-react"
import Navigation from "@/components/navigation"
import { LampContainer } from "@/components/lamp-container"
import { FloatingBlobs, CurvyDivider } from "@/components/organic-shape"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Component */}
      <Navigation currentPath="/" />

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
            Join the ASCE Student Chapter at Military Institute of Science and Technology (MIST), Bangladesh. Connect
            with professionals, engage in research, and shape the future of civil engineering from our state-of-the-art
            campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl font-semibold">
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
              The American Society of Civil Engineers (ASCE) is the world's oldest national engineering society. Our
              student chapter at MIST focuses on professional development, networking, research opportunities, and
              preparing the next generation of civil engineering leaders in Bangladesh.
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
              { icon: Calendar, title: "Upcoming Events", desc: "Seminars, workshops, and competitions" },
              { icon: BookOpen, title: "Projects & Research", desc: "Ongoing research and student projects" },
              { icon: Users, title: "Membership", desc: "Join our growing community" },
              { icon: Award, title: "News & Updates", desc: "Latest achievements and announcements" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-card-foreground">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CurvyDivider className="text-card rotate-180" />

      {/* Events Section */}
      <section id="events" className="py-16 bg-card/30 relative overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "Workshop",
                date: "Dec 15, 2024",
                title: "Structural Design Workshop",
                desc: "Learn advanced structural design principles with industry experts",
              },
              {
                type: "Competition",
                date: "Jan 20, 2025",
                title: "Bridge Design Competition",
                desc: "Annual student competition for innovative bridge designs",
              },
              {
                type: "Seminar",
                date: "Feb 5, 2025",
                title: "Sustainable Infrastructure",
                desc: "Exploring green building practices and sustainable development",
              },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {event.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <CardTitle className="text-card-foreground">{event.title}</CardTitle>
                    <CardDescription>{event.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {event.type === "Competition" ? "Learn More" : "Register Now"}
                    </Button>
                  </CardContent>
                </Card>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
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
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
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
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Become a Member Today
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardDescription className="text-base italic">
                  "Being part of ASCE @ MIST has opened doors to incredible networking opportunities and helped me grow
                  as a future civil engineer."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">SA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Ahmed</p>
                    <p className="text-sm text-muted-foreground">Chapter President</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="text-base italic">
                  "The research opportunities and mentorship from faculty advisors have been invaluable for my academic
                  and professional development."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Dr. Mohammad Rahman</p>
                    <p className="text-sm text-muted-foreground">Faculty Advisor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="text-base italic">
                  "The competitions and workshops have enhanced my technical skills and prepared me for real-world
                  engineering challenges."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">AH</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ahmed Hassan</p>
                    <p className="text-sm text-muted-foreground">Student Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-background py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">A</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">ASCE Student Chapter</h3>
                  <p className="text-sm opacity-80">MIST, Bangladesh</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Building the future of civil engineering through education, research, and professional development.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>MIST Campus, Mirpur Cantonment, Dhaka</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>asce@mist.ac.bd</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+880-2-8031101</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-primary transition-colors">
                  ASCE Global Website
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  MIST Official Site
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Student Resources
                </a>
                <a href="#" className="block hover:text-primary transition-colors">
                  Career Opportunities
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 ASCE Student Chapter - MIST. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
