import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const InteractiveGridPattern = ({
    width = 40,
    height = 40,
    squares = [24, 24], // [x, y]
    className,
    squaresClassName,
    ...props
}) => {
    const [hoveredSquare, setHoveredSquare] = useState(null);

    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                "absolute inset-0 h-full w-full pointer-events-none",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id="grid-pattern"
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x="-1"
                    y="-1"
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray="0"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            <svg x="-1" y="-1" className="overflow-visible">
                {Array.from({ length: squares[0] * squares[1] }).map((_, i) => {
                    const x = (i % squares[0]) * width;
                    const y = Math.floor(i / squares[0]) * height;
                    return (
                        <rect
                            key={i}
                            width={width}
                            height={height}
                            x={x}
                            y={y}
                            className={cn(
                                "stroke-neutral-200/50 transition-all duration-100 ease-in-out dark:stroke-neutral-800/50 hover:fill-neutral-200/50 dark:hover:fill-neutral-800/50 pointer-events-auto cursor-crosshair",
                                squaresClassName,
                                hoveredSquare === i ? "fill-neutral-200/50 dark:fill-neutral-800/50" : "fill-transparent"
                            )}
                            onMouseEnter={() => setHoveredSquare(i)}
                            onMouseLeave={() => setHoveredSquare(null)}
                        />
                    );
                })}
            </svg>
        </svg>
    );
};
