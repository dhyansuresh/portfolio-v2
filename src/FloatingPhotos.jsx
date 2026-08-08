import photo1 from "./images/photo1.jpeg";
import photo2 from "./images/photo2.jpeg";
import photo3 from "./images/photo3.jpeg";

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

// each card sits at a different height and angle so they look scattered.
// left positions spread them across the column.
const FLOAT_STYLES = [
    { top: "0%", left: "-4%", rotate: "-4deg", delay: "0s", dur: "6s" },
    { top: "26%", left: "34%", rotate: "3deg", delay: "1.8s", dur: "7s" },
    { top: "8%", left: "66%", rotate: "-2deg", delay: "0.9s", dur: "6.5s" },
];

export default function FloatingPhotos() {
    return (
        <>
            <style>{`
  @keyframes floatDrift {
    0%, 100% { transform: var(--base-transform) translateY(0px); }
    50%      { transform: var(--base-transform) translateY(-12px); }
  }
  .float-card {
    animation: floatDrift var(--dur) ease-in-out var(--delay) infinite;
    transition: transform 0.4s cubic-bezier(0.2, 0.6, 0.3, 1), box-shadow 0.4s ease;
    z-index: 1;
  }
  .float-card:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.6) !important;
    animation-play-state: paused;
    z-index: 50;
    box-shadow: 0 28px 72px rgba(0,0,0,0.8), 0 0 36px rgba(200,149,108,0.3) !important;
  }
  .float-overlay { opacity: 0; transition: opacity 0.3s ease; }
  .float-card:hover .float-overlay { opacity: 1; }
`}</style>

            <div className="relative w-full h-72 md:h-[30rem]">
                {PHOTOS.map((photo, i) => {
                    const fs = FLOAT_STYLES[i];
                    return (
                        <div
                            key={photo.title}
                            className="float-card absolute w-32 md:w-36 cursor-pointer rounded-xl overflow-hidden"
                            style={{
                                left: fs.left,
                                top: fs.top,
                                "--base-transform": `rotate(${fs.rotate})`,
                                "--dur": fs.dur,
                                "--delay": fs.delay,
                                boxShadow:
                                    "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,149,108,0.15)",
                            }}
                        >
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-56 md:h-64 object-cover block"
                            />

                            {/* caption strip — always visible on mobile since there's no hover */}
                            <div
                                className="float-overlay max-md:opacity-100 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent flex flex-col justify-end p-3 pt-10">
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
                        </div>
                    );
                })}
            </div>
        </>
    );
}
