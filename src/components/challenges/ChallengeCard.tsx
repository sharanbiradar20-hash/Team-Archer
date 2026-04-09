"use client"

import { Trophy, Clock, Users, Target, ArrowRight, Star, Code } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Challenge } from "@/types"
import { cn, formatDate } from "@/lib/utils"
import { CHALLENGE_DIFFICULTIES, CHALLENGE_CATEGORIES } from "@/lib/constants"

interface ChallengeCardProps {
  challenge: Challenge
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500"
      case "ended":
        return "bg-red-500/10 text-red-500"
      case "draft":
        return "bg-gray-500/10 text-gray-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ui_ux":
        return "bg-purple-500/10 text-purple-500"
      case "full_stack":
        return "bg-blue-500/10 text-blue-500"
      case "api_design":
        return "bg-amber-500/10 text-amber-500"
      case "open_innovation":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const difficultyLabel = CHALLENGE_DIFFICULTIES.find(d => d.value === challenge.difficulty)?.label || challenge.difficulty
  const categoryLabel = CHALLENGE_CATEGORIES.find(c => c.value === challenge.category)?.label || challenge.category

  const totalPoints = challenge.scoring_rules && typeof challenge.scoring_rules === 'object'
    ? Object.values(challenge.scoring_rules as Record<string, number>).reduce((sum: number, val: number) => sum + val, 0)
    : 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5"
    >
      {/* Status & Difficulty Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getStatusColor(challenge.status)
        )}>
          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
        </span>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getDifficultyColor(challenge.difficulty)
        )}>
          {difficultyLabel}
        </span>
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-primary">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getCategoryColor(challenge.category)
              )}>
                {categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-xs font-medium">{totalPoints} pts</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
              {challenge.title}
            </h3>
            <p className="text-text-secondary text-sm line-clamp-2">
              {challenge.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {challenge.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs bg-bg-primary text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress & Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4" />
              <span>Deadline</span>
            </div>
            <div className="font-medium">
              {formatDate(challenge.deadline)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users className="w-4 h-4" />
              <span>Submissions</span>
            </div>
            <div className="font-medium">
              24
            </div>
          </div>
        </div>

        {/* Scoring Rules */}
        {challenge.scoring_rules && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-text-secondary">Scoring Breakdown</span>
              <span className="font-medium">{totalPoints} total points</span>
            </div>
            <div className="space-y-1">
              {challenge.scoring_rules && typeof challenge.scoring_rules === 'object' &&
                Object.entries(challenge.scoring_rules as Record<string, number>).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary capitalize">{key.replace('_', ' ')}</span>
                    <span className="font-medium">{value} pts</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Link
            href={`/challenges/${challenge.id}`}
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium text-sm"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-primary transition-colors text-sm font-medium">
              <Code className="w-4 h-4 inline mr-2" />
              Fork
            </button>
            <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
              Submit Solution
            </button>
          </div>
        </div>
      </div>

      {/* Time Remaining Indicator */}
      {challenge.status === "active" && (
        <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse" />
      )}
      {challenge.status === "ended" && (
        <div className="h-1 bg-gray-500" />
      )}
    </motion.div>
  )
}