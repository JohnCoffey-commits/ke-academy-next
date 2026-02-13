"use client";

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
    motion,
    useReducedMotion,
    AnimatePresence
} from "framer-motion";
import { cn } from "@/lib/utils";
import { InquirySection } from "@/components/about/InquirySection";

type MarqueeItem = {
    src: string;
    alt: string;
    position?: string;
};

type FacultyMember = {
    name: string;
    role: string;
    bio: string;
    focus: string;
    image: string;
    position?: string;
};

const MARQUEE_ITEMS: MarqueeItem[] = [
    { src: "/images/about_us/01.png", alt: "KE Academy moment 1", position: "left bottom" },
    { src: "/images/about_us/02.png", alt: "KE Academy moment 2", position: "left bottom" },
    { src: "/images/about_us/03.png", alt: "KE Academy moment 3", position: "left bottom" },
    { src: "/images/about_us/04.png", alt: "KE Academy moment 4", position: "left bottom" },
    { src: "/images/about_us/05.png", alt: "KE Academy moment 5", position: "left bottom" },
    { src: "/images/about_us/06.png", alt: "KE Academy moment 6", position: "left bottom" },
    { src: "/images/about_us/07.png", alt: "KE Academy moment 7", position: "left bottom" },
    { src: "/images/about_us/08.png", alt: "KE Academy moment 8", position: "left bottom" },
    { src: "/images/about_us/09.png", alt: "KE Academy moment 9", position: "left bottom" },
    { src: "/images/about_us/10.png", alt: "KE Academy moment 10", position: "left bottom" },
    { src: "/images/about_us/11.png", alt: "KE Academy moment 11", position: "left bottom" },
    { src: "/images/about_us/12.png", alt: "KE Academy moment 12", position: "left bottom" },
    { src: "/images/about_us/13.png", alt: "KE Academy moment 13", position: "left bottom" },
    { src: "/images/about_us/14.png", alt: "KE Academy moment 14", position: "left bottom" },
    { src: "/images/about_us/15.png", alt: "KE Academy moment 15", position: "left bottom" },
];

const FACULTY: FacultyMember[] = [
    {
        name: "Shona",
        role: "Director of Learning",
        bio: "Shona creates warm, engaging learning environments by combining academic rigor with performance-based teaching, helping students build confidence, communication skills, and a genuine love for expressive learning.",
        focus: "Language, Performance & Student Engagement",
        image: "/images/teacher01.png",
        position: "center 28%",
    },
    {
        name: "Mr. Chris",
        role: "Senior English Educator",
        bio: "Chris brings over a decade of teaching experience, guiding students through writing and public speaking with clarity and structure, helping them express ideas confidently and succeed in academic and competitive environments.",
        focus: "Writing, Public Speaking & Academic Excellence",
        image: "/images/teacher02.png",
        position: "center 40%",
    },
    {
        name: "Mr. Scott",
        role: "English & Academic Coach",
        bio: "With 20 years in English education, Scott supports students in reading, writing, and exam preparation, helping them develop critical thinking skills and successfully transition into selective schools and senior academic programs.",
        focus: "English Literacy & Exam Preparation",
        image: "/images/teacher03.png",
        position: "center 62%",
    },
];

const MARQUEE_ROWS = 3;
const RELAY_STEP = Math.floor(MARQUEE_ITEMS.length / MARQUEE_ROWS);
const BASE_DURATION = 44;
const HOVER_SLOWDOWN = 0.55;

const FACULTY_BG_PALETTE = ["#efc59c", "#c6f6d2", "#f7cccb", "#f9d8ad", "#f7e6e6", "#4aabaa"];

type MarqueeRowProps = {
    items: (MarqueeItem & { key: string })[];
    direction: "left" | "right";
    rowIndex: number;
    reduceMotion: boolean;
};

