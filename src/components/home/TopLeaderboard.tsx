"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, TrendingUp, Award, Star } from "lucide-react"
import Link from "next/link"

const leaders = [
  {
    id: "1",
    rank: 1,
    name: "Alex Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    score: 1250,
    badge: "legend",
    change: "+3",
    projects: 12,
    challenges: 8,
  },
  {
    id: "2",
    rank: 2,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    score: 980,
    badge: "expert",
    change: "+1",
    projects: 9,
    challenges: 10,
  },
  {
    id: "3",
    rank: 3,
    name: "Marcus Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    score: 920,
    badge: "expert",
    change: "-1",
    projects: 8,
    challenges: 7,
  },
  {
    id: "4",
    rank: 4,
    name: "Sofia Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    score: 780,
    badge: "contributor",
    change: "+2",
    projects: 6,
    challenges: 9,
  },
  {
    id: "5",
    rank: 5,
    name: "Jordan Taylor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    score: 650,
    badge: "contributor",
    change: "+4",
    projects: 5,
    challenges: 6,
  },
]

const badgeColors: Record<string, string> = {
  legend: "bg-amber-500/20 text-amber-300 border-amber-500",
  expert: "bg-purple-500/20 text-purple-300 border-purple-500",
  contributor: "bg-blue-500/20 text-blue-300 border-blue-500",
  newbie: "bg-gray-500/20 text-gray-300 border-gray-500",
}

export default function TopLeaderboard() {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      {/* Podium for top 3 (desktop) */}
      <div className="hidden lg:flex items-end justify-center space-x-8 mb-10">
        {[1, 0, 2].map((idx) => {
          const leader = leaders[idx]
          if (!leader) return null
          const height = leader.rank === 1 ? "h-48" : leader.rank === 2 ? "h-36" : "h-32"
          const color = leader.rank === 1 ? "bg-gradient-to-b from-yellow-500/30 to-yellow-500/10" :
                       leader.rank === 2 ? "bg-gradient-to-b from-gray-400/30 to-gray-400/10" :
                       "bg-gradient-to-b from-amber-700/30 to-amber-700/10"

          return (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className={`${height} ${color} w-32 rounded-t-2xl border border-border flex items-end justify-center p-4`}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white/20 mx-auto mb-3 overflow-hidden">
                    <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-lg">{leader.name}</p>
                  <p className="text-2xl font-bold mt-2">{leader.score}</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg-card border border-border">
                  {leader.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                  {leader.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                  {leader.rank === 3 && <Award className="w-6 h-6 text-amber-700" />}
                </div>
                <p className="mt-2 text-sm text-text-secondary">Rank #{leader.rank}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Table for all 5 (mobile & desktop fallback) */}
      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={`/dashboard/${leader.id}`}
              className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-border hover:border-accent-primary transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-border overflow-hidden">
                    <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bg-primary border border-border flex items-center justify-center">
                    <span className="text-xs font-bold">{leader.rank}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold group-hover:text-accent-primary transition-colors">
                      {leader.name}
                    </h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${badgeColors[leader.badge]}`}>
                      {leader.badge}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                    <span>{leader.projects} projects</span>
                    <span>•</span>
                    <span>{leader.challenges} challenges</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold">{leader.score}</p>
                  <p className="text-sm text-text-secondary">points</p>
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{leader.change}</span>
                </div>
                <Star className="w-5 h-5 text-text-secondary group-hover:text-yellow-500 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <Link
          href="/leaderboard"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg glass border border-border hover:bg-bg-card transition-colors font-medium"
        >
          <Trophy className="w-5 h-5" />
          <span>View Full Leaderboard</span>
        </Link>
      </div>
    </div>
  )
}