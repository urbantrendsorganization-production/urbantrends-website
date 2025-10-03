import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route />
      </Routes>
    </>
  )
}

export default App