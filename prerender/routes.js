import { blogPosts } from '../src/data/blogData.js'

export const staticRoutes = [
  '/about',
  '/products',
  '/contact',
  '/blog',
  '/csr',
  '/investors',
  '/insights',
  '/dealership',
]

export const locationSlugs = [
  'krishnagiri',
  'hosur',
  'dharmapuri',
  'chennai',
  'salem',
  'coimbatore',
  'tamil-nadu',
]

export const localSeoRoutes = [
  '/best-juice-krishnagiri',
  '/fresh-juice-hosur',
  '/healthy-juice-tamil-nadu',
  '/premium-juice-dharmapuri',
  '/summer-drinks-krishnagiri',
  '/juice-distributor-krishnagiri',
]

export const blogRoutes = blogPosts.map(({ slug }) => `/blog/${slug}`)
export const locationRoutes = locationSlugs.map((slug) => `/location/${slug}`)

export const prerenderRoutes = [
  '/',
  ...staticRoutes,
  ...blogRoutes,
  ...locationRoutes,
  ...localSeoRoutes,
]

// vite-plugin-sitemap already includes the site root, so we omit `/` here.
export const sitemapRoutes = [
  ...staticRoutes,
  ...blogRoutes,
  ...locationRoutes,
  ...localSeoRoutes,
]