function MarqueeRow({ items, direction, rowIndex, reduceMotion }: MarqueeRowProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const metricsRef = useRef({ singleWidth: 0 });
    const offsetRef = useRef(0);
    const currentSpeedRef = useRef(0);
    const targetSpeedRef = useRef(0);

    useLayoutEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;

            metricsRef.current.singleWidth = track.scrollWidth / 2;

            if (direction === "right" && offsetRef.current === 0) {
                offsetRef.current = -metricsRef.current.singleWidth;
                track.style.transform = `translateX(${offsetRef.current}px)`;
            }
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [direction, items.length]);

    useEffect(() => {
        if (reduceMotion) {
            targetSpeedRef.current = 0;
            currentSpeedRef.current = 0;
            if (trackRef.current) {
                trackRef.current.style.transform = "translateX(0px)";
            }
            return;
        }

        const singleWidth = metricsRef.current.singleWidth;
        const baseSpeed = singleWidth > 0 ? singleWidth / BASE_DURATION : 0;
        targetSpeedRef.current = baseSpeed * (isHovered ? HOVER_SLOWDOWN : 1);
    }, [isHovered, reduceMotion]);

    useEffect(() => {
        if (reduceMotion) return;

        let rafId = 0;
        let lastTime = performance.now();
        const directionFactor = direction === "left" ? -1 : 1;

        const step = (time: number) => {
            const track = trackRef.current;
            if (!track) {
                rafId = requestAnimationFrame(step);
                return;
            }

            const dt = (time - lastTime) / 1000;
            lastTime = time;

            const singleWidth = metricsRef.current.singleWidth;
            if (singleWidth <= 0) {
                rafId = requestAnimationFrame(step);
                return;
            }

            const baseSpeed = singleWidth / BASE_DURATION;
            const targetSpeed = baseSpeed * (isHovered ? HOVER_SLOWDOWN : 1);
            targetSpeedRef.current = targetSpeed;

            const currentSpeed = currentSpeedRef.current;
            const smoothing = 1 - Math.exp(-dt * 6);
            const nextSpeed = currentSpeed + (targetSpeed - currentSpeed) * smoothing;
            currentSpeedRef.current = nextSpeed;

            offsetRef.current += directionFactor * nextSpeed * dt;

            if (directionFactor < 0 && offsetRef.current <= -singleWidth) {
                offsetRef.current += singleWidth;
            } else if (directionFactor > 0 && offsetRef.current >= 0) {
                offsetRef.current -= singleWidth;
            }

            track.style.transform = `translateX(${offsetRef.current}px)`;
            rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [direction, reduceMotion, isHovered]);

    return (
        <div
            className="about-marquee-row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div ref={trackRef} className={cn("about-marquee-track", reduceMotion && "about-marquee-static")}>
                {[...items, ...items].map((item, index) => (
                    <div
                        key={`${item.alt}-${index}`}
                        className="relative h-32 w-56 md:h-40 md:w-72 lg:h-44 lg:w-80 xl:h-48 xl:w-96 flex-shrink-0 overflow-hidden rounded-2xl shadow-soft ring-1 ring-white/10"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 1280px) 24vw, (min-width: 768px) 35vw, 60vw"
                            className="object-cover"
                            style={{ objectPosition: item.position ?? "center" }}
                            priority={rowIndex === 0 && index < 2}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Animation Variants for Page Transitions ---
const ChevronIcon = ({ className }: { className?: string }) => (
    <svg
        width="80"
        height="24"
        viewBox="0 0 48 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M2 2L24 14L46 2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);


export default function AboutPage() {
    const reduceMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(0);
    const [paletteIndex, setPaletteIndex] = useState(0);

    // Throttle wheel events
    const lastWheelTimeRef = useRef(0);

    const marqueeRows = useMemo(() => {
        return Array.from({ length: MARQUEE_ROWS }, (_, rowIndex) => {
            const offset = (rowIndex * RELAY_STEP) % MARQUEE_ITEMS.length;
            const ordered = [
                ...MARQUEE_ITEMS.slice(offset),
                ...MARQUEE_ITEMS.slice(0, offset),
            ];

            return ordered.map((item, index) => ({
                ...item,
                key: `${rowIndex}-${index}`,
            }));
        });
    }, []);


    const changeFaculty = (dir: number) => {
        const nextIndex = (activeIndex + dir + FACULTY.length) % FACULTY.length;

        setActiveIndex(nextIndex);
        setPaletteIndex((prev) => (prev + 1) % FACULTY_BG_PALETTE.length);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastWheelTimeRef.current < 1000) return; // 1s cooldown to prevent rapid switching

        if (Math.abs(e.deltaY) > 50) {
            const dir = e.deltaY > 0 ? 1 : -1;
            changeFaculty(dir);
            lastWheelTimeRef.current = now;
        }
    };

    const activeFaculty = FACULTY[activeIndex];
    const facultyBg = FACULTY_BG_PALETTE[paletteIndex];

    return (
        <div className="bg-surface">
            {/* --- Marquee Section (Unchanged) --- */}
            <section
                className="relative min-h-screen bg-[#0b1f33] text-white pt-6 pb-12 overflow-hidden"
            >
                <div className="px-6 md:px-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.22em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                        ABOUT US
                    </h1>
                </div>

                <div className="mt-10 space-y-4">
                    {marqueeRows.map((rowItems, rowIndex) => (
                        <MarqueeRow
                            key={`row-${rowIndex}`}
                            items={rowItems}
                            direction={rowIndex % 2 === 1 ? "right" : "left"}
                            rowIndex={rowIndex}
                            reduceMotion={reduceMotion ?? false}
                        />
                    ))}
                </div>
            </section>

            {/* --- Faculty Section (Redesigned) --- */}
            <section
                className="relative h-[90vh] md:h-screen lg:h-[90vh] xl:h-[85vh] min-h-[600px] bg-white overflow-hidden"
                onWheel={handleWheel}
            >
                <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                    {/* Left Panel: Faculty Image & Title */}
                    <div
                        className="relative flex flex-col items-center justify-center px-8 py-12 lg:py-0 transition-colors duration-300 ease-out"
                        style={{ backgroundColor: facultyBg }}
                    >
                        <span className="absolute top-8 left-8 text-[11px] uppercase tracking-[0.35em] text-white/60">
                            Faculty
                        </span>

                        <div className="flex flex-col items-center z-10 w-full max-w-lg">
                            {/* Image Container - matched to Narrative card dimensions */}
                            <div className="relative w-64 md:w-80 lg:w-[340px] aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[60vh] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#0b1f33]">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={activeFaculty.image}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Image
                                            src={activeFaculty.image}
                                            alt={`${activeFaculty.name} portrait`}
                                            fill
                                            className="object-cover"
                                            style={{ objectPosition: activeFaculty.position ?? "center" }}
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Text Info - overlay at bottom of image */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeFaculty.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-center"
                                        >
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                                {activeFaculty.name}
                                            </h3>
                                            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mt-2">
                                                {activeFaculty.role}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Narrative & Controls */}
                    <div className="relative flex flex-col items-center justify-center bg-white px-8 lg:px-16 overflow-hidden">
                        <span className="absolute top-8 left-8 text-[11px] uppercase tracking-[0.35em] text-primary-400 z-20">
                            Narrative
                        </span>

                        {/* Navigation Chevrons */}

                        <button
                            onClick={() => changeFaculty(-1)}
                            className="absolute top-4 md:top-8 z-30 p-4 hover:scale-110 transition-transform cursor-pointer"
                            aria-label="Previous Faculty Member"
                        >
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronIcon className="w-16 h-6 md:w-20 md:h-8 text-[#F7E6E6] rotate-180" />
                            </motion.div>
                        </button>

                        <button
                            onClick={() => changeFaculty(1)}
                            className="absolute bottom-4 md:bottom-8 z-30 p-4 hover:scale-110 transition-transform cursor-pointer"
                            aria-label="Next Faculty Member"
                        >
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronIcon className="w-16 h-6 md:w-20 md:h-8 text-[#F7E6E6]" />
                            </motion.div>
                        </button>


                        {/* Content Card Container */}
                        <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[60vh]">
                            <div
                                className="absolute inset-0 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center overflow-hidden shadow-sm z-10 transition-colors duration-300 ease-out"
                                style={{ backgroundColor: facultyBg }}
                            >
                                <motion.div
                                    key={activeFaculty.name}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <p className="text-xs uppercase tracking-[0.3em] text-[#A68A8A] mb-3 md:mb-4">
                                        {activeFaculty.role}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4 md:mb-6">
                                        {activeFaculty.name}
                                    </h2>
                                    <p className="text-[#555] text-base md:text-lg lg:text-lg leading-relaxed mb-6 md:mb-8">
                                        {activeFaculty.bio}
                                    </p>
                                    <div className="pt-6 border-t border-[#E0D0D0]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68A8A]">
                                            Focus: {activeFaculty.focus}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact / Inquiry Section */}
            <InquirySection id="contact" />
        </div>
    );
}
