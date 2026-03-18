import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Users, Target, Eye, Shield, Zap, Globe, Leaf, Star, Award,
  ChevronLeft, ChevronRight, ArrowRight, Phone, Mail, MapPin,
  FlaskConical, Truck, HeartHandshake, BadgeCheck
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const timeline = [
  {
    year: '2008',
    title: 'The Beginning',
    desc: 'Richi Food Products was founded with a vision to deliver premium quality beverages to consumers. First manufacturing facility established in Tamil Nadu. Production began with fruit drinks — mango, apple, and guava. Started with just 10 employees.',
    img: '/images/about/timeline/2008.jpg',   // 🔁 replace
    tag: 'Founded',
    color: 'bg-[#C2641F]',
  },
  {
    year: '2010',
    title: 'First Machines',
    desc: 'Introduced an automatic labeling machine and an injection molding machine, enabling in-house preform and bottle production for greater quality control.',
    img: '/images/about/timeline/2010.jpg',   // 🔁 replace
    tag: 'Automation',
    color: 'bg-[#FB923C]',
  },
  {
    year: '2011',
    title: 'Carbonated Drinks',
    desc: 'Introduced a manual carbonated beverages filling machine, expanding into carbonated soft drinks (CSD) alongside fruit beverages.',
    img: '/images/about/timeline/2011.jpg',   // 🔁 replace
    tag: 'Expansion',
    color: 'bg-sky-500',
  },
  {
    year: '2012',
    title: 'Jinthaaa & Jeera',
    desc: 'Launched Jinthaaa — inspired by Tamil Nadu\'s traditional grape flavour — and Jeera Masala Soda. Introduced bottle blowing machine for full in-house production.',
    img: '/images/about/timeline/2012.jpg',   // 🔁 replace
    tag: 'New Products',
    color: 'bg-purple-500',
  },
  {
    year: '2016',
    title: 'Full Automation',
    desc: 'Upgraded to a fully automated high-speed production line for fruit & carbonated drinks. Introduced aseptic packs in mango, apple, guava, pomegranate, and lychee. Entered hospitality with Hotel Aradhana Inn, Yercaud.',
    img: '/images/about/timeline/2016.jpg',   // 🔁 replace
    tag: 'Scale-up',
    color: 'bg-[#FB923C]',
  },
  {
    year: '2017',
    title: 'Meriba Paneer Soda + Wind Energy',
    desc: 'Launched Meriba Paneer Soda, capturing Tamil Nadu\'s traditions. Invested in wind energy projects across Panankudi, Tenkasi, and Uthumalai.',
    img: '/images/about/timeline/2017.jpg',   // 🔁 replace
    tag: 'Sustainability',
    color: 'bg-[#C2641F]',
  },
  {
    year: '2018',
    title: 'Second Plant & Hospitality',
    desc: 'Opened second manufacturing unit in Sappanipatti, Krishnagiri. Advanced preform design for high-speed injection molding. Acquired Kolaahalam Mainland Resorts and Spa, Yercaud.',
    img: '/images/about/timeline/2018.jpg',   // 🔁 replace
    tag: 'Growth',
    color: 'bg-rose-500',
  },
  {
    year: '2019',
    title: 'Third Plant',
    desc: 'Established a third beverage plant in Pothapuram, Krishnagiri, to meet rapidly growing product demand across multiple regions.',
    img: '/images/about/timeline/2019.jpg',   // 🔁 replace
    tag: 'Expansion',
    color: 'bg-indigo-500',
  },
  {
    year: '2020',
    title: 'Solar Energy',
    desc: 'Established a solar power plant in Kadambur, integrating clean energy into manufacturing and reducing dependence on conventional power.',
    img: '/images/about/timeline/2020.jpg',   // 🔁 replace
    tag: 'Green Energy',
    color: 'bg-[#F97316]',
  },
  {
    year: '2021',
    title: 'MERIBA Water Launch',
    desc: 'Ventured into packaged drinking water with the MERIBA brand. Set up a state-of-the-art water packaging plant in Gangaikondan, Tirunelveli. Commissioned solar plant in Kangarakottai and began selling surplus energy.',
    img: '/images/about/timeline/2021.jpg',   // 🔁 replace
    tag: 'New Category',
    color: 'bg-cyan-500',
  },
  {
    year: '2022',
    title: 'AGNEE & PAALMAN',
    desc: 'Launched AGNEE Energy Drink, entering the energy segment. Introduced PAALMAN flavoured milk — Badam, Chocolate, Vanilla, Rose Milk, and Pista variants.',
    img: '/images/about/timeline/2022.jpg',   // 🔁 replace
    tag: 'New Products',
    color: 'bg-red-500',
  },
  {
    year: '2024',
    title: 'Ponneri Plant & Trichy Water',
    desc: 'Launched a new beverage plant in Ponneri, Tiruvallur. Expanded packaged drinking water operations in Manaparai, Trichy.',
    img: '/images/about/timeline/2024.jpg',   // 🔁 replace
    tag: 'Latest',
    color: 'bg-[#F97316]',
  },
]

