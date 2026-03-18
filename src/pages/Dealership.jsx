import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight, Send, CheckCircle } from 'lucide-react'
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

const regions = [
  {
    name: 'Tamil Nadu, Pondicherry & Andaman',
    contacts: [
      { name: 'Mr. Dhayalan', title: 'Regional Sales Manager (RSM)', phone: '+91-9884412151' },
    ],
  },
  {
    name: 'Karnataka & Goa',
    contacts: [
      { name: 'Mr. Lawrence', title: 'Zone Sales Manager (ZSM)', phone: '+91-9448459244' },
      { name: 'Mr. Maranna', title: 'Area Sales Manager (ASM)', phone: '+91-9886709369' },
      { name: 'Mr. Sathish Shetty', title: 'Area Sales Manager (ASM)', phone: '+91-9844144405' },
    ],
  },
  {
    name: 'Kerala',
    contacts: [
      { name: 'Mr. Jaison', title: 'Area Sales Manager (ASM) - South', phone: '+91-9544202147' },
      { name: 'Mr. Abdul Rasheed', title: 'Area Sales Manager (ASM) - North', phone: '+91-9544202153' },
      { name: 'Mr. Mahesh', title: 'Territory Sales Officer (TSO) - Central', phone: '+91-9747210642' },
    ],
  },
  {
    name: 'Andhra Pradesh & Telangana',
    contacts: [
      { name: 'Mr. Sathish Kumar', title: 'Regional Sales Manager (RSM)', phone: '+91-9849381311' },
      { name: 'Mr. Jakkir Hussain', title: 'Area Sales Manager (ASM) - Rayalaseema', phone: '+91-9493630356' },
      { name: 'Mr. Vishnu Vardhan', title: 'Area Sales Manager (ASM) - Telangana', phone: '+91-9490707065' },
    ],
  },
]

const benefits = [
  {
    title: 'Premium Brand Support',
    desc: 'Leverage our established brand reputation and strong market presence across South India.',
  },
  {
    title: 'Comprehensive Training',
    desc: 'Full training on products, market strategies, and sales techniques for your team.',
  },
  {
    title: 'Marketing Support',
    desc: 'Co-branded marketing materials, promotional campaigns, and digital marketing support.',
  },
  {
    title: 'Competitive Margins',
    desc: 'Industry-leading margins that ensure healthy profitability for your dealership.',
  },
  {
    title: 'Logistics Support',
    desc: 'Efficient supply chain management and timely product delivery to your location.',
  },
  {
    title: 'Dedicated Regional Support',
    desc: 'Assigned regional manager providing ongoing support and business development guidance.',
  },
]

export default function Dealership() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', location: '', message: '' })
    }, 5000)
  }

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
            <span className="text-[#7A4A2A]">Dealership</span>
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
                Partnership Opportunity
              </span>
              <h1
                className="font-black leading-tight text-[#1A0C04] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Become a Richi<br />
                <span className="text-[#F97316]">Dealership Partner</span>
              </h1>
              <p className="text-[#4A2800]/60 max-w-2xl mx-auto leading-relaxed text-lg">
                Join our growing network of successful distributors across South India. Build a profitable business with one of the region's most trusted beverage brands.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. WHY PARTNER WITH US ══════════ */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 35%, white 60%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -right-32" />
        <Orb className="w-96 h-96 bg-[#F97316]/15 bottom-20 -left-40" delay={2} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeading eyebrow="Partnership Benefits" title="Why Choose Richi" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="border-2 border-gray-200 rounded-3xl p-8 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EE] flex items-center justify-center mb-4 text-[#F97316]">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. REGIONAL CONTACTS ══════════ */}
      <section
        className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF8EE 0%, #f9fafb 50%, #F3F4F6 100%)' }}
      >
        <Orb className="w-96 h-96 bg-[#F97316]/10 top-0 -right-32" />

        <div className="relative max-w-7xl mx-auto z-10">
          <SectionHeading eyebrow="Contact Our Team" title="Regional Dealership Managers" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-white rounded-3xl border-2 border-gray-200 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-[#F97316]" size={24} />
                  <h3 className="text-xl font-black text-gray-900">{region.name}</h3>
                </div>

                <div className="space-y-4">
                  {region.contacts.map((contact, cidx) => (
                    <motion.div
                      key={cidx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx * 0.1) + (cidx * 0.05) }}
                      whileHover={{ x: 4 }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF8EE] to-white border-2 border-[#FFD9A8] hover:border-[#F97316] transition-all duration-300"
                    >
                      <div className="font-bold text-gray-900 text-base mb-1">{contact.name}</div>
                      <div className="text-sm text-[#7A4A2A] font-semibold mb-2">{contact.title}</div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm hover:gap-4 transition-all"
                      >
                        <Phone size={14} /> {contact.phone}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. INQUIRY FORM ══════════ */}
      <section className="py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Get in Touch" title="Send Us Your Inquiry" />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Location/City *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
                  placeholder="Your city/region"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent resize-none"
                placeholder="Tell us about your business and dealership interests..."
              />
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-[#F97316] text-white font-black rounded-full hover:bg-[#A8430F] transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F97316]/20"
            >
              {submitted ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Inquiry
                </>
              )}
            </motion.button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm text-center"
              >
                Thank you! Our dealership team will contact you shortly.
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>

      {/* ══════════ 5. CTA ══════════ */}
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
              Ready to Partner with Us?
            </h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Call your regional manager directly or fill out the form above. We look forward to growing together!
            </p>
            <a
              href="tel:1800-889-9070"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7A4A2A] font-black rounded-full hover:bg-[#FFF8EE] transition-colors duration-300 shadow-xl shadow-black/20"
            >
              <Phone size={18} /> Call: 1800-889-9070
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
