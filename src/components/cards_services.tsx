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
import Background from "./background";

export const CardsServices = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:mx-28">
      {services.map((service) => {
        return (
          <Card
            className="flex bg-transparent  shadow-lg   flex-col justify-between"
            key={service.title}
          >
            <CardHeader>
              <CardTitle className="pb-2">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center px-4  ">
                <Image
                  src={service.image}
                  width={250}
                  height={250}
                  alt={`${service.title} image`}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48L3N2Zz4="
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <DialogService service={service} />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
