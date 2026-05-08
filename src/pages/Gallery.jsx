// pages/Gallery.jsx
import React, { useState, memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { PAGE_SEO, buildBreadcrumbSchema } from '../seo/seoConfig'

/* ══════════════════════════════════════════════════════════
   DEVICE DETECTION — computed once at module level
══════════════════════════════════════════════════════════ */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const isLowEnd = (() => {
  if (typeof navigator === 'undefined') return false
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true
  return isMobile && window.innerWidth < 480
})()

/* ══════════════════════════════════════════════════════════
   ORB — hidden on mobile/low-end (blur-3xl is GPU-expensive)
══════════════════════════════════════════════════════════ */
const Orb = memo(({ className, delay = 0 }) => {
  if (isLowEnd || isMobile) return null
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ willChange: 'transform, opacity' }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
})
Orb.displayName = 'Orb'

/* ══════════════════════════════════════════════════════════
   SHARED MOTION PRESETS
   Mobile: opacity-only (no translateY) → compositor-only,
           zero layout recalculation.
   Desktop: original slide-up.
══════════════════════════════════════════════════════════ */
const mobileT   = { duration: 0.2, ease: 'easeOut' }
const desktopT  = { duration: 0.7 }

const fadeUp = isMobile
  ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: mobileT }
  : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: desktopT }

const fadeUpView = isMobile
  ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: mobileT }
  : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

/* ══════════════════════════════════════════════════════════
   STATIC DATA — defined outside component to prevent
   re-creation on every render
══════════════════════════════════════════════════════════ */
const categories = ['all', 'products', 'facilities']

const galleryItems = [
  { id: 1,  category: 'products',   title: 'Carbonated Lineup',   img: '/images/products/flavours_1.png', color: 'from-orange-400 to-red-400'    },
  { id: 2,  category: 'products',   title: 'Juice Lineup',        img: '/images/products/flavours_2.png', color: 'from-purple-400 to-pink-400'   },
  { id: 3,  category: 'facilities', title: 'Facility Overview',   img: '/images/products/overview.png', color: 'from-blue-400 to-cyan-400'     },
  { id: 4,  category: 'facilities', title: 'Storage Area',        img: '/images/products/storage_area.png', color: 'from-green-400 to-emerald-400' },
  { id: 5,  category: 'facilities', title: 'Preparation',         img: '/images/products/preparation.png', color: 'from-yellow-400 to-orange-400' },
  { id: 6,  category: 'facilities', title: 'Filling Process',     img: '/images/products/filling.png', color: 'from-pink-400 to-rose-400'     },
  { id: 7,  category: 'facilities', title: 'Labelling Process',   img: '/images/products/labelling.png', color: 'from-indigo-400 to-purple-400' },
  { id: 8,  category: 'facilities', title: 'Quality Checking',    img: '/images/products/checking.png', color: 'from-teal-400 to-cyan-400'     },
  { id: 9,  category: 'facilities', title: 'Packing Area',        img: '/images/products/packing.png', color: 'from-orange-400 to-yellow-400' },
  { id: 10, category: 'facilities', title: 'Dispatch Area',       img: '/images/products/dispatch.png', color: 'from-gray-400 to-blue-400'     },
]

const stats = [
  { stat: '8+',   label: 'Premium Flavors'    },
  { stat: '14+',  label: 'Years of Excellence' },
  { stat: '100K+',label: 'Happy Customers'     },
  { stat: '25+',  label: 'States Covered'      },
]

/* ══════════════════════════════════════════════════════════
   GALLERY CARD — memoised to prevent re-render on lightbox
   state changes
══════════════════════════════════════════════════════════ */
const GalleryCard = memo(({ item, idx, onSelect }) => {
  /*
    Mobile hover optimizations:
    - whileHover removed on mobile (touch devices fire it unreliably
      and it forces GPU compositing of every card simultaneously)
    - transition-shadow only (not transition-all) cuts style-recalc cost
    - group-hover:scale-125 on the emoji kept — it's transform-only and
      cheap even on mobile
  */
  const hoverProps = isMobile
    ? {}
    : { whileHover: { y: -12, scale: 1.02 } }

  return (
    <motion.div
      key={item.id}
      className="group cursor-pointer"
      onClick={() => onSelect(item)}
      initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      /*
        Mobile: stagger removed — animating 12 cards simultaneously with
        stagger holds 12 keyframe sets in memory and causes jank on
        low-RAM devices. All cards fade in together instead.
      */
      transition={isMobile ? mobileT : { delay: idx * 0.08 }}
      {...hoverProps}
    >
      <div
        className={`bg-gradient-to-br ${item.color} rounded-2xl h-48 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden relative border-2 border-transparent hover:border-[#F97316] hover:shadow-2xl transition-shadow duration-200`}
        /*
          h-48 on mobile (192px) vs h-64 desktop (256px):
          smaller card → less paint area → faster composite on scroll.
          transition-shadow replaces transition-all to avoid full
          style-recalc on each hover frame.
        */
      >
        <div className="w-full h-full p-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          {item.img ? (
            <img src={item.img} alt={item.title} className="w-full h-full object-contain drop-shadow-xl" loading="lazy" />
          ) : (
            <div className="text-5xl md:text-6xl">{item.image}</div>
          )}
        </div>
        {/* Overlay — opacity transition is compositor-only, very cheap */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-semibold text-center px-4">{item.title}</span>
        </div>
      </div>
    </motion.div>
  )
})
GalleryCard.displayName = 'GalleryCard'

