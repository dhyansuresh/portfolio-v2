import { useState, useEffect, useRef } from "react";

const TECH_ICONS = {
    "React": "react",
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "Node/Express": "nodedotjs",
    "Node.js": "nodedotjs",
    "PostgreSQL via Prisma": "postgresql",
    "PostgreSQL": "postgresql",
    "Prisma": "prisma",
    "Leaflet": "leaflet",
    "OAuth": "auth0",
    "TensorFlow.js": "tensorflow",
    "MediaPipe Hands": "google",
    "Web Speech API": "googlechrome",
    "Vite": "vite",
    "Firebase(Auth/Firestore)": "firebase",
    "Firebase": "firebase",
    "React Router": "reactrouter",
    "Chrome Extension API": "googlechrome",
    "localStorage": "html5",
    "Python": "python",
    "FastAPI": "fastapi",
    "Google Gemini AI": "googlegemini",
    "HMTL/CSS": "html5",
    "HTML/CSS": "html5",
};

function TechTag({ name }) {
    const slug = TECH_ICONS[name];
    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-[#2a1508]/80 text-[#a87c5a] rounded"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
            {slug && (
                <img
                    src={`https://cdn.simpleicons.org/${slug}/c8956c`}
                    alt=""
                    className="w-3.5 h-3.5"
                    loading="lazy"
                />
            )}
            {name}
        </span>
    );
}

