
export default function sitemap() {
  const baseUrl = 'https://digitalstag.in'
  
  const services = [
    '/digital-marketing',
    '/seo',
    '/web-development',
    '/ai-automation',
    '/lead-generation',
  ]

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/service`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  const servicePages = services.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticPages, ...servicePages]
}