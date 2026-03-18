import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Investors from './pages/Investors'
import Contact from './pages/Contact'
import CSR from './pages/CSR'
import Insights from './pages/Insights'
import Dealership from './pages/Dealership'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/dealership" element={<Dealership />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}