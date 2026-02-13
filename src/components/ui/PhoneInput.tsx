"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Common countries with their dial codes and flag emojis
const COUNTRIES = [
    { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺", pattern: /^[0-9]{9}$/ },
    { code: "CN", name: "China", dial: "+86", flag: "🇨🇳", pattern: /^[0-9]{11}$/ },
    { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰", pattern: /^[0-9]{8}$/ },
    { code: "US", name: "United States", dial: "+1", flag: "🇺🇸", pattern: /^[0-9]{10}$/ },
    { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧", pattern: /^[0-9]{10}$/ },
    { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿", pattern: /^[0-9]{9}$/ },
    { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬", pattern: /^[0-9]{8}$/ },
    { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾", pattern: /^[0-9]{9,10}$/ },
    { code: "IN", name: "India", dial: "+91", flag: "🇮🇳", pattern: /^[0-9]{10}$/ },
    { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵", pattern: /^[0-9]{10}$/ },
    { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷", pattern: /^[0-9]{9,10}$/ },
    { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼", pattern: /^[0-9]{9}$/ },
    { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭", pattern: /^[0-9]{10}$/ },
    { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩", pattern: /^[0-9]{9,12}$/ },
    { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭", pattern: /^[0-9]{9}$/ },
    { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳", pattern: /^[0-9]{9,10}$/ },
];

type Country = typeof COUNTRIES[number];

type PhoneInputProps = {
    value: string;
    countryCode: string;
    onChange: (phone: string, countryCode: string) => void;
    label?: string;
    required?: boolean;
    error?: string;
    id?: string;
};

// Try to detect country from browser locale
function detectCountryFromLocale(): string {
    if (typeof navigator === "undefined") return "AU";

    const locale = navigator.language || "en-AU";
    const countryFromLocale = locale.split("-")[1]?.toUpperCase();

    const match = COUNTRIES.find(c => c.code === countryFromLocale);
    return match?.code || "AU";
}

export function PhoneInput({
    value,
    countryCode,
    onChange,
    label,
    required,
    error,
    id,
}: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedCountry = useMemo(() =>
        COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0],
        [countryCode]
    );

    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return COUNTRIES;
        const q = searchQuery.toLowerCase();
        return COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.dial.includes(q) ||
            c.code.toLowerCase().includes(q)
        );
    }, [searchQuery]);

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

    const handleCountrySelect = (country: Country) => {
        onChange(value, country.code);
        setIsOpen(false);
        setSearchQuery("");
        inputRef.current?.focus();
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits
        const cleaned = e.target.value.replace(/\D/g, "");
        onChange(cleaned, countryCode);
    };

    // Validate phone number based on country pattern
    const isValid = useMemo(() => {
        if (!value) return true; // Empty is not invalid, just incomplete
        return selectedCountry.pattern.test(value);
    }, [value, selectedCountry]);

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

            <div className={cn(
                "flex items-stretch rounded-xl border bg-white overflow-hidden",
                "transition-all duration-200",
                "focus-within:ring-2 focus-within:ring-primary-300 focus-within:border-primary-400",
                error
                    ? "border-red-300 focus-within:ring-red-200 focus-within:border-red-400"
                    : "border-primary-200"
            )}>
                {/* Country Selector */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-3 border-r border-primary-200",
                        "hover:bg-primary-50 transition-colors text-sm"
                    )}
                    aria-label="Select country code"
                >
                    <span className="text-lg leading-none">{selectedCountry.flag}</span>
                    <span className="text-primary-600 font-medium">{selectedCountry.dial}</span>
                    <ChevronDown className={cn(
                        "w-3.5 h-3.5 text-primary-400 transition-transform",
                        isOpen && "rotate-180"
                    )} />
                </button>

                {/* Phone Number Input */}
                <input
                    ref={inputRef}
                    type="tel"
                    id={id}
                    value={value}
                    onChange={handlePhoneChange}
                    placeholder="Phone number"
                    className={cn(
                        "flex-1 px-3 py-3 text-sm text-primary-900 placeholder:text-primary-400",
                        "focus:outline-none bg-transparent"
                    )}
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
            {!error && value && !isValid && (
                <p className="mt-1 text-xs text-amber-600">
                    Please enter a valid {selectedCountry.name} phone number
                </p>
            )}

            {/* Country Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-primary-100 overflow-hidden"
                    >
                        {/* Search */}
                        <div className="p-2 border-b border-primary-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search countries..."
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-primary-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Countries List */}
                        <ul className="max-h-48 overflow-y-auto">
                            {filteredCountries.length === 0 ? (
                                <li className="px-4 py-3 text-sm text-primary-400 text-center">
                                    No countries found
                                </li>
                            ) : (
                                filteredCountries.map((country) => (
                                    <li
                                        key={country.code}
                                        onClick={() => handleCountrySelect(country)}
                                        className={cn(
                                            "px-4 py-2.5 flex items-center gap-3 cursor-pointer",
                                            "hover:bg-primary-50 transition-colors text-sm",
                                            selectedCountry.code === country.code && "bg-primary-50 font-medium"
                                        )}
                                    >
                                        <span className="text-lg">{country.flag}</span>
                                        <span className="flex-1 text-primary-900">{country.name}</span>
                                        <span className="text-primary-500">{country.dial}</span>
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

// Export for use in form initialization
export { detectCountryFromLocale, COUNTRIES };
