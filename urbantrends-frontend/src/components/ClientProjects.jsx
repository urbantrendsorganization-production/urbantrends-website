import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ClientProjects() {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [requestEmail, setRequestEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(
                    "https://urbantrends-backend-production-fde8.up.railway.app/developers/projects/"
                );
                setProjects(res.data.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                toast.error("Couldn't load projects.");
            }
        };

        fetchProjects();
    }, []);

    const handleRequestClick = (projectId) => {
        setSelectedProjectId(projectId);
        setIsModalOpen(true);
    };

    const getStatusColor = (status) => {
        if (status === "Completed") return "bg-green-600";
        if (status === "In Progress") return "bg-blue-600";
        return "bg-yellow-600";
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-silver">Projects</h2>
            </div>

            <br />

            {/* Projects list */}
            <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => {
                    const projectName = project.title || project.name || "Untitled Project";
                    const projectStatus = project.status || "Pending";
                    const projectImage = project.imageUrl || "/placeholder.png";
                    const projectDueDate = project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString()
                        : "N/A";
                    const projectBudget = project.budget
                        ? `$${project.budget}`
                        : "N/A";
                    const projectProgress = project.progress ?? 0;
                    const projectId = project._id;

                    return (
                        <motion.div
                            key={projectId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="bg-gunmetal/20 border-dim-grey/30 p-6 hover:border-silver/30 transition-colors">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <ImageWithFallback
                                            src={projectImage}
                                            alt={projectName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-silver mb-2">{projectName}</h3>
                                                <Badge className={getStatusColor(projectStatus)}>
                                                    {projectStatus}
                                                </Badge>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-white"
                                                onClick={() => handleRequestClick(projectId)}
                                            >
                                                Request Access
                                            </Button>
                                        </div>

                                        {/* Meta info */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="text-xs text-dim-grey mb-1">Due Date</div>
                                                <div className="text-sm text-silver flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {projectDueDate}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs text-dim-grey mb-1">Budget</div>
                                                <div className="text-sm text-silver flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" />
                                                    {projectBudget}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress bar */}
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-dim-grey mb-2">
                                                <span>Progress</span>
                                                <span>{projectProgress}%</span>
                                            </div>
                                            <div className="h-2 bg-gunmetal rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-silver to-dim-grey transition-all duration-500"
                                                    style={{ width: `${projectProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Project Access</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            if (!requestEmail || !selectedProjectId) return;

                            setLoading(true);

                            try {
                                // find selected project object for dynamic email content
                                const selectedProject = projects.find(
                                    (p) => p._id === selectedProjectId
                                );

                                // fallback: avoid crashes
                                const projectTitle = selectedProject?.title || selectedProject?.name || "Project";

                                // 1️⃣ — Send project access request
                                await axios.post(
                                    "https://urbantrends-backend-production-fde8.up.railway.app/dev/project-access",
                                    {
                                        projectId: selectedProjectId,
                                        email: requestEmail,
                                    }
                                );

                                // 2️⃣ — Send email notification (YOUR EXACT IMPLEMENTATION STYLE)
                                await axios.post(
                                    "https://email-service-production-f8ad.up.railway.app/api/email/send",
                                    {
                                        email: requestEmail,
                                        userName: ` there ${requestEmail}`,
                                        subject: `Access Requested for: ${projectTitle}`,
                                        message:
                                            `You will be communicated shortly regarding access for the following project: ${projectTitle}.`,
                                        ctaText: "Open Dashboard",
                                        ctaLink: "https://www.urbantrends.dev/dashboard",
                                    }
                                );

                                toast.success("Access requested & email sent successfully!");

                                // cleanup
                                setRequestEmail("");
                                setSelectedProjectId("");
                                setIsModalOpen(false);

                            } catch (error) {
                                console.error("Request error:", error.response?.data || error);
                                toast.error("Something went wrong. Try again.");
                            } finally {
                                setLoading(false);
                            }
                        }}


                        className="space-y-4"
                    >
                        {/* Project select */}
                        <label className="block text-sm text-dim-grey">
                            Project
                            <select
                                className="mt-1 block w-full border border-dim-grey rounded-md p-2 bg-gunmetal text-silver"
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                required
                            >
                                <option value="">-- Select Project --</option>
                                {projects.map((proj) => (
                                    <option key={proj._id} value={proj._id}>
                                        {proj.title || proj.name || proj._id}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />

                        {/* Email input */}
                        <label className="block text-sm text-dim-grey">
                            Email
                            <input
                                type="email"
                                className="mt-1 w-full border border-dim-grey p-2 rounded-md bg-gunmetal text-silver"
                                value={requestEmail}
                                onChange={(e) => setRequestEmail(e.target.value)}
                                required
                            />
                        </label>
                        <br />

                        <div className="flex justify-end gap-2">
                            <Button type="button" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">{loading ? "Submitting..." : "Request Access"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ClientProjects;
