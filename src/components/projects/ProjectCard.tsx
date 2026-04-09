"use client";

import { motion } from "framer-motion";
import { Heart, Eye, ExternalLink, Star, Users, Calendar, Award, Code2 } from "lucide-react";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(project.likes_count);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const getStatusColor = () => {
    // Since Project interface doesn't have status, we'll determine based on is_featured and is_archived
    if (project.is_featured) return "bg-gradient-to-r from-amber-500 to-amber-600";
    if (project.is_archived) return "bg-gradient-to-r from-gray-500 to-gray-600";
    return "bg-gradient-to-r from-secondary to-primary";
  };

  const getDomainColor = (domain: string | null) => {
    if (!domain) return "bg-bg-tertiary text-text-secondary";
    
    const domainColors: Record<string, string> = {
      "AI/ML": "bg-purple-900/30 text-purple-400",
      "Web Development": "bg-blue-900/30 text-blue-400",
      "IoT": "bg-green-900/30 text-green-400",
      "AR/VR": "bg-amber-900/30 text-amber-400",
      "Blockchain": "bg-indigo-900/30 text-indigo-400",
      "Mobile": "bg-pink-900/30 text-pink-400",
    };
    
    return domainColors[domain] || "bg-bg-tertiary text-text-secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-bg-secondary border border-border rounded-2xl overflow-hidden hover:border-secondary/50 transition-all"
    >
      {/* Thumbnail */}
      <Link href={`/projects/${project.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()} text-white`}>
            {project.is_featured ? "Featured" : project.is_archived ? "Archived" : "Active"}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
            {project.year}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-gray-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Code2 className="w-4 h-4" />
            </a>
          )}
        </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link href={`/projects/${project.id}`} className="group/link">
            <h3 className="text-xl font-bold group-hover/link:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>
          {project.is_featured && (
            <Star className="w-5 h-5 text-amber-500 flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Domain */}
        {project.domain && (
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getDomainColor(project.domain)}`}>
              {project.domain}
            </span>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs bg-bg-tertiary text-text-secondary rounded-lg border border-border"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2.5 py-1 text-xs bg-bg-tertiary text-text-secondary rounded-lg border border-border">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-text-secondary hover:text-red-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <div className="flex items-center gap-1.5 text-text-secondary">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{project.likes_count * 6}</span>
            </div>

            <div className="flex items-center gap-1.5 text-text-secondary">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{project.team_size}</span>
            </div>
          </div>

          <div className="text-xs text-text-secondary flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(project.created_at)}
          </div>
        </div>

        {/* Team Members */}
        {project.team_members_names.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Team</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.team_members_names.slice(0, 3).map((member, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-bg-primary text-text-secondary rounded-lg border border-border"
                >
                  {member}
                </span>
              ))}
              {project.team_members_names.length > 3 && (
                <span className="px-2 py-1 text-xs bg-bg-primary text-text-secondary rounded-lg border border-border">
                  +{project.team_members_names.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Featured Ribbon */}
      {project.is_featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-1 transform translate-x-2 translate-y-2 rotate-45 origin-top-right">
            FEATURED
          </div>
        </div>
      )}
    </motion.div>
  );
}