import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, User, Play, ExternalLink } from "lucide-react"

// Sample seminar data (same as in the main page)
const seminars = [
  {
    id: 1,
    title: "Sustainable Infrastructure Development in Bangladesh",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    speaker: "Dr. Ahmed Rahman",
    designation: "Professor, Civil Engineering, MIST",
    location: "ASCE Auditorium, MIST",
    attendees: 150,
    image: "/images/sustainable-infrastructure-seminar.jpg",
    additionalImages: [
      {
        url: "/images/sustainable-infrastructure-speaker.jpg",
        caption: "Dr. Ahmed Rahman presenting on sustainable practices",
      },
      {
        url: "/images/sustainable-infrastructure-audience.jpg",
        caption: "Engaged audience during the Q&A session",
      },
    ],
    description:
      "An in-depth discussion on sustainable infrastructure practices and their implementation in Bangladesh's development projects. The seminar covered topics including green construction materials, energy-efficient design principles, and environmental impact assessment methodologies.",
    fullDescription:
      "With the growing concern for environmental sustainability, this seminar addressed the critical need for sustainable infrastructure development in Bangladesh. Dr. Ahmed Rahman, a renowned expert in sustainable engineering, shared insights from his extensive research and practical experience in implementing eco-friendly construction practices. The session covered innovative approaches to reduce carbon footprint in construction projects, the use of locally sourced sustainable materials, and the integration of renewable energy systems in infrastructure design. Participants gained valuable knowledge about international sustainability standards and their adaptation to local contexts, making this seminar highly relevant for practicing engineers and students alike.",
    videoUrl: "https://youtube.com/watch?v=example1",
    objectives: [
      "Understanding sustainable construction principles",
      "Learning about green building materials and techniques",
      "Exploring renewable energy integration in infrastructure",
      "Discussing environmental impact assessment methods",
    ],
  },
  {
    id: 2,
    title: "Earthquake Resistant Design for High-Rise Buildings",
    date: "February 28, 2024",
    time: "3:00 PM - 5:00 PM",
    speaker: "Prof. Dr. Mehedi Hasan",
    designation: "Structural Engineer & Researcher",
    location: "Civil Engineering Auditorium",
    attendees: 120,
    image: "/images/earthquake-resistant-design-seminar.jpg",
    additionalImages: [
      {
        url: "/images/earthquake-design-presentation.jpg",
        caption: "Prof. Dr. Mehedi Hasan explaining seismic design principles",
      },
      {
        url: "/images/earthquake-design-models.jpg",
        caption: "Structural models demonstrating earthquake resistance",
      },
    ],
    description:
      "Exploring modern techniques and technologies for designing earthquake-resistant high-rise structures.",
    fullDescription:
      "This comprehensive seminar focused on the latest developments in seismic design for high-rise buildings, particularly relevant for Bangladesh's growing urban landscape. Prof. Dr. Mehedi Hasan presented cutting-edge research on base isolation systems, damping technologies, and advanced structural analysis methods. The session included case studies from recent earthquake events worldwide and their implications for building design standards in seismically active regions.",
    videoUrl: "https://youtube.com/watch?v=example2",
    objectives: [
      "Understanding seismic forces and their effects on structures",
      "Learning about modern earthquake-resistant design techniques",
      "Exploring base isolation and damping systems",
      "Analyzing case studies from recent seismic events",
    ],
  },
  // Add more seminars as needed...
]

interface SeminarDetailPageProps {
  params: {
    id: string
  }
}

export default function SeminarDetailPage({ params }: SeminarDetailPageProps) {
  const seminarId = Number.parseInt(params.id)
  const seminar = seminars.find((s) => s.id === seminarId)

  if (!seminar) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/activities/seminar">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seminars
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">{seminar.title}</h1>
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-lg">
              Date: {seminar.date} • {seminar.time}
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <img
            src={seminar.image || "/placeholder.svg"}
            alt={seminar.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-sm text-gray-600 mt-2">Seminar participants and faculty members</p>
        </div>

        {/* Speaker Info and Watch Button */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 mr-2 text-gray-600" />
                <span className="font-semibold text-lg">{seminar.speaker}</span>
              </div>
              <p className="text-gray-600 ml-7">{seminar.designation}</p>
              <div className="flex items-center mt-2 ml-7">
                <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-gray-600">{seminar.location}</span>
              </div>
            </div>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Play className="w-5 h-5 mr-2" />
              Watch Seminar
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Additional Images */}
        {seminar.additionalImages && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {seminar.additionalImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={img.caption}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-center text-sm text-gray-600 mt-2">{img.caption}</p>
              </div>
            ))}
          </div>
        )}

        {/* Seminar Objectives */}
        {seminar.objectives && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seminar Objectives</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {seminar.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">{seminar.fullDescription || seminar.description}</p>
        </div>

        {/* Watch Button (Bottom) */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
            <Play className="w-5 h-5 mr-2" />
            Watch Full Seminar
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
