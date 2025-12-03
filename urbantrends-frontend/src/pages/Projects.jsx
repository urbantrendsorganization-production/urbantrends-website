import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const industries = ["All", "Finance", "E-Commerce", "Healthcare", "Logistics", "Social Media"];

export default function Projects() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/projects/projs"
      );
      return res.data.data || res.data;
    } catch (err) {
      console.error("Error fetching projects:", err);
      return [];
    }
  };

  const fetchDeveloperProjects = async () => {
    try {
      const res = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/developers/projects"
      );
      return res.data.data || res.data;
    } catch (err) {
      console.error("Error fetching developer projects:", err);
      return [];
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const generalProjects = await fetchProjects();
      const devProjects = await fetchDeveloperProjects();
      setProjects([...generalProjects, ...devProjects]);
    };
    fetchAll();
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSubmitInterest = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    try {
      await axios.post("https://email-service-production-f8ad.up.railway.app/api/email/send", {
        email,
        name: "Interested User",
        subject: `Interest in project: ${selectedProject.title}`,
        message: `User with email ${email} is interested in your project: ${selectedProject.title}.`,
      });
      alert("Thank you! Your interest has been submitted.");
      setEmail("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-gunmetal/50 to-black">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-silver mb-4">All Projects</h1>
            <p className="text-dim-grey text-lg max-w-2xl mx-auto">
              Explore our portfolio of successful projects across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="bg-surface p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-silver text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-silver text-lg mb-4">
              Interested in "{selectedProject.title}"?
            </h2>
            <br />
            <p>Kindly input your email, to get more about this project</p>
            <br />
            <form onSubmit={handleSubmitInterest} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded border border-dim-grey bg-black text-silver focus:outline-none"
                required
              />
              <Button type="submit" className="bg-silver text-black hover:bg-silver/90">
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <section className="py-16 mt-45">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || project.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleCardClick(project)}
              >
                <div className="bg-gunmetal/20 border border-dim-grey/30 rounded-xl overflow-hidden hover:border-silver/50 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.imageUrl || project.image || project.imageLink}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-silver mb-2">{project.category || project.industry}</div>
                    <br />
                    <h3 className="text-silver mb-2 group-hover:text-silver transition-colors">{project.title}</h3>
                    <p className="text-dim-grey text-sm mb-4">{project.shortDescription || project.description}</p>

                    <br />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-gunmetal text-dim-grey text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <br />

                    {/* CTA Buttons */}
                    <div className="mt-auto flex gap-2 flex-wrap">
                      {project.githubRepo && (
                        <a
                          href={project.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-silver text-black px-3 py-1 rounded hover:bg-silver/90 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-dim-grey text-silver px-3 py-1 rounded hover:bg-gunmetal/50 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
