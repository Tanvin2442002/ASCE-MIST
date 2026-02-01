"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Eye, Heart, Lightbulb, Handshake, Leaf, Trophy, Crown } from "lucide-react"
import Navigation from "@/components/navigation"
import { FloatingBlobs, CurvyDivider } from "@/components/organic-shape"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute left-8 top-0 bottom-0 w-1 z-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 20 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M10 0 Q15 100 8 200 Q3 300 12 400 Q18 500 6 600 Q2 700 14 800 Q16 900 10 1000"
            stroke="url(#curveGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#0d9488" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#0d9488" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Navigation Component */}
      {/* <Navigation currentPath="/about" /> */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/10 relative overflow-hidden">
        <FloatingBlobs />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-20 left-20 w-2 h-32 bg-gradient-to-b from-emerald-500/40 to-transparent rounded-full" />
        <div className="absolute bottom-20 right-32 w-32 h-2 bg-gradient-to-r from-teal-500/40 to-transparent rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">About Our Chapter</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Building Tomorrow&apos;s
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {" "}
                Civil Engineers
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              The ASCE Student Chapter at Military Institute of Science and Technology (MIST) is dedicated to fostering
              excellence in civil engineering education, research, and professional development in Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      <CurvyDivider className="text-background -mt-1" />

      {/* Introduction Section */}
      <section className="py-16 bg-emerald-50/30 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-10 left-1/2 w-1 h-24 bg-gradient-to-b from-emerald-500/30 to-transparent rounded-full" />
        <div className="absolute bottom-10 right-20 w-20 h-1 bg-gradient-to-r from-teal-500/30 to-transparent rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Foundation</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The American Society of Civil Engineers (ASCE) brings together civil engineers from around the world
                  to plan, design, and build a community that is not only safe and comfortable for humans, but also
                  minimizes environmental damage.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As the MIST chapter of this prestigious global organization, we serve as a bridge between academic
                  learning and professional practice, preparing our students to become leaders in Bangladesh&apos;s civil
                  engineering landscape.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-24 h-24 text-emerald-600" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-emerald-500/40 rounded-tl-lg" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-teal-500/40 rounded-br-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-bl from-emerald-500/15 to-teal-500/15 rounded-full blur-xl animate-blob" />
        <div className="absolute top-0 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute left-10 top-1/2 w-1 h-16 bg-gradient-to-b from-emerald-500/40 to-teal-500/40 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Target className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            </div>
            <Card className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20 shadow-xl">
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed text-center">
                  The ASCE Student Chapter at MIST aims to bridge the gap between civil engineering students and
                  professionals. In the coming years, the chapter intends to bring students closer to professional civil
                  engineering activities by connecting them with distinguished alumni, hosting seminars and webinars,
                  and organizing symposiums and technical sessions. Students will also get opportunities to participate
                  in contests that test their knowledge across various civil engineering disciplines, including
                  structural, transportation, geotechnical, and environmental engineering.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <CurvyDivider className="text-muted/20" />

      {/* Vision Section */}
      <section className="py-16 bg-green-50/20 relative overflow-hidden">
        <FloatingBlobs />
        <div className="absolute top-10 right-10 w-24 h-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full" />
        <div className="absolute bottom-20 left-20 w-1 h-20 bg-gradient-to-b from-teal-500/50 to-transparent rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-emerald-500/10 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Eye className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
            </div>
            <Card className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border-teal-500/20 shadow-xl">
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed text-center mb-6">
                  As a forward-looking student organization, the ASCE Student Chapter at MIST works to promote
                  technological advancement for the overall betterment of the civil engineering field in Bangladesh. Our
                  vision includes empowering students with modern tools, knowledge-sharing opportunities, and exposure
                  to practical applications of civil engineering.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  {['Panel Discussions', 'Technical Paper Presentations', 'Organized Symposiums', 'Competitions'].map(
                    (activity, index) => (
                      <motion.div
                        key={activity}
                        className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-emerald-500/20 relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30" />
                        <p className="font-semibold text-foreground">{activity}</p>
                      </motion.div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <CurvyDivider className="text-muted/20 rotate-180" />

      {/* Values Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tl from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-20 left-20 w-16 h-1 bg-gradient-to-r from-emerald-500/40 to-transparent rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-1 h-12 bg-gradient-to-b from-teal-500/40 to-transparent rounded-full" />
        <div className="absolute top-1/3 right-20 w-20 h-20 border border-emerald-500/20 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <Heart className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                These fundamental principles guide our actions and shape our commitment to excellence in civil
                engineering education and practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description:
                    "Encouraging creative solutions for modern engineering challenges through cutting-edge research and forward-thinking approaches.",
                  color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
                },
                {
                  icon: Handshake,
                  title: "Collaboration",
                  description:
                    "Building strong connections between students, professionals, and academia to foster knowledge sharing and mutual growth.",
                  color: "from-green-500/10 to-emerald-500/10 border-green-500/20",
                },
                {
                  icon: Leaf,
                  title: "Sustainability",
                  description:
                    "Promoting practices that minimize environmental impact and contribute to sustainable development in Bangladesh.",
                  color: "from-teal-500/10 to-green-500/10 border-teal-500/20",
                },
                {
                  icon: Trophy,
                  title: "Excellence",
                  description:
                    "Striving for the highest standards in education, research, and practice to maintain our reputation for quality.",
                  color: "from-emerald-600/10 to-green-600/10 border-emerald-600/20",
                },
                {
                  icon: Crown,
                  title: "Leadership",
                  description:
                    "Inspiring students to become future leaders in the civil engineering community and drive positive change.",
                  color: "from-teal-600/10 to-emerald-600/10 border-teal-600/20",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "Building a supportive network that extends beyond graduation, creating lifelong professional relationships.",
                  color: "from-green-600/10 to-teal-600/10 border-green-600/20",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card
                    className={`h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${value.color} backdrop-blur-sm relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-0.5 bg-gradient-to-l from-emerald-500/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-teal-500/40 to-transparent" />
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-background/50 rounded-full flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-emerald-600" />
                      </div>
                      <CardTitle className="text-foreground text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center leading-relaxed text-muted-foreground">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-green-500/10 relative overflow-hidden">
        <FloatingBlobs />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-teal-500/30 to-transparent" />
        <div className="absolute top-10 left-10 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-r-2 border-b-2 border-teal-500/30 rounded-br-lg" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Be part of a community that&apos;s shaping the future of civil engineering in Bangladesh. Together, we can
              build a better tomorrow through innovation, collaboration, and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg">
                Become a Member
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}
