import { CardsServices } from "@/components/cards_services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juan Carlos Echeverri Avalúos | Servicios ",
  description: "Servicios de Juan Carlos Echeverri Avalúos",
};

const ServicesPage = () => {
  return <CardsServices />;
};

export default ServicesPage;