export default function ProjectsCarousel() {
    const [index, setIndex] = useState(0);
    const total = PROJECTS.length;

    const touchX = useRef(null);
    const wheelLock = useRef(false);
    const trackRef = useRef(null);
    const dragging = useRef(false);
    const viewportRef = useRef(null);

    const go = (i) => setIndex(Math.max(0, Math.min(total - 1, i)));
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    // ---- keyboard ----
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // ---- mouse wheel (horizontal intent) ----
    // Only hijacks the wheel when the carousel is under the cursor AND
    // the gesture is mostly horizontal, or shift is held. Vertical
    // scrolling still moves the page normally.
    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const onWheel = (e) => {
            const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
            if (!horizontal) return;
            e.preventDefault();
            if (wheelLock.current) return;
            const delta = e.deltaX || e.deltaY;
            if (Math.abs(delta) < 12) return;
            wheelLock.current = true;
            setTimeout(() => (wheelLock.current = false), 420);
            if (delta > 0) setIndex((i) => Math.min(total - 1, i + 1));
            else setIndex((i) => Math.max(0, i - 1));
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [total]);

    // ---- touch swipe ----
    const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchX.current == null) return;
        const delta = touchX.current - e.changedTouches[0].clientX;
        if (delta > 50) next();
        else if (delta < -50) prev();
        touchX.current = null;
    };

    // ---- draggable scrollbar ----
    const setFromClientX = (clientX) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        go(Math.round(ratio * (total - 1)));
    };

    useEffect(() => {
        const onMove = (e) => dragging.current && setFromClientX(e.clientX);
        const onUp = () => (dragging.current = false);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    });

    const thumbWidth = 100 / total;
    const thumbLeft = (index / total) * 100;

    return (
        <div className="relative">
            {/* viewport — cards overflow visibly on both sides */}
            <div
                ref={viewportRef}
                className="overflow-hidden py-4"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        // center the active card: shift by index, then nudge
                        // right so the previous card peeks in from the left
                        transform: `translateX(calc(-${index * 72}% + 14%))`,
                    }}
                >
                    {PROJECTS.map((proj, i) => {
                        const active = i === index;
                        return (
                            <article
                                key={proj.name}
                                onClick={() => !active && go(i)}
                                className={`w-[72%] flex-shrink-0 px-3 transition-all duration-500 ease-out ${
                                    active ? "" : "cursor-pointer"
                                }`}
                                style={{
                                    transform: active ? "scale(1)" : "scale(0.88)",
                                    opacity: active ? 1 : 0.4,
                                }}
                            >
                                <div className="bg-[#1c1008]/80 border border-[#3d2410] rounded-lg p-8 sm:p-10 min-h-[24rem] flex flex-col">
                                    <h3 className="display font-black text-3xl sm:text-4xl tracking-tight text-[#fdf6ee] mb-2">
                                        {proj.name}
                                    </h3>
                                    <p className="text-[#c8956c] text-base sm:text-lg mb-5 leading-snug">
                                        {proj.tagline}
                                    </p>
                                    <p className="text-[#a87c5a] leading-relaxed flex-1 max-w-2xl">
                                        {proj.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-6 mb-6">
                                        {proj.stack.map((s) => (
                                            <TechTag key={s} name={s} />
                                        ))}
                                    </div>
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        tabIndex={active ? 0 : -1}
                                        className="focusable text-sm font-medium text-[#e8bfa0] hover:underline self-start"
                                    >
                                        View repo ↗
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {/* ---- draggable scrollbar ---- */}
            <div className="mt-6 flex items-center gap-4">
                <div
                    ref={trackRef}
                    onMouseDown={(e) => {
                        dragging.current = true;
                        setFromClientX(e.clientX);
                    }}
                    className="relative flex-1 h-1.5 rounded-full bg-[#2a1508] cursor-pointer group"
                >
                    <div
                        className="absolute top-0 h-1.5 rounded-full bg-[#c8956c] transition-all duration-300 group-hover:bg-[#e8bfa0]"
                        style={{ width: `${thumbWidth}%`, left: `${thumbLeft}%` }}
                    />
                </div>

                <span
                    className="text-xs text-[#7a5538] tabular-nums shrink-0"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>

                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        aria-label="Previous project"
                        className="focusable w-9 h-9 rounded-full border border-[#3d2410] text-[#a87c5a] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-30 disabled:hover:border-[#3d2410] disabled:hover:text-[#a87c5a] transition-colors flex items-center justify-center"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        disabled={index === total - 1}
                        aria-label="Next project"
                        className="focusable w-9 h-9 rounded-full border border-[#3d2410] text-[#a87c5a] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-30 disabled:hover:border-[#3d2410] disabled:hover:text-[#a87c5a] transition-colors flex items-center justify-center"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}


const PROJECTS = [
    {
        name: "SafeFlight",
        tagline: "Real-time flight tracking for the people you care about",
        description:
            "Full-stack app for following friends' and family's flights live. Add a " +
            "flight number and get status, delays, gate changes, and aircraft position " +
            "on a map, with destination weather pulled from METAR reports. Google OAuth " +
            "keeps each user's watchlist private, and three separate aviation APIs are " +
            "merged into one view so nobody has to refresh an airline site again.",
        stack: ["React", "TypeScript", "Node/Express", "PostgreSQL via Prisma", "Leaflet", "OAuth"],
        link: "https://github.com/dhyansuresh/SafeFlight.git",
        highlight: true,
    },
    {
        name: "ASL Interpreter",
        tagline: "Real-time sign language recognition in the browser",
        description:
            "Browser-based American Sign Language interpreter using live hand-landmark tracking." +
            "Live video is processed frame-by-frame and recognized signs are spoken aloud.",
        stack: ["React", "TensorFlow.js", "MediaPipe Hands", "Web Speech API", "Vite"],
        link: "https://github.com/dhyansuresh/asl-interpreter.git",
        highlight: true,
    },
    {
        name: "GameDay",
        tagline: "Web watch party app enabling users to create, join, and manage world cup watch parties.",
        description:
            "Fullstack application that allows world cup enthusiasts to find local groups to watch matches with.",
        stack: ["JavaScript", "React", "Firebase(Auth/Firestore)", "Vite", "React Router"],
        link: "https://github.com/dhyansuresh/wc-watch-party-bloomhacks2026.git",
        highlight: false,
    },
    {
        name: "Lead Tracker",
        tagline: "Chrome extension for capturing and syncing leads",
        description:
            "A Chrome extension that saves leads from any page with one click, persists them locally," +
            "and syncs across devices through a realtime cloud database.",
        stack: ["JavaScript", "Chrome Extension API", "Firebase", "localStorage"],
        link: "https://github.com/dhyansuresh/chrome-leads-tracker.git",
        highlight: false,
    },
    {
        name: "AI Legal Document Organizer",
        tagline: "Helps lawyer organize documentation and paperwork via Google Gemini.",
        description: "This was created at my very first KnightHack.",
        stack: ["Python", "FastAPI", "Google Gemini AI", "React"],
        link: "https://github.com/dhyansuresh/morgan-legaltender.git",
        highlight: false,
    },
    {
        name: "Portfolio Version 1",
        tagline: "My very first personal site.",
        description: "This first site from pure HTML/CSS and a very small amount of JavaScript.",
        stack: ["HMTL/CSS", "JavaScript"],
        link: "https://github.com/dhyansuresh/personal-site-v1.git"
    }
];

