import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
            <div className="font-black text-2xl tracking-tight bg-gradient-to-r from-[#F97316] to-[#A8430F] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Richi
              </div>
              <div>
                <div className="font-black text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Food Products</div>
                <div className="text-xs text-[#FFD9A8] tracking-widest uppercase">Premium Beverages</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Premium beverage manufacturer from Tamil Nadu. Delivering quality fruit juices, carbonated drinks, and packaged water with excellence since 2008.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-full bg-[#F97316]/20 text-xs text-[#FFD9A8] border border-[#F97316]/30">FSSAI Certified</div>
              <div className="px-3 py-1.5 rounded-full bg-[#F97316]/20 text-xs text-[#FFD9A8] border border-[#F97316]/30">Quality Assured</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-lg mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-[#F97316] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F97316] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-lg mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#F97316] mt-0.5 shrink-0" />
                <a href="mailto:md@richifoodproducts.com" className="text-white/70 hover:text-[#F97316] transition-colors text-sm">
                  md@richifoodproducts.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#F97316] mt-0.5 shrink-0" />
                <div className="text-sm text-white/70">
                  <div>99443 66592</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#F97316] mt-0.5 shrink-0" />
                <p className="text-white/70 text-sm">
                  Namakkal, Tamil Nadu, India
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Richi Food Products. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-white/40 hover:text-[#F97316] text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-[#F97316] text-xs transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}