import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'
import Services_Products from './pages/Services_Products'
import Footer from './component/Footer'
import Products from './pages/Products'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import About_us from './pages/About_us'

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/services_&_products' element={ <Services_Products /> }/>
        <Route path='/about' element={ <About_us/>}/>
        <Route path='/products' element={ <Products />}/>
        <Route path='/portfolio' element={ <Portfolio />}/>
        <Route path='/contact' element={ <Contact />}/>
        
        <Route />
      </Routes>
    </>
  )
}

export default App