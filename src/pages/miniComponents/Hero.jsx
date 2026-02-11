/* eslint-disable react/no-unescaped-entities */
import { ExternalLink, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [user, setUser] = useState({});
  const [skills, setSkills] = useState([]);

  // Fetch User Profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/portfolio/me`,
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUserProfile();
  }, []);

  // Fetch Skills for Orbiting Circles
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
      }
    };
    getMySkills();
  }, []);

  // Split skills into two groups for inner and outer orbits
  const innerSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const outerSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <div className="relative flex h-full min-h-[95vh] w-full flex-col items-center justify-center overflow-hidden bg-white text-slate-900 p-4 md:p-20">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-30 fill-slate-200 stroke-slate-200"
        )}
      />

      <div className="z-10 flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-7xl">
        {/* LEFT SIDE: Heading & Terminal */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-sm font-medium text-slate-800 mb-4 shadow-sm">
              Available for work
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                {user?.fullName || "Navneet"}
              </span>
            </h1>
            <div className="mt-4 text-xl md:text-2xl font-mono text-slate-600">
              <TypingAnimation
                className="font-mono text-indigo-600 font-semibold"
                duration={50}
                delay={100}
              >
                &gt; Full-Stack Engineer_
              </TypingAnimation>
            </div>
            <p className="mt-4 max-w-lg text-slate-600 text-lg leading-relaxed">
              {user?.aboutMe || "Building digital experiences with modern technologies. Passionate about clean code and user-centric design."}
            </p>
          </motion.div>

          {/* TERMINAL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-white"
          >
            <Terminal className="bg-slate-50 border-none shadow-none">
              <AnimatedSpan delay={1000} className="text-emerald-600 font-semibold">
                <span>✔ Stack loaded successfully</span>
              </AnimatedSpan>
              <AnimatedSpan delay={1500} className="text-emerald-600 font-semibold">
                <span>✔ Database connected</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-blue-600">
                <span>ℹ Initializing portfolio...</span>
              </AnimatedSpan>
              <AnimatedSpan delay={3000} className="text-slate-400">
                <span>$ _</span>
              </AnimatedSpan>
            </Terminal>
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start"
          >
            <Link to={user?.githubURL || "https://github.com"} target="_blank">
              <button className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Github size={20} /> GitHub
              </button>
            </Link>
            <Link to={user?.linkedInURL || "https://linkedin.com"} target="_blank">
              <button className="px-6 py-3 rounded-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition font-medium flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Linkedin size={20} /> LinkedIn
              </button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Orbiting Circles (Dynamic Skills) */}
        <div className="flex-1 relative flex h-[600px] w-full max-w-[600px] flex-col items-center justify-center overflow-hidden">
          {/* Center Text/Logo */}
          <div className="absolute flex flex-col items-center justify-center z-10 p-8 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 shadow-2xl">
            <span className="text-4xl font-bold text-slate-900">Skill</span>
            <span className="text-4xl font-bold text-indigo-600">Set</span>
          </div>

          {/* Inner Orbit - First Half of Skills */}
          {innerSkills.length > 0 && innerSkills.map((skill, idx) => {
            // Calculate delay to space them out
            const delay = (20 / innerSkills.length) * idx;
            return (
              <OrbitingCircles
                key={skill._id || idx}
                className="size-[40px] border-none bg-transparent"
                duration={25}
                delay={delay}
                radius={120}
              >
                <div className="h-full w-full bg-white rounded-full p-2 shadow-md border border-slate-100 flex items-center justify-center" title={skill.title}>
                  <img src={skill.svg?.url || "https://placehold.co/40"} alt={skill.title} className="h-full w-full object-contain" />
                </div>
              </OrbitingCircles>
            );
          })}

          {/* Outer Orbit - Second Half of Skills */}
          {outerSkills.length > 0 && outerSkills.map((skill, idx) => {
            const delay = (30 / outerSkills.length) * idx;
            return (
              <OrbitingCircles
                key={skill._id || idx}
                className="size-[50px] border-none bg-transparent"
                radius={220}
                duration={40}
                delay={delay}
                reverse
              >
                <div className="h-full w-full bg-white rounded-full p-2 shadow-md border border-slate-100 flex items-center justify-center" title={skill.title}>
                  <img src={skill.svg?.url || "https://placehold.co/50"} alt={skill.title} className="h-full w-full object-contain" />
                </div>
              </OrbitingCircles>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
