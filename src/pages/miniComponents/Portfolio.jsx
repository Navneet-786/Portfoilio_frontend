import { Button } from "@/components/ui/button";
import Preloader from "@/components/ui/preloader";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/project/getall`,
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
    <section className="w-full py-16 px-4 sm:px-10 ">
      {/* ===== HEADING ===== */}
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[5px] 
          mx-auto w-fit font-extrabold about-h1  text-yellow-500"
        >
          MY{" "}
          <span className=" font-extrabold ">
            PROJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1 "
        >
          MY <span className=" font-extrabold">WORK</span>
        </h1>
        {/* <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span> */}
      </div>

      {/* ===== LOADER ===== */}
      {loading ? (
        <Preloader />
      ) : (
        <>
          {/* ===== PROJECT GRID ===== */}
          <BentoGrid className="max-w-7xl mx-auto ">
            {(viewAll ? projects : projects.slice(0, 9)).map((project, i) => (
              <BentoGridItem
                key={project._id}
                title={project.title}

                description={
                  <div className="flex flex-col gap-2">
                    <p className="line-clamp-2 text-neutral-400 text-sm">
                      {/* Assuming there is a description or tech stack, otherwise putting placeholder text or using part of title */}
                      Click to view details about {project.title}.
                    </p>
                    <Link to={`/project/${project._id}`} className="flex items-center gap-1 text-cyan-500 text-xs font-bold mt-2">
                      View Project <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                }
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 overflow-hidden ">
                    {project.projectBanner?.url ? (
                      <img src={project.projectBanner.url} alt={project.title} className="w-full h-full object-cover group-hover/bento:scale-105 transition duration-200" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-neutral-800" />
                    )}
                  </div>
                }
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                onClick={() => { }}
              />
            ))}
          </BentoGrid>

          {/* ===== SHOW MORE BUTTON ===== */}
          {projects.length > 9 && (
            <div className="w-full flex justify-center mt-14">
              <Button
                className="w-48 text-base bg-white text-black hover:bg-neutral-200"
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Portfolio;
