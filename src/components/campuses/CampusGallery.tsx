"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, ArrowLeft } from "lucide-react";

// --- Campus Data (22 Campuses) ---
import { CAMPUSES } from "@/lib/data/campuses-22";

export function CampusGallery() {
    const [isGridOpen, setIsGridOpen] = useState(false);

    return (
        <section className="relative -mt-10 pb-20 overflow-hidden min-h-[600px]">
            {/* Header / Controls */}
            <div className="container mx-auto px-6 mb-8 flex justify-end">
                <button
                    onClick={() => setIsGridOpen(!isGridOpen)}
                    className="group flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-900 transition-colors"
                >
                    <span className="group-hover:scale-105 transition-transform duration-200">
                        {isGridOpen ? "Back to Scroll" : "View All"}
                    </span>
                    {isGridOpen ? (
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                        <Grid className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!isGridOpen ? (
                    <MarqueeView key="marquee" />
                ) : (
                    <GridView key="grid" />
                )}
            </AnimatePresence>
        </section>
    );
}

function MarqueeView() {
    // To create a seamless loop, we duplicate the list.
    const marqueeItems = [...CAMPUSES, ...CAMPUSES];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full"
        >
            <div className="flex w-full overflow-hidden select-none">
                <motion.div
                    className="flex gap-6 pl-6"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 180,
                        repeat: Infinity,
                    }}
                >
                    {marqueeItems.map((campus, index) => (
                        <div
                            key={`${campus.id}-${index}`}
                            className="flex-shrink-0 w-[400px] md:w-[500px] group cursor-pointer"
                        >
                            {/* Card Inner */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm bg-primary-100"
                            >
                                <Image
                                    src={campus.image}
                                    alt={campus.name}
                                    fill
                                    className="object-cover object-left-bottom transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 400px, 500px"
                                />
                                {/* Subtle overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </motion.div>

                            {/* Label */}
                            <div className="px-1 text-center">
                                <h3 className="text-lg font-bold text-primary-900 leading-tight">{campus.name}</h3>
                                <p className="text-sm text-primary-500">{campus.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

function GridView() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
        show: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }}
            className="container mx-auto px-6"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-8">
                {CAMPUSES.map((campus) => (
                    <motion.div key={campus.id} variants={item} className="group cursor-pointer">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-primary-100">
                            <Image
                                src={campus.image}
                                alt={campus.name}
                                fill
                                className="object-cover object-left-bottom transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-base font-bold text-primary-900">{campus.name}</h3>
                            <p className="text-xs text-primary-500 uppercase tracking-wide">{campus.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
