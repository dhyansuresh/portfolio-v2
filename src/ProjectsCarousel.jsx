import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TechTag } from "./TechIcons";
import {PROJECTS} from "./data.js";

export function ShotViewer({ shots, name, fit = "cover" }) {
    const [i, setI] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => setI(0), [name]);

    const total = shots ? shots.length : 0;
    const go = (n) => setI((n + total) % total);

    // ASL demo video
    const current = shots?.[i];
    const kind = typeof current === "object" ? current.type : "image";
    const src = typeof current === "object" ? current.src : current;

    // keyboard controls while the lightbox is open
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowRight") go(i + 1);
            if (e.key === "ArrowLeft") go(i - 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // lock page scroll so the site doesn't move behind the lightbox
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (total === 0) {
        return (
            <div
                className="w-full h-full min-h-[14rem] rounded-lg border border-dashed border-[#3d2410] bg-[#140b05] flex items-center justify-center">
                <span
                    className="text-xs text-[#5a3820]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                    screenshots coming soon
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="relative group/shot">
                <button
                    onClick={() => setOpen(true)}
                    aria-label={`Enlarge ${name} screenshot`}
                    className="focusable block w-full overflow-hidden rounded-lg border border-[#3d2410] bg-[#140b05] cursor-zoom-in"
                >
                    {kind === "youtube" ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${src}`}
                            title={`${name} demo`}
                            className="w-full aspect-video block"
                            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    ) : kind === "video" ? (
                        <video src={src} className="w-full aspect-video object-cover block" muted loop autoPlay playsInline />
                    ) : (
                        <img
                            src={src}
                            alt={`${name} screenshot ${i + 1}`}
                            className={`w-full aspect-16/7 block ${
                                fit === "contain" ? "object-contain p-3" : "object-cover object-top"
                            }`}
                            loading="lazy" />
                    )}
                </button>

                {total > 1 && (
                    <>
                        <button
                            onClick={() => go(i - 1)}
                            aria-label="Previous screenshot"
                            className="focusable absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-[#e8d9c8] opacity-0 group-hover/shot:opacity-100 focus:opacity-100 transition-opacity flex items-center justify-center"
                        >
                            ‹
                        </button>
                        <button
                            onClick={() => go(i + 1)}
                            aria-label="Next screenshot"
                            className="focusable absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-[#e8d9c8] opacity-0 group-hover/shot:opacity-100 focus:opacity-100 transition-opacity flex items-center justify-center"
                        >
                            ›
                        </button>

                        <div className="flex justify-center gap-1.5 mt-3">
                            {shots.map((_, n) => (
                                <button
                                    key={n}
                                    onClick={() => go(n)}
                                    aria-label={`Screenshot ${n + 1}`}
                                    className={`focusable h-1.5 rounded-full transition-all ${
                                        n === i ? "w-5 bg-[#c8956c]" : "w-1.5 bg-[#5a3820]"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* portaled to body — the carousel's transforms would trap position:fixed */}
            {open && createPortal(
                <div
                    onClick={() => setOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${name} screenshots`}
                    className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
                    style={{ animation: "lightboxIn 0.2s ease-out" }}
                >
                    <style>{`
                        @keyframes lightboxIn {
                            from { opacity: 0; }
                            to   { opacity: 1; }
                        }
                    `}</style>

                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                        className="focusable absolute top-4 right-5 text-3xl leading-none text-[#e8d9c8] hover:text-[#c8956c] transition-colors"
                    >
                        ×
                    </button>

                    {kind === "youtube" ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${src}?autoplay=1`}
                            title={`${name} demo`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-[95vw] max-w-5xl aspect-video rounded-lg shadow-2xl"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    ) : kind === "video" ? (
                        <video
                            src={src}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-[95vw] max-h-[92vh] rounded-lg shadow-2xl"
                            controls
                            autoPlay
                            playsInline
                        />
                    ) : (
                        <img
                            src={src}
                            alt={`${name} screenshot ${i + 1}`}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-[95vw] max-h-[92vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
                        />
                    )}

                    {total > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    go(i - 1);
                                }}
                                aria-label="Previous screenshot"
                                className="focusable absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-[#3d2410] text-[#e8d9c8] hover:text-[#c8956c] transition-colors flex items-center justify-center text-2xl"
                            >
                                ‹
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    go(i + 1);
                                }}
                                aria-label="Next screenshot"
                                className="focusable absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-[#3d2410] text-[#e8d9c8] hover:text-[#c8956c] transition-colors flex items-center justify-center text-2xl"
                            >
                                ›
                            </button>

                            <p
                                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-[#a87c5a] tabular-nums"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                {i + 1} / {total}
                            </p>
                        </>
                    )}
                </div>,
                document.body
            )}
        </>
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

    // full-width cards on phones, peek layout on desktop
    const [isMobile, setIsMobile] = useState(
        typeof window != "undefined" && window.innerWidth < 768
    );

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const cardWidth = isMobile ? 100 : 76;
    const edgeOffset = (100 - cardWidth) / 2;

    const go = (i) => setIndex(Math.max(0, Math.min(total - 1, i)));
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // horizontal wheel only, so vertical page scroll still works
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
            setIndex((i) =>
                delta > 0 ? Math.min(total - 1, i + 1) : Math.max(0, i - 1)
            );
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [total]);

    const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchX.current == null) return;
        const delta = touchX.current - e.changedTouches[0].clientX;
        if (delta > 50) next();
        else if (delta < -50) prev();
        touchX.current = null;
    };

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
            <div
                ref={viewportRef}
                className="overflow-hidden py-4"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(calc(-${index * cardWidth}% + ${edgeOffset}%))`,
                    }}
                >
                    {PROJECTS.map((proj, i) => {
                        const active = i === index;
                        return (
                            <article
                                key={proj.name}
                                onClick={() => !active && go(i)}
                                className={`flex-shrink-0 px-3 transition-all duration-500 ease-out ${
                                    active ? "" : "cursor-pointer"
                                }`}
                                style={{
                                    width: `${cardWidth}%`,
                                    transform: active || isMobile ? "scale(1)" : "scale(0.9)",
                                    opacity: active || isMobile ? 1 : 0.4,
                                }}
                            >
                                <div className="bg-[#1c1008]/80 border border-[#3d2410] rounded-lg p-5 sm:p-6">
                                    <h3 className="display font-black text-2xl sm:text-3xl tracking-tight text-[#fdf6ee] mb-5">
                                        {proj.name}
                                    </h3>

                                    {proj.shots.length > 0 && (
                                        <ShotViewer shots={proj.shots} name={proj.name}/>
                                    )}

                                    <p className="text-[#c8956c] text-lg sm:text-xl mt-6 mb-3 leading-snug">
                                        {proj.tagline}
                                    </p>
                                    <p className="text-[#a87c5a] leading-relaxed max-w-3xl">
                                        {proj.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-6 mb-6">
                                        {proj.stack.map((s) => (
                                            <TechTag key={s} name={s}/>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {proj.demo && (
                                            <a
                                                href={proj.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                tabIndex={active ? 0 : -1}
                                                className="focusable bg-[#c8956c] text-[#0a0603] px-4 py-2 text-sm font-semibold rounded hover:bg-[#e8bfa0] transition-colors"
                                            >
                                                Live demo ↗
                                            </a>
                                        )}
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            tabIndex={active ? 0 : -1}
                                            className="focusable border border-[#5a3820] text-[#e8d9c8] px-4 py-2 text-sm font-medium rounded hover:border-[#c8956c] hover:text-[#e8bfa0] transition-colors"
                                        >
                                            View repo ↗
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

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
                        className="focusable hidden md:flex absolute left-16 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#1c1008] border border-[#3d2410] text-[#d4b896] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-0 disabled:pointer-events-none transition-all items-center justify-center text-xl shadow-lg"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        disabled={index === total - 1}
                        aria-label="Next project"
                        className="focusable hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#1c1008] border border-[#3d2410] text-[#d4b896] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-0 disabled:pointer-events-none transition-all items-center justify-center text-xl shadow-lg"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}