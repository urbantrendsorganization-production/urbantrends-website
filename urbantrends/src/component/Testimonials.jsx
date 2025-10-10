import React from 'react'

function Testimonials() {
    return (
        <div className='w-full relative'>
            {/* glowing element */}
            <div className="absolute inset-0 flex justify-center -z-10">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
            </div>

            <h1 className='text-5xl text-center font-light font-karma'>Our Clients</h1>

            {/* clients cards */}
            <div className='w-full space-y-3 md:flex justify-evenly mt-4 p-2'>
                {/* box 1 */}
                <div className='md:w-1/4 space-y-4 p-2 border-2 border-black rounded'>
                    <div className='w-28 h-28 rounded-full bg-gray-800 mx-auto'></div>
                    <h3 className='text-sm text-center'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</h3>
                    <div className='w-4/5 h-8 bg-gray-800 mx-auto'></div>

                </div>

                {/* box 2 */}
                <div className='md:w-1/4 space-y-4 p-2 border-2 border-black rounded'>

                    <div className='w-28 h-28 rounded-full bg-gray-800 mx-auto'></div>
                    <h3 className='text-sm text-center'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</h3>
                    <div className='w-4/5 h-8 bg-gray-800 mx-auto'></div>

                </div>

                {/* box 3 */}
                <div className='md:w-1/4 space-y-4 p-2 border-2 border-black rounded'>

                    <div className='w-28 h-28 rounded-full bg-gray-800 mx-auto'></div>
                    <h3 className='text-sm text-center'>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</h3>
                    <div className='w-4/5 h-8 bg-gray-800 mx-auto'></div>

                </div>
                
                

            </div>
            
        </div>
    )
}

export default Testimonials