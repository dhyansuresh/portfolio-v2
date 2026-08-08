import { useMemo } from "react";

// "~/section" heading with a rule running to the right
export function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-3 mb-8">
            <span
                className="text-xs tracking-widest uppercase text-[#c8956c]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
                ~/{children}
            </span>
            <div className="flex-1 h-px bg-[#3d2410]"/>
        </div>
    );
}

// faint starfield fixed behind the page so the space theme carries through
export function AmbientStars() {
    const stars = useMemo(
        () =>
            Array.from({ length: 90 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 1.4 + 0.4,
                opacity: Math.random() * 0.3 + 0.08,
            })),
        []
    );

    return (
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="absolute rounded-full bg-[#f5ede0]"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        opacity: s.opacity,
                    }}
                />
            ))}
        </div>
    );
}
