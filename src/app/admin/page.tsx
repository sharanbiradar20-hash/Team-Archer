"use client"

import { useState } from "react"
import { Shield, Users, Calendar, Target, FileText, Image, Settings, BarChart3, Eye, Edit, Trash2, CheckCircle, XCircle, MoreVertical, Search, Filter, Download, Upload } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for admin dashboard
const adminStats = [
  { label: "Total Users", value: "248", change: "+12%", icon: <Users className="w-6 h-6" />, color: "bg-blue-500/10 text-blue-500" },
  { label: "Active Events", value: "8", change: "+2", icon: <Calendar className="w-6 h-6" />, color: "bg-green-500/10 text-green-500" },
  { label: "Open Challenges", value: "5", change: "-1", icon: <Target className="w-6 h-6" />, color: "bg-purple-500/10 text-purple-500" },
  { label: "Pending Submissions", value: "42", change: "+8", icon: <FileText className="w-6 h-6" />, color: "bg-amber-500/10 text-amber-500" },
  { label: "Projects Published", value: "36", change: "+5", icon: <Image className="w-6 h-6" />, color: "bg-pink-500/10 text-pink-500" },
  { label: "Storage Used", value: "2.4 GB", change: "12%", icon: <Settings className="w-6 h-6" />, color: "bg-gray-500/10 text-gray-500" },
]

const recentUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Member", status: "Active", joined: "2024-03-15" },
  { id: 2, name: "Sam Rivera", email: "sam@example.com", role: "Admin", status: "Active", joined: "2024-02-28" },
  { id: 3, name: "Taylor Chen", email: "taylor@example.com", role: "Member", status: "Inactive", joined: "2024-03-10" },
  { id: 4, name: "Jordan Lee", email: "jordan@example.com", role: "Moderator", status: "Active", joined: "2024-03-05" },
  { id: 5, name: "Casey Kim", email: "casey@example.com", role: "Member", status: "Active", joined: "2024-03-20" },
]

const pendingSubmissions = [
  { id: 1, user: "Morgan Patel", challenge: "AI Hackathon", submitted: "2 hours ago", status: "Pending Review" },
  { id: 2, user: "Riley Smith", challenge: "Web Dev Challenge", submitted: "5 hours ago", status: "Pending Review" },
  { id: 3, user: "Drew Wilson", challenge: "Mobile App Contest", submitted: "1 day ago", status: "Needs Revision" },
  { id: 4, user: "Blake Brown", challenge: "Data Science", submitted: "2 days ago", status: "Approved" },
  { id: 5, user: "Jordan Taylor", challenge: "UI/UX Design", submitted: "3 days ago", status: "Rejected" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Admin Header */}
      <div className="border-b border-border bg-bg-secondary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-text-secondary">Manage club activities, users, submissions, and content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search users, events, submissions..."
                  className="pl-10 pr-4 py-2.5 bg-bg-primary border border-border rounded-xl w-64 focus:outline-none focus:border-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors">
                <span className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Export Data
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-bg-secondary rounded-2xl border border-border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : stat.change.startsWith('-') ? 'text-red-500' : 'text-text-secondary'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          {["overview", "users", "events", "challenges", "submissions", "projects", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-secondary text-secondary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Users */}
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Recent Users
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg border border-border hover:bg-bg-primary transition-colors">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg border border-border hover:bg-bg-primary transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 text-text-secondary font-medium">User</th>
                      <th className="text-left py-4 px-6 text-text-secondary font-medium">Role</th>
                      <th className="text-left py-4 px-6 text-text-secondary font-medium">Status</th>
                      <th className="text-left py-4 px-6 text-text-secondary font-medium">Joined</th>
                      <th className="text-left py-4 px-6 text-text-secondary font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-bg-primary/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                              <span className="font-bold text-secondary">{user.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-semibold">{user.name}</div>
                              <div className="text-sm text-text-secondary">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "Admin" 
                              ? "bg-red-500/10 text-red-500"
                              : user.role === "Moderator"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}>
                            {user.role}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              user.status === "Active" ? "bg-green-500" : "bg-gray-500"
                            }`} />
                            <span>{user.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg border border-border hover:bg-bg-primary transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg border border-border hover:bg-bg-primary transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg border border-border hover:bg-bg-primary transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 border-t border-border">
                <button className="w-full py-3 rounded-xl border border-dashed border-border text-text-secondary hover:text-text-primary hover:border-secondary transition-colors">
                  + Add New User
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Pending Submissions & Quick Actions */}
          <div className="space-y-8">
            {/* Pending Submissions */}
            <div className="bg-bg-secondary rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pending Submissions
              </h3>
              <div className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="p-4 rounded-xl border border-border bg-bg-primary">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold">{submission.user}</div>
                        <div className="text-sm text-text-secondary">{submission.challenge}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        submission.status === "Approved" ? "bg-green-500/10 text-green-500" :
                        submission.status === "Rejected" ? "bg-red-500/10 text-red-500" :
                        submission.status === "Needs Revision" ? "bg-amber-500/10 text-amber-500" :
                        "bg-blue-500/10 text-blue-500"
                      }`}>
                        {submission.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-text-secondary">{submission.submitted}</div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg border border-border hover:bg-green-500/10 hover:text-green-500 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-bg-primary rounded-xl border border-border p-4 hover:border-secondary transition-colors text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="font-medium text-sm">Create Event</div>
                </button>
                <button className="bg-bg-primary rounded-xl border border-border p-4 hover:border-secondary transition-colors text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-medium text-sm">New Challenge</div>
                </button>
                <button className="bg-bg-primary rounded-xl border border-border p-4 hover:border-secondary transition-colors text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="font-medium text-sm">Invite Users</div>
                </button>
                <button className="bg-bg-primary rounded-xl border border-border p-4 hover:border-secondary transition-colors text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="font-medium text-sm">View Analytics</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="mt-8 bg-bg-secondary rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Audit Log</h3>
            <button className="text-secondary font-medium hover:underline">View Full Log</button>
          </div>
          <div className="space-y-3">
            {[
              { action: "User registered", user: "Alex Johnson", time: "10 minutes ago", type: "info" },
              { action: "Challenge submission approved", user: "Sam Rivera", time: "2 hours ago", type: "success" },
              { action: "Event created", user: "Admin", time: "5 hours ago", type: "info" },
              { action: "User role updated", user: "Taylor Chen", time: "1 day ago", type: "warning" },
              { action: "Project published", user: "Jordan Lee", time: "2 days ago", type: "success" },
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.type === "success" ? "bg-green-500" :
                    log.type === "warning" ? "bg-amber-500" :
                    "bg-blue-500"
                  }`} />
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-text-secondary">by {log.user}</div>
                  </div>
                </div>
                <div className="text-sm text-text-secondary">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
