import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Preloader from "@/components/ui/preloader";
import { motion } from "framer-motion";
import { Box, Wrench } from "lucide-react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/softwareapplication/getall`,
          { withCredentials: true }
        );
        setApps(data.softwareApplications || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMyApps();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full px-4 sm:px-8 lg:px-20 py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* ===== MODERN HEADING ===== */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold tracking-widest uppercase">
            <Wrench className="w-3 h-3" />
            <span>Toolbox</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Software <span className="text-indigo-600">&</span> Apps
          </h1>
          <p className="max-w-lg text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            The technical stack and software solutions I leverage to build modern digital experiences.
          </p>
          <div className="w-16 h-1 bg-indigo-600 rounded-full mt-2" />
        </motion.div>
      </div>

      {/* LOADER */}
      {loading ? (
        <Preloader />
      ) : (
        /* APPS GRID WITH ANIMATIONS */
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {apps.map((app) => (
            <motion.div key={app._id} variants={item}>
              <Card
                className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl 
                p-8 flex flex-col items-center justify-center gap-5 
                transition-all duration-500 hover:border-indigo-500/50
                hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] relative overflow-hidden"
              >
                {/* Background subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center 
                        group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-500 shadow-sm relative z-10"
                >
                  <img
                    src={app.svg?.url}
                    alt={app.name}
                    className="h-10 w-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase text-center relative z-10">
                  {app.name}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/50 dark:bg-indigo-950/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-50/50 dark:bg-purple-950/10 rounded-full blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default MyApps;
