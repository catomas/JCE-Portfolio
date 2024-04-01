"use client";
import { useState, useRef, useEffect } from "react";

const IsometricVideos = () => {
  const [isFirstVideoPlaying, setIsFirstVideoPlaying] = useState(true);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (firstVideoRef.current && firstVideoRef.current.readyState > 3) {
      setIsLoading(false);
    }
  }, []);

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
    <div className=" ">
      {/* {isLoading && (
        <div className="flex justify-center items-center h-[400px] xl:min-h-[500px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )} */}
      <video
        ref={firstVideoRef}
        className={`h-auto w-auto border-none outline-none    ${
          isFirstVideoPlaying ? "" : "hidden"
        }`}
        autoPlay
        preload="auto"
        muted
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoad}
        controls={false}
        playsInline
      >
        <source src="/videos/main_comprimido.mp4" type="video/mp4" />
      </video>
      <video
        ref={secondVideoRef}
        className={`h-auto w-auto border-none outline-none    ${
          isFirstVideoPlaying ? "hidden" : ""
        }`}
        loop
        muted
        preload="auto"
        controls={false}
        playsInline
      >
        <source src="/videos/loop_comprimido.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default IsometricVideos;
