export interface Course {
    id: string;
    title: string;
    category: "Term" | "holiday" | "special";
    priceLabel: string;
    highlights: string[];
    description: string;
    image: string; // Placeholder color or gradient class for now
    details: {
        overview: string;
        focusedAreas?: string[];
        features: string[];
        schedule: string;
        ageGroup: string;
    };
}

export const courses: Course[] = [
    // --- Term COURSES ---
    {
        id: "Term-tutoring-1on1",
        title: "Private Tutoring (1 On 1)",
        category: "Term",
        priceLabel: "$1,600.00 INCLUDING GST",
        highlights: ["Individualised attention", "Homework support", "Confidence building"],
        description: "A personalised environment where students receive one-on-one guidance to master academic challenges.",
        image: "/images/tut01.png",
        details: {
            overview: "This one-on-one tutoring program offers a personalised learning experience outside the classroom. Tailored instruction helps students raise their academic performance while enhancing self-esteem and confidence. Tutors adapt to each child’s learning style so concepts are mastered more quickly.",
            focusedAreas: [
                "Help with school homework, vocabulary building and projects",
                "Analyse and solve challenging problems from parent-provided workbooks",
                "Academy-supplied workbooks covering mathematics, English, GA, reading, writing and vocabulary"
            ],
            features: ["Individualised attention", "Homework support", "Customised workbooks", "Confidence building"],
            schedule: "Flexible Schedule",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-tutoring-1on2-1.5h",
        title: "Private Tutoring (1 On 2, 1.5 Hours)",
        category: "Term",
        priceLabel: "$790.00 INCLUDING GST",
        highlights: ["Small-group interaction", "Personalised guidance", "Problem-solving practice"],
        description: "An intimate small-group setting where two learners collaborate and grow together.",
        image: "/images/tut02.webp",
        details: {
            overview: "This small-group course for two students retains personalised attention while encouraging collaboration. The program provides tailored learning beyond standard classes to boost academic achievement and build confidence.",
            focusedAreas: [
                "Support with homework, vocabulary and school projects",
                "Work through difficult exercises from parent-provided workbooks",
                "Use academy-provided materials covering maths, English, GA, reading, writing and vocabulary"
            ],
            features: ["Small-group interaction", "Personalised guidance", "Problem-solving practice", "Comprehensive materials"],
            schedule: "Flexible Schedule",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-tutoring-1on2-2h",
        title: "Private Tutoring (1 On 2, 2 Hours)",
        category: "Term",
        priceLabel: "$1,100.00 INCLUDING GST",
        highlights: ["Longer sessions", "Dual-student focus", "Deep engagement"],
        description: "Extended sessions that offer deeper immersion for pairs of learners.",
        image: "/images/tut03.png",
        details: {
            overview: "This enhanced one-on-two program features longer sessions for deeper engagement. It provides tailored instruction outside standard classrooms, helping learners improve grades and self-confidence. Teachers adjust methods based on each child’s personality and preferred learning style.",
            focusedAreas: [
                "Assistance with school assignments, vocabulary and projects",
                "In-depth problem-solving using parent-supplied workbooks",
                "Supplementary workbooks from the academy covering maths, English, GA, reading, writing and vocabulary"
            ],
            features: ["Longer sessions", "Dual-student focus", "Deep engagement", "Adaptive teaching"],
            schedule: "Flexible Schedule",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-tutoring-1on3",
        title: "Private Tutoring (1 On 3)",
        category: "Term",
        priceLabel: "$740.00 INCLUDING GST",
        highlights: ["Group collaboration", "Tailored instruction", "Skill enrichment"],
        description: "A collaborative environment where a trio of students supports and inspires each other.",
        image: "/images/tut04.png",
        details: {
            overview: "This one-on-three program creates a cooperative learning atmosphere while still offering individualised support. It aims to improve students’ academic performance and confidence through tailored lessons beyond the regular classroom.",
            focusedAreas: [
                "Aid with homework, vocabulary building and school projects",
                "Analyse and solve problems from workbooks supplied by parents",
                "Provide academy-prepared materials covering maths, English, GA, reading, writing and vocabulary"
            ],
            features: ["Group collaboration", "Tailored instruction", "Problem analysis", "Skill enrichment"],
            schedule: "Flexible Schedule",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-tutoring-1on4",
        title: "1-on-4 Private Tutoring",
        category: "Term",
        priceLabel: "$690.00 INCLUDING GST",
        highlights: ["Small-group support", "Homework help", "Confidence building"],
        description: "A supportive small-group environment where four students collaborate and learn together.",
        image: "/images/tut05.png",
        details: {
            overview: "This one-on-four tutoring program offers a tailored learning experience outside standard classrooms. By working in a small group, students improve their academic performance while gaining self-esteem and confidence. Instructors adjust methods to each child’s personality and preferred learning style.",
            focusedAreas: [
                "Help with school homework, vocabulary and projects",
                "Analysis and problem-solving using parent-provided workbooks",
                "Academy-supplied workbooks covering maths, English, GA, reading, writing and vocabulary"
            ],
            features: ["Small-group support", "Homework help", "Custom workbooks", "Confidence building"],
            schedule: "Flexible Schedule",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-coding",
        title: "Coding",
        category: "Term",
        priceLabel: "$490.00 INCLUDING GST",
        highlights: ["Hands-on projects", "Creative coding", "Logical thinking"],
        description: "A collaborative environment where students learn to code creatively.",
        image: "/images/coding01.png",
        details: {
            overview: "KE Academy’s coding program views programming as more than a technical skill; it’s a powerful tool for developing logical thinking, problem-solving abilities and creativity. Through hands-on projects and interactive lessons, students build a strong foundation in coding while enhancing their communication skills and unleashing their creativity.",
            focusedAreas: [
                "Introduction to Scratch and Python",
                "Logical thinking and problem-solving development",
                "Project-based learning and creativity"
            ],
            features: ["Hands-on projects", "Scratch & Python", "Creative coding", "Logical thinking"],
            schedule: "Weekly Sessions",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-drama",
        title: "Drama",
        category: "Term",
        priceLabel: "$690.00 INCLUDING GST",
        highlights: ["Public speaking", "Confidence building", "Structured levels"],
        description: "An expressive environment where students build language, confidence and performance skills.",
        image: "/images/drama01.webp",
        details: {
            overview: "Developed in partnership with a prestigious law firm, KE Academy’s drama program sharpens language precision, builds public speaking confidence and fosters emotional intelligence. The course offers a carefully structured progression and blends legal and educational expertise to provide students with tools for both stage and real-life expression.",
            focusedAreas: [
                "Unique legal-education fusion guiding precise language, logic and persuasion",
                "Structured levels (Beginner, Intermediate, Advanced) for age and development",
                "Language-centred drama instruction: articulation, structure and intent",
                "Confidence through performance: speaking, storytelling and theatre"
            ],
            features: ["Precise language skills", "Public speaking confidence", "Structured levels", "Holistic development"],
            schedule: "Weekly Sessions",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-french",
        title: "French",
        category: "Term",
        priceLabel: "$490.00 INCLUDING GST",
        highlights: ["Global citizenship", "Cognitive development", "Cultural exploration"],
        description: "A global language program giving students an academic and cultural edge.",
        image: "/images/french01.webp",
        details: {
            overview: "KE Academy’s French course is designed to give students a significant academic and cultural advantage. Learning French opens doors in diplomacy, arts, fashion and international business while enhancing memory and analytical skills. The program helps young learners thrive through structured instruction, engaging content and practical application.",
            focusedAreas: [
                "A strategic language for global citizenship across institutions and continents",
                "Supports cognitive development: memory and analytical skills",
                "Boosts selective-school and high-school entry preparation",
                "Gateway to culture and creativity through literature and global experiences"
            ],
            features: ["Global citizenship skills", "Cognitive development", "Selective school prep", "Cultural exploration"],
            schedule: "Weekly Sessions",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-mandarin",
        title: "Mandarin",
        category: "Term",
        priceLabel: "$260.00 INCLUDING GST",
        highlights: ["Language basics", "Cultural exposure", "Interactive learning"],
        description: "An immersive environment where students build foundational Mandarin skills and explore Chinese culture.",
        image: "/images/mandarin01.webp",
        details: {
            overview: "This Mandarin program offers 10 sessions per term, each lasting 1.5 hours, aimed at giving young learners a solid introduction to the Chinese language. Although currently marked “out of stock,” the course is designed to develop basic speaking, listening, reading and writing skills while introducing students to Chinese culture.",
            focusedAreas: [
                "Foundational Mandarin pronunciation, tones and vocabulary",
                "Listening and speaking practice in everyday contexts",
                "Reading and writing simple characters and phrases",
                "Cultural activities to foster understanding of Chinese traditions"
            ],
            features: ["Language basics", "Cultural exposure", "Interactive learning", "Foundational Chinese"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-maths-thinking",
        title: "Maths and Thinking Skill",
        category: "Term",
        priceLabel: "$510.00 INCLUDING GST",
        highlights: ["Systematic instruction", "Problem-solving strategies", "Targeted practice"],
        description: "A structured environment where students learn to think logically and solve problems strategically.",
        image: "/images/maths01.png",
        details: {
            overview: "KE Academy’s Mathematics & Thinking Skills Program emphasises understanding the “why” and “how” behind every problem. Teacher-led and highly structured lessons begin with clear, step-by-step explanations and detailed problem-solving strategies. Students then practise through carefully designed in-class exercises and targeted homework tasks, reinforcing knowledge and building fluency.",
            focusedAreas: [
                "Core mathematics: operations, geometry, measurement, algebra, fractions, decimals and percentages taught with conceptual depth and exam-style rigour",
                "Mental maths training to sharpen calculation speed and boost confidence",
                "General Ability (GA) and logical reasoning: pattern recognition, number series, analogies, spatial reasoning and critical thinking",
                "Exam-oriented strategies combining instruction, practice and reinforcement for noticeable improvement"
            ],
            features: ["Systematic instruction", "Problem-solving strategies", "Targeted practice", "Logical reasoning"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-public-speaking",
        title: "Public Speaking and Debating",
        category: "Term",
        priceLabel: "$550.00 INCLUDING GST",
        highlights: ["Confidence & communication", "Speech training", "Debate skills"],
        description: "A supportive environment where students cultivate confidence, critical thinking and persuasive communication.",
        image: "/images/speaking01.webp",
        details: {
            overview: "Designed to foster confidence and persuasive communication, KE Academy’s Public Speaking and Debating classes help students master effective speech through structured training, engaging improvisation tasks and dynamic presentation practice. The program also prepares students for AMEB Speech and Performance exams and a wide range of public speaking and debating competitions. Debate training introduces formal formats and rules, enabling students to argue logically, listen critically and rebut respectfully.",
            focusedAreas: [
                "Structured speech training, including crafting compelling speeches and using body language effectively",
                "Engaging improvisation tasks and presentation practice under pressure",
                "Preparation for AMEB Speech & Performance exams and public speaking/debating competitions",
                "Formal debating skills: logical argumentation, critical listening and respectful rebuttal"
            ],
            features: ["Confidence & communication", "Speech training", "Debate skills", "Competition prep"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-reading-writing",
        title: "Reading & Creative Writing",
        category: "Term",
        priceLabel: "$510.00 INCLUDING GST",
        highlights: ["Strategic writing instruction", "Advanced comprehension", "Grammar mastery"],
        description: "A comprehensive program that unlocks the power of words through reading mastery and creative writing.",
        image: "/images/reading01.png",
        details: {
            overview: "The Reading & Writing Excellence Program empowers students with the skills, confidence and creativity needed to excel. It helps them master the art of reading and writing—from understanding complex texts to crafting polished, engaging pieces. Whether preparing for assessments such as NAPLAN, OC or selective-school exams, or simply aiming to improve everyday writing, the curriculum provides measurable progress through expert guidance and a proven structure.",
            focusedAreas: [
                "Strategic writing instruction: guiding students through imaginative narratives, persuasive essays and poetry with structure, clarity and creativity",
                "Advanced reading comprehension: analysing text types, identifying key information and answering high-level comprehension questions",
                "Grammar and language mastery: grammar exercises and vocabulary building for accurate, fluent and sophisticated writing",
                "Creative and critical thinking: prompts and scenarios that encourage original thinking and confident expression"
            ],
            features: ["Strategic writing instruction", "Advanced comprehension", "Grammar mastery", "Creative thinking"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-ready-for-kindy",
        title: "Ready for Kindy",
        category: "Term",
        priceLabel: "$460.00 INCLUDING GST",
        highlights: ["Holistic curriculum", "Early literacy & numeracy", "Critical thinking"],
        description: "A comprehensive program that prepares young children for a confident start to primary school.",
        image: "/images/ready01.webp",
        details: {
            overview: "KE Academy’s **Ready for Kindy** program gives children a strong head start before they enter formal schooling. In once-a-week small-group classes, students receive comprehensive, structured learning across key developmental areas—including English, mathematics, logical thinking and public speaking—ensuring they are prepared academically and socially from day one of kindergarten.",
            focusedAreas: [
                "**English:** listening, speaking, phonics, reading and early writing skills",
                "**Mathematics:** numbers, patterns, shapes, basic operations and measurement",
                "**Logical Thinking:** puzzles, problem-solving and visual reasoning",
                "**Public Speaking:** building confidence and expression through structured oral activities"
            ],
            features: ["Holistic curriculum", "Early literacy & numeracy", "Critical thinking", "Confidence building"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-scholarship",
        title: "Scholarship Private Tutoring",
        category: "Term",
        priceLabel: "$1,900.00 INCLUDING GST",
        highlights: ["Scholarship preparation", "Personalised tutoring", "Advanced curriculum"],
        description: "An intensive private coaching program designed to prepare students for scholarship examinations.",
        image: "/images/tut06.png",
        details: {
            overview: "This one-to-one Scholarship Private Tutoring program provides high-achieving students with personalised guidance to prepare for competitive scholarship tests. Each session tailors instruction to the student’s needs, offering advanced academic exercises, exam-strategy coaching and targeted practice across core subjects.",
            focusedAreas: [
                "Comprehensive scholarship-level exam preparation",
                "Tailored instruction in mathematics, English and reasoning",
                "Practice with past papers and high-level problems",
                "Individual feedback to strengthen weak areas"
            ],
            features: ["Scholarship preparation", "Personalised tutoring", "Advanced curriculum", "Exam strategies"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-steam-coding",
        title: "Steam and Coding",
        category: "Term",
        priceLabel: "$490.00 INCLUDING GST",
        highlights: ["Hands-on STEAM projects", "3D printing & robotics", "Collaborative problem solving"],
        description: "A hands-on program where students explore science, technology, engineering, arts and mathematics through creative projects.",
        image: "/images/stem01.webp",
        details: {
            overview: "The STEAM and Coding course blends Science, Technology, Engineering, Arts and Mathematics to give students an exciting, hands-on introduction to real-world applications of science and innovation. Combining problem-solving, creativity and teamwork, the program encourages learners to explore the world through experiments, design challenges and interactive projects. Each session might involve activities ranging from 3D printing and robotics to collaborative problem-solving tasks that build resilience, communication and analytical skills.",
            focusedAreas: [
                "Exploration of scientific and mathematical concepts through hands-on experiments",
                "Design-based problem-solving using 3D printing and robotics",
                "Collaborative learning that develops creativity, critical thinking and teamwork",
                "Communication and resilience built through engaging, team-based activities"
            ],
            features: ["Hands-on STEAM projects", "3D printing & robotics", "Collaborative problem solving", "Creative thinking"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-wemt",
        title: "WEMT",
        category: "Term",
        priceLabel: "$490.00 INCLUDING GST",
        highlights: ["Integrated core subjects", "Critical thinking skills", "Engaging content"],
        description: "A foundational program covering Writing, English, Mathematics and Thinking Skills to build lifelong academic excellence.",
        image: "/images/wemt01.png",
        details: {
            overview: "KE Academy’s **WEMT** program (Writing, English, Mathematics and Thinking Skills) is designed to inspire young learners to think deeply, solve problems confidently and build foundational excellence across multiple subjects. The curriculum integrates learning across core subjects—writing fluency, grammar, reading comprehension, numeracy and logical reasoning—in one cohesive program. It emphasises critical and creative thinking through puzzles, pattern recognition and logic games, and offers engaging, age-appropriate content with both instruction and enrichment.",
            focusedAreas: [
                "Integrated literacy and numeracy (writing fluency, grammar, reading comprehension, numeracy and logical reasoning)",
                "Critical and creative thinking via puzzles, pattern recognition and logic games",
                "Fun, engaging content combining interactive activities with structured worksheets",
                "Early academic enrichment from sentence construction to number bonds and geometry"
            ],
            features: ["Integrated core subjects", "Critical thinking skills", "Engaging content", "Academic enrichment"],
            schedule: "10 sessions · 1.5 hours per session",
            ageGroup: "Years 3-6"
        }
    },
    {
        id: "Term-workshop",
        title: "Workshop",
        category: "Term",
        priceLabel: "$410.00 INCLUDING GST",
        highlights: ["Weekly academic support", "Homework help", "Critical thinking"],
        description: "A weekly small-group program providing personalised academic support and deeper learning.",
        image: "/images/workshop01.png",
        details: {
            overview: "KE Academy’s Weekly Workshop Program offers structured academic support in a small-group setting. Once a week, students attend a dedicated session where experienced teachers provide personalised guidance. During each session, students can ask questions related to their school curriculum, receive step-by-step explanations of challenging problems, work through homework with professional support and gain extra help in areas where they need reinforcement. The program strengthens critical thinking and independent learning skills, builds academic confidence and study habits, and ensures students stay on track academically.",
            focusedAreas: [
                "Addressing questions tied to school curriculum topics",
                "Step-by-step explanations of challenging problems",
                "Homework support and targeted reinforcement",
                "Developing critical thinking and independent learning skills"
            ],
            features: ["Weekly academic support", "Homework help", "Critical thinking", "Confidence building"],
            schedule: "Weekly sessions (1.5 hours each)",
            ageGroup: "Years 3-6"
        }
    },

    // --- HOLIDAY PROGRAMS ---
    {
        id: "holiday-overseas-study-tour",
        title: "Overseas Study Tour",
        category: "holiday",
        priceLabel: "ENQUIRE",
        highlights: ["Academic + cultural immersion", "Balanced itinerary", "Safety supervision", "Participation certificate"],
        description: "An immersive school-and-culture experience in Sydney that strengthens practical English and global perspective.",
        image: "/images/abroad01.png",
        details: {
            overview: "A holiday study tour that blends authentic classroom participation with cultural immersion in Sydney. Students learn alongside local peers, join structured activities, and experience Australian life through a balanced itinerary designed to improve real-world communication and broaden international understanding.",
            focusedAreas: [
                "Real classroom participation to strengthen practical English skills",
                "Cultural immersion through curated landmark visits and local experiences",
                "Enrichment modules (e.g., coding/science workshops, team-building activities)",
                "Host-family living experience to understand daily life and culture",
                "Communication growth through study and activities with local students"
            ],
            features: ["Academic + cultural immersion in Sydney", "Balanced itinerary (learning + experiences)", "Safety supervision and parent updates", "Participation certificate"],
            schedule: "Enquire for dates",
            ageGroup: "Secondary school students (enquire)"
        }
    },
    {
        id: "holiday-summer-camp",
        title: "Summer Camp & Team Building",
        category: "holiday",
        priceLabel: "ENQUIRE",
        highlights: ["Age-tailored program", "Experienced coaches", "Outdoor adventure", "Skill-building workshops"],
        description: "A high-energy camp program that builds leadership, teamwork, and independence through outdoor learning.",
        image: "/images/summer_camp01.png",
        details: {
            overview: "A structured holiday camp for students aged 6–16, combining teamwork development, leadership growth, and outdoor exploration. Students strengthen social confidence and independence through age-appropriate activities, professional coaching, and a well-supported end-to-end camp experience.",
            focusedAreas: [
                "Team collaboration and leadership development",
                "Workshops on public speaking, problem-solving, and leadership",
                "Outdoor exploration, camping, and survival-skills training",
                "Confidence building through group-based challenges and reflection"
            ],
            features: ["Age-tailored program (6–16)", "Experienced coaches and structured activities", "Outdoor adventure + skill-building workshops", "End-to-end support and follow-up feedback"],
            schedule: "Enquire for dates",
            ageGroup: "Ages 6–16"
        }
    },

    // --- SPECIAL PROGRAMS ---
    {
        id: "special-support-program",
        title: "Special Support Program",
        category: "special",
        priceLabel: "ENQUIRE",
        highlights: ["Multidisciplinary specialists", "Individualised plans", "Integrated approach", "Family collaboration"],
        description: "A multidisciplinary education-and-wellbeing program supporting autism needs and child mental health.",
        image: "/images/autism01.png",
        details: {
            overview: "A specialised program integrating educational support with wellbeing intervention. Delivered by a multidisciplinary team (education specialists, psychologists, speech therapists, behaviour analysts, and child mental-health consultants), the program provides personalised plans, multi-sensory teaching approaches, and family–school collaboration to support learning and wellbeing outcomes.",
            focusedAreas: [
                "Autism support: communication, social interaction, and self-regulation skills",
                "Academic foundations: literacy, reading comprehension, and numeracy basics",
                "Daily living skills: independence, time management, and emotional regulation",
                "Child mental-health support: coping strategies and emotional regulation techniques",
                "Social skills training to build confidence and healthy relationships",
                "Expressive arts approaches (e.g., drawing, music, drama) for emotional expression",
                "Individualised goals based on assessment outcomes",
                "Multi-sensory instruction (visual/auditory/tactile) to improve engagement",
                "Ongoing family–school collaboration for continuity at home"
            ],
            features: ["Multidisciplinary specialist delivery", "Individualised learning + support plans", "Integrated education and wellbeing approach", "Family–school collaboration model"],
            schedule: "Enquire for schedule",
            ageGroup: "Children & adolescents (enquire)"
        }
    }
];
