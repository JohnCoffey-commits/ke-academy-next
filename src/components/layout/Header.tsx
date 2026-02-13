"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    {
        name: "Courses",
        href: "/courses",
        children: [
            { name: "Term Courses", href: "/courses?category=Term" },
            { name: "Holiday Programs", href: "/courses?category=holiday" },
            { name: "Special Programs", href: "/courses?category=special" },
        ]
    },
    { name: "Campuses", href: "/campuses1" },
    { name: "About US", href: "/about" },
    { name: "Resources", href: "/resources" },
];

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isResources = pathname === "/resources" || pathname.startsWith("/resources/");
    const isAbout = pathname === "/about";
    const isDarkHeader = isResources || isAbout;
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className={cn(
                "fixed top-0 z-50 w-full backdrop-blur-md border-b",
                isResources
                    ? "bg-black border-transparent"
                    : isAbout
                        ? "bg-[#0b1f33] border-transparent"
                        : isHome
                            ? "bg-white border-primary-100"
                            : "bg-surface/80 border-primary-100"
            )}>
                <Container>
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 z-50 relative">
                            <Image
                                src="/images/icon.png"
                                alt="KE Academy"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                            <span className={cn(
                                "font-display text-xl font-bold tracking-tight",
                                isDarkHeader ? "text-white" : "text-primary-900"
                            )}>
                                KE Academy
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-8" onMouseLeave={() => setHoveredNav(null)}>
                            {navItems.map((item) => (
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setHoveredNav(item.name)}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors relative py-2 flex items-center gap-1",
                                            isDarkHeader
                                                ? "text-white hover:text-white/80"
                                                : pathname.startsWith(item.href) && item.href !== "/"
                                                    ? "text-primary-800 hover:text-primary-600"
                                                    : "text-primary-500 hover:text-primary-600"
                                        )}
                                    >
                                        {item.name}
                                        {item.children && <ChevronDown className="h-3 w-3" />}
                                        {pathname === item.href && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className={cn(
                                                    "absolute bottom-0 left-0 right-0 h-0.5",
                                                    isDarkHeader ? "bg-white" : "bg-[#901C62]"
                                                )}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>

                                    {/* Desktop Dropdown */}
                                    {item.children && (
                                        <AnimatePresence>
                                            {hoveredNav === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 w-48 pt-2"
                                                >
                                                    <div className={cn(
                                                        "rounded-xl shadow-lift overflow-hidden py-1",
                                                        isDarkHeader
                                                            ? "bg-transparent border border-white"
                                                            : "bg-white border border-primary-100"
                                                    )}>
                                                        {item.children.map(child => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                className={cn(
                                                                    "block px-4 py-2 text-sm transition-colors",
                                                                    isDarkHeader
                                                                        ? "text-white hover:bg-white/10"
                                                                        : "text-primary-600 hover:bg-primary-50 hover:text-accent-teal"
                                                                )}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* CTA & Mobile Menu Toggle */}
                        <div className="flex items-center space-x-4 z-50 relative">
                            <Button
                                variant="accent"
                                size="sm"
                                className={cn(
                                    "hidden md:flex",
                                    isDarkHeader
                                        ? "bg-transparent border border-white text-white hover:bg-white/10"
                                        : "bg-[#C92F6B] hover:bg-[#a82559]"
                                )}
                            >
                                <Link href="/about#contact">Inquire Now</Link>
                            </Button>
                            <button
                                className={cn("md:hidden", isDarkHeader ? "text-white" : "text-primary-500")}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl md:hidden pt-24 px-6"
                    >
                        <nav className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-2xl font-display font-bold text-primary-900 block mb-2"
                                        onClick={() => !item.children && setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.children && (
                                        <div className="pl-4 flex flex-col gap-3 border-l-2 border-primary-100 ml-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="text-lg text-primary-600"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link href="/about#contact" onClick={() => setMobileMenuOpen(false)}>
                                <Button
                                    className="w-full justify-center bg-[#C92F6B] hover:bg-[#a82559] text-white"
                                    size="lg"
                                >
                                    Inquire Now
                                </Button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
