import React from 'react'
import devs from '../assets/devs.jpeg'
import biz from '../assets/business.jpeg'
import prise from '../assets/entss.jpeg'


function About() {
    return (
        <div className='relative space-y-4 mt-5 p-3'>
            {/* glowing element */}
            <div className="absolute inset-0 flex justify-center -z-10">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
            </div>

            <h1 className='text-4xl md:text-8xl text-center font-tech font-bold'>Urbantrends</h1>
            <h2 className='text-xl text-center font-header'>For</h2>


            {/* section talking about the brand */}
            <section className="w-full relative py-16">
                {/* Grid of 3 boxes */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">

                    {/* Box 1 */}
                    <div className="relative bg-white shadow-md rounded-lg">
                        {/* Title box */}
                        <div className="absolute md:-top-20 left-1/2 -translate-x-1/2 bg-[#626262] text-white px-4 py-1 rounded-md shadow">
                            <h3 className="font-semibold text-sm p-5">Developers</h3>
                        </div>
                        {/* Content */}
                        <div className=" text-center">
                            <div className="w-full h-[600px] overflow-hidden rounded-tr-4xl">
                                <img src={devs} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="relative shadow-md rounded-lg">
                        <div className="absolute md:-top-15 left-1/2 -translate-x-1/2 bg-[#626262] text-white px-4 py-1 rounded-md shadow">
                            <h3 className="font-semibold text-sm p-4">Businesses</h3>
                        </div>
                        <div className="text-center bg-gray-600">
                            <div className="w-full h-[600px] overflow-hidden rounded-br-full">
                                <img src={biz} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className="relative  shadow-md rounded-lg">
                        <div className="absolute md:-top-20 left-1/2 -translate-x-1/2 bg-[#626262] text-white px-4 py-1 rounded-md shadow">
                            <h3 className="font-semibold text-sm p-5">Enterprises</h3>
                        </div>
                        <div className=" text-center">
                            <div className="w-full h-[600px] overflow-hidden border-none">
                                <img src={prise} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                </div>

            </section>


        </div>
    )
}

export default About