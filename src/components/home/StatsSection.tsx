"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

// CountUp Hook
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return { count, ref: nodeRef };
};

const StatItem = ({ value, label, colorClass, suffix = "+" }: { value: number, label: string, colorClass: string, suffix?: string }) => {
    const { count, ref } = useCountUp(value);

    return (
        <div ref={ref} className="text-center">
            <div className={`font-display font-bold text-5xl md:text-6xl mb-2 ${colorClass}`}>
                {count}{suffix}
            </div>
            <div className="text-sm md:text-base font-bold text-primary-400 uppercase tracking-widest">
                {label}
            </div>
        </div>
    );
};

export function StatsSection() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    <StatItem value={700} label="Current Enrollments" colorClass="text-[#4AABAA]" />
                    <StatItem value={150} label="Qualified Staff" colorClass="text-[#7BAB54]" />
                    <StatItem value={30} label="Courses" colorClass="text-[#C92F6B]" />
                    <StatItem value={20} label="Campuses" colorClass="text-[#EFC59C]" />
                </div>
            </Container>
        </section>
    );
}
