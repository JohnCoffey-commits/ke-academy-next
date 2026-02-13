"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CAMPUSES } from "@/lib/data/campuses-22";

export function CarouselSection() {
    const marqueeItems = [...CAMPUSES, ...CAMPUSES];

    return (
        <section className="relative -mt-10 pb-20 overflow-hidden min-h-[600px]">
            <div className="container mx-auto px-6 mb-8 flex justify-end">
                <Link
                    href="/campuses1"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary-400 hover:text-primary-600 transition-colors duration-300"
                >
                    <span className="relative">
                        View All Campuses
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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

                                <div className="px-1 text-center">
                                    <h3 className="text-lg font-bold text-primary-900 leading-tight">{campus.name}</h3>
                                    <p className="text-sm text-primary-500">{campus.label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
