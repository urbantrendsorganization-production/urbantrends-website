import React from "react";

function PortfolioSkeleton({ count = 3 }) {
  return (
    <section className="relative w-[90%] mx-auto mt-24 mb-20 py-16 px-6 rounded-3xl overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />

      {/* Subtle Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-48 -right-16 w-80 h-80 bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Loading Projects
        </h2>
        <p className="text-gray-500 mt-2">Please wait while we craft your view...</p>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 shadow-md animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-64 bg-gray-300/70"></div>

            {/* Text placeholders */}
            <div className="p-5 space-y-3">
              <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PortfolioSkeleton;
