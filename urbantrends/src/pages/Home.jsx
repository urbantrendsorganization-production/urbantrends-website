import React from 'react'
import Carrousel from '../component/Carrousel'
import About from '../component/About'
import Services from '../component/Services'

function Home() {
    return (
        <div className='p-4 space-y-5 overflow-hidden'>
            {/* heading */}
            <h1 className='text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl md:mt-10 font-light leading-snug font-tech'>
                Building Digital Experiences <br />
                That <span className='font-bold font-tech animate-gray-cycle'>Drive Growth</span>
            </h1>


            {/* sub-heading */}
            <h2 className='text-center text-sm sm:text-base md:text-lg text-[#6B6B6B] mt-2 leading-relaxed max-w-3xl mx-auto px-2 font-tech'>
                At UrbanTrends, we design and develop high-performance websites, apps, and tools
                that help businesses scale, connect, and thrive in the digital era.
            </h2>

            {/* nice horizontal line */}
            <hr className='w-1/2 sm:w-1/3 mx-auto border-gray-300' />

            {/* wrapper */}
            <div className="relative w-full mt-4 sm:mt-6">

                {/* glowing background element */}
                <div className="absolute inset-0 flex justify-center -z-10">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
                </div>

                {/* cta buttons */}
                <div className="w-full sm:w-3/4 md:w-1/2 mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 bg-[rgba(166,166,166,0.6)] py-4 px-3 rounded-lg relative z-10">
                    <button className="bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black px-6 py-3 rounded-lg font-bold w-full sm:w-auto font-header">
                        View Products
                    </button>
                    <button className="bg-[rgba(166,166,166,0.6)] text-black px-6 py-3 rounded-lg font-bold w-full sm:w-auto font-header">
                        View Portfolio
                    </button>
                </div>

                {/* carrousel */}
                <div className="relative z-10 mt-8">
                    <Carrousel />
                </div>
            </div>

            {/* about component */}
            <div className='mt-5'>
                <About />
            </div>

            {/* services component */}
            <div className='mt-3'>
                <Services />
            </div>

        </div>
    )
}

export default Home
