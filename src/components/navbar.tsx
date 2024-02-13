"use client";

import { links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { WhatsappLink } from "./whatsapp_link";

const Navbar = () => {
  const pathname = usePathname();

  const [menuIcon, setMenuIcon] = useState(false);

  const handleSmalerScreensNavigation = () => {
    setMenuIcon(!menuIcon);
  };

  let currentPathWithoutSlash =
    pathname === "/" ? "/" : pathname.replace("/", "");

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-[50] font-vollkorn fixed bg-slate w-full top-0 left-0 bg-gray-50 border-b-2 md:border-b-0  py-3 md:bg-transparent"
    >
      <nav className="max-w-[1700px] mx-auto h-20 md:h-28 flex justify-between items-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className=" flex items-center justify-center relative h-40 w-40  md:h-52 md:w-52 md:hidden lg:flex "
        >
          <Link href="/">
            <Image
              priority
              height={200}
              width={200}
              style={{ width: "100%", height: "auto" }}
              src="/logo.png"
              alt="logo"
            />
          </Link>
        </motion.div>
        {/* large screens */}
        <div className="flex items-center justify-center h-screen">
          <div className="hidden md:flex p-6 rounded-full bg-[rgba(75,79,70,0.9)] fixed left-1/2 -translate-x-1/2  py-2 shadow-2xl ">
            <ul className="flex items-center justify-center gap-y-1 font-medium text-gray-300 gap-3">
              {links.map((link) => (
                <Link key={link.name} href={link.hash}>
                  <motion.div
                    animate={{ scale: 1.1 }}
                    whileHover={{ scale: 1.2 }}
                    className={cn(
                      "flex  w-full items-center justify-center px-4 py-1 m-1 hover:text-white  transition ",
                      {
                        " bg-[rgba(133,135,122,0.9)] rounded-full text-white ":
                          currentPathWithoutSlash === link.hash,
                      }
                    )}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className=" fixed bottom-5 right-5 lg:static"
        >
          <ThemeSwitch />
        </motion.div> */}{" "}
        {/* TODO: uncomment this line to enable the theme switcher */}
        {/* small screens */}
        <div
          onClick={handleSmalerScreensNavigation}
          className="flex md:hidden text-primary  rounded-full "
        >
          {menuIcon ? (
            <AiOutlineClose size={25} />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </div>
        {/** small screens menu */}
        <div
          className={
            menuIcon
              ? "md:hidden absolute top-24 right-0 bottom-0 left-0 flex justify-center  w-full h-screen bg-gray-50   ease-in duration-300"
              : "md:hidden absolute top-24 right-0 left-[-100%] flex justify-center   w-full h-screen bg-gray-50 ease-out duration-300 opacity-0"
          }
        >
          <div>
            <ul className="flex flex-col items-center mt-20 justify-center gap-y-1 text-2xl font-medium text-gray-300">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.hash}
                  onClick={handleSmalerScreensNavigation}
                >
                  <div
                    className={cn(
                      "flex  w-full items-center justify-center px-4 py-1 m-1 hover:text-white  transition ",
                      {
                        " bg-[rgba(133,135,122,1)] rounded-full text-white ":
                          currentPathWithoutSlash === link.hash,
                      }
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="  fixed bottom-5 right-5 md:bottom-7 md:right-10"
      >
        <WhatsappLink />
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
