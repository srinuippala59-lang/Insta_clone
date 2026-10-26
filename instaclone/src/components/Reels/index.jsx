import { useEffect, useMemo, useRef } from "react";
import "./index.css";

const videoList = [
  {
    id: 1,
    user: "nature_lover",
    caption: "Big Buck Bunny 🐰",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    user: "dream_films",
    caption: "Elephants Dream 🐘",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 3,
    user: "fun_clips",
    caption: "For Bigger Blazes 🔥",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 4,
    user: "travel_diaries",
    caption: "For Bigger Escapes ✈️",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 5,
    user: "joy_rides",
    caption: "For Bigger Joyrides 🚗",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 6,
    user: "sintel_official",
    caption: "Sintel 🎬",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Reel({ reel }) {
  const videoRef = useRef(null);

  // Play when the reel is on screen, pause when it scrolls away
  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.7 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    video.paused ? video.play() : video.pause();
  };

  return (
    <div className="reel">
      <video
        ref={videoRef}
        className="reel-video"
        src={reel.src}
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      <div className="reel-info">
        <strong>@{reel.user}</strong>
        <p>{reel.caption}</p>
      </div>
      <div className="reel-actions">
        <button>❤️</button>
        <button>💬</button>
        <button>➤</button>
      </div>
    </div>
  );
}

function Reels() {
  // Shuffle once per visit so each time you open Reels the order is random
  const reels = useMemo(() => shuffle(videoList), []);

  return (
    <div className="reels-container">
      {reels.map((reel) => (
        <Reel key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

export default Reels;
