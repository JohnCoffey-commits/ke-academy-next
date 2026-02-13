"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { variants } from "@/lib/motion";

interface HeroSectionProps {
    title: string;
    subtitle: string;
    align?: "center" | "left";
    children?: React.ReactNode;
    className?: string;
    pattern?: "none" | "dots" | "grid";
}

export function HeroSection({
    title,
    subtitle,
    align = "center",
    children,
    className,
    pattern = "none"
}: HeroSectionProps) {

    return (
        <section className={cn("relative py-20 lg:py-32 overflow-hidden", className)}>

            {/* Background patterns */}
            {pattern === "dots" && (
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-50" />
            )}

            {pattern === "grid" && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
            )}

            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={variants.staggerContainer}
                    className={cn("max-w-4xl mx-auto", align === "center" ? "text-center" : "text-left")}
                >
                    <motion.h1
                        variants={variants.slideUp}
                        className="font-display text-4xl font-bold tracking-tight text-primary-900 sm:text-6xl mb-6"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        variants={variants.slideUp}
                        className="text-lg leading-8 text-primary-600 mb-10 max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div variants={variants.slideUp}>
                        {children}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
