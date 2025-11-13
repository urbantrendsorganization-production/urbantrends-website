import React, { useState, useEffect } from "react";

function PortfolioSkeleton({ count = 3 }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_LINK;
  const URBANTRENDS_URL = `${backendUrl}/projects/projects/`;

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // optional small delay (remove if you don't want it)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const response = await fetch(URBANTRENDS_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProjects(Array.isArray(data.projects) ? data.projects : data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const visibleProjects = projects.slice(0, Math.max(1, count));

  return (
    <section className="relative w-[90%] mx-auto mt-24 mb-20 py-16 px-6 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-white to-[#eaeaea] -z-10" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-48 -right-16 w-80 h-80 bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          {isLoading ? "Loading Projects" : "Projects"}
        </h2>
        <p className="text-gray-500 mt-2">
          {isLoading ? "Please wait while we craft your view..." : "A selection of recent work."}
        </p>
      </div>

      {/* Grid: skeleton while loading, data cards when loaded */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(count)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 shadow-md animate-pulse"
            >
              <div className="w-full h-64 bg-gray-300/70"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => {
                // Safe accessors - adapt these to the real API shape
                const title = project.project_name || project.name || `Project ${idx + 1}`;
                const description = project.description || project.summary || "";
                const rawImage = project.image || project.thumbnail || project.image_url;
                let imageSrc = null;
                if (rawImage) {
                  imageSrc = rawImage.startsWith("http")
                    ? rawImage
                    : `${backendUrl.replace(/\/$/, "")}/${rawImage.replace(/^\//, "")}`;
                }
                const projectLink = project.live_url || project.link || `/projects/${project.id || project.slug || idx}`;

                return (
                  <article
                    key={project.id ?? idx}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                      <p className="text-gray-600 mb-4">
                        {description.length > 140 ? `${description.slice(0, 140)}...` : description}
                      </p>

                      <div className="flex items-center justify-between">
                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          View
                        </a>
                        <div className="text-sm text-gray-500">
                          {project.category ?? project.type ?? ""}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default PortfolioSkeleton;
