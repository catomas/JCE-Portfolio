"use client";

import { Tab } from "@headlessui/react";

import Image from "next/image";
import GalleryTab from "./gallery_tab";

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images = [] }: GalleryProps) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6  w-full">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image}>
            <div className="aspect-square relative h-full w-full rounded-lg overflow-hidden">
              <Image
                className="object-cover object-center"
                src={image}
                alt="Image"
                fill
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
