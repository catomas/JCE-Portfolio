"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [isFirstVideoPlaying, setIsFirstVideoPlaying] = useState(true);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsFirstVideoPlaying(false);
    if (secondVideoRef.current) {
      secondVideoRef.current.play();
    }
  };

  return (
    <main className="font-vollkorn container py-36 ">
      <h1 className="text-6xl sm:text-8xl pb-10">Juan Carlos Avalúos</h1>
      <div className="flex">
        <p className="  text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eos
          deserunt beatae eaque officia eveniet ratione animi, necessitatibus
          dolor mollitia magni cum! Omnis labore neque blanditiis repudiandae,
          placeat earum sed.
        </p>

        <video
          ref={firstVideoRef}
          className={`w-auto h-[470px] ${isFirstVideoPlaying ? "" : "hidden"}`}
          autoPlay
          muted
          onEnded={handleVideoEnd}
        >
          <source src="/videos/Main_white.mp4" type="video/mp4" />
        </video>
        <video
          ref={secondVideoRef}
          className={`w-auto h-[470px] ${isFirstVideoPlaying ? "hidden" : ""}`}
          loop
          muted
        >
          <source src="/videos/loop_main_white_HD.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
}
