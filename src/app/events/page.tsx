import { Calendar, Filter, Search, Users, MapPin, Clock } from "lucide-react"
import { EVENT_CATEGORIES } from "@/lib/constants"
import EventCard from "@/components/events/EventCard"
import { Event } from "@/types"

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
    status: "unpublished",
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

export default function EventsPage() {
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Filter size={20} />
                Filters
              </button>
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
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Category</h4>
                      <div className="space-y-2">
                        {EVENT_CATEGORIES.map((category) => (
                          <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-border" />
                            <span>{category.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Status</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" defaultChecked />
                          <span>Upcoming</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" />
                          <span>Ongoing</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" />
                          <span>Completed</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" />
                          <span>Closed</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Date Range</h4>
                      <div className="space-y-2">
                        <input
                          type="date"
                          className="w-full px-3 py-2 rounded border border-border bg-bg-primary"
                          placeholder="From"
                        />
                        <input
                          type="date"
                          className="w-full px-3 py-2 rounded border border-border bg-bg-primary"
                          placeholder="To"
                        />
                      </div>
                    </div>

                    <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Filters
                    </button>
                    <button className="w-full py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
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
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Upcoming</span>
                      <span className="font-semibold text-green-500">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Registered</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Avg. Participants</span>
                      <span className="font-semibold">65</span>
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
                  <p className="text-text-secondary">Showing {mockEvents.length} events</p>
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-2 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Sort by: Date (Newest)</option>
                    <option>Sort by: Date (Oldest)</option>
                    <option>Sort by: Participants</option>
                    <option>Sort by: Name</option>
                  </select>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Grid View
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border bg-bg-secondary">
                    List View
                  </button>
                </div>
              </div>

              {mockEvents.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 mx-auto text-text-tertiary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-text-secondary">Try adjusting your filters or check back later for new events.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {mockEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary text-white">1</button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    3
                  </button>
                  <span className="px-2">...</span>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    8
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}