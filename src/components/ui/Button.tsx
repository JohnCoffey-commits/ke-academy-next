"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "accent" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary-800 text-white hover:bg-primary-900 border border-transparent shadow-soft",
            secondary: "bg-surface-card text-primary-800 border border-primary-100 hover:border-primary-300 shadow-sm",
            ghost: "bg-transparent text-primary-600 hover:bg-primary-50",
            accent: "bg-accent-coral text-white hover:bg-red-400 shadow-lift font-bold tracking-wide",
            outline: "bg-transparent text-primary-600 border border-primary-200 hover:bg-primary-50 hover:border-primary-300",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm rounded-lg",
            md: "px-5 py-2.5 text-base rounded-xl",
            lg: "px-8 py-3.5 text-lg rounded-2xl",
            icon: "h-10 w-10 rounded-full p-2 flex items-center justify-center",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";
