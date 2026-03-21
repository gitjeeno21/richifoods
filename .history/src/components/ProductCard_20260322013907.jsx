import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════
   DEVICE CAPABILITY  (computed once at module load)
══════════════════════════════════════════════════════════ */
const deviceCapability = (() => {
  if (typeof window === 'undefined') return { isMobile: false, isLowEnd: false }
  const isMobile = window.innerWidth < 768
  const isLowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    window.innerWidth < 480
  return { isMobile, isLowEnd }
})()

const entranceVariants = deviceCapability.isMobile
  ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    }
  : {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0 },
    }

const hoverVariants = deviceCapability.isMobile
  ? {}
  : { whileHover: { y: -4, transition: { duration: 0.22 } } }

const ProductCard = memo(
  function ProductCard({ name, category, img, index, color = '#F97316' }) {
    const prefersReducedMotion = useReducedMotion()

    return (
      <motion.div
        initial={prefersReducedMotion ? false : entranceVariants.hidden}
        whileInView={entranceVariants.visible}
        viewport={{ once: true, margin: '-30px' }}
        transition={{
          duration: deviceCapability.isMobile ? 0.3 : 0.55,
          delay: deviceCapability.isMobile ? 0 : index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        {...hoverVariants}
        style={!deviceCapability.isMobile ? { willChange: 'transform, opacity' } : {}}
        className="group flex h-full w-full flex-col"
      >
        {/* Single panel — no separate white strip below; name sits on image */}
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-stone-200/90 bg-stone-100 shadow-sm transition-[border-color,box-shadow] duration-300 group-hover:border-stone-300 group-hover:shadow-md"
          style={{ aspectRatio: '5 / 6' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 75% 55% at 50% 38%, rgba(249, 115, 22, 0.07) 0%, transparent 55%)',
            }}
            aria-hidden
          />
          <div
            className="absolute left-0 top-0 bottom-0 z-20 w-[3px] rounded-l-2xl"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {category && (
            <span className="absolute left-3 top-3 z-20 inline-flex items-center rounded-md border border-stone-200/90 bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600 shadow-sm backdrop-blur-sm sm:left-3.5 sm:top-3.5 sm:px-2.5 sm:text-[10px]">
              {category}
            </span>
          )}
          {img ? (
            <img
              src={img}
              alt={name}
              className="absolute inset-0 z-10 h-full w-full object-contain object-bottom p-2 pb-10 sm:p-2.5 sm:pb-11 transition-transform duration-500 ease-out group-hover:scale-[1.02] [filter:drop-shadow(0_10px_28px_rgba(45,22,8,0.1))]"
              loading="lazy"
              decoding="async"
              width={300}
              height={400}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-5xl opacity-40" aria-hidden>
              🍹
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/55 via-black/20 to-transparent pt-14 pb-2.5 px-2 sm:pb-3">
            <h3
              className="text-center text-sm font-semibold leading-snug tracking-tight text-white drop-shadow-md transition-colors duration-200 sm:text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {name}
            </h3>
          </div>
        </div>
      </motion.div>
    )
  },
  (prev, next) =>
    prev.name === next.name &&
    prev.category === next.category &&
    prev.img === next.img &&
    prev.index === next.index &&
    prev.color === next.color
)

export default ProductCard
