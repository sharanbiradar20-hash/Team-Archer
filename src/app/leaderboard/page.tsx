"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, TrendingUp, Users, Calendar, Award, Star, Target, Filter, RefreshCw, Crown, Zap } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for leaderboard
const mockLeaderboardData = [
  { id: "1", name: "Alex Johnson", score: 1250, rank: 1, badge: "Legend", avatar: "AJ", events: 12, challenges: 8, projects: 5, streak: 14 },
  { id: "2", name: "Sam Rivera", score: 980, rank: 2, badge: "Expert", avatar: "SR", events: 10, challenges: 6, projects: 4, streak: 7 },
  { id: "3", name: "Taylor Chen", score: 920, rank: 3, badge: "Expert", avatar: "TC", events: 8, challenges: 7, projects: 3, streak: 21 },
  { id: "4", name: "Jordan Lee", score: 780, rank: 4, badge: "Contributor", avatar: "JL", events: 9, challenges: 5, projects: 2, streak: 3 },
  { id: "5", name: "Casey Kim", score: 650, rank: 5, badge: "Contributor", avatar: "CK", events: 7, challenges: 4, projects: 1, streak: 9 },
  { id: "6", name: "Morgan Patel", score: 420, rank: 6, badge: "Contributor", avatar: "MP", events: 5, challenges: 3, projects: 1, streak: 2 },
  { id: "7", name: "Riley Smith", score: 380, rank: 7, badge: "Newbie", avatar: "RS", events: 4, challenges: 2, projects: 0, streak: 5 },
  { id: "8", name: "Drew Wilson", score: 290, rank: 8, badge: "Newbie", avatar: "DW", events: 3, challenges: 1, projects: 0, streak: 1 },
  { id: "9", name: "Blake Brown", score: 210, rank: 9, badge: "Newbie", avatar: "BB", events: 2, challenges: 1, projects: 0, streak: 0 },
  { id: "10", name: "Jordan Taylor", score: 150, rank: 10, badge: "Newbie", avatar: "JT", events: 1, challenges: 0, projects: 0, streak: 0 },
]

