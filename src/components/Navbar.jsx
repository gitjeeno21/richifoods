import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

/* ── Nav links — update paths to match your router ── */
const navLinks = [
  { name: 'Home',        path: '/'           },
  { name: 'About',       path: '/about'      },
  { name: 'Products',    path: '/products'   },
  { name: 'CSR',         path: '/csr'        },
  { name: 'Insights',    path: '/insights'   },
  { name: 'Dealership',  path: '/dealership' },
]

/* ─── Refined burnt-sienna palette (matches Home & About) ─── */
const C = {
  primary:      '#F97316',   // burnt sienna
  primaryHover: '#A8430F',   // deep rust
  primaryDark:  '#2D1608',   // mahogany
  primaryLight: '#FFF8EE',   // warm ivory
  border:       '#FFD9A8',   // dusty peach
  text:         '#7A4A2A',   // warm rust
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [atTop,       setAtTop]       = useState(true)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setAtTop(window.scrollY < 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* ══ DESKTOP NAVBAR ══ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(194,84,26,0.10)] py-3 border-b border-[#FFD9A8]'
            : 'bg-white/10 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* ── LOGO ── 
              Replace the text logo below with your actual Richi logo image:
              <img src="/images/logo.png" alt="Richi" className="h-10 w-auto" />
          */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {/* Logo image slot — shows text fallback if no image */}
            <div className="relative h-10 w-auto">
              <img
                src="/images/logo.png"        // 🔁 replace with your logo path
                alt="Richi Food Products"
                className="h-10 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* Text fallback */}
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
                className={`relative px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 group ${
                  isActive(link.path)
                    ? scrolled
                      ? 'text-[#F97316] bg-[#FFF8EE]'
                      : 'text-[#F97316] bg-white/10'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#F97316] hover:bg-[#FFF8EE]'
                      : 'text-[#7A4A2A] hover:text-[#F97316] hover:bg-white/10'
                }`}
              >
                {link.name}

                {/* Active underline dot */}
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

          {/* ── CTA BUTTON ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide overflow-hidden group transition-all duration-300 ${
                scrolled
                  ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20 hover:bg-[#EA6C0A] hover:shadow-[#F97316]/25 hover:-translate-y-0.5'
                  : 'bg-white text-[#F97316] hover:bg-[#FFF8EE] hover:-translate-y-0.5 shadow-lg shadow-black/10'
              }`}
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative">Contact Us</span>
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
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
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

        </div>
      </motion.nav>

      {/* ══ MOBILE FULL-SCREEN MENU ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Slide-in panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm flex flex-col"
              style={{ background: `linear-gradient(160deg, #1A0C04 0%, #2D1608 60%, #4A2800 100%)` }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/10">
                {/* Logo in mobile panel */}
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"     // 🔁 replace with your logo path
                    alt="Richi Food Products"
                    className="h-8 w-auto object-contain brightness-0 invert"
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
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all duration-200 group ${
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

              {/* Panel footer — CTA + contact info */}
              <div className="px-8 pb-10 pt-6 border-t border-white/10 space-y-4">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full py-4 bg-white text-[#F97316] font-black text-base rounded-2xl
                    hover:bg-[#FFF8EE] transition-colors duration-200 shadow-xl shadow-black/20"
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