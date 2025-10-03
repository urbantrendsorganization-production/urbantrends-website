import React from 'react'
import Carrousel from '../component/Carrousel'

function Home() {
    return (
        <div className='p-3'>
            <h1 className='text-center text-6xl mt-7 font-light'>Building Digital Experiences <br /> That <span className='font-bold'>Drive Growth</span></h1>
            <h2 className='text-center text-lg text-[#6B6B6B] mt-2'>At UrbanTrends, we design and develop high-performance websites, apps, and tools <br /> that help businesses scale, connect, and thrive in the digital era.</h2>
            {/* cta buttons */}
            <div className="w-full mt-3">
                <div className='w-1/2 mx-auto flex justify-center space-x-4 bg-[#EEEEEE] py-3 rounded-lg'>
                    <button className="bg-gradient-to-r from-[#D9D9D9] to-[#737373] text-black px-6 py-3 rounded">View Products</button>
                    <button className="bg-[#A6A6A6] text-black px-6 py-3 rounded">View Portfolio</button>
                </div>
            </div>
            {/* carrousel */}
            <Carrousel />
        </div>
    )
}

export default Home