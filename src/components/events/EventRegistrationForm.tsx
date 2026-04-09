"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, Users, Send } from "lucide-react"
import { motion } from "framer-motion"

interface EventRegistrationFormProps {
  eventId: string
  eventTitle: string
  isRegistrationOpen: boolean
  isFull: boolean
  registrationCount: number
}

export default function EventRegistrationForm({
  eventId,
  eventTitle,
  isRegistrationOpen,
  isFull,
  registrationCount,
}: EventRegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    department: "",
    year: "",
    teamName: "",
    teamMembers: "",
    dietaryRestrictions: "",
    specialRequirements: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // In real implementation, submit to Supabase
    // await registerForEvent(eventId, formData)
  }

  const yearOptions = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Postgraduate"]
  const departmentOptions = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Biotechnology",
    "Business Administration",
    "Other",
  ]

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
        <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
        <p className="text-text-secondary mb-6">
          You have successfully registered for <span className="font-semibold">{eventTitle}</span>.
        </p>
        <div className="space-y-4 text-left bg-bg-primary rounded-lg p-4 mb-6">
          <div className="flex justify-between">
            <span className="text-text-secondary">Confirmation ID:</span>
            <span className="font-mono font-semibold">EVT-{eventId.slice(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Date:</span>
            <span className="font-semibold">June 15-17, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Venue:</span>
            <span className="font-semibold">Tech Auditorium</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          A confirmation email has been sent to your inbox. Check your email for further details.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Register for Event</h3>
        <div className="flex items-center gap-2 text-white/90">
          <Users className="w-4 h-4" />
          <span>{registrationCount} participants registered</span>
        </div>
      </div>

      {/* Status Alert */}
      <div className="p-6 border-b border-border">
        {!isRegistrationOpen ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-semibold text-red-500">Registration Closed</p>
              <p className="text-sm text-text-secondary">Registration for this event is no longer accepting submissions.</p>
            </div>
          </div>
        ) : isFull ? (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-500">Event Full</p>
              <p className="text-sm text-text-secondary">This event has reached maximum capacity. You can join the waitlist.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-semibold text-green-500">Registration Open</p>
              <p className="text-sm text-text-secondary">Complete the form below to secure your spot.</p>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="student@university.edu"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Student ID *</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., CS2024001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year *</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select year</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select department</option>
            {departmentOptions.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Name (Optional)</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Code Crusaders"
          />
          <p className="text-xs text-text-tertiary mt-1">Leave blank if registering individually</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Members (Optional)</label>
          <textarea
            name="teamMembers"
            value={formData.teamMembers}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="List names and student IDs of team members..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Vegetarian, Gluten-free, None"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Special Requirements</label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Any accessibility needs or other requirements..."
          />
        </div>

        <div className="pt-4 border-t border-border">
          <button
            type="submit"
            disabled={!isRegistrationOpen || isFull || isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Registration
              </>
            )}
          </button>
          <p className="text-xs text-text-tertiary text-center mt-3">
            By registering, you agree to the event terms and conditions.
          </p>
        </div>
      </form>
    </div>
  )
}