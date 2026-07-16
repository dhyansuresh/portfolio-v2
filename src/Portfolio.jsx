import { useState, useEffect, useMemo, useRef } from "react";
import photo1 from './images/photo1.jpeg'
import photo2 from './images/photo2.jpeg'
import photo3 from './images/photo3.jpeg'

const EXPERIENCE = [
  {
    role: "Network Technician",
    org: "West Networks",
    period: "May 2023 — May 2024",
    points: [
      "Built and deployed 100+ portable Peplink BR2 Pro/BR1 routers with rechargeable lithium battery and 4G/5G antennas.",
      "Configured dual-SIM protocol system enabling devices to switch between cellular providers for optimal performance in remote deployments.",
      "Monitored global network infrastructure via InControl software, tracking real-time operational status."
    ],
    stack: ["", ""],
  },
  {
    role: "Marketing Lead",
    org: "Google Developer Student Club @ UC",
    period: "Aug. 2024 – April 2024",
    points: [
      "Managed social media accounts to generate community engagement and networking opportunities among club members and external partners.",
      "Collaborated with local organizations to plan and execute technical workshops",
        "Facilitate weekly club meetings, ensuring effective communication and project alignment among team members."
    ],
    stack: [],
  },
];

const PROJECTS = [
  {
    name: "ASL Interpreter",
    tagline: "Real-time sign language recognition in the browser",
    description:
        "Browser-based American Sign Language interpreter using live hand-landmark tracking. Live video is processed frame-by-frame and recognized signs are spoken aloud.",
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
        "A Chrome extension that saves leads from any page with one click, persists them locally, and syncs across devices through a realtime cloud database.",
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

const SKILLS = [
  { group: "Languages", items: ["JavaScript", "Java", "C", "Python", "HTML", "CSS"] },
  { group: "Frameworks & Libraries", items: ["React", "Node.js", "TensorFlow.js", "Vite", "Tailwind CSS", "MediaPipe", "FastAPI"] },
  { group: "Developer Tools", items: ["Git", "GitHub", "Firebase", "AWS", "Vercel"] },
];

const NAV = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
];


const PHOTOS = [
  {
    src: photo1,
    title: "OC Game",
    description: "My partner and I at Orlando City game!",
  },
  {
    src: photo2,
    title: "Mount Fuji",
    description: "At Mount Fuji with my sister and her fiance.",
  },
  {
    src: photo3,
    title: "Puppy",
    description: "My pupper, Essie Mae!",
  },
];

// Each photo floats at a slightly different vertical offset and
// rotation so they look scattered in space rather than grid-aligned.
const FLOAT_STYLES = [
  { top: "0%",   rotate: "-4deg",  animDelay: "0s",    animDur: "6s"  },
  { top: "26%",  rotate: "3deg",   animDelay: "1.8s",  animDur: "7s"  },
  { top: "8%",   rotate: "-2deg",  animDelay: "0.9s",  animDur: "6.5s"},
];

function FloatingPhotos() {
  return (
      <>
        <style>{`
  @keyframes floatDrift {
    0%, 100% { transform: var(--base-transform) translateY(0px); }
    50%       { transform: var(--base-transform) translateY(-12px); }
  }
  .float-card {
    animation: floatDrift var(--dur) ease-in-out var(--delay) infinite;
    transition: transform 0.4s cubic-bezier(0.2, 0.6, 0.3, 1),
                box-shadow 0.4s ease;
    z-index: 1;
  }
  .float-card:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.6) !important;
    animation-play-state: paused;
    z-index: 50;
    box-shadow: 0 28px 72px rgba(0,0,0,0.8),
                0 0 36px rgba(200,149,108,0.3) !important;
  }
  .float-overlay {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .float-card:hover .float-overlay {
    opacity: 1;
  }
`}</style>

        <div className="relative w-full h-[30rem]">
          {PHOTOS.map((photo, i) => {
            const fs = FLOAT_STYLES[i];
            // spread the three cards across the width: left, center, right
            const lefts = ["-4%", "34%", "66%"];
            const baseTransform = `rotate(${fs.rotate})`;
            return (
                <div
                    key={i}
                    className="float-card absolute w-32 md:w-36 cursor-pointer rounded-xl overflow-hidden"
                    style={{
                      left: lefts[i],
                      top: fs.top,
                      "--base-transform": baseTransform,
                      "--dur": fs.animDur,
                      "--delay": fs.animDelay,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,149,108,0.15)",
                    }}
                >
                  <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-56 md:h-64 object-cover block"
                  />

                  {/* description overlay */}
                  <div className="float-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent flex flex-col justify-end p-3 pt-10">
                    <p
                        className="text-[#f5ede0] text-xs font-semibold leading-tight"
                        style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
                    >
                      {photo.title}
                    </p>
                    <p
                        className="text-[#d4b896] text-[10px] mt-1 leading-snug"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {photo.description}
                    </p>
                  </div>

                  {/* copper glow ring on hover */}
                  <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 1.5px rgba(200,149,108,0)" }}
                  />
                </div>
            );
          })}
        </div>
      </>
  );
}

