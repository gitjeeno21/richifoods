import { memo } from 'react'
import { motion } from 'framer-motion'
import SEO from './SEO'

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const reduced  = prefersReducedMotion()

// Opacity-only on mobile — zero layout recalc per frame
const pageVariants = reduced
  ? { initial: {}, enter: {}, exit: {} }
  : isMobile
  ? { initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } }
  : { initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }

const transitionConfig = isMobile
  ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  : { duration: 0.5,  ease: [0.22, 1, 0.36, 1] }

/**
 * PageWrapper — wraps every page with SEO head + animated entry.
 *
 * @param {string}        title        - Page title (without site suffix)
 * @param {string}        description  - Meta description
 * @param {string}        [url]        - Canonical path e.g. "/products"
 * @param {string}        [keywords]   - Comma-separated keywords
 * @param {string}        [image]      - Absolute OG image URL
 * @param {string}        [type]       - OG type: "website" | "article"
 * @param {object|array}  [schema]     - JSON-LD schema(s)
 * @param {string}        [robots]     - Robots meta override
 * @param {string}        [publishedAt]- ISO date for article pages
 */
const PageWrapper = memo(function PageWrapper({
  children,
  title,
  description,
  url,
  keywords,
  image,
  type,
  schema,
  robots,
  publishedAt,
}) {
  return (
    <>
      <SEO
        title={title}
        description={description}
        url={url}
        keywords={keywords}
        image={image}
        type={type}
        schema={schema}
        robots={robots}
        publishedAt={publishedAt}
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={transitionConfig}
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>
    </>
  )
})

export default PageWrapper