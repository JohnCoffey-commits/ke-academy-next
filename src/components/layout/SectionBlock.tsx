"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { variants } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionBlockProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    background?: "white" | "muted" | "brand";
}

export function SectionBlock({
    title,
    description,
    children,
    className,
    background = "white"
}: SectionBlockProps) {

    const bgStyles = {
        white: "bg-surface",
        muted: "bg-surface-muted",
        brand: "bg-primary-900 text-white",
    };

    const textStyles = {
        white: "text-primary-900",
        muted: "text-primary-900",
        brand: "text-white",
    };

    const descStyles = {
        white: "text-primary-500",
        muted: "text-primary-600",
        brand: "text-primary-100",
    };

    return (
        <section className={cn("py-16 lg:py-24", bgStyles[background], className)}>
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={variants.staggerContainer}
                    className="space-y-12"
                >
                    <div className="max-w-2xl">
                        <motion.h2 variants={variants.slideUp} className={cn("text-3xl font-display font-bold tracking-tight sm:text-4xl", textStyles[background])}>
                            {title}
                        </motion.h2>
                        {description && (
                            <motion.p variants={variants.slideUp} className={cn("mt-4 text-lg", descStyles[background])}>
                                {description}
                            </motion.p>
                        )}
                    </div>

                    <motion.div variants={variants.slideUp}>
                        {children}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
