import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const shouldDisableOrbs = () => {
  if (typeof navigator !== 'undefined' && navigator.deviceMemory) {
    return navigator.deviceMemory <= 4
  }
  if (typeof window !== 'undefined') {
    return window.innerWidth < 480
  }
  return false
}

const Orb = ({ className, delay = 0 }) => {
  if (shouldDisableOrbs()) return null
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

const events = [
  {
    id: 1,
    title: 'Pongal 2025',
    date: 'Jan 14-15, 2025',
    image: '/images/insights/pongal-2025.jpg',
    description: 'Celebrating the harvest festival with our community and team. Pongal symbolizes prosperity, gratitude, and the bounty of nature. Richi Food Products joins in the festivities with traditional celebrations across Tamil Nadu.',
    details: 'Experience the warmth of Pongal celebrations with Richi. From traditional Pongal rangoli to community gatherings, we honor this harvest festival that brings families together. Our beverages add sweetness to your Pongal celebrations!'
  },
  {
    id: 2,
    title: 'Diwali 2025',
    date: 'Oct 29-Nov 2, 2025 ',
    image: '/images/insights/diwali-2025.jpg',
    description: 'Festival of Lights celebrating victory of good over evil. Richi Food Products illuminates your Diwali celebrations with premium beverages and community joy. Share moments of togetherness and brightness with loved ones.',
    details: 'Diwali is the festival of lights, joy, and togetherness. At Richi, we celebrate by bringing people together with refreshing beverages that complement every festive moment. Light up your Diwali with Richi!'
  },
  {
    id: 3,
    title: 'Tamil New Year 2025',
    date: 'April 14, 2025',
    image: '/images/insights/tamil-new-year-2025.jpg',
    description: 'Celebrating Tamil heritage and the beginning of new beginnings. Tamil New Year (Chithirai) marks the arrival of spring and prosperity. Richi Food Products honors this significant cultural milestone with community engagement.',
    details: 'Tamil New Year or Chithirai Pirappu welcomes spring and new possibilities. It\'s a time of renewal, hope, and new beginnings. Richi Food Products celebrates Tamil culture and tradition with special events, while refreshing communities with our quality beverages throughout this auspicious period.'
  }
]

export default function Insights() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <PageWrapper>
      {/* ══════════ HERO ══════════ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 30%, white 70%, #f3f4f6 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3Cpath d='M25 80 Q65 95 55 140 Q25 110 25 80Z' fill='%237A4A2A'/%3E%3Cpath d='M155 80 Q115 95 125 140 Q155 110 155 80Z' fill='%237A4A2A'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -right-20" />
        <Orb className="w-64 h-64 bg-[#F97316]/15 top-20 -left-16" delay={2} />

        <div className="relative px-6 md:px-12 lg:px-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8 max-w-7xl mx-auto"
          >
            <Link to="/" className="hover:text-[#7A4A2A]">Home</Link>
            <span>/</span>
            <span className="text-[#7A4A2A]">Events</span>
          </motion.div>

          {/* Centre text */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#FFD9A8] text-[#7A4A2A] text-xs font-bold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FB923C] animate-pulse" />
                Celebrations & Events
              </span>
              <h1
                className="font-black leading-tight text-[#1A0C04] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Festive<br />
                <span className="text-[#F97316]">Celebrations 2025</span>
              </h1>
              <p className="text-[#4A2800]/60 max-w-2xl mx-auto leading-relaxed text-lg">
                Join us in celebrating Tamil culture and traditions with Richi Food Products throughout 2025.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ EVENTS GRID ══════════ */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, white 0%, #f9fafb 40%, white 65%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/15 top-10 -left-40" delay={1} />
        <Orb className="w-96 h-96 bg-[#F97316]/10 bottom-0 -right-32" delay={3} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.05 }}
                onClick={() => setSelectedEvent(event)}
                className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 bg-white flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  {!event.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">🎉</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Date */}
                  <div className="text-sm text-[#F97316] font-semibold mb-3 uppercase tracking-widest">
                    {event.date}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm flex-1 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Click hint */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[#F97316]"
                    />
                    <span className="text-xs font-semibold text-[#F97316]">Tap to see more</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MODAL POPUP ══════════ */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close button */}
              <div className="sticky top-0 flex justify-end p-6 bg-gradient-to-r from-[#F97316] to-[#A8430F] z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X size={24} className="text-white" />
                </motion.button>
              </div>

              {/* Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                {!selectedEvent.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20">🎉</div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Date */}
                <div className="text-sm text-[#F97316] font-semibold mb-4 uppercase tracking-widest">
                  📅 {selectedEvent.date}
                </div>

                {/* Title */}
                <h2 className="text-4xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {selectedEvent.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {selectedEvent.description}
                </p>

                {/* Full details */}
                <div className="bg-gradient-to-br from-[#FFF8EE] to-[#FFE8D1] rounded-2xl p-6 mb-6 border-2 border-[#FFD9A8]">
                  <p className="text-[#7A4A2A] leading-relaxed">
                    {selectedEvent.details}
                  </p>
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
