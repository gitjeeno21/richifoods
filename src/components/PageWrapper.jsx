import { memo } from 'react'
import { motion } from 'framer-motion'

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// One-time read — transition style only needs to be decided once on mount
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const reduced  = prefersReducedMotion()

// FIX: on mobile, use opacity-only transitions.
// The y: ±20 translate on enter/exit shifts the entire page content during
// the transition frame, forcing a full layout recalc on every tick.
// Opacity is compositor-only — zero layout work, identical perceived smoothness.
// On desktop, keep the original subtle y-slide which looks polished on faster hardware.
const pageVariants = reduced
  ? {
      initial: {},
      enter:   {},
      exit:    {},
    }
  : isMobile
  ? {
      initial: { opacity: 0 },
      enter:   { opacity: 1 },
      exit:    { opacity: 0 },
    }
  : {
      initial: { opacity: 0, y: 20  },
      enter:   { opacity: 1, y: 0   },
      exit:    { opacity: 0, y: -20 },
    }

// FIX: shorter duration on mobile (0.28s vs 0.5s).
// Page transitions feel snappy on native mobile apps because they're fast —
// a 500ms fade on every navigation makes the site feel sluggish.
// Desktop keeps 0.5s which feels considered on a large screen.
const transitionConfig = isMobile
  ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  : { duration: 0.5,  ease: [0.22, 1, 0.36, 1] }

const PageWrapper = memo(function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={transitionConfig}
      // FIX: hint to the browser that this element will animate opacity,
      // so it can be promoted to a GPU compositor layer before the animation starts.
      // Without this, the first frame of a page transition can stutter while
      // the browser decides whether to promote the layer mid-animation.
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  )
})

export default PageWrapper