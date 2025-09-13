"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample achievements data (same as in main page)
const achievements = [
  {
    id: 1,
    title: "Best Student Chapter Award 2024",
    category: "Chapter Excellence",
    date: "2024-03-15",
    description:
      "Recognized as the Best ASCE Student Chapter in Bangladesh for outstanding activities and member engagement.",
    image: "/images/best-chapter-award.jpg",
    awardedBy: "ASCE International",
    level: "National",
    details:
      "This prestigious award recognizes our chapter's exceptional performance in organizing technical events, community service projects, and maintaining high academic standards among members. The evaluation criteria included member engagement, project impact, and overall contribution to the engineering community.",
    criteria: [
      "Outstanding member participation and engagement",
      "Successful organization of 15+ technical events",
      "Community service projects impacting 1000+ people",
      "Maintaining 95% academic performance rate among members",
    ],
    impact:
      "This recognition has elevated our chapter's profile nationally and internationally, leading to increased collaboration opportunities with other engineering organizations and enhanced support from the university administration.",
  },
  {
    id: 2,
    title: "Outstanding Community Service Project",
    category: "Community Service",
    date: "2024-02-20",
    description: "Awarded for the flood relief infrastructure project that helped 500+ families in rural Bangladesh.",
    image: "/images/community-service-award.jpg",
    awardedBy: "Bangladesh Engineering Council",
    level: "National",
    details:
      "Our comprehensive flood relief project involved designing and implementing temporary bridge solutions, water purification systems, and emergency shelter structures for flood-affected communities in rural Bangladesh.",
    criteria: [
      "Innovative engineering solutions for disaster relief",
      "Direct impact on 500+ families",
      "Sustainable and cost-effective design approach",
      "Successful collaboration with local authorities",
    ],
    impact:
      "The project provided immediate relief to flood victims and established long-term infrastructure improvements that continue to benefit the communities. It also served as a model for other student organizations.",
  },
  {
    id: 3,
    title: "Innovation in Sustainable Engineering",
    category: "Innovation",
    date: "2024-01-10",
    description: "Recognition for developing eco-friendly concrete solutions using local waste materials.",
    image: "/images/innovation-award.jpg",
    awardedBy: "Green Engineering Society",
    level: "International",
    details:
      "Our research team developed a revolutionary concrete mixture incorporating rice husk ash and plastic waste, reducing environmental impact while maintaining structural integrity and cost-effectiveness.",
    criteria: [
      "Novel use of local waste materials",
      "30% reduction in carbon footprint",
      "Maintained structural performance standards",
      "Scalable and economically viable solution",
    ],
    impact:
      "This innovation has been adopted by local construction companies and has potential for widespread implementation across South Asia, contributing to sustainable construction practices.",
  },
  {
    id: 4,
    title: "Student Leadership Excellence",
    category: "Leadership",
    date: "2023-12-05",
    description:
      "Awarded to chapter president for exceptional leadership in organizing technical events and workshops.",
    image: "/images/leadership-award.jpg",
    awardedBy: "MIST Administration",
    level: "Institutional",
    details:
      "Recognition of outstanding leadership qualities demonstrated through successful coordination of multiple large-scale events, effective team management, and innovative approaches to student engagement.",
    criteria: [
      "Successful leadership of 50+ member organization",
      "Organization of 20+ technical events and workshops",
      "Increased chapter membership by 40%",
      "Established partnerships with industry professionals",
    ],
    impact:
      "Under this leadership, the chapter achieved record participation in events and significantly enhanced its reputation within the university and professional engineering community.",
  },
  {
    id: 5,
    title: "Best Technical Paper Presentation",
    category: "Research",
    date: "2023-11-18",
    description: "First place in national student paper competition for research on earthquake-resistant structures.",
    image: "/images/technical-paper-award.jpg",
    awardedBy: "Bangladesh Earthquake Society",
    level: "National",
    details:
      "Our research paper presented innovative seismic isolation techniques for low-rise buildings in earthquake-prone areas of Bangladesh, combining traditional construction methods with modern engineering principles.",
    criteria: [
      "Original research contribution to seismic engineering",
      "Practical applicability in local context",
      "Rigorous methodology and analysis",
      "Clear presentation and communication",
    ],
    impact:
      "The research findings have been incorporated into local building code recommendations and have influenced seismic design practices in the region.",
  },
  {
    id: 6,
    title: "Outstanding Volunteer Service",
    category: "Volunteer Service",
    date: "2023-10-25",
    description:
      "Recognition for 200+ hours of volunteer service in disaster relief and community development projects.",
    image: "/images/volunteer-award.jpg",
    awardedBy: "National Volunteer Association",
    level: "National",
    details:
      "Chapter members collectively contributed over 200 hours of volunteer service in various community development projects, including infrastructure assessment, educational programs, and disaster preparedness training.",
    criteria: [
      "Minimum 200 hours of documented volunteer service",
      "Diverse range of community service activities",
      "Measurable positive impact on communities",
      "Sustained commitment over academic year",
    ],
    impact:
      "Our volunteer efforts have strengthened community ties and established the chapter as a reliable partner for local development initiatives.",
  },
  {
    id: 7,
    title: "Excellence in Academic Performance",
    category: "Academic",
    date: "2023-09-12",
    description: "Collective recognition for maintaining highest GPA among all student organizations at MIST.",
    image: "/images/academic-excellence.jpg",
    awardedBy: "MIST Academic Council",
    level: "Institutional",
    details:
      "The chapter maintained an average GPA of 3.8/4.0 among all members, demonstrating the successful balance of extracurricular activities with academic excellence.",
    criteria: [
      "Highest collective GPA among student organizations",
      "95% of members maintaining good academic standing",
      "Peer tutoring and academic support programs",
      "Integration of academic learning with practical projects",
    ],
    impact:
      "This achievement has enhanced the chapter's credibility and attracted high-achieving students, creating a positive cycle of academic and professional excellence.",
  },
  {
    id: 8,
    title: "Best Engineering Design Competition",
    category: "Competition",
    date: "2023-08-30",
    description: "First place in inter-university bridge design competition with innovative cable-stayed design.",
    image: "/images/design-competition.jpg",
    awardedBy: "Engineering Design Council",
    level: "National",
    details:
      "Our team designed and built a scale model of a cable-stayed bridge that demonstrated superior load-bearing capacity and aesthetic appeal, incorporating sustainable materials and innovative construction techniques.",
    criteria: [
      "Structural efficiency and load-bearing capacity",
      "Innovation in design and materials",
      "Aesthetic and functional integration",
      "Cost-effectiveness and sustainability",
    ],
    impact:
      "The winning design has been featured in engineering journals and has inspired similar competitions at other universities, promoting innovation in structural engineering education.",
  },
  {
    id: 9,
    title: "Outstanding Event Organization",
    category: "Event Management",
    date: "2023-07-14",
    description: "Excellence award for organizing the largest student engineering conference in Bangladesh.",
    image: "/images/event-organization.jpg",
    awardedBy: "Conference Management Board",
    level: "National",
    details:
      "Successfully organized a three-day engineering conference with 500+ participants, featuring keynote speakers from industry and academia, technical sessions, and networking opportunities.",
    criteria: [
      "Scale and scope of event organization",
      "Quality of speakers and technical content",
      "Participant satisfaction and engagement",
      "Successful logistics and financial management",
    ],
    impact:
      "The conference established new standards for student-organized technical events and created lasting professional networks among participants from across the country.",
  },
  {
    id: 10,
    title: "Environmental Impact Recognition",
    category: "Environment",
    date: "2023-06-22",
    description: "Awarded for implementing campus-wide water conservation project reducing usage by 30%.",
    image: "/images/environmental-award.jpg",
    awardedBy: "Environmental Protection Agency",
    level: "National",
    details:
      "Implemented a comprehensive water conservation system including rainwater harvesting, greywater recycling, and smart irrigation systems across the MIST campus.",
    criteria: [
      "Measurable environmental impact (30% water reduction)",
      "Innovative conservation technologies",
      "Campus-wide implementation and adoption",
      "Sustainability and long-term viability",
    ],
    impact:
      "The project has saved thousands of liters of water annually and has been replicated at other educational institutions, contributing to national water conservation efforts.",
  },
  {
    id: 11,
    title: "Student Mentorship Excellence",
    category: "Mentorship",
    date: "2023-05-08",
    description: "Recognition for establishing successful peer mentoring program for junior engineering students.",
    image: "/images/mentorship-award.jpg",
    awardedBy: "Student Development Council",
    level: "Institutional",
    details:
      "Developed and implemented a comprehensive peer mentoring program that pairs senior chapter members with junior students, providing academic support, career guidance, and professional development opportunities.",
    criteria: [
      "Structured mentoring program with clear objectives",
      "High participation and retention rates",
      "Measurable improvement in mentee performance",
      "Positive feedback from participants and faculty",
    ],
    impact:
      "The mentoring program has improved academic performance among junior students and has been adopted as a model by other student organizations within the university.",
  },
  {
    id: 12,
    title: "Technology Innovation Award",
    category: "Technology",
    date: "2023-04-16",
    description: "Awarded for developing mobile app for structural health monitoring using IoT sensors.",
    image: "/images/technology-award.jpg",
    awardedBy: "Tech Innovation Hub",
    level: "International",
    details:
      "Developed a mobile application integrated with IoT sensors for real-time monitoring of structural health in buildings and bridges, providing early warning systems for potential structural issues.",
    criteria: [
      "Innovation in IoT and mobile technology integration",
      "Practical application in structural engineering",
      "User-friendly interface and functionality",
      "Potential for commercial viability and scaling",
    ],
    impact:
      "The application has attracted interest from engineering firms and government agencies, with potential for widespread adoption in infrastructure monitoring and maintenance.",
  },
]

