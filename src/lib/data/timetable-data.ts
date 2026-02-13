import { CAMPUSES } from "./campuses-22";

export type TimetableEntry = {
    id: string;
    courseName: string;
    day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    startTime: string;
    endTime: string;
    color?: string;
};

export type CampusTimetable = {
    campusId: number;
    campusName: string;
    entries: TimetableEntry[];
};

// Time slots used across campuses
export const TIME_SLOTS = [
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// Default visible campus tabs (in order)
// These IDs determine which campuses appear as fixed buttons before "More Campuses"
export const DEFAULT_VISIBLE_CAMPUS_IDS = [3, 1, 4]; // Barker College, KE Castle Hill, Beecroft Public School

// Sample timetable data for main campuses
export const CAMPUS_TIMETABLES: CampusTimetable[] = [
    {
        campusId: 3,
        campusName: "Barker College",
        entries: [
            // Public Speaking classes - 8 weeks starting Feb 2, 2026
            // Monday: 2:45 PM – 3:45 PM
            { id: "bc-1", courseName: "Public Speaking", day: "Mon", startTime: "2:45 PM", endTime: "3:45 PM", color: "bg-teal-100 border-teal-300" },
            // Wednesday: 3:00 PM – 4:15 PM
            { id: "bc-2", courseName: "Public Speaking", day: "Wed", startTime: "3:00 PM", endTime: "4:15 PM", color: "bg-teal-100 border-teal-300" },
            // Thursday: 3:00 PM – 4:15 PM
            { id: "bc-3", courseName: "Public Speaking", day: "Thu", startTime: "3:00 PM", endTime: "4:15 PM", color: "bg-teal-100 border-teal-300" },
            // Friday: 2:45 PM – 3:45 PM
            { id: "bc-4", courseName: "Public Speaking", day: "Fri", startTime: "2:45 PM", endTime: "3:45 PM", color: "bg-teal-100 border-teal-300" },
        ],
    },
    {
        campusId: 1,
        campusName: "KE Castle Hill",
        entries: [
            { id: "ch-1", courseName: "English Foundation", day: "Mon", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-blue-100 border-blue-300" },
            { id: "ch-2", courseName: "Mathematics", day: "Mon", startTime: "5:30 PM", endTime: "7:00 PM", color: "bg-green-100 border-green-300" },
            { id: "ch-3", courseName: "Creative Writing", day: "Tue", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-purple-100 border-purple-300" },
            { id: "ch-4", courseName: "Problem Solving", day: "Tue", startTime: "5:30 PM", endTime: "7:00 PM", color: "bg-amber-100 border-amber-300" },
            { id: "ch-5", courseName: "Reading Comprehension", day: "Wed", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-rose-100 border-rose-300" },
            { id: "ch-6", courseName: "Public Speaking", day: "Thu", startTime: "4:30 PM", endTime: "6:00 PM", color: "bg-teal-100 border-teal-300" },
            { id: "ch-7", courseName: "STEM & Coding", day: "Fri", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-indigo-100 border-indigo-300" },
            { id: "ch-8", courseName: "Exam Preparation", day: "Sat", startTime: "10:00 AM", endTime: "12:00 PM", color: "bg-orange-100 border-orange-300" },
            { id: "ch-9", courseName: "OC/Selective Prep", day: "Sat", startTime: "1:00 PM", endTime: "3:00 PM", color: "bg-cyan-100 border-cyan-300" },
        ],
    },
    {
        campusId: 2,
        campusName: "KE Hornsby",
        entries: [
            { id: "hb-1", courseName: "English Skills", day: "Mon", startTime: "4:30 PM", endTime: "6:00 PM", color: "bg-blue-100 border-blue-300" },
            { id: "hb-2", courseName: "Maths Extension", day: "Tue", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-green-100 border-green-300" },
            { id: "hb-3", courseName: "Writing Workshop", day: "Wed", startTime: "4:30 PM", endTime: "6:00 PM", color: "bg-purple-100 border-purple-300" },
            { id: "hb-4", courseName: "Critical Thinking", day: "Thu", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-amber-100 border-amber-300" },
            { id: "hb-5", courseName: "Science Enrichment", day: "Fri", startTime: "4:30 PM", endTime: "6:00 PM", color: "bg-teal-100 border-teal-300" },
            { id: "hb-6", courseName: "Selective School Prep", day: "Sat", startTime: "9:30 AM", endTime: "11:30 AM", color: "bg-orange-100 border-orange-300" },
        ],
    },
    {
        campusId: 20,
        campusName: "KE Hong Kong",
        entries: [
            { id: "hk-1", courseName: "English Immersion", day: "Mon", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-blue-100 border-blue-300" },
            { id: "hk-2", courseName: "Mathematics Mastery", day: "Mon", startTime: "6:00 PM", endTime: "7:00 PM", color: "bg-green-100 border-green-300" },
            { id: "hk-3", courseName: "Academic Writing", day: "Wed", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-purple-100 border-purple-300" },
            { id: "hk-4", courseName: "Verbal Reasoning", day: "Thu", startTime: "4:30 PM", endTime: "6:00 PM", color: "bg-amber-100 border-amber-300" },
            { id: "hk-5", courseName: "Interview Skills", day: "Sat", startTime: "10:00 AM", endTime: "12:00 PM", color: "bg-rose-100 border-rose-300" },
        ],
    },
    {
        campusId: 21,
        campusName: "KE Chong Qing",
        entries: [
            { id: "cq-1", courseName: "English Foundation", day: "Tue", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-blue-100 border-blue-300" },
            { id: "cq-2", courseName: "Advanced Maths", day: "Thu", startTime: "4:00 PM", endTime: "5:30 PM", color: "bg-green-100 border-green-300" },
            { id: "cq-3", courseName: "Essay Writing", day: "Sat", startTime: "9:00 AM", endTime: "11:00 AM", color: "bg-purple-100 border-purple-300" },
            { id: "cq-4", courseName: "Logic & Reasoning", day: "Sat", startTime: "11:30 AM", endTime: "1:00 PM", color: "bg-amber-100 border-amber-300" },
        ],
    },
    {
        campusId: 22,
        campusName: "KE Shang Hai",
        entries: [
            { id: "sh-1", courseName: "English Excellence", day: "Mon", startTime: "5:00 PM", endTime: "6:30 PM", color: "bg-blue-100 border-blue-300" },
            { id: "sh-2", courseName: "Maths Olympiad Prep", day: "Wed", startTime: "5:00 PM", endTime: "6:30 PM", color: "bg-green-100 border-green-300" },
            { id: "sh-3", courseName: "Creative Writing", day: "Fri", startTime: "5:00 PM", endTime: "6:30 PM", color: "bg-purple-100 border-purple-300" },
            { id: "sh-4", courseName: "Debate & Public Speaking", day: "Sat", startTime: "2:00 PM", endTime: "4:00 PM", color: "bg-teal-100 border-teal-300" },
        ],
    },
];

// Get timetable for a specific campus by ID
export function getTimetableByCampusId(campusId: number): CampusTimetable | undefined {
    return CAMPUS_TIMETABLES.find((t) => t.campusId === campusId);
}

// Get all campuses that have timetables
export function getCampusesWithTimetables() {
    const campusIds = new Set(CAMPUS_TIMETABLES.map((t) => t.campusId));
    return CAMPUSES.filter((c) => campusIds.has(c.id));
}

// Get all campuses (for dropdown showing all with disabled states)
export function getAllCampuses() {
    return CAMPUSES;
}

// Check if a campus has timetable data
export function campusHasTimetable(campusId: number): boolean {
    return CAMPUS_TIMETABLES.some((t) => t.campusId === campusId);
}

// Get ordered default visible campuses
export function getDefaultVisibleCampuses() {
    return DEFAULT_VISIBLE_CAMPUS_IDS
        .map((id) => CAMPUSES.find((c) => c.id === id))
        .filter(Boolean) as typeof CAMPUSES;
}
