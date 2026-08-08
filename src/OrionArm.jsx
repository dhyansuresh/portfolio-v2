import { useEffect, useMemo, useRef, useState } from "react";

// landing screen
const ORION_EARTH = { x: 47, y: 58 };

// real distances
const ORION_LABELED_STARS = [
    { name: "Alpha Centauri", dist: "4.4 ly", x: 56, y: 67, size: 2.6 },
    { name: "Sirius", dist: "8.6 ly", x: 34, y: 47, size: 3.2 },
    { name: "Vega", dist: "25 ly", x: 66, y: 33, size: 2.8 },
    { name: "Polaris", dist: "433 ly", x: 80, y: 50, size: 2.4 },
    { name: "Betelgeuse", dist: "~640 ly", x: 17, y: 64, size: 3.4, color: "#ffc9a0" },
    { name: "Rigel", dist: "~860 ly", x: 40, y: 22, size: 3.0, color: "#cfe4ff" },
];

// stars cluster
function buildOrionStars() {
    const stars = [];
    const A = { x: -6, y: 88 };
    const B = { x: 106, y: 22 };
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const spread = 16;

    for (let i = 0; i < 560; i++) {
        const u = Math.random();
        const g = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
        const warm = Math.random() < 0.14;
        stars.push({
            id: i,
            x: A.x + dx * u + nx * g * spread,
            y: A.y + dy * u + ny * g * spread,
            size: Math.random() * 1.7 + 0.4,
            color: warm ? "#ffdcae" : Math.random() < 0.5 ? "#dce8ff" : "#ffffff",
            opacity: Math.random() * 0.6 + 0.2,
        });
    }

    // a few scattered outside the band
    for (let i = 0; i < 140; i++) {
        stars.push({
            id: 1000 + i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1.1 + 0.3,
            color: "#c8d6f2",
            opacity: Math.random() * 0.3 + 0.08,
        });
    }

    return stars;
}

