import { Button } from "@/components/ui/button";
import Preloader from "@/components/ui/preloader";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  return (
    <section className="w-full py-24 px-4 sm:px-10 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* ===== MODERN HEADING ===== */}
      <div className="max-w-7xl mx-auto mb-20 text-center lg:text-left text-black dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center lg:items-start gap-4"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide uppercase">
            <LayoutGrid className="w-4 h-4" />
            <span>Featured Works</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">Projects</span>
          </h1>
          <p className="max-w-xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed mx-auto lg:mx-0">
            A collection of my recent work in web development, featuring full-stack applications and creative experiments.
          </p>
        </motion.div>
      </div>

      {/* ===== LOADER ===== */}
      {loading ? (
        <Preloader />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* ===== PROJECT GRID ===== */}
          <BentoGrid className="mx-auto">
            {(viewAll ? projects : projects.slice(0, 9)).map((project, i) => (
              <BackgroundGradient key={project._id} className="rounded-[22px] p-1 bg-white dark:bg-zinc-950 h-full">
                <BentoGridItem
                  title={project.title}
                  description={
                    <div className="flex flex-col gap-2">
                      <p className="line-clamp-2 text-slate-500 dark:text-slate-400 text-sm">
                        Discover the details and technical implementation of {project.title}.
                      </p>
                      <Link
                        to={`/project/${project._id}`}
                        className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs font-bold mt-4 hover:gap-2 transition-all group/link"
                      >
                        View Case Study
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  }
                  header={
                    <div className="flex flex-1 w-full h-[12rem] rounded-xl overflow-hidden group/image relative">
                      {project.projectBanner?.url ? (
                        <img
                          src={project.projectBanner.url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover/bento:scale-110 transition duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-900" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition duration-500 pointer-events-none" />
                    </div>
                  }
                  className={cn(
                    "h-full border-none shadow-none bg-transparent hover:shadow-none p-4",
                    i === 3 || i === 6 ? "md:col-span-2" : ""
                  )}
                  onClick={() => { }}
                />
              </BackgroundGradient>
            ))}
          </BentoGrid>

          {/* ===== SHOW MORE BUTTON ===== */}
          {projects.length > 9 && (
            <div className="w-full flex justify-center mt-20 text-black dark:text-white">
              <Button
                className="px-8 py-6 rounded-full text-base font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-transform shadow-xl"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? "Show Less" : "Explore All Projects"}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Portfolio;
