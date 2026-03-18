import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, MapPin, Phone, Mail, Star, Droplets, Leaf, Zap, Award } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

/*
  heroCards — 7 product cards shown as a tilted fan in the hero section.
  Matches dffipl.com layout exactly:
    • centre card is biggest, upright
    • cards fan out left/right with increasing tilt + scale reduction
  
  TO ADD YOUR IMAGES:
    Change the `img` value of each card to your product image path.
    Transparent PNG (400×700px) works best for bottle shots.
    Card `bg` is the solid color behind the bottle.
*/
const heroCards = [
  {
    name: 'Paalman Milk',
    img: '/images/products/paalman-milk.png',
    bg: '#f59e0b',
    rot: -25,
    z: 0,
    xOffset: -550,
    yOffset: 95,
    scale: 0.65,
  },
  {
    name: 'Apple',
    img: '/images/products/apple.png',
    bg: '#10b981',
    rot: -22,
    z: 1,
    xOffset: -420,
    yOffset: 70,
    scale: 0.70,
  },
  {
    name: 'Grapes',
    img: '/images/products/grapes.png',
    bg: '#7c3aed',
    rot: -13,
    z: 2,
    xOffset: -280,
    yOffset: 20,
    scale: 0.82,
  },
  {
    name: 'White Lemon',
    img: '/images/products/white-lemon.png',
    bg: '#84cc16',
    rot: -5,
    z: 3,
    xOffset: -140,
    yOffset: -5,
    scale: 0.91,
  },
  {
    name: 'Meriba Water',
    img: '/images/products/meriba-water.png',
    bg: '#06b6d4',
    rot: -2,
    z: 4,
    xOffset: -60,
    yOffset: 10,
    scale: 0.95,
  },
  {
    name: 'Mango',     // CENTRE CARD — biggest, hero focal point
    img: '/images/products/mango.png',
    bg: '#F5C518',
    rot: 0,
    z: 10,
    xOffset: 0,
    yOffset: -40,
    scale: 1,
  },
  {
    name: 'Orange',
    img: '/images/products/orange.png',
    bg: '#F97316',
    rot: 5,
    z: 3,
    xOffset: 60,
    yOffset: -5,
    scale: 0.91,
  },
  {
    name: 'Paneer Soda',
    img: '/images/products/paneer-soda.png',
    bg: '#8b5cf6',
    rot: 13,
    z: 2,
    xOffset: 140,
    yOffset: 20,
    scale: 0.82,
  },
  {
    name: 'Cola',
    img: '/images/products/cola.png',
    bg: '#475569',
    rot: 22,
    z: 1,
    xOffset: 280,
    yOffset: 70,
    scale: 0.70,
  },
  {
    name: 'Thunder Fizzy',
    img: '/images/products/thunder-fizzy.png',
    bg: '#ec4899',
    rot: 25,
    z: 0,
    xOffset: 420,
    yOffset: 85,
    scale: 0.65,
  },
  {
    name: 'Agnee Energy',
    img: '/images/products/agnee-energy.png',
    bg: '#dc2626',
    rot: 18,
    z: 1,
    xOffset: 550,
    yOffset: 40,
    scale: 0.76,
  },
]

// Grid cards — shown in the Products section below hero
const products = [
  { name: 'Mango',        tag: 'Juice',           img: '/images/products/mango.png',        gradient: 'from-amber-400 via-orange-400 to-yellow-300',  glow: 'shadow-[#F97316]/40' },
  { name: 'Apple',        tag: 'Juice',           img: '/images/products/apple.png',        gradient: 'from-green-400 via-emerald-400 to-teal-400',    glow: 'shadow-green-300/60' },
  { name: 'Grapes',       tag: 'Juice',           img: '/images/products/grapes.png',       gradient: 'from-purple-500 to-purple-700',                 glow: 'shadow-purple-300/60' },
  { name: 'Orange',       tag: 'Juice',           img: '/images/products/orange.png',       gradient: 'from-red-500 via-rose-400 to-[#F97316]',       glow: 'shadow-[#F97316]/40' },
  { name: 'Paneer Soda',  tag: 'Carbonated',      img: '/images/products/paneer-soda.png', gradient: 'from-purple-400 to-violet-500',                 glow: 'shadow-purple-300/60' },
  { name: 'Cola',         tag: 'Carbonated',      img: '/images/products/cola.png',        gradient: 'from-slate-500 via-zinc-500 to-gray-400',      glow: 'shadow-slate-300/60' },
]

const stats = [
  { value: '15+',  label: 'Years of Taste',    icon: Award    },
  { value: '12+',  label: 'Product Variants',  icon: Droplets },
  { value: '1M+',  label: 'Happy Customers',   icon: Star     },
  { value: '100%', label: 'Quality Assured',   icon: Leaf     },
]

const pillars = [
  { icon: Leaf,     title: 'Pure Ingredients', desc: 'Responsibly sourced, finest quality ingredients in every bottle.',        color: 'bg-white text-[#F97316]', border: 'border-gray-200' },
  { icon: Droplets, title: 'Crafted Fresh',    desc: 'Made with care in our state-of-the-art Tamil Nadu facilities.',          color: 'bg-sky-50 text-sky-600',         border: 'border-sky-100'     },
  { icon: Zap,      title: 'Energize Daily',   desc: 'A range for every mood — from calm sips to bold energy.',                color: 'bg-white text-[#A8430F]',     border: 'border-gray-200'   },
]

const storyGrid = [
  { src: '/images/story/factory.jpg',   label: 'Our Factory',  bg: 'from-white to-white',  border: 'border-gray-200' },
  { src: '/images/story/products.jpg',  label: 'Our Products', bg: 'from-white to-white',  border: 'border-gray-200'  },
  { src: '/images/story/team.jpg',      label: 'Our Team',     bg: 'from-sky-50 to-cyan-50',      border: 'border-sky-100'     },
  { src: '/images/story/community.jpg', label: 'Community',    bg: 'from-rose-50 to-pink-50',     border: 'border-rose-100'    },
]

const ticker = ['Paalman Milk', 'Apple', 'Grapes', 'White Lemon', 'Meriba Water', 'Mango', 'Orange', 'Paneer Soda', 'Cola', 'Thunder Fizzy', 'Agnee Energy']

/* ══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
══════════════════════════════════════════════════════════════ */

const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