export default function UniverseIntro({ onEnter, arriving }) {

    const [zoomClass, setZoomClass] = useState(arriving ? "zoom-pre" : "");
    const busy = useRef(false);
    const touchY = useRef(null);

    const fieldWrapRef = useRef(null);
    const orionWrapRef = useRef(null);

    const reducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const orionStars = useMemo(buildOrionStars, []);
    const fieldStars = useMemo(
        () =>
            Array.from({ length: 200 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 1.6 + 0.3,
                opacity: Math.random() * 0.5 + 0.15,
                twinkle: Math.random() * 4 + 2,
                delay: Math.random() * 5,
            })),
        []
    );

    // pull back out of the zoom when returning from the portfolio
    useEffect(() => {
        if (!arriving) return;
        if (reducedMotion()) {
            setZoomClass("");
            return;
        }
        const raf = requestAnimationFrame(() =>
            requestAnimationFrame(() => setZoomClass(""))
        );
        return () => cancelAnimationFrame(raf);
    }, [arriving]);

    // stars near the cursor get pushed outward
    useEffect(() => {
        if (reducedMotion()) return;
        const RADIUS = 100; // px the warp reaches
        const STRENGTH = 30; // px push at the cursor
        let raf = 0;
        const displaced = new Set();

        const warpContainer = (container, data, mx, my, w, h) => {
            if (!container) return;
            const kids = container.children;
            const n = Math.min(data.length, kids.length);
            for (let i = 0; i < n; i++) {
                const sx = (data[i].x / 100) * w;
                const sy = (data[i].y / 100) * h;
                const dx = sx - mx;
                const dy = sy - my;
                const outside =
                    dx > RADIUS || dx < -RADIUS || dy > RADIUS || dy < -RADIUS;
                const d = outside ? Infinity : Math.hypot(dx, dy);
                if (d > RADIUS) {
                    if (displaced.has(kids[i])) {
                        kids[i].style.transform = "";
                        displaced.delete(kids[i]);
                    }
                    continue;
                }
                const f = 1 - d / RADIUS; // 1 at the cursor, 0 at the edge
                const push = f * f * STRENGTH; // quadratic falloff
                const ux = d === 0 ? 0 : dx / d;
                const uy = d === 0 ? 1 : dy / d;
                kids[i].style.transform = `translate(${ux * push}px, ${uy * push}px)`;
                displaced.add(kids[i]);
            }
        };

        const resetAll = () => {
            displaced.forEach((el) => (el.style.transform = ""));
            displaced.clear();
        };

        const onMove = (e) => {
            if (busy.current) return; // pause during the zoom
            const mx = e.clientX;
            const my = e.clientY;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                warpContainer(fieldWrapRef.current, fieldStars, mx, my, w, h);
                warpContainer(orionWrapRef.current, orionStars, mx, my, w, h);
            });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", resetAll);
        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", resetAll);
            cancelAnimationFrame(raf);
            resetAll();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // zoom into earth, then hand off to the portfolio
    const goPortfolio = () => {
        if (busy.current) return;
        if (reducedMotion()) return onEnter();
        busy.current = true;
        setZoomClass("zoom-in");
        setTimeout(onEnter, 1150);
    };

    // scroll down or swipe up to enter
    useEffect(() => {
        const onWheel = (e) => {
            if (e.deltaY > 25) goPortfolio();
        };
        const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
        const onTouchMove = (e) => {
            if (touchY.current == null) return;
            if (touchY.current - e.touches[0].clientY > 45) {
                touchY.current = null;
                goPortfolio();
            }
        };
        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden select-none"
            style={{
                background:
                    "radial-gradient(ellipse at 50% 40%, #120a04 0%, #0a0603 45%, #040200 100%)",
            }}
        >
            <style>{`
        @keyframes twinkle { 0%,100% { opacity: var(--o); } 50% { opacity: 0.08; } }
        @keyframes pulseRing {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes bobLabel { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -5px); } }
        @keyframes hintFade { 0%,100% { opacity: 0.35; } 50% { opacity: 0.8; } }
        .stage-scene {
          position: absolute; inset: 0;
          transform-origin: ${ORION_EARTH.x}% ${ORION_EARTH.y}%;
          transition: transform 1.15s cubic-bezier(0.7, 0, 0.85, 1), opacity 1.15s ease;
        }
        .stage-scene.zoom-in { transform: scale(45); opacity: 0; }
        .stage-scene.zoom-pre { transform: scale(45); opacity: 0; transition: none; }
        .star-layer { position: absolute; inset: 0; }
        .warp-star { transition: transform 0.22s cubic-bezier(0.2, 0.6, 0.3, 1); }
        @media (prefers-reduced-motion: reduce) {
          .stage-scene { transition: none; }
        }
      `}</style>

            <div className={`stage-scene ${zoomClass}`}>
                {/* distant background stars */}
                <div ref={fieldWrapRef} className="star-layer">
                    {fieldStars.map((s) => (
                        <div
                            key={s.id}
                            className="warp-star absolute rounded-full bg-[#f5ede0]"
                            style={{
                                left: `${s.x}%`,
                                top: `${s.y}%`,
                                width: `${s.size}px`,
                                height: `${s.size}px`,
                                "--o": s.opacity,
                                opacity: s.opacity,
                                animation: `twinkle ${s.twinkle}s ease-in-out ${s.delay}s infinite`,
                            }}
                        />
                    ))}
                </div>

                <div className="star-layer">
                    {/* the arm's haze, seen edge-on */}
                    <div
                        className="absolute"
                        style={{
                            left: "50%",
                            top: "55%",
                            width: "160vw",
                            height: "46vw",
                            transform: "translate(-50%,-50%) rotate(-30deg)",
                            background:
                                "radial-gradient(ellipse, rgba(180,120,60,0.13) 0%, rgba(140,80,30,0.05) 50%, transparent 72%)",
                            filter: "blur(10px)",
                            borderRadius: "50%",
                        }}
                    />

                    {/* arm stars */}
                    <div ref={orionWrapRef} className="absolute inset-0 pointer-events-none">
                        {orionStars.map((s) => (
                            <div
                                key={s.id}
                                className="warp-star absolute rounded-full"
                                style={{
                                    left: `${s.x}%`,
                                    top: `${s.y}%`,
                                    width: `${s.size}px`,
                                    height: `${s.size}px`,
                                    backgroundColor: s.color,
                                    opacity: s.opacity,
                                }}
                            />
                        ))}
                    </div>

                    {/* named neighbours */}
                    {ORION_LABELED_STARS.map((s) => (
                        <div
                            key={s.name}
                            className="absolute"
                            style={{
                                left: `${s.x}%`,
                                top: `${s.y}%`,
                                transform: "translate(-50%,-50%)",
                            }}
                        >
                            <span
                                className="block rounded-full mx-auto"
                                style={{
                                    width: `${s.size}px`,
                                    height: `${s.size}px`,
                                    backgroundColor: s.color || "#eef4ff",
                                    boxShadow: `0 0 8px 2px ${s.color || "#b9d4ff"}55`,
                                }}
                            />
                            <p
                                className="text-center mt-1.5 whitespace-nowrap"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                <span className="block text-[11px] text-[#d4b896]">{s.name}</span>
                                <span className="block text-[10px] text-[#7a5538]">{s.dist}</span>
                            </p>
                        </div>
                    ))}

                    {/* earth */}
                    <button
                        onClick={goPortfolio}
                        aria-label="Land on Earth and open the portfolio"
                        className="focusable absolute rounded-full group"
                        style={{
                            left: `${ORION_EARTH.x}%`,
                            top: `${ORION_EARTH.y}%`,
                            transform: "translate(-50%,-50%)",
                            width: "150px",
                            height: "150px",
                            cursor: "pointer",
                            background: "transparent",
                        }}
                    >
                        <span
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(200,149,108,0.14) 0%, transparent 65%)",
                            }}
                        />
                        <span
                            className="absolute rounded-full border border-[#e8bfa0]/70"
                            style={{
                                left: "50%",
                                top: "50%",
                                width: "28px",
                                height: "28px",
                                animation: "pulseRing 2.4s ease-out infinite",
                            }}
                        />
                        <span
                            className="absolute rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%,-50%)",
                                width: "12px",
                                height: "12px",
                                background:
                                    "radial-gradient(circle at 35% 35%, #f5ede0, #c8956c 55%, #8b5e3c)",
                                boxShadow: "0 0 14px 4px rgba(220,160,90,0.8)",
                            }}
                        />
                    </button>

                    {/* click prompt */}
                    {zoomClass === "" && (
                        <div
                            className="absolute pointer-events-none flex flex-col items-center"
                            style={{
                                left: `${ORION_EARTH.x}%`,
                                top: `calc(${ORION_EARTH.y}% - 104px)`,
                                animation: "bobLabel 3s ease-in-out infinite",
                            }}
                        >
                            <span
                                className="text-[#f5ede0] text-sm whitespace-nowrap"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                earth · click me
                            </span>
                            <svg width="12" height="52" viewBox="0 0 12 52" aria-hidden="true">
                                <line
                                    x1="6" y1="4" x2="6" y2="42"
                                    stroke="rgba(245,210,160,0.75)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                                <path d="M6 52 L1 42 L11 42 Z" fill="rgba(245,210,160,0.75)"/>
                            </svg>
                        </div>
                    )}
                </div>

                <p
                    className="absolute top-8 left-1/2 -translate-x-1/2 text-[11px] tracking-widest uppercase text-[#7a5538] text-center px-4"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                    the orion arm · ~3,500 light-years out
                </p>
                <p
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#7a5538] whitespace-nowrap"
                    style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        animation: "hintFade 2.6s ease-in-out infinite",
                    }}
                >
                    scroll down to land on earth ↓
                </p>
            </div>
        </div>
    );
}