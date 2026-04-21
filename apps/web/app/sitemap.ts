import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lucastostee.me',
      lastModified: new Date(),
    },
  ]
}
