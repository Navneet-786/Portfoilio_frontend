import axios from "axios";
import React, { useEffect, useState } from "react";
import Preloader from "@/components/ui/preloader";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Briefcase, Calendar } from "lucide-react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyTimeline = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/timeline/getall`,
          { withCredentials: true }
        );
        if (data.timelines) {
          setTimeline(data.timelines);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMyTimeline();
  }, []);

  return (
    <div className="w-full py-20 relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white tracking-tight">
          Professional <span className="text-indigo-600">Journey</span>
        </h2>

        {loading ? (
          <Preloader />
        ) : (
          <TracingBeam className="px-6 ml-0 md:ml-12 lg:ml-20">
            <div className="max-w-3xl ml-0 antialiased pt-4 relative">
              {timeline.map((item, index) => (
                <div key={item._id} className="mb-14 relative pl-8 border-l border-slate-200 dark:border-slate-800 last:border-0">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-950"></div>

                  <div className="flex flex-col gap-3">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 self-start rounded-md bg-slate-100 dark:bg-slate-900 px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {item.timeline.from} -{" "}
                        {item.timeline.to ? item.timeline.to : "Present"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-500" />
                      {item.title}
                    </h3>

                    {/* Description */}
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TracingBeam>
        )}
      </div>
    </div>
  );
};

export default Timeline;