const commitments = [
  { icon: Star,          title: 'Excellence',              desc: 'Dedicated to producing beverages that meet the highest quality standards, improving processes continuously.' },
  { icon: Zap,           title: 'Innovation',              desc: 'Continuously evolving with new beverages and cutting-edge production technologies.' },
  { icon: Leaf,          title: 'Sustainability',          desc: 'Significant investments in wind and solar power to minimise our environmental impact.' },
  { icon: Shield,        title: 'Responsibility',          desc: 'Fair labour practices, community support, and minimising our ecological footprint.' },
  { icon: HeartHandshake,title: 'Corporate Social Responsibility', desc: 'Supporting education, healthcare, and environmental sustainability in communities we serve.' },
  { icon: Users,         title: 'Community Engagement',   desc: 'Donations to local schools, special schools, and public health initiatives.' },
]

const strengths = [
  { icon: '🏭', title: 'Modern Facilities',   desc: 'Automated facilities ensure precision, hygiene, and consistency without human interference.' },
  { icon: '💡', title: 'Innovation',           desc: 'Constantly refining products through R&D while maintaining traditional flavours.' },
  { icon: '🌿', title: 'Sustainability',        desc: 'Renewable energy and reduced plastic to improve quality and protect the environment.' },
  { icon: '✅', title: 'Quality',               desc: 'Superior taste and high production standards across all our products.' },
  { icon: '💰', title: 'Affordable Price',      desc: 'Premium quality beverages at prices that are accessible to all.' },
  { icon: '🏆', title: 'Market Leadership',     desc: 'A trusted name in South India with a strong distribution network.' },
  { icon: '🥤', title: 'Wide Product Range',    desc: 'Fruit drinks, carbonated beverages, flavored milk, energy drinks, and packaged water.' },
  { icon: '🤝', title: 'Ethical Values',        desc: 'We believe in fairness, integrity, and community support.' },
]

const services = [
  { icon: Truck,         title: 'Reliable Distribution',    desc: 'Extensive network across South India ensures timely deliveries and efficient supply chain management.' },
  { icon: Users,         title: 'Customer Focus',           desc: 'Prioritising consumer preferences and feedback to meet diverse tastes with precision.' },
  { icon: HeartHandshake,title: 'Supportive Partnerships',  desc: 'Collaborating with distributors, wholesalers, retailers, and vendors for mutual growth.' },
]

const labPoints = [
  'Cutting-Edge Technology: Advanced tools for microbiological, physicochemical, and packaging integrity testing.',
  'Expert Team: Skilled microbiologists, chemists, and quality analysts conducting thorough quality checks.',
  'End-to-End Testing: Continuous monitoring of raw materials, in-process samples, and finished products.',
  'R&D Innovation: Drives creation of new flavours and formulations to meet changing consumer preferences.',
  'Regulatory Compliance: Meets both national and international safety and quality standards.',
  'Sustainability Focus: Eco-friendly lab practices that reduce waste while ensuring precise results.',
]

