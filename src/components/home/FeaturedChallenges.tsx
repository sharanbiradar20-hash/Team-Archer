"use client"

import { motion } from "framer-motion"
import { Code, Clock, Award, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getDifficultyColor } from "@/lib/utils"

const challenges = [
  {
    id: "1",
    title: "Real-time Chat Application",
    difficulty: "hard",
    category: "full_stack",
    deadline: "2026-04-30T23:59:00Z",
    participants: 45,
    prize: "₹10,000",
    tags: ["WebSocket", "React", "Node.js", "Redis"],
  },
  {
    id: "2",
    title: "Accessible Dashboard UI",
    difficulty: "medium",
    category: "ui_ux",
    deadline: "2026-04-25T23:59:00Z",
    participants: 78,
    prize: "₹5,000",
    tags: ["Figma", "Tailwind", "A11y", "React"],
  },
  {
    id: "3",
    title: "REST API for E‑commerce",
    difficulty: "easy",
    category: "api_design",
    deadline: "2026-04-20T23:59:00Z",
    participants: 92,
    prize: "₹3,000",
    tags: ["Express", "MongoDB", "JWT", "Swagger"],
  },
]

export default function FeaturedChallenges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link
            href={`/challenges/${challenge.id}`}
            className="block glass rounded-2xl p-6 border border-border hover:border-accent-primary transition-colors group h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                  challenge.difficulty as any
                )}`}
              >
                {challenge.difficulty.toUpperCase()}
              </span>
              <div className="flex items-center space-x-1 text-text-secondary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{challenge.participants} participants</span>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <Code className="w-5 h-5 text-accent-primary mr-2" />
              <span className="text-sm text-text-secondary">{challenge.category.replace("_", " ")}</span>
            </div>

            <h3 className="text-xl font-bold mb-4 group-hover:text-accent-primary transition-colors">
              {challenge.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {challenge.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-bg-card border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-text-secondary">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Deadline</span>
                </div>
                <span className="font-medium">
                  {new Date(challenge.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-text-secondary">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">Prize</span>
                </div>
                <span className="font-medium text-accent-secondary">{challenge.prize}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-text-secondary">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Participants</span>
                </div>
                <span className="font-medium">{challenge.participants}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-lg bg-bg-card border border-border hover:bg-bg-card/80 hover:border-accent-primary transition-colors font-medium">
              View Challenge
            </button>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}