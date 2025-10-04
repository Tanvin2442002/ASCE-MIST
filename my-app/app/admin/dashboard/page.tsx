"use client"

import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trophy, Megaphone, MapPin, Video, Users, Plus, BarChart3, Calendar, Eye } from "lucide-react"
import Link from "next/link"

const contentTypes = [
  {
    title: "Blogs",
    description: "Manage blog posts and articles",
    icon: FileText,
    count: 12,
    href: "/admin/blogs",
    color: "bg-blue-500",
  },
  {
    title: "Achievements",
    description: "Add awards and recognitions",
    icon: Trophy,
    count: 8,
    href: "/admin/achievements",
    color: "bg-yellow-500",
  },
  {
    title: "Announcements",
    description: "Post important updates",
    icon: Megaphone,
    count: 5,
    href: "/admin/announcements",
    color: "bg-red-500",
  },
  {
    title: "Site Visits",
    description: "Manage field trip content",
    icon: MapPin,
    count: 15,
    href: "/admin/site-visits",
    color: "bg-green-500",
  },
  {
    title: "Webinars",
    description: "Add webinar recordings",
    icon: Video,
    count: 7,
    href: "/admin/webinars",
    color: "bg-purple-500",
  },
  {
    title: "Seminars",
    description: "Manage seminar content",
    icon: Users,
    count: 10,
    href: "/admin/seminars",
    color: "bg-indigo-500",
  },
]

const quickStats = [
  {
    title: "Total Content",
    value: "57",
    change: "+12%",
    icon: BarChart3,
  },
  {
    title: "This Month",
    value: "8",
    change: "+25%",
    icon: Calendar,
  },
  {
    title: "Page Views",
    value: "2.4k",
    change: "+18%",
    icon: Eye,
  },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your ASCE @ MIST content</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-emerald-600">{stat.change} from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Management Cards */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-500">{type.count} items</span>
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={type.href}>
                        <Eye className="w-4 h-4 mr-2" />
                        View All
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`${type.href}/new`}>
                        <Plus className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest content updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Created new blog post",
                  item: "Sustainable Engineering Practices",
                  time: "2 hours ago",
                  type: "blog",
                },
                {
                  action: "Updated achievement",
                  item: "National Bridge Competition Win",
                  time: "5 hours ago",
                  type: "achievement",
                },
                {
                  action: "Published announcement",
                  item: "New Research Lab Opening",
                  time: "1 day ago",
                  type: "announcement",
                },
                {
                  action: "Added site visit",
                  item: "Padma Bridge Construction",
                  time: "2 days ago",
                  type: "site-visit",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.item}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
