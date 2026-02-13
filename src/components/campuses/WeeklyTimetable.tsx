"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import {
    DAYS,
    getAllCampuses,
    campusHasTimetable,
    getTimetableByCampusId,
    DEFAULT_VISIBLE_CAMPUS_IDS,
    type TimetableEntry,
} from "@/lib/data/timetable-data";

const SYDNEY_TIMEZONE = "Australia/Sydney";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const MONTH_NAMES_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Get current date/time in Sydney timezone
function getSydneyDate(): Date {
    // Get current time as string in Sydney timezone
    const formatter = new Intl.DateTimeFormat("en-AU", {
        timeZone: SYDNEY_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    
    const parts = formatter.formatToParts(new Date());
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || "0";
    
    // Create a date object representing Sydney time (treating it as local)
    return new Date(
        parseInt(getPart("year")),
        parseInt(getPart("month")) - 1,
        parseInt(getPart("day")),
        parseInt(getPart("hour")),
        parseInt(getPart("minute")),
        parseInt(getPart("second"))
    );
}

// Get today's date components in Sydney timezone
function getSydneyToday(): { year: number; month: number; day: number } {
    const sydneyDate = getSydneyDate();
    return {
        year: sydneyDate.getFullYear(),
        month: sydneyDate.getMonth(),
        day: sydneyDate.getDate(),
    };
}

// Check if a date matches today in Sydney timezone
function isToday(date: Date): boolean {
    const today = getSydneyToday();
    return (
        date.getFullYear() === today.year &&
        date.getMonth() === today.month &&
        date.getDate() === today.day
    );
}

// Check if a specific day in a month/year is today in Sydney timezone
function isTodayInMonth(year: number, month: number, day: number): boolean {
    const today = getSydneyToday();
    return year === today.year && month === today.month && day === today.day;
}

// Get week dates for a given Monday date
function getWeekDatesFromMonday(monday: Date): Date[] {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date);
    }
    return dates;
}

// Get the Monday of the current week (Sydney timezone)
function getCurrentMonday(): Date {
    const sydneyDate = getSydneyDate();
    const dayOfWeek = sydneyDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(sydneyDate);
    monday.setDate(sydneyDate.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

// Get compact calendar grid for a month (minimal rows)
function getCompactMonthGrid(year: number, month: number): (number | null)[][] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
        currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        weeks.push(currentWeek);
    }

    return weeks;
}

// Check if a date has classes
function dateHasClasses(dayOfWeek: number, entries: TimetableEntry[]): boolean {
    const dayName = DAYS[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
    return entries.some((e) => e.day === dayName);
}

// Check if a specific day number in a month has classes
function dayHasClasses(year: number, month: number, day: number, entries: TimetableEntry[]): boolean {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return dateHasClasses(dayOfWeek, entries);
}

export function WeeklyTimetable() {
    // Get ALL campuses for the dropdown
    const allCampuses = useMemo(() => getAllCampuses(), []);
    
    // Track the order of visible campus IDs (session-only, resets on refresh)
    const [visibleCampusIds, setVisibleCampusIds] = useState<number[]>(DEFAULT_VISIBLE_CAMPUS_IDS);
    const [selectedCampusId, setSelectedCampusId] = useState(DEFAULT_VISIBLE_CAMPUS_IDS[0] ?? 1);
    const [viewMode, setViewMode] = useState<"week" | "month">("week");
    const [showMoreCampuses, setShowMoreCampuses] = useState(false);
    const [currentMonday, setCurrentMonday] = useState<Date>(getCurrentMonday);
    // Initialize year based on Sydney timezone
    const [selectedYear, setSelectedYear] = useState(() => getSydneyToday().year);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMoreCampuses(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Visible campus tabs - derived from current order
    const visibleCampuses = useMemo(() => {
        return visibleCampusIds
            .map((id) => allCampuses.find((c) => c.id === id))
            .filter(Boolean) as typeof allCampuses;
    }, [visibleCampusIds, allCampuses]);
    
    // "More Campuses" shows ALL campuses except the currently visible ones
    const moreCampuses = useMemo(() => {
        const visibleIds = new Set(visibleCampusIds);
        return allCampuses.filter((c) => !visibleIds.has(c.id));
    }, [allCampuses, visibleCampusIds]);

    // Search state for More Campuses dropdown
    const [moreCampusSearch, setMoreCampusSearch] = useState("");
    const filteredMoreCampuses = useMemo(() => {
        if (!moreCampusSearch.trim()) return moreCampuses;
        const query = moreCampusSearch.toLowerCase();
        return moreCampuses.filter(campus =>
            campus.name.toLowerCase().includes(query)
        );
    }, [moreCampuses, moreCampusSearch]);

    const currentTimetable = useMemo(
        () => getTimetableByCampusId(selectedCampusId),
        [selectedCampusId]
    );

    const weekDates = useMemo(() => getWeekDatesFromMonday(currentMonday), [currentMonday]);

    // Get month/year from the Sunday of the current week
    const weekSunday = weekDates[6];
    const displayMonth = MONTH_NAMES[weekSunday.getMonth()];
    const displayYear = weekSunday.getFullYear();

    // Group entries by day for week view
    const entriesByDay = useMemo(() => {
        const grouped: Record<string, TimetableEntry[]> = {};
        DAYS.forEach((day) => {
            grouped[day] = currentTimetable?.entries.filter((e) => e.day === day) ?? [];
        });
        return grouped;
    }, [currentTimetable]);

    const handleSelectFromMore = (campusId: number) => {
        // Only allow selection if campus has timetable data
        if (!campusHasTimetable(campusId)) return;
        
        // Promote selected campus to first position in visible tabs
        setVisibleCampusIds((prev) => {
            // Remove the campus if it's already in visible (shouldn't happen, but safe)
            const filtered = prev.filter((id) => id !== campusId);
            // Add to front, keep only 3 visible tabs
            return [campusId, ...filtered].slice(0, 3);
        });
        
        setSelectedCampusId(campusId);
        setShowMoreCampuses(false);
    };

    // Navigate to the first week of a specific month
    const navigateToMonth = (year: number, month: number) => {
        // Get the first day of the month
        const firstOfMonth = new Date(year, month, 1);
        // Find the Monday of that week
        const dayOfWeek = firstOfMonth.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(firstOfMonth);
        monday.setDate(firstOfMonth.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);
        
        setCurrentMonday(monday);
        setViewMode("week");
    };

    const navigateWeek = (direction: "prev" | "next") => {
        setCurrentMonday((prev) => {
            const newMonday = new Date(prev);
            newMonday.setDate(prev.getDate() + (direction === "next" ? 7 : -7));
            return newMonday;
        });
    };

    const formatDate = (date: Date) => date.getDate();

    return (
        <section className="min-h-screen bg-neutral-50 py-20 lg:py-28">
            <Container>
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <div className="max-w-xl">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                            Class Timetable
                        </h2>
                        <p className="text-primary-600">
                            Select a campus to view its class schedule.
                        </p>
                    </div>
                </div>

                {/* Campus Selection with View Toggle */}
                <div className="mb-8 flex flex-wrap items-center gap-2 justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {visibleCampuses.map((campus) => (
                            <button
                                key={campus.id}
                                onClick={() => setSelectedCampusId(campus.id)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                                    "whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2",
                                    selectedCampusId === campus.id
                                        ? "bg-primary-900 text-white shadow-md"
                                        : "bg-white text-primary-700 border border-primary-200 hover:border-primary-400 hover:bg-primary-50"
                                )}
                            >
                                {campus.name}
                            </button>
                        ))}

                        {moreCampuses.length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => {
                                        setShowMoreCampuses(!showMoreCampuses);
                                        setMoreCampusSearch("");
                                    }}
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                                        "whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2",
                                        "bg-white text-primary-700 border border-primary-200 hover:border-primary-400 hover:bg-primary-50",
                                        "flex items-center gap-2"
                                    )}
                                >
                                    More Campuses
                                    <svg
                                        className={cn(
                                            "w-4 h-4 transition-transform duration-200",
                                            showMoreCampuses && "rotate-180"
                                        )}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {showMoreCampuses && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-primary-100 z-20 min-w-[240px] overflow-hidden"
                                        >
                                            {/* Search Input */}
                                            <div className="p-2 border-b border-primary-100">
                                                <div className="relative">
                                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    <input
                                                        type="text"
                                                        value={moreCampusSearch}
                                                        onChange={(e) => setMoreCampusSearch(e.target.value)}
                                                        placeholder="Search campuses..."
                                                        className="w-full pl-9 pr-3 py-2 text-sm border border-primary-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                            {/* Filtered Campus List */}
                                            <ul className="max-h-52 overflow-y-auto py-1">
                                                {filteredMoreCampuses.length === 0 ? (
                                                    <li className="px-4 py-3 text-sm text-primary-400 text-center">
                                                        No campuses found
                                                    </li>
                                                ) : (
                                                    filteredMoreCampuses.map((campus) => {
                                                        const hasTimetable = campusHasTimetable(campus.id);
                                                        return (
                                                            <li key={campus.id}>
                                                                <button
                                                                    onClick={() => handleSelectFromMore(campus.id)}
                                                                    disabled={!hasTimetable}
                                                                    className={cn(
                                                                        "w-full px-4 py-2.5 text-left text-sm transition-colors",
                                                                        hasTimetable
                                                                            ? "text-primary-700 hover:bg-primary-50 cursor-pointer"
                                                                            : "text-primary-300 cursor-not-allowed"
                                                                    )}
                                                                >
                                                                    {campus.name}
                                                                </button>
                                                            </li>
                                                        );
                                                    })
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-primary-100 rounded-full">
                        <button
                            onClick={() => setViewMode("week")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                viewMode === "week"
                                    ? "bg-white text-primary-900 shadow-sm"
                                    : "text-primary-600 hover:text-primary-800"
                            )}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setViewMode("month")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                viewMode === "month"
                                    ? "bg-white text-primary-900 shadow-sm"
                                    : "text-primary-600 hover:text-primary-800"
                            )}
                        >
                            Month
                        </button>
                    </div>
                </div>

                {/* Timetable Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedCampusId}-${viewMode}-${currentMonday.getTime()}-${selectedYear}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-white rounded-2xl shadow-sm border border-primary-100 overflow-hidden"
                    >
                        {viewMode === "week" ? (
                            <>
                                {/* Week Navigation Header */}
                                <div className="flex items-center justify-center gap-6 py-4 border-b border-primary-100 bg-white">
                                    <button
                                        onClick={() => navigateWeek("prev")}
                                        className="p-2 rounded-full hover:bg-primary-50 transition-colors text-primary-600 hover:text-primary-900"
                                        aria-label="Previous week"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <div className="text-center min-w-[180px]">
                                        <span className="text-xl font-bold text-primary-900">{displayMonth}</span>
                                        <span className="text-xl text-primary-400 font-normal ml-2">{displayYear}</span>
                                    </div>
                                    <button
                                        onClick={() => navigateWeek("next")}
                                        className="p-2 rounded-full hover:bg-primary-50 transition-colors text-primary-600 hover:text-primary-900"
                                        aria-label="Next week"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Week View - Desktop */}
                                <div className="hidden md:block overflow-x-auto">
                                    <div className="min-w-[900px]">
                                        {/* Day Headers with Dates */}
                                        <div className="grid grid-cols-7 border-b border-primary-100">
                                            {DAYS.map((day, index) => {
                                                const dateIsToday = isToday(weekDates[index]);
                                                return (
                                                    <div
                                                        key={day}
                                                        className={cn(
                                                            "px-3 py-3 text-center border-r border-primary-100 last:border-r-0",
                                                            dateIsToday ? "bg-primary-100" : "bg-primary-50"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "font-semibold",
                                                            dateIsToday ? "text-primary-900" : "text-primary-800"
                                                        )}>{day}</div>
                                                        <div className={cn(
                                                            "text-sm mt-0.5",
                                                            dateIsToday ? "text-primary-700 font-medium" : "text-primary-500"
                                                        )}>
                                                            {formatDate(weekDates[index])}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Timetable Content */}
                                        <div className="grid grid-cols-7 min-h-[380px]">
                                            {DAYS.map((day, index) => {
                                                const dateIsToday = isToday(weekDates[index]);
                                                return (
                                                    <div
                                                        key={day}
                                                        className={cn(
                                                            "border-r border-primary-100 last:border-r-0 p-3 flex flex-col gap-2",
                                                            dateIsToday && "bg-primary-50/50"
                                                        )}
                                                    >
                                                        {entriesByDay[day].length > 0 ? (
                                                            entriesByDay[day].map((entry) => (
                                                                <div
                                                                    key={entry.id}
                                                                    className={cn(
                                                                        "rounded-lg p-3 border-l-4 transition-shadow hover:shadow-md",
                                                                        entry.color ?? "bg-gray-100 border-gray-300"
                                                                    )}
                                                                >
                                                                    <p className="font-medium text-primary-900 text-sm leading-tight mb-1">
                                                                        {entry.courseName}
                                                                    </p>
                                                                    <p className="text-xs text-primary-500">
                                                                        {entry.startTime} - {entry.endTime}
                                                                    </p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="flex-1 flex items-center justify-center">
                                                                <span className="text-xs text-primary-300">—</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Week View - Mobile */}
                                <div className="md:hidden divide-y divide-primary-100">
                                    {DAYS.map((day, index) => {
                                        const dateIsToday = isToday(weekDates[index]);
                                        return (
                                            <div key={day} className={cn(
                                                "p-4",
                                                dateIsToday && "bg-primary-50"
                                            )}>
                                                <div className="flex items-baseline gap-2 mb-3">
                                                    <h4 className={cn(
                                                        "font-semibold",
                                                        dateIsToday ? "text-primary-900" : "text-primary-800"
                                                    )}>{day}</h4>
                                                    <span className={cn(
                                                        "text-sm",
                                                        dateIsToday ? "text-primary-700 font-medium" : "text-primary-500"
                                                    )}>{formatDate(weekDates[index])}</span>
                                                    {dateIsToday && (
                                                        <span className="text-xs bg-primary-200 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                                                            Today
                                                        </span>
                                                    )}
                                                </div>
                                                {entriesByDay[day].length > 0 ? (
                                                    <div className="space-y-2">
                                                        {entriesByDay[day].map((entry) => (
                                                            <div
                                                                key={entry.id}
                                                                className={cn(
                                                                    "rounded-lg p-3 border-l-4",
                                                                    entry.color ?? "bg-gray-100 border-gray-300"
                                                                )}
                                                            >
                                                                <p className="font-medium text-primary-900 text-sm">
                                                                    {entry.courseName}
                                                                </p>
                                                                <p className="text-xs text-primary-500 mt-0.5">
                                                                    {entry.startTime} - {entry.endTime}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-primary-300">No classes</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            /* Year View - 12 Month Grid */
                            <div className="p-6 md:p-8">
                                {/* Year Header */}
                                <div className="flex items-center justify-center gap-6 mb-8">
                                    <button
                                        onClick={() => setSelectedYear((y) => y - 1)}
                                        className="p-2 rounded-full hover:bg-primary-50 transition-colors text-primary-600 hover:text-primary-900"
                                        aria-label="Previous year"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary-900 min-w-[100px] text-center">
                                        {selectedYear}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedYear((y) => y + 1)}
                                        className="p-2 rounded-full hover:bg-primary-50 transition-colors text-primary-600 hover:text-primary-900"
                                        aria-label="Next year"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* 12-Month Grid (3 rows × 4 columns) */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {Array.from({ length: 12 }, (_, monthIndex) => {
                                        const grid = getCompactMonthGrid(selectedYear, monthIndex);
                                        return (
                                            <button
                                                key={monthIndex}
                                                onClick={() => navigateToMonth(selectedYear, monthIndex)}
                                                className="text-center p-3 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                                            >
                                                {/* Month Name */}
                                                <h4 className="text-sm font-semibold text-primary-800 mb-2 group-hover:text-primary-900">
                                                    {MONTH_NAMES_SHORT[monthIndex]}
                                                </h4>

                                                {/* Mini Calendar Grid */}
                                                <div className="space-y-0.5">
                                                    {/* Day headers */}
                                                    <div className="grid grid-cols-7 gap-0.5">
                                                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                                                            <div key={i} className="text-[9px] text-primary-400 font-medium">
                                                                {d}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Weeks */}
                                                    {grid.map((week, weekIdx) => (
                                                        <div key={weekIdx} className="grid grid-cols-7 gap-0.5">
                                                            {week.map((day, dayIdx) => {
                                                                const hasClass = day && currentTimetable
                                                                    ? dayHasClasses(selectedYear, monthIndex, day, currentTimetable.entries)
                                                                    : false;
                                                                const dayIsToday = day ? isTodayInMonth(selectedYear, monthIndex, day) : false;
                                                                return (
                                                                    <div
                                                                        key={dayIdx}
                                                                        className="aspect-square flex items-center justify-center"
                                                                    >
                                                                        {day && (
                                                                            <span
                                                                                className={cn(
                                                                                    "text-[10px] md:text-xs leading-none flex items-center justify-center",
                                                                                    dayIsToday 
                                                                                        ? "w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500 text-black font-semibold"
                                                                                        : hasClass
                                                                                            ? "text-primary-900 font-semibold"
                                                                                            : "text-primary-300"
                                                                                )}
                                                                            >
                                                                                {day}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Campus Info Footer */}
                {currentTimetable && (
                    <motion.p
                        key={`info-${selectedCampusId}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-sm text-primary-500 text-center"
                    >
                        Showing schedule for{" "}
                        <span className="font-medium text-primary-700">
                            {currentTimetable.campusName}
                        </span>
                    </motion.p>
                )}
            </Container>
        </section>
    );
}