// ---------------------------------------------------------------
// Milky Way intro
// "Structure of the Milky Way" model:

const GALAXY = {
  cx: 50, // center x, % of viewport width
  cy: 50, // center y, % of viewport height
  tilt: -0.32, // radians — perspective tilt of the disk
  squash: 0.5, // flattening from the viewing angle
  maxR: 55, // outer radius, % of viewport width
  spiralB: 0.5, // spiral tightness
};

function armRadius(t) {
  return Math.min(GALAXY.maxR * 0.12 * Math.exp(GALAXY.spiralB * t), GALAXY.maxR);
}

function project(theta, r) {
  let x = r * Math.cos(theta);
  let y = r * Math.sin(theta) * GALAXY.squash;
  const xr = x * Math.cos(GALAXY.tilt) - y * Math.sin(GALAXY.tilt);
  const yr = x * Math.sin(GALAXY.tilt) + y * Math.cos(GALAXY.tilt);
  return { x: GALAXY.cx + xr, y: GALAXY.cy + yr * 0.92 };
}

// The four major arms, matching the reference model.
const ARM_DEFS = [
  { name: "Perseus arm", offset: 0, labelT: 3.75 },
  { name: "Cygnus arm", offset: Math.PI / 2, labelT: 3.75 },
  { name: "Centaurus arm", offset: Math.PI, labelT: 3.75 },
  { name: "Sagittarius arm", offset: (3 * Math.PI) / 2, labelT: 3.75 },
];

// Orion: the short local spur between Sagittarius and Perseus.
const ORION_ARM = {
  name: "Orion (local) arm",
  offset: (3 * Math.PI) / 2 + 0.38,
  tMin: 2.45,
  tMax: 3.55,
  labelT: 2.7,
};

// The Sun sits ON the Orion arm, ~26,000 ly from the center —
// computed from the arm's own spiral equation so it can't drift off.
const SUN_T = 3.0;
const SUN_THETA = SUN_T + ORION_ARM.offset;
const SUN_R = armRadius(SUN_T);
const SUN_POS = project(SUN_THETA, SUN_R);

// Arm name labels, projected from each arm's own curve.
const ARM_LABELS = [
  ...ARM_DEFS.map((a) => ({
    name: a.name,
    ...project(a.labelT + a.offset, armRadius(a.labelT)),
  })),
  {
    name: ORION_ARM.name,
    ...project(ORION_ARM.labelT + ORION_ARM.offset, armRadius(ORION_ARM.labelT)),
    orion: true,
  },
];

