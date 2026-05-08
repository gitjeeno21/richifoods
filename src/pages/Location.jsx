import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Droplets, Leaf, Star } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { PAGE_SEO, buildBreadcrumbSchema } from '../seo/seoConfig'

const locationsData = {
  'chennai': {
    city: 'Chennai',
    title: 'Best Premium Beverages & Fresh Juice in Chennai | CILO',
    heading: 'The Finest Refreshment in Chennai',
    description: 'Discover why CILO is the most loved premium juice brand in Chennai. Crafted with fresh, natural ingredients for the perfect taste.',
    image: '/images/products/mango.png',
  },
  'coimbatore': {
    city: 'Coimbatore',
    title: 'Premium Healthy Drinks in Coimbatore | CILO Juice',
    heading: 'Pure & Fresh Juices in Coimbatore',
    description: 'Experience the ultimate taste of health with CILO in Coimbatore. Best natural and organic drink selections.',
    image: '/images/products/apple.png',
  }
}

export default function Location() {
  const { city } = useParams()
  const locationInfo = locationsData[city?.toLowerCase()]

  if (!locationInfo) {
    return (
      <PageWrapper title="Location Not Found">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
            <Link to="/" className="text-[#F97316] hover:underline">Return Home</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const schema = [
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/location' },
      { name: locationInfo.city, path: `/location/${slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      "name": `CILO Juice ${locationInfo.city}`,
      "image": "https://richifoodproducts.com/logo.png",
      "description": locationInfo.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": locationInfo.city,
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "telephone": "+91 94435 18521",
      "servesCuisine": "Beverages, Juices"
    }
  ]

  return (
    <PageWrapper
      title={locationInfo.title}
      description={locationInfo.description}
      url={`/location/${slug}`}
      keywords={`${locationInfo.city} juice, premium drinks ${locationInfo.city}, best juice brand ${locationInfo.city}, CILO ${locationInfo.city}`}
      schema={schema}
    >
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF8F3] text-[#F97316] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#FFD9A8]">
                <MapPin size={14} /> Available in {locationInfo.city}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2D1608] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {locationInfo.heading}
              </h1>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                {locationInfo.description} Whether you're looking for an energizing morning boost or a refreshing afternoon treat, our premium lineup is carefully distributed across {locationInfo.city} for your convenience.
              </p>
              
              <div className="flex gap-4">
                <Link to="/products" className="px-8 py-4 bg-[#F97316] text-white font-bold rounded-full shadow-lg shadow-[#F97316]/30 hover:bg-[#E86205] transition-colors inline-flex items-center gap-2">
                  Explore Products <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/20 to-transparent rounded-full blur-3xl -z-10" />
              <img 
                src={locationInfo.image} 
                alt={`Premium juices in ${locationInfo.city}`} 
                className="w-full h-auto max-h-[500px] object-contain mx-auto drop-shadow-[0_20px_40px_rgba(249,115,22,0.2)] hover:scale-105 transition-transform duration-700 p-4"
              />
            </motion.div>

          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8 mt-32">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Sourced from the finest farms in Tamil Nadu.' },
              { icon: Droplets, title: 'Freshly Crafted', desc: 'Minimally processed to retain maximum nutrition.' },
              { icon: Star, title: 'Premium Quality', desc: 'Award-winning taste that Chennai loves.' }
            ].map((prop, idx) => (
              <motion.div 
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-[#FFF8F3] text-[#F97316] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <prop.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#2D1608] mb-3">{prop.title}</h3>
                <p className="text-stone-500">{prop.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
