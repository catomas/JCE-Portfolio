"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { PiTree } from "react-icons/pi";
import {
  GiDeliveryDrone,
  GiGrain,
  GiPlantsAndAnimals,
  GiTreeRoots,
} from "react-icons/gi";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { IoEarth, IoStar } from "react-icons/io5";
import { TbDrone } from "react-icons/tb";
import { FaEnvira, FaStreetView } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";

import "react-vertical-timeline-component/style.min.css";

import React from "react";
import { BsPersonWorkspace } from "react-icons/bs";

const experiencesData = [
  {
    title: "Zooctenista",
    location: "Universidad Nacional - Medellin",
    date: "1989 - 1994",
    icon: <GiPlantsAndAnimals />,
    description:
      "Estudié la producción animal, lo cual me ayudó en la valoración de semovientes y animales, así como en la construcción de instalaciones para la producción animal.",
    category: "Educación",
  },
  {
    title: "Gerencia de Mercadeo - Director de Marketing",
    location:
      "Institución Universitaria SEIPA - Medellin \n  Escuela Adminstración de Empresas - Barcelona, España",
    date: "1999 - 2000",
    icon: <RiShoppingBasket2Line />,
    description:
      "Desarrollé habilidades de liderazgo y estrategias de marketing. Enfoque en análisis de mercado y toma de decisiones estratégicas.",
    category: "Educación",
  },
  {
    title: "Google Earth & Google Maps para Inmobiliarios",
    location: "Lonja de Propiedad Raiz - Medellin",
    date: "2009",
    icon: <IoEarth />,
    description:
      "Participé en el curso de Google Earth y Google Maps para profesionales. Adquirí habilidades para utilizar estas herramientas en la ubicación y visualización de inmuebles, facilitando la valoración y análisis de propiedades.",
    category: "Educación",
  },
  {
    title: "Formación para Avaluadores",
    location: "Lonja de Propiedad Raiz - Medellin",
    date: "2013",
    icon: <GiTreeRoots />,
    description:
      "Completé con éxito el Programa de Formación para Avaluadores en la Lonja de Propiedad Raíz de Medellín. Este programa proporcionó un conocimiento integral para la realización de avalúos urbanos y rurales, abarcando propiedades como casas, apartamentos, lotes, locales comerciales, bodegas, oficinas, fincas, entre otros. Adquirí habilidades especializadas para evaluar y valorar una amplia gama de activos inmobiliarios.",
    category: "Educación",
  },
  {
    title: "Certificación como Avaluador",
    location: "Registro Abierto de Avaluadores - Bogota",
    date: "2013",
    icon: <IoStar color="#fbfb36" />,
    description:
      "Obtuve la Certificación como Avaluador (Aval 71678399). Esta certificación me habilita para realizar avalúos en Colombia, abarcando diversas categorías como urbanos y rurales, así como propiedades de diferentes tipos, desde viviendas y locales comerciales hasta terrenos y fincas. Esta certificación respalda mi capacidad para realizar evaluaciones precisas y detalladas de una amplia variedad de activos.",
    category: "Certificación",
  },
  {
    title: "Autorregulador Nacional de Avaluadores - A.N.A",
    location: "A.N.A - Bogota",
    date: "2013",
    icon: <IoStar color="#fbfb36" />,
    description:
      "Me registré en el Autorregulador Nacional de Avaluadores (A.N.A). Esta entidad tiene la responsabilidad de llevar el control disciplinario de los avaluadores, asegurando altos estándares éticos y profesionales en la práctica de la valuación. Mi membresía en A.N.A refleja mi compromiso con la integridad y la calidad en el ejercicio de la profesión de avaluador.",
    category: "Certificación",
  },
  {
    title: "Piloto Operaciones RPAS - Drones",
    location: "Instituto Educativo Aeronautico de Colombia S.A.S",
    date: "2017",
    icon: <TbDrone />,
    description:
      "Obtuve la certificación como Piloto de Operaciones con RPAS. Esta formación me permitió adquirir habilidades especializadas en la operación segura y eficiente de drones, particularmente para la toma de fotografías y videos aéreos. Esta capacitación amplió mis capacidades para ofrecer servicios de valoración inmobiliaria y otros trabajos aéreos.",
    category: "Educación",
  },
  {
    title: "Tecnico Laboral por Competencias",
    location: "Compuestudio",
    date: "2020",
    icon: <FaEnvira />,
    description:
      "Esta formación me proporcionó las habilidades y conocimientos necesarios para llevar a cabo avalúos de bienes ambientales y recursos naturales. Como técnico, estoy capacitado para evaluar de manera integral los activos ambientales y naturales, contribuyendo a una valoración precisa y sostenible.",
    category: "Educación",
  },
  {
    title: "Avaluo de Bienes Inmbuebles & Muebles",
    location: "Compuestudio",
    date: "2020",
    icon: <PiTree />,
    description:
      "Formación para avaluar de manera precisa bienes inmuebles y muebles. Adquirí habilidades para evaluar propiedades urbanas y rurales, contribuyendo a una valoración detallada y precisa.",
    category: "Educación",
  },
  {
    title: "Avaluo de Empresas e Intangibles",
    location: "Compuestudio",
    date: "2020",
    icon: <MdOutlineHomeWork />,
    description:
      "Adquirí habilidades para evaluar con precisión el valor de empresas y activos intangibles. Estoy preparado para realizar avalúos detallados que contribuyan a una valoración integral en el ámbito empresarial.",
    category: "Educación",
  },
  {
    title: "Auxiliar de Avaluos Perito de Propiedad Raiz",
    location: "Insituto Politecnico Internacional",
    date: "2021",
    icon: <FaStreetView />,
    description:
      "Esta formación me proporcionó conocimientos especializados para realizar avalúos en el campo de la propiedad raíz. Estoy capacitado para llevar a cabo evaluaciones precisas y detalladas en diversas categorías de avalúo.",
    category: "Educación",
  },
  {
    title: "Avaluador Independiente",
    location: "Independiente",
    date: "2007 - Actualidad",
    icon: <BsPersonWorkspace />,
    description:
      "Desde 2007, me desempeño como Avaluador Independiente. Cuento con certificación en las 13 categorías de avalúo, lo que me habilita para evaluar una amplia variedad de activos. Mi enfoque se centra en proporcionar valoraciones precisas y detalladas, contribuyendo a la toma de decisiones informada en el ámbito inmobiliario y empresarial.",
    category: "Trabajo",
  },
];

export default function Experience() {
  return (
    <VerticalTimeline lineColor="#e5e7eb">
      {experiencesData.map((item, index) => (
        <VerticalTimelineElement
          key={index}
          visible={true}
          contentStyle={{
            background: "#f3f4f6",
            boxShadow: "none",
            border:
              item.category === "Certificación"
                ? "3px solid rgba(117, 131, 73, 0.3)"
                : "1px solid rgba(152, 50, 50, 0.05)",
            textAlign: "left",
            padding: "1.3rem 2rem",
          }}
          date={item.date}
          icon={item.icon}
          iconStyle={{
            background: item.category === "Certificación" ? "#c2d979" : "white",
            fontSize: "1.5rem",
          }}
          contentArrowStyle={{
            borderRight: "0.4rem solid #9ca3af",
          }}
        >
          <div className="flex justify-between ">
            <h3 className="font-semibold  md:text-lg  lg:text-xl ">
              {item.title}
            </h3>
            <div className="hidden sm:block  ml-3 mb-3">
              {item.category === "Educación" && (
                <span className=" h-8 text-xs text-white bg-primary p-2   rounded-xl">
                  {item.category}
                </span>
              )}

              {item.category === "Trabajo" && (
                <span className=" h-8 text-xs text-white  bg-[#dba913] p-2 rounded-xl">
                  {item.category}
                </span>
              )}

              {item.category === "Certificación" && (
                <span className=" h-8 text-xs text-gray-700 bg-primary100 p-2 rounded-xl">
                  {item.category}
                </span>
              )}
            </div>
          </div>
          <p className="!font-normal !my-2 whitespace-pre-line">
            {item.location}
          </p>
          <p className="!mt-1 !font-normal text-gray-700 italic ">
            &quot;{item.description}&quot;
          </p>

          <div className=" sm:hidden absolute bottom-4 right-2 my-2">
            {item.category === "Educación" && (
              <span className=" h-8 text-xs text-white bg-primary p-2   rounded-xl">
                {item.category}
              </span>
            )}

            {item.category === "Trabajo" && (
              <span className=" h-8 text-xs text-white  bg-[#dba913] p-2 rounded-xl">
                {item.category}
              </span>
            )}

            {item.category === "Certificación" && (
              <span className=" h-8 text-xs text-gray-700 bg-primary100 p-2 rounded-xl">
                {item.category}
              </span>
            )}
          </div>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
