import { ProjectsCarousel } from "@/components/projects_carousel";
import { ProjectsCounter } from "@/components/projects_counter";

export const metadata = {
  title: "Juan Carlos Echeverri Avalúos | Proyectos ",
  description: "Proyectos realizados por Juan Carlos Echeverri F.",
};

const ProjectsPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-12">
      <ProjectsCounter />
      <ProjectsCarousel />
    </div>
  );
};

export default ProjectsPage;
