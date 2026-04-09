import Link from "next/link"
import { Code2, MessageCircle, Briefcase, Mail, Heart, Code, Trophy, Users } from "lucide-react"
import { SITE_NAME, SITE_DESCRIPTION, NAV_LINKS } from "@/lib/constants"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">{SITE_NAME}</h3>
                <p className="text-sm text-text-secondary">{SITE_DESCRIPTION}</p>
              </div>
            </Link>
            <p className="text-text-secondary text-sm">
              A centralized hub for college technical clubs to manage events, challenges, projects, and team collaboration.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                aria-label="GitHub"
              >
                <Code2 className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                aria-label="Twitter"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                aria-label="LinkedIn"
              >
                <Briefcase className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@clubnexus.com"
                className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-2"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-text-secondary hover:text-text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-text-secondary hover:text-text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors">
                  Blog & Updates
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Stay Updated</h4>
            <p className="text-text-secondary text-sm">
              Subscribe to our newsletter for the latest events, challenges, and club announcements.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-accent-gradient text-white font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
            <div className="pt-4 border-t border-border">
              <p className="text-text-secondary text-sm flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Built with passion for the developer community.
              </p>
              <p className="text-text-secondary text-sm flex items-center mt-2">
                <Code className="w-4 h-4 mr-2" />
                Part of WebWeave26 Hackathon
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-text-secondary hover:text-text-primary text-sm">
              Sitemap
            </Link>
            <Link href="/accessibility" className="text-text-secondary hover:text-text-primary text-sm">
              Accessibility
            </Link>
            <Link href="/contact" className="text-text-secondary hover:text-text-primary text-sm">
              Contact Us
            </Link>
            <span className="text-text-secondary text-sm flex items-center">
              <Users className="w-4 h-4 mr-1" />
              For technical clubs worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}