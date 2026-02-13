"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate array of page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-16 pb-16">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                    "hover:bg-primary-50 text-primary-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                )}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
                {pages.map((page) => {
                    // Basic truncated logic if many pages, but sticking to simple list for "max 5 items" requirement usually implying small total sets mostly. 
                    // If we have many pages, we might need ... ellipsis. Assuming small set for now based on context.
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "w-10 h-10 rounded-full text-sm font-medium transition-all",
                                currentPage === page
                                    ? "bg-primary-900 text-white shadow-md scale-105"
                                    : "text-primary-600 hover:bg-primary-50"
                            )}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                    "hover:bg-primary-50 text-primary-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                )}
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
