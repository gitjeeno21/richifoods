import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Tag, Search } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'

/* ══════════════════════════════════════════════════════════
   HELPER COMPONENTS
══════════════════════════════════════════════════════════ */

const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const articles = [
  {
    id: 1,
    title: 'Ayudha Pooja Celebrations Across Daily Fresh Plants in Tamil Nadu',
    excerpt: 'Celebrating the spirit of Ayudha Pooja with our entire team across all manufacturing facilities in Tamil Nadu.',
    date: 'Oct 1, 2025',
    category: 'Events',
    image: '/images/insights/ayudha-pooja.jpg',
  },
  {
    id: 2,
    title: 'Unveils New Community Park at Reliance Mall, Nagercoil',
    excerpt: 'Richi Food Products inaugurates a new community park dedicated to environmental conservation and public wellness.',
    date: 'Sep 19, 2025',
    category: 'CSR',
    image: '/images/insights/community-park.jpg',
  },
  {
    id: 3,
    title: 'Precision & Innovation: PET Division in PET Beverage Bottle Production',
    excerpt: 'Exploring how our advanced PET division revolutionizes beverage bottle production with cutting-edge technology.',
    date: 'Dec 13, 2024',
    category: 'Innovation',
    image: '/images/insights/pet-division.jpg',
  },
  {
    id: 4,
    title: 'The Power of Teamwork: The Daily Fresh Family in Action',
    excerpt: 'See how collaboration and dedication drive excellence across every department of our organization.',
    date: 'Aug 20, 2024',
    category: 'Culture',
    image: '/images/insights/teamwork.jpg',
  },
  {
    id: 5,
    title: 'Commitment to Purity: Meriba Packaged Drinking Water Plants',
    excerpt: 'Understanding the rigorous quality standards that make Meriba water the choice of thousands.',
    date: 'Sep 11, 2024',
    category: 'Products',
    image: '/images/insights/meriba-water.jpg',
  },
  {
    id: 6,
    title: 'What Makes Richi Food Products Stand Out?',
    excerpt: 'A deep dive into what sets us apart in the competitive beverage industry of South India.',
    date: 'Feb 11, 2025',
    category: 'Company',
    image: '/images/insights/why-richi.jpg',
  },
  {
    id: 7,
    title: 'Why Richi? A Revolution in India\'s Beverage Market',
    excerpt: 'Discover how we\'re changing the way India thinks about quality beverages and sustainable practices.',
    date: 'Oct 29, 2024',
    category: 'Market',
    image: '/images/insights/revolution.jpg',
  },
  {
    id: 8,
    title: 'The Taste of Tradition, Reimagined',
    excerpt: 'Blending centuries of Tamil tradition with modern innovation in every bottle we produce.',
    date: 'Oct 20, 2024',
    category: 'Heritage',
    image: '/images/insights/tradition.jpg',
  },
  {
    id: 9,
    title: 'Our Growth Story',
    excerpt: 'From humble beginnings in 2008 to becoming a leading beverage manufacturer in South India.',
    date: 'Sep 13, 2024',
    category: 'Company',
    image: '/images/insights/growth-story.jpg',
  },
  {
    id: 10,
    title: 'A Proud Moment: Richi Wins Modern Plastics Award 2024',
    excerpt: 'Recognition for our excellence in sustainable packaging and innovative PET solutions.',
    date: 'Jun 11, 2024',
    category: 'Awards',
    image: '/images/insights/plastics-award.jpg',
  },
]

const categories = ['All', 'Events', 'CSR', 'Innovation', 'Culture', 'Products', 'Company', 'Market', 'Heritage', 'Awards']

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredArticles = articles.filter(article => {
    const matchCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <PageWrapper>
      {/* ══════════ 1. HERO ══════════ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 30%, white 70%, #f3f4f6 100%)' }}
      >
        {/* Leaf texture */}
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
            <span className="text-[#7A4A2A]">Insights</span>
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
                News & Stories
              </span>
              <h1
                className="font-black leading-tight text-[#1A0C04] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Latest Insights &<br />
                <span className="text-[#F97316]">Industry Updates</span>
              </h1>
              <p className="text-[#4A2800]/60 max-w-2xl mx-auto leading-relaxed text-lg">
                Stay updated with our latest news, blog articles, events, and industry insights from Richi Food Products.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. SEARCH & FILTER ══════════ */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ 3. ARTICLES GRID ══════════ */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, white 0%, #f9fafb 40%, white 65%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/15 top-10 -left-40" delay={1} />
        <Orb className="w-96 h-96 bg-[#F97316]/10 bottom-0 -right-32" delay={3} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 bg-white flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm hover:gap-4 transition-all"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════ 4. CTA ══════════ */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#2D1608] to-[#8B5A2B] overflow-hidden">
        <Orb className="w-96 h-96 bg-white/5 top-1/2 -right-20 -translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Have a Story to Share?
            </h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Do you have insights, news, or a success story related to Richi Food Products? We'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7A4A2A] font-black rounded-full hover:bg-[#FFF8EE] transition-colors duration-300 shadow-xl shadow-black/20"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
