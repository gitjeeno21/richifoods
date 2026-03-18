import { motion } from 'framer-motion'

export default function ProductCard({ name, category, img, color, index }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col items-center text-center cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative mb-4 h-64 md:h-80 w-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-all duration-300" style={{ backgroundColor: color }} />
        {img ? (
          <img 
            src={img} 
            alt={name}
            className="h-full w-auto object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
          />
        ) : (
          <div className="text-6xl">🍹</div>
        )}
      </div>

      {/* Product Name */}
      <h3 
        className="font-black text-base text-[#7A4A2A] group-hover:text-[#F97316] transition-colors duration-300" 
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {name}
      </h3>
    </motion.div>
  )
}
