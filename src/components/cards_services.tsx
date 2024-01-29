import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Image from "next/image";

import { services } from "@/lib/data";
import DialogService from "./dialog_service";

export const CardsServices = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:mx-28">
      {services.map((service) => {
        return (
          <Card className="flex flex-col justify-between" key={service.title}>
            <CardHeader>
              <CardTitle className="pb-2">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center px-4">
                <Image
                  src={service.image}
                  width={300}
                  height={400}
                  alt={`${service.title} image`}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <DialogService />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
