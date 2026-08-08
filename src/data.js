import safeflight1 from "./screenshots/safeflight1.png"
import safeflight2 from "./screenshots/safeflight2.png"
import safeflight3 from "./screenshots/safeflight3.png"
import safeflight4 from "./screenshots/safeflight4.png"


// site content
export const EXPERIENCE = [
    {
        role: "Network Technician",
        org: "West Networks",
        period: "May 2023 — May 2024",
        points: [
            "Built and deployed 100+ portable Peplink BR2 Pro/BR1 routers with rechargeable lithium battery and 4G/5G antennas.",
            "Configured dual-SIM protocol system enabling devices to switch between cellular providers for optimal performance in remote deployments.",
            "Monitored global network infrastructure via InControl software, tracking real-time operational status.",
        ],
        stack: ["Peplink", "InControl", "4G/5G"],
    },
    {
        role: "Marketing Lead",
        org: "Google Developer Student Club @ UCF",
        period: "Aug. 2024 – April 2024",
        points: [
            "Managed social media accounts to generate community engagement and networking opportunities among club members and external partners.",
            "Collaborated with local organizations to plan and execute technical workshops.",
            "Facilitate weekly club meetings, ensuring effective communication and project alignment among team members.",
        ],
        stack: [],
    },
];

export const SKILLS = [
    {
        group: "Languages",
        items: ["Python", "JavaScript", "Java", "TypeScript", "C", "HTML", "CSS"],
    },
    {
        group: "Frameworks & Libraries",
        items: ["React", "TensorFlow.js", "Vite", "Tailwind CSS", "MediaPipe"],
    },
    {
        group: "Developer Tools",
        items: ["Git", "GitHub", "Firebase", "AWS", "Docker", "Vercel",],
    },
    {
        group: "Backend & Data",
        items: ["Node.js", "PostgreSQL", "Prisma", "Express", "FastAPI", "OAuth2"]
    }
];

export const NAV = [
    { id: "about", label: "about" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
];

export const PROJECTS = [
    {
        name: "SafeFlight",
        tagline: "Real-time flight tracking for your loved ones",
        description:
            "Full-stack app for following friends' and family's flights live. Add a " +
            "flight number to get status, delays, gate changes, and aircraft position. " +
            "Handles three separate aviation APIs merged into one view, leaflet for the live map  " +
            " and data is managed through PostgreSQL via Prisma",
        stack: ["React", "TypeScript", "Node/Express", "PostgreSQL via Prisma", "Leaflet", "OAuth"],
        link: "https://github.com/dhyansuresh/SafeFlight.git",
        demo: "https://safeflight.onrender.com/",
        shots: [safeflight1, safeflight2, safeflight3, safeflight4], // e.g. [shot1, shot2]
    },
    {
        name: "ASL Interpreter",
        tagline: "Real-time sign language recognition in the browser",
        description:
            "Browser-based American Sign Language interpreter using live hand-landmark tracking. " +
            "Live video is processed frame-by-frame and recognized signs are spoken aloud.",
        stack: ["React", "TensorFlow.js", "MediaPipe Hands", "Web Speech API", "Vite"],
        link: "https://github.com/dhyansuresh/asl-interpreter.git",
        demo: "",
        shots: [],
    },
    {
        name: "GameDay",
        tagline: "Web watch party app for creating, joining, and managing world cup watch parties.",
        description:
            "Fullstack application that allows world cup enthusiasts to find local groups to watch matches with.",
        stack: ["JavaScript", "React", "Firebase(Auth/Firestore)", "Vite", "React Router"],
        link: "https://github.com/dhyansuresh/wc-watch-party-bloomhacks2026.git",
        demo: "",
        shots: [],
    },
    {
        name: "Lead Tracker",
        tagline: "Chrome extension for capturing and syncing leads",
        description:
            "A Chrome extension that saves leads from any page with one click, persists them locally, " +
            "and syncs across devices through a realtime cloud database.",
        stack: ["JavaScript", "Chrome Extension API", "Firebase", "localStorage"],
        link: "https://github.com/dhyansuresh/chrome-leads-tracker.git",
        demo: "",
        shots: [],
    },
    {
        name: "AI Legal Document Organizer",
        tagline: "Helps lawyers organize documentation and paperwork via Google Gemini.",
        description: "This was created at my very first KnightHack.",
        stack: ["Python", "FastAPI", "Google Gemini AI", "React"],
        link: "https://github.com/dhyansuresh/morgan-legaltender.git",
        demo: "",
        shots: [],
    },
    {
        name: "Portfolio Version 1",
        tagline: "My very first personal site.",
        description: "This first site from pure HTML/CSS and a very small amount of JavaScript.",
        stack: ["HMTL/CSS", "JavaScript"],
        link: "https://github.com/dhyansuresh/personal-site-v1.git",
        demo: "",
        shots: [],
    },
];