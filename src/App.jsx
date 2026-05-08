import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Investors from './pages/Investors'
import Contact from './pages/Contact'
import Insights from './pages/Insights'
import Dealership from './pages/Dealership'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Location from './pages/Location'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
          <Route path="/insights" element={<Insights />} />
          <Route path="/dealership" element={<Dealership />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/location/:city" element={<Location />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}