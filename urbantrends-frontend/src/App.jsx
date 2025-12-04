import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from 'sonner'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Products from './pages/Products'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import CheckOut from './pages/CheckOut'
import AdminDashboard from './pages/AdminDashboard'
import { ClientDashboard } from './pages/ClientDashboard'
import { DeveloperDashboard } from './pages/DeveloperDashboard'
import { Login } from './pages/Login'

// Public layout
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

function App() {
  const { user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userPicture", user.picture);
      localStorage.setItem("userName", user.name);
      console.log("Saved user email:", user.email)
    }
  }, [isAuthenticated, user])

  return (
    <>
      <Analytics />
      <SpeedInsights />

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <PublicLayout>
              <Blog />
            </PublicLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PublicLayout>
              <Products />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <CheckOut />
            </PublicLayout>
          }
        />

        {/* Dashboard routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster position="top-right" theme="dark" />
    </>
  )
}

export default App
