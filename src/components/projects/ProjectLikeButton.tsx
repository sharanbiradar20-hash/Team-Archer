"use client"

import { Heart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ProjectLikeButtonProps {
  projectId: string
  initialLikes: number
  isFeatured: boolean
}

export default function ProjectLikeButton({ 
  projectId, 
  initialLikes, 
  isFeatured 
}: ProjectLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleLike = async () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const newLikedState = !isLiked
    const newLikesCount = newLikedState ? likes + 1 : likes - 1
    
    // Optimistic update
    setIsLiked(newLikedState)
    setLikes(newLikesCount)
    
    try {
      // In real implementation, call Supabase API
      // await supabase.from('project_likes').upsert({
      //   project_id: projectId,
      //   user_id: userId,
      // })
      console.log(`Project ${projectId} ${newLikedState ? 'liked' : 'unliked'}`)
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState)
      setLikes(likes)
      console.error('Failed to update like:', error)
    } finally {
      setIsAnimating(false)
    }
  }

  return (
    <div className={`rounded-2xl border p-6 ${isFeatured ? 'bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20' : 'bg-bg-secondary border-border'}`}>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <motion.button
            onClick={handleLike}
            disabled={isAnimating}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500/20 border-2 border-red-500/30' 
                : 'bg-bg-primary border-2 border-border'
            } ${isAnimating ? 'cursor-not-allowed' : 'hover:scale-105 hover:border-secondary'}`}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated heart */}
            <motion.div
              animate={{ 
                scale: isAnimating ? [1, 1.3, 1] : 1,
                rotate: isAnimating ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.4 }}
            >
              <Heart 
                className={`w-10 h-10 ${
                  isLiked 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-text-secondary'
                }`}
                strokeWidth={2}
              />
            </motion.div>
            
            {/* Floating particles effect on like */}
            {isAnimating && isLiked && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-red-500 rounded-full"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [1, 0.5, 0],
                      x: Math.cos(i * 120 * Math.PI / 180) * 30,
                      y: Math.sin(i * 120 * Math.PI / 180) * 30,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </>
            )}
          </motion.button>
          
          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute -top-2 -right-2">
              <div className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold animate-pulse">
                FEATURED
              </div>
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          {likes.toLocaleString()}
        </h3>
        <p className="text-text-secondary mb-6">
          {isLiked ? 'You and others like this project' : 'Be the first to like this project'}
        </p>
        
        <div className="w-full space-y-3">
          <button
            onClick={handleLike}
            disabled={isAnimating}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              isLiked
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                : 'bg-secondary text-white hover:bg-secondary/90'
            } ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLiked ? (
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-current" />
                Liked
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Like This Project
              </span>
            )}
          </button>
          
          <div className="text-xs text-text-secondary">
            <p>Likes help projects gain visibility on the leaderboard</p>
          </div>
        </div>
      </div>
      
      {/* Stats breakdown (mock) */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <h4 className="text-sm font-semibold mb-3">Like Analytics</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-bg-primary">
            <div className="text-lg font-bold text-green-500">+24%</div>
            <div className="text-xs text-text-secondary">This week</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-primary">
            <div className="text-lg font-bold text-secondary">42</div>
            <div className="text-xs text-text-secondary">Club members</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-primary">
            <div className="text-lg font-bold text-amber-500">#3</div>
            <div className="text-xs text-text-secondary">Trending rank</div>
          </div>
        </div>
      </div>
    </div>
  )
}