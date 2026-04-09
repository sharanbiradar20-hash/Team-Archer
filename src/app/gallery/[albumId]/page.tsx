"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Share2, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar, User, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

// Mock data
const mockAlbum = {
  id: "1",
  title: "Hackathon 2024 Finals",
  event_name: "Annual Hackathon",
  event_date: "2024-03-15",
  cover_image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
  created_by: "admin1",
  created_at: "2024-03-16T10:00:00Z",
  description: "The annual hackathon brought together 150+ participants from across the college to build innovative solutions over 48 hours. This album captures the energy, creativity, and collaboration that defined the event."
}

const mockImages = [
  {
    id: "1",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
    caption: "Opening ceremony with keynote speaker",
    uploaded_by: "admin1",
    uploaded_at: "2024-03-16T10:30:00Z",
    likes: 42,
    views: 128
  },
  {
    id: "2",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    caption: "Participants brainstorming ideas",
    uploaded_by: "admin2",
    uploaded_at: "2024-03-16T11:45:00Z",
    likes: 38,
    views: 115
  },
  {
    id: "3",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    caption: "Coding session in full swing",
    uploaded_by: "admin1",
    uploaded_at: "2024-03-16T14:20:00Z",
    likes: 56,
    views: 142
  },
  {
    id: "4",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    caption: "Mentors guiding teams",
    uploaded_by: "admin3",
    uploaded_at: "2024-03-16T16:10:00Z",
    likes: 29,
    views: 98
  },
  {
    id: "5",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
    caption: "Final presentations to judges",
    uploaded_by: "admin2",
    uploaded_at: "2024-03-16T18:30:00Z",
    likes: 67,
    views: 156
  },
  {
    id: "6",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop",
    caption: "Winning team celebration",
    uploaded_by: "admin1",
    uploaded_at: "2024-03-16T20:15:00Z",
    likes: 84,
    views: 189
  },
  {
    id: "7",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    caption: "Networking session after the event",
    uploaded_by: "admin3",
    uploaded_at: "2024-03-16T21:00:00Z",
    likes: 31,
    views: 104
  },
  {
    id: "8",
    album_id: "1",
    image_url: "https://images.unsplash.com/photo-1556761175-4d6c8eafc4d3?w=800&auto=format&fit=crop",
    caption: "Group photo of all participants",
    uploaded_by: "admin1",
    uploaded_at: "2024-03-16T21:30:00Z",
    likes: 92,
    views: 203
  }
]

interface AlbumPageProps {
  params: Promise<{ albumId: string }>
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedImage(null)
  }

  const goToPrev = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < mockImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  // Handle body overflow when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLightboxOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>

      {/* Album Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Cover Image */}
            <div className="lg:w-2/5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-border">
                <img
                  src={mockAlbum.cover_image_url}
                  alt={mockAlbum.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                    Cover Photo
                  </div>
                </div>
              </div>
            </div>

            {/* Album Info */}
            <div className="lg:w-3/5">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    <ImageIcon className="w-4 h-4" />
                    <span>Event Album</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>Public</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">{mockAlbum.title}</h1>
                <p className="text-xl text-text-secondary mb-8">{mockAlbum.description}</p>

                {/* Album Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <ImageIcon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Photos</p>
                        <p className="font-semibold">{mockImages.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Event Date</p>
                        <p className="font-semibold">{new Date(mockAlbum.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <User className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Uploaded By</p>
                        <p className="font-semibold">Club Admin</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Eye className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Total Views</p>
                        <p className="font-semibold">{mockImages.reduce((sum, img) => sum + img.views, 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      toast.success("Downloading all photos... This may take a moment.")
                      // In production, this would trigger a zip download
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download All
                  </button>
                  <button
                    onClick={async () => {
                      const url = window.location.href
                      try {
                        if (navigator.share) {
                          await navigator.share({ title: mockAlbum.title, url })
                        } else {
                          await navigator.clipboard.writeText(url)
                          toast.success("Album link copied to clipboard!")
                        }
                      } catch {
                        await navigator.clipboard.writeText(url)
                        toast.success("Album link copied to clipboard!")
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors font-medium"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Album
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Photos ({mockImages.length})</h2>
            <div className="flex items-center gap-4">
              <select className="bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm">
                <option>Sort by: Most Recent</option>
                <option>Most Liked</option>
                <option>Most Viewed</option>
              </select>
              <button className="px-5 py-2.5 rounded-xl bg-bg-secondary border border-border text-text-primary font-medium hover:bg-bg-tertiary transition-colors">
                Upload Photos
              </button>
            </div>
          </div>

          {/* Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {mockImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary hover:border-secondary transition-colors cursor-pointer">
                  <div 
                    className="relative overflow-hidden"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.image_url}
                      alt={image.caption}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Image Stats */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">{image.likes}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">{image.views}</span>
                          </div>
                        </div>
                        <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
                          <Download className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-4">
                    <p className="font-medium mb-2">{image.caption}</p>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span>{new Date(image.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>By Admin</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {selectedImage > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {selectedImage < mockImages.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image Display */}
            <div className="relative max-w-4xl max-h-[80vh] mx-4">
              <motion.img
                key={selectedImage}
                src={mockImages[selectedImage].image_url}
                alt={mockImages[selectedImage].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Image Info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{mockImages[selectedImage].caption}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>{mockImages[selectedImage].likes} likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{mockImages[selectedImage].views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(mockImages[selectedImage].uploaded_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