// Pillars of Strength — team directory
// Replace img paths and fill in real names/roles
const pillars = [
  { name: 'Issac Bright',         role: 'Managing Director',              img: '/images/about/team/issac.jpg' },
  { name: 'Jayabharathi R',       role: 'Director',                       img: '/images/about/team/jayabharathi.jpg' },
  { name: 'Balamurugan R',        role: 'Financial Advisor',              img: '/images/about/team/balamurugan.jpg' },
  { name: 'Sandira Bose G',       role: 'General Manager',                img: '/images/about/team/sandira.jpg' },
  { name: 'Thennarasu S',         role: 'Administrative Officer',         img: '/images/about/team/thennarasu.jpg' },
  { name: 'Sulaiman A',           role: 'Accounts Manager',               img: '/images/about/team/sulaiman.jpg' },
  { name: 'Kanakaraju N',         role: 'Asst. Manager Accounts',         img: '/images/about/team/kanakaraju.jpg' },
  { name: 'Tamilmani E',          role: 'Asst. Manager Accounts',         img: '/images/about/team/tamilmani.jpg' },
  { name: 'Raja T',               role: 'HR Incharge',                    img: '/images/about/team/raja.jpg' },
  { name: 'Sekar G D',            role: 'Production Manager',             img: '/images/about/team/sekar.jpg' },
  { name: 'Sakthivel P',          role: 'Production Manager',             img: '/images/about/team/sakthivel.jpg' },
  { name: 'Dhayalan R',           role: 'Regional Sales Manager, TN',     img: '/images/about/team/dhayalan.jpg' },
  { name: 'Lawrence M',           role: 'Regional Sales Manager, KA',     img: '/images/about/team/lawrence.jpg' },
  { name: 'Benil Isac Bright',    role: 'Marketing & Sales Coordinator',  img: '/images/about/team/benil.jpg' },
  { name: 'Uma E',                role: 'Sales & Production Coordinator', img: '/images/about/team/uma.jpg' },
]

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */

const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
)

// Dashed image placeholder — shown when src is empty/broken
function ImgBox({ src, alt = '', className = '', objectFit = 'object-cover', label = 'Add Image', rounded = 'rounded-2xl', aspect }) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${aspect} ${className} bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-gray-200`}>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${objectFit} ${rounded}`}
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBB74" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest text-center px-3">{label}</span>
      </div>
    </div>
  )
}

// Team photo placeholder
function TeamPhoto({ src, alt, size = 'w-20 h-20' }) {
  return (
    <div className={`relative ${size} rounded-full overflow-hidden bg-white border-2 border-gray-200 shrink-0`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBBB74" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════ */
export default function About() {

  // Commitment carousel
  const [commitIdx, setCommitIdx] = useState(0)
  const commitVisible = 3
  const commitMax = commitments.length - commitVisible
  const prevCommit = () => setCommitIdx(i => Math.max(0, i - 1))
  const nextCommit = () => setCommitIdx(i => Math.min(commitMax, i + 1))

  // Pillars carousel
  const [pillarIdx, setPillarIdx] = useState(0)
  const pillarVisible = 5
  const pillarMax = pillars.length - pillarVisible
  const prevPillar = () => setPillarIdx(i => Math.max(0, i - 1))
  const nextPillar = () => setPillarIdx(i => Math.min(pillarMax, i + 1))

  return (
    <PageWrapper>

      {/* ══════════ 1. HERO ══════════
          Soft green gradient background
          Two headline lines + floating product bottle images on left & right
          Matches dffipl.com's company overview section appearance
      */}
      <section
        className="relative pt-32 pb-0 overflow-hidden"
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
        <Orb className="w-80 h-80 bg-gray-200/20 top-10 -right-20" />
        <Orb className="w-64 h-64 bg-yellow-200/20 top-20 -left-16" delay={2} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-[#F97316]/60 font-semibold uppercase tracking-widest mb-8"
          >
            <Link to="/" className="hover:text-[#7A4A2A]">Home</Link>
            <span>/</span>
            <span className="text-[#7A4A2A]">About</span>
          </motion.div>

          {/* Hero layout — product images float left & right, text in centre */}
          <div className="grid grid-cols-[180px_1fr_180px] md:grid-cols-[220px_1fr_220px] gap-4 items-end">

            {/* Left floating product card */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="self-end mb-8"
            >
              {/* 🔁 Replace with your product image — e.g. Mango bottle on yellow card */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: '#F5C518' }}>
                <img
                  src="/images/about/hero-product-left.png"   // 🔁 e.g. mango bottle
                  alt="Richi Mango"
                  className="w-full h-full object-contain px-4 pt-4 drop-shadow-xl"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-yellow-200/50 text-[10px] font-bold uppercase tracking-widest">Product Image</span>
                </div>
              </div>
            </motion.div>

            {/* Centre text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center pb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#FFD9A8] text-[#7A4A2A] text-xs font-bold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FB923C] animate-pulse" />
                Since 2008
              </span>
              <h1
                className="font-black leading-tight text-[#1A0C04] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                Richi Food Products
                <br />
                <span className="text-[#F97316]">Private Limited</span>
              </h1>
              <p className="text-[#4A2800]/60 max-w-xl mx-auto leading-relaxed text-lg mb-4">
                Founded in 2008, we have built a reputation as a leading provider of high-quality
                beverages and packaged drinking water across South India.
              </p>
              <p className="text-[#4A2800]/50 max-w-xl mx-auto leading-relaxed">
                Our journey is driven by a commitment to excellence, innovation, and sustainability —
                transforming from a local player into an industry leader.
              </p>
            </motion.div>

            {/* Right floating product card */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 8 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="self-end mb-8"
            >
              {/* 🔁 Replace with your product image — e.g. Meriba bottle on pink card */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: '#F7A8B0' }}>
                <img
                  src="/images/about/hero-product-right.png"  // 🔁 e.g. meriba bottle
                  alt="Richi Meriba"
                  className="w-full h-full object-contain px-4 pt-4 drop-shadow-xl"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-pink-200/50 text-[10px] font-bold uppercase tracking-widest">Product Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="w-full overflow-hidden leading-none mt-4">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════ 2. CORPORATE FILM ══════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8]">
              Our Corporate Film
            </span>
            {/* 🔁 Replace src with your YouTube embed URL */}
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-900 shadow-2xl border border-gray-200 group">
              <iframe
                src=""   // 🔁 e.g. "https://www.youtube.com/embed/mJfvmFeiHu0"
                title="Richi Corporate Film"
                className="w-full h-full"
                allowFullScreen
              />
              {/* Placeholder when no embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#FBBB74" stroke="none">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Corporate Film</p>
                <p className="text-white/25 text-xs">Paste YouTube embed URL in src above</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 3. OUR JOURNEY — TIMELINE ══════════ */}
      <section
        className="py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF8EE 0%, #FFF1DC 100%)' }}
      >
        <Orb className="w-96 h-96 bg-gray-200/15 top-0 right-0" />

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8] shadow-sm">
              Our Journey
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              16 Years of <span className="text-[#F97316]">Growth</span>
            </h2>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-16">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'md:[&>*:first-child]:order-last'}`}
                  >
                    {/* Content side */}
                    <div className={`${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest ${item.color}`}>
                          {item.tag}
                        </span>
                        <span
                          className="text-4xl font-black text-[#7A4A2A]/20"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                    </div>

                    {/* Centre dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                      <div className={`w-5 h-5 rounded-full ${item.color} border-4 border-white shadow-lg`} />
                    </div>

                    {/* Image side */}
                    {/* 🔁 Replace item.img with your milestone image path */}
                    <ImgBox
                      src={item.img}
                      alt={item.title}
                      label={`${item.year} Image`}
                      aspect="aspect-[4/3]"
                      rounded="rounded-2xl"
                      objectFit="object-cover"
                      className={`shadow-xl ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 4. OUR COMMITMENT — CAROUSEL ══════════ */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
        <Orb className="w-[500px] h-[500px] bg-[#F97316]/6 -top-48 -right-32" delay={0} />
        <Orb className="w-[400px] h-[400px] bg-[#F97316]/4 bottom-20 -left-40" delay={2} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8] shadow-sm">
              Our Commitment
            </span>
            <div className="flex items-end justify-between gap-4">
              <h2
                className="text-4xl md:text-5xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Core <span className="text-[#F97316]">Values</span>
              </h2>
              <div className="flex gap-2 shrink-0">
                <motion.button
                  onClick={prevCommit}
                  disabled={commitIdx === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD9A8] flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextCommit}
                  disabled={commitIdx >= commitMax}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD9A8] flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
            <p className="text-gray-500 mt-3 max-w-xl leading-relaxed">
              At Richi Food Products, we hold ourselves to the highest standards in every aspect of our operations.
            </p>
          </motion.div>

          {/* Cards — slide window */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `calc(-${commitIdx} * (100% / ${commitVisible} + 16px))` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex gap-4"
            >
              {commitments.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 p-10 shadow-lg hover:shadow-2xl hover:border-[#F97316] transition-all duration-500 shrink-0 group relative overflow-hidden"
                  style={{ width: `calc((100% - ${(commitVisible - 1) * 16}px) / ${commitVisible})` }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-[#FFF8EE] flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                  >
                    <c.icon size={28} className="text-[#F97316] group-hover:text-[#A8430F] transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#F97316] transition-colors duration-300 relative z-10">{c.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 5. MISSION & VISION ══════════ */}
      <section className="py-0">
        {/* Mission */}
        <div className="grid md:grid-cols-2 min-h-[400px]">
          {/* Image */}
          {/* 🔁 Replace with your mission image */}
          <div className="relative overflow-hidden">
            <img
              src="/images/about/mission.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-[#1A0C04]/60 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Target size={28} className="text-white/60" />
              </div>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Mission Image</span>
            </div>
          </div>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#2D1608] flex items-center px-12 py-20"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Our Mission
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Quality for Every Consumer
              </h2>
              <p className="text-white/70 leading-relaxed text-base">
                Our mission is to produce high-quality beverages and packaged drinking water that cater to diverse
                consumer preferences while remaining affordable. We integrate sustainability at the core of our
                operations by adopting renewable energy solutions and reducing our environmental impact.
                We foster innovation through cutting-edge technology and deep consumer insights, enriching
                lives with every product we offer.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 min-h-[400px]">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 flex items-center px-12 py-20"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Our Vision
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Growth with Environmental Stewardship
              </h2>
              <p className="text-white/70 leading-relaxed text-base">
                At Richi, we aspire to create a future where business growth is seamlessly intertwined
                with environmental stewardship. Our goal is to build a legacy defined by trust, quality,
                and sustainability — values that resonate with our consumers, partners, and the planet.
                We are committed to driving continuous innovation, leading the industry with sustainable
                practices, and consistently exceeding customer expectations.
              </p>
            </div>
          </motion.div>
          {/* Image */}
          {/* 🔁 Replace with your vision image */}
          <div className="relative overflow-hidden">
            <img
              src="/images/about/vision.jpg"
              alt="Our Vision"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gray-900/60 flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Eye size={28} className="text-white/60" />
              </div>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Vision Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 6. ADVANCED LABORATORY ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8]">
              Quality Assurance
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Advanced <span className="text-[#F97316]">Laboratory</span>
            </h2>
            <ul className="space-y-4">
              {labPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FFE9C8] flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeCheck size={14} className="text-[#F97316]" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-8 text-[#7A4A2A] font-semibold italic text-sm border-l-4 border-[#FBBB74] pl-4">
              "Our laboratory is key to delivering safe, consistent, and high-quality beverages."
            </p>
          </motion.div>

          {/* Lab image box */}
          {/* 🔁 Replace with your laboratory image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ImgBox
              src="/images/about/laboratory.jpg"
              alt="Advanced Laboratory"
              label="Laboratory Image"
              aspect="aspect-[4/3]"
              rounded="rounded-3xl"
              className="shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════ 7. OUR STRENGTHS ══════════ */}
      <section
        className="py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF8EE 0%, #FFF1DC 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8] shadow-sm">
              Why Choose Us
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our <span className="text-[#F97316]">Strengths</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-[#FFF8EE]"
              >
                {/* 🔁 Optionally replace emoji with an <img> of your strength icons */}
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-black text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 8. OUR SERVICES ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8]">
              What We Offer
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our <span className="text-[#F97316]">Services</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-16">
              At Richi Food Products, we prioritise exceptional service with a customer-focused approach,
              exceeding expectations and fostering lasting relationships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="border border-[#FFD9A8] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Service icon box — 🔁 optionally replace with an <img> */}
                <div className="w-16 h-16 rounded-2xl bg-[#FFF8EE] flex items-center justify-center mb-6 group-hover:bg-[#F97316] transition-colors duration-300">
                  <s.icon size={28} className="text-[#F97316] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 9. LOOKING AHEAD ══════════ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#2D1608] to-[#4A2800] relative overflow-hidden">
        <Orb className="w-96 h-96 bg-white/5 top-1/2 -right-20 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Looking Ahead
            </span>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Next Chapter
            </h2>
            <p className="text-white/80 leading-relaxed text-lg mb-4">
              As we continue to grow, Richi Food Products remains committed to upholding our core values of
              <strong className="text-white"> integrity</strong>,
              <strong className="text-white"> quality</strong>, and
              <strong className="text-white"> social responsibility</strong>.
            </p>
            <p className="text-white/70 leading-relaxed mb-10">
              We are excited about the opportunities ahead as we expand our operations, develop new products,
              and make a positive contribution to society and the environment.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7A4A2A] font-bold rounded-full hover:bg-[#FFF8EE] transition-colors duration-300 shadow-xl"
            >
              Explore Our Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 10. OUR TEAM PHOTO STRIP ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8]">
              Our People
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our <span className="text-[#F97316]">Team</span>
            </h2>
          </motion.div>

          {/* Auto-scrolling team photo strip */}
          {/* 🔁 Replace src paths in teamPhotos array below with your team photos */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 w-max"
            >
              {[
                '/images/about/team-photos/photo1.jpg',
                '/images/about/team-photos/photo2.jpg',
                '/images/about/team-photos/photo3.jpg',
                '/images/about/team-photos/photo4.jpg',
                '/images/about/team-photos/photo5.jpg',
                '/images/about/team-photos/photo6.jpg',
                '/images/about/team-photos/photo7.jpg',
                '/images/about/team-photos/photo8.jpg',
                '/images/about/team-photos/photo9.jpg',
                // duplicated for seamless loop
                '/images/about/team-photos/photo1.jpg',
                '/images/about/team-photos/photo2.jpg',
                '/images/about/team-photos/photo3.jpg',
                '/images/about/team-photos/photo4.jpg',
                '/images/about/team-photos/photo5.jpg',
                '/images/about/team-photos/photo6.jpg',
                '/images/about/team-photos/photo7.jpg',
                '/images/about/team-photos/photo8.jpg',
                '/images/about/team-photos/photo9.jpg',
              ].map((src, i) => (
                <div key={i} className="relative w-64 h-48 rounded-2xl overflow-hidden shrink-0 bg-[#FFF8EE] border border-[#FFD9A8]">
                  <img
                    src={src}
                    alt={`Team photo ${(i % 9) + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBB74" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span className="text-[#F5B49A] text-[9px] font-bold uppercase tracking-widest">Team Photo {(i % 9) + 1}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 11. LEADING THOUGHTS — FOUNDER ══════════ */}
      <section
        className="py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #FFF8EE 0%, #FFF1DC 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8] shadow-sm">
              Leading Thoughts
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              A Message from Our <span className="text-[#F97316]">Founder</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* Founder letter */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl border border-[#FFD9A8] relative"
            >
              <div className="text-6xl text-[#FFE9C8] font-black leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>"</div>
              <p className="text-gray-600 leading-relaxed mb-5">
                When we began this journey in 2008, our vision was simple yet ambitious: to deliver high quality,
                refreshing beverages that resonate with the taste and values of our consumers. From a modest start
                with just 12 employees and a single manufacturing facility, our journey has been one of passion,
                resilience, and a commitment to excellence.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Over the years, we have grown into a trusted name in the beverage industry, offering a diverse
                portfolio that includes fruit drinks, carbonated beverages, flavored milk, energy drinks, and
                packaged drinking water.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                As we look ahead, we remain committed to expanding our product range, improving our operations,
                and delivering exceptional experiences to our consumers.
              </p>
              <div className="border-t border-[#FFD9A8] pt-6">
                <p className="text-gray-400 text-sm mb-1">Warm regards,</p>
                <p className="font-black text-gray-900 text-lg">Shri. T. Issac Bright</p>
                <p className="text-[#F97316] text-sm font-semibold">Founder & Managing Director</p>
                <p className="text-gray-400 text-xs">Richi Food Products</p>
              </div>
            </motion.div>

            {/* Founder photo */}
            {/* 🔁 Replace with founder portrait image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImgBox
                src="/images/about/founder.jpg"
                alt="Shri. T. Issac Bright"
                label="Founder Photo"
                aspect="aspect-[3/4]"
                rounded="rounded-3xl"
                objectFit="object-cover"
                className="shadow-2xl max-w-xs mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 12. PILLARS OF STRENGTH — TEAM DIRECTORY ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-[#FFF8EE] text-[#7A4A2A] rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#FFD9A8]">
              Our Leadership
            </span>
            <div className="flex items-end justify-between gap-4">
              <h2
                className="text-4xl md:text-5xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Pillars of <span className="text-[#F97316]">Strength</span>
              </h2>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={prevPillar}
                  disabled={pillarIdx === 0}
                  className="w-10 h-10 rounded-full border-2 border-[#FFD9A8] flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextPillar}
                  disabled={pillarIdx >= pillarMax}
                  className="w-10 h-10 rounded-full border-2 border-[#FFD9A8] flex items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Sliding carousel */}
          <div className="overflow-hidden mt-10">
            <motion.div
              animate={{ x: `calc(-${pillarIdx} * (100% / ${pillarVisible} + 16px))` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex gap-4"
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="shrink-0 flex flex-col items-center text-center group cursor-pointer"
                  style={{ width: `calc((100% - ${(pillarVisible - 1) * 16}px) / ${pillarVisible})` }}
                >
                  {/* Profile photo */}
                  {/* 🔁 Replace p.img with your team member photo path */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#FFF8EE] border-4 border-[#FFD9A8] group-hover:border-[#FBBB74] transition-colors duration-300 mb-4 shadow-lg">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBBB74" strokeWidth="1.5">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-black text-gray-900 text-sm leading-tight mb-1">{p.name}</h3>
                  <p className="text-[#F97316] text-xs font-semibold">{p.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </PageWrapper>
  )
}