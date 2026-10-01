import safeflight1 from "./screenshots/safeflight1.png"
import safeflight2 from "./screenshots/safeflight2.png"
import safeflight3 from "./screenshots/safeflight3.png"
import safeflight4 from "./screenshots/safeflight4.png"

import gameday1 from "./screenshots/gameday1.jpg"
import gameday2 from "./screenshots/gameday2.jpg"
import gameday3 from "./screenshots/gameday3.jpg"

import aslDemo from "./videos/asl-demo.mp4";


// site content
export const EXPERIENCE = [
    {
        role: "Undergraduate Researcher",
        org: "Knight Research Scholars Program at University of Central Florida ",
        period: "Sep 2026 - Present",
        points: [
            "Built a Python ankle-angle estimator with NumPy to produce estimates within 5◦ of ground-truth angles",
            "Reduced initial ankle-angle estimation error (RMSE) by 98.3% by estimating foot and shank IMU bending axes from three-axis gyroscope data and filtering drift",
            "Processed 392,360 IMU samples at 2,000 Hz and aligned them with 100 Hz OpenSim data using SciPy Butterworth filtering"
        ],
    },
    {
        role: "Network Technician",
        org: "West Networks",
        period: "May 2023 — May 2024",
        points: [
            "Built and deployed 100+ portable Peplink BR2 Pro/BR1 routers with dual lithium batteries, providing reliable remote connectivity for field sites",
            "Configured dual-SIM protocol enabling auto-switching between cell carriers during link failures",
            "Troubleshot field-site technical issues using Peplink InControl to diagnose cellular link failures on deployed routers"
        ],
    },
    {
        role: "Marketing Lead",
        org: "Google Developer Student Club at UCF",
        period: "Aug. 2024 – April 2025",
        points: [
            "Grew the club’s social media following by 50% through consistent event promotion and outreach",
            "Promoted 12+ technical workshops over two semesters, averaging 20 student attendees per event",
            "Coordinated weekly event planning and promotions for a five-member team, tracking deliverables in Trello",
        ],
    },
];

export const SKILLS = [
    {
        group: "Languages",
        items: ["Python", "JavaScript", "Java", "TypeScript", "C", "HTML", "CSS"],
    },
    {
        group: "Frameworks & Libraries",
        items: ["React", "PyTorch", "Vite", "Tailwind CSS", "MediaPipe", "NumPy", "SciPy"],
    },
    {
        group: "Developer Tools",
        items: ["Git", "GitHub", "Render", "Docker", "Vercel", "Firebase", "AWS"], Node
    },
    {
        group: "Backend & Data",
        items: ["Node.js", "PostgreSQL", "Prisma", "Express", "FastAPI", "OAuth2"]
    }
];

export const NAV = [
    { id: "about", label: "about" },
    { id: "projects", label: "projects" },
    { id: "experience", label: "experience" },
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
        shots: [safeflight1, safeflight2, safeflight3, safeflight4],
    },
    {
        name: "ASL Interpreter",
        tagline: "Real-time sign language recognition via webcam (In progress)",
        description:
            "Web based ASL interpreter that turns live webcam signs into spoken words. " +
            "Uses MediaPipe to track your hands in real time and a TensorFlow.js model to figure out what you're signing. " +
            "Currently in development. I've gotten the hand tracking working and landmarks are drawing live on top of the video feed. " +
            "Next up is building out the Python pipeline to prep training data from the ASL alphabet dataset.",
        stack: ["React", "TensorFlow.js", "MediaPipe Hands", "Web Speech API", "Vite"],
        link: "https://github.com/dhyansuresh/asl-interpreter.git",
        demo: "",
        shots: [{type: "video", src: aslDemo}],
    },
    {
        name: "GameDay",
        tagline: "Watch party app for creating, joining, and managing world cup watch parties.",
        description:
            "Fullstack application that allows world cup enthusiasts to organize watch parties with" +
            "other soccer fans. This project was done in a 3 person team for the 12-hour BloomHacks event.",
        stack: ["JavaScript", "React", "Firebase(Auth/Firestore)", "Vite", "React Router"],
        link: "https://github.com/dhyansuresh/wc-watch-party-bloomhacks2026.git",
        demo: "",
        shots: [gameday1, gameday2, gameday3],
    },
    {
        name: "AI Legal Document Organizer",
        tagline: "Helps lawyers organize documentation and paperwork via Google Gemini.",
        description: "This was created at my very first KnightHack.",
        stack: ["Python", "FastAPI", "Google Gemini AI", "React"],
        link: "https://github.com/dhyansuresh/morgan-legaltender.git",
        demo: "",
        shots: [
            {type: "youtube", src: "9OBGld4TsmQ"}
        ],
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
        name: "Portfolio Version 1",
        tagline: "My very first personal site.",
        description: "This first site from pure HTML/CSS and a very small amount of JavaScript.",
        stack: ["HMTL/CSS", "JavaScript"],
        link: "https://github.com/dhyansuresh/personal-site-v1.git",
        demo: "",
        shots: [],
    },
];