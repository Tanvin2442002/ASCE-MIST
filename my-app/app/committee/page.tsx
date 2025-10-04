"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const backend = process.env.NEXT_PUBLIC_BACKEND

interface CommitteeItem {
  id: string
  image_url: string
}

export default function CommitteePage() {
  const [committee, setCommittee] = useState<CommitteeItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCommittee() {
      setLoading(true)
      try {
        const res = await fetch(`${backend}/api/committees`)
        const data = await res.json()
        setCommittee(data)
      } catch (err) {
        console.error("Error fetching committee:", err)
        setCommittee([])
      } finally {
        setLoading(false)
      }
    }

    fetchCommittee()
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Faculty Advisor Section */}
      <section className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow">
          <img
            src="/advisor.jpg" // Replace with actual advisor image
            alt="Faculty Advisor"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Dr. Faculty Advisor</h1>
          <p className="text-sm text-gray-600">
            Faculty Advisor — ASCE Student Chapter, MIST
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Department of Civil Engineering, MIST
          </p>
        </div>
      </section>

      {/* Committee Grid */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading committee...</p>
      ) : committee.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No committee members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {committee.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden rounded-2xl shadow-sm"
            >
              <CardContent className="p-0">
                <img
                  src={member.image_url}
                  alt="Committee Member"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
