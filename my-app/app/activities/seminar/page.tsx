"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample seminar data
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
    description:
      "An in-depth discussion on sustainable infrastructure practices and their implementation in Bangladesh's development projects.",
    videoUrl: "https://youtube.com/watch?v=example1",
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
    description:
      "Exploring modern techniques and technologies for designing earthquake-resistant high-rise structures.",
    videoUrl: "https://youtube.com/watch?v=example2",
  },
  {
    id: 3,
    title: "Smart City Technologies and Urban Planning",
    date: "February 10, 2024",
    time: "10:00 AM - 12:00 PM",
    speaker: "Eng. Fatima Khatun",
    designation: "Urban Planning Specialist",
    location: "ASCE Conference Hall",
    attendees: 180,
    image: "/images/smart-city-seminar.jpg",
    description: "Understanding the integration of smart technologies in urban planning and city development.",
    videoUrl: "https://youtube.com/watch?v=example3",
  },
  {
    id: 4,
    title: "Water Resource Management in Coastal Areas",
    date: "January 25, 2024",
    time: "2:30 PM - 4:30 PM",
    speaker: "Dr. Rashida Begum",
    designation: "Environmental Engineer, IWM",
    location: "Environmental Engineering Lab",
    attendees: 95,
    image: "/images/water-resource-management-seminar.jpg",
    description: "Addressing challenges and solutions for water resource management in Bangladesh's coastal regions.",
    videoUrl: "https://youtube.com/watch?v=example4",
  },
  {
    id: 5,
    title: "Green Building Certification and Standards",
    date: "January 12, 2024",
    time: "1:00 PM - 3:00 PM",
    speaker: "Arch. Mohammad Ali",
    designation: "Green Building Consultant",
    location: "Architecture Department",
    attendees: 110,
    image: "/images/green-building-seminar.jpg",
    description: "Overview of international green building standards and their application in Bangladesh.",
    videoUrl: "https://youtube.com/watch?v=example5",
  },
  {
    id: 6,
    title: "Transportation Engineering and Traffic Management",
    date: "December 20, 2023",
    time: "11:00 AM - 1:00 PM",
    speaker: "Prof. Karim Uddin",
    designation: "Transportation Engineer, MIST",
    location: "Transportation Lab",
    attendees: 140,
    image: "/images/transportation-engineering-seminar.jpg",
    description: "Modern approaches to transportation planning and traffic management in urban areas.",
    videoUrl: "https://youtube.com/watch?v=example6",
  },
  {
    id: 7,
    title: "Geotechnical Engineering for Foundation Design",
    date: "December 5, 2023",
    time: "2:00 PM - 4:00 PM",
    speaker: "Dr. Nasir Ahmed",
    designation: "Geotechnical Engineer",
    location: "Geotechnical Lab, MIST",
    attendees: 85,
    image: "/images/geotechnical-engineering-seminar.jpg",
    description: "Advanced techniques in soil analysis and foundation design for complex structures.",
    videoUrl: "https://youtube.com/watch?v=example7",
  },
  {
    id: 8,
    title: "Renewable Energy Integration in Civil Infrastructure",
    date: "November 18, 2023",
    time: "10:30 AM - 12:30 PM",
    speaker: "Eng. Salma Rahman",
    designation: "Renewable Energy Specialist",
    location: "Energy Research Center",
    attendees: 160,
    image: "/images/renewable-energy-seminar.jpg",
    description: "Exploring opportunities for integrating renewable energy systems in civil engineering projects.",
    videoUrl: "https://youtube.com/watch?v=example8",
  },
  {
    id: 9,
    title: "Construction Project Management Best Practices",
    date: "November 3, 2023",
    time: "3:00 PM - 5:00 PM",
    speaker: "PM. Rafiq Hassan",
    designation: "Senior Project Manager",
    location: "Project Management Center",
    attendees: 200,
    image: "/images/project-management-seminar.jpg",
    description: "Industry best practices for managing large-scale construction projects effectively.",
    videoUrl: "https://youtube.com/watch?v=example9",
  },
  {
    id: 10,
    title: "Digital Twin Technology in Infrastructure",
    date: "October 20, 2023",
    time: "1:30 PM - 3:30 PM",
    speaker: "Dr. Tanvir Islam",
    designation: "Digital Engineering Researcher",
    location: "Computer Lab, Civil Dept",
    attendees: 75,
    image: "/images/digital-twin-seminar.jpg",
    description: "Understanding digital twin technology and its applications in infrastructure monitoring.",
    videoUrl: "https://youtube.com/watch?v=example10",
  },
  {
    id: 11,
    title: "Climate Change Adaptation in Infrastructure Design",
    date: "October 8, 2023",
    time: "2:00 PM - 4:00 PM",
    speaker: "Prof. Dr. Shahida Khatun",
    designation: "Climate Resilience Expert",
    location: "Environmental Auditorium",
    attendees: 130,
    image: "/images/climate-adaptation-seminar.jpg",
    description: "Strategies for designing climate-resilient infrastructure in the face of global climate change.",
    videoUrl: "https://youtube.com/watch?v=example11",
  },
  {
    id: 12,
    title: "Advanced Materials in Modern Construction",
    date: "September 25, 2023",
    time: "11:00 AM - 1:00 PM",
    speaker: "Dr. Mahmud Hasan",
    designation: "Materials Science Engineer",
    location: "Materials Testing Lab",
    attendees: 105,
    image: "/images/advanced-materials-seminar.jpg",
    description: "Exploring innovative construction materials and their applications in modern engineering projects.",
    videoUrl: "https://youtube.com/watch?v=example12",
  },
]

const ITEMS_PER_PAGE = 10

export default function SeminarsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(seminars.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentSeminars = seminars.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ASCE Seminars</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our educational seminars featuring expert speakers discussing the latest developments in civil
            engineering, construction technology, and sustainable infrastructure.
          </p>
        </div>

        {/* Seminars Grid */}
        <div className="grid gap-8 mb-12">
          {currentSeminars.map((seminar) => (
            <Link key={seminar.id} href={`/activities/seminar/${seminar.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={seminar.image || "/placeholder.svg"}
                      alt={seminar.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-2/3 p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{seminar.title}</h2>
                      <Button
                        size="sm"
                        variant="default"
                        className="ml-4 flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700 border-0"
                      >
                        ▶ Watch
                      </Button>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">📅</span>
                        <span>
                          {seminar.date} • {seminar.time}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">📍</span>
                        <span>{seminar.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold text-gray-900">{seminar.speaker}</p>
                      <p className="text-sm text-gray-600">{seminar.designation}</p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{seminar.description}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              ← Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
