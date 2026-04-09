"use client"

import { useState } from "react"
import { GalleryAlbum } from "@/types"
import { Image, Folder, Calendar, User, X, Upload } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data
const mockAlbums: GalleryAlbum[] = [
  {
    id: "1",
    title: "Hackathon 2024 Finals",
    event_name: "Annual Hackathon",
    event_date: "2024-03-15",
    cover_image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
    created_by: "admin1",
    created_at: "2024-03-16T10:00:00Z"
  },
  {
    id: "2",
    title: "AI Workshop Series",
    event_name: "AI/ML Workshop",
    event_date: "2024-02-28",
    cover_image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    created_by: "admin2",
    created_at: "2024-02-29T14:30:00Z"
  },
  {
    id: "3",
    title: "Club Induction 2024",
    event_name: "New Member Induction",
    event_date: "2024-01-20",
    cover_image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    created_by: "admin1",
    created_at: "2024-01-21T09:15:00Z"
  },
  {
    id: "4",
    title: "Web Development Bootcamp",
    event_name: "Web Dev Workshop",
    event_date: "2023-12-10",
    cover_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    created_by: "admin3",
    created_at: "2023-12-11T16:45:00Z"
  },
  {
    id: "5",
    title: "Robotics Competition",
    event_name: "Robotics Challenge",
    event_date: "2023-11-05",
    cover_image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
    created_by: "admin2",
    created_at: "2023-11-06T11:20:00Z"
  },
  {
    id: "6",
    title: "Alumni Meet 2023",
    event_name: "Alumni Gathering",
    event_date: "2023-10-22",
    cover_image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop",
    created_by: "admin1",
    created_at: "2023-10-23T18:00:00Z"
  }
]

export default function GalleryPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [albumTitle, setAlbumTitle] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Album "${albumTitle}" created successfully!`)
    setShowCreateModal(false)
    setAlbumTitle("")
    setEventName("")
    setEventDate("")
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Create Album Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-border rounded-2xl p-8 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create New Album</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-bg-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Album Title</label>
                <input
                  type="text"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="e.g., Hackathon 2024 Finals"
                  className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Annual Hackathon"
                  className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-text-secondary" />
                <p className="text-sm text-text-secondary">Drag & drop cover image or click to browse</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl border border-border hover:bg-bg-primary transition-colors font-medium">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-secondary text-white hover:bg-secondary/90 transition-colors font-medium">
                  Create Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-bg-primary" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
              <Image className="w-5 h-5" />
              <span className="font-medium">Media Gallery</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Club Memories & <span className="text-secondary">Events</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Explore photos and videos from our technical events, workshops, hackathons, and community gatherings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                <span className="font-medium">6 Albums</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                <span className="font-medium">142+ Photos</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-bg-secondary border border-border">
                <span className="font-medium">2023-2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Event Albums</h2>
            <p className="text-text-secondary">Browse memories from past club activities</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm">
              <option>Sort by: Newest First</option>
              <option>Oldest First</option>
              <option>Most Photos</option>
            </select>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 py-2.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
            >              <span className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Create Album
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAlbums.map((album) => (
            <Link
              key={album.id}
              href={`/gallery/${album.id}`}
              className="group block"
            >
              <div className="bg-bg-secondary rounded-2xl border border-border overflow-hidden hover:border-secondary transition-colors">
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={album.cover_image_url || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop"}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                      24 photos
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">
                      {album.title}
                    </h3>
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Image className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-4 line-clamp-2">
                    Photos from {album.event_name || "club event"} held on {album.event_date ? new Date(album.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "various dates"}.
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>{album.event_date ? new Date(album.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <User className="w-4 h-4" />
                        <span>By Admin</span>
                      </div>
                    </div>
                    <div className="text-secondary font-medium">
                      View Album →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (for future) */}
        {mockAlbums.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-bg-secondary border border-border flex items-center justify-center">
              <Image className="w-12 h-12 text-text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No albums yet</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Create the first album to start sharing photos from club events and activities.
            </p>
            <button className="px-6 py-3 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors">
              Create First Album
            </button>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl border border-border p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">6</div>
              <div className="text-text-secondary">Event Albums</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">142</div>
              <div className="text-text-secondary">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">12</div>
              <div className="text-text-secondary">Events Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-500 mb-2">2023</div>
              <div className="text-text-secondary">Since Year</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}