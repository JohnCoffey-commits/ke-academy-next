export interface Course {
    id: string;
    title: string;
    ageGroup: string;
    description: string;
    category: "Primary" | "High School" | "Holiday";
}

export interface Teacher {
    id: string;
    name: string;
    role: string;
    bio: string;
    image?: string;
}

export interface Campus {
    id: string;
    name: string;
    address: string;
    features: string[];
}

export interface Resource {
    id: string;
    title: string;
    type: "PDF" | "Article" | "Video";
    date: string;
}
