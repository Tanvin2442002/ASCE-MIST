"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AchievementDetailPage() {
  const params = useParams();
  const idParam = params?.id as any;

  const [achievement, setAchievement] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND;

  useEffect(() => {
    if (!idParam) {
      setError("Invalid achievement id.");
      setLoading(false);
      return;
    }
    if (!backend) {
      setError("Backend URL is not configured.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAchievement() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${backend}/api/achievements/${idParam}`,
          {
            signal,
          }
        );

        if (res.status === 404) {
          setAchievement(null);
          setError("Achievement not found");
          return;
        }

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Failed to fetch achievement: ${res.status} ${text}`);
        }

        const data = await res.json();

        const normalized = {
          id: data.id,
          title: data.title,
          category: data.category,
          date: data.date,
          description: data.description,
          image: data.image,
          awardedBy: data.awarded_by ?? data.awardedBy ?? "",
          level: data.level,
          details: data.details ?? "",
          criteria: Array.isArray(data.criteria) ? data.criteria : [],
          impact: data.impact ?? "",
          additional_images: data.additional_images ?? [],
        };

        setAchievement(normalized);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Error fetching achievement:", err);
        setError(err.message || "Error fetching achievement");
      } finally {
        setLoading(false);
      }
    }

    fetchAchievement();

    return () => {
      controller.abort();
    };
  }, [idParam, backend]);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Chapter Excellence": "bg-purple-100 text-purple-800",
      "Community Service": "bg-blue-100 text-blue-800",
      Innovation: "bg-green-100 text-green-800",
      Leadership: "bg-yellow-100 text-yellow-800",
      Research: "bg-red-100 text-red-800",
      "Volunteer Service": "bg-indigo-100 text-indigo-800",
      Academic: "bg-pink-100 text-pink-800",
      Competition: "bg-orange-100 text-orange-800",
      "Event Management": "bg-teal-100 text-teal-800",
      Environment: "bg-emerald-100 text-emerald-800",
      Mentorship: "bg-violet-100 text-violet-800",
      Technology: "bg-cyan-100 text-cyan-800",
      Partnership: "bg-sky-100 text-sky-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-yellow-100 text-yellow-800 border-yellow-200",
      National: "bg-blue-100 text-blue-800 border-blue-200",
      Institutional: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Show loading state (keeps design intact)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading achievement…</p>
        </div>
      </div>
    );
  }

  // If there was an error or not found, show the same "not found" UI
  if (!achievement || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error === "Achievement not found"
              ? "Achievement Not Found"
              : "Achievement Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error === "Achievement not found"
              ? "The achievement you're looking for doesn't exist."
              : error}
          </p>
          <Button asChild>
            <Link href="/achievements">Back to Achievements</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/achievements">← Back to Achievements</Link>
          </Button>
        </div>
        {/* Achievement Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video relative">
            <img
              src={achievement.image || "/placeholder.svg"}
              alt={achievement.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <Badge
                className={`${getLevelColor(
                  achievement.level
                )} border text-lg px-4 py-2`}
              >
                {achievement.level} Level
              </Badge>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <Badge className={getCategoryColor(achievement.category)}>
                {achievement.category}
              </Badge>
              <span className="text-gray-500">
                {achievement.date
                  ? new Date(achievement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {achievement.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {achievement.description}
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Awarded By
              </h3>
              <p className="text-gray-700">{achievement.awardedBy}</p>
            </div>
          </div>
        </div>

        {/* Achievement Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Details Section */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Achievement Details
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {achievement.details}
              </p>
            </CardContent>
          </Card>

          {/* Criteria Section */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Evaluation Criteria
              </h2>
              <ul className="space-y-3">
                {(achievement.criteria || []).map(
                  (criterion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{criterion}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Impact Section */}
        <Card className="bg-white mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Impact & Significance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {achievement.impact}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button asChild>
            <Link href="/achievements">View All Achievements</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
