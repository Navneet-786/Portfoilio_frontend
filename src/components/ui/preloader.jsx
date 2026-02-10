import React from "react";
import { motion } from "framer-motion";

const Preloader = () => {
    return (
        <div className="h-[40vh] w-full flex items-center justify-center bg-transparent">
            <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="h-4 w-4 bg-yellow-400 rounded-full"
                        animate={{
                            y: ["0%", "-100%", "0%"],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Preloader;
