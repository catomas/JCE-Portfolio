import { Metadata } from "next";
import { getProjects, getProjectCategories } from "@/lib/data/projects";
import { ProjectsSection } from "@/components/projects/projects-section";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SectionEmptyState } from "@/components/ui/section-empty-state";

export const metadata: Metadata = {
  title: "Juan Carlos Echeverri Avalúos | Proyectos",
  description: "Proyectos realizados por Juan Carlos Echeverri F.",
};

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  return (
    <ErrorBoundary
      fallback={<SectionEmptyState message="Error cargando contenido" />}
    >
      <ProjectsSection initialProjects={projects} categories={categories} />
    </ErrorBoundary>
  );
}
