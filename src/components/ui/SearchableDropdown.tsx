"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownOption = {
    id: string | number;
    label: string;
    searchTerms?: string; // Additional terms for fuzzy search
};

type SearchableDropdownProps = {
    options: DropdownOption[];
    value: DropdownOption | null;
    onChange: (option: DropdownOption | null) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    maxVisible?: number;
    id?: string;
};

// Simple fuzzy match
function fuzzyMatch(text: string, query: string): boolean {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return true;
    const words = lowerQuery.split(/\s+/);
    return words.every(word => lowerText.includes(word));
}

export function SearchableDropdown({
    options,
    value,
    onChange,
    placeholder = "Select...",
    label,
    required,
    error,
    disabled,
    maxVisible = 5,
    id,
}: SearchableDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) return options;
        return options.filter(opt =>
            fuzzyMatch(`${opt.label} ${opt.searchTerms || ""}`, searchQuery)
        );
    }, [options, searchQuery]);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset highlight when filtered options change
    useEffect(() => {
        setHighlightedIndex(0);
    }, [filteredOptions.length]);

    // Scroll highlighted item into view
    useEffect(() => {
        if (isOpen && listRef.current) {
            const item = listRef.current.children[highlightedIndex] as HTMLElement;
            item?.scrollIntoView({ block: "nearest" });
        }
    }, [highlightedIndex, isOpen]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex(i => Math.min(i + 1, filteredOptions.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex(i => Math.max(i - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    onChange(filteredOptions[highlightedIndex]);
                    setIsOpen(false);
                    setSearchQuery("");
                }
                break;
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                setSearchQuery("");
                break;
        }
    }, [isOpen, filteredOptions, highlightedIndex, onChange]);

    const handleSelect = (option: DropdownOption) => {
        onChange(option);
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setSearchQuery("");
    };

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div ref={containerRef} className="relative">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-primary-700 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            {/* Trigger - using div to avoid nested button issues */}
            <div
                id={id}
                role="combobox"
                tabIndex={disabled ? -1 : 0}
                onClick={handleOpen}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-disabled={disabled}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white",
                    "text-left text-sm transition-all duration-200 cursor-pointer select-none",
                    "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400",
                    error
                        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                        : "border-primary-200 hover:border-primary-300",
                    disabled && "opacity-50 cursor-not-allowed bg-primary-50"
                )}
            >
                <span className={cn(
                    "truncate",
                    value ? "text-primary-900" : "text-primary-400"
                )}>
                    {value?.label || placeholder}
                </span>
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    {value && !disabled && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleClear}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onChange(null);
                                    setSearchQuery("");
                                }
                            }}
                            className="p-0.5 hover:bg-primary-100 rounded transition-colors cursor-pointer"
                            aria-label="Clear selection"
                        >
                            <X className="w-3.5 h-3.5 text-primary-400" />
                        </span>
                    )}
                    <ChevronDown className={cn(
                        "w-4 h-4 text-primary-400 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )} />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-primary-100 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="p-2 border-b border-primary-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search..."
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-primary-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300"
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <ul
                            ref={listRef}
                            role="listbox"
                            className="overflow-y-auto"
                            style={{ maxHeight: `${maxVisible * 44}px` }}
                        >
                            {filteredOptions.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-primary-400 text-center">
                                    No results found
                                </li>
                            ) : (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={option.id}
                                        role="option"
                                        aria-selected={value?.id === option.id}
                                        onClick={() => handleSelect(option)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        className={cn(
                                            "px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between",
                                            "transition-colors duration-150",
                                            index === highlightedIndex
                                                ? "bg-primary-50"
                                                : "hover:bg-primary-50/50",
                                            value?.id === option.id && "text-primary-900 font-medium"
                                        )}
                                    >
                                        <span className="truncate">{option.label}</span>
                                        {value?.id === option.id && (
                                            <Check className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
