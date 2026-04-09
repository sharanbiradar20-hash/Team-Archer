"use client"

import { motion } from "framer-motion"
import { Users, Calendar, Code, FolderKanban, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  { icon: Users, label: "Total Members", value: 524, change: "+12%" },
  { icon: Calendar, label: "Events This Month", value: 8, change: "+3" },
  { icon: Code, label: "Active Challenges", value: 5, change: "2 new" },
  { icon: FolderKanban, label: "Projects Showcased", value: 127, change: "+8" },
]

export default function QuickStats() {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      const increment = stat.value / 30
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(interval)
        }
        setCounts((prev) => {
          const newCounts = [...prev]
          newCounts[i] = Math.floor(current)
          return newCounts
        })
      }, 30)
      return interval
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-bg-card border border-border">
              <stat.icon className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.change}</span>
            </div>
          </div>
          <p className="text-3xl md:text-4xl font-bold">{counts[index]}</p>
          <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}