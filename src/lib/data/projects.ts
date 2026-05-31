import { Project } from './types';
import { slugify } from '../utils';

/**
 * Static project data migrated from the original data.ts file.
 * Each project now includes slug, category, location, and date fields.
 */
const staticProjects: Project[] = [
  {
    slug: slugify('Fincas Ganaderas Cimitarra'),
    title: 'Fincas Ganaderas Cimitarra',
    description:
      'Hemos llevado a cabo avalúos de fincas ganaderas, casa fincas y lotes. Nuestros servicios de valoración abarcan diversos tipos de propiedades, proporcionando evaluaciones precisas que reflejan el valor actual del mercado en esta región',
    images: [
      '/images/cimitarra/img_1.jpg',
      '/images/cimitarra/img_2.jpg',
      '/images/cimitarra/img_3.jpg',
      '/images/cimitarra/img_4.jpg',
    ],
    category: 'Fincas',
    location: 'Cimitarra, Santander',
    date: '2023-06-15',
  },
  {
    slug: slugify('Cartagena'),
    title: 'Cartagena',
    description:
      'En Cartagena, realizamos la evaluación de bodegas, centros deportivos, lotes y mejoras, incluyendo instalaciones únicas como el Ecohotel Islas del Rosario. Además, ofrecemos servicios de fotografía aérea, capturando imágenes completas de instalaciones deportivas para proporcionar una visión precisa. Nuestro compromiso con la excelencia y la precisión en cada avalúo nos distingue en el mercado.',
    images: [
      '/images/cartagena/img_1.jpg',
      '/images/cartagena/img_2.jpg',
      '/images/cartagena/img_3.jpg',
      '/images/cartagena/img_4.jpg',
    ],
    category: 'Infraestructura',
    location: 'Cartagena, Bolívar',
    date: '2023-03-10',
  },
  {
    slug: slugify('Avalúo de Fincas de Recreo'),
    title: 'Avalúo de Fincas de Recreo',
    description:
      'Ofrecemos servicios de avalúo para fincas de recreo en diversas zonas del país. Nuestra experiencia en bienes raíces y tasación garantiza evaluaciones precisas y detalladas que reflejan el valor real de tu propiedad. Como valor añadido, ofrecemos fotografías de alta calidad, capturadas con tecnología de drones, para proporcionar una perspectiva completa y visualmente impactante de cada finca.',
    images: [
      '/images/recreo/img_1.jpg',
      '/images/recreo/img_2.jpg',
      '/images/recreo/img_3.jpg',
      '/images/recreo/img_4.jpg',
    ],
    category: 'Fincas',
    location: 'Antioquia',
    date: '2023-09-20',
  },
  {
    slug: slugify('Arboletes'),
    title: 'Arboletes',
    description:
      'Avalúos en el municipio de Arboletes para la Alcaldía, que abarcan servidumbres para el acueducto, la valoración de la fábrica de subproductos de coco, fincas ganaderas y avalúos de lotes destinados a la comunidad. Estos avalúos son fundamentales para la planificación y desarrollo estructurado de la región.',
    images: [
      '/images/arboletes/img_1.jpg',
      '/images/arboletes/img_2.jpg',
      '/images/arboletes/img_3.jpg',
      '/images/arboletes/img_4.jpg',
    ],
    category: 'Lotes',
    location: 'Arboletes, Antioquia',
    date: '2022-11-05',
  },
  {
    slug: slugify('San Andrés'),
    title: 'San Andrés',
    description:
      'En las hermosas Islas de San Andrés, ofrecemos servicios de avalúo para diversos tipos de propiedades. Nos especializamos en la valoración de lotes independientes, casas unifamiliares y, en circunstancias particulares, incluso realizamos avalúos de propiedades afectadas, como granjas avícolas en ruinas debido al impacto del huracán IOTA.',
    images: [
      '/images/san_andres/img_1.jpg',
      '/images/san_andres/img_2.jpg',
      '/images/san_andres/img_3.jpg',
      '/images/san_andres/img_4.jpg',
    ],
    category: 'Lotes',
    location: 'San Andrés Islas',
    date: '2022-08-18',
  },
  {
    slug: slugify('Coveñas'),
    title: 'Coveñas',
    description:
      'En el Municipio de Coveñas, realizamos evaluaciones de diversas propiedades, como cabañas, lotes y el Hotel Bahía Blanca. Destacamos nuestro servicio con hermosas fotografías aéreas, capturadas por drones, que proporcionan una visión completa y detallada, permitiendo apreciar también la belleza del Golfo de Morrosquillo.',
    images: [
      '/images/coveñas/img_1.jpg',
      '/images/coveñas/img_2.jpg',
      '/images/coveñas/img_3.jpg',
      '/images/coveñas/img_4.jpg',
    ],
    category: 'Hoteles',
    location: 'Coveñas, Sucre',
    date: '2023-01-22',
  },
  {
    slug: slugify('Hotel Click Clack'),
    title: 'Hotel Click Clack',
    description:
      'Avalúo del Hotel Click Clak, una destacada joya inmobiliaria en la ciudad de Medellín. Este proceso abarcó una evaluación detallada tanto de la construcción como del lote. El enfoque durante el avalúo se fundamenta en la dedicación a la precisión y la aplicación de mi sólida experiencia en el mercado inmobiliario. Cada elemento, desde los detalles arquitectónicos de la construcción hasta las características del lote, ha sido minuciosamente considerado para garantizar una valoración precisa y fundamentada.',
    images: [
      '/images/click_clack/img_1.jpg',
      '/images/click_clack/img_2.jpg',
      '/images/click_clack/img_3.jpg',
      '/images/click_clack/img_4.jpg',
    ],
    category: 'Hoteles',
    location: 'Medellín, Antioquia',
    date: '2024-02-10',
  },
  {
    slug: slugify('Infraestructura con la Gobernación'),
    title: 'Infraestructura con la Gobernación',
    description:
      'Formamos parte del equipo encargado de realizar los avalúos de diversas vías, entre las que se incluyen Angelópolis-Amagá, Barbosa-Concepción, Alejandría-Concepción, Fredonia-Puente Iglesias, Jericó-Puente Iglesias, y Valparaíso-La Pintada. En este proceso, se evaluó la capa de rodadura, las alcantarillas, los puentes, los muros y los box coulvert. Nuestra contribución consistió en analizar y valorar la infraestructura existente, proporcionando datos precisos y detallados que respaldan la toma de decisiones en el ámbito de la planificación y mantenimiento de estas importantes vías de comunicación.',
    images: [
      '/images/gobernacion/img_1.jpg',
      '/images/gobernacion/img_2.jpg',
      '/images/gobernacion/img_3.jpg',
      '/images/gobernacion/img_4.jpg',
    ],
    category: 'Infraestructura',
    location: 'Antioquia',
    date: '2023-11-30',
  },
  {
    slug: slugify('Avalúo de Maquinaria Pesada'),
    title: 'Avalúo de Maquinaria Pesada',
    description:
      'Realizamos avalúos precisos de maquinaria pesada, considerando factores clave como antigüedad, mantenimiento y horas de operación. Ya sea para compra, venta o gestión de activos, proporcionamos información confiable',
    images: [
      '/images/maquinaria/img_1.jpg',
      '/images/maquinaria/img_2.jpg',
      '/images/maquinaria/img_3.jpg',
      '/images/maquinaria/img_4.jpg',
    ],
    category: 'Maquinaria',
    location: 'Medellín, Antioquia',
    date: '2024-01-08',
  },
  {
    slug: slugify('Avalúos de cultivos en Palmira'),
    title: 'Avalúos de cultivos en Palmira',
    description:
      'Se llevaron a cabo avalúos en cultivos de caña y fincas agropecuarias, abordando la valoración de tierras e instalaciones asociadas. Los servicios fueron complementados con la captura de fotos aéreas y la producción de un video promocional. El compromiso es ofrecer evaluaciones integrales y soluciones visuales personalizadas para resaltar las características únicas de cada propiedad.',
    images: [
      '/images/palmira/img_1.jpg',
      '/images/palmira/img_2.jpg',
      '/images/palmira/img_3.jpg',
      '/images/palmira/img_4.jpg',
    ],
    category: 'Cultivos',
    location: 'Palmira, Valle del Cauca',
    date: '2023-04-12',
  },
  {
    slug: slugify('Hotel Colonial Santafe de Antioquia'),
    title: 'Hotel Colonial Santafe de Antioquia',
    description:
      'En el destacado municipio turístico de Santa Fe de Antioquia, se han realizado diversos avalúos que abarcan desde lotes independientes y parcelaciones hasta casas, incluyendo aquellas con valor patrimonial. Además, se han llevado a cabo avalúos de fincas ganaderas, fincas de recreo y un Hotel Patrimonial ubicado a solo una cuadra del parque central. El enfoque de estos avalúos se centra en proporcionar evaluaciones precisas que reflejen la singularidad y relevancia de cada tipo de propiedad en este entorno turístico tan especial.',
    images: [
      '/images/colonial/img_1.jpg',
      '/images/colonial/img_2.jpg',
      '/images/colonial/img_3.jpg',
      '/images/colonial/img_4.jpg',
    ],
    category: 'Hoteles',
    location: 'Santa Fe de Antioquia, Antioquia',
    date: '2022-12-01',
  },
];

/**
 * Returns all projects from the static data source.
 * This function can be swapped to read from a CMS/database in the future.
 */
export async function getProjects(): Promise<Project[]> {
  return staticProjects;
}

/**
 * Finds a project by its URL-friendly slug.
 * Returns null if no project matches the given slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/**
 * Extracts unique, non-empty category values from all projects.
 * Used to generate filter options in the UI.
 */
export async function getProjectCategories(): Promise<string[]> {
  const projects = await getProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  return categories;
}