function buildGalaxyStars() {
  const stars = [];
  let id = 0;

  // Major spiral arms — full radius
  for (const arm of ARM_DEFS) {
    for (let i = 0; i < 300; i++) {
      const t = Math.random() * 4.05 + 0.2;
      const r = armRadius(t) * (0.93 + Math.random() * 0.14);
      const jitter = (Math.random() - 0.5) * 0.26;
      const p = project(t + arm.offset + jitter, r);
      const warm = Math.random() < 0.18;
      stars.push({
        id: id++,
        x: p.x,
        y: p.y,
        size: Math.random() * 1.3 + 0.4,
        color: warm ? "#ffe0b0" : Math.random() < 0.5 ? "#dce8ff" : "#ffffff",
        opacity: Math.random() * 0.55 + 0.2,
      });
    }
  }

  // Orion spur — shorter, tighter, slightly brighter so it reads
  // as the distinct local arm the marker sits on
  for (let i = 0; i < 130; i++) {
    const t = ORION_ARM.tMin + Math.random() * (ORION_ARM.tMax - ORION_ARM.tMin);
    const r = armRadius(t) * (0.95 + Math.random() * 0.1);
    const jitter = (Math.random() - 0.5) * 0.16;
    const p = project(t + ORION_ARM.offset + jitter, r);
    stars.push({
      id: id++,
      x: p.x,
      y: p.y,
      size: Math.random() * 1.4 + 0.5,
      color: Math.random() < 0.7 ? "#e8f1ff" : "#ffffff",
      opacity: Math.random() * 0.5 + 0.35,
    });
  }

  // Central bulge — dense, warm
  for (let i = 0; i < 380; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 2.2) * GALAXY.maxR * 0.22;
    const p = project(theta, r);
    stars.push({
      id: id++,
      x: p.x,
      y: p.y,
      size: Math.random() * 1.2 + 0.4,
      color: Math.random() < 0.6 ? "#ffedc9" : "#fff7e8",
      opacity: Math.random() * 0.6 + 0.3,
    });
  }

  // Sparse disk stars between the arms
  for (let i = 0; i < 300; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * GALAXY.maxR;
    const p = project(theta, r);
    stars.push({
      id: id++,
      x: p.x,
      y: p.y,
      size: Math.random() * 1.0 + 0.3,
      color: "#c8d6f2",
      opacity: Math.random() * 0.28 + 0.08,
    });
  }

  return stars;
}

// ---------------------------------------------------------------
// Stage 2 — inside the Orion arm.

const ORION_EARTH = { x: 47, y: 58 };

const ORION_LABELED_STARS = [
  { name: "Alpha Centauri", dist: "4.4 ly", x: 56, y: 67, size: 2.6 },
  { name: "Sirius", dist: "8.6 ly", x: 34, y: 47, size: 3.2 },
  { name: "Vega", dist: "25 ly", x: 66, y: 33, size: 2.8 },
  { name: "Polaris", dist: "433 ly", x: 80, y: 50, size: 2.4 },
  { name: "Betelgeuse", dist: "~640 ly", x: 17, y: 64, size: 3.4, color: "#ffc9a0" },
  { name: "Rigel", dist: "~860 ly", x: 40, y: 22, size: 3.0, color: "#cfe4ff" },
];

