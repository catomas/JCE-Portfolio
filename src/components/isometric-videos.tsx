"use client";
import { useState, useRef, useEffect } from "react";

const IsometricVideos = () => {
  const [isFirstVideoPlaying, setIsFirstVideoPlaying] = useState(true);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (firstVideoRef.current) {
      firstVideoRef.current.playbackRate = 1.5;
    }
  }, []);

  const handleVideoEnd = () => {
    setIsFirstVideoPlaying(false);
    if (secondVideoRef.current) {
      secondVideoRef.current.play();
    }
  };
  return (
    <>
      <video
        ref={firstVideoRef}
        className={`w-auto border-none outline-none  max-h-[400px]  xl:min-h-[500px]  ${
          isFirstVideoPlaying ? "" : "hidden"
        }`}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        controls={false}
        playsInline
        preload="auto"
      >
        <source src="/videos/Main_V5.mp4" type="video/mp4" />
      </video>
      <video
        ref={secondVideoRef}
        className={`h-auto w-auto border-none outline-none  max-h-[400px] xl:min-h-[500px]  ${
          isFirstVideoPlaying ? "hidden" : ""
        }`}
        loop
        muted
        controls={false}
        playsInline
        preload="auto"
      >
        <source src="/videos/loop_white_V2.mp4" type="video/mp4" />
      </video>
    </>
  );
};

export default IsometricVideos;