/* ══════════════════════════════════════════════════════════
   LIGHTBOX — extracted into its own memoised component so
   re-renders from selectedImage state don't re-render the
   entire gallery grid
══════════════════════════════════════════════════════════ */
const Lightbox = memo(({ item, onClose }) => {
  if (!item) return null
  return (
    /*
      backdrop-blur removed — it triggers a full-page repaint on every
      frame on mobile. bg-opacity-80 gives equivalent visual weight.
      overflow-hidden on the wrapper prevents scroll-behind jank.
    */
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        /*
          touch-action: none prevents scroll while lightbox is open,
          avoiding the "scroll + lightbox close" race on mobile.
        */
        style={{ touchAction: 'none' }}
      >
        <motion.div
          className="relative max-w-2xl w-full"
          initial={{ scale: isMobile ? 1 : 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: isMobile ? 1 : 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-150"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 md:p-16 flex items-center justify-center min-h-[40vh]`}>
            {/*
              animate-bounce replaced with a CSS animation that uses
              transform: translateY only — no layout thrashing.
              The keyframe is defined inline to avoid a global stylesheet dep.
            */}
            {item.img ? (
              <img
                src={item.img}
                alt={item.title}
                className="max-w-full max-h-[60vh] object-contain drop-shadow-2xl z-10"
                style={{ animation: 'lb-bounce 3s ease-in-out infinite' }}
              />
            ) : (
              <span
                className="text-8xl md:text-9xl"
                aria-label={item.title}
                style={{ display: 'inline-block', animation: 'lb-bounce 1s ease-in-out infinite' }}
              >
                {item.image}
              </span>
            )}
          </div>

          <div className="text-center mt-4 text-white">
            <h3 className="text-2xl font-bold">{item.title}</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
})
Lightbox.displayName = 'Lightbox'

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
const Gallery = () => {
  const [selectedImage, setSelectedImage]   = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  // Stable callback reference — prevents GalleryCard re-renders on parent state change
  const handleSelect = useCallback((item) => setSelectedImage(item), [])
  const handleClose  = useCallback(() => setSelectedImage(null), [])

  const seo = PAGE_SEO.gallery
  const schema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ])

  return (
    <PageWrapper
      title="Photo Gallery | Visual World of CILO Juice & Facilities"
      description={seo.description}
      url="/gallery"
      keywords={seo.keywords}
      type="website"
      schema={schema}
    >
      <main className="flex-grow pt-20">

        {/* ── Hero ── */}
        <section
          className="relative py-20 px-4 overflow-hidden"
          style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 30%, white 70%, #f3f4f6 100%)' }}
        >
          <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -right-20" />
          <Orb className="w-64 h-64 bg-[#F97316]/15 top-20 -left-16" delay={2} />
          <div className="absolute inset-0 pointer-events-none bg-pattern-leaf-light bg-pattern-opacity-3" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? mobileT : { duration: 0.4 }}
              className="flex items-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8"
            >
              <Link to="/" className="hover:text-[#7A4A2A]">Home</Link>
              <span>/</span>
              <span className="text-[#7A4A2A]">Gallery</span>
            </motion.div>

            <div className="text-center">
              <motion.div {...fadeUp}>
                <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-gray-200">
                  Visual Stories
                </span>
                <h1
                  className="font-black text-3xl sm:text-5xl md:text-6xl text-gray-900 mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Photo Gallery
                </h1>
                <p className="text-[#7A4A2A]/70 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
                  A glimpse into Richi Food Products' world of innovation, culture, and excellence
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="py-8 px-4 bg-white border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  /*
                    Mobile: stagger + y-slide removed from filter buttons.
                    They render above the fold on initial load, so animating
                    them causes a visible repaint before the user can interact.
                  */
                  initial={{ opacity: 0, y: isMobile ? 0 : -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={isMobile ? mobileT : { delay: idx * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 capitalize border-2 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white border-[#F97316] shadow-lg shadow-[#F97316]/30'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#F97316] hover:text-[#F97316]'
                  }`}
                  /*
                    transition-colors only (not transition-all) cuts layout
                    recalculation on state changes.
                  */
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery Grid ── */}
        <section
          className="relative py-16 md:py-20 px-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, white 0%, #f9fafb 40%, white 65%, #f3f4f6 100%)' }}
        >
          <Orb className="w-80 h-80 bg-[#F97316]/15 top-10 -left-40" delay={1} />
          <Orb className="w-96 h-96 bg-[#F97316]/10 bottom-0 -right-32" delay={3} />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/*
              contain: layout style  →  tells the browser this subtree's
              layout changes don't affect the rest of the page.
              Dramatically reduces reflow scope when filter state changes.
            */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              style={{ contain: 'layout style' }}
            >
              {filteredItems.map((item, idx) => (
                <GalleryCard key={item.id} item={item} idx={idx} onSelect={handleSelect} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section
          className="relative py-20 px-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F97316 0%, #A8430F 50%, #7A4A2A 100%)' }}
        >
          {/* White orb on gradient bg is very subtle — keep on all devices */}
          <Orb className="w-96 h-96 bg-white/5 top-1/2 -right-20 -translate-y-1/2" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={isMobile ? mobileT : { delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-black text-white">{item.stat}</div>
                  <div className="text-lg opacity-90 text-white font-semibold">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ── */}
      <Lightbox item={selectedImage} onClose={handleClose} />

      {/*
        lb-bounce: pure transform (no top/margin) → GPU compositor only.
        animate-bounce from Tailwind uses `top` which triggers layout.
      */}
      <style>{`
        @keyframes lb-bounce {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-12%); }
        }
      `}</style>
    </PageWrapper>
  )
}

export default Gallery