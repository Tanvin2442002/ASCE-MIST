"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const backend = process.env.NEXT_PUBLIC_BACKEND;

interface CommitteeItem {
  id: string;
  image_url: string;
  panel_year: string;
  panel_type: string;
}

export default function CommitteePage() {
  const [committee, setCommittee] = useState<CommitteeItem[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("presidential");
  const [loading, setLoading] = useState(true);

  // Fetch available years on component mount
  useEffect(() => {
    async function fetchYears() {
      try {
        console.log("Fetching years from:", `${backend}/api/committees/years`);
        const res = await fetch(`${backend}/api/committees/years`);
        
        if (!res.ok) {
          console.error("Response not ok:", res.status, res.statusText);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const years = await res.json() as string[];
        setAvailableYears(years);
        console.log("Available years:", years);
        // Set current year as default if available
        if (years.length > 0) {
          const currentYear = new Date().getFullYear().toString();
          const defaultYear = years.includes(currentYear) ? currentYear : years[0];
          setSelectedYear(defaultYear);
        }
      } catch (err) {
        console.error("Error fetching years:", err);
        // Fallback: try to get years from all committees
        try {
          console.log("Trying fallback approach...");
          const res = await fetch(`${backend}/api/committees`);
          if (res.ok) {
            const allCommittees = await res.json() as CommitteeItem[];
            const extractedYears = Array.from(new Set(allCommittees.map((c: CommitteeItem) => c.panel_year))).filter(Boolean) as string[];
            extractedYears.sort().reverse();
            setAvailableYears(extractedYears);
            if (extractedYears.length > 0) {
              const currentYear = new Date().getFullYear().toString();
              const defaultYear = extractedYears.includes(currentYear) ? currentYear : extractedYears[0];
              setSelectedYear(defaultYear);
            }
          } else {
            setAvailableYears([]);
          }
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
          setAvailableYears([]);
        }
      }
    }

    fetchYears();
  }, []);

  // Fetch available panel types when selected year changes
  useEffect(() => {
    async function fetchTypes() {
      if (!selectedYear) return;
      
      try {
        console.log(`Fetching types for year: ${selectedYear}`);
        // Try the dedicated endpoint first
        const typesRes = await fetch(`${backend}/api/committees/types/${selectedYear}`);
        
        if (typesRes.ok) {
          const types = await typesRes.json();
          console.log("Available types from API:", types);
          setAvailableTypes(types);
          // Set default type to presidential if available, otherwise first available type
          if (types.length > 0) {
            const defaultType = types.includes("presidential") ? "presidential" : types[0];
            setSelectedType(defaultType);
          }
          return;
        } else {
          console.log("Types endpoint failed, trying fallback...");
        }
      } catch (err) {
        console.log("Types endpoint error, trying fallback...", err);
      }

      // Fallback: Get all committees for the year and extract unique types
      try {
        const committeesRes = await fetch(`${backend}/api/committees?year=${selectedYear}`);
        if (committeesRes.ok) {
          const committees = await committeesRes.json();
          console.log("All committees for year:", committees);
          const extractedTypes = [...new Set(committees.map((c: CommitteeItem) => c.panel_type))].filter(Boolean) as string[];
          console.log("Extracted types:", extractedTypes);
          
          setAvailableTypes(extractedTypes);
          if (extractedTypes.length > 0) {
            const defaultType = extractedTypes.includes("presidential") ? "presidential" : extractedTypes[0];
            setSelectedType(defaultType);
          } else {
            // Ultimate fallback
            setAvailableTypes(["presidential", "executive"]);
            setSelectedType("presidential");
          }
        } else {
          console.error("Fallback committees fetch also failed");
          setAvailableTypes(["presidential", "executive"]);
          setSelectedType("presidential");
        }
      } catch (fallbackErr) {
        console.error("Complete fallback failed:", fallbackErr);
        setAvailableTypes(["presidential", "executive"]);
        setSelectedType("presidential");
      }
    }

    fetchTypes();
  }, [selectedYear]);

  // Fetch committee data when selected year or type changes
  useEffect(() => {
    async function fetchCommittee() {
      if (!selectedYear || !selectedType) {
        console.log("Missing year or type:", { selectedYear, selectedType });
        return;
      }
      
      setLoading(true);
      try {
        const url = `${backend}/api/committees?year=${selectedYear}&type=${selectedType}`;
        console.log("Fetching committee from:", url);
        const res = await fetch(url);
        
        if (res.ok) {
          const data = await res.json();
          console.log(`Committee data for ${selectedYear} ${selectedType}:`, data);
          setCommittee(data);
        } else {
          console.error("Failed to fetch committee:", res.status, res.statusText);
          setCommittee([]);
        }
      } catch (err) {
        console.error("Error fetching committee:", err);
        setCommittee([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCommittee();
  }, [selectedYear, selectedType]);

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
        
        {/* Year and Type Selection */}
        {availableYears.length > 0 && (
          <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <label htmlFor="year-select" className="text-sm font-medium text-gray-700">
                Committee Year:
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Choose year" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {availableTypes.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label htmlFor="type-select" className="text-sm font-medium text-gray-700">
                  Panel Type:
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "presidential" ? "Presidential" : type === "executive" ? "Executive" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
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
        <div className="text-center text-gray-500 py-10">
          <p className="mb-2">
            No committee members found for {selectedYear} {selectedType} panel.
          </p>
          {selectedYear && selectedType && (
            <p className="text-sm">Try selecting a different year or panel type from the dropdowns above.</p>
          )}
        </div>
      ) : (
        <div>
          {/* Display current selection */}
          {selectedYear && selectedType && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedYear} {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Panel
              </h2>
              <p className="text-gray-600 text-sm">
                {committee.length} member{committee.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {committee.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden rounded-2xl shadow-sm"
              >
                <CardContent className="p-0">
                  <img
                    src={member.image_url}
                    alt={`${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Panel Member - ${selectedYear}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
