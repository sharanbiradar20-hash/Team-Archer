"use client"

import { useState } from "react"
import { Upload, Code2, Link as LinkIcon, Send, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface ChallengeSubmissionFormProps {
  challengeId: string
  challengeTitle: string
  isActive: boolean
  deadline: string
}

export default function ChallengeSubmissionForm({
  challengeId,
  challengeTitle,
  isActive,
  deadline,
}: ChallengeSubmissionFormProps) {
  const [formData, setFormData] = useState({
    githubUrl: "",
    liveUrl: "",
    description: "",
    technologies: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // In real implementation, submit to Supabase
    // await submitChallengeSolution(challengeId, formData, file)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-bg-secondary rounded-2xl border border-border p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Submission Successful!</h3>
        <p className="text-text-secondary mb-6">
          Your solution for <span className="font-semibold">{challengeTitle}</span> has been submitted.
        </p>
        <div className="space-y-4 text-left bg-bg-primary rounded-lg p-4 mb-6">
          <div className="flex justify-between">
            <span className="text-text-secondary">Submission ID:</span>
            <span className="font-mono font-semibold">SUB-{challengeId.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Submitted at:</span>
            <span className="font-semibold">{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Status:</span>
            <span className="font-semibold text-green-500">Under Review</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          You will be notified when your submission has been reviewed. Check your dashboard for updates.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-primary p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Submit Solution</h3>
        <div className="flex items-center gap-2 text-white/90">
          <AlertCircle className="w-4 h-4" />
          <span>Deadline: {formatDate(deadline)}</span>
        </div>
      </div>

      {/* Status Alert */}
      <div className="p-6 border-b border-border">
        {!isActive ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-semibold text-red-500">Submissions Closed</p>
              <p className="text-sm text-text-secondary">This challenge is no longer accepting submissions.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-semibold text-green-500">Submissions Open</p>
              <p className="text-sm text-text-secondary">Submit your solution before the deadline.</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            GitHub Repository URL *
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            required
            disabled={!isActive}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="https://github.com/username/repository"
          />
          <p className="text-xs text-text-tertiary mt-1">Make sure the repository is public</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Live Demo URL (Optional)
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            disabled={!isActive}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="https://demo.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={!isActive}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Describe your solution, architecture, and key features..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Technologies Used *</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            required
            disabled={!isActive}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="React, Node.js, MongoDB, WebSocket, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Files (Optional)</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-secondary transition-colors">
            <Upload className="w-12 h-12 mx-auto text-text-tertiary mb-4" />
            <p className="text-text-secondary mb-2">Drag & drop files here or click to browse</p>
            <p className="text-xs text-text-tertiary mb-4">Supports ZIP, PDF, DOCX (Max 50MB)</p>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={!isActive}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`inline-block px-6 py-2 rounded-lg border cursor-pointer ${
                isActive 
                  ? "border-secondary text-secondary hover:bg-secondary/10" 
                  : "border-gray-500 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              Choose File
            </label>
            {file && (
              <p className="mt-4 text-sm text-text-secondary">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes for Reviewers (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={!isActive}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Any special instructions, setup requirements, or things reviewers should know..."
          />
        </div>

        <div className="pt-4 border-t border-border">
          <button
            type="submit"
            disabled={!isActive || isSubmitting}
            className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Solution
              </>
            )}
          </button>
          <p className="text-xs text-text-tertiary text-center mt-3">
            By submitting, you confirm that this is your original work and agree to the terms.
          </p>
        </div>
      </form>
    </div>
  )
}