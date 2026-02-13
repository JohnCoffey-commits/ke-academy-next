import { Course, Teacher, Campus, Resource } from "@/lib/types";

export const courses: Course[] = [
    {
        id: "primary-math",
        title: "Junior Mathematics Olympiad",
        ageGroup: "Years 3-6",
        category: "Primary",
        description: "Developing critical thinking and problem-solving through advanced mathematical concepts.",
    },
    {
        id: "hs-english",
        title: "HSC English Advanced",
        ageGroup: "Years 11-12",
        category: "High School",
        description: "Comprehensive analysis of texts and mastery of essay writing techniques for the HSC.",
    },
    {
        id: "holiday-coding",
        title: "Creative Coding Camp",
        ageGroup: "Ages 8-14",
        category: "Holiday",
        description: "A fun, interactive introduction to Python and web development basics.",
    },
    {
        id: "science-prep",
        title: "Science Foundations",
        ageGroup: "Years 7-10",
        category: "High School",
        description: "Building a robust understanding of Physics, Chemistry, and Biology principles.",
    },
];

export const teachers: Teacher[] = [
    {
        id: "t1",
        name: "Dr. Sarah Chen",
        role: "Principal",
        bio: "Over 20 years of experience in elite education and curriculum design.",
    },
    {
        id: "t2",
        name: "Mr. James Thorburne",
        role: "Head of Mathematics",
        bio: "Passionate about making complex mathematical theories accessible to young minds.",
    },
];

export const campuses: Campus[] = [
    {
        id: "north",
        name: "North Shore Campus",
        address: "128 Pacific Hwy, North Sydney",
        features: ["Science Labs", "Library", "Study Lounge"],
    },
    {
        id: "city",
        name: "City Campus",
        address: "45 York Street, Sydney CBD",
        features: ["Multimedia Studio", "Quiet Zones"],
    },
];

export const resources: Resource[] = [
    {
        id: "r1",
        title: "2026 Admissions Guide",
        type: "PDF",
        date: "Jan 10, 2026",
    },
    {
        id: "r2",
        title: "Top 10 Study Tips for HSC",
        type: "Article",
        date: "Dec 15, 2025",
    },
];
