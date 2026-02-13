"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { partners } from "@/content/partners";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const sizeClasses = {
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    square: "col-span-1 row-span-1",
};

export function PartnersGrid() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
    const reduceMotion = useReducedMotion();

    return (
        <section ref={sectionRef} className="min-h-screen bg-surface py-20 lg:py-28">
            <Container>
                <div className="max-w-3xl mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                        TimeTable
                    </h2>
                    <p className="text-primary-600">
                        Timetable for the week.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[120px] md:auto-rows-[140px] gap-6">
                    {partners.map((partner, index) => {
                        const delay = reduceMotion ? 0 : (index * 0.08) + (index % 3) * 0.03;

                        return (
                            <motion.div
                                key={partner.id}
                                initial={reduceMotion ? false : { y: -160, opacity: 0 }}
                                animate={isInView ? { y: 0, opacity: 1 } : undefined}
                                transition={reduceMotion ? undefined : {
                                    type: "spring",
                                    stiffness: 520,
                                    damping: 18,
                                    mass: 1.1,
                                    bounce: 0.45,
                                    delay
                                }}
                                whileHover={{ scale: 1.04, zIndex: 50 }}
                                className={cn(
                                    "group relative rounded-2xl border border-primary-100 bg-white shadow-soft",
                                    "flex items-center justify-center overflow-hidden",
                                    "transition-transform duration-300",
                                    sizeClasses[partner.size]
                                )}
                                style={{ zIndex: 1 }}
                            >
                                <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
                                    <span className="text-sm md:text-base font-semibold text-primary-800 transition-opacity duration-300 group-hover:opacity-0">
                                        {partner.name}
                                    </span>

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="relative w-[160px] h-[64px]">
                                            <Image
                                                src={partner.logo}
                                                alt={`${partner.name} logo`}
                                                fill
                                                unoptimized
                                                className="object-contain"
                                                sizes="160px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
