import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function isValidGithubUrl(url: string) {
  return /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/.test(url)
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getRankBadge(score: number): "newbie" | "contributor" | "expert" | "legend" {
  if (score >= 1000) return "legend"
  if (score >= 500) return "expert"
  if (score >= 100) return "contributor"
  return "newbie"
}

export function getDifficultyColor(difficulty: "easy" | "medium" | "hard") {
  switch (difficulty) {
    case "easy":
      return "bg-green-500/20 text-green-300 border-green-500"
    case "medium":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500"
    case "hard":
      return "bg-red-500/20 text-red-300 border-red-500"
  }
}

export function getEventCategoryColor(category: string) {
  const colors: Record<string, string> = {
    workshop: "bg-blue-500/20 text-blue-300 border-blue-500",
    hackathon: "bg-purple-500/20 text-purple-300 border-purple-500",
    talk: "bg-cyan-500/20 text-cyan-300 border-cyan-500",
    competition: "bg-orange-500/20 text-orange-300 border-orange-500",
    social: "bg-pink-500/20 text-pink-300 border-pink-500",
  }
  return colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500"
}