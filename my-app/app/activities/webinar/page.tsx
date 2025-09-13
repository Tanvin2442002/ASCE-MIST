"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample webinar data
const webinars = [
  {
    id: 1,
    title: "Digital Transformation in Civil Engineering",
    date: "March 15, 2024",
    time: "3:00 PM - 4:30 PM",
    speaker: "Dr. Sarah Johnson",
    organization: "MIT Civil Engineering",
    image: "/images/digital-transformation-webinar.jpg",
    description:
      "Exploring how digital technologies are revolutionizing the civil engineering industry, from BIM to AI-powered design tools.",
  },
  {
    id: 2,
    title: "Sustainable Infrastructure Development",
    date: "February 28, 2024",
    time: "2:00 PM - 3:30 PM",
    speaker: "Prof. Michael Chen",
    organization: "Stanford University",
    image: "/images/sustainable-infrastructure-webinar.jpg",
    description:
      "Understanding the principles and practices of sustainable infrastructure development for a greener future.",
  },
  {
    id: 3,
    title: "Climate Resilient Design Strategies",
    date: "February 14, 2024",
    time: "4:00 PM - 5:30 PM",
    speaker: "Dr. Emily Rodriguez",
    organization: "UC Berkeley",
    image: "/images/climate-resilient-webinar.jpg",
    description: "Innovative approaches to designing infrastructure that can withstand climate change impacts.",
  },
  {
    id: 4,
    title: "Smart Cities and IoT Integration",
    date: "January 30, 2024",
    time: "3:30 PM - 5:00 PM",
    speaker: "Dr. Ahmed Hassan",
    organization: "BUET",
    image: "/images/smart-cities-webinar.jpg",
    description: "How Internet of Things (IoT) technology is transforming urban infrastructure and city management.",
  },
  {
    id: 5,
    title: "Advanced Materials in Construction",
    date: "January 16, 2024",
    time: "2:30 PM - 4:00 PM",
    speaker: "Prof. Lisa Wang",
    organization: "Harvard University",
    image: "/images/advanced-materials-webinar.jpg",
    description: "Exploring cutting-edge materials that are changing the landscape of modern construction.",
  },
  {
    id: 6,
    title: "Earthquake Engineering and Seismic Design",
    date: "December 20, 2023",
    time: "3:00 PM - 4:30 PM",
    speaker: "Dr. Rajesh Kumar",
    organization: "IIT Delhi",
    image: "/images/earthquake-engineering-webinar.jpg",
    description: "Latest developments in earthquake-resistant design and seismic analysis techniques.",
  },
  {
    id: 7,
    title: "Water Resource Management in Urban Areas",
    date: "December 5, 2023",
    time: "4:00 PM - 5:30 PM",
    speaker: "Dr. Maria Santos",
    organization: "University of São Paulo",
    image: "/images/water-resource-webinar.jpg",
    description: "Innovative solutions for managing water resources in rapidly growing urban environments.",
  },
  {
    id: 8,
    title: "Transportation Infrastructure Planning",
    date: "November 22, 2023",
    time: "2:00 PM - 3:30 PM",
    speaker: "Prof. David Thompson",
    organization: "Oxford University",
    image: "/images/transportation-planning-webinar.jpg",
    description: "Strategic approaches to planning and developing efficient transportation networks.",
  },
  {
    id: 9,
    title: "Green Building Certification Systems",
    date: "November 8, 2023",
    time: "3:30 PM - 5:00 PM",
    speaker: "Dr. Jennifer Lee",
    organization: "LEED Council",
    image: "/images/green-building-webinar.jpg",
    description: "Understanding various green building certification systems and their implementation.",
  },
  {
    id: 10,
    title: "Geotechnical Engineering Innovations",
    date: "October 25, 2023",
    time: "2:30 PM - 4:00 PM",
    speaker: "Prof. Robert Brown",
    organization: "Cambridge University",
    image: "/images/geotechnical-innovations-webinar.jpg",
    description: "Latest innovations and technologies in geotechnical engineering and soil mechanics.",
  },
  {
    id: 11,
    title: "Coastal Engineering and Sea Level Rise",
    date: "October 10, 2023",
    time: "3:00 PM - 4:30 PM",
    speaker: "Dr. Anna Petrov",
    organization: "TU Delft",
    image: "/images/coastal-engineering-webinar.jpg",
    description: "Addressing coastal challenges and adaptation strategies for rising sea levels.",
  },
  {
    id: 12,
    title: "Construction Project Management",
    date: "September 28, 2023",
    time: "4:00 PM - 5:30 PM",
    speaker: "Prof. James Wilson",
    organization: "Georgia Tech",
    image: "/images/project-management-webinar.jpg",
    description: "Best practices and modern tools for effective construction project management.",
  },
]

const ITEMS_PER_PAGE = 10

export default function WebinarPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(webinars.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentWebinars = webinars.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Webinars</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our expert-led webinars covering the latest trends and innovations in civil engineering and technology.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {currentWebinars.map((webinar) => (
            <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={webinar.image || "/placeholder.svg"}
                      alt={webinar.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">{webinar.title}</h2>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Date:</span> {webinar.date}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Time:</span> {webinar.time}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Speaker:</span> {webinar.speaker}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Organization:</span> {webinar.organization}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{webinar.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/activities/webinar/${webinar.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="text-gray-900 border-gray-400 hover:bg-gray-50 bg-transparent"
                      >
                        Watch Recording
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-400 hover:bg-gray-50"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-900 border-gray-400 hover:bg-gray-50"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-400 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
