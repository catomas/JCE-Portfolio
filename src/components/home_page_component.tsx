"use client";

import IsometricVideos from "@/components/isometric_videos";
import { motion } from "framer-motion";
import Image from "next/image";

export const HomePageComponent = () => {
  const useMotionProps = () => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    },
  });

  return (
    <>
      <motion.h1
        {...useMotionProps()}
        className=" text-4xl sm:text-6xl md:text-7xl  pb-6  sm:pb-10"
      >
        Juan Carlos Echeverri Avalúos
      </motion.h1>
      <div className="flex flex-col lg:flex-row">
        <motion.div {...useMotionProps()} className="pb-6 italic  sm:text-xl">
          <p>
            &quot;Soy un experimentado avaluador certificado por la Lonja de
            Avaluadores, con una sólida trayectoria en el campo de la valoración
            de bienes. Con años de experiencia en la industria, estoy
            comprometido a proporcionar evaluaciones precisas y confiables para
            una variedad de propósitos&quot;
          </p>
          <div className="flex  items-end justify-end">
            <Image
              className="mt-5"
              src="/images/logo-longa.png"
              width={50}
              height={50}
              alt="logo lonja"
            />
          </div>
        </motion.div>

        <IsometricVideos />
      </div>
    </>
  );
};