const timeFilters = ["All Time", "This Month", "This Week", "Today"]
const badgeFilters = ["All Badges", "Legend", "Expert", "Contributor", "Newbie"]

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("All Time")
  const [badgeFilter, setBadgeFilter] = useState("All Badges")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate different data for different time periods
  const getFilteredData = () => {
    let data = [...mockLeaderboardData]

    // Simulate different scores for different time periods
    if (timeFilter === "This Month") {
      data = data.map(m => ({ ...m, score: Math.round(m.score * 0.3), streak: Math.min(m.streak, 7) }))
        .sort((a, b) => b.score - a.score)
        .map((m, i) => ({ ...m, rank: i + 1 }))
    } else if (timeFilter === "This Week") {
      data = data.map(m => ({ ...m, score: Math.round(m.score * 0.1), streak: Math.min(m.streak, 3) }))
        .sort((a, b) => b.score - a.score)
        .map((m, i) => ({ ...m, rank: i + 1 }))
    } else if (timeFilter === "Today") {
      data = data.map(m => ({ ...m, score: Math.round(m.score * 0.02), streak: m.streak > 0 ? 1 : 0 }))
        .sort((a, b) => b.score - a.score)
        .map((m, i) => ({ ...m, rank: i + 1 }))
    }

    // Apply badge filter
    if (badgeFilter !== "All Badges") {
      data = data.filter(m => m.badge === badgeFilter)
    }

    return data
  }

  const leaderboard = getFilteredData()

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legend": return "bg-gradient-to-r from-amber-500 to-yellow-500"
      case "Expert": return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "Contributor": return "bg-gradient-to-r from-blue-500 to-cyan-500"
      default: return "bg-gradient-to-r from-gray-500 to-gray-700"
    }
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Legend": return <Crown className="w-4 h-4" />
      case "Expert": return <Star className="w-4 h-4" />
      case "Contributor": return <Award className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-primary/10 to-bg-primary" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">Global Leaderboard</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Top Performers & <span className="text-secondary">Rankings</span>
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-2xl">
                  Real-time ranking of club members based on participation, submissions, and project contributions. Climb the ladder by engaging in events and challenges.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                    <span className="font-medium">Live Updates</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                    <span className="font-medium">10 Active Members</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                    <span className="font-medium">Season 2024</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 flex items-center justify-center">
                  <Trophy className="w-32 h-32 text-secondary" />
                </div>
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold">
                    LIVE
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-3xl font-bold">10</div>
                </div>
                <div className="text-sm text-text-secondary">Ranked Members</div>
              </div>
              <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">1,250</div>
                </div>
                <div className="text-sm text-text-secondary">Top Score</div>
              </div>
              <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <Calendar className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <div className="text-sm text-text-secondary">Events This Month</div>
              </div>
              <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-3xl font-bold">21</div>
                </div>
                <div className="text-sm text-text-secondary">Longest Streak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podium Section (Top 3) */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top 3 Podium</h2>
          <div className="flex flex-col md:flex-row items-end justify-center gap-8 mb-16">
            {/* 2nd Place */}
            <motion.div 
              className="flex-1 max-w-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 text-2xl font-bold mb-4">
                  2
                </div>
                <div className="text-2xl font-bold mb-2">{mockLeaderboardData[1].name}</div>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${getBadgeColor(mockLeaderboardData[1].badge)} text-white`}>
                  {getBadgeIcon(mockLeaderboardData[1].badge)}
                  {mockLeaderboardData[1].badge}
                </div>
              </div>
              <div className="bg-gradient-to-t from-gray-500 to-gray-700 rounded-t-2xl h-48 flex items-end justify-center p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{mockLeaderboardData[1].score}</div>
                  <div className="text-gray-300">points</div>
                </div>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              className="flex-1 max-w-xs"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 text-3xl font-bold mb-4">
                  <Crown className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold mb-2">{mockLeaderboardData[0].name}</div>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${getBadgeColor(mockLeaderboardData[0].badge)} text-white`}>
                  {getBadgeIcon(mockLeaderboardData[0].badge)}
                  {mockLeaderboardData[0].badge}
                </div>
              </div>
              <div className="bg-gradient-to-t from-amber-500 to-yellow-500 rounded-t-2xl h-64 flex items-end justify-center p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">{mockLeaderboardData[0].score}</div>
                  <div className="text-amber-100">points</div>
                </div>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              className="flex-1 max-w-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 text-2xl font-bold mb-4">
                  3
                </div>
                <div className="text-2xl font-bold mb-2">{mockLeaderboardData[2].name}</div>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${getBadgeColor(mockLeaderboardData[2].badge)} text-white`}>
                  {getBadgeIcon(mockLeaderboardData[2].badge)}
                  {mockLeaderboardData[2].badge}
                </div>
              </div>
              <div className="bg-gradient-to-t from-amber-700 to-amber-900 rounded-t-2xl h-40 flex items-end justify-center p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{mockLeaderboardData[2].score}</div>
                  <div className="text-amber-200">points</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap gap-4">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    timeFilter === filter
                      ? "bg-secondary text-white"
                      : "bg-bg-secondary border border-border text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-text-secondary" />
                <select 
                  className="bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm"
                  value={badgeFilter}
                  onChange={(e) => setBadgeFilter(e.target.value)}
                >
                  {badgeFilters.map((filter) => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2.5 rounded-xl bg-bg-secondary border border-border text-text-primary font-medium hover:bg-bg-tertiary transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Rank</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Member</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Badge</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Score</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Events</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Challenges</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Projects</th>
                    <th className="text-left py-4 px-6 text-text-secondary font-medium">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((member, index) => (
                    <motion.tr 
                      key={member.id}
                      className="border-b border-border last:border-b-0 hover:bg-bg-primary/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            member.rank <= 3
                              ? member.rank === 1
                                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900"
                                : member.rank === 2
                                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
                                : "bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100"
                              : "bg-bg-primary border border-border text-text-primary"
                          }`}>
                            {member.rank}
                          </div>
                          {member.rank <= 3 && (
                            <Medal className={`w-5 h-5 ${
                              member.rank === 1 ? "text-amber-500" :
                              member.rank === 2 ? "text-gray-400" :
                              "text-amber-700"
                            }`} />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <span className="font-bold text-secondary text-lg">{member.avatar}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-sm text-text-secondary">Member since 2024</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getBadgeColor(member.badge)} text-white`}>
                          {getBadgeIcon(member.badge)}
                          {member.badge}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-xl">{member.score}</div>
                        <div className="text-sm text-text-secondary">points</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold">{member.events}</div>
                        <div className="text-sm text-text-secondary">participated</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold">{member.challenges}</div>
                        <div className="text-sm text-text-secondary">completed</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold">{member.projects}</div>
                        <div className="text-sm text-text-secondary">published</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 ${member.streak > 0 ? "text-amber-500" : "text-text-secondary"}`} />
                          <span className="font-semibold">{member.streak} days</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-text-secondary">Top 3 Rank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-text-secondary">Active Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-text-secondary">Streak Active</span>
              </div>
            </div>
            <div className="text-sm text-text-secondary">
              Updated just now • Next update in 5 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Badge Explanation */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Rank Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-500/10 to-gray-700/10 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Newbie</h3>
                  <div className="text-text-secondary">0-99 points</div>
                </div>
              </div>
              <p className="text-text-secondary">Just getting started. Participate in events and submit projects to earn points.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Contributor</h3>
                  <div className="text-text-secondary">100-499 points</div>
                </div>
              </div>
              <p className="text-text-secondary">Regular participant. Consistently contributing to challenges and events.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Expert</h3>
                  <div className="text-text-secondary">500-999 points</div>
                </div>
              </div>
              <p className="text-text-secondary">Skilled member. Leading projects and mentoring others in the community.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Legend</h3>
                  <div className="text-text-secondary">1000+ points</div>
                </div>
              </div>
              <p className="text-text-secondary">Elite status. Recognized for exceptional contributions and leadership.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}