"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isFirstVideoPlaying, setIsFirstVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsFirstVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [isFirstVideoPlaying]);

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

        {isFirstVideoPlaying ? (
          <video
            className="w-auto h-[420px]"
            autoPlay
            muted
            onEnded={handleVideoEnd}
          >
            <source src="/videos/Main_white.mp4" type="video/mp4" />
          </video>
        ) : (
          <video
            ref={videoRef}
            className="w-auto h-[420px]"
            loop
            muted
            preload="auto"
          >
            <source src="/videos/loop_main_white_HD.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </main>
  );
}
