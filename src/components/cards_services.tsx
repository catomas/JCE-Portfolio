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

const services = [
  {
    title: "Avalúos",
    description:
      "Avalúos urbanos y rurales. Avalúos comerciales, catastrales, de garantía, de rentas, de maquinaria y equipos, de obras de arte, de vehículos, entre otros.",
  },
  {
    title: "Asesorías Inmobiliarias",
    description:
      "Asesorías en compra, venta y arriendo de inmuebles. Asesorías en procesos de licitación y contratación de obras civiles.",
  },
  {
    title: "Toma de Fotos & Videos Aéreos",
    description:
      "Consultorías en proyectos de inversión. Consultorías en proyectos de construcción.",
  },
];

export const CardsServices = () => {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {services.map((service) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="px-4">
                <Image
                  src="icons/drone_v1.svg"
                  width={1200}
                  height={550}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  alt=""
                />
              </div>
            </CardContent>
            <CardFooter>
              <p>Saber más</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
