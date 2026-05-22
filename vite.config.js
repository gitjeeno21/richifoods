import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

import { sitemapRoutes } from './prerender/routes.js'

export default defineConfig(({ isSsrBuild }) => {
  const plugins = [react(), tailwindcss()]

  if (!isSsrBuild) {
    plugins.push(
      sitemap({
        hostname: 'https://richifoodproducts.com',
        changefreq: 'weekly',
        priority: 0.7,
        robots: [],
        lastmod: new Date().toISOString(),
        dynamicRoutes: sitemapRoutes,
      }),
    )
  }

  return {
    plugins,
    build: {
      rollupOptions: {
        output: isSsrBuild
          ? {
              entryFileNames: 'entry-server.js',
            }
          : {
              manualChunks: {
                'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                'animation-vendor': ['framer-motion'],
                'icons-vendor': ['lucide-react'],
                'seo-vendor': ['react-helmet-async'],
              },
            },
      },
      minify: isSsrBuild ? false : 'terser',
      terserOptions: isSsrBuild
        ? undefined
        : {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
          },
      chunkSizeWarningLimit: isSsrBuild ? undefined : 1000,
      cssCodeSplit: !isSsrBuild,
      sourcemap: false,
      reportCompressedSize: false,
      target: 'esnext',
    },
    assetsInclude: ['**/*.woff', '**/*.woff2'],
  }
})
