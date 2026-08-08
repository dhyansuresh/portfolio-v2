import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TechTag } from "./TechIcons";
import {PROJECTS} from "./data.js";

// screenshot panel with its own prev/next and dots.
// clicking an image opens it in a lightbox over the page.
function ShotViewer({ shots, name }) {
    const [i, setI] = useState(0);
    const [open, setOpen] = useState(false);

    // reset when switching projects
    useEffect(() => setI(0), [name]);

    const total = shots ? shots.length : 0;
    const go = (n) => setI((n + total) % total);

    // esc closes, arrows move while the lightbox is open
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

    // stop the page scrolling behind the lightbox
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
                    <img
                        src={shots[i]}
                        alt={`${name} screenshot ${i + 1}`}
                        className="w-full aspect-video object-cover object-top block"
                        loading="lazy"
                    />
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

            {/* lightbox — portaled to body so the carousel's transforms
                can't trap `position: fixed` inside a card */}
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

                    {/* stopPropagation so clicking the image itself doesn't close it */}
                    <img
                        src={shots[i]}
                        alt={`${name} screenshot ${i + 1}`}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-[95vw] max-h-[92vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
                        style={{ imageRendering: "auto" }}
                    />

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

    const go = (i) => setIndex(Math.max(0, Math.min(total - 1, i)));
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    // left/right arrow keys
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

    // swipe
    const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchX.current == null) return;
        const delta = touchX.current - e.changedTouches[0].clientX;
        if (delta > 50) next();
        else if (delta < -50) prev();
        touchX.current = null;
    };

    // drag the scrollbar
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
                    style={{ transform: `translateX(calc(-${index * 55}% + 6%))` }}
                >
                    {PROJECTS.map((proj, i) => {
                        const active = i === index;
                        return (
                            <article
                                key={proj.name}
                                onClick={() => !active && go(i)}
                                className={`w-[55%] flex-shrink-0 px-3 transition-all duration-500 ease-out ${
                                    active ? "" : "cursor-pointer"
                                }`}
                                style={{
                                    transform: active ? "scale(1)" : "scale(0.9)",
                                    opacity: active ? 1 : 0.4,
                                }}
                            >
                                <div className="bg-[#1c1008]/80 border border-[#3d2410] rounded-lg p-6 sm:p-8">
                                    {/* title */}
                                    <h3 className="display font-black text-3xl sm:text-5xl tracking-tight text-[#fdf6ee] mb-5">
                                        {proj.name}
                                    </h3>

                                    {/* screenshots — full width */}
                                    {proj.shots.length > 0 && (
                                        <ShotViewer shots={proj.shots} name={proj.name}/>
                                    )}

                                    {/* tagline + description */}
                                    <p className="text-[#c8956c] text-lg sm:text-xl mt-6 mb-3 leading-snug">
                                        {proj.tagline}
                                    </p>
                                    <p className="text-[#a87c5a] leading-relaxed max-w-3xl">
                                        {proj.description}
                                    </p>

                                    {/* stack */}
                                    <div className="flex flex-wrap gap-2 mt-6 mb-6">
                                        {proj.stack.map((s) => (
                                            <TechTag key={s} name={s}/>
                                        ))}
                                    </div>

                                    {/* buttons */}
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

            {/* scrollbar + arrows */}
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
                        className="focusable w-9 h-9 rounded-full border border-[#3d2410] text-[#a87c5a] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-30 transition-colors flex items-center justify-center"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        disabled={index === total - 1}
                        aria-label="Next project"
                        className="focusable w-9 h-9 rounded-full border border-[#3d2410] text-[#a87c5a] hover:border-[#c8956c] hover:text-[#e8bfa0] disabled:opacity-30 transition-colors flex items-center justify-center"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

