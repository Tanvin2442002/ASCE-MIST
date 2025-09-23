"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample announcement data
const announcements = [
  {
    id: 1,
    type: "Achievement",
    date: "Dec 8, 2024",
    title: "MIST Team Wins National Bridge Competition",
    desc: "Our student team secured first place in the Bangladesh National Bridge Design Competition with their innovative sustainable design approach.",
    image: "/images/engineering-students-celebrating-with-trophy-at-br.jpg",
    priority: true,
  },
  {
    id: 2,
    type: "Research",
    date: "Nov 28, 2024",
    title: "New Research Lab Opens at MIST",
    desc: "State-of-the-art Structural Engineering Research Laboratory inaugurated with advanced testing equipment and simulation capabilities.",
    image: "/images/modern-engineering-laboratory-with-testing-equipme.jpg",
    priority: false,
  },
  {
    id: 3,
    type: "Partnership",
    date: "Nov 15, 2024",
    title: "Industry Partnership with Leading Construction Firm",
    desc: "ASCE @ MIST announces strategic partnership with Bangladesh top construction company for internships and research collaboration.",
    image: "/images/professional-handshake-between-university-and-indu.jpg",
    priority: false,
  },
  {
    id: 4,
    type: "Achievement",
    date: "Oct 22, 2024",
    title: "Student Paper Published in International Journal",
    desc: "ASCE MIST student research on sustainable concrete mixtures published in the Journal of Sustainable Construction Materials.",
    image: "/images/student-research-paper-publication.jpg",
    priority: true,
  },
  {
    id: 5,
    type: "Event",
    date: "Oct 10, 2024",
    title: "Annual Technical Symposium 2024",
    desc: "Join us for our biggest technical event of the year featuring keynote speakers from leading engineering firms and research presentations.",
    image: "/images/technical-symposium-auditorium.jpg",
    priority: false,
  },
  {
    id: 6,
    type: "Partnership",
    date: "Sep 28, 2024",
    title: "MOU Signed with International University",
    desc: "Memorandum of Understanding signed with Tokyo Institute of Technology for student exchange and joint research programs.",
    image: "/images/mou-signing-ceremony.jpg",
    priority: false,
  },
  {
    id: 7,
    type: "Achievement",
    date: "Sep 15, 2024",
    title: "ASCE MIST Wins Best Chapter Award",
    desc: "Our chapter has been recognized as the Best Student Chapter in Bangladesh for outstanding activities and community engagement.",
    image: "/images/best-chapter-award-ceremony.jpg",
    priority: true,
  },
  {
    id: 8,
    type: "Research",
    date: "Aug 30, 2024",
    title: "Earthquake Simulation Lab Established",
    desc: "New earthquake simulation laboratory established with funding from the Ministry of Science and Technology for seismic research.",
    image: "/images/earthquake-simulation-laboratory.jpg",
    priority: false,
  },
  {
    id: 9,
    type: "Event",
    date: "Aug 18, 2024",
    title: "International Conference on Sustainable Engineering",
    desc: "ASCE MIST successfully hosted the International Conference on Sustainable Engineering with participants from 15 countries.",
    image: "/images/international-conference-hall.jpg",
    priority: false,
  },
  {
    id: 10,
    type: "Achievement",
    date: "Jul 25, 2024",
    title: "Innovation Award for Smart City Project",
    desc: "Student team receives innovation award for their smart city traffic management system at the National Innovation Competition.",
    image: "/images/smart-city-innovation-award.jpg",
    priority: true,
  },
  {
    id: 11,
    type: "Partnership",
    date: "Jul 12, 2024",
    title: "Collaboration with Government Infrastructure Project",
    desc: "ASCE MIST students to participate in the Dhaka Metro Rail expansion project as part of academic-industry collaboration.",
    image: "/images/metro-rail-collaboration.jpg",
    priority: false,
  },
  {
    id: 12,
    type: "Research",
    date: "Jun 28, 2024",
    title: "Green Building Research Center Launched",
    desc: "New research center dedicated to sustainable building technologies and green construction practices officially launched.",
    image: "/images/green-building-research-center.jpg",
    priority: false,
  },
]

const ITEMS_PER_PAGE = 10

export default function AnnouncementPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAnnouncements = announcements.slice(startIndex, endIndex)

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest news and achievements from ASCE @ MIST</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {currentAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <img
                      src={announcement.image || "/placeholder.svg"}
                      alt={announcement.title}
                      className="w-full h-48 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="lg:w-2/3 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className={`${getTypeColor(announcement.type)} border`}>{announcement.type}</Badge>
                      {announcement.priority && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 border">Priority</Badge>
                      )}
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{announcement.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{announcement.desc}</p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-900 border-gray-400 hover:bg-gray-50 bg-transparent"
                        onClick={() => (window.location.href = `/activities/announcement/${announcement.id}`)}
                      >
                        Read More
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
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-400"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page ? "bg-green-600 hover:bg-green-700 text-white" : "text-gray-900 border-gray-400"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-400"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
