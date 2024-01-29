import Experience from "@/components/experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juan Carlos Echeverri Avalúos | Experiencia ",
  description: "Experiencia de Juan Carlos Echeverri Avalúos",
};

const ExperiencePage = () => {
  return (
    <div>
      <Experience />
    </div>
  );
};

export default ExperiencePage;
