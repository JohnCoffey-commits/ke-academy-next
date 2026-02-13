"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "default" | "elevated" | "flat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", children, ...props }, ref) => {

        const variants = {
            default: "bg-surface-card border border-primary-100 shadow-soft",
            elevated: "bg-white border border-transparent shadow-lift",
            flat: "bg-primary-50 border border-transparent",
        };

        return (
            <motion.div
                ref={ref}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn(
                    "rounded-2xl p-6 overflow-hidden",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
Card.displayName = "Card";
