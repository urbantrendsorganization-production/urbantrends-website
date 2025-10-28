import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'
import Footer from './component/Footer'
import Products from './pages/Products'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import About_us from './pages/About_us'
import Services from './pages/Services'

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/about' element={ <About_us/>}/>
        <Route path='/products' element={ <Products />}/>
        <Route path='/portfolio' element={ <Portfolio />}/>
        <Route path='/contact' element={ <Contact />}/>
        <Route path='/services/:slug' element={ <Services /> }/>
        
        <Route />
      </Routes>
    </>
  )
}

export default App