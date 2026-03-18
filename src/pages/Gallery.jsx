// pages/Gallery.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

/* ══════════════════════════════════════════════════════════
   HELPER COMPONENTS
══════════════════════════════════════════════════════════ */

const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'products', 'facilities', 'events', 'team']

  const galleryItems = [
    { id: 1, category: 'products', title: 'Premium Collection', image: '🥤', color: 'from-orange-400 to-red-400' },
    { id: 2, category: 'products', title: 'Flavor Variety', image: '🍇', color: 'from-purple-400 to-pink-400' },
    { id: 3, category: 'facilities', title: 'Modern Facility', image: '🏭', color: 'from-blue-400 to-cyan-400' },
    { id: 4, category: 'facilities', title: 'Quality Control', image: '🔬', color: 'from-green-400 to-emerald-400' },
    { id: 5, category: 'events', title: 'Launch Event', image: '🎉', color: 'from-yellow-400 to-orange-400' },
    { id: 6, category: 'events', title: 'Community Drive', image: '🎊', color: 'from-pink-400 to-rose-400' },
    { id: 7, category: 'team', title: 'Our Team', image: '👥', color: 'from-indigo-400 to-purple-400' },
    { id: 8, category: 'team', title: 'Team Spirit', image: '🤝', color: 'from-teal-400 to-cyan-400' },
    { id: 9, category: 'products', title: 'Fresh Produce', image: '🍊', color: 'from-orange-400 to-yellow-400' },
    { id: 10, category: 'facilities', title: 'Packaging', image: '📦', color: 'from-gray-400 to-blue-400' },
    { id: 11, category: 'events', title: 'Award Ceremony', image: '🏆', color: 'from-yellow-400 to-orange-400' },
    { id: 12, category: 'team', title: 'Leadership', image: '👔', color: 'from-slate-400 to-gray-400' }
  ]

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <PageWrapper>
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 30%, white 70%, #f3f4f6 100%)' }}>
          <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -right-20" />
          <Orb className="w-64 h-64 bg-[#F97316]/15 top-20 -left-16" delay={2} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8"
            >
              <Link to="/" className="hover:text-[#7A4A2A]">Home</Link>
              <span>/</span>
              <span className="text-[#7A4A2A]">Gallery</span>
            </motion.div>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-gray-200">
                  Visual Stories
                </span>
                <h1 className="font-black text-5xl md:text-6xl text-gray-900 mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Photo Gallery</h1>
                <p className="text-[#7A4A2A]/70 text-xl max-w-2xl mx-auto leading-relaxed">
                  A glimpse into Richi Food Products' world of innovation, culture, and excellence
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 bg-white border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-4 flex-wrap">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize border-2 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white border-[#F97316] shadow-lg shadow-[#F97316]/30'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#F97316] hover:text-[#F97316]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, white 0%, #f9fafb 40%, white 65%, #f3f4f6 100%)' }}>
          <Orb className="w-80 h-80 bg-[#F97316]/15 top-10 -left-40" delay={1} />
          <Orb className="w-96 h-96 bg-[#F97316]/10 bottom-0 -right-32" delay={3} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${item.color} rounded-2xl h-64 flex items-center justify-center overflow-hidden relative border-2 border-transparent hover:border-[#F97316] hover:shadow-2xl transition-all duration-300`}>
                    <div className="text-6xl group-hover:scale-125 transition-transform duration-300">
                      {item.image}
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-center px-4">{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F97316 0%, #A8430F 50%, #7A4A2A 100%)' }}>
          <Orb className="w-96 h-96 bg-white/5 top-1/2 -right-20 -translate-y-1/2" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '8+', label: 'Premium Flavors' },
                { stat: '14+', label: 'Years of Excellence' },
                { stat: '100K+', label: 'Happy Customers' },
                { stat: '25+', label: 'States Covered' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-4xl font-black text-white">{item.stat}</div>
                  <div className="text-lg opacity-90 text-white font-semibold">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className={`bg-gradient-to-br ${selectedImage.color} rounded-2xl p-16 flex items-center justify-center`}>
              <div className="text-9xl animate-bounce">{selectedImage.image}</div>
            </div>
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}


      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
      `}</style>
    </div>
  )
}

export default Gallery