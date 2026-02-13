export type ResourceItem = {
    id: string;
    title: string;
    category: string;
    image: string;
    position?: string;
    summary: string;
    // External link support
    href?: string;           // Custom URL (if provided, overrides default /resources/[id])
    isExternal?: boolean;    // If true, opens in new tab
};

export const resources: ResourceItem[] = [
    {
        id: "oc-past-papers",
        title: "OC Past Papers",
        category: "Past Papers",
        image: "/images/resources/oc-past-papers.png",
        position: "center",
        summary: "Official OC (Opportunity Class) past examination papers for practice and preparation.",
        href: "https://www.preunibaulkhamhills.com.au/oc-past-papers",
        isExternal: true,
    },
    {
        id: "selective-past-papers",
        title: "Selective Past Papers",
        category: "Past Papers",
        image: "/images/resources/selective-past-papers.png",
        position: "center",
        summary: "Official Selective School past examination papers for practice and preparation.",
        href: "https://www.preunibaulkhamhills.com.au/selective-past-papers",
        isExternal: true,
    },
    {
        id: "admissions-guide-2026",
        title: "2026 Admissions Guide",
        category: "Guide",
        image: "/Home_bg1.jpeg",
        position: "center 40%",
        summary: "A structured overview of the KE Academy admissions journey, timeline, and key milestones.",
    },
    {
        id: "hsc-study-frameworks",
        title: "HSC Study Frameworks",
        category: "Toolkit",
        image: "/Home_bg2.jpeg",
        position: "center 30%",
        summary: "Frameworks and planning templates used by top-performing cohorts.",
    },
    {
        id: "portfolio-playbook",
        title: "Portfolio Playbook",
        category: "Case Study",
        image: "/Home_bg1.jpeg",
        position: "center 65%",
        summary: "Curated student project journeys and the decisions behind the outcomes.",
    },
    {
        id: "teacher-mentoring",
        title: "Teacher Mentoring Model",
        category: "Report",
        image: "/Home_bg2.jpeg",
        position: "center 55%",
        summary: "How KE Academy structures coaching, feedback cycles, and accountability.",
    },
    {
        id: "studio-process",
        title: "Studio Process Cards",
        category: "Toolkit",
        image: "/Home_bg1.jpeg",
        position: "center 48%",
        summary: "Step-by-step prompts that guide ideation, critique, and delivery.",
    },
    {
        id: "family-handbook",
        title: "Family Partnership Handbook",
        category: "Guide",
        image: "/Home_bg2.jpeg",
        position: "center 38%",
        summary: "A concise guide for families to support learning and wellbeing.",
    },
    {
        id: "cohort-highlights",
        title: "Cohort Highlights 2025",
        category: "Showcase",
        image: "/Home_bg1.jpeg",
        position: "center 52%",
        summary: "Selected student projects with context on goals, process, and outcomes.",
    },
];
