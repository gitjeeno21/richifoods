import { useState, useEffect, memo, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

/* ── Nav links ── */
const navLinks = [
  { name: 'Home',       path: '/'           },
  { name: 'About',      path: '/about'      },
  { name: 'Products',   path: '/products'   },
  { name: 'Insights',   path: '/insights'   },
  { name: 'Dealership', path: '/dealership' },
]

/* ── Device detection — computed once ── */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

/* ── Animation presets ──────────────────────────────────────────────────────
   Desktop: original cubic-bezier entrance.
   Mobile:  opacity-only — no translateY/X means zero layout recalculation.
            The navbar is fixed and above the fold, so even a tiny y-animation
            causes a repaint of the entire viewport on first load.
─────────────────────────────────────────────────────────────────────────── */
const navEntrance = isMobile
  ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
  : { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }

// Mobile panel slide: x-transform only (no scale, no blur on the panel itself)
const panelVariants = {
  hidden: { x: '100%' },
  show:   { x: 0      },
}
const panelTransition = isMobile
  ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }   // slightly faster on mobile
  : { duration: 0.4,  ease: [0.22, 1, 0.36, 1] }

// Mobile link stagger: opacity-only, no x-slide
// x: 30 on 5 links = 5 simultaneous x-transforms → layout recalc on each frame
const linkVariants = {
  hidden: { opacity: 0, x: isMobile ? 0 : 30 },
  show:   { opacity: 1, x: 0                  },
}

function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  /* ── Scroll listener — RAF-throttled, threshold-gated ──────────────────
     Unchanged from original: only triggers setState when crossing 50px.
     Added `passive: true` is already in original; kept here.
     One small addition: cancel RAF on cleanup to prevent memory leak if the
     component unmounts mid-frame (e.g. during fast navigation).
  ─────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    let rafId = null
    let lastScrollY = window.scrollY

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        if ((lastScrollY <= 50) !== (y <= 50)) setScrolled(y > 50)
        lastScrollY = y
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Close on route change
  useEffect(() => setMobileOpen(false), [location])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive  = useCallback((path) => location.pathname === path, [location.pathname])
  const closeMenu = useCallback(() => setMobileOpen(false), [])
  const toggleMenu = useCallback(() => setMobileOpen((v) => !v), [])

  return (
    <>
      {/* ══ NAVBAR BAR ══════════════════════════════════════════════════════ */}
      <motion.nav
        {...navEntrance}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          /*
            Mobile: removed backdrop-blur from the transparent state.
            backdrop-blur on a fixed element that covers the full viewport
            forces a GPU compositing layer for the ENTIRE page underneath it
            on every scroll frame — one of the most expensive things you can
            do on a mobile browser.
            Scrolled state keeps backdrop-blur-xl (element is now opaque,
            so the blur area is tiny/negligible).
          */
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(194,84,26,0.10)] py-3 border-b border-[#FFD9A8]'
            : isMobile
              ? 'bg-white/95 py-4'                        // opaque on mobile — no blur cost
              : 'bg-white/10 backdrop-blur-md py-5'       // original on desktop
        }`}
        /*
          will-change: transform keeps the navbar on its own compositor layer.
          Without this, every scroll event that changes the className can
          trigger a repaint of elements behind the navbar.
        */
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-10 w-auto">
              <img
                src="/images/logo.png"
                alt="Richi Food Products"
                className="h-10 w-auto object-contain"
                /*
                  width + height prevent layout shift (CLS) while the image loads.
                  decoding="async" moves image decode off the main thread.
                */
                width={80}
                height={40}
                decoding="async"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span
                className={`font-black text-2xl tracking-tight leading-none transition-colors duration-300 ${
                  scrolled ? 'text-[#F97316]' : 'text-[#2D1608]'
                }`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Richi
              </span>
            </div>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  /*
                    transition-colors only (not transition-all).
                    Desktop nav links previously used transition-all which
                    recalculates every CSS property on hover — background,
                    color, border, shadow, transform, etc.
                  */
                  isActive(link.path)
                    ? scrolled ? 'text-[#F97316] bg-[#FFF8EE]' : 'text-[#F97316] bg-white/10'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#F97316] hover:bg-[#FFF8EE]'
                      : 'text-[#7A4A2A] hover:text-[#F97316] hover:bg-white/10'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      scrolled ? 'bg-[#F97316]' : 'bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide overflow-hidden group transition-colors duration-200 ${
                scrolled
                  ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20 hover:bg-[#EA6C0A]'
                  : 'bg-white text-[#F97316] hover:bg-[#FFF8EE] shadow-lg shadow-black/10'
              }`}
            >
              {/* Shine sweep — transform-only, compositor-safe */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative">Contact Us</span>
            </Link>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            onClick={toggleMenu}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`md:hidden p-2 rounded-xl transition-colors duration-200 ${
              scrolled
                ? 'text-[#F97316] hover:bg-[#FFF8EE]'
                : 'text-[#2D1608] hover:bg-white/10'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,    opacity: 0 }}
                  transition={{ duration: 0.15 }}        // tighter than original 0.2
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: -90,   opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

        </div>
      </motion.nav>

      {/* ══ MOBILE MENU ═════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop
                backdrop-blur-sm removed — same reasoning as navbar:
                it composites the entire page on every frame.
                A semi-opaque black overlay achieves the same visual effect
                with a single cheap paint operation.
            */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/50"
            />

            {/* Slide panel
                - will-change: transform pins it to compositor before animation
                - No blur on the panel itself
                - contain: layout style → scopes layout recalc to panel only
            */}
            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={panelTransition}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #1A0C04 0%, #2D1608 60%, #4A2800 100%)',
                willChange: 'transform',
                contain: 'layout style',
              }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/10">
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Richi Food Products"
                    className="h-8 w-auto object-contain brightness-0 invert"
                    width={64}
                    height={32}
                    decoding="async"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <span
                    className="font-black text-xl text-white tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Richi
                  </span>
                </Link>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links
                  Stagger kept (only 5 items) but duration tightened.
                  x-slide removed on mobile → opacity-only per linkVariants.
              */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    variants={linkVariants}
                    initial="hidden"
                    animate="show"
                    transition={{
                      delay: 0.04 + i * 0.05,
                      duration: isMobile ? 0.18 : 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold tracking-wide transition-colors duration-150 ${
                        isActive(link.path)
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="mobile-active"
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer CTA */}
              <div className="px-8 pb-10 pt-6 border-t border-white/10 space-y-4">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center w-full py-4 bg-white text-[#F97316] font-black text-base rounded-2xl hover:bg-[#FFF8EE] transition-colors duration-150 shadow-xl shadow-black/20"
                >
                  Contact Us
                </Link>
                <div className="text-center text-white/40 text-xs font-semibold tracking-widest uppercase">
                  Daily Fresh Fruits India
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Navbar)