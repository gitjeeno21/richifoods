import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import ProductCard from '../components/ProductCard'

const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

const products = [
  { name: 'Apple', category: 'Juice', img: '/images/products/apple.png', color: '#10b981' },
  { name: 'Mango', category: 'Juice', img: '/images/products/mango.png', color: '#F97316' },
  { name: 'Grapes', category: 'Juice', img: '/images/products/grapes.png', color: '#7c3aed' },
  { name: 'White Lemon', category: 'Juice', img: '/images/products/white-lemon.png', color: '#84cc16' },
  { name: 'Orange', category: 'Juice', img: '/images/products/orange.png', color: '#F97316' },
  { name: 'Green Lemon', category: 'Carbonated', img: '/images/products/green-lemon.png', color: '#84cc16' },
  { name: 'Paneer Soda', category: 'Carbonated', img: '/images/products/paneer-soda.png', color: '#8b5cf6' },
  { name: 'Salt Lemon', category: 'Carbonated', img: '/images/products/salt-lemon.png', color: '#64748b' },
  { name: 'Cola', category: 'Carbonated', img: '/images/products/cola.png', color: '#475569' },
  { name: 'Jeera', category: 'Carbonated', img: '/images/products/jeera.png', color: '#F97316' },
  { name: 'Pine Apple', category: 'Juice', img: '/images/products/pine-apple.png', color: '#F97316' },
]

const filters = ['All', 'Juice', 'Carbonated']

const packaging = [
  { size: '200ml', type: 'PET Bottle', best: 'Restaurants & Cafes' },
  { size: '500ml', type: 'PET Bottle', best: 'Retail & On-the-go' },
  { size: '1L', type: 'PET Bottle', best: 'Family & Bulk' },
  { size: 'Custom', type: 'White-label', best: 'Brand Partners' },
]

export default function Products() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.055,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%239A3412'/%3E%3Cpath d='M25 80 Q65 95 55 140 Q25 110 25 80Z' fill='%239A3412'/%3E%3Cpath d='M155 80 Q115 95 125 140 Q155 110 155 80Z' fill='%239A3412'/%3E%3Cpath d='M90 100 Q130 120 120 165 Q85 140 90 100Z' fill='%239A3412' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8"
          >
            <Link to="/" className="hover:text-[#7A4A2A]">Home</Link>
            <span>/</span>
            <span className="text-[#7A4A2A]">Products</span>
          </motion.div>
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-gray-200">
                Our Range
              </span>
              <h1 className="font-black text-5xl md:text-6xl text-gray-900 mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Our Products</h1>
              <p className="text-[#7A4A2A]/70 text-xl max-w-2xl mx-auto leading-relaxed">
                {products.length}+ premium beverages — from refreshing fruit juices to lively carbonated drinks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-12 justify-center flex-wrap"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  active === f
                    ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30'
                    : 'bg-white text-[#7A4A2A] hover:bg-gray-50 hover:text-[#F97316] border border-gray-200'
                }`}
              >
                {f}
                <span className="ml-2 text-xs opacity-70">
                  {f === 'All' ? products.length : products.filter((p) => p.category === f).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.name} {...product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Packaging */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(155deg, white 0%, white 35%, #f3f4f6 65%, #f9fafb 100%)' }}>
        <Orb className="w-96 h-96 bg-[#F97316]/15 top-0 -right-32" />
        <Orb className="w-80 h-80 bg-[#F97316]/10 bottom-20 -left-20" delay={2} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Available Formats
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-[#7A4A2A]/70 text-center mb-12 max-w-2xl mx-auto"
          >
            Flexible sizing to fit every distribution channel
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {packaging.map((p, i) => (
              <motion.div
                key={p.size}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-7 text-center hover:shadow-2xl hover:border-[#F97316] transition-all duration-300 border-2 border-gray-200"
              >
                <div className="text-4xl mb-4">🫙</div>
                <div className="font-black text-3xl text-[#F97316] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{p.size}</div>
                <div className="text-gray-900 font-semibold text-sm mb-1">{p.type}</div>
                <div className="text-[#7A4A2A]/50 text-xs">{p.best}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing spec */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, white 0%, #f9fafb 40%, white 65%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/15 top-10 -left-40" delay={1} />
        <Orb className="w-96 h-96 bg-[#F97316]/10 bottom-0 -right-32" delay={3} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How We Make It
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: '01', icon: '⚙️', label: 'Preparation' },
              { step: '02', icon: '🔄', label: 'Filling' },
              { step: '03', icon: '🏷️', label: 'Labelling' },
              { step: '04', icon: '✅', label: 'Checking' },
              { step: '05', icon: '📦', label: 'Packing' },
              { step: '06', icon: '🚚', label: 'Dispatch' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 text-center border-2 border-gray-200 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-black text-[#F97316] text-xs mb-1 tracking-widest uppercase">STEP {s.step}</div>
                <div className="text-gray-900 text-xs leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
