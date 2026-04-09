"use client"

import { useState, useMemo } from "react"
import { Calendar, Filter, Search, Users, MapPin, Clock, Grid3X3, List, X } from "lucide-react"
import { EVENT_CATEGORIES } from "@/lib/constants"
import EventCard from "@/components/events/EventCard"
import { Event } from "@/types"
import { toast } from "sonner"

// Mock data - will be replaced with Supabase query
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Hackathon 2024",
    description: "A 48-hour coding marathon where students build innovative solutions to real-world problems.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-06-15T09:00:00Z",
    end_date: "2024-06-17T17:00:00Z",
    venue: "Tech Auditorium",
    mode: "In-person",
    category: "hackathon",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 142,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "React Workshop: Advanced Patterns",
    description: "Learn advanced React patterns including hooks optimization, context, and performance tuning.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-05-20T14:00:00Z",
    end_date: "2024-05-20T18:00:00Z",
    venue: "Room 302, CS Building",
    mode: "Hybrid",
    category: "workshop",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 48,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-02-10T09:30:00Z",
    updated_at: "2024-02-10T09:30:00Z",
  },
  {
    id: "3",
    title: "AI in Modern Applications",
    description: "Guest talk by industry experts on integrating AI/ML into modern web and mobile applications.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-04-25T16:00:00Z",
    end_date: "2024-04-25T18:00:00Z",
    venue: "Main Hall",
    mode: "Online",
    category: "talk",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 150,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-03-01T11:00:00Z",
    updated_at: "2024-03-01T11:00:00Z",
  },
  {
    id: "4",
    title: "UI/UX Design Competition",
    description: "Design competition focusing on creating accessible and beautiful user interfaces.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-05-10T10:00:00Z",
    end_date: "2024-05-12T16:00:00Z",
    venue: "Design Studio",
    mode: "In-person",
    category: "competition",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 65,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-02-20T14:00:00Z",
    updated_at: "2024-02-20T14:00:00Z",
  },
  {
    id: "5",
    title: "DevOps & Cloud Workshop",
    description: "Hands-on workshop covering Docker, Kubernetes, and cloud deployment strategies.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-04-30T13:00:00Z",
    end_date: "2024-04-30T17:00:00Z",
    venue: "Lab 4, IT Center",
    mode: "Hybrid",
    category: "workshop",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 40,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-03-05T08:00:00Z",
    updated_at: "2024-03-05T08:00:00Z",
  },
  {
    id: "6",
    title: "Blockchain Fundamentals",
    description: "Introduction to blockchain technology, smart contracts, and decentralized applications.",
    banner_image_url: "/api/placeholder/600/400",
    event_date: "2024-06-05T15:00:00Z",
    end_date: "2024-06-05T19:00:00Z",
    venue: "Blockchain Lab",
    mode: "In-person",
    category: "workshop",
    status: "published",
    schedule: null,
    speakers: null,
    faqs: null,
    registration_count: 42,
    results: null,
    gallery_album_id: null,
    created_by: null,
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z",
  },
]

const ITEMS_PER_PAGE = 4

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date_newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
    setCurrentPage(1)
  }

  const filteredEvents = useMemo(() => {
    let result = [...mockEvents]

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(e => selectedCategories.includes(e.category))
    }

    // Sort
    switch (sortBy) {
      case "date_newest":
        result.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
        break
      case "date_oldest":
        result.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
        break
      case "participants":
        result.sort((a, b) => b.registration_count - a.registration_count)
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [searchQuery, selectedCategories, sortBy])

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Club <span className="text-primary">Events</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Discover workshops, hackathons, talks, and competitions. Register for events that match your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search events by title, description, or venue..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Filter size={20} />
                    Filters
                    {selectedCategories.length > 0 && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {selectedCategories.length} active
                      </span>
                    )}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Category</h4>
                      <div className="space-y-2">
                        {EVENT_CATEGORIES.map((category) => (
                          <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-border"
                              checked={selectedCategories.includes(category.value)}
                              onChange={() => toggleCategory(category.value)}
                            />
                            <span>{category.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        toast.success("✓ Filters applied successfully")
                      }}
                      className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar size={20} />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total Events</span>
                      <span className="font-semibold">{mockEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Showing</span>
                      <span className="font-semibold text-green-500">{filteredEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Categories</span>
                      <span className="font-semibold">{selectedCategories.length || "All"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Events Grid */}
            <main className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">All Events</h2>
                  <p className="text-text-secondary">Showing {filteredEvents.length} events</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="date_newest">Sort by: Date (Newest)</option>
                    <option value="date_oldest">Sort by: Date (Oldest)</option>
                    <option value="participants">Sort by: Participants</option>
                    <option value="name">Sort by: Name</option>
                  </select>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg border border-border transition-colors ${viewMode === "grid" ? "bg-primary text-white border-primary" : "hover:bg-bg-secondary"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg border border-border transition-colors ${viewMode === "list" ? "bg-primary text-white border-primary" : "hover:bg-bg-secondary"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {paginatedEvents.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 mx-auto text-text-tertiary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-text-secondary mb-4">Try adjusting your filters or check back later for new events.</p>
                  <button onClick={clearFilters} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Clear Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedEvents.map((event) => (
                    <div key={event.id} className="bg-bg-secondary rounded-xl border border-border p-4 flex flex-col md:flex-row gap-4 hover:border-primary/50 transition-colors">
                      <div className="md:w-1/4">
                        <div className="relative h-32 md:h-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <div className="text-3xl font-bold text-white/20">{event.title.charAt(0)}</div>
                        </div>
                      </div>
                      <div className="md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">{event.status}</span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">{event.category}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                          <p className="text-text-secondary text-sm line-clamp-2 mb-2">{event.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.event_date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.registration_count}</span>
                          </div>
                          <a href={`/events/${event.id}`} className="text-primary hover:text-primary/80 font-medium text-sm">View Details →</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "border border-border hover:bg-bg-secondary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
