import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { LuInstagram } from "react-icons/lu";

export const ContactMe = () => {
  return (
    <div className="  flex flex-col lg:pr-20">
      <h1 className=" font-vollkorn text-4xl md:text-6xl md:mx-auto">
        Contactame
      </h1>
      <h2 className="  font-vollkorn mt-4 text-xl md:text-2xl font-semibold">
        Trabajemos juntos
      </h2>
      <p className="  text-lg mt-4 mb-9">
        Si estás interesado en mis servicios de evaluación o tienes alguna
        pregunta, no dudes en ponerte en contacto conmigo. Estoy aquí para
        ayudarte a encontrar soluciones adecuadas para tus necesidades de
        valoración.
      </p>

      <Link href="tel:+573164156157" target="_blank" className="flex mt-2 ">
        <MdLocalPhone size="25" />
        <h4 className="ml-2  text-lg font-workSans">+57 3164156157</h4>
      </Link>

      <Link
        href="mailto:juancarlos@juancarlosavaluos.com"
        target="_blank"
        className="flex mt-2"
      >
        <MdOutlineEmail size="25" />
        <h4 className="ml-2 font-workSans text-lg   ">
          juancarlos@juancarlosavaluos.com
        </h4>
      </Link>

      <Link
        href="https://www.instagram.com/juancarlosavaluos/"
        target="_blank"
        className="flex mt-2"
      >
        <LuInstagram size="25" />

        <h4 className="ml-2  text-lg font-workSans">@juancarlosavaluos</h4>
      </Link>

      <Image
        src="/icons/phone.svg"
        alt="phone contact"
        width={500}
        height={500}
      />
    </div>
  );
};
