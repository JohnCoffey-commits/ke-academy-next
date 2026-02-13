"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { variants } from "@/lib/motion";

const programs = [
    {
        id: "term",
        title: "Term Courses",
        description: "Structured weekly programs that build strong foundations and measurable progress during the school term.",
        image: "/images/termc.png",
        href: "/courses?category=Term"
    },
    {
        id: "holiday",
        title: "Holiday Programs",
        description: "Short, immersive holiday experiences combining learning, creativity and teamwork beyond the classroom.",
        image: "/images/holidayc.png",
        href: "/courses?category=holiday"
    },
    {
        id: "special",
        title: "Special Programs",
        description: "Targeted, high-impact offerings designed for specific goals, partnerships or specialised student needs.",
        image: "/images/specialc.png",
        href: "/courses?category=special"
    }
];

export function CoursesSection() {
    return (
        <section className="relative py-20 lg:py-32 bg-surface-muted overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <Container className="relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={variants.staggerContainer}
                >
                    <div className="text-center mb-16">
                        <motion.h2 variants={variants.slideUp} className="text-3xl md:text-5xl font-display font-bold text-primary-900 mb-4">
                            Our Curriculum
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {programs.map((program) => (
                            <motion.div key={program.id} variants={variants.slideUp}>
                                <Link href={program.href} className="block h-full">
                                    <Card className="h-full flex flex-col group hover:shadow-lift transition-all duration-300 border-primary-100 bg-white cursor-pointer">
                                        {/* Background Image */}
                                        <div className="h-48 w-full relative overflow-hidden">
                                            <Image
                                                src={program.image}
                                                alt={program.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-display font-bold text-primary-900">{program.title}</h3>
                                            </div>

                                            <p className="text-primary-600 mb-6 flex-grow text-sm leading-relaxed">
                                                {program.description}
                                            </p>

                                            <span className="mt-auto inline-flex items-center text-sm font-bold text-primary-700 group-hover:text-accent-coral transition-colors">
                                                View details <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={variants.slideUp} className="text-center">
                        <Link href="/courses">
                            <Button variant="secondary">View Full Curriculum</Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
