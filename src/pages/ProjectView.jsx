import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe, Layers, Cpu, Images, ExternalLink, ShieldCheck } from "lucide-react";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(res.data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading project details...</p>
        </div>
      </div>
    );
  }

  const technologiesList = project.technologies?.split(", ") || [];
  const descriptionList = project.description?.split(". ") || [];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-8 lg:px-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* NAV & HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {project.title}
            </h1>
            <div className="flex items-center gap-3 text-indigo-600 font-bold uppercase tracking-widest text-[10px]">
              <Layers className="w-3 h-3" /> {project.stack} Project
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="rounded-2xl border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-indigo-600 font-bold gap-2 px-6 h-12 self-start"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Button>
        </div>

        {/* HERO BANNER */}
        <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-4 border-white aspect-video md:aspect-[21/9]">
          <img
            src={project.projectBanner?.url || "/avatarHolder.jpg"}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* CONTENT COL */}
          <div className="lg:col-span-2 space-y-12">

            {/* OVERVIEW */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div> Project Narrative
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg font-medium">
                {descriptionList.map((item, index) => (
                  <p key={index}>{item}.</p>
                ))}
              </div>
            </div>

            {/* GALLERY GRID */}
            {project.projectImages && project.projectImages.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-2 h-8 bg-purple-600 rounded-full"></div> Visual Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.projectImages.map((img, index) => (
                    <div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg border-2 border-white hover:shadow-2xl transition-all duration-500">
                      <img
                        src={img.url}
                        alt={`Gallery ${index}`}
                        className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR COL */}
          <div className="space-y-8">
            {/* LINKS CARD */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
              <div className="space-y-4">
                {project.gitRepoLink && (
                  <a href={project.gitRepoLink} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold gap-3 shadow-lg shadow-slate-200">
                      <Github className="w-5 h-5" /> Source Code
                    </Button>
                  </a>
                )}
                {project.deployed === "Yes" && project.projectLink && (
                  <a href={project.projectLink} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold gap-3 shadow-lg shadow-indigo-500/20">
                      <ExternalLink className="w-5 h-5" /> Visit Live Site
                    </Button>
                  </a>
                )}
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.deployed === "Yes" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    }`}>
                    {project.deployed === "Yes" ? "Live" : "Development"}
                  </span>
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Ecosystem</span>
                  <span className="text-xs font-bold text-slate-700 uppercase">{project.stack}</span>
                </div>
              </div>
            </div>

            {/* TECH CARD */}
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl text-white space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Cpu className="w-5 h-5 text-cyan-400" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologiesList.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-slate-800 border border-slate-700/50 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">Verified</p>
                <p className="text-sm font-bold text-indigo-900 leading-tight">Project Integrity Confirmed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
