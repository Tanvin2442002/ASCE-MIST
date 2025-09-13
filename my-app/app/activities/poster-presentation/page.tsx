"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample poster presentation data
const posterPresentations = [
  {
    id: 1,
    title: "Innovative Concrete Mix Design for High-Rise Buildings",
    date: "April 20, 2024",
    presenter: "Md. Rafiqul Islam",
    department: "Civil Engineering, MIST",
    category: "Structural Engineering",
    image: "/images/concrete-mix-poster.jpg",
    description:
      "Research on developing high-strength concrete mixtures optimized for tall building construction in Bangladesh's climate.",
  },
  {
    id: 2,
    title: "Smart Traffic Management System Using IoT",
    date: "April 20, 2024",
    presenter: "Fatima Ahmed",
    department: "Civil Engineering, MIST",
    category: "Transportation Engineering",
    image: "/images/smart-traffic-poster.jpg",
    description: "Implementation of IoT-based traffic management solutions for reducing congestion in Dhaka city.",
  },
  {
    id: 3,
    title: "Earthquake Vulnerability Assessment of School Buildings",
    date: "April 20, 2024",
    presenter: "Mohammad Hassan",
    department: "Civil Engineering, MIST",
    category: "Earthquake Engineering",
    image: "/images/earthquake-assessment-poster.jpg",
    description:
      "Comprehensive seismic vulnerability analysis of educational infrastructure in earthquake-prone regions.",
  },
  {
    id: 4,
    title: "Sustainable Drainage Systems for Urban Areas",
    date: "March 15, 2024",
    presenter: "Ayesha Rahman",
    department: "Civil Engineering, MIST",
    category: "Environmental Engineering",
    image: "/images/sustainable-drainage-poster.jpg",
    description: "Design and implementation of eco-friendly drainage solutions for urban flood management.",
  },
  {
    id: 5,
    title: "Bridge Health Monitoring Using Wireless Sensors",
    date: "March 15, 2024",
    presenter: "Tanvir Ahmed",
    department: "Civil Engineering, MIST",
    category: "Structural Engineering",
    image: "/images/bridge-monitoring-poster.jpg",
    description: "Development of wireless sensor networks for real-time monitoring of bridge structural health.",
  },
  {
    id: 6,
    title: "Green Roof Systems for Energy Efficiency",
    date: "March 15, 2024",
    presenter: "Nusrat Jahan",
    department: "Civil Engineering, MIST",
    category: "Environmental Engineering",
    image: "/images/green-roof-poster.jpg",
    description:
      "Analysis of green roof implementations for improving building energy efficiency in tropical climates.",
  },
  {
    id: 7,
    title: "Geopolymer Concrete from Industrial Waste",
    date: "February 28, 2024",
    presenter: "Abdul Karim",
    department: "Civil Engineering, MIST",
    category: "Materials Engineering",
    image: "/images/geopolymer-concrete-poster.jpg",
    description: "Innovative use of industrial waste materials in developing sustainable geopolymer concrete.",
  },
  {
    id: 8,
    title: "Coastal Erosion Protection Strategies",
    date: "February 28, 2024",
    presenter: "Rashida Sultana",
    department: "Civil Engineering, MIST",
    category: "Coastal Engineering",
    image: "/images/coastal-erosion-poster.jpg",
    description: "Comprehensive study of coastal protection measures for Bangladesh's vulnerable shoreline areas.",
  },
  {
    id: 9,
    title: "3D Printing Applications in Construction",
    date: "February 28, 2024",
    presenter: "Imran Hossain",
    department: "Civil Engineering, MIST",
    category: "Construction Technology",
    image: "/images/3d-printing-poster.jpg",
    description: "Exploring the potential of 3D printing technology in modern construction practices.",
  },
  {
    id: 10,
    title: "Water Quality Assessment in Urban Rivers",
    date: "January 25, 2024",
    presenter: "Sabrina Khan",
    department: "Civil Engineering, MIST",
    category: "Environmental Engineering",
    image: "/images/water-quality-poster.jpg",
    description: "Comprehensive analysis of water pollution levels and treatment strategies for urban waterways.",
  },
  {
    id: 11,
    title: "Prefabricated Housing Solutions for Rural Areas",
    date: "January 25, 2024",
    presenter: "Mizanur Rahman",
    department: "Civil Engineering, MIST",
    category: "Construction Technology",
    image: "/images/prefabricated-housing-poster.jpg",
    description: "Cost-effective prefabricated housing designs tailored for rural communities in Bangladesh.",
  },
  {
    id: 12,
    title: "Solar-Powered Street Lighting Systems",
    date: "January 25, 2024",
    presenter: "Farhana Akter",
    department: "Civil Engineering, MIST",
    category: "Infrastructure Engineering",
    image: "/images/solar-lighting-poster.jpg",
    description: "Design and implementation of sustainable solar-powered lighting solutions for rural infrastructure.",
  },
]

const ITEMS_PER_PAGE = 10

export default function PosterPresentationPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posterPresentations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPresentations = posterPresentations.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Poster Presentations</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing innovative research and projects by our students in various fields of civil engineering.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {currentPresentations.map((presentation) => (
            <Card
              key={presentation.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={presentation.image || "/placeholder.svg"}
                      alt={presentation.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                        {presentation.category}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">{presentation.title}</h2>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Presenter:</span> {presentation.presenter}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Department:</span> {presentation.department}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Date:</span> {presentation.date}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{presentation.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/activities/poster-presentation/${presentation.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                      </Link>
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
