import React from 'react'
import ServiceCard from '../component/ServiceCard'
import { CiSaveDown1 } from "react-icons/ci";
import ClientForm from '../component/ClientForm';

function Services_Products() {
    return (
        <div className='w-full'>
            <div className='w-full relative'>
                {/* glowing element */}
                <div className="absolute inset-0 flex justify-center -z-10">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
                </div>

            </div>
            {/* services */}
            <div className='w-full grid md:flex justify-center gap-4 p-4 mx-auto mt-4 overflow-hidden'>
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/d41f3bf5-3e79-4d3c-9afa-d50283f999a5?format=jpeg"
                    title="Web Development"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/8d71d79c-2fec-41de-9667-b84478e01a5c?format=jpeg"
                    title="Website Maintenance"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/63a4770f-4e73-44b5-b87a-48a6cf1954b7.?format=jpeg"
                    title="UI/UX Design"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/ac2ee674-94f5-4bdd-a9e8-80cc292de198?format=jpeg"
                    title="SEO & Optimization"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/4b148cc9-ba36-47bf-b21c-d045ad693425?format=jpeg"
                    title="E-commerce Development"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />

            </div>
            {/* products */}
            <div className='w-full grid  md:flex justify-center gap-4 p-4 mx-auto mt-4 overflow-hidden'>
                {/* <h3>Products</h3> */}
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/f20a7d1b-3817-475c-979e-2714c8c1c649?format=jpeg"
                    title="Templates & Themes"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/1ba1703c-c9e0-4142-9001-2d39f3182139?format=jpeg"
                    title="UI Kits"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/944c233b-dce8-45cb-a0f6-7b96afd88546?format=jpeg"
                    title="Saas Starter Kits"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/1433069c-5d3b-4066-bfc8-12d810f6340f?format=jpeg"
                    title="Industry Specific Tools"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />
                <ServiceCard width="300px" height="300px" image="https://cdn.cosmos.so/1886de25-5470-49d3-afbd-1344870c9ba3?format=jpeg"
                    title="Api & Integrations"
                    description="We build modern, responsive websites tailored to your business needs."
                    buttonText="Get Started" />

            </div>

            <div className='w-full h-90 relative'>
                {/* glowing element */}
                <div className="absolute inset-0 flex justify-center -z-10">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 blur-3xl opacity-40 animate-pulse"></div>
                </div>

                {/* client bargain */}
                <h1 className='text-center text-4xl md:text-6xl mt-3 font-liny font-light'>Need a <br /> <span>Custom Project ?</span> </h1>

                <h2 className="flex flex-col items-center mt-3 md:text-2xl text-center text-gray-700">
                    Fill this form to talk to a Developer
                    <CiSaveDown1 className="text-5xl md:text-8xl mb-6 mt-10 animate-bounce" />
                </h2>

                {/* custom form */}
                <div className='mt-3 overflow-hidden'>
                    <ClientForm />

                </div>

            </div>


        </div>

    )
}

export default Services_Products