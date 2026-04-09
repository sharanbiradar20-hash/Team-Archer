import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clubnexus.app'
  
  const routes = [
    '',
    '/team',
    '/events',
    '/challenges',
    '/projects',
    '/gallery',
    '/leaderboard',
    '/dashboard',
    '/admin',
  ]

  // Generate dynamic routes for detail pages (example IDs)
  const eventIds = ['1', '2', '3', '4', '5']
  const challengeIds = ['1', '2', '3', '4', '5']
  const projectIds = ['1', '2', '3', '4', '5']
  const albumIds = ['1', '2', '3', '4', '5']

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/challenges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  // Add event detail pages
  eventIds.forEach(id => {
    sitemapEntries.push({
      url: `${baseUrl}/events/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Add challenge detail pages
  challengeIds.forEach(id => {
    sitemapEntries.push({
      url: `${baseUrl}/challenges/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Add project detail pages
  projectIds.forEach(id => {
    sitemapEntries.push({
      url: `${baseUrl}/projects/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Add album detail pages
  albumIds.forEach(id => {
    sitemapEntries.push({
      url: `${baseUrl}/gallery/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return sitemapEntries
}