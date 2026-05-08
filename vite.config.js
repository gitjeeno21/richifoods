import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

// Blog slugs — kept in sync with blogData.js so sitemap stays accurate
const blogSlugs = [
  'taste-the-tropics-mango-juice',
  'crisp-and-refreshing-apple-juice',
  'the-bold-flavor-of-grapes',
  'citrus-burst-orange-juice',
  'zesty-white-lemon',
  'green-lemon-carbonated-refreshment',
  'paneer-soda-nostalgia-in-a-bottle',
  'the-classic-cola-experience',
  'jeera-masala-the-digestive-refresher',
  'salt-lemon-the-ultimate-hydrator',
  'mango-2-double-the-mango-magic',
  'tropical-escape-pineapple-juice',
]

const productSlugs = [
  'mango', 'apple', 'orange', 'grape', 'pineapple',
  'cola', 'paneer-soda', 'jeera-masala', 'salt-lemon',
  'green-lemon', 'white-lemon', 'mango-2',
]

const locationSlugs = [
  'krishnagiri', 'bangalore', 'chennai', 'salem', 'coimbatore',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://richifoodproducts.com',
      changefreq: 'weekly',
      priority: 0.7,
      robots: false,
      lastmod: new Date().toISOString(),
      dynamicRoutes: [
        // Core pages
        { url: '/',           changefreq: 'daily',   priority: 1.0  },
        { url: '/about',      changefreq: 'monthly', priority: 0.8  },
        { url: '/products',   changefreq: 'weekly',  priority: 0.9  },
        { url: '/contact',    changefreq: 'monthly', priority: 0.7  },
        { url: '/blog',       changefreq: 'daily',   priority: 0.8  },
        { url: '/gallery',    changefreq: 'weekly',  priority: 0.7  },
        { url: '/csr',        changefreq: 'monthly', priority: 0.6  },
        { url: '/investors',  changefreq: 'monthly', priority: 0.5  },
        { url: '/insights',   changefreq: 'weekly',  priority: 0.6  },
        { url: '/dealership', changefreq: 'monthly', priority: 0.7  },
        // Blog posts
        ...blogSlugs.map(slug => ({
          url: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
        })),
        // Product pages
        ...productSlugs.map(slug => ({
          url: `/product/${slug}`,
          changefreq: 'weekly',
          priority: 0.8,
        })),
        // Location pages
        ...locationSlugs.map(city => ({
          url: `/location/${city}`,
          changefreq: 'monthly',
          priority: 0.6,
        })),
      ],
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':     ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor':     ['lucide-react'],
          'seo-vendor':       ['react-helmet-async'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    target: 'esnext',
  },

  assetsInclude: ['**/*.woff', '**/*.woff2'],
})
