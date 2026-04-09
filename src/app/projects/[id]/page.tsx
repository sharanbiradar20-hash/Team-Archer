import { ArrowLeft, ExternalLink, Heart, Eye, Users, Calendar, Star, Award, Code, BookOpen, FileText, Video, Download, Code2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Project } from "@/types"
import { formatDate } from "@/lib/utils"
import ProjectLikeButton from "@/components/projects/ProjectLikeButton"

// Mock data - will be replaced with Supabase query
const mockProject: Project = {
  id: "1",
  title: "AI-Powered Code Review Assistant",
  description: "An intelligent tool that analyzes code quality, suggests improvements, and detects potential bugs using machine learning.",
  extended_description: `# AI-Powered Code Review Assistant

## Project Overview
This project leverages state-of-the-art transformer models to analyze code patterns and provide actionable feedback to developers. The system integrates seamlessly with popular IDEs and version control systems, offering real-time code quality assessment.

## Key Features
- **Automated Code Analysis**: Scans code for potential bugs, security vulnerabilities, and performance issues
- **Intelligent Suggestions**: Provides context-aware improvement recommendations
- **Learning Capabilities**: Adapts to your coding style and project patterns over time
- **Multi-language Support**: Works with Python, JavaScript, TypeScript, Java, and more
- **Integration Ready**: Plugins for VS Code, IntelliJ, GitHub Actions, and GitLab CI

## Technical Architecture
The system is built with a microservices architecture:
- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: FastAPI with Python
- **ML Models**: Fine-tuned transformer models (CodeBERT, CodeT5)
- **Database**: PostgreSQL with vector embeddings for similarity search
- **Deployment**: Docker containers orchestrated with Kubernetes

## Impact & Results
- Reduced code review time by 40% for development teams
- Identified 15% more critical bugs compared to manual reviews
- Improved code quality scores by 25% across projects`,
  thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
  screenshots: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop"
  ],
  tech_stack: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "TensorFlow", "PostgreSQL", "Docker", "Kubernetes"],
  team_members_names: ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince"],
  github_url: "https://github.com/clubnexus/code-review-ai",
  live_url: "https://code-review-ai.vercel.app",
  documentation_url: "https://docs.code-review-ai.vercel.app",
  domain: "AI/ML",
  year: "2024",
  team_size: 4,
  is_featured: true,
  is_archived: false,
  likes_count: 142,
  created_by: "user1",
  created_at: "2024-02-15T10:00:00Z",
}

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  
  // In real implementation, fetch project from Supabase
  // const project = await getProjectById(id)
  const project = mockProject

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-bg-primary" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {project.is_featured && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium">
                        <Star className="w-4 h-4" />
                        <span>Featured</span>
                      </div>
                    )}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      project.is_archived 
                        ? "bg-gray-500/10 text-gray-500" 
                        : "bg-green-500/10 text-green-500"
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                      <span>{project.is_archived ? "Archived" : "Active"}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                      <Award className="w-4 h-4" />
                      <span>{project.domain}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                  <p className="text-xl text-text-secondary mb-8">{project.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors font-medium"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
                      >
                        <Code className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                    {project.documentation_url && (
                      <a
                        href={project.documentation_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
                      >
                        <BookOpen className="w-5 h-5" />
                        Documentation
                      </a>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Heart className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Likes</p>
                          <p className="font-semibold">{project.likes_count}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Views</p>
                          <p className="font-semibold">{project.likes_count * 6}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Users className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Team Size</p>
                          <p className="font-semibold">{project.team_size}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                          <Calendar className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Created</p>
                          <p className="font-semibold">{formatDate(project.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Extended Description */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Project Details</h2>
                        <p className="text-text-secondary">Comprehensive overview and technical specifications</p>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap font-sans text-text-primary bg-bg-primary p-6 rounded-lg border border-border">
                        {project.extended_description}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Code className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Technology Stack</h2>
                        <p className="text-text-secondary">Tools, frameworks, and libraries used in this project</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech_stack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2.5 rounded-lg text-sm font-medium bg-bg-primary text-text-primary border border-border hover:border-secondary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Screenshots */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Video className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Screenshots</h2>
                        <p className="text-text-secondary">Visual showcase of the project interface and features</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.screenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-xl border border-border group cursor-pointer"
                        >
                          <img
                            src={screenshot}
                            alt={`Project screenshot ${index + 1}`}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 space-y-6">
                  {/* Like Button */}
                  <ProjectLikeButton 
                    projectId={project.id}
                    initialLikes={project.likes_count}
                    isFeatured={project.is_featured}
                  />

                  {/* Team Members */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Members
                    </h3>
                    <div className="space-y-3">
                      {project.team_members_names.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-bg-primary border border-border"
                        >
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <span className="font-semibold text-secondary">
                              {member.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{member}</div>
                            <div className="text-sm text-text-secondary">Team Member</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <div className="space-y-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-bg-primary border border-border hover:border-secondary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Code className="w-5 h-5 text-text-secondary" />
                            <span>GitHub Repository</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-text-secondary" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-bg-primary border border-border hover:border-secondary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <ExternalLink className="w-5 h-5 text-text-secondary" />
                            <span>Live Demo</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-text-secondary" />
                        </a>
                      )}
                      {project.documentation_url && (
                        <a
                          href={project.documentation_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-bg-primary border border-border hover:border-secondary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-text-secondary" />
                            <span>Documentation</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-text-secondary" />
                        </a>
                      )}
                      <button className="w-full flex items-center justify-between p-3 rounded-lg bg-bg-primary border border-border hover:border-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-text-secondary" />
                          <span>Download Case Study</span>
                        </div>
                        <Download className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Share This Project</h3>
                    <div className="flex items-center gap-3">
                      <button className="flex-1 py-2.5 px-4 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors font-medium">
                        Twitter
                      </button>
                      <button className="flex-1 py-2.5 px-4 rounded-lg bg-gray-800/10 text-gray-400 hover:bg-gray-800/20 transition-colors font-medium">
            LinkedIn
                      </button>
                      <button className="flex-1 py-2.5 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors font-medium">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}