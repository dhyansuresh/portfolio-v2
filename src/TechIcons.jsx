const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const TECH_ICONS = {
    // languages
    JavaScript: ["javascript", "original"],
    TypeScript: ["typescript", "original"],
    Java: ["java", "original"],
    C: ["c", "original"],
    Python: ["python", "original"],
    HTML: ["html5", "original"],
    CSS: ["css3", "original"],
    "HTML/CSS": ["html5", "original"],
    "HMTL/CSS": ["html5", "original"],

    // frameworks & libraries
    React: ["react", "original"],
    "Node.js": ["nodejs", "original"],
    "Node/Express": ["nodejs", "original"],
    Express: ["express", "original"],
    "TensorFlow.js": ["tensorflow", "original"],
    Vite: ["vitejs", "original"],
    "Tailwind CSS": ["tailwindcss", "original"],
    MediaPipe: ["google", "original"],
    "MediaPipe Hands": ["google", "original"],
    FastAPI: ["fastapi", "original"],
    "React Router": ["reactrouter", "original"],
    Leaflet: "https://cdn.simpleicons.org/leaflet",
    Prisma: ["prisma", "original"],
    "PostgreSQL via Prisma": ["postgresql", "original"],
    PostgreSQL: ["postgresql", "original"],

    // tools & platforms
    Git: ["git", "original"],
    GitHub: ["github", "original"],
    Firebase: ["firebase", "plain"],
    "Firebase(Auth/Firestore)": ["firebase", "plain"],
    AWS: ["amazonwebservices", "original-wordmark"],
    Vercel: ["vercel", "original"],
    Linux: ["linux", "original"],
    Docker: ["docker", "original"],

    // misc
    OAuth: ["google", "original"],
    "Google Gemini AI": ["google", "original"],
    "Web Speech API": ["chrome", "original"],
    "Chrome Extension API": ["chrome", "original"],
    localStorage: ["javascript", "original"],
};

const make_visable = new Set(["github", "vercel", "express", "prisma"])

// logos render in each brand's own color
export function TechTag({ name, size = "sm" }) {
    const entry = TECH_ICONS[name];
    const big = size === "lg";

    let src = null;
    let lighten = false;

    if (entry) {
        if (typeof entry === "string") {
            src = entry;
        } else {
            const [folder, variant] = entry;
            src = `${BASE}/${folder}/${folder}-${variant}.svg`;
            lighten = make_visable.has(folder);
        }
    }

    return (
        <span
            className={`inline-flex items-center bg-[#2a1508]/80 text-[#d4b896] rounded
                border border-transparent transition-all duration-200 ease-out
                hover:-translate-y-1 hover:border-[#c8956c]/50 hover:bg-[#3a1d0c]
                hover:shadow-[0_6px_20px_rgba(0,0,0,0.5)] cursor-default ${
                big ? "gap-2.5 text-base px-4 py-2" : "gap-2 text-sm px-3 py-1.5"
            }`}
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
            {src && (
                <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className={big ? "w-6 h-6" : "w-5 h-5"}
                    style={lighten ? { filter: "invert(1) brightness(1.6)" } : undefined}
                />
            )}
            {name}
        </span>
    );
}
