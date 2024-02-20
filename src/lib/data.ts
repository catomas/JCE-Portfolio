import { Project, Service } from "./interfaces";

export const links = [
  {
    name: "Inicio",
    hash: "/",
  },
  {
    name: "Experiencia",
    hash: "experience",
  },
  {
    name: "Servicios",
    hash: "services",
  },
  {
    name: "Proyectos",
    hash: "projects",
  },
  {
    name: "Contacto",
    hash: "contact",
  },
] as const;

export const services: Service[] = [
  {
    title: "Avalúos",
    description:
      "Avalúos urbanos y rurales. Avalúos comerciales, de garantía, de rentas, de maquinaria y equipos, de obras de arte, de vehículos, entre otros.",
    image: "icons/house_rent.svg",
    details: `
    Ofrecemos servicios de avalúo en una variedad de categorías, cada una diseñada para abarcar un espectro específico de activos y propiedades. Estas categorías incluyen:
    
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
    13. Intangibles Especiales
    `,
  },
  {
    title: "Asesorías Inmobiliarias",
    description:
      "Asesorías en compra, venta y arriendo de inmuebles. Asesorías en procesos de licitación y contratación de obras civiles.",
    image: "icons/house.svg",
    details:
      "En nuestro servicio de asesoría inmobiliaria, no solo facilitamos la compra o venta de inmuebles, sino que también acompañamos al cliente en cada paso del proceso. Desde la búsqueda y captación de propiedades hasta la negociación y escrituración. Además, nos dedicamos activamente a la captación de nuevos inmuebles para la venta y la atracción de posibles clientes. Nuestra meta es asegurar transacciones exitosas y satisfactorias para todas las partes involucradas.",
  },
  {
    title: "Toma de Fotos & Videos Aéreos",
    description:
      "Captura imágenes y videos aéreos para resaltar la singularidad y perspectiva única de tus propiedades.",

    image: "icons/drone_v1.svg",
    details:
      "Nos especializamos en la captura de imágenes aéreas, tanto en fotografía como en video, para una variedad de propiedades, incluyendo lotes, fincas, casas y fachadas. Utilizamos drones de última generación para obtener vistas impresionantes y detalladas desde el cielo. Con más de 7 años de experiencia en el uso de esta tecnología, garantizamos resultados de alta calidad y precisión en cada proyecto.",
  },
  {
    title: "Estudios Topograficos, Ortofotos y Alinderamientos",
    description:
      "Realizamos estudios detallados, generación de ortofotos y alinderamientos para proporcionar información completa y precisa sobre la topografía.",
    image: "icons/topo.svg",
    details:
      "Nos especializamos en levantamientos topográficos completos, que incluyen la generación de planos detallados, curvas de nivel y la verificación de linderos de propiedades utilizando escrituras, planos catastrales y levantamientos planimétricos. Además, ofrecemos servicios de ortofotografía para proporcionar representaciones fotográficas georreferenciadas del terreno, asegurando precisión y detalle en cada proyecto.",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 18,
    text: "Años de experiencia",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 900,
    text: "Clientes satisfechos",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 1200,
    text: "Avaluos completados",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 3,
    endCounter: 14,
    text: "Certificados y Estudios",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const projects: Project[] = [
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
  },
  {
    title: "Cartagena",
    description:
      "En Cartagena, realizamos la evaluación de bodegas, centros deportivos, lotes y mejoras, incluyendo instalaciones únicas como el Ecohotel Islas del Rosario. Además, ofrecemos servicios de fotografía aérea, capturando imágenes completas de instalaciones deportivas para proporcionar una visión precisa. Nuestro compromiso con la excelencia y la precisión en cada avalúo nos distingue en el mercado.",
    images: [
      "/images/cartagena/img_1.jpg",
      "/images/cartagena/img_2.jpg",
      "/images/cartagena/img_3.jpg",
      "/images/cartagena/img_4.jpg",
    ],
  },
  {
    title: "Avalúo de Fincas de Recreo",
    description:
      "Ofrecemos servicios de avalúo para fincas de recreo en diversas zonas del país. Nuestra experiencia en bienes raíces y tasación garantiza evaluaciones precisas y detalladas que reflejan el valor real de tu propiedad. Como valor añadido, ofrecemos fotografías de alta calidad, capturadas con tecnología de drones, para proporcionar una perspectiva completa y visualmente impactante de cada finca.",
    images: [
      "/images/recreo/img_1.jpg",
      "/images/recreo/img_2.jpg",
      "/images/recreo/img_3.jpg",
      "/images/recreo/img_4.jpg",
    ],
  },
  {
    title: "Arboletes",
    images: [
      "/images/arboletes/img_1.jpg",
      "/images/arboletes/img_2.jpg",
      "/images/arboletes/img_3.jpg",
      "/images/arboletes/img_4.jpg",
    ],
    description:
      "Avalúos en el municipio de Arboletes para la Alcaldía, que abarcan servidumbres para el acueducto, la valoración de la fábrica de subproductos de coco, fincas ganaderas y avalúos de lotes destinados a la comunidad. Estos avalúos son fundamentales para la planificación y desarrollo estructurado de la región.",
  },

  {
    title: "San Andrés",
    description:
      "En las hermosas Islas de San Andrés, ofrecemos servicios de avalúo para diversos tipos de propiedades. Nos especializamos en la valoración de lotes independientes, casas unifamiliares y, en circunstancias particulares, incluso realizamos avalúos de propiedades afectadas, como granjas avícolas en ruinas debido al impacto del huracán IOTA.",
    images: [
      "/images/san_andres/img_1.jpg",
      "/images/san_andres/img_2.jpg",
      "/images/san_andres/img_3.jpg",
      "/images/san_andres/img_4.jpg",
    ],
  },
  {
    title: "Coveñas",
    description:
      "En el Municipio de Coveñas, realizamos evaluaciones de diversas propiedades, como cabañas, lotes y el Hotel Bahía Blanca. Destacamos nuestro servicio con hermosas fotografías aéreas, capturadas por drones, que proporcionan una visión completa y detallada, permitiendo apreciar también la belleza del Golfo de Morrosquillo.",
    images: [
      "/images/coveñas/img_1.jpg",
      "/images/coveñas/img_2.jpg",
      "/images/coveñas/img_3.jpg",
      "/images/coveñas/img_4.jpg",
    ],
  },
  {
    title: "Hotel Click Clack",
    description:
      "Avalúo del Hotel Click Clak, una destacada joya inmobiliaria en la ciudad de Medellín. Este proceso abarcó una evaluación detallada tanto de la construcción como del lote. El enfoque durante el avalúo se fundamenta en la dedicación a la precisión y la aplicación de mi sólida experiencia en el mercado inmobiliario. Cada elemento, desde los detalles arquitectónicos de la construcción hasta las características del lote, ha sido minuciosamente considerado para garantizar una valoración precisa y fundamentada.",
    images: [
      "/images/click_clack/img_1.jpg",
      "/images/click_clack/img_2.jpg",
      "/images/click_clack/img_3.jpg",
      "/images/click_clack/img_4.jpg",
    ],
  },

  {
    title: "Infraestructura con la Gobernación",
    description:
      "Formamos parte del equipo encargado de realizar los avalúos de diversas vías, entre las que se incluyen Angelópolis-Amagá, Barbosa-Concepción, Alejandría-Concepción, Fredonia-Puente Iglesias, Jericó-Puente Iglesias, y Valparaíso-La Pintada. En este proceso, se evaluó la capa de rodadura, las alcantarillas, los puentes, los muros y los box coulvert. Nuestra contribución consistió en analizar y valorar la infraestructura existente, proporcionando datos precisos y detallados que respaldan la toma de decisiones en el ámbito de la planificación y mantenimiento de estas importantes vías de comunicación.",
    images: [
      "/images/gobernacion/img_1.jpg",
      "/images/gobernacion/img_2.jpg",
      "/images/gobernacion/img_3.jpg",
      "/images/gobernacion/img_4.jpg",
    ],
  },
  {
    title: "Avalúo de Maquinaria Pesada",
    description:
      "Realizamos avalúos precisos de maquinaria pesada, considerando factores clave como antigüedad, mantenimiento y horas de operación. Ya sea para compra, venta o gestión de activos, proporcionamos información confiable",
    images: [
      "/images/maquinaria/img_1.jpg",
      "/images/maquinaria/img_2.jpg",
      "/images/maquinaria/img_3.jpg",
      "/images/maquinaria/img_4.jpg",
    ],
  },
  {
    title: "Avalúos de cultivos en Palmira",
    description:
      "Se llevaron a cabo avalúos en cultivos de caña y fincas agropecuarias, abordando la valoración de tierras e instalaciones asociadas. Los servicios fueron complementados con la captura de fotos aéreas y la producción de un video promocional. El compromiso es ofrecer evaluaciones integrales y soluciones visuales personalizadas para resaltar las características únicas de cada propiedad.",
    images: [
      "/images/palmira/img_1.jpg",
      "/images/palmira/img_2.jpg",
      "/images/palmira/img_3.jpg",
      "/images/palmira/img_4.jpg",
    ],
  },
  {
    title: "Hotel Colonial Santafe de Antioquia",
    description:
      "En el destacado municipio turístico de Santa Fe de Antioquia, se han realizado diversos avalúos que abarcan desde lotes independientes y parcelaciones hasta casas, incluyendo aquellas con valor patrimonial. Además, se han llevado a cabo avalúos de fincas ganaderas, fincas de recreo y un Hotel Patrimonial ubicado a solo una cuadra del parque central. El enfoque de estos avalúos se centra en proporcionar evaluaciones precisas que reflejen la singularidad y relevancia de cada tipo de propiedad en este entorno turístico tan especial. ",
    images: [
      "/images/colonial/img_1.jpg",
      "/images/colonial/img_2.jpg",
      "/images/colonial/img_3.jpg",
      "/images/colonial/img_4.jpg",
    ],
  },
];
