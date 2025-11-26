import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Products from './pages/Products'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import { Toaster } from 'sonner'
import { Footer } from './components/Footer'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import CheckOut from './pages/CheckOut'
// import { Home } from 'lucide-react'

function App() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/about' element={ <About /> }/>
        <Route path='/blog' element={<Blog /> }/>
        <Route path='products' element={<Products />}/>
        <Route path='/services' element={<Services /> }/>
        <Route path='/projects' element={<Projects /> }/>
        <Route path='/contact' element={<Contact /> }/>
        <Route path='/checkout' element={<CheckOut /> }/>
      </Routes>
      <Footer />
      <Toaster position='top-right' theme='dark'/>
    </>

  )
}

export default App