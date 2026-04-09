"use client"

import { motion } from "framer-motion"

interface LoadingSkeletonProps {
  type?: "card" | "list" | "table" | "profile" | "chart"
  count?: number
}

export default function LoadingSkeleton({ type = "card", count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count })

  if (type === "card") {
    return (
      <div className="space-y-4">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            className="bg-bg-secondary rounded-2xl border border-border p-6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-bg-primary animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-bg-primary rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-bg-primary rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-bg-primary rounded w-2/3 animate-pulse" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="h-10 bg-bg-primary rounded-lg animate-pulse" />
              <div className="h-10 bg-bg-primary rounded-lg animate-pulse" />
              <div className="h-10 bg-bg-primary rounded-lg animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="space-y-3">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 bg-bg-secondary rounded-xl border border-border"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-bg-primary animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-bg-primary rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-bg-primary rounded w-1/4 animate-pulse" />
            </div>
            <div className="w-20 h-8 bg-bg-primary rounded-lg animate-pulse" />
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === "table") {
    return (
      <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="h-6 bg-bg-primary rounded w-1/4 animate-pulse" />
        </div>
        <div className="p-6 space-y-4">
          {skeletons.map((_, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-primary animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-bg-primary rounded w-32 animate-pulse" />
                  <div className="h-3 bg-bg-primary rounded w-24 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-8 bg-bg-primary rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-bg-primary rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-bg-primary rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "profile") {
    return (
      <div className="bg-bg-secondary rounded-2xl border border-border p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-bg-primary animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-16 h-8 bg-bg-primary rounded-full animate-pulse" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="h-8 bg-bg-primary rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-bg-primary rounded w-1/2 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-bg-primary rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === "chart") {
    return (
      <div className="bg-bg-secondary rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-bg-primary rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-bg-primary rounded w-1/6 animate-pulse" />
        </div>
        <div className="h-64 flex items-end gap-4">
          {[40, 65, 30, 75, 50].map((height, i) => (
            <div key={i} className="flex-1">
              <motion.div
                className="w-full bg-bg-primary rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              />
              <div className="mt-2">
                <div className="h-3 bg-bg-primary rounded w-full animate-pulse" />
                <div className="h-2 bg-bg-primary rounded w-1/2 mx-auto mt-1 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {skeletons.map((_, index) => (
        <div key={index} className="h-20 bg-bg-secondary rounded-xl border border-border animate-pulse" />
      ))}
    </div>
  )
}