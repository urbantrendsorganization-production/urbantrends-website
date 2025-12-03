import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import axios from "axios";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch all projects from backend
  const fetchProjects = async () => {
    try {
      const generalRes = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/projects/projs"
      );
      const devRes = await axios.get(
        "https://urbantrends-backend-production-fde8.up.railway.app/developers/projects"
      );
      const generalProjects = generalRes.data.data || generalRes.data;
      const devProjects = devRes.data.data || devRes.data;
      setProjects([...generalProjects, ...devProjects]);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "active":
        return "bg-silver/20 text-silver border-silver/30";
      case "in progress":
      case "processing":
        return "bg-dim-grey/20 text-dim-grey border-dim-grey/30";
      case "pending":
        return "bg-gunmetal/20 text-dim-grey border-dim-grey/30";
      default:
        return "bg-gunmetal/20 text-dim-grey border-dim-grey/30";
    }
  };

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-silver">Project Management</h2>
        <Button className="bg-silver text-black hover:bg-silver/90">Create New Project</Button>
      </div>

      <Card className="bg-gunmetal/20 border-dim-grey/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gunmetal">
                <th className="text-left p-4 text-sm text-dim-grey">Project ID</th>
                <th className="text-left p-4 text-sm text-dim-grey">Name</th>
                <th className="text-left p-4 text-sm text-dim-grey">Client</th>
                <th className="text-left p-4 text-sm text-dim-grey">Status</th>
                <th className="text-left p-4 text-sm text-dim-grey">Progress</th>
                <th className="text-left p-4 text-sm text-dim-grey">Due Date</th>
                <th className="text-left p-4 text-sm text-dim-grey">Team</th>
                <th className="text-right p-4 text-sm text-dim-grey">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <motion.tr
                  key={project._id || project.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gunmetal/50 hover:bg-gunmetal/10 transition-colors"
                >
                  <td className="p-4 text-sm text-silver">{project._id || project.id || "N/A"}</td>
                  <td className="p-4 text-sm text-silver">{project.title}</td>
                  <td className="p-4 text-sm text-dim-grey">{project.client || "N/A"}</td>
                  <td className="p-4">
                    <Badge className={getStatusColor(project.status || project.category)}>
                      {project.status || project.category || "Pending"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gunmetal rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-gradient-to-r from-silver to-dim-grey"
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-dim-grey">{project.progress || 0}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-dim-grey">{project.dueDate || "N/A"}</td>
                  <td className="p-4 text-sm text-silver">{project.team || 1} members</td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dim-grey hover:text-silver"
                      onClick={() => handleCardClick(project)}
                    >
                      Interested
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal for Interested */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
    </div>
  );
}

export default AdminProjects;
