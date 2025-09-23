"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

// Sample announcement data (same as in the main page)
const announcements = [
  {
    id: 1,
    type: "Achievement",
    date: "Dec 8, 2024",
    title: "MIST Team Wins National Bridge Competition",
    desc: "Our student team secured first place in the Bangladesh National Bridge Design Competition with their innovative sustainable design approach.",
    image: "/images/engineering-students-celebrating-with-trophy-at-br.jpg",
    priority: true,
    fullContent:
      "The ASCE @ MIST student team has achieved a remarkable victory in the Bangladesh National Bridge Design Competition 2024. The team, consisting of final-year Civil Engineering students, presented an innovative sustainable bridge design that impressed the judges with its environmental consciousness and structural efficiency. The winning design incorporated recycled materials and advanced engineering principles to create a cost-effective solution for rural connectivity. This achievement highlights the exceptional talent and dedication of our students in applying theoretical knowledge to real-world challenges.",
    impact:
      "This victory brings national recognition to MIST and demonstrates our commitment to sustainable engineering solutions.",
    participants: ["Md. Rahman Ahmed", "Fatima Khatun", "Sabbir Hassan", "Nusrat Jahan"],
    mentor: "Dr. Aminul Islam, Professor of Civil Engineering",
  },
  {
    id: 2,
    type: "Research",
    date: "Nov 28, 2024",
    title: "New Research Lab Opens at MIST",
    desc: "State-of-the-art Structural Engineering Research Laboratory inaugurated with advanced testing equipment and simulation capabilities.",
    image: "/images/modern-engineering-laboratory-with-testing-equipme.jpg",
    priority: false,
    fullContent:
      "The Military Institute of Science and Technology has inaugurated a cutting-edge Structural Engineering Research Laboratory, marking a significant milestone in engineering education and research capabilities. The laboratory is equipped with advanced testing equipment including universal testing machines, concrete compression testing apparatus, and computer-controlled structural analysis systems. This facility will enable students and faculty to conduct high-quality research in structural engineering, materials science, and earthquake engineering.",
    impact:
      "The new laboratory will enhance research capabilities and provide hands-on experience for students in advanced structural testing.",
    facilities: [
      "Universal Testing Machine (500kN capacity)",
      "Concrete Compression Testing Equipment",
      "Steel Tensile Testing Apparatus",
      "Computer-Controlled Data Acquisition Systems",
      "Structural Analysis Software Suite",
    ],
    funding: "Ministry of Science and Technology, Bangladesh",
  },
  {
    id: 3,
    type: "Partnership",
    date: "Nov 15, 2024",
    title: "Industry Partnership with Leading Construction Firm",
    desc: "ASCE @ MIST announces strategic partnership with Bangladesh top construction company for internships and research collaboration.",
    image: "/images/professional-handshake-between-university-and-indu.jpg",
    priority: false,
    fullContent:
      "ASCE @ MIST has entered into a strategic partnership with one of Bangladesh leading construction companies to enhance practical learning opportunities for students. This collaboration will provide internship opportunities, industry mentorship, and real-world project exposure for Civil Engineering students. The partnership also includes joint research initiatives focusing on sustainable construction practices and innovative building technologies.",
    impact:
      "This partnership bridges the gap between academic learning and industry practice, providing valuable career opportunities for students.",
    benefits: [
      "Guaranteed internship placements for qualified students",
      "Industry mentorship programs",
      "Access to real construction projects",
      "Joint research opportunities",
      "Career placement assistance",
    ],
    partner: "ABC Construction Ltd. - Leading infrastructure development company in Bangladesh",
  },
  // Add more announcements as needed...
]

interface AnnouncementDetailPageProps {
  params: {
    id: string
  }
}

export default function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const announcement = announcements.find((a) => a.id === Number.parseInt(params.id))

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Announcement Not Found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Achievement":
        return "bg-green-100 text-green-800 border-green-200"
      case "Research":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Partnership":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Event":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Announcements
        </Button>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={`${getTypeColor(announcement.type)} border`}>
                    <Tag className="w-3 h-3 mr-1" />
                    {announcement.type}
                  </Badge>
                  {announcement.priority && (
                    <Badge className="bg-red-100 text-red-800 border-red-200 border">Priority</Badge>
                  )}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {announcement.date}
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{announcement.title}</h1>
              </div>

              {/* Image */}
              <div className="w-full">
                <img
                  src={announcement.image || "/placeholder.svg"}
                  alt={announcement.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">{announcement.fullContent || announcement.desc}</p>
                </div>

                {announcement.impact && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Impact</h2>
                    <p className="text-gray-700 leading-relaxed">{announcement.impact}</p>
                  </div>
                )}

                {announcement.participants && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Team Members</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {announcement.participants.map((participant, index) => (
                        <li key={index}>{participant}</li>
                      ))}
                    </ul>
                    {announcement.mentor && (
                      <p className="text-gray-600 mt-2">
                        <strong>Mentor:</strong> {announcement.mentor}
                      </p>
                    )}
                  </div>
                )}

                {announcement.facilities && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Facilities & Equipment</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {announcement.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                    {announcement.funding && (
                      <p className="text-gray-600 mt-2">
                        <strong>Funding:</strong> {announcement.funding}
                      </p>
                    )}
                  </div>
                )}

                {announcement.benefits && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Partnership Benefits</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {announcement.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    {announcement.partner && (
                      <p className="text-gray-600 mt-2">
                        <strong>Partner:</strong> {announcement.partner}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
