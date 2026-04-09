"use client";

import { motion } from "framer-motion";
import { BookOpen, FileCode, Link, Download, ExternalLink, Video, FileText, Code, Zap, ChevronRight } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "documentation" | "starter_code" | "video" | "article" | "tool";
  url: string;
  fileSize?: string;
  downloads?: number;
}

interface ChallengeResourcesProps {
  resources: Resource[];
  challengeId: string;
}

export default function ChallengeResources({ resources, challengeId }: ChallengeResourcesProps) {
  const getResourceIcon = (type: Resource["type"]) => {
    switch (type) {
      case "documentation":
        return <BookOpen className="w-5 h-5" />;
      case "starter_code":
        return <FileCode className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "article":
        return <FileText className="w-5 h-5" />;
      case "tool":
        return <Code className="w-5 h-5" />;
      default:
        return <Link className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type: Resource["type"]) => {
    switch (type) {
      case "documentation":
        return "bg-blue-900/20 text-blue-400 border-blue-800/30";
      case "starter_code":
        return "bg-green-900/20 text-green-400 border-green-800/30";
      case "video":
        return "bg-purple-900/20 text-purple-400 border-purple-800/30";
      case "article":
        return "bg-amber-900/20 text-amber-400 border-amber-800/30";
      case "tool":
        return "bg-cyan-900/20 text-cyan-400 border-cyan-800/30";
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-800/30";
    }
  };

  const getResourceTypeLabel = (type: Resource["type"]) => {
    switch (type) {
      case "documentation": return "Documentation";
      case "starter_code": return "Starter Code";
      case "video": return "Video Tutorial";
      case "article": return "Article";
      case "tool": return "Tool";
      default: return "Resource";
    }
  };

  // Group resources by type
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<Resource["type"], Resource[]>);

  const resourceTypes: Resource["type"][] = ["documentation", "starter_code", "video", "article", "tool"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-secondary" />
          Challenge Resources
        </h2>
        <p className="text-text-secondary mt-1">
          Helpful materials, starter code, and documentation to assist you in solving this challenge.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-secondary border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{resources.length}</div>
              <div className="text-sm text-text-secondary">Total Resources</div>
            </div>
            <BookOpen className="w-8 h-8 text-text-secondary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-secondary border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {resources.filter(r => r.type === "starter_code").length}
              </div>
              <div className="text-sm text-text-secondary">Starter Kits</div>
            </div>
            <FileCode className="w-8 h-8 text-text-secondary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-secondary border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {resources.filter(r => r.type === "video").length}
              </div>
              <div className="text-sm text-text-secondary">Video Guides</div>
            </div>
            <Video className="w-8 h-8 text-text-secondary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-bg-secondary border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {resources.reduce((sum, r) => sum + (r.downloads || 0), 0)}
              </div>
              <div className="text-sm text-text-secondary">Total Downloads</div>
            </div>
            <Download className="w-8 h-8 text-text-secondary" />
          </div>
        </motion.div>
      </div>

      {/* Resources by category */}
      <div className="space-y-6">
        {resourceTypes.map((type) => {
          const typeResources = groupedResources[type] || [];
          if (typeResources.length === 0) return null;

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * resourceTypes.indexOf(type) }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className={`p-2 rounded-lg ${getResourceColor(type)}`}>
                    {getResourceIcon(type)}
                  </span>
                  {getResourceTypeLabel(type)}
                  <span className="text-sm font-normal text-text-secondary ml-2">
                    ({typeResources.length})
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {typeResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ y: -2 }}
                    className="group bg-bg-secondary border border-border rounded-lg p-4 hover:border-secondary/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getResourceColor(type)} mt-1`}>
                          {getResourceIcon(type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-text-secondary mt-1">
                            {resource.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            {resource.fileSize && (
                              <span className="text-xs text-text-secondary">
                                {resource.fileSize}
                              </span>
                            )}
                            {resource.downloads !== undefined && (
                              <span className="text-xs text-text-secondary flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {resource.downloads}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-primary hover:bg-bg-tertiary/80 transition-colors"
                        onClick={(e) => {
                          if (resource.type === "starter_code") {
                            // In a real app, this would trigger a download
                            console.log(`Downloading starter code for ${resource.title}`);
                          }
                        }}
                      >
                        {resource.type === "starter_code" ? (
                          <Download className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional helpful tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Pro Tips for Success</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Start with the starter code to understand the project structure</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Review the documentation thoroughly before implementing your solution</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Watch the video tutorials for step-by-step guidance on complex concepts</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Test your solution thoroughly before submission - edge cases matter!</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Check the leaderboard regularly to see how others are approaching the challenge</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Empty state */}
      {resources.length === 0 && (
        <div className="py-12 text-center border border-dashed border-border rounded-xl">
          <div className="w-16 h-16 rounded-full bg-bg-tertiary border border-border flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No resources available yet</h3>
          <p className="text-text-secondary max-w-md mx-auto">
            Resources for this challenge will be added soon. Check back later for starter code, documentation, and helpful guides.
          </p>
        </div>
      )}
    </div>
  );
}