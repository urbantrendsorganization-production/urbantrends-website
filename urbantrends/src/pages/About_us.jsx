import React from "react";
import CompanyAbout from "../component/Companyabout";
import PortfolioPreview from "../component/ProjectPreview";


function About_us() {
  return (
    <div className="w-full relative mt-24 overflow-hidden bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea]">
      {/* Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-80 h-80 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-black/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Overlay + Title */}
      <div className="">
        <h1 className="text-5xl m-2 font-bold text-gray-800 text-center z-10">
          About Us
        </h1>
      </div>

      <div>
        <CompanyAbout
        title="Who We Are"
        description="UrbanTrends is a forward-thinking software company dedicated to building sleek, scalable, and intelligent digital experiences for businesses of all sizes."
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786"
      />

      <CompanyAbout
        title="Our Vision"
        description="We aim to redefine modern web solutions through innovation, simplicity, and user-focused design."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        reverse // this flips image and text sides
      />

      <CompanyAbout
        title="Our Mission"
        description="UrbanTrends is a forward-thinking software company dedicated to building sleek, scalable, and intelligent digital experiences for businesses of all sizes."
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786"
      />
      </div>

      <div>
        <PortfolioPreview />
      </div>


    </div>
  );
}

export default About_us;
