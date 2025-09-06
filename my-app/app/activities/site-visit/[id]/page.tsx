import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SiteVisit {
  id: number
  title: string
  location: string
  date: string
  description: string
  image: string
  participants: number
  department?: string
  detailedDescription?: string
  additionalImages?: { url: string; caption: string }[]
}

const siteVisits: SiteVisit[] = [
  {
    id: 1,
    title: "Educational Visit to Padma Multipurpose Bridge",
    location: "Padma Bridge, Bangladesh",
    date: "December 15, 2022",
    description:
      "Students from the Civil Engineering department visited the iconic Padma Multipurpose Bridge to understand the engineering marvels and construction techniques used in this mega infrastructure project.",
    image: "/images/padma-bridge-visit.png",
    participants: 45,
    department: "Civil Engineering",
    detailedDescription:
      "With the support of Department of Civil Engineering MIST, ASCE Student Chapter, MIST arranged three field tours to the Padma Multipurpose Bridge for general students of MIST. The program was overseen by the Honorable Project Director, Faculty Advisor, Teachers, and ASCE Student Body.",
    additionalImages: [
      {
        url: "/images/padma-bridge-professor.jpg",
        caption: "Professor Dr. Khan Mahmud Amanat Sir answering queries of students.",
      },
      {
        url: "/images/padma-bridge-students.jpg",
        caption: "Students Visiting Padma Multipurpose Bridge",
      },
    ],
  },
  {
    id: 2,
    title: "Educational field visit to Hazrat Shahjalal International Airport Expansion Project",
    location: "Hazrat Shahjalal International Airport, Dhaka",
    date: "November 28, 2022",
    description:
      "A comprehensive site visit to observe the ongoing expansion project Phase-1 by Batch 18 to Batch 22 students, focusing on modern airport infrastructure and construction management.",
    image: "/airport-construction-site-with-students-in-safety-.jpg",
    participants: 38,
    department: "Civil Engineering",
    detailedDescription:
      "The visit provided students with insights into large-scale infrastructure development, airport engineering principles, and project management techniques used in international airport construction projects.",
  },
  {
    id: 3,
    title: "Metro Rail Construction Site Visit",
    location: "Dhaka Metro Rail Project, Dhaka",
    date: "October 20, 2022",
    description:
      "Students explored the construction techniques and engineering challenges involved in building Bangladesh's first metro rail system.",
    image: "/metro-rail-construction-site-with-engineering-stud.jpg",
    participants: 32,
    department: "Civil Engineering",
    detailedDescription:
      "This educational visit allowed students to observe advanced tunneling techniques, station construction methods, and the integration of modern transportation systems in urban environments.",
  },
  {
    id: 4,
    title: "Karnaphuli Tunnel Project Visit",
    location: "Karnaphuli Tunnel, Chittagong",
    date: "September 15, 2022",
    description:
      "An educational tour to understand underwater tunnel construction technology and the engineering solutions implemented in this groundbreaking project.",
    image: "/underwater-tunnel-construction-with-engineering-st.jpg",
    participants: 28,
    department: "Civil Engineering",
    detailedDescription:
      "Students gained valuable insights into underwater construction challenges, tunnel boring machine operations, and the complex engineering solutions required for subaqueous infrastructure projects.",
  },
  {
    id: 5,
    title: "Rooppur Nuclear Power Plant Site Visit",
    location: "Rooppur Nuclear Power Plant, Pabna",
    date: "August 25, 2022",
    description:
      "Students visited the construction site of Bangladesh's first nuclear power plant to learn about nuclear engineering and safety protocols.",
    image: "/nuclear-power-plant-construction-site-with-student.jpg",
    participants: 25,
    department: "Nuclear Engineering",
    detailedDescription:
      "The visit provided comprehensive understanding of nuclear power plant construction, safety systems, and the role of nuclear energy in Bangladesh's future energy security.",
  },
  {
    id: 6,
    title: "Dhaka Elevated Expressway Construction Visit",
    location: "Dhaka Elevated Expressway, Dhaka",
    date: "July 18, 2022",
    description:
      "An insightful visit to observe the construction of the elevated expressway and understand urban infrastructure development challenges.",
    image: "/elevated-expressway-construction-with-civil-engine.jpg",
    participants: 35,
    department: "Civil Engineering",
    detailedDescription:
      "Students observed advanced construction techniques for elevated structures, traffic management during construction, and the integration of modern expressways in dense urban environments.",
  },
  {
    id: 7,
    title: "Bangabandhu Sheikh Mujib Railway Bridge Visit",
    location: "Jamuna River, Tangail",
    date: "June 22, 2022",
    description:
      "Students explored the engineering aspects of the dual-gauge railway bridge and its significance in Bangladesh's transportation network.",
    image: "/railway-bridge-construction-over-river-with-studen.jpg",
    participants: 30,
    department: "Civil Engineering",
    detailedDescription:
      "The visit highlighted the engineering challenges of constructing railway bridges over major rivers, dual-gauge track systems, and the strategic importance of rail connectivity in national development.",
  },
  {
    id: 8,
    title: "Matarbari Deep Sea Port Project Visit",
    location: "Matarbari, Cox's Bazar",
    date: "May 28, 2022",
    description:
      "A field visit to understand port engineering, marine construction techniques, and the strategic importance of deep sea ports.",
    image: "/deep-sea-port-construction-with-marine-engineering.jpg",
    participants: 22,
    department: "Naval Architecture & Marine Engineering",
    detailedDescription:
      "Students gained insights into marine construction challenges, port design principles, and the economic significance of deep sea ports in international trade and commerce.",
  },
  {
    id: 9,
    title: "Dhaka Water Treatment Plant Visit",
    location: "Saidabad Water Treatment Plant, Dhaka",
    date: "April 15, 2022",
    description:
      "Students learned about water treatment processes, environmental engineering principles, and sustainable water management practices.",
    image: "/water-treatment-plant-with-environmental-engineeri.jpg",
    participants: 40,
    department: "Environmental Engineering",
    detailedDescription:
      "The visit provided comprehensive understanding of water purification processes, environmental impact assessment, and the critical role of water treatment in public health and environmental sustainability.",
  },
  {
    id: 10,
    title: "Bangabandhu Satellite Ground Station Visit",
    location: "Gazipur, Dhaka",
    date: "March 20, 2022",
    description: "An educational visit to understand satellite communication technology and ground station operations.",
    image: "/satellite-ground-station-with-telecommunications-s.jpg",
    participants: 18,
    department: "Electrical & Electronic Engineering",
    detailedDescription:
      "Students explored satellite communication systems, ground station equipment, and the role of space technology in modern telecommunications and broadcasting.",
  },
  {
    id: 11,
    title: "Dhaka-Chittagong Highway Expansion Project",
    location: "Dhaka-Chittagong Highway",
    date: "February 25, 2022",
    description:
      "Students observed highway construction techniques, traffic engineering solutions, and infrastructure development strategies.",
    image: "/highway-construction-project-with-transportation-e.jpg",
    participants: 33,
    department: "Civil Engineering",
    detailedDescription:
      "The visit demonstrated modern highway construction methods, traffic management systems, and the economic impact of improved transportation infrastructure on national development.",
  },
  {
    id: 12,
    title: "Payra Seaport Development Project Visit",
    location: "Payra Port, Patuakhali",
    date: "January 30, 2022",
    description:
      "A comprehensive site visit to understand seaport development, coastal engineering, and maritime infrastructure.",
    image: "/seaport-development-construction-with-coastal-engi.jpg",
    participants: 26,
    department: "Civil Engineering",
    detailedDescription:
      "Students learned about coastal engineering challenges, port development strategies, and the role of seaports in facilitating international trade and economic growth.",
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default function SiteVisitDetailPage({ params }: PageProps) {
  const visitId = Number.parseInt(params.id)
  const visit = siteVisits.find((v) => v.id === visitId)

  if (!visit) {
    notFound()
  }

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/activities/site-visit">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Site Visits
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Field Visit: {visit.title}</h1>
          <p className="text-gray-600 text-lg">Date: {visit.date}</p>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <div className="relative">
            <img
              src={visit.image || "/placeholder.svg"}
              alt={visit.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
              At site visit students and faculty members
            </div>
          </div>
        </div>

        {/* Additional Images */}
        {visit.additionalImages && visit.additionalImages.length > 0 && (
          <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              {visit.additionalImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url || "/placeholder.svg"}
                    alt={img.caption}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <p className="text-gray-700 leading-relaxed text-lg text-pretty">
            {visit.detailedDescription || visit.description}
          </p>

          {visit.department && (
            <div className="mt-6">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {visit.department}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
