"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BubbleGraph } from "@/components/campuses/BubbleGraph";
import { WeeklyTimetable } from "@/components/campuses/WeeklyTimetable";
import { cn } from "@/lib/utils";

export default function Campuses1Page() {
    const timetableRef = useRef<HTMLDivElement>(null);
    const [isPastIntro, setIsPastIntro] = useState(false);

    // Fade out intro section when timetable comes into view
    useEffect(() => {
        const el = timetableRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPastIntro(entry.intersectionRatio > 0.5);
            },
            { threshold: [0, 0.5, 0.7, 0.9] }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-neutral-50">
            <motion.section
                initial={false}
                animate={{ opacity: isPastIntro ? 0 : 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={cn("min-h-screen", isPastIntro ? "pointer-events-none" : "")}
            >
                <div className="min-h-screen bg-neutral-50 overflow-hidden flex flex-col relative">
                    {/* Header Text - Top Left (absolute positioned to match Resources/About pages) */}
                    <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-6 pointer-events-none">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.22em] text-primary-900 drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                            {/* EXPLORE CAMPUSES */}
                        </h1>
                    </div>

                    {/* Full Screen Graph - position unchanged */}
                    <div className="flex-1 w-full h-full relative pt-20 mt-[-80px]">
                        <BubbleGraph />
                    </div>

                    {/* Disclaimer overlay */}
                    <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm text-xs text-neutral-500 max-w-xs z-50 pointer-events-none">
                        <p className="font-bold mb-1">Experimental Interface</p>
                        <p>Physics-driven visualization prototype. Hover nodes to interact.</p>
                    </div>
                </div>
            </motion.section>

            {/* Weekly Timetable Section */}
            <div ref={timetableRef}>
                <WeeklyTimetable />
            </div>
        </div>
    );
}