// Dashed image placeholder shown when src is empty / broken
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
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[#F5D9C8] py-3 bg-white/90 backdrop-blur-sm">
      <motion.div
        className="flex gap-14 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
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
   HERO FAN CARD
   Replicates dffipl.com tilted product card layout.
   Each card is absolutely positioned relative to the fan container,
   offset from centre using xOffset, rotated by rot, scaled by scale.
══════════════════════════════════════════════════════════════ */
function HeroFanCard({ card }) {
  const [hov, setHov] = useState(false)
  const isCentre = card.rot === 0

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 80 }}
      animate={{ 
        opacity: 1, 
        y: [0, -12, 0],
      }}
      transition={{
        y: {
          duration: 3 + Math.random() * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.abs(card.xOffset) * 0.0001,
        },
        opacity: {
          duration: 0.9,
          delay: 0.4 + Math.abs(card.xOffset) / 2200,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
      whileHover={{
        y: -20,
        scale: card.scale * 1.05,
        zIndex: 30,
        transition: { type: 'spring', stiffness: 280, damping: 18 },
      }}
      style={{
        position: 'absolute',
        // Fan spread: translate from centre by xOffset
        left: `calc(50% + ${card.xOffset}px)`,
        bottom: 0,
        marginLeft: '-88px',   // half of card width (176px)
        zIndex: card.z,
        scale: card.scale,
        rotate: card.rot,
        transformOrigin: 'bottom center',
      }}
      className="cursor-pointer"
    >
      {/* ── CARD ── */}
      <div
        className="relative w-44 h-72 rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: card.bg }}
      >
        {/* Organic swirl background — matches real site abstract card art */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 25% 70%, rgba(255,255,255,0.35) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 20%, rgba(255,255,255,0.20) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.10) 0%, transparent 40%)
            `,
          }}
        />
        {/* Diagonal stripe accent */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(
              130deg,
              rgba(255,255,255,0.6) 0px,
              rgba(255,255,255,0.6) 5px,
              transparent 5px,
              transparent 30px
            )`,
          }}
        />

        {/* ══ PRODUCT BOTTLE IMAGE ══
            Replace card.img path with your actual product image.
            Transparent PNG recommended. Bottle should face forward.
            Ideal size: 300×500px or similar portrait ratio. */}
        <img
          src={card.img}
          alt={card.name}
          className="absolute inset-0 w-full h-full object-contain z-10 px-5 pt-5 pb-10
            drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Fallback placeholder when image not set */}
        <ImgPlaceholder label={card.name} dark />

        {/* Top-right gloss */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/20 blur-2xl pointer-events-none" />

        {/* Shine overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 to-transparent pointer-events-none z-20" />

        {/* Hover shine sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 z-20"
          animate={{ x: hov ? '120%' : '-120%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        />

        {/* Bottom name label — visible on centre card or on hover */}
        <motion.div
          animate={{ opacity: hov || isCentre ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-0 right-0 flex justify-center z-30"
        >
          <span className="px-3 py-1 bg-black/25 backdrop-blur-sm rounded-full text-white text-[10px] font-black tracking-widest uppercase">
            {card.name}
          </span>
        </motion.div>
      </div>

      {/* Colour glow beneath centre card */}
      {isCentre && (
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full blur-xl opacity-50 pointer-events-none"
          style={{ backgroundColor: card.bg }}
        />
      )}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   GRID PRODUCT CARD (Products section)
══════════════════════════════════════════════════════════════ */
function ProductCard({ product, idx }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative rounded-[2rem] overflow-hidden h-72 shadow-xl ${product.glow} shadow-2xl`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`} />
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />

        {/* Shine sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 z-10"
          animate={{ x: hovered ? '100%' : '-100%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        />

        {/* Tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
            {product.tag}
          </span>
        </div>

        {/* ── PRODUCT IMAGE ──
            Replace product.img path with your product image.
            Transparent PNG (portrait) recommended. */}
        <motion.div
          animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.07 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="absolute inset-x-0 top-6 bottom-14 z-10 flex items-center justify-center px-6"
        >
          <div className="relative w-full h-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-xl"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <ImgPlaceholder label={product.name} dark />
          </div>
        </motion.div>

        {/* Name bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-10 bg-gradient-to-t from-black/30 to-transparent">
          <h3 className="text-white font-black text-base leading-tight">{product.name}</h3>
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-1 text-white/80 text-[11px] font-bold tracking-wider uppercase mt-1"
              >
                Explore <ArrowRight size={11} />
              </motion.div>
            )}
          </AnimatePresence>
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
  const textY      = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const textOpacity= useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const cardsY     = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <PageWrapper>

      {/* ══════════════════════════════════════════════════════════
          HERO — mirrors dffipl.com layout:
          • Soft green/cream gradient background with leaf texture
          • Headline + subtitle + buttons centred at top
          • 7 tilted product bottle cards fanned across the bottom
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24"
        style={{
          minHeight: '100vh',
          background: '#ffffff',
        }}
      >
        {/* Leaf / botanical SVG texture — matches dffipl.com subtle bg motif */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.055,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%239A3412'/%3E%3Cpath d='M25 80 Q65 95 55 140 Q25 110 25 80Z' fill='%239A3412'/%3E%3Cpath d='M155 80 Q115 95 125 140 Q155 110 155 80Z' fill='%239A3412'/%3E%3Cpath d='M90 100 Q130 120 120 165 Q85 140 90 100Z' fill='%239A3412' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Ambient glow orbs */}
        <Orb className="w-[600px] h-[600px] bg-[#F9D4C0]/30 -top-32 -right-48" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-yellow-200/15 top-1/2 -left-32"   delay={2} />
        <Orb className="w-[300px] h-[300px] bg-cyan-200/15   bottom-32 right-1/4" delay={1} />

        {/* ── BREADCRUMB ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center justify-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8 px-6"
        >
          <span className="text-[#7A4A2A]">Home</span>
        </motion.div>

        {/* ── TEXT CONTENT ── */}
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
            Refine your beverage enjoyment with Daily's superior selection of drinks,
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

        {/* ── FANNED PRODUCT CARDS ──
            7 cards positioned absolutely in a fan shape.
            The container below has a fixed height to hold them.
            Cards are positioned relative to the container's centre-bottom.

            HOW TO ADD YOUR IMAGES:
            1. Add your product bottle PNGs to /public/images/products/
            2. Update the `img` path in each heroCard entry above
            3. Update `bg` to match your product's brand colour
            Cards automatically show a placeholder if the image is missing.
        */}
        <motion.div
          style={{ y: cardsY }}
          className="relative z-10 w-full mt-8"
        >
          {/* Fan container — overflow hidden hides partial side cards */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: '360px' }}
          >
            {heroCards.map((card, i) => (
              <HeroFanCard key={i} card={card} />
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="relative z-10 flex flex-col items-center gap-1 pb-6 mt-3"
        >
          <span className="text-[10px] text-[#F97316]/45 font-bold tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {products.map((p, i) => (
              <ProductCard key={i} product={p} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Multi-layered gradient background */}
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
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
              
              <motion.div 
                className="relative z-10 flex flex-col items-center gap-4"
              >
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center group-hover:bg-white/25 transition-all duration-500 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <s.icon size={24} className="text-white/90" />
                </motion.div>
                <div className="text-white">
                  <motion.div 
                    className="text-6xl font-black" 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
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
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8] shadow-sm">
                Our Story
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Refreshing taste buds
              <br />
              <span className="text-[#F97316]">since 2008</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-500 leading-relaxed text-lg mb-8"
            >
              Richi Food Products has been crafting refreshing beverages with
              care and passion from Tamil Nadu. Our Richi range is made with the highest quality
              ingredients, each sip an expression of the finest taste.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300"
              >
                Read our Story <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* 2×2 story image grid */}
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
                {/* Overlay glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-[#F97316]/0 to-[#F97316]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <ImgPlaceholder label={item.label} />
                
                {/* Label overlay */}
                <motion.div 
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end pb-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
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
            transition={{ duration: 0.6 }}
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
                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon container */}
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
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/10 via-transparent to-[#F97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            
            {/* Image */}
            <img
              src="/images/csr/csr-banner.jpg"
              alt="CSR Initiative"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            
            {/* Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </motion.div>
              <p className="text-[#F97316] font-bold text-sm tracking-widest uppercase">CSR Image</p>
              <p className="text-gray-400 text-xs">Recommended: 800 × 600 px</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8] shadow-sm">
                Corporate Social Responsibility
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              We manufacture delicious drinks
              <br />
              <span className="text-[#F97316]">with conscience</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Our sustainable practices, community investments, and environmental stewardship
              shape a brighter future for everyone in Tamil Nadu and beyond.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <Link
                to="/csr"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300"
              >
                View CSR Initiatives <ArrowRight size={16} />
              </Link>
            </motion.div>
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
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Join the Richi Family Today
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the extraordinary delight. Become a dealer and bring Richi
              beverages to your community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="pt-12 border-t border-white/10"
            >
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
                  Namakkal, Tamil Nadu
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  )
}