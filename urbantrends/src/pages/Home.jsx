import React, { useEffect } from 'react'
import Carrousel from '../component/Carrousel'
import About from '../component/About'
import Testimonials from '../component/Testimonials'
import Footer from '../component/Footer'
import { initLenis } from '../lenis'
import Header from '../component/Header'
import Card from '../component/Card'
import ProductsCard from '../component/ProductsCard'

function Home() {

    useEffect(() => {
        initLenis()
    }, [])

    return (
        <>
            <Header />
            <div className='p-4 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] space-y-5 overflow-hidden mt-18 md:mt-10'>
                {/* HERO SECTION */}
                <section className="relative flex flex-col items-center text-center overflow-hidden py-16 sm:py-20 md:py-28">

                    {/* soft gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10"></div>

                    {/* animated background glow */}
                    <div className="absolute inset-0 flex justify-center items-center -z-10">
                        <div className="w-[28rem] h-[28rem] bg-gradient-to-r from-gray-600 via-slate-500 to-gray-900 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
                    </div>

                    {/* main heading */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-snug font-tech tracking-tight drop-shadow-sm">
                        Building Digital Experiences <br />
                        That <span className="font-bold font-tech bg-gradient-to-r from-gray-900 via-slate-700 to-gray-400 bg-clip-text text-transparent animate-pulse-slow">
                            Drive Growth
                        </span>
                    </h1>

                    {/* sub-heading */}
                    <p className="mt-5 text-sm sm:text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto px-4 font-tech leading-relaxed">
                        At UrbanTrends, we design and develop high-performance websites, apps, and tools
                        that help businesses scale, connect, and thrive in the digital era.
                    </p>

                    {/* decorative line */}
                    <div className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full mx-auto mt-6"></div>

                    {/* call-to-action buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black px-8 py-3 rounded-xl font-semibold font-header transition-all hover:scale-105 shadow-md">
                            <span className="relative z-10">View Products</span>
                            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </button>
                        <button className="group relative overflow-hidden bg-[rgba(166,166,166,0.3)] text-black px-8 py-3 rounded-xl font-semibold font-header transition-all hover:bg-[rgba(166,166,166,0.5)] hover:scale-105 shadow-sm backdrop-blur-md">
                            <span className="relative z-10">View Portfolio</span>
                        </button>
                    </div>

                    {/* CAROUSEL SECTION (now inside hero) */}
                    <div className="mt-14 w-full max-w-[1400px]">
                        <Carrousel />
                    </div>
                </section>

            </div>

            {/* about component */}
            <div className='mt-10 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea]'>
                <About />
            </div>

            {/* services component */}
            <div className=''>
                <Card />
            </div>

            {/* products component */}
            <div className=''>
                <ProductsCard />
            </div>

            {/* testimonials section */}
            <div className='mt-3'>
                <Testimonials />
            </div>

            {/* Footer section */}
            <div className=''>
                <Footer />
            </div>
        </>
    )
}

export default Home
