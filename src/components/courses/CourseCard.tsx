"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Calculator, CheckCircle2, ChevronRight, X, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Course } from "@/content/courses";
import { cn } from "@/lib/utils";

interface CourseCardProps {
    course: Course;
    isExpanded: boolean;
    onToggle: () => void;
    index: number;
}

export function CourseCard({ course, isExpanded, onToggle, index }: CourseCardProps) {
    const router = useRouter();
    const isEven = index % 2 === 0;

    const handleReserve = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/about#contact");
    };

    return (
        <div className={cn("relative z-0", isExpanded && "z-10")}>
            <motion.div
                layout
                onClick={!isExpanded ? onToggle : undefined}
                className={cn(
                    "bg-white rounded-3xl overflow-hidden shadow-soft transition-all duration-300 relative border border-primary-100",
                    !isExpanded && "cursor-pointer hover:shadow-lift hover:border-primary-200",
                    // Half screen width when collapsed, 90% width when expanded (10% reduction)
                    isExpanded ? "w-[90%] mx-auto ring-4 ring-primary-50 cursor-auto" : "w-full md:w-[60%]",
                    // Alternating alignment: Even cards left, Odd cards right
                    !isExpanded && isEven && "md:mr-auto",
                    !isExpanded && !isEven && "md:ml-auto"
                )}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <div className={cn("flex flex-col h-full",
                    // Desktop: Row for Even, Row-Reverse for Odd
                    "md:flex-row",
                    !isEven && "md:flex-row-reverse"
                )}>

                    {/* --- IMAGE / TERM PANEL (Collapsed Only) --- */}
                    <AnimatePresence mode="popLayout" initial={false}>
                        {!isExpanded && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "50%" }} // 50% width on desktop
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25, bounce: 0 }}
                                className={cn(
                                    "relative overflow-hidden hidden md:block group",
                                    "w-full md:w-1/2 min-h-[192px]"
                                )}
                            >
                                {course.image.startsWith('/') || course.image.startsWith('http') ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    // Default TERM placeholder with pastel backgrounds
                                    <div className={cn(
                                        "absolute inset-0 flex items-center justify-center p-8 transition-colors duration-500",
                                        // Dynamic pastel colors based on index/logic to match design vibe
                                        // Design shows: Light Cyan/Mint ? and Light Grey ?
                                        // Let's alternate or map specific colors?
                                        // Using existing color classes but with lower opacity background if needed or direct match.
                                        // The data has "bg-accent-teal" etc. Let's use them but ensures they look good.
                                        // If existing class is a bg-*, we assume it's valid.
                                        // Design implies very soft backgrounds.
                                        course.image.includes('teal') ? "bg-[#D0F0F0]" :
                                            course.image.includes('coral') ? "bg-[#FADBD8]" :
                                                course.image.includes('yellow') ? "bg-[#FCF3CF]" :
                                                    course.image.includes('primary') ? "bg-[#D6EAF8]" :
                                                        "bg-[#E5E7E9]" // Default Grey
                                    )}>
                                        <span className={cn(
                                            "font-display font-bold text-6xl uppercase tracking-[0.2em] select-none",
                                            "text-primary-900/5 mix-blend-multiply" // Very subtle text
                                        )}>
                                            TERM
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- CONTENT PANEL --- */}
                    <motion.div
                        layout
                        className={cn("p-5 md:p-8 flex flex-col justify-between bg-white relative",
                            isExpanded ? "w-full" : "w-full md:w-1/2"
                        )}
                    >
                        {/* Header Section */}
                        <motion.div layout="position" className="space-y-4">
                            <div className="flex justify-between items-start">
                                <span className="inline-block px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                    {course.priceLabel}
                                </span>
                                {isExpanded && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onToggle(); }}
                                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-primary-50 text-primary-400 hover:text-primary-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-display font-bold text-primary-900 leading-tight mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-primary-600/80 text-base leading-relaxed max-w-lg">
                                    {course.description}
                                </p>
                            </div>
                        </motion.div>


                        {/* Collapsed Specifics: Highlights + CTA */}
                        {!isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6 mt-6"
                            >
                                <div className="space-y-3">
                                    {course.highlights.slice(0, 2).map((highlight, idx) => (
                                        <div key={idx} className="flex items-center text-primary-500 font-medium">
                                            {/* Sparkle icon style */}
                                            <div className="w-auto h-auto mr-3 text-accent-teal">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-80">
                                                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            {highlight}
                                        </div>
                                    ))}
                                </div>

                                <div className={cn(
                                    "pt-6 border-t border-primary-100/50 flex items-center justify-between group",
                                    !isEven && "flex-row-reverse"
                                )}>
                                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-400 group-hover:text-primary-900 transition-colors">
                                        View Program
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-900 group-hover:scale-110">
                                        {isEven ? (
                                            <ArrowRight className="w-4 h-4 text-primary-900 transition-colors group-hover:text-white" />
                                        ) : (
                                            <ArrowLeft className="w-4 h-4 text-primary-900 transition-colors group-hover:text-white" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}


                        {/* Expanded Content */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-6 border-t border-primary-100 mt-5">

                                        {/* Grid Layout for Expanded Body */}
                                        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8",
                                            !isEven && "lg:grid-flow-dense"
                                        )}>

                                            {/* MAIN CONTENT COL */}
                                            <div className={cn("lg:col-span-8 space-y-5",
                                                !isEven && "lg:col-start-5" // Push to right if odd
                                            )}>
                                                {/* Overview */}
                                                <section>
                                                    <h4 className="font-bold text-primary-900 text-base mb-2">Overview</h4>
                                                    <p className="text-primary-600 leading-relaxed text-sm">
                                                        {course.details.overview}
                                                    </p>
                                                </section>

                                                {/* Focused Areas */}
                                                {course.details.focusedAreas && (
                                                    <section>
                                                        <h4 className="font-bold text-primary-900 text-base mb-2">Focused Areas</h4>
                                                        <ul className="list-disc pl-5 space-y-1.5 text-primary-600 text-sm">
                                                            {course.details.focusedAreas.map((area, px) => (
                                                                <li key={px}>{area}</li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                )}

                                                {/* Key Features (Pills) */}
                                                <section>
                                                    <h4 className="font-bold text-primary-900 text-base mb-2">Key Features</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {course.details.features.map((feature, fx) => (
                                                            <div key={fx} className="flex items-center px-3 py-1.5 rounded-lg bg-primary-50 text-xs font-medium text-primary-800 border border-primary-100">
                                                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-accent-teal" />
                                                                {feature}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            </div>

                                            {/* SIDEBAR COL */}
                                            <div className={cn("lg:col-span-4 space-y-3",
                                                !isEven && "lg:col-start-1" // Pull to left if odd
                                            )}>
                                                {/* Schedule Card */}
                                                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                                                    <div className="flex items-center gap-2.5 mb-2 text-primary-900 font-bold text-sm">
                                                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-accent-coral shadow-sm">
                                                            <Clock className="w-3.5 h-3.5" />
                                                        </div>
                                                        Schedule
                                                    </div>
                                                    <p className="text-primary-600 text-xs pl-9">
                                                        {course.details.schedule}
                                                    </p>
                                                </div>

                                                {/* Age Group Card */}
                                                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                                                    <div className="flex items-center gap-2.5 mb-2 text-primary-900 font-bold text-sm">
                                                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-accent-teal shadow-sm">
                                                            <Users className="w-3.5 h-3.5" />
                                                        </div>
                                                        Age Group
                                                    </div>
                                                    <p className="text-primary-600 text-xs pl-9">
                                                        {course.details.ageGroup}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-primary-100">
                                            <span
                                                className="text-primary-500 font-medium cursor-pointer hover:text-primary-800 transition-colors px-3 py-1.5 text-sm"
                                                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                                            >
                                                Close
                                            </span>
                                            <Button
                                                size="sm"
                                                className="px-6 shadow-lift hover:shadow-xl translate-y-0 hover:-translate-y-1 transition-all text-sm"
                                                onClick={handleReserve}
                                            >
                                                Reserve
                                            </Button>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
