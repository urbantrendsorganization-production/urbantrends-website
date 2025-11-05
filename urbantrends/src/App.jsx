import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Home from './pages/Home'
import Header from './component/Header'
import Footer from './component/Footer'
import Products from './pages/Products'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import About_us from './pages/About_us'
import Services from './pages/Services'
import ProductDetails from './pages/ProductDetails'
import ScrollTriggerRefresh from './component/ScrollTriggerRefresh'

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <>
      <Header />
      <ScrollTriggerRefresh />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About_us />} />
        <Route path='/products' element={<Products />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services/:slug' element={<Services />} />
        <Route path='/product/:slug_name' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
