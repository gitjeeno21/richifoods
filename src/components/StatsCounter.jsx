import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 100, suffix: ' KL', label: 'Daily Capacity', desc: 'Production per day' },
  { value: 10, suffix: '+', label: 'Drink Variants', desc: 'Juices & carbonated' },
  { value: 3, suffix: '', label: 'Business Models', desc: 'Contract, White-label, Own' },
  { value: 6, suffix: ' Mo', label: 'Shelf Life', desc: 'Quality guaranteed' },
]

export default function StatsCounter({ light = false }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className={`font-display font-bold text-5xl md:text-6xl mb-1 ${light ? 'text-white' : 'bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-500 bg-clip-text text-transparent'}`}>
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className={`font-display font-semibold text-lg mb-0.5 ${light ? 'text-white/90' : 'text-gray-900'}`}>
            {stat.label}
          </div>
          <div className={`font-body text-sm ${light ? 'text-white/50' : 'text-gray-500'}`}>
            {stat.desc}
          </div>
        </motion.div>
      ))}
    </div>
  )
}