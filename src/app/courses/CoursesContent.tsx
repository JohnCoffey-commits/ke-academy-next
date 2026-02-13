"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/courses/CourseCard";
import { Pagination } from "@/components/courses/Pagination";
import { courses, Course } from "@/content/courses";
import { LayoutGroup } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 5;

// Category filter options
const CATEGORIES = [
  { id: "all", label: "All Courses" },
  { id: "Term", label: "Term Courses" },
  { id: "holiday", label: "Holiday Programs" },
  { id: "special", label: "Special Programs" },
] as const;

type CategoryFilter = typeof CATEGORIES[number]["id"];

// Simple fuzzy search function
function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return true;

  // Split query into words for partial matching
  const queryWords = lowerQuery.split(/\s+/);

  // Check if all query words are found somewhere in the text
  return queryWords.every(word => lowerText.includes(word));
}

// Search function that checks multiple fields
function searchCourse(course: Course, query: string): boolean {
  if (!query.trim()) return true;

  const searchableText = [
    course.title,
    course.description,
    course.priceLabel,
    ...course.highlights,
    ...(course.details.features || []),
    ...(course.details.focusedAreas || []),
    course.details.overview,
    course.details.ageGroup,
  ].join(" ");

  return fuzzyMatch(searchableText, query);
}

export default function CoursesContent() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const listTopRef = useRef<HTMLDivElement>(null);

  // Read category from URL params on mount and when URL changes
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Check if the param matches a valid category ID
      const validCategory = CATEGORIES.find(c => c.id === categoryParam);
      if (validCategory) {
        setActiveCategory(categoryParam as CategoryFilter);
      }
    }
  }, [searchParams]);

  // Filter courses by category and search query
  const filteredCourses = useMemo(() => {
    let result = courses;

    // Apply category filter first
    if (activeCategory !== "all") {
      result = result.filter(course => course.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(course => searchCourse(course, searchQuery));
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Pagination logic based on filtered results
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCategoryChange = useCallback((category: CategoryFilter) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setExpandedId(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    setExpandedId(null);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);

    // Use setTimeout to ensure scroll happens after React re-renders
    setTimeout(() => {
      if (listTopRef.current) {
        listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-surface w-full pb-32">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative z-10 pt-6">
        <Container>
          {/* Page Header */}
          <div className="mb-5 md:mb-8 text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-[0.22em] text-primary-900">
              OUR COURSES
            </h1>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 md:mb-10 space-y-3">
            {/* Controls Row: Category Buttons (left) + Search (right) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                      activeCategory === category.id
                        ? "bg-primary-900 text-white shadow-md"
                        : "bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 hover:border-primary-300"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80 lg:w-96">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-primary-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-12 pr-12 py-2.5 bg-white border border-primary-200 rounded-full text-primary-900 placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all shadow-sm text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-400 hover:text-primary-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-primary-500">
              {filteredCourses.length === 0
                ? "No courses found"
                : `Showing ${filteredCourses.length} course${filteredCourses.length !== 1 ? "s" : ""}`}
              {searchQuery && ` for "${searchQuery}"`}
              {activeCategory !== "all" && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}`}
            </p>
          </div>

          <div ref={listTopRef} className="scroll-mt-32" />

          {/* Course List or Empty State */}
          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-primary-300" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary-900 mb-2">
                No courses found
              </h3>
              <p className="text-primary-500 max-w-md mb-6">
                We couldn't find any courses matching your search. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setCurrentPage(1);
                }}
                className="px-6 py-2.5 bg-primary-900 text-white rounded-full text-sm font-medium hover:bg-primary-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <LayoutGroup>
                <div className="flex flex-col gap-8 md:gap-12">
                  {currentCourses.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                      isExpanded={expandedId === course.id}
                      onToggle={() => handleToggle(course.id)}
                    />
                  ))}
                </div>
              </LayoutGroup>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

        </Container>
      </div>
    </div>
  );
}
