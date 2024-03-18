import Image from "next/image";
import Link from "next/link";
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { LuInstagram } from "react-icons/lu";

export const ContactMe = () => {
  return (
    <div className="  flex flex-col lg:pr-20">
      <h1 className=" font-vollkorn text-4xl md:text-6xl ">Contáctame</h1>
      <p className=" font-vollkorn italic text-lg   mt-2 mb-7">
        &quot;Si estás interesado en mis servicios de avaluador o tienes alguna
        pregunta, no dudes en ponerte en contacto conmigo. Estoy aquí para
        ayudarte a encontrar soluciones adecuadas para tus necesidades de
        valoración.&quot;
      </p>

      <Link href="tel:+573164156157" target="_blank" className="flex mt-2 ">
        <MdLocalPhone size="25" />
        <h4 className="ml-2  text-base sm:text-lg font-workSans">
          +57 3164156157
        </h4>
      </Link>

      <Link
        href="mailto:juancarlos@juancarlosavaluos.com"
        target="_blank"
        className="flex mt-2"
      >
        <MdOutlineEmail size="25" />
        <h4 className="ml-2 font-workSans text-base sm:text-lg">
          juancarlos@juancarlosavaluos.com
        </h4>
      </Link>

      <Link
        href="https://www.instagram.com/juancarlosavaluos/"
        target="_blank"
        className="flex mt-2"
      >
        <LuInstagram size="25" />
        <h4 className="ml-2  text-base font-workSans sm:text-lg">
          @juancarlosavaluos
        </h4>
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