// Band runs lower-left to upper-right; stars cluster around its axis.
function buildOrionStars() {
  const stars = [];
  const A = { x: -6, y: 88 };
  const B = { x: 106, y: 22 };
  for (let i = 0; i < 560; i++) {
    const u = Math.random();
    // sum of randoms ~ gaussian spread around the band's axis
    const g = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const px = A.x + (B.x - A.x) * u;
    const py = A.y + (B.y - A.y) * u;
    // perpendicular direction to the band
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const spread = 16;
    const warm = Math.random() < 0.14;
    stars.push({
      id: i,
      x: px + nx * g * spread,
      y: py + ny * g * spread,
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

// ---------------------------------------------------------------
// UniverseIntro — stage machine with zoom transitions
// ---------------------------------------------------------------

function UniverseIntro({ onEnter, arriving }) {
  // arriving=true means we're coming back from the portfolio:
  // start inside the Orion arm, zoomed in, and pull back.
  const [stage, setStage] = useState(arriving ? "orion" : "galaxy");
  const [galaxyAnim, setGalaxyAnim] = useState("");
  const [orionAnim, setOrionAnim] = useState(arriving ? "zoom-pre" : "");
  const busy = useRef(false);
  const touchY = useRef(null);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  // Star containers — the warp effect displaces their children directly
  const fieldWrapRef = useRef(null);
  const galaxyWrapRef = useRef(null);
  const orionWrapRef = useRef(null);

  const reducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const galaxyStars = useMemo(buildGalaxyStars, []);
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

  // Returning from the portfolio: mount zoomed-in and pull back out.
  useEffect(() => {
    if (!arriving) return;
    if (reducedMotion()) {
      setOrionAnim("");
      return;
    }
    const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setOrionAnim(""))
    );
    return () => cancelAnimationFrame(raf);
  }, [arriving]);

  // Star warp: stars near the cursor are pushed outward with a smooth
  // falloff, like the pointer is bending the field around itself.
  // Only the stars move — labels, markers, and haze stay put.
  // Direct DOM writes (no re-renders); only stars inside the warp
  // radius are touched each frame, plus resets for ones leaving it.
  useEffect(() => {
    if (reducedMotion()) return;
    const RADIUS = 100; // px — how far the warp reaches
    const STRENGTH = 30; // px — max push right at the cursor
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
        // cheap bounding-box rejection before the sqrt
        if (dx > RADIUS || dx < -RADIUS || dy > RADIUS || dy < -RADIUS) {
          if (displaced.has(kids[i])) {
            kids[i].style.transform = "";
            displaced.delete(kids[i]);
          }
          continue;
        }
        const d = Math.hypot(dx, dy);
        if (d > RADIUS) {
          if (displaced.has(kids[i])) {
            kids[i].style.transform = "";
            displaced.delete(kids[i]);
          }
          continue;
        }
        const f = 1 - d / RADIUS; // 1 at the cursor, 0 at the edge
        const push = f * f * STRENGTH; // quadratic falloff feels organic
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
      if (busy.current) return; // pause during zoom transitions
      const mx = e.clientX;
      const my = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        warpContainer(fieldWrapRef.current, fieldStars, mx, my, w, h);
        if (stageRef.current === "galaxy") {
          warpContainer(galaxyWrapRef.current, galaxyStars, mx, my, w, h);
        } else {
          warpContainer(orionWrapRef.current, orionStars, mx, my, w, h);
        }
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

  // --- transitions ---
  const goOrion = () => {
    if (busy.current) return;
    if (reducedMotion()) {
      setStage("orion");
      return;
    }
    busy.current = true;
    setGalaxyAnim("zoom-in");
    setTimeout(() => {
      setStage("orion");
      setOrionAnim("appear-pre");
      requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setOrionAnim("");
            setTimeout(() => (busy.current = false), 700);
          })
      );
    }, 1000);
  };

  const goPortfolio = () => {
    if (busy.current) return;
    if (reducedMotion()) return onEnter();
    busy.current = true;
    setOrionAnim("zoom-in");
    setTimeout(onEnter, 1150);
  };

  const goGalaxy = () => {
    if (busy.current) return;
    if (reducedMotion()) {
      setStage("galaxy");
      return;
    }
    busy.current = true;
    setOrionAnim("shrink-out");
    setTimeout(() => {
      setStage("galaxy");
      setGalaxyAnim("zoom-pre");
      requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setGalaxyAnim("");
            setTimeout(() => (busy.current = false), 1200);
          })
      );
    }, 650);
  };

  // Scroll / swipe navigation between stages.
  useEffect(() => {
    const down = () => (stageRef.current === "galaxy" ? goOrion() : goPortfolio());
    const up = () => stageRef.current === "orion" && goGalaxy();
    const onWheel = (e) => {
      if (e.deltaY > 25) down();
      else if (e.deltaY < -25) up();
    };
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = touchY.current - e.touches[0].clientY;
      if (delta > 45) {
        touchY.current = null;
        down();
      } else if (delta < -45) {
        touchY.current = null;
        up();
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

  const isGalaxy = stage === "galaxy";
  const zoomClass = isGalaxy ? galaxyAnim : orionAnim;
  const origin = isGalaxy ? SUN_POS : ORION_EARTH;

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
          perspective: 900px;
          transform-origin: ${origin.x}% ${origin.y}%;
          transition: transform 1.15s cubic-bezier(0.7, 0, 0.85, 1), opacity 1.15s ease;
        }
        .stage-scene.zoom-in { transform: scale(45); opacity: 0; }
        .stage-scene.zoom-pre { transform: scale(45); opacity: 0; transition: none; }
        .stage-scene.appear-pre { transform: scale(0.55); opacity: 0; transition: none; }
        .stage-scene.shrink-out {
          transform: scale(0.55); opacity: 0;
          transition: transform 0.65s ease, opacity 0.65s ease;
        }
        .parallax-layer {
          position: absolute; inset: 0;
        }
        .warp-star {
          transition: transform 0.22s cubic-bezier(0.2, 0.6, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .stage-scene { transition: none; }
        }
      `}</style>

        <div className={`stage-scene ${zoomClass}`}>
          {/* Layer 1 — distant background stars */}
          <div ref={fieldWrapRef} className="parallax-layer">
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

          {/* Layer 2 — the active stage */}
          <div className="parallax-layer">
            {isGalaxy ? (
                <>
                  {/* Galactic haze */}
                  <div
                      className="absolute"
                      style={{
                        left: `${GALAXY.cx}%`,
                        top: `${GALAXY.cy}%`,
                        width: "115vw",
                        height: "56vw",
                        transform: `translate(-50%,-50%) rotate(${(GALAXY.tilt * 180) / Math.PI}deg)`,
                        background:
                            "radial-gradient(ellipse, rgba(180,120,60,0.14) 0%, rgba(140,80,30,0.07) 45%, transparent 72%)",
                        filter: "blur(8px)",
                        borderRadius: "50%",
                      }}
                  />
                  <div
                      className="absolute"
                      style={{
                        left: `${GALAXY.cx}%`,
                        top: `${GALAXY.cy}%`,
                        width: "28vw",
                        height: "14vw",
                        transform: `translate(-50%,-50%) rotate(${(GALAXY.tilt * 180) / Math.PI}deg)`,
                        background:
                            "radial-gradient(ellipse, rgba(255,236,200,0.5) 0%, rgba(255,220,160,0.16) 45%, transparent 70%)",
                        filter: "blur(6px)",
                        borderRadius: "50%",
                      }}
                  />

                  {/* Galaxy star particles — in their own container so the
                  warp effect can map children 1:1 to star data */}
                  <div ref={galaxyWrapRef} className="absolute inset-0 pointer-events-none">
                    {galaxyStars.map((s) => (
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

                  {/* Arm name labels */}
                  {ARM_LABELS.map((l) => (
                      <p
                          key={l.name}
                          className={`absolute whitespace-nowrap ${
                              l.orion ? "text-[#e8bfa0]" : "text-[#a87c5a]"
                          }`}
                          style={{
                            left: `${l.x}%`,
                            top: `${l.y}%`,
                            transform: "translate(-50%,-50%)",
                            fontSize: "11px",
                            fontFamily: "'IBM Plex Mono', monospace",
                            textShadow: "0 0 6px rgba(2,4,10,0.9)",
                            letterSpacing: "0.05em",
                          }}
                      >
                        {l.name}
                      </p>
                  ))}

                  {/* Earth marker — on the Orion arm. The button is a large
                  invisible 130px circle so it's easy to hit even though
                  the dot itself is tiny. */}
                  <button
                      onClick={goOrion}
                      aria-label="Zoom into the Orion arm"
                      className="focusable absolute rounded-full group"
                      style={{
                        left: `${SUN_POS.x}%`,
                        top: `${SUN_POS.y}%`,
                        transform: "translate(-50%,-50%)",
                        width: "130px",
                        height: "130px",
                        cursor: "pointer",
                        background: "transparent",
                      }}
                  >
                    {/* faint hover halo so the big hit area announces itself */}
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
                          width: "18px",
                          height: "18px",
                          animation: "pulseRing 2.4s ease-out infinite",
                        }}
                    />
                    <span
                        className="absolute rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%,-50%)",
                          width: "6px",
                          height: "6px",
                          background: "radial-gradient(circle at 35% 35%, #f5ede0, #c8956c)",
                          boxShadow: "0 0 10px 3px rgba(220,160,90,0.8)",
                        }}
                    />
                  </button>

                  {/* "click me" — only Earth is labeled on the main page */}
                  {zoomClass === "" && (
                      <div
                          className="absolute pointer-events-none flex flex-col items-center"
                          style={{
                            left: `${SUN_POS.x}%`,
                            top: `calc(${SUN_POS.y}% - 100px)`,
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
                          <path d="M6 52 L1 42 L11 42 Z" fill="rgba(245,210,160,0.75)" />
                        </svg>
                      </div>
                  )}
                </>
            ) : (
                <>
                  {/* Orion arm haze — the band in perspective */}
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

                  {/* Arm stars — own container for the warp effect */}
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

                  {/* Labeled neighborhood stars — they live here now */}
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

                  {/* Earth — click to land. Large invisible 150px hit circle. */}
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
                          <path d="M6 52 L1 42 L11 42 Z" fill="rgba(245,210,160,0.75)" />
                        </svg>
                      </div>
                  )}
                </>
            )}
          </div>

          {/* Captions */}
          <p
              className="absolute top-8 left-1/2 -translate-x-1/2 text-[11px] tracking-widest uppercase text-[#7a5538] text-center px-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {isGalaxy
                ? "structure of the milky way · earth rides the orion arm, ~26,000 light-years out"
                : "the orion (local) arm · our stellar neighborhood, ~3,500 light-years long"}
          </p>
          <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#7a5538] flex items-center gap-2 whitespace-nowrap"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                animation: "hintFade 2.6s ease-in-out infinite",
              }}
          >
            {isGalaxy ? (
                <span>scroll down to fly into the orion arm ↓</span>
            ) : (
                <span>↓ scroll down to land on earth · scroll up for the full galaxy ↑</span>
            )}
          </p>
        </div>
      </div>
  );
}

// ---------------------------------------------------------------
// Shared pieces

// 21 MediaPipe hand landmarks — a nod to the ASL interpreter.
const HAND_POINTS = [
  [50, 190], [78, 168], [102, 140], [118, 114], [132, 92],
  [92, 108], [98, 76], [102, 52], [105, 32],
  [72, 104], [74, 66], [75, 40], [76, 18],
  [52, 108], [50, 72], [49, 46], [48, 26],
  [32, 118], [26, 90], [22, 70], [19, 52],
];
const HAND_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17],
];

function HandConstellation() {
  return (
      <svg
          viewBox="0 0 160 210"
          className="w-full max-w-xs mx-auto"
          aria-hidden="true"
          style={{ overflow: "visible" }}
      >
        {HAND_EDGES.map(([a, b], i) => (
            <line
                key={i}
                x1={HAND_POINTS[a][0]}
                y1={HAND_POINTS[a][1]}
                x2={HAND_POINTS[b][0]}
                y2={HAND_POINTS[b][1]}
                stroke="#c8956c"
                strokeOpacity="0.4"
                strokeWidth="1.2"
            />
        ))}
        {HAND_POINTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3.4 : 2.4} fill="#f5ede0">
              <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur={`${2.4 + (i % 5) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${(i % 7) * 0.3}s`}
              />
            </circle>
        ))}
      </svg>
  );
}

function SectionLabel({ children }) {
  return (
      <div className="flex items-center gap-3 mb-8">
      <span
          className="text-xs tracking-widest uppercase text-[#c8956c]"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        ~/{children}
      </span>
        <div className="flex-1 h-px bg-[#3d2410]" />
      </div>
  );
}

// Faint ambient starfield behind the whole portfolio.
function AmbientStars() {
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

// ---------------------------------------------------------------
// Main component
// ---------------------------------------------------------------

export default function Portfolio() {
  const [entered, setEntered] = useState(false);
  const [hasVisited, setHasVisited] = useState(false); // triggers zoom-out on return
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const enteredAt = useRef(0);
  const touchY = useRef(null);

  // Section highlighting while scrolling the portfolio
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

  // Scroll up at the very top of the page -> zoom back out to the galaxy
  useEffect(() => {
    if (!entered) return;
    const tryExit = () => {
      if (window.scrollY > 2) return false;
      if (Date.now() - enteredAt.current < 1200) return false; // settle time
      setEntered(false);
      return true;
    };
    const onWheel = (e) => {
      if (e.deltaY < -30) tryExit();
    };
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current; // downward swipe = scroll up
      if (delta > 60 && tryExit()) touchY.current = null;
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
    return <UniverseIntro onEnter={handleEnter} arriving={hasVisited} />;
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
          svg animate { display: none; }
        }
        .display { font-family: 'Archivo', system-ui, sans-serif; font-stretch: 125%; }
        .focusable:focus-visible { outline: 2px solid #c8956c; outline-offset: 3px; border-radius: 2px; }
      `}</style>

        <AmbientStars />

        {/* ---------- Nav ---------- */}
        <header className="sticky top-0 z-40 border-b border-[#3d2410]/80 backdrop-blur bg-[#0a0603]/80
">
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
          {/* ---------- About ---------- */}
          <section id="about" className="pt-16 pb-24">
            <p
                className="text-xs text-[#5a3820] mb-10 flex items-center gap-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <span aria-hidden="true">↑</span>
              <span>scroll up from here to fly back into the orion arm</span>
            </p>
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <p
                    className="text-[#c8956c] text-sm mb-4 tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  cs student · builder · orlando, fl
                </p>
                <h1 className="display font-black text-5xl sm:text-6xl leading-none tracking-tight mb-6 text-[#fdf6ee]">
                  Hey,
                  <br />
                  My name is  <span className="text-stone-400">Dhyan Suresh!</span>
                </h1>
                <p className="text-[#a87c5a] max-w-lg leading-relaxed mb-8">
                  I'm a computer science student currently attending the University of Central Florida! (Go Knights!)
                  I've been honing my technical skills via hackathons, projects, and classwork. Check out my page to learn more about me!
                </p>
                <div className="flex gap-4">
                  <button
                      onClick={() => scrollTo("projects")}
                      className="focusable bg-[#c8956c] text-[#0a0603] px-5 py-2.5 text-sm font-semibold hover:bg-[#e8bfa0] transition-colors"
                  >
                    View projects
                  </button>
                  <a
                      href="https://github.com/dhyansuresh"
                      target="_blank"
                      rel="noreferrer"
                      className="focusable border border-[#5a3820] text-[#e8d9c8] px-5 py-2.5 text-sm font-medium hover:border-[#c8956c] hover:text-[#e8bfa0] transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
                <div className="md:col-span-2 hidden md:block">
                <FloatingPhotos />
              </div>
            </div>

          </section>


          {/* ---------- Experience ---------- */}
          <section id="experience" className="pb-24 scroll-mt-20">
            <SectionLabel>experience</SectionLabel>
            <div className="space-y-6">
              {EXPERIENCE.map((job, i) => (
                  <article
                      key={i}
                      className="bg-[#1c1008]/80 border border-[#3d2410] p-6 sm:p-8 grid sm:grid-cols-4 gap-4 transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div>
                      <p
                          className="text-xs text-[#7a5538]"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {job.period}
                      </p>
                    </div>
                    <div className="sm:col-span-3">
                      <h3 className="display font-bold text-xl tracking-tight text-[#f5ede0]">
                        {job.role}
                      </h3>
                      <p className="text-[#c8956c] text-sm font-medium mb-3">{job.org}</p>
                      <ul className="space-y-1.5 text-[#a87c5a] text-sm leading-relaxed list-disc pl-4">
                        {job.points.map((p, j) => (
                            <li key={j}>{p}</li>
                        ))}
                      </ul>
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
                    </div>
                  </article>
              ))}
            </div>
          </section>

          {/* ---------- Projects ---------- */}
          <section id="projects" className="pb-24 scroll-mt-20">
            <SectionLabel>projects</SectionLabel>
            <div className="grid md:grid-cols-3 gap-6">
              {PROJECTS.map((proj) => (
                  <article
                      key={proj.name}
                      className={`p-6 flex flex-col border transition-transform duration-300 hover:-translate-y-2 ${
                          proj.highlight
                              ? "md:col-span-2 border-[#c8956c]/50 bg-gradient-to-br from-[#261508] to-[#1a0c04]"
                              : "bg-[#1c1008]/80 border-[#3d2410]"
                      }`}
                      style={
                        proj.highlight
                            ? { boxShadow: "0 0 40px -12px rgba(200,149,108,0.35)" }
                            : undefined
                      }
                  >
                    <h3 className="display font-bold text-2xl tracking-tight mb-1 text-[#fdf6ee]">
                      {proj.name}
                    </h3>
                    <p className="text-sm mb-3 text-[#c8956c]">{proj.tagline}</p>
                    <p className="text-sm leading-relaxed flex-1 text-[#a87c5a]">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 mb-4">
                      {proj.stack.map((s) => (
                          <span
                              key={s}
                              className="text-xs px-2 py-0.5 bg-[#2a1508]/80 text-[#a87c5a]"
                              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                          >
                      {s}
                    </span>
                      ))}
                    </div>
                    <a
                        href={proj.link}
                        className="focusable text-sm font-medium text-[#e8bfa0] hover:underline"
                    >
                      View repo ↗
                    </a>
                  </article>
              ))}
            </div>
          </section>

          {/* ---------- Skills ---------- */}
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
                          <span
                              key={item}
                              className="text-sm px-3 py-1 border border-[#3d2410] text-[#d4b896]"
                          >
                      {item}
                    </span>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* ---------- Footer ---------- */}
          <footer className="border-t border-[#3d2410] py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
                className="text-xs text-[#7a5538]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              © {new Date().getFullYear()} Dhyan Suresh
            </p>
            <div className="flex gap-5 text-sm">
              <a href="https://github.com/dhyansuresh" target="_blank" rel="noreferrer" className="focusable text-[#a87c5a] hover:text-[#e8bfa0]">
                GitHub
              </a>
              <a href="https://linkedin.com/in/dhyansuresh" target="_blank" rel="noreferrer" className="focusable text-[#a87c5a] hover:text-[#e8bfa0]">
                LinkedIn
              </a>
              <a href="mailto:dhyan.sur@gmail.com" className="focusable text-[#a87c5a] hover:text-[#e8bfa0]">
                Email
              </a>
              <a href="resume.com"arget="_blank" rel="noreferrer" className="focusable text-[#a87c5a] hover:text-[#e8bfa0]">
                  Resume
              </a>
            </div>
          </footer>
        </main>
      </div>
  );
}