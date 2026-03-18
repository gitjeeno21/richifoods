import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Building, Link as LinkIcon, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

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

const contactChannels = [
  {
    icon: Phone,
    label: 'Toll-Free',
    value: '1800-889-9070',
    desc: 'Call us anytime',
    link: 'tel:1800-889-9070',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'customercare@richifood.com',
    desc: 'Response within 24 hours',
    link: 'mailto:customercare@richifood.com',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Krishnagiri, Tamil Nadu',
    desc: 'India',
    link: 'https://maps.google.com/?q=Krishnagiri,Tamil+Nadu',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'www.richifoodproducts.com',
    desc: 'Online inquiry',
    link: '#',
  },
]

const reasons = [
  { icon: Building, text: 'Schedule a Plant Visit or Virtual Tour' },
  { icon: Clock, text: 'Discuss Contract Manufacturing Terms' },
  { icon: CheckCircle, text: 'Distribution & Dealership Opportunity' },
  { icon: Mail, text: 'Request Samples or Product Information' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', state: '', message: '' })
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
            <span className="text-[#7A4A2A]">Contact</span>
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
                Get in Touch
              </span>
              <h1
                className="font-black leading-tight text-[#1A0C04] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Ready to Talk<br />
                <span className="text-[#F97316]">Refreshment?</span>
              </h1>
              <p className="text-[#4A2800]/60 max-w-2xl mx-auto leading-relaxed text-lg">
                Whether you're interested in partnership, samples, or have a general inquiry, we're here to help. Reach out today!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. CONTACT CHANNELS ══════════ */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactChannels.map((channel, idx) => {
            const Icon = channel.icon
            return (
              <motion.a
                key={idx}
                href={channel.link}
                target={channel.link.startsWith('http') && !channel.link.startsWith('#') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EE] flex items-center justify-center mb-4 text-[#F97316] group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <div className="text-xs font-bold text-[#7A4A2A] uppercase tracking-widest mb-1">{channel.label}</div>
                <div className="font-black text-gray-900 text-base mb-1">{channel.value}</div>
                <div className="text-xs text-gray-500">{channel.desc}</div>
              </motion.a>
            )
          })}
        </div>
      </section>

      {/* ══════════ 3. MAIN CONTACT ══════════ */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 35%, white 60%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -left-32" />
        <Orb className="w-96 h-96 bg-[#F97316]/15 bottom-0 -right-20" delay={2} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Let's Build<br />
              <span className="text-[#F97316]">Something Great</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Whether you're a distributor, retailer, or prospective partner — we want to hear from you. Our team is ready to help.
            </p>

            <div className="space-y-4 mb-10">
              {reasons.map((reason, idx) => {
                const Icon = reason.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border-2 border-transparent hover:border-[#F97316] hover:bg-[#FFF8EE]/50 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#FFF8EE] flex items-center justify-center shrink-0 text-[#F97316]">
                      <Icon size={18} />
                    </div>
                    <span className="text-gray-700 text-sm font-semibold">{reason.text}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl border-2 border-[#FFD9A8] bg-gradient-to-br from-[#FFF8EE] to-white hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F97316] flex items-center justify-center shrink-0 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-black text-gray-900 text-base mb-2">Head Office</div>
                  <div className="text-gray-700 text-sm leading-relaxed font-semibold">
                    Krishnagiri District<br />
                    Tamil Nadu, India
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full rounded-3xl border border-gray-100 bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours with more information.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-gray-200 bg-white p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300" style={{ boxShadow: '0 20px 40px rgba(249, 115, 22, 0.08)' }}>
                <h3 className="text-2xl font-black text-gray-900 mb-8">Send us your inquiry</h3>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">State/Region</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                      placeholder="Your state or region"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-[#F97316] text-white font-black rounded-full hover:bg-[#A8430F] transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl shadow-[#F97316]/20"
                  >
                    <Send size={18} />
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
