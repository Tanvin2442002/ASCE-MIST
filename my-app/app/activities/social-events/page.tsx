"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample social events data
const socialEvents = [
  {
    id: 1,
    title: "ASCE Annual Picnic 2024",
    date: "May 15, 2024",
    location: "Savar Lake Resort",
    type: "Recreation",
    image: "/images/annual-picnic-2024.jpg",
    description: "A fun-filled day of outdoor activities, games, and bonding for all ASCE members and their families.",
  },
  {
    id: 2,
    title: "Engineering Excellence Awards Ceremony",
    date: "April 30, 2024",
    location: "MIST Auditorium",
    type: "Awards",
    image: "/images/awards-ceremony-2024.jpg",
    description: "Recognizing outstanding achievements and contributions of students and faculty in civil engineering.",
  },
  {
    id: 3,
    title: "Cultural Night: Engineering Talent Show",
    date: "April 12, 2024",
    location: "MIST Cultural Center",
    type: "Cultural",
    image: "/images/cultural-night-2024.jpg",
    description:
      "Showcasing the artistic talents of engineering students through music, dance, and drama performances.",
  },
  {
    id: 4,
    title: "ASCE Sports Tournament",
    date: "March 25, 2024",
    location: "MIST Sports Complex",
    type: "Sports",
    image: "/images/sports-tournament-2024.jpg",
    description: "Inter-departmental sports competition featuring cricket, football, badminton, and table tennis.",
  },
  {
    id: 5,
    title: "Welcome Ceremony for New Members",
    date: "March 10, 2024",
    location: "MIST Conference Hall",
    type: "Welcome",
    image: "/images/welcome-ceremony-2024.jpg",
    description: "Formal induction ceremony for new ASCE student chapter members with networking opportunities.",
  },
  {
    id: 6,
    title: "Engineering Career Fair Networking Dinner",
    date: "February 20, 2024",
    location: "Dhaka Regency Hotel",
    type: "Networking",
    image: "/images/career-fair-dinner-2024.jpg",
    description: "Networking dinner connecting students with industry professionals and potential employers.",
  },
  {
    id: 7,
    title: "Valentine's Day Engineering Couples Contest",
    date: "February 14, 2024",
    location: "MIST Campus Garden",
    type: "Celebration",
    image: "/images/valentines-contest-2024.jpg",
    description: "Fun competition for engineering couples with creative challenges and romantic activities.",
  },
  {
    id: 8,
    title: "Winter Retreat: Team Building Workshop",
    date: "January 28, 2024",
    location: "Cox's Bazar",
    type: "Retreat",
    image: "/images/winter-retreat-2024.jpg",
    description: "Three-day retreat focusing on leadership development, team building, and strategic planning.",
  },
  {
    id: 9,
    title: "New Year Celebration Gala",
    date: "January 1, 2024",
    location: "MIST Auditorium",
    type: "Celebration",
    image: "/images/new-year-gala-2024.jpg",
    description: "Grand celebration welcoming the new year with performances, dinner, and networking.",
  },
  {
    id: 10,
    title: "Alumni Homecoming Reunion",
    date: "December 15, 2023",
    location: "MIST Alumni Center",
    type: "Alumni",
    image: "/images/alumni-reunion-2023.jpg",
    description: "Annual reunion bringing together ASCE alumni from different graduating classes.",
  },
  {
    id: 11,
    title: "Charity Drive: Building Homes for the Needy",
    date: "November 25, 2023",
    location: "Rural Manikganj",
    type: "Community Service",
    image: "/images/charity-drive-2023.jpg",
    description: "Community service project building homes for underprivileged families in rural areas.",
  },
  {
    id: 12,
    title: "Freshers' Orientation and Ice Breaking",
    date: "October 20, 2023",
    location: "MIST Campus",
    type: "Orientation",
    image: "/images/freshers-orientation-2023.jpg",
    description: "Orientation program for new students with ice-breaking activities and campus tour.",
  },
]

const ITEMS_PER_PAGE = 10

export default function SocialEventsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(socialEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEvents = socialEvents.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Social Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building community and fostering relationships through engaging social activities and memorable experiences.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {currentEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                        {event.type}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">{event.title}</h2>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Date:</span> {event.date}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Location:</span> {event.location}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/activities/social-events/${event.id}`}>
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
