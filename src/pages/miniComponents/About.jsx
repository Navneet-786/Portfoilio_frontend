import axios from "axios";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const About = () => {
  const [data, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.BASE_URL}/api/v1/user/portfolio/me`,
          { withCredentials: true }
        );
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserProfile();
  }, []);

  const bio = "Building scalable backend systems and responsive frontends.";
  // Consolidated bio from resume summary/experience
  const details = "I have worked as a Software Developer at RedDoorz (Commeasure Solutions), where I built robust backend modules handling hundreds of daily requests. My expertise spans the MERN stack, Next.js, and real-time systems using Socket.IO.";

  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">

        {/* IMAGE COLUMN (Sticky on Desktop) */}
        <div className="flex justify-center order-2 md:order-1 md:sticky md:top-24">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500 rounded-full"></div>
            <div className="relative bg-white p-2 rounded-full border-4 border-slate-100 shadow-xl overflow-hidden group-hover:scale-105 transition duration-500">
              <img
                src={data?.user?.avatar?.url}
                alt="Profile"
                loading="lazy"
                className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full object-cover grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* CONTENT COLUMN */}
        <div className="flex flex-col gap-8 order-1 md:order-2 text-left">
          <div>
            <h2 className="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-2">Who I Am</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              About <span className="text-indigo-600">Me</span>
            </h1>

            <div className="space-y-8">
              <TextGenerateEffect words={bio} className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-200 leading-snug" />

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {details}
              </p>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Experience Card */}
                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-indigo-600 transition-colors">Experience</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ex-Software Developer @ RedDoorz</p>
                  <p className="text-xs text-slate-400 mt-1">Backend optimization, WebSocket, RBAC & Microservices.</p>
                </div>

                {/* Education Card */}
                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-colors group">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-indigo-600 transition-colors">Education</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">B.Tech in CS</p>
                  <p className="text-xs text-slate-400 mt-1">JSS Academy of Technical Education, Noida (2021-2025)</p>
                </div>

                {/* Tech Stack Card */}
                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 col-span-1 sm:col-span-2 hover:border-indigo-500 transition-colors group">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-indigo-600 transition-colors">Tech Arsenal</h3>
                  <div className="flex flex-wrap gap-2">
                    {["C++", "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "MongoDB", "SQL", "Tailwind"].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
    </section>
  );
};

export default About;
