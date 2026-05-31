import { PrismaClient, ExperienceCategory, ContentStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Helper: Generate slug from title ────────────────────────────────────────
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Helper: Parse date string to sortDate ───────────────────────────────────
function parseSortDate(dateStr: string): Date {
  // Handle ranges like "2007 - Actualidad" or "1989 - 1994"
  const parts = dateStr.split("-").map((s) => s.trim());
  const lastPart = parts.at(-1) ?? "";

  if (lastPart.toLowerCase() === "actualidad") {
    return new Date();
  }

  // If it's just a year like "2013" or "2020"
  const year = Number.parseInt(lastPart, 10);
  if (!Number.isNaN(year)) {
    return new Date(year, 0, 1);
  }

  return new Date();
}

// ─── Helper: Map category string to enum ─────────────────────────────────────
function mapCategory(category: string): ExperienceCategory {
  switch (category) {
    case "Educación":
      return ExperienceCategory.EDUCACION;
    case "Certificación":
      return ExperienceCategory.CERTIFICACION;
    case "Trabajo":
      return ExperienceCategory.TRABAJO;
    default:
      return ExperienceCategory.EDUCACION;
  }
}

// ─── Profile Data ────────────────────────────────────────────────────────────
const profileData = {
  fullName: "Juan Carlos Echeverri",
  professionalTitle: "Avaluador Profesional Certificado",
  biography:
    "Avaluador profesional con más de 18 años de experiencia en valoración de bienes inmuebles, muebles, maquinaria y activos empresariales. Certificado en las 13 categorías de avalúo por el Registro Abierto de Avaluadores. Zootecnista de la Universidad Nacional de Colombia con especialización en Gerencia de Mercadeo.",
  email: "info@juancarlosavaluos.com",
  phone: "+573001234567",
  address: "Medellín, Colombia",
  whatsappNumber: "+573001234567",
};

// ─── Services Data ───────────────────────────────────────────────────────────
const servicesData = [
  {
    title: "Avalúos",
    shortDescription:
      "Realizamos avalúos comerciales tanto en áreas urbanas como rurales en todo el país.",
    detailedDescription: `Ofrecemos servicios de avalúo en todas las categorías, cada una diseñada para abarcar un espectro específico de activos y propiedades. Estas categorías incluyen:

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
    iconSvg: "/icons/house_rent.svg",
    order: 0,
  },
  {
    title: "Asesorías Inmobiliarias",
    shortDescription:
      "Acompañamos al cliente en todo el proceso de compra o venta de inmuebles, incluyendo transacciones y escrituración.",
    detailedDescription:
      "En nuestro servicio de asesoría inmobiliaria, no solo facilitamos la compra o venta de inmuebles, sino que también acompañamos al cliente en cada paso del proceso. Desde la búsqueda y captación de propiedades hasta la negociación y escrituración. Además, nos dedicamos activamente a la captación de nuevos inmuebles para la venta y la atracción de posibles clientes. Nuestra meta es asegurar transacciones exitosas y satisfactorias para todas las partes involucradas.",
    iconSvg: "/icons/house.svg",
    order: 1,
  },
  {
    title: "Toma de Fotos & Videos Aéreos",
    shortDescription:
      "Realizamos tomas aéreas (fotos y videos) de lotes, fincas, casas y fachadas utilizando drones.",
    detailedDescription:
      "Nos especializamos en la captura de imágenes aéreas, tanto en fotografía como en video, para una variedad de propiedades, incluyendo lotes, fincas, casas y fachadas. Utilizamos drones de última generación para obtener vistas impresionantes y detalladas desde el cielo. Con más de 7 años de experiencia en el uso de esta tecnología, garantizamos resultados de alta calidad y precisión en cada proyecto.",
    iconSvg: "/icons/drone_v1.svg",
    order: 2,
  },
  {
    title: "Estudios Topograficos, Ortofotos y Alinderamientos",
    shortDescription:
      "Realizamos levantamientos topográficos y revisamos linderos de propiedades basándonos en escrituras y planos catastrales.",
    detailedDescription:
      "Nos especializamos en levantamientos topográficos completos, que incluyen la generación de planos detallados, curvas de nivel y la verificación de linderos de propiedades utilizando escrituras, planos catastrales y levantamientos planimétricos. Además, ofrecemos servicios de ortofotografía para proporcionar representaciones fotográficas georreferenciadas del terreno, asegurando precisión y detalle en cada proyecto.",
    iconSvg: "/icons/topo.svg",
    order: 3,
  },
];

// ─── Projects Data ───────────────────────────────────────────────────────────
const projectsData = [
  {
    title: "Fincas Ganaderas Cimitarra",
    description:
      "Hemos llevado a cabo avalúos de fincas ganaderas, casa fincas y lotes. Nuestros servicios de valoración abarcan diversos tipos de propiedades, proporcionando evaluaciones precisas que reflejan el valor actual del mercado en esta región",
    images: [
      "/images/cimitarra/img_1.jpg",
      "/images/cimitarra/img_2.jpg",
      "/images/cimitarra/img_3.jpg",
      "/images/cimitarra/img_4.jpg",
    ],
    order: 0,
  },
  {
    title: "Cartagena",
    description:
      "En Cartagena, realizamos la evaluación de bodegas, centros deportivos, lotes y mejoras, incluyendo instalaciones únicas como el Ecohotel Islas del Rosario. Además, ofrecemos servicios de fotografía aérea, capturando imágenes completas de instalaciones deportivas para proporcionar una visión precisa.",
    images: [
      "/images/cartagena/img_1.jpg",
      "/images/cartagena/img_2.jpg",
      "/images/cartagena/img_3.jpg",
      "/images/cartagena/img_4.jpg",
    ],
    order: 1,
  },
  {
    title: "Avalúo de Fincas de Recreo",
    description:
      "Ofrecemos servicios de avalúo para fincas de recreo en diversas zonas del país. Nuestra experiencia en bienes raíces y tasación garantiza evaluaciones precisas y detalladas que reflejan el valor real de tu propiedad.",
    images: [
      "/images/recreo/img_1.jpg",
      "/images/recreo/img_2.jpg",
      "/images/recreo/img_3.jpg",
      "/images/recreo/img_4.jpg",
    ],
    order: 2,
  },
  {
    title: "Arboletes",
    description:
      "Avalúos en el municipio de Arboletes para la Alcaldía, que abarcan servidumbres para el acueducto, la valoración de la fábrica de subproductos de coco, fincas ganaderas y avalúos de lotes destinados a la comunidad.",
    images: [
      "/images/arboletes/img_1.jpg",
      "/images/arboletes/img_2.jpg",
      "/images/arboletes/img_3.jpg",
      "/images/arboletes/img_4.jpg",
    ],
    order: 3,
  },
  {
    title: "San Andrés",
    description:
      "En las hermosas Islas de San Andrés, ofrecemos servicios de avalúo para diversos tipos de propiedades. Nos especializamos en la valoración de lotes independientes, casas unifamiliares y propiedades afectadas por el huracán IOTA.",
    images: [
      "/images/san_andres/img_1.jpg",
      "/images/san_andres/img_2.jpg",
      "/images/san_andres/img_3.jpg",
      "/images/san_andres/img_4.jpg",
    ],
    order: 4,
  },
  {
    title: "Coveñas",
    description:
      "En el Municipio de Coveñas, realizamos evaluaciones de diversas propiedades, como cabañas, lotes y el Hotel Bahía Blanca. Destacamos nuestro servicio con hermosas fotografías aéreas capturadas por drones.",
    images: [
      "/images/coveñas/img_1.jpg",
      "/images/coveñas/img_2.jpg",
      "/images/coveñas/img_3.jpg",
      "/images/coveñas/img_4.jpg",
    ],
    order: 5,
  },
  {
    title: "Hotel Click Clack",
    description:
      "Avalúo del Hotel Click Clak, una destacada joya inmobiliaria en la ciudad de Medellín. Este proceso abarcó una evaluación detallada tanto de la construcción como del lote.",
    images: [
      "/images/click_clack/img_1.jpg",
      "/images/click_clack/img_2.jpg",
      "/images/click_clack/img_3.jpg",
      "/images/click_clack/img_4.jpg",
    ],
    order: 6,
  },
  {
    title: "Infraestructura con la Gobernación",
    description:
      "Formamos parte del equipo encargado de realizar los avalúos de diversas vías, incluyendo Angelópolis-Amagá, Barbosa-Concepción, Alejandría-Concepción, Fredonia-Puente Iglesias, Jericó-Puente Iglesias, y Valparaíso-La Pintada.",
    images: [
      "/images/gobernacion/img_1.jpg",
      "/images/gobernacion/img_2.jpg",
      "/images/gobernacion/img_3.jpg",
      "/images/gobernacion/img_4.jpg",
    ],
    order: 7,
  },
  {
    title: "Avalúo de Maquinaria Pesada",
    description:
      "Realizamos avalúos precisos de maquinaria pesada, considerando factores clave como antigüedad, mantenimiento y horas de operación. Ya sea para compra, venta o gestión de activos, proporcionamos información confiable.",
    images: [
      "/images/maquinaria/img_1.jpg",
      "/images/maquinaria/img_2.jpg",
      "/images/maquinaria/img_3.jpg",
      "/images/maquinaria/img_4.jpg",
    ],
    order: 8,
  },
  {
    title: "Avalúos de cultivos en Palmira",
    description:
      "Se llevaron a cabo avalúos en cultivos de caña y fincas agropecuarias, abordando la valoración de tierras e instalaciones asociadas. Los servicios fueron complementados con la captura de fotos aéreas.",
    images: [
      "/images/palmira/img_1.jpg",
      "/images/palmira/img_2.jpg",
      "/images/palmira/img_3.jpg",
      "/images/palmira/img_4.jpg",
    ],
    order: 9,
  },
  {
    title: "Hotel Colonial Santafe de Antioquia",
    description:
      "En el destacado municipio turístico de Santa Fe de Antioquia, se han realizado diversos avalúos que abarcan desde lotes independientes y parcelaciones hasta casas, incluyendo aquellas con valor patrimonial.",
    images: [
      "/images/colonial/img_1.jpg",
      "/images/colonial/img_2.jpg",
      "/images/colonial/img_3.jpg",
      "/images/colonial/img_4.jpg",
    ],
    order: 10,
  },
];

// ─── Experience Data ─────────────────────────────────────────────────────────
const experienceData = [
  {
    title: "Zooctenista",
    location: "Universidad Nacional - Medellin",
    date: "1989 - 1994",
    description:
      "Estudié la producción animal, lo cual me ayuda en la valoración tanto de semovientes y animales, como de las construcciones rurales y sus instalaciones para la producción animal.",
    category: "Educación" as const,
  },
  {
    title: "Gerencia de Mercadeo - Director de Marketing",
    location:
      "Institución Universitaria CEIPA - Medellin / Escuela Administración de Empresas - Barcelona, España",
    date: "1999 - 2000",
    description:
      "Desarrollé habilidades de liderazgo y estrategias de marketing. Enfoque en análisis de mercado y toma de decisiones estratégicas.",
    category: "Educación" as const,
  },
  {
    title: "Google Earth & Google Maps para Inmobiliarios",
    location: "Lonja de Propiedad Raiz - Medellin",
    date: "2009",
    description:
      "Participé en el curso de Google Earth y Google Maps para profesionales. Adquirí habilidades para utilizar estas herramientas en la ubicación y visualización de inmuebles.",
    category: "Educación" as const,
  },
  {
    title: "Formación para Avaluadores",
    location: "Lonja de Propiedad Raiz - Medellin",
    date: "2013",
    description:
      "Completé con éxito el Programa de Formación para Avaluadores en la Lonja de Propiedad Raíz de Medellín. Conocimiento integral para la realización de avalúos urbanos y rurales.",
    category: "Educación" as const,
  },
  {
    title: "Certificación como Avaluador",
    location: "Registro Abierto de Avaluadores - Bogota",
    date: "2013",
    description:
      "Obtuve la Certificación como Avaluador (Aval 71678399). Esta certificación me habilita para realizar avalúos en Colombia, abarcando diversas categorías como urbanos y rurales.",
    category: "Certificación" as const,
  },
  {
    title: "Autorregulador Nacional de Avaluadores - A.N.A",
    location: "A.N.A - Bogota",
    date: "2013",
    description:
      "Me registré en el Autorregulador Nacional de Avaluadores (A.N.A). Esta entidad tiene la responsabilidad de llevar el control disciplinario de los avaluadores.",
    category: "Certificación" as const,
  },
  {
    title: "Piloto Operaciones RPAS - Drones",
    location: "Instituto Educativo Aeronautico de Colombia S.A.S",
    date: "2017",
    description:
      "Obtuve la certificación como Piloto de Operaciones con RPAS. Habilidades especializadas en la operación segura y eficiente de drones para fotografías y videos aéreos.",
    category: "Educación" as const,
  },
  {
    title: "Tecnico Laboral por Competencias",
    location: "Compuestudio",
    date: "2020",
    description:
      "Esta formación me proporcionó las habilidades y conocimientos necesarios para llevar a cabo avalúos de bienes ambientales y recursos naturales.",
    category: "Educación" as const,
  },
  {
    title: "Avaluo de Bienes Inmbuebles & Muebles",
    location: "Compuestudio",
    date: "2020",
    description:
      "Formación para avaluar de manera precisa bienes inmuebles y muebles. Adquirí habilidades para evaluar propiedades urbanas y rurales.",
    category: "Educación" as const,
  },
  {
    title: "Avaluo de Empresas e Intangibles",
    location: "Compuestudio",
    date: "2020",
    description:
      "Adquirí habilidades para evaluar con precisión el valor de empresas y activos intangibles. Preparado para realizar avalúos detallados en el ámbito empresarial.",
    category: "Educación" as const,
  },
  {
    title: "Auxiliar de Avaluos Perito de Propiedad Raiz",
    location: "Insituto Politecnico Internacional",
    date: "2021",
    description:
      "Esta formación me proporcionó conocimientos especializados para realizar avalúos en el campo de la propiedad raíz. Capacitado para evaluaciones precisas y detalladas.",
    category: "Educación" as const,
  },
  {
    title: "Avaluador Independiente",
    location: "Independiente",
    date: "2007 - Actualidad",
    description:
      "Desde 2007, me desempeño como Avaluador Independiente. Cuento con certificación en las 13 categorías de avalúo para evaluar una amplia variedad de activos.",
    category: "Trabajo" as const,
  },
];

// ─── Statistics Data ─────────────────────────────────────────────────────────
const statisticsData = [
  { value: 18, label: "Años de experiencia", order: 0 },
  { value: 900, label: "Clientes satisfechos", order: 1 },
  { value: 1200, label: "Avaluos completados", order: 2 },
  { value: 14, label: "Certificados y Estudios", order: 3 },
];

// ─── Main Seed Function ──────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Starting seed...");

  // ─── Seed Profile ────────────────────────────────────────────────────────
  console.log("  → Seeding profile...");
  const profile = await prisma.profile.upsert({
    where: { id: "profile-main" },
    update: {
      ...profileData,
    },
    create: {
      id: "profile-main",
      ...profileData,
    },
  });

  // Upsert social links for the profile
  const socialLinks = [
    { platform: "Instagram", url: "https://www.instagram.com/juancarlosavaluos/" },
    { platform: "Facebook", url: "https://www.facebook.com/juancarlosavaluos" },
  ];

  for (const link of socialLinks) {
    const linkId = `social-${link.platform.toLowerCase()}`;
    await prisma.socialLink.upsert({
      where: { id: linkId },
      update: {
        platform: link.platform,
        url: link.url,
        profileId: profile.id,
      },
      create: {
        id: linkId,
        platform: link.platform,
        url: link.url,
        profileId: profile.id,
      },
    });
  }

  // ─── Seed Services ───────────────────────────────────────────────────────
  console.log("  → Seeding services...");
  for (const service of servicesData) {
    const serviceId = `service-${generateSlug(service.title)}`;
    await prisma.service.upsert({
      where: { id: serviceId },
      update: {
        title: service.title,
        shortDescription: service.shortDescription,
        detailedDescription: service.detailedDescription,
        iconSvg: service.iconSvg,
        order: service.order,
      },
      create: {
        id: serviceId,
        title: service.title,
        shortDescription: service.shortDescription,
        detailedDescription: service.detailedDescription,
        iconSvg: service.iconSvg,
        order: service.order,
      },
    });
  }

  // ─── Seed Projects ───────────────────────────────────────────────────────
  console.log("  → Seeding projects...");
  for (const project of projectsData) {
    const slug = generateSlug(project.title);
    const projectId = `project-${slug}`;

    const upsertedProject = await prisma.project.upsert({
      where: { slug },
      update: {
        title: project.title,
        description: project.description,
        status: ContentStatus.PUBLISHED,
        order: project.order,
      },
      create: {
        id: projectId,
        title: project.title,
        slug,
        description: project.description,
        status: ContentStatus.PUBLISHED,
        order: project.order,
      },
    });

    // Upsert project images
    for (let i = 0; i < project.images.length; i++) {
      const imageId = `img-${slug}-${i}`;
      await prisma.projectImage.upsert({
        where: { id: imageId },
        update: {
          url: project.images[i],
          projectId: upsertedProject.id,
          order: i,
        },
        create: {
          id: imageId,
          url: project.images[i],
          projectId: upsertedProject.id,
          order: i,
        },
      });
    }
  }

  // ─── Seed Experience ─────────────────────────────────────────────────────
  console.log("  → Seeding experience...");
  for (const exp of experienceData) {
    const expId = `exp-${generateSlug(exp.title)}`;

    await prisma.experience.upsert({
      where: { id: expId },
      update: {
        title: exp.title,
        location: exp.location,
        date: exp.date,
        description: exp.description,
        category: mapCategory(exp.category),
        sortDate: parseSortDate(exp.date),
      },
      create: {
        id: expId,
        title: exp.title,
        location: exp.location,
        date: exp.date,
        description: exp.description,
        category: mapCategory(exp.category),
        sortDate: parseSortDate(exp.date),
      },
    });
  }

  // ─── Seed Statistics ─────────────────────────────────────────────────────
  console.log("  → Seeding statistics...");
  for (const stat of statisticsData) {
    const statId = `stat-${generateSlug(stat.label)}`;
    await prisma.statistic.upsert({
      where: { id: statId },
      update: {
        value: stat.value,
        label: stat.label,
        order: stat.order,
      },
      create: {
        id: statId,
        value: stat.value,
        label: stat.label,
        order: stat.order,
      },
    });
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
