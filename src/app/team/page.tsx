import TeamSection from "@/components/team/TeamSection"

export default function TeamPage() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Meet Our <span className="gradient-text">Team</span>
        </h1>
        <p className="text-xl text-text-secondary">
          The passionate individuals who drive innovation, mentorship, and community growth across
          all technical domains.
        </p>
      </div>

      <TeamSection />
    </div>
  )
}