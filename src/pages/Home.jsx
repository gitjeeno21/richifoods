import { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, MapPin, Phone, Mail, Star, Droplets, Leaf, Zap, Award } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const shouldDisableOrbs = () => {
  if (typeof navigator !== 'undefined' && navigator.deviceMemory) {
    return navigator.deviceMemory <= 4
  }
  if (typeof window !== 'undefined') {
    return window.innerWidth < 480
  }
  return false
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const heroCards = [
  { name: 'Mango', img: '/images/products/mango.png', bg: '#F5C200' },
  { name: 'Orange', img: '/images/products/orange.png', bg: '#FF6B35' },
  { name: 'Grapes', img: '/images/products/grapes.png', bg: '#8B5CF6' },
  { name: 'Paneer Soda', img: '/images/products/paneer_soda.png', bg: '#EC4899' },
  { name: 'Cola', img: '/images/products/cola.png', bg: '#1E293B' },
  { name: 'Jeera Masala', img: '/images/products/jeera_masala.png', bg: '#16A34A' },
  { name: 'Mango 2', img: '/images/products/mango_2.png', bg: '#F97316' },
  { name: 'Apple', img: '/images/products/apple.png', bg: '#22C55E' },
  { name: 'White Lemon', img: '/images/products/white_lemon.png', bg: '#EAB308' },
  { name: 'Green Lemon', img: '/images/products/green_lemon.png', bg: '#0EA5E9' },
  { name: 'Salt Lemon', img: '/images/products/salt_lemon.png', bg: '#64748B' },
  { name: 'Pineapple', img: '/images/products/pine_apple.png', bg: '#FBBF24' },
]

const products = [
  { name: 'Mango', tag: 'Juice', img: '/images/products/mango.png', gradient: 'from-amber-400 via-orange-400 to-yellow-300', glow: 'shadow-[#F97316]/40' },
  { name: 'Apple', tag: 'Juice', img: '/images/products/apple.png', gradient: 'from-amber-700 via-yellow-500 to-orange-600', glow: 'shadow-amber-400/60' },
  { name: 'Grapes', tag: 'Juice', img: '/images/products/grapes.png', gradient: 'from-purple-500 to-purple-700', glow: 'shadow-purple-300/60' },
  { name: 'Orange', tag: 'Juice', img: '/images/products/orange.png', gradient: 'from-red-500 via-rose-400 to-[#F97316]', glow: 'shadow-[#F97316]/40' },
  { name: 'White Lemon', tag: 'Juice', img: '/images/products/white_lemon.png', gradient: 'from-yellow-400 via-lime-400 to-green-400', glow: 'shadow-yellow-300/60' },
  { name: 'Green Lemon', tag: 'Carbonated', img: '/images/products/green_lemon.png', gradient: 'from-green-500 to-emerald-600', glow: 'shadow-green-300/60' },
  { name: 'Paneer Soda', tag: 'Carbonated', img: '/images/products/paneer_soda.png', gradient: 'from-purple-400 to-violet-500', glow: 'shadow-purple-300/60' },
  { name: 'Cola', tag: 'Carbonated', img: '/images/products/cola.png', gradient: 'from-amber-600 via-orange-500 to-yellow-600', glow: 'shadow-amber-400/60' },
  { name: 'Jeera Masala', tag: 'Carbonated', img: '/images/products/jeera_masala.png', gradient: 'from-orange-500 to-amber-600', glow: 'shadow-orange-300/60' },
  { name: 'Salt Lemon', tag: 'Carbonated', img: '/images/products/salt_lemon.png', gradient: 'from-slate-400 via-gray-400 to-zinc-400', glow: 'shadow-slate-300/60' },
  { name: 'Mango 2', tag: 'Juice', img: '/images/products/mango_2.png', gradient: 'from-amber-400 via-orange-500 to-red-400', glow: 'shadow-orange-300/60' },
  { name: 'Pineapple', tag: 'Juice', img: '/images/products/pine_apple.png', gradient: 'from-yellow-300 via-amber-300 to-orange-300', glow: 'shadow-yellow-300/60' },
]

const stats = [
  { value: '15+', label: 'Years of Taste', icon: Award },
  { value: '12+', label: 'Product Variants', icon: Droplets },
  { value: '1M+', label: 'Happy Customers', icon: Star },
  { value: '100%', label: 'Quality Assured', icon: Leaf },
]

const pillars = [
  { icon: Leaf, title: 'Pure Ingredients', desc: 'Responsibly sourced, finest quality ingredients in every bottle.', color: 'bg-white text-[#F97316]', border: 'border-gray-200' },
  { icon: Droplets, title: 'Crafted Fresh', desc: 'Made with care in our state-of-the-art Tamil Nadu facilities.', color: 'bg-sky-50 text-sky-600', border: 'border-sky-100' },
  { icon: Zap, title: 'Energize Daily', desc: 'A range for every mood — from calm sips to bold energy.', color: 'bg-white text-[#A8430F]', border: 'border-gray-200' },
]

const storyGrid = [
  { src: '/images/story/factory.jpg', label: 'Our Factory', bg: 'from-white to-white', border: 'border-gray-200' },
  { src: '/images/story/products.jpg', label: 'Our Products', bg: 'from-white to-white', border: 'border-gray-200' },
  { src: '/images/story/team.jpg', label: 'Our Team', bg: 'from-sky-50 to-cyan-50', border: 'border-sky-100' },
  { src: '/images/story/community.jpg', label: 'Community', bg: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
]

const ticker = ['Salt Lemon', 'Apple', 'Grapes', 'White Lemon', 'Green Lemon', 'Mango', 'Orange', 'Paneer Soda', 'Cola', 'Jeera Masala', 'Mango 2', 'Pineapple']

/* ══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
══════════════════════════════════════════════════════════════ */

const Orb = ({ className, delay = 0 }) => {
  const shouldReduceMotion = prefersReducedMotion()
  const disableOrbs = shouldDisableOrbs()
  if (disableOrbs) return null
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={shouldReduceMotion ? {} : { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function ImgPlaceholder({ label, dark = false }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none
      ${dark ? 'text-white/40' : 'text-gray-300'}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-widest text-center px-3 leading-tight">{label}</span>
    </div>
  )
}

function Ticker() {
  const shouldReduceMotion = prefersReducedMotion()
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[#F5D9C8] py-3 bg-white/90 backdrop-blur-sm">
      <motion.div
        className="flex gap-14 w-max"
        animate={shouldReduceMotion ? {} : { x: ['0%', '-50%'] }}
        transition={shouldReduceMotion ? {} : { duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} className="text-sm font-semibold text-[#9A3412] tracking-widest uppercase flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8845A] inline-block" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   360° ROTATING WHEEL
   — REDUCED SIZE: smaller cards, smaller ellipse, moved up
══════════════════════════════════════════════════════════════ */
function RotatingHeroCards({ isMobile }) {
  const N = heroCards.length
  const [angleDeg, setAngleDeg] = useState(0)
  const rafRef = useRef(null)
  const lastRef = useRef(null)
  const shouldReduceMotion = prefersReducedMotion()

  // ── Reduced card & ellipse dimensions ──
  const CARD_W = isMobile ? 110 : 170
  const CARD_H = isMobile ? 240 : 380
  const RX = isMobile ? 160 : 380
  const RY = isMobile ? 140 : 300
  const SPEED = 18

  useEffect(() => {
    if (shouldReduceMotion) return
    const animate = (ts) => {
      if (lastRef.current === null) lastRef.current = ts
      const delta = (ts - lastRef.current) / 1000
      lastRef.current = ts
      setAngleDeg(prev => (prev + SPEED * delta) % 360)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [shouldReduceMotion])

  const cards = heroCards.map((card, i) => {
    const theta = ((angleDeg + i * (360 / N)) % 360) * (Math.PI / 180)
    const x = Math.sin(theta) * RX
    const y = -Math.cos(theta) * RY
    const yNorm = y / RY
    const opacity = Math.max(0, Math.min(1, (-yNorm + 0.45) * 3.2))
    const scale = 0.58 + (1 - Math.abs(Math.sin(theta))) * 0.16 + ((-yNorm + 1) / 2) * 0.18
    const zIndex = Math.round(opacity * 80 + (1 - Math.abs(Math.sin(theta))) * 20)
    const tiltDeg = Math.sin(theta) * 14
    return { card, x, y, scale, opacity, zIndex, tiltDeg }
  })

  const sorted = [...cards].sort((a, b) => a.zIndex - b.zIndex)

  // ── Reduced container height; centreY at 72% so cards sit higher ──
  const containerH = isMobile ? 420 : 640
  const centreY    = containerH * 0.78   // was 0.72 — pushes orbit centre lower so top cards don't clip

  return (
    <div
      className="relative w-full select-none"
      style={{ height: containerH, overflow: 'hidden' }}
    >
      {sorted.map(({ card, x, y, scale, opacity, zIndex, tiltDeg }) => {
        if (opacity < 0.02) return null
        return (
          <div
            key={card.name}
            style={{
              position: 'absolute',
              left: '50%',
              top: centreY,
              width: CARD_W,
              height: CARD_H,
              marginLeft: -CARD_W / 2,
              marginTop: -CARD_H / 2,
              transform: `translate(${x}px,${y}px) scale(${scale}) rotate(${tiltDeg}deg)`,
              opacity,
              zIndex,
              willChange: 'transform,opacity',
              pointerEvents: 'none',
            }}
          >
            <img
              src={card.img}
              alt={card.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '16px',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))',
              }}
              onError={(e) => { e.target.style.display = 'none' }}
              loading="lazy"
            />
          </div>
        )
      })}

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: isMobile ? '100px' : '160px',
        background: 'linear-gradient(to top, #ffffff 0%, #ffffff 15%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0.3) 70%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 300,
      }} />
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   INFINITE CAROUSEL — 4 visible cards, 3:4 portrait ratio
══════════════════════════════════════════════════════════════ */
function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = prefersReducedMotion()
  const CARDS_TO_SHOW = 4

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getVisibleProducts = () => {
    const visible = []
    for (let i = 0; i < CARDS_TO_SHOW; i++) {
      visible.push(products[(currentIndex + i) % products.length])
    }
    return visible
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)

  useEffect(() => {
    if (shouldReduceMotion) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const visibleProducts = getVisibleProducts()

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden py-8">
        <motion.div className="flex gap-5 justify-center items-center">
          {visibleProducts.map((product, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex-shrink-0"
              // ── Reduced width to keep 4 cards fitting with 3:4 ratio ──
              style={{ width: isMobile ? '130px' : '220px' }}
            >
              <ProductCard product={product} idx={idx} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white border-2 border-[#F97316] text-[#F97316] flex items-center justify-center hover:bg-[#FFF8EE] transition-all duration-300 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </motion.button>

        <div className="flex gap-2">
          {products.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#F97316] w-8' : 'bg-[#F97316]/30 w-2'}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   GRID PRODUCT CARD — 3:4 portrait ratio
══════════════════════════════════════════════════════════════ */
function ProductCard({ product, idx }) {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => !isMobile && setHovered(true)}
      onHoverEnd={() => !isMobile && setHovered(false)}
      className="relative group cursor-pointer w-full"
    >
      <motion.div
        animate={{ y: !isMobile && hovered ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
        style={{ aspectRatio: '3 / 4', borderRadius: '1.5rem' }}
      >
        {/* Image fills full card */}
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.target.style.display = 'none' }}
          loading="lazy"
        />

        {/* JUICE / CARBONATED tag — top left with gradient backdrop */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2.5 py-1 bg-gradient-to-br ${product.gradient} backdrop-blur-sm rounded-full text-white text-[9px] font-bold uppercase tracking-widest shadow-lg`}>
            {product.tag}
          </span>
        </div>

        {/* Product name pill — bottom left with gradient backdrop */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className={`px-4 py-1.5 bg-gradient-to-br ${product.gradient} backdrop-blur-sm rounded-full text-white font-black text-xs uppercase tracking-widest shadow-lg`}>
            {product.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const shouldReduceMotion = prefersReducedMotion()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageWrapper>

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative overflow-x-clip pt-16"
        style={{ minHeight: '100vh', background: '#ffffff' }}
      >
        <div className="absolute inset-0 pointer-events-none bg-pattern-leaf bg-pattern-opacity-55" />

        <Orb className="w-[600px] h-[600px] bg-[#F9D4C0]/30 -top-32 -right-48" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-yellow-200/15 top-1/2 -left-32" delay={2} />
        <Orb className="w-[300px] h-[300px] bg-cyan-200/15   bottom-32 right-1/4" delay={1} />

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8 px-6"
        >
          <span className="text-[#7A4A2A]">Home</span>
        </motion.div>

        {/* Text content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col items-center text-center px-6 pb-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#FFD9A8] shadow-sm text-[#7A4A2A] text-xs font-bold mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4622A] animate-pulse" />
            Refreshing India Since 2008
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[1.07] tracking-tight text-[#2D1608] mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            }}
          >
            Where every sip is
            <br />
            <span className="text-[#F97316]">a flavor-filled experience</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="text-[#7A4A2A]/55 max-w-lg leading-relaxed mb-9"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
          >
            Refine your beverage enjoyment with Richi's superior selection of drinks,
            offering a burst of flavours that will leave you desiring more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <Link
              to="/products"
              className="px-9 py-3.5 bg-[#F97316] text-white font-bold rounded-full shadow-xl shadow-[#F97316]/20
                hover:bg-[#F97316] hover:shadow-[#F97316]/25 transition-all duration-300 flex items-center gap-2"
            >
              Explore <ChevronRight size={16} />
            </Link>
            <Link
              to="/about"
              className="px-9 py-3.5 bg-white/75 backdrop-blur text-[#7A4A2A] font-bold rounded-full
                border border-[#FFD9A8] hover:bg-white hover:border-[#F97316] hover:text-[#F97316]
                transition-all duration-300 shadow-sm"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* ── ROTATING HERO CARDS — moved up with mt-2 ── */}
        <motion.div
          style={{ y: cardsY, position: 'relative', left: '50%', marginLeft: '-50vw', width: '100vw' }}
          className="z-10 mt-2"
        >
          <RotatingHeroCards isMobile={isMobile} />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="relative z-10 flex flex-col items-center gap-1 pb-6 mt-4"
        >
          <span className="text-[10px] text-[#F97316]/45 font-bold tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={shouldReduceMotion ? {} : { duration: 1.4, repeat: Infinity }}
            className="w-4 h-6 rounded-full border-2 border-[#F97316]/35 flex items-start justify-center pt-1"
          >
            <div className="w-0.5 h-1.5 bg-[#F97316]/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <Ticker />

      {/* ══════════ PRODUCTS GRID ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-gray-200">
              Our Collection
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Discover the extensive assortment
                <br />
                <span className="text-[#F97316]">of beverages we offer</span>
              </h2>
              <Link to="/products" className="flex items-center gap-2 text-[#F97316] font-semibold hover:gap-3 transition-all duration-200 shrink-0">
                View all products <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <ProductCarousel products={products} />
          </div>
        </div>
      </section>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F97316] via-[#A8430F] to-[#2D1608]" />
        <Orb className="w-[500px] h-[500px] bg-white/10 -top-48 -left-32" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-[#FF6B35]/10 bottom-0 -right-40" delay={2} />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group cursor-pointer text-center relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
              <motion.div className="relative z-10 flex flex-col items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center group-hover:bg-white/25 transition-all duration-500 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <s.icon size={24} className="text-white/90" />
                </motion.div>
                <div className="text-white">
                  <motion.div className="text-6xl font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {s.value}
                  </motion.div>
                  <div className="text-white/70 text-xs font-bold tracking-widest uppercase mt-2">{s.label}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ OUR STORY ══════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white via-white to-gray-50 relative overflow-hidden">
        <Orb className="w-[500px] h-[500px] bg-[#F97316]/8 -top-40 -left-48" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-[#F97316]/5 bottom-20 -right-32" delay={1} />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8] shadow-sm">
              Our Story
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Refreshing taste buds
              <br />
              <span className="text-[#F97316]">since 2008</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg mb-8">
              Richi Food Products has been crafting refreshing beverages with
              care and passion from Tamil Nadu. Our Richi range is made with the highest quality
              ingredients, each sip an expression of the finest taste.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300"
            >
              Read our Story <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {storyGrid.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`bg-gradient-to-br ${item.bg} border-2 ${item.border} rounded-3xl overflow-hidden aspect-square relative group shadow-lg hover:shadow-2xl transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-[#F97316]/0 to-[#F97316]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <ImgPlaceholder label={item.label} />
                <motion.div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end pb-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-bold tracking-wide">{item.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ PILLARS ══════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        <Orb className="w-[600px] h-[600px] bg-[#F97316]/6 top-1/2 left-1/4 -translate-y-1/2" delay={0} />
        <Orb className="w-[500px] h-[500px] bg-[#F97316]/5 -bottom-32 right-1/4" delay={2} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8] shadow-sm">
              Why Richi Food Products
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Commitment to You
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`group border-2 ${p.border} rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-gradient-to-br ${p.color === 'bg-white text-[#F97316]' ? 'from-white to-[#FFFBF7]' : p.color === 'bg-sky-50 text-sky-600' ? 'from-sky-50 to-blue-50' : 'from-white to-orange-50'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className={`w-16 h-16 rounded-2xl ${p.color} flex items-center justify-center mb-6 relative z-10 group-hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 6 }}
                >
                  <p.icon size={28} />
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#F97316] transition-colors duration-300">{p.title}</h3>
                  <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CSR ══════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-gray-50 via-white to-white relative overflow-hidden">
        <Orb className="w-[600px] h-[600px] bg-[#F97316]/7 -top-40 -right-48" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-[#F97316]/5 bottom-10 -left-32" delay={1} />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/10 via-transparent to-[#F97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            <img
              src="/images/csr/csr-banner.jpg"
              alt="CSR Initiative"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="text-[#F97316] font-bold text-sm tracking-widest uppercase">CSR Image</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8] shadow-sm">
              Corporate Social Responsibility
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              We manufacture delicious drinks
              <br />
              <span className="text-[#F97316]">with conscience</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Our sustainable practices, community investments, and environmental stewardship
              shape a brighter future for everyone in Tamil Nadu and beyond.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ DEALERSHIP CTA ══════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-gray-900 via-gray-900 to-[#1A0C04] relative overflow-hidden">
        <Orb className="w-[700px] h-[700px] bg-[#F97316]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={0} />
        <Orb className="w-[500px] h-[500px] bg-[#A8430F]/10 -bottom-40 -left-32" delay={2} />
        <Orb className="w-[400px] h-[400px] bg-[#F97316]/8 -top-32 -right-32" delay={1} />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="text-6xl mb-8 inline-block"
              whileInView={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, duration: 1.2 }}
            >
              🤝
            </motion.div>

            <h2
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Join the Richi Family Today
            </h2>

            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the extraordinary delight. Become a dealer and bring Richi
              beverages to your community.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dealership"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-[#F97316]/40 transition-all duration-300"
                >
                  Become a Dealer <ChevronRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-white/15 backdrop-blur text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300"
                >
                  <Phone size={16} /> Contact Us
                </Link>
              </motion.div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-300">
                <a href="tel:9944366592" className="flex items-center gap-3 hover:text-[#F97316] transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F97316] transition-colors">
                    <Phone size={16} />
                  </div>
                  99443 66592
                </a>
                <a href="mailto:md@richifoodproducts.com" className="flex items-center gap-3 hover:text-[#F97316] transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F97316] transition-colors">
                    <Mail size={16} />
                  </div>
                  md@richifoodproducts.com
                </a>
                <span className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  Krishnagiri, Tamil Nadu
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  )
}