import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjects, getProjectBySlug } from "@/lib/data/projects";
import { ProjectDetailContent } from "./project-detail-content";

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all project slugs (SSG).
 * Pre-renders all project detail pages at build time.
 */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/**
 * Generate SEO metadata for the project detail page.
 * Title contains the project title, description derived from project description.
 *
 * Validates: Requirements 6.5
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Juan Carlos Echeverri Avalúos",
    };
  }

  return {
    title: `${project.title} | Juan Carlos Echeverri Avalúos`,
    description: project.description.length > 160
      ? project.description.slice(0, 157) + "..."
      : project.description,
  };
}

/**
 * Project detail page that displays full project information including
 * title, description, location, category, gallery, and prev/next navigation.
 *
 * Uses generateStaticParams for SSG with all project slugs.
 * Returns notFound() if project is null.
 * Includes page transition animation (300-600ms) via client component.
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.6
 */
export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get all projects to determine prev/next navigation
  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <ProjectDetailContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
