import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Preloader from "@/components/ui/preloader";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/skill/getall`,
          { withCredentials: true }
        );
        setSkills(data.skills || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMySkills();
  }, []);

  return (
    <section className="w-full bg-slate-50 border-t border-slate-200 py-14 sm:py-20 px-4 overflow-hidden relative">
      {/* SECTION HEADING */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-indigo-600">
          Skills
        </h2>
        <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
          Technologies and tools I use to build scalable and performant
          applications
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* LOADER */}
      {loading ? (
        <Preloader />
      ) : (
        /* SKILLS GRID REPLACED WITH INFINITE MOVING CARDS */
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 items-center justify-center relative overflow-hidden shadow-sm">
          <InfiniteMovingCards
            items={skills}
            direction="left"
            speed="normal" // Adjusted speed
            className="w-full"
          />
        </div>
      )}
    </section>
  );
};

export default Skills;