export default function AchievementDetailPage() {
  const params = useParams()
  const achievementId = Number.parseInt(params.id as string)

  const achievement = achievements.find((a) => a.id === achievementId)

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Achievement Not Found</h1>
          <p className="text-gray-600 mb-6">The achievement you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/achievements">Back to Achievements</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Chapter Excellence": "bg-purple-100 text-purple-800",
      "Community Service": "bg-blue-100 text-blue-800",
      Innovation: "bg-green-100 text-green-800",
      Leadership: "bg-yellow-100 text-yellow-800",
      Research: "bg-red-100 text-red-800",
      "Volunteer Service": "bg-indigo-100 text-indigo-800",
      Academic: "bg-pink-100 text-pink-800",
      Competition: "bg-orange-100 text-orange-800",
      "Event Management": "bg-teal-100 text-teal-800",
      Environment: "bg-emerald-100 text-emerald-800",
      Mentorship: "bg-violet-100 text-violet-800",
      Technology: "bg-cyan-100 text-cyan-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-yellow-100 text-yellow-800 border-yellow-200",
      National: "bg-blue-100 text-blue-800 border-blue-200",
      Institutional: "bg-green-100 text-green-800 border-green-200",
    }
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/achievements">← Back to Achievements</Link>
          </Button>
        </div>

        {/* Achievement Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video relative">
            <img
              src={achievement.image || "/placeholder.svg"}
              alt={achievement.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <Badge className={`${getLevelColor(achievement.level)} border text-lg px-4 py-2`}>
                {achievement.level} Level
              </Badge>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
              <span className="text-gray-500">
                {new Date(achievement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{achievement.title}</h1>

            <p className="text-lg text-gray-600 mb-6">{achievement.description}</p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Awarded By</h3>
              <p className="text-gray-700">{achievement.awardedBy}</p>
            </div>
          </div>
        </div>

        {/* Achievement Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Details Section */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievement Details</h2>
              <p className="text-gray-700 leading-relaxed">{achievement.details}</p>
            </CardContent>
          </Card>

          {/* Criteria Section */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Evaluation Criteria</h2>
              <ul className="space-y-3">
                {achievement.criteria.map((criterion, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <Card className="bg-white mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact & Significance</h2>
            <p className="text-gray-700 leading-relaxed">{achievement.impact}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button asChild>
            <Link href="/achievements">View All Achievements</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
