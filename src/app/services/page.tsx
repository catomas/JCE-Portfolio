import { Metadata } from "next";
import { getServices } from "@/lib/data/services";
import { ServicesSection } from "@/components/services/services-section";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SectionEmptyState } from "@/components/ui/section-empty-state";

export const metadata: Metadata = {
  title: "Juan Carlos Echeverri Avalúos | Servicios",
  description: "Servicios de Juan Carlos Echeverri Avalúos",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <ErrorBoundary
      fallback={<SectionEmptyState message="Error cargando contenido" />}
    >
      <ServicesSection services={services} />
    </ErrorBoundary>
  );
}
