"use client";

import IsometricVideos from "@/components/isometric-videos";
import { motion } from "framer-motion";

export default function Home() {
  const useMotionProps = () => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 2,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    },
  });

  return (
    <main className="font-vollkorn ">
      <motion.h1
        {...useMotionProps()}
        className=" text-4xl sm:text-6xl md:text-7xl lg:text-8xl pb-6  sm:pb-10"
      >
        Juan Carlos Avalúos
      </motion.h1>
      <div className="flex flex-col lg:flex-row">
        <motion.p {...useMotionProps()} className="pb-6  sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eos
          deserunt beatae eaque officia eveniet ratione animi, necessitatibus
          dolor mollitia magni cum! Omnis labore neque blanditiis repudiandae,
          placeat earum sed.
        </motion.p>
        <IsometricVideos />
      </div>
    </main>
  );
}
