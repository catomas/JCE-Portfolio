import { ProjectsCarousel } from "@/components/projects_carousel";
import { ProjectsCounter } from "@/components/projects_counter";

const ProjectsPage = () => {
  return (
    <div className="container flex flex-col justify-center items-center gap-12">
      <ProjectsCounter />
      <ProjectsCarousel />
    </div>
  );
};

export default ProjectsPage;
