import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsappLink = () => {
  const href = `https://wa.me/573164156157?text=Hola%20Juan%20Carlos%20Echeverri,%20estoy%20interesado%20en%20un%20avalúo%20inmobiliario.`;

  return (
    <Link
      target="_blank"
      aria-label="whatsapp link"
      href={href}
      className="w-[3rem] h-[3rem]  flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all "
    >
      <div className="text-5xl ">
        <FaWhatsapp color="green" />
      </div>
    </Link>
  );
};
