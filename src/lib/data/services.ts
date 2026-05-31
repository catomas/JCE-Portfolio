import { Service } from "./types";

/**
 * Static service data migrated from src/lib/data.ts
 * Each service has a unique accentColor per Requirement 1.5
 */
const staticServices: Service[] = [
  {
    title: "Avalúos",
    description:
      "Realizamos avalúos comerciales tanto en áreas urbanas como rurales en todo el país.",
    icon: "/icons/house_rent.svg",
    accentColor: "#4A7C59",
    details: `Ofrecemos servicios de avalúo en todas las categorías, cada una diseñada para abarcar un espectro específico de activos y propiedades. Estas categorías incluyen:

1. Inmuebles Urbanos
2. Inmuebles Rurales
3. Recursos Naturales y Suelos de Protección
4. Obras de Infraestructura
5. Edificaciones de Conservación Arqueológica y Monumentos Históricos
6. Inmuebles Especiales
7. Maquinaria Fija, Equipos y Maquinaria Móvil
8. Maquinaria y Equipos Especiales
9. Obras de Arte, Orfebrería, Patrimoniales y Similares
10. Semovientes y Animales
11. Activos Operacionales y Establecimientos de Comercio
12. Intangibles
13. Intangibles Especiales`,
  },
  {
    title: "Asesorías Inmobiliarias",
    description:
      "Acompañamos al cliente en todo el proceso de compra o venta de inmuebles, incluyendo transacciones y escrituración. También nos encargamos de captar nuevos inmuebles, buscar clientes y negociar.",
    icon: "/icons/house.svg",
    accentColor: "#2563EB",
    details:
      "En nuestro servicio de asesoría inmobiliaria, no solo facilitamos la compra o venta de inmuebles, sino que también acompañamos al cliente en cada paso del proceso. Desde la búsqueda y captación de propiedades hasta la negociación y escrituración. Además, nos dedicamos activamente a la captación de nuevos inmuebles para la venta y la atracción de posibles clientes. Nuestra meta es asegurar transacciones exitosas y satisfactorias para todas las partes involucradas.",
  },
  {
    title: "Toma de Fotos & Videos Aéreos",
    description:
      "Realizamos tomas aéreas (fotos y videos) de lotes, fincas, casas y fachadas utilizando drones. Contamos con 7 años de experiencia en el uso de esta tecnología.",
    icon: "/icons/drone_v1.svg",
    accentColor: "#D97706",
    details:
      "Nos especializamos en la captura de imágenes aéreas, tanto en fotografía como en video, para una variedad de propiedades, incluyendo lotes, fincas, casas y fachadas. Utilizamos drones de última generación para obtener vistas impresionantes y detalladas desde el cielo. Con más de 7 años de experiencia en el uso de esta tecnología, garantizamos resultados de alta calidad y precisión en cada proyecto.",
  },
  {
    title: "Estudios Topograficos, Ortofotos y Alinderamientos",
    description:
      "Realizamos levantamientos topográficos y revisamos linderos de propiedades basándonos en escrituras y planos catastrales. También ofrecemos ortofotografías.",
    icon: "/icons/topo.svg",
    accentColor: "#7C3AED",
    details:
      "Nos especializamos en levantamientos topográficos completos, que incluyen la generación de planos detallados, curvas de nivel y la verificación de linderos de propiedades utilizando escrituras, planos catastrales y levantamientos planimétricos. Además, ofrecemos servicios de ortofotografía para proporcionar representaciones fotográficas georreferenciadas del terreno, asegurando precisión y detalle en cada proyecto.",
  },
];

/**
 * Retrieves all services from the data source.
 * Currently reads from static data; can be swapped to Prisma/CMS in the future
 * without modifying consuming components.
 *
 * @returns Promise<Service[]> Array of all available services
 */
export async function getServices(): Promise<Service[]> {
  return staticServices;
}
