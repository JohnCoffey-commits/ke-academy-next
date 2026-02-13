"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3-force";
import { CAMPUSES, CampusData } from "@/lib/data/campuses-22";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface BubbleNode extends d3.SimulationNodeDatum {
    id: number;
    r: number; // radius
    originalR: number; // base radius
    x: number;
    y: number;
    data: CampusData;
    color: string; // Tailored color based on index/type
}

// --- Constants ---
// Vibrant pastel palette for bubbles
const COLORS = [
    "bg-red-200",
    "bg-orange-200",
    "bg-amber-200",
    "bg-yellow-200",
    "bg-lime-200",
    "bg-green-200",
    "bg-emerald-200",
    "bg-teal-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
    "bg-indigo-200",
    "bg-violet-200",
    "bg-purple-200",
    "bg-fuchsia-200",
    "bg-pink-200",
    "bg-rose-200",
];

export function BubbleGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bubbleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const simulationRef = useRef<d3.Simulation<BubbleNode, undefined>>(null);
    const [nodes, setNodes] = useState<BubbleNode[]>([]);
    const [hoveredNode, setHoveredNode] = useState<BubbleNode | null>(null);

    // --- Init Simulation ---
    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const isMobile = width < 768;

        // Size configuration (Desktop)
        // Large: anchors (HQ, major cities)
        // Medium: secondary hubs
        // Small: regional
        const getBubbleRadius = (index: number) => {
            const isLarge = [0, 1, 2, 3, 21, 11, 17, 19, 20].includes(index); // North Syd, Melb, Bris, Perth, London, Chatswood, Epping, Wellington, Singapore
            const isMedium = [4, 5, 6, 12, 13, 14, 15].includes(index);

            if (isMobile) {
                if (isLarge) return 55 + Math.random() * 5;
                if (isMedium) return 45 + Math.random() * 5;
                return 35 + Math.random() * 5;
            } else {
                if (isLarge) return 110 + Math.random() * 10; // Large 110-120
                if (isMedium) return 85 + Math.random() * 10; // Medium 85-95
                return 60 + Math.random() * 10; // Small 60-70
            }
        };

        // Create nodes
        const initialNodes: BubbleNode[] = CAMPUSES.map((campus: CampusData, i: number) => {
            const r = getBubbleRadius(i);
            return {
                id: campus.id,
                r: r,
                originalR: r,
                // Initial spread: cover more screen area initially to reduce convergence time
                x: width / 2 + (Math.random() - 0.5) * (width * 0.6),
                y: height / 2 + (Math.random() - 0.5) * (height * 0.6),
                data: campus,
                color: COLORS[i % COLORS.length],
            };
        });

        setNodes(initialNodes);

        // Physics Forces
        simulationRef.current = d3
            .forceSimulation(initialNodes)
            // Weaken center force to let them spread to edges
            .force("center", d3.forceCenter(width / 2, height / 2).strength(0.02))
            .force("x", d3.forceX(width / 2).strength(0.015))
            .force("y", d3.forceY(height / 2).strength(0.02))
            // Collision detection (prevent overlap)
            .force(
                "collide",
                d3
                    .forceCollide<BubbleNode>()
                    .radius((d) => d.r + 2) // Tighter padding for "packed" feel
                    .strength(0.8)
                    .iterations(3)
            )
            // Repulsion to fill gaps but keep them cohesive
            .force("charge", d3.forceManyBody().strength((d) => {
                const node = d as BubbleNode;
                return -node.r * 1.5;
            })) // Charge proportional to size
            .velocityDecay(0.2)
            .on("tick", () => {
                // Update DOM positions directly via refs for performance
                initialNodes.forEach((node) => {
                    // Boundary Constraint: Keep fully inside view
                    // Constant clamping ensures "rest state" is always clean.
                    const textPadding = 0;

                    // Clamp X
                    node.x = Math.max(node.r + textPadding, Math.min(width - node.r - textPadding, node.x));
                    // Clamp Y
                    node.y = Math.max(node.r + textPadding, Math.min(height - node.r - textPadding, node.y));

                    const el = bubbleRefs.current[node.id];
                    if (el) {
                        el.style.transform = `translate3d(${node.x - node.r}px, ${node.y - node.r
                            }px, 0)`;
                        // Also update width/height ensuring organic shape
                        el.style.width = `${node.r * 2}px`;
                        el.style.height = `${node.r * 2}px`;
                    }
                });
            });

        return () => {
            simulationRef.current?.stop();
        };
    }, []);

    // --- Interaction ---
    const handleMouseEnter = (node: BubbleNode) => {
        if (!simulationRef.current) return;
        setHoveredNode(node);

        // Expand hovered node
        node.r = node.originalR * 1.8; // Scale up 1.8x to fit text

        // Push others away harder
        simulationRef.current
            .force(
                "collide",
                d3
                    .forceCollide<BubbleNode>()
                    .radius((d) => (d.id === node.id ? d.r + 10 : d.r + 5))
                    .strength(0.5)
            )
            .alpha(0.3) // Re-heat simulation
            .restart();
    };

    const handleMouseLeave = (node: BubbleNode) => {
        if (!simulationRef.current) return;
        setHoveredNode(null);

        // Reset radius
        node.r = node.originalR;

        // Reset collision force
        simulationRef.current
            .force(
                "collide",
                d3
                    .forceCollide<BubbleNode>()
                    .radius((d) => d.r + 5)
                    .strength(0.5)
            )
            .alpha(0.3)
            .restart();
    };

    // --- Render ---
    return (
        <div ref={containerRef} className="w-full h-screen relative bg-neutral-50 overflow-hidden">
            {nodes.map((node) => (
                <div
                    key={node.id}
                    ref={(el) => { bubbleRefs.current[node.id] = el; }}
                    className={cn(
                        "absolute rounded-full flex items-center justify-center cursor-pointer shadow-sm transition-colors duration-300",
                        node.color,
                        "hover:shadow-lg hover:z-50" // Elevate on hover
                    )}
                    onMouseEnter={() => handleMouseEnter(node)}
                    onMouseLeave={() => handleMouseLeave(node)}
                    style={{
                        // Initial sizing, updated by tick
                        width: `${node.r * 2}px`,
                        height: `${node.r * 2}px`,
                        willChange: "transform, width, height",
                    }}
                >
                    <div className="text-center px-4 pointer-events-none select-none">
                        <p
                            className={cn(
                                "font-bold text-neutral-800 leading-tight transition-all duration-300",
                                hoveredNode?.id === node.id ? "text-lg mb-1" : "text-sm"
                            )}
                        >
                            {node.data.name}
                        </p>

                        {/* Reveal extra details on hover */}
                        <AnimatePresence>
                            {hoveredNode?.id === node.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-xs text-neutral-600 mt-1 mb-2 font-medium">
                                        {node.data.label}
                                    </p>
                                    {node.data.description && (
                                        <p className="text-[11px] leading-relaxed text-neutral-500 max-w-[140px] mx-auto">
                                            {node.data.description}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            ))}
        </div>
    );
}
