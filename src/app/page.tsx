import HeroBanner from "@/components/home/HeroBanner"
import QuickStats from "@/components/home/QuickStats"
import UpcomingEventsStrip from "@/components/home/UpcomingEventsStrip"
import FeaturedChallenges from "@/components/home/FeaturedChallenges"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import TopLeaderboard from "@/components/home/TopLeaderboard"
import AnnouncementTicker from "@/components/home/AnnouncementTicker"

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Quick Stats */}
      <QuickStats />

      {/* 3. Upcoming Events Strip */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
          <a
            href="/events"
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            View all →
          </a>
        </div>
        <UpcomingEventsStrip />
      </section>

      {/* 4. Featured Challenges */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Challenges</h2>
          <a
            href="/challenges"
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            View all →
          </a>
        </div>
        <FeaturedChallenges />
      </section>

      {/* 5. Featured Projects Carousel */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <a
            href="/projects"
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            View all →
          </a>
        </div>
        <FeaturedProjects />
      </section>

      {/* 6. Top 5 Leaderboard Preview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Top Contributors</h2>
          <a
            href="/leaderboard"
            className="text-accent-primary hover:text-accent-secondary transition-colors font-medium"
          >
            View full leaderboard →
          </a>
        </div>
        <TopLeaderboard />
      </section>

      {/* 7. Announcement Ticker */}
      <AnnouncementTicker />
    </div>
  )
}
