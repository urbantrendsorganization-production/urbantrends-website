import React from 'react'
import conversation from '../assets/Conversation.svg'


function InfoComponent() {
    return (
        <div className='flex justify-center'>
            <section className="w-11/12 md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 px-8 py-10
            rounded-2xl border border-gray-200 
            bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:scale-[1.01] transition-all duration-500 ease-in-out">

            {/* Left — text */}
            <div className="flex-1 text-center md:text-left space-y-4">
                <h1 className="text-3xl md:text-4xl font-semibold leading-snug tracking-tight text-gray-800">
                    Browse Our Products <br />
                    Get Your Preferred Product <br />
                    <span className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 bg-clip-text text-transparent">
                        Get Your Free Trial
                    </span>
                </h1>

                <p className="text-gray-600 max-w-md mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
                    Discover our modern digital tools crafted for business excellence, speed, and user experience — all built under the UrbanTrends brand.
                </p>

                <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-300 to-gray-500 text-black font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
                    Explore Services
                </button>
            </div>

            {/* Right — image */}
            <div className="flex-shrink-0">
                <img
                    src={conversation}
                    alt="conversation"
                    className="w-40 h-40 md:w-52 md:h-52 drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                />
            </div>
        </section>
        </div>
        
    )
}

export default InfoComponent