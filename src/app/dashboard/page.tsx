"use client"

import { useState } from "react"
import { User, Trophy, Target, Calendar, Award, TrendingUp, BarChart3, PieChart, Activity, Zap, Star, Clock, Users, FileText, Code, Heart, Crown, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Mock data for dashboard
const userStats = {
  name: "Alex Johnson",
  rank: 1,
  score: 1250,
  badge: "Legend",
  streak: 14,
  eventsAttended: 12,
  challengesCompleted: 8,
  projectsPublished: 5,
  submissions: 24,
  likesReceived: 142,
  memberSince: "2023-09-15"
}

const monthlyData = [
  { month: "Jan", score: 850 },
  { month: "Feb", score: 920 },
  { month: "Mar", score: 1100 },
  { month: "Apr", score: 1250 },
]

const activityData = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 3 },
  { day: "Fri", value: 6 },
  { day: "Sat", value: 8 },
  { day: "Sun", value: 7 },
]

const recentActivities = [
  { id: 1, type: "challenge", title: "AI Hackathon Submission", points: 150, time: "2 hours ago", icon: <Code className="w-5 h-5" /> },
  { id: 2, type: "project", title: "Published 'Code Review AI'", points: 100, time: "1 day ago", icon: <FileText className="w-5 h-5" /> },
  { id: 3, type: "event", title: "Attended Web Dev Workshop", points: 50, time: "2 days ago", icon: <Users className="w-5 h-5" /> },
  { id: 4, type: "like", title: "Project received 24 likes", points: 25, time: "3 days ago", icon: <Heart className="w-5 h-5" /> },
  { id: 5, type: "streak", title: "7-day activity streak", points: 35, time: "4 days ago", icon: <Zap className="w-5 h-5" /> },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("This Month")
  const router = useRouter()

  const handleShareProfile = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: `${userStats.name} - ClubNexus Profile`, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success("Profile link copied to clipboard!")
      }
    } catch {
      await navigator.clipboard.writeText(url)
      toast.success("Profile link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Personal Dashboard</h1>
            <p className="text-text-secondary">Track your progress, achievements, and activity within the club ecosystem.</p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              className="bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>All Time</option>
            </select>
            <button
              onClick={handleShareProfile}
              className="px-5 py-2.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Profile
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-border p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar & Badge */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                <span className="text-4xl font-bold text-white">AJ</span>
              </div>
              <div className="absolute -bottom-2 -right-2">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  {userStats.badge}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{userStats.name}</h2>
                  <p className="text-text-secondary">Member since {new Date(userStats.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary">{userStats.rank}</div>
                    <div className="text-sm text-text-secondary">Global Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{userStats.score}</div>
                    <div className="text-sm text-text-secondary">Total Points</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-bg-primary rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Events</p>
                      <p className="font-semibold">{userStats.eventsAttended}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-primary rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Challenges</p>
                      <p className="font-semibold">{userStats.challengesCompleted}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-primary rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <FileText className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Projects</p>
                      <p className="font-semibold">{userStats.projectsPublished}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-bg-primary rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Day Streak</p>
                      <p className="font-semibold">{userStats.streak}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Score Progress Chart */}
            <div className="bg-bg-secondary rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Score Progress
                </h3>
                <div className="text-sm text-text-secondary">Last 4 months</div>
              </div>
              <div className="h-64 flex items-end gap-4">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <motion.div 
                      className="w-full bg-gradient-to-t from-secondary to-primary rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.score / 1400) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                    <div className="mt-2 text-sm font-medium">{item.month}</div>
                    <div className="text-xs text-text-secondary">{item.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="bg-bg-secondary rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity Heatmap
                </h3>
                <div className="text-sm text-text-secondary">This week</div>
              </div>
              <div className="flex items-end justify-between h-40">
                {activityData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <motion.div 
                      className="w-10 rounded-lg bg-gradient-to-t from-green-500 to-emerald-600"
                      initial={{ height: 0 }}
                      animate={{ height: `${item.value * 12}px` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                    <div className="mt-2 text-sm">{item.day}</div>
                    <div className="text-xs text-text-secondary">{item.value} hrs</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Activities */}
          <div className="space-y-8">
            {/* Points Breakdown */}
            <div className="bg-bg-secondary rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Points Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Target className="w-4 h-4 text-secondary" />
                    </div>
                    <span>Challenges</span>
                  </div>
                  <div className="font-semibold">650 pts</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span>Events</span>
                  </div>
                  <div className="font-semibold">350 pts</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <FileText className="w-4 h-4 text-green-500" />
                    </div>
                    <span>Projects</span>
                  </div>
                  <div className="font-semibold">200 pts</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Heart className="w-4 h-4 text-amber-500" />
                    </div>
                    <span>Engagement</span>
                  </div>
                  <div className="font-semibold">50 pts</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span className="text-secondary">{userStats.score} pts</span>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-bg-secondary rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-bg-primary border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        {activity.icon}
                      </div>
                      <div>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-text-secondary">{activity.time}</div>
                      </div>
                    </div>
                    <div className="text-green-500 font-semibold">+{activity.points}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Milestone */}
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Next Milestone
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Legend Tier</span>
                  <span>{userStats.score}/1500</span>
                </div>
                <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-secondary to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStats.score / 1500) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                {1500 - userStats.score} points needed for exclusive Legend perks
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => router.push('/challenges')} className="bg-bg-secondary rounded-xl border border-border p-6 hover:border-secondary transition-colors text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-medium">Join Challenge</div>
            </button>
            <button onClick={() => router.push('/events')} className="bg-bg-secondary rounded-xl border border-border p-6 hover:border-secondary transition-colors text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Register Event</div>
            </button>
            <button onClick={() => router.push('/projects')} className="bg-bg-secondary rounded-xl border border-border p-6 hover:border-secondary transition-colors text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <div className="font-medium">Submit Project</div>
            </button>
            <button onClick={() => router.push('/leaderboard')} className="bg-bg-secondary rounded-xl border border-border p-6 hover:border-secondary transition-colors text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div className="font-medium">View Leaderboard</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}