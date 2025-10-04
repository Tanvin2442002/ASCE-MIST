"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const backend = process.env.NEXT_PUBLIC_BACKEND;

interface CommitteeItem {
  id: string;
  image_url: string;
}

export default function CommitteePage() {
  const [committee, setCommittee] = useState<CommitteeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommittee() {
      setLoading(true);
      try {
        const res = await fetch(`${backend}/api/committees`);
        const data = await res.json();
        setCommittee(data);
      } catch (err) {
        console.error("Error fetching committee:", err);
        setCommittee([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCommittee();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Page Heading */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Meet Our Committee</h1>
        <p className="mt-2 text-gray-600">
          Our dedicated team of students and faculty work together to make the
          ASCE Student Chapter at MIST thrive.
        </p>
        <p className="mt-1 text-gray-500">
          Get to know the members who are driving initiatives, organizing
          events, and leading our community.
        </p>
      </header>

      {/* Faculty Advisor Section */}
      <section className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow">
          <img
            src="https://vlkrukgfzsincfebbndz.supabase.co/storage/v1/object/public/committee/Sakil-sir.jpeg"
            alt="Faculty Advisor"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            Dr. Khondokar Shakil Ahmed, PEng, CEng, FICE
          </h2>
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
        <p className="text-center text-gray-500 py-10">
          No committee members found.
        </p>
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
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
