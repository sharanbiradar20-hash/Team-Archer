import { Calendar, MapPin, Users, Clock, Share2, Bookmark, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Event } from "@/types"
import { formatDate } from "@/lib/utils"
import EventRegistrationForm from "@/components/events/EventRegistrationForm"
import EventSchedule from "@/components/events/EventSchedule"
import EventSpeakers from "@/components/events/EventSpeakers"
import EventFAQs from "@/components/events/EventFAQs"

// Mock data - will be replaced with Supabase query
const mockEvent: Event = {
  id: "1",
  title: "Annual Hackathon 2024",
  description: "A 48-hour coding marathon where students build innovative solutions to real-world problems. This event brings together the brightest minds from across campus to collaborate, innovate, and create impactful projects.",
  banner_image_url: "/api/placeholder/1200/400",
  event_date: "2024-06-15T09:00:00Z",
  end_date: "2024-06-17T17:00:00Z",
  venue: "Tech Auditorium, Computer Science Building",
  mode: "In-person",
  category: "hackathon",
  status: "published",
  schedule: {
    day1: [
      { time: "09:00 AM", activity: "Registration & Breakfast" },
      { time: "10:00 AM", activity: "Opening Ceremony & Keynote" },
      { time: "11:00 AM", activity: "Team Formation & Idea Pitching" },
      { time: "12:00 PM", activity: "Hacking Begins" },
      { time: "01:00 PM", activity: "Lunch" },
      { time: "07:00 PM", activity: "Dinner" },
    ],
    day2: [
      { time: "09:00 AM", activity: "Breakfast" },
      { time: "02:00 PM", activity: "Mid-point Check-in" },
      { time: "07:00 PM", activity: "Dinner" },
    ],
    day3: [
      { time: "09:00 AM", activity: "Breakfast" },
      { time: "12:00 PM", activity: "Hacking Ends" },
      { time: "01:00 PM", activity: "Project Submission" },
      { time: "02:00 PM", activity: "Judging & Demos" },
      { time: "05:00 PM", activity: "Awards Ceremony & Closing" },
    ],
  },
  speakers: [
    {
      name: "Dr. Sarah Chen",
      role: "Head of Engineering, TechCorp",
      bio: "Expert in scalable systems and AI infrastructure.",
      photo_url: "/api/placeholder/100/100",
    },
    {
      name: "Alex Rodriguez",
      role: "Senior Product Designer, DesignHub",
      bio: "Specializes in user-centered design and design systems.",
      photo_url: "/api/placeholder/100/100",
    },
    {
      name: "Priya Sharma",
      role: "Founder, EduTech Startup",
      bio: "Passionate about educational technology and accessibility.",
      photo_url: "/api/placeholder/100/100",
    },
  ],
  faqs: [
    {
      question: "Who can participate?",
      answer: "Any currently enrolled student from any department can participate. Teams of 2-4 members are allowed.",
    },
    {
      question: "What should I bring?",
      answer: "Bring your laptop, charger, and any hardware you plan to use. Food and drinks will be provided.",
    },
    {
      question: "Are there any prizes?",
      answer: "Yes! The winning team receives $1000, second place $500, and third place $250. There are also special category prizes.",
    },
    {
      question: "Can I work on a pre-existing project?",
      answer: "No, all projects must be started from scratch during the hackathon. However, you can come with ideas prepared.",
    },
  ],
  registration_count: 142,
  results: null,
  gallery_album_id: null,
  created_by: null,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
}

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  
  // In real implementation, fetch event from Supabase
  // const event = await getEventById(id)
  const event = mockEvent
  
  if (!event) {
    notFound()
  }

  const isRegistrationOpen = event.status === "published"
  const isFull = event.registration_count >= 200 // Assuming max 200

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-bg-primary" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                  <p className="text-xl text-text-secondary mb-8">{event.description}</p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Date</p>
                        <p className="font-semibold">{formatDate(event.event_date)}</p>
                        {event.end_date && (
                          <p className="text-sm text-text-tertiary">to {formatDate(event.end_date)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <MapPin className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Venue & Mode</p>
                        <p className="font-semibold">{event.venue}</p>
                        <p className="text-sm text-text-tertiary">{event.mode}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Users className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Participants</p>
                        <p className="font-semibold">{event.registration_count} registered</p>
                        <p className="text-sm text-text-tertiary">Max: 200</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Clock className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Status</p>
                        <p className="font-semibold capitalize">{event.status}</p>
                        <p className="text-sm text-text-tertiary">
                          {isRegistrationOpen ? "Registration Open" : "Registration Closed"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {isRegistrationOpen && !isFull ? (
                    <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Register Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium flex items-center gap-2 cursor-not-allowed"
                    >
                      {isFull ? "Event Full" : "Registration Closed"}
                    </button>
                  )}
                  <button className="px-6 py-3 border border-border rounded-lg hover:bg-bg-secondary transition-colors font-medium flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Save for Later
                  </button>
                  <button className="px-6 py-3 border border-border rounded-lg hover:bg-bg-secondary transition-colors font-medium flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share Event
                  </button>
                </div>

                {/* Tabs Content */}
                <div className="space-y-12">
                  <EventSchedule schedule={event.schedule} />
                  <EventSpeakers speakers={event.speakers} />
                  <EventFAQs faqs={event.faqs} />
                </div>
              </div>

              {/* Sidebar - Registration Form */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <EventRegistrationForm
                    eventId={event.id}
                    eventTitle={event.title}
                    isRegistrationOpen={isRegistrationOpen}
                    isFull={isFull}
                    registrationCount={event.registration_count}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}