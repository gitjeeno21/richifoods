import { memo } from 'react'
import { motion } from 'framer-motion'

const ProductCard = memo(function ProductCard({ name, category, img, color, gradient, index }) {
  const isSpecialCard = name === 'Cola' || name === 'Jeera Masala'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group w-full cursor-pointer"
    >
      {/* Card Wrapper */}
      <div className="overflow-hidden flex flex-col h-full">
        
        {/* Image Container - Gradient Card with Bottle */}
        <div 
          className="relative w-full shadow-lg group-hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden flex items-center justify-center bg-white"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* Product Image - Clean on white */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {img ? (
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
                style={isSpecialCard ? { transform: 'scale(1.35)' } : { transform: 'scale(1.375)' }}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="text-6xl opacity-50">🍹</div>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="px-4 py-4 flex flex-col items-center text-center">
          {/* Product Name */}
          <h3
            className="font-black text-base md:text-lg text-[#7A4A2A] group-hover:text-[#F97316] transition-colors duration-300 leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {name}
          </h3>

          {/* Category Badge */}
          {category && (
            <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest text-[#F97316]/70">
              {category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if these props change
  return (
    prevProps.name === nextProps.name &&
    prevProps.category === nextProps.category &&
    prevProps.img === nextProps.img &&
    prevProps.gradient === nextProps.gradient &&
    prevProps.index === nextProps.index
  )
})

export default ProductCard
