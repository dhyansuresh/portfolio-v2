import { useEffect, useRef, useState } from "react";
import UniverseIntro from "./OrionArm";
import ProjectsCarousel from "./ProjectsCarousel";
import FloatingPhotos from "./FloatingPhotos";
import { AmbientStars, SectionLabel } from "./ui";
import { EXPERIENCE, NAV, SKILLS } from "./data";
import {TechTag} from "./TechIcons.jsx";

const RESUME_URL = "/resume_temp.pdf";
const GITHUB_URL = "https://github.com/dhyansuresh";

export default function Portfolio() {
    const [entered, setEntered] = useState(false);
    const [hasVisited, setHasVisited] = useState(false); // makes the intro zoom back out
    const [active, setActive] = useState("about");
    const [menuOpen, setMenuOpen] = useState(false);
    const enteredAt = useRef(0);
    const touchY = useRef(null);

    // highlight the nav item for whichever section is in view
    useEffect(() => {
        if (!entered) return;
        const onScroll = () => {
            let current = "about";
            for (const { id } of NAV) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < 140) current = id;
            }
            setActive(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [entered]);

    // scroll up at the very top to go back to the orion arm
    useEffect(() => {
        if (!entered) return;
        const tryExit = () => {
            if (window.scrollY > 2) return false;
            if (Date.now() - enteredAt.current < 1200) return false; // let the entry settle
            setEntered(false);
            return true;
        };
        const onWheel = (e) => {
            if (e.deltaY < -30) tryExit();
        };
        const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
        const onTouchMove = (e) => {
            if (touchY.current == null) return;
            // swiping down means scrolling up
            if (e.touches[0].clientY - touchY.current > 60 && tryExit()) {
                touchY.current = null;
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
    }, [entered]);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleEnter = () => {
        setEntered(true);
        setHasVisited(true);
        enteredAt.current = Date.now();
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.getElementById("about")?.scrollIntoView({ block: "start" });
        });
    };

    if (!entered) {
        return <UniverseIntro onEnter={handleEnter} arriving={hasVisited}/>;
    }

    return (
        <div
            className="min-h-screen text-[#e8d9c8] relative"
            style={{
                background:
                    "radial-gradient(ellipse at 50% -10%, #1a0f06 0%, #0e0804 45%, #050200 100%)",
                fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
                animation: "pageReveal 0.7s ease-out",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,500..900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes pageReveal {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          [style*="pageReveal"] { animation: none !important; }
        }
        .display { font-family: 'Archivo', system-ui, sans-serif; font-stretch: 125%; }
        .focusable:focus-visible { outline: 2px solid #c8956c; outline-offset: 3px; border-radius: 2px; }
      `}</style>

            <AmbientStars/>

            {/* nav */}
            <header className="sticky top-0 z-40 border-b border-[#3d2410]/80 backdrop-blur bg-[#0a0603]/80">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <button
                        onClick={() => scrollTo("about")}
                        className="display font-bold text-lg tracking-tight text-[#f5ede0] focusable"
                    >
                        dhyan<span className="text-[#c8956c]">.dev</span>
                    </button>

                    <nav className="hidden sm:flex gap-6" aria-label="Sections">
                        {NAV.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`text-sm focusable transition-colors ${
                                    active === id
                                        ? "text-[#c8956c] font-semibold"
                                        : "text-[#7a5538] hover:text-[#e8d9c8]"
                                }`}
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    <button
                        className="sm:hidden focusable text-sm text-[#d4b896]"
                        onClick={() => setMenuOpen((m) => !m)}
                        aria-expanded={menuOpen}
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                        {menuOpen ? "close" : "menu"}
                    </button>
                </div>

                {menuOpen && (
                    <nav className="sm:hidden border-t border-[#3d2410] bg-[#120a04] px-6 py-3 flex flex-col gap-3">
                        {NAV.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className="text-left text-sm text-[#d4b896] focusable"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                ~/{label}
                            </button>
                        ))}
                    </nav>
                )}
            </header>

            <main className="max-w-5xl mx-auto px-6 relative">
                {/* about */}
                <section id="about" className="pt-16 pb-24">
                    <p
                        className="text-xs text-[#5a3820] mb-10"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                        ↑ scroll up from here to fly back into the orion arm
                    </p>

                    <div className="grid md:grid-cols-5 gap-12 items-center">
                        <div className="md:col-span-3">
                            <p
                                className="text-[#c8956c] text-sm mb-4 tracking-widest uppercase"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                student · dev · orlando, fl
                            </p>
                            <h1 className="display font-black text-5xl sm:text-6xl leading-none tracking-tight mb-6 text-[#fdf6ee]">
                                Hey,
                                <br/>
                                My name is <span className="text-[#c8956c]">Dhyan Suresh!</span>
                            </h1>
                            <p className="text-[#a87c5a] max-w-lg leading-relaxed mb-8">
                                Welcome to my site. Scroll down to get to know me and see what I've
                                been working on!
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="focusable bg-[#c8956c] text-[#0a0603] px-5 py-2.5 text-sm font-semibold hover:bg-[#e8bfa0] transition-colors"
                                >
                                    Resume ↗
                                </a>
                                <a
                                    href={GITHUB_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="focusable border border-[#5a3820] text-[#e8d9c8] px-5 py-2.5 text-sm font-medium hover:border-[#c8956c] hover:text-[#e8bfa0] transition-colors"
                                >
                                    GitHub ↗
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <FloatingPhotos/>
                        </div>
                    </div>
                </section>

                {/* projects */}
                <section id="projects" className="pb-24 scroll-mt-20">
                    <SectionLabel>projects</SectionLabel>
                    <ProjectsCarousel/>
                </section>

                {/* experience */}
                <section id="experience" className="pb-24 scroll-mt-20">
                    <SectionLabel>experience</SectionLabel>
                    <div className="space-y-6">
                        {EXPERIENCE.map((job) => (
                            <article
                                key={`${job.org}-${job.role}`}
                                className="bg-[#1c1008]/80 border border-[#3d2410] p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-2"
                            >
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h3 className="display font-bold text-xl tracking-tight text-[#f5ede0]">
                                        {job.role}
                                    </h3>
                                    <p
                                        className="text-xs text-[#7a5538] shrink-0"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    >
                                        {job.period}
                                    </p>
                                </div>

                                <p className="text-[#c8956c] text-sm font-medium mb-3">{job.org}</p>

                                <ul className="space-y-1.5 text-[#a87c5a] text-sm leading-relaxed list-disc pl-4">
                                    {job.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>

                                {job.stack?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {job.stack.map((s) => (
                                            <span
                                                key={s}
                                                className="text-xs px-2 py-0.5 bg-[#2a1508]/80 text-[#a87c5a]"
                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* skills */}
                <section id="skills" className="pb-24 scroll-mt-20">
                    <SectionLabel>skills</SectionLabel>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {SKILLS.map(({ group, items }) => (
                            <div key={group} className="bg-[#1c1008]/80 border border-[#3d2410] p-6">
                                <h3
                                    className="text-xs uppercase tracking-widest text-[#7a5538] mb-4"
                                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                >
                                    {group}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item) => (
                                        <TechTag key={item} name={item} size={"lg"} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* footer */}
                <footer
                    className="border-t border-[#3d2410] py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p
                        className="text-xs text-[#7a5538]"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                        © {new Date().getFullYear()} Dhyan Suresh
                    </p>
                    <div className="flex gap-5 text-sm">
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="focusable text-[#a87c5a] hover:text-[#e8bfa0]"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/dhyansuresh"
                            target="_blank"
                            rel="noreferrer"
                            className="focusable text-[#a87c5a] hover:text-[#e8bfa0]"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:dhyan.sur@gmail.com"
                            className="focusable text-[#a87c5a] hover:text-[#e8bfa0]"
                        >
                            Email
                        </a>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="focusable text-[#a87c5a] hover:text-[#e8bfa0]"
                        >
                            Resume
                        </a>
                    </div>
                </footer>
            </main>
        </div>
    );
}