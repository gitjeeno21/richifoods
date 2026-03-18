import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiCheck } from 'react-icons/fi'

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

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('500ml')

  // Mock product data - in real app, this would come from API
  const product = {
    id: 1,
    name: 'Richi Grape',
    flavor: 'grape',
    tagline: 'TASTY REFRESHING RICHI GRAPE',
    description: 'Experience the rich, sweet flavor of perfectly ripened grapes in every sip. Our grape juice is made from select grapes, carefully processed to preserve natural vitamins and antioxidants.',
    price: 3.99,
    sizes: [
      { size: '250ml', price: 2.49 },
      { size: '500ml', price: 3.99 },
      { size: '1L', price: 6.99 }
    ],
    features: [
      '100% Natural Grape Juice',
      'No Added Sugar',
      'Rich in Antioxidants',
      'Vitamin C & K',
      'No Preservatives'
    ],
    nutrition: {
      calories: 120,
      carbs: 30,
      sugar: 28,
      protein: 1,
      vitaminC: '120%'
    },
    rating: 4.5,
    reviews: 128
  }

  const relatedProducts = [
    { id: 2, name: 'Richi Apple Drink', flavor: 'apple', price: 3.49 },
    { id: 3, name: 'Richi Mango Drink', flavor: 'mango', price: 4.29 },
    { id: 6, name: 'Richi Orange Juice', flavor: 'orange', price: 3.79 }
  ]

  return (
    <PageWrapper>
      <div className="relative py-12 overflow-hidden" style={{ background: 'linear-gradient(155deg, white 0%, #f9fafb 35%, white 60%, #f3f4f6 100%)' }}>
        <Orb className="w-80 h-80 bg-[#F97316]/20 top-10 -right-32" />
        <Orb className="w-96 h-96 bg-[#F97316]/15 bottom-20 -left-40" delay={2} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M90 15 Q120 50 90 95 Q60 50 90 15Z' fill='%237A4A2A'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex text-sm">
              <Link to="/" className="text-[#7A4A2A]/70 hover:text-[#F97316]">Home</Link>
              <span className="mx-2 text-[#7A4A2A]/50">/</span>
              <Link to="/products" className="text-[#7A4A2A]/70 hover:text-[#F97316]">Products</Link>
              <span className="mx-2 text-[#7A4A2A]/50">/</span>
              <span className="text-[#F97316] font-semibold">{product.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl p-8 mb-4 border-2 border-gray-200 hover:border-[#F97316] hover:shadow-2xl transition-all duration-300">
                <img 
                  src={`/images/${product.flavor}.png`} 
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>
              <div className="flex gap-4">
                {['250ml', '500ml', '1L'].map((size) => (
                  <motion.div
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-[#F97316] transition-all duration-300 cursor-pointer"
                  >
                    <img 
                      src={`/images/${product.flavor}.png`} 
                      alt={`${product.name} ${size}`}
                      className="w-16 h-16 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{product.name}</h1>
                  <p className="text-[#7A4A2A]/70 text-xl mb-4">{product.tagline}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-[#F97316]">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                      ))}
                    </div>
                    <span className="text-[#7A4A2A]/70">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#FFF8EE] rounded-full transition-colors text-[#7A4A2A]/70 hover:text-[#F97316]">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-[#FFF8EE] rounded-full transition-colors text-[#7A4A2A]/70 hover:text-[#F97316]">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-[#7A4A2A]/70 mb-6 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#7A4A2A]/70">
                      <FiCheck className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-black text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Select Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                        selectedSize === size.size 
                          ? 'border-[#F97316] bg-[#FFF8EE]' 
                          : 'border-gray-200 text-[#7A4A2A]/70 hover:border-[#F97316]'
                      }`}
                    >
                      <div>{size.size}</div>
                      <div className="text-[#F97316] font-black text-sm">${size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-[#7A4A2A]/70 hover:bg-[#FFF8EE] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-[#7A4A2A]/70 hover:bg-[#FFF8EE] transition-colors"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#F97316] text-white font-bold rounded-full transition-all duration-300 hover:bg-[#A8430F] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Nutrition Info */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-black text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Nutrition Facts (per serving)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#F97316]">{product.nutrition.calories}</div>
                    <div className="text-sm text-[#7A4A2A]/70">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#F97316]">{product.nutrition.carbs}g</div>
                    <div className="text-sm text-[#7A4A2A]/70">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#F97316]">{product.nutrition.sugar}g</div>
                    <div className="text-sm text-[#7A4A2A]/70">Sugar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#F97316]">{product.nutrition.protein}g</div>
                    <div className="text-sm text-[#7A4A2A]/70">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#F97316]">{product.nutrition.vitaminC}</div>
                    <div className="text-sm text-[#7A4A2A]/70">Vitamin C</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-black text-gray-900 mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <motion.div 
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#F97316] p-6 text-center"
                >
                  <div className="w-40 h-40 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-[#F97316] transition-colors duration-300">
                    <img 
                      src={`/images/${related.flavor}.png`} 
                      alt={related.name}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{related.name}</h3>
                  <div className="text-[#F97316] text-2xl font-black mb-4">${related.price}</div>
                  <Link 
                    to={`/product/${related.id}`}
                    className="inline-block w-full px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#A8430F] text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 active:-translate-y-0.5"
                  >
                    View Product
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProductDetail