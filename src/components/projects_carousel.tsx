"use client";

import { Card, CardContent } from "./ui/card";
import { projects } from "../lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { BsArrowRight } from "react-icons/bs";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import ModalProject from "./modal_project";
import Gallery from "./gallery";

export const ProjectsCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full "
    >
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={index} className="  md:basis-1/2 lg:basis-1/2 ">
            <div className="p-1">
              <ModalProject project={project}>
                <Card className=" cursor-pointer">
                  <CardContent
                    className={`flex aspect-square items-center justify-center p-6  bg-cover bg-center bg-no-repeat relative group `}
                  >
                    <Image
                      src={project.images[0]}
                      className="absolute inset-0 object-cover w-full h-full rounded-lg"
                      fill
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l rounded-lg  from-[#424929] to-[#a8bc69]  opacity-0 group-hover:opacity-80 transition-all duration-700"></div>

                    <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-32 sm:group-hover:-translate-y-52 translate-all duration-300">
                      <div className=" font-vollkorn flex flex-col items-center gap-x-2 tracking-[0.1em] text-sm  sm:text-lg lg:text-xl xl:text-2xl font-extrabold text-white">
                        <h2 className="delay-100 ">{project.title}</h2>
                        <div className="flex items-center justify-center gap-2 translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                          <h2>Ver más</h2>
                          <BsArrowRight className=" text-xl md:text-3xl" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ModalProject>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className=" hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

// <CardContent
// className={`flex aspect-square items-center justify-center p-6 bg-[url(/${project.image})] bg-cover bg-center bg-no-repeat relative after:bg-gradient-to-br  after:h-full after:bottom-0 after:right-0 after:left-0 after:absolute after:from-transparent after:z-10 after:to-[rgba(0,0,0,0.8)] `}
// >
