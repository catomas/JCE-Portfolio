"use client";

import { links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [menuIcon, setMenuIcon] = useState(false);

  const handleSmalerScreensNavigation = () => {
    setMenuIcon(!menuIcon);
  };

  let currentPathWithoutSlash =
    pathname === "/" ? "/" : pathname.replace("/", "");

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      className=" p-6  rounded-full bg-[rgba(75,79,70,0.9)] fixed left-1/2 -translate-x-1/2 py-2 sm:top-[1.7rem]  shadow-2xl "
    >
      <ul className="flex  w-[22rem] flex-wrap items-center justify-center gap-y-1 font-medium text-gray-300   sm:w-[initial] sm:flex-nowrap sm:gap-5">
        {links.map((link) => (
          <Link key={link.name} href={link.hash}>
            <motion.div
              animate={{ scale: 1.1 }}
              whileHover={{ scale: 1.2 }}
              className={clsx(
                "flex  w-full items-center justify-center px-4 py-1 m-1 hover:text-white  transition    ",
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
    </motion.nav>
  );
};

export default Navbar;
