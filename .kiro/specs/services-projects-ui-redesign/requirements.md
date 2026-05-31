# Requirements Document

## Introduction

Rediseño completo de la interfaz de usuario para las secciones de Servicios y Proyectos del portafolio web de Juan Carlos Echeverri Avalúos. El objetivo es transformar la presentación actual (tarjetas básicas con íconos genéricos y un carrusel simple) en una experiencia visual moderna, profesional y atractiva que impresione a clientes potenciales y refleje la calidad del trabajo realizado. Se incorporarán animaciones con Framer Motion, mejor presentación de imágenes, filtrado de proyectos y micro-interacciones que eleven la percepción de marca.

## Glossary

- **Sección_Servicios**: Componente de la página que presenta los cuatro servicios ofrecidos (Avalúos, Asesorías Inmobiliarias, Fotografía Aérea, Estudios Topográficos)
- **Sección_Proyectos**: Componente de la página que presenta el portafolio de proyectos realizados con imágenes y descripciones
- **Tarjeta_Servicio**: Componente visual individual que representa un servicio con ícono, título, descripción y acción de detalle
- **Tarjeta_Proyecto**: Componente visual individual que representa un proyecto con imagen destacada, título, ubicación y categoría
- **Lightbox**: Componente de visualización de imágenes a pantalla completa con navegación, zoom y controles de cierre
- **Galería_Proyecto**: Componente que muestra las imágenes de un proyecto en formato grid con capacidad de ampliar cada imagen
- **Panel_Detalle_Servicio**: Vista expandida de un servicio que muestra información completa con diseño visual enriquecido
- **Filtro_Proyectos**: Componente que permite al usuario filtrar proyectos por categoría o ubicación
- **Vista_Grid**: Modo de visualización de proyectos en formato de cuadrícula (masonry o grid estándar)
- **Vista_Carrusel**: Modo de visualización de proyectos en formato de carrusel horizontal con autoplay
- **Animación_Entrada**: Animación de aparición de elementos al hacer scroll o al cargar la sección, implementada con Framer Motion
- **Micro_Interacción**: Efecto visual sutil que responde a la interacción del usuario (hover, click, focus)
- **Página_Detalle_Proyecto**: Página dedicada que muestra toda la información de un proyecto individual con galería completa

## Requirements

### Requirement 1: Presentación Visual de Servicios

**User Story:** Como visitante del portafolio, quiero ver los servicios presentados de forma visualmente atractiva y diferenciada, para entender rápidamente qué ofrece el profesional y sentir confianza en su calidad.

#### Acceptance Criteria

1. THE Sección_Servicios SHALL presentar cada servicio en una Tarjeta_Servicio que incluya, en orden vertical descendente: ícono distintivo, título del servicio, descripción de máximo 120 caracteres y un botón de llamada a la acción con texto visible
2. WHEN un usuario posiciona el cursor sobre una Tarjeta_Servicio en un dispositivo con soporte de hover, THE Tarjeta_Servicio SHALL mostrar una Micro_Interacción de elevación y cambio de sombra con una duración de transición entre 200ms y 400ms
3. THE Sección_Servicios SHALL organizar las tarjetas en un layout responsivo de 1 columna en móvil, 2 columnas en tablet y 2 columnas en desktop, con el mismo valor de espaciado (gap) entre todas las tarjetas tanto horizontal como verticalmente
4. WHEN la Sección_Servicios entra en el viewport del usuario, THE Sección_Servicios SHALL ejecutar una Animación_Entrada escalonada donde cada Tarjeta_Servicio aparece secuencialmente con un retraso de 100ms a 200ms entre cada una
5. THE Tarjeta_Servicio SHALL incluir un elemento visual de fondo o acento de color que sea único para cada servicio, de modo que no haya dos tarjetas con el mismo color de acento
6. IF el dispositivo del usuario no soporta hover (pantalla táctil sin cursor), THEN THE Tarjeta_Servicio SHALL mostrar la información completa sin requerir interacción de hover para revelar contenido

### Requirement 2: Panel de Detalle de Servicio

**User Story:** Como visitante interesado en un servicio específico, quiero ver información detallada presentada de forma clara y visualmente enriquecida, para comprender el alcance completo del servicio.

#### Acceptance Criteria

1. WHEN un usuario activa la acción "Saber más" en una Tarjeta_Servicio, THE Panel_Detalle_Servicio SHALL abrirse como un diálogo modal superpuesto al contenido con una animación de transición que dure entre 200ms y 500ms
2. THE Panel_Detalle_Servicio SHALL presentar el contenido del servicio con al menos 2 niveles de jerarquía tipográfica (título de sección y cuerpo de texto), listas formateadas y separación visual entre secciones mediante espaciado o líneas divisorias
3. THE Panel_Detalle_Servicio SHALL incluir un encabezado visual con el ícono del servicio y el título renderizado con mayor tamaño de fuente que el cuerpo del contenido
4. WHEN el contenido del servicio incluye una lista numerada de categorías, THE Panel_Detalle_Servicio SHALL renderizar cada categoría como un elemento visual independiente con estilo de badge o chip
5. THE Panel_Detalle_Servicio SHALL ser navegable con teclado permitiendo Tab para recorrer elementos interactivos, y SHALL exponer roles ARIA apropiados (role="dialog", aria-modal, aria-labelledby) para lectores de pantalla
6. WHEN el usuario presiona la tecla Escape o activa el botón de cierre visible en el panel, THE Panel_Detalle_Servicio SHALL cerrarse con una animación de transición que dure entre 200ms y 500ms y devolver el foco al elemento "Saber más" que lo originó
7. WHILE el Panel_Detalle_Servicio está abierto, THE Panel_Detalle_Servicio SHALL capturar el foco de teclado dentro del panel (focus trap) e impedir el scroll del contenido de fondo

### Requirement 3: Visualización de Proyectos en Grid

**User Story:** Como visitante del portafolio, quiero ver todos los proyectos en una vista de cuadrícula atractiva, para explorar rápidamente el trabajo realizado y encontrar proyectos de mi interés.

#### Acceptance Criteria

1. THE Sección_Proyectos SHALL ofrecer una Vista_Grid como modo de visualización principal que muestre todas las Tarjeta_Proyecto simultáneamente
2. THE Vista_Grid SHALL organizar las tarjetas en un layout responsivo de 1 columna en móvil (menos de 768px), 2 columnas en tablet (768px a 1023px) y 3 columnas en desktop (1024px o superior)
3. WHEN un usuario posiciona el cursor sobre una Tarjeta_Proyecto en un dispositivo con soporte de hover, THE Tarjeta_Proyecto SHALL mostrar un overlay con gradiente que revele el título del proyecto, la ubicación y un indicador de "Ver proyecto" con una transición de opacidad entre 200ms y 400ms
4. THE Tarjeta_Proyecto SHALL mostrar la imagen principal del proyecto optimizada con Next.js Image, con aspect ratio de 4:3 consistente y efecto de carga progresiva (blur placeholder)
5. WHEN la Vista_Grid entra en el viewport, THE Vista_Grid SHALL ejecutar una Animación_Entrada donde las tarjetas aparecen con efecto de fade-in y desplazamiento vertical escalonado con un retraso de 50ms a 100ms entre cada tarjeta
6. IF el dispositivo del usuario no soporta hover (pantalla táctil), THEN THE Tarjeta_Proyecto SHALL mostrar el título y la ubicación de forma permanente sobre la imagen sin requerir interacción de hover

### Requirement 4: Visualización de Proyectos en Carrusel

**User Story:** Como visitante del portafolio, quiero tener la opción de ver los proyectos en un carrusel moderno con autoplay, para una experiencia de navegación más dinámica y cinematográfica.

#### Acceptance Criteria

1. THE Sección_Proyectos SHALL ofrecer una Vista_Carrusel como modo de visualización alternativo al grid, con un control de alternancia visible que indique el modo activo actualmente
2. WHEN el usuario selecciona la Vista_Carrusel, THE Sección_Proyectos SHALL mostrar los proyectos en un carrusel horizontal con desplazamiento continuo (loop infinito) y autoplay cada 5000ms que se pausa cuando el usuario hace hover, toca el carrusel o navega con controles, y se reanuda automáticamente tras 3000ms de inactividad
3. THE Vista_Carrusel SHALL mostrar 1 proyecto completo en viewports menores a 768px, 2 proyectos completos en viewports entre 768px y 1023px, y 3 proyectos en desktop (1024px o superior) con el tercer proyecto visible al 50% de su ancho para indicar continuidad
4. THE Vista_Carrusel SHALL incluir indicadores de progreso que reflejen la posición actual dentro del total de proyectos, y controles de anterior/siguiente visibles en viewports de 1024px o superior
5. WHEN un usuario arrastra horizontalmente un mínimo de 30px en dispositivo táctil, THE Vista_Carrusel SHALL navegar al proyecto anterior o siguiente en la dirección del gesto con una transición animada de no más de 300ms
6. WHEN el usuario presiona las teclas de flecha izquierda o derecha mientras la Vista_Carrusel tiene foco, THE Vista_Carrusel SHALL navegar al proyecto anterior o siguiente respectivamente

### Requirement 5: Filtrado y Categorización de Proyectos

**User Story:** Como visitante interesado en un tipo específico de proyecto, quiero filtrar los proyectos por categoría o ubicación, para encontrar rápidamente ejemplos relevantes a mi necesidad.

#### Acceptance Criteria

1. THE Filtro_Proyectos SHALL presentar opciones de filtrado por categoría de proyecto (Fincas, Hoteles, Infraestructura, Maquinaria, Cultivos, Lotes)
2. THE Filtro_Proyectos SHALL presentar una opción "Todos" que muestre todos los proyectos sin filtro aplicado y que esté seleccionada por defecto
3. WHEN un usuario selecciona una categoría en el Filtro_Proyectos, THE Sección_Proyectos SHALL mostrar únicamente los proyectos que pertenecen a la categoría seleccionada con una animación de transición de layout que dure entre 300ms y 600ms, aplicándose tanto en Vista_Grid como en Vista_Carrusel
4. THE Filtro_Proyectos SHALL indicar visualmente la categoría actualmente seleccionada mediante un estilo diferenciado (color de fondo, borde o subrayado) que contraste con las opciones no seleccionadas
5. WHEN un filtro reduce los proyectos visibles, THE Sección_Proyectos SHALL animar la salida de los proyectos no coincidentes con una transición de opacidad y escala que dure entre 200ms y 400ms, seguida de la reorganización del layout dentro de los 300ms a 600ms establecidos
6. IF la categoría seleccionada no contiene proyectos asociados, THEN THE Sección_Proyectos SHALL mostrar un mensaje indicando que no hay proyectos disponibles para esa categoría, manteniendo visible el Filtro_Proyectos para permitir cambiar la selección

### Requirement 6: Página de Detalle de Proyecto

**User Story:** Como visitante interesado en un proyecto específico, quiero acceder a una página dedicada con toda la información y galería completa, para apreciar el alcance y calidad del trabajo realizado.

#### Acceptance Criteria

1. WHEN un usuario hace click en una Tarjeta_Proyecto, THE Sección_Proyectos SHALL navegar a la Página_Detalle_Proyecto correspondiente utilizando una URL basada en el slug del proyecto
2. THE Página_Detalle_Proyecto SHALL mostrar el título del proyecto, la descripción completa, la ubicación, la categoría y la Galería_Proyecto con todas las imágenes
3. THE Página_Detalle_Proyecto SHALL incluir un enlace para volver a la lista de proyectos y botones de navegación al proyecto anterior y siguiente según el orden de la lista, deshabilitando el botón anterior en el primer proyecto y el botón siguiente en el último proyecto
4. THE Página_Detalle_Proyecto SHALL cargar con una animación de transición de página con duración entre 300ms y 600ms que proporcione continuidad visual
5. THE Página_Detalle_Proyecto SHALL incluir metadatos SEO específicos del proyecto (title y meta description generados a partir del título y descripción del proyecto)
6. IF un usuario navega a una URL de proyecto que no existe, THEN THE sistema SHALL mostrar una página 404 con un enlace para volver a la lista de proyectos

### Requirement 7: Galería de Imágenes con Lightbox

**User Story:** Como visitante que revisa un proyecto, quiero ver las imágenes en alta calidad con capacidad de zoom y navegación fluida, para apreciar los detalles del trabajo realizado.

#### Acceptance Criteria

1. THE Galería_Proyecto SHALL mostrar las imágenes del proyecto en un grid responsivo de thumbnails con aspect ratio 4:3, organizados en 2 columnas en móvil, 3 columnas en tablet y 4 columnas en desktop
2. WHEN un usuario hace click en una imagen de la Galería_Proyecto, THE Lightbox SHALL abrirse mostrando la imagen seleccionada a tamaño completo con una animación de expansión desde el thumbnail que dure entre 200ms y 400ms
3. WHILE el Lightbox está abierto, THE Lightbox SHALL permitir navegar entre imágenes del proyecto mediante flechas de teclado (izquierda/derecha), botones de navegación anterior/siguiente y gestos de swipe en dispositivos táctiles, deshabilitando el botón anterior en la primera imagen y el botón siguiente en la última imagen
4. WHILE el Lightbox está abierto, THE Lightbox SHALL permitir hacer zoom en la imagen mediante gesto de pinch en dispositivos táctiles o scroll del mouse en desktop, con un nivel de zoom mínimo de 1x y máximo de 3x, reiniciando el zoom a 1x al navegar a otra imagen
5. WHEN un usuario presiona la tecla Escape o hace click fuera de la imagen, THE Lightbox SHALL cerrarse con una animación de contracción hacia el thumbnail de origen que dure entre 200ms y 400ms
6. THE Lightbox SHALL mostrar un indicador de posición en formato "N de M" y un botón de cierre con tamaño mínimo de área táctil de 44x44px, ambos posicionados sobre un fondo semitransparente que garantice contraste contra cualquier imagen
7. WHILE el Lightbox está abierto, THE Lightbox SHALL bloquear el scroll del contenido de fondo y capturar el foco del teclado dentro del componente Lightbox

### Requirement 8: Animaciones y Micro-Interacciones Globales

**User Story:** Como visitante del portafolio, quiero experimentar animaciones fluidas y micro-interacciones consistentes en toda la interfaz, para percibir un producto profesional y de alta calidad.

#### Acceptance Criteria

1. THE Sección_Servicios y THE Sección_Proyectos SHALL implementar todas las animaciones utilizando la librería Framer Motion
2. WHEN un elemento animado se hace visible en al menos un 20% dentro del viewport por primera vez, THE Animación_Entrada SHALL ejecutarse con una duración entre 300ms y 700ms, sin repetirse en posteriores entradas al viewport
3. WHILE una animación está en ejecución, THE interfaz SHALL mantener un rendimiento de al menos 30 frames por segundo y procesar eventos de entrada del usuario en un máximo de 100ms
4. IF el usuario tiene configurada la preferencia de sistema "prefers-reduced-motion", THEN THE interfaz SHALL desactivar todas las animaciones y mostrar los elementos en su estado final de forma inmediata sin transiciones
5. WHEN el usuario posiciona el cursor sobre una tarjeta en Sección_Servicios o Sección_Proyectos, THE Micro_Interacción SHALL aplicar una transformación de escala entre 1.02 y 1.05 con incremento de sombra, ejecutada con una transición de duración entre 200ms y 300ms

### Requirement 9: Responsividad y Rendimiento

**User Story:** Como visitante que accede desde cualquier dispositivo, quiero que las secciones de servicios y proyectos se vean y funcionen correctamente en móvil, tablet y desktop, para tener una experiencia óptima sin importar mi dispositivo.

#### Acceptance Criteria

1. THE Sección_Servicios y THE Sección_Proyectos SHALL adaptar su layout a tres breakpoints: móvil (menos de 768px), tablet (768px a 1024px) y desktop (más de 1024px)
2. THE Tarjeta_Proyecto SHALL utilizar el componente Next.js Image con la propiedad sizes configurada con valores distintos por breakpoint para que el navegador descargue una imagen de ancho proporcional al espacio disponible en cada breakpoint
3. THE Galería_Proyecto SHALL utilizar lazy loading para las imágenes que no están visibles en el viewport inicial
4. WHILE una imagen de Tarjeta_Proyecto no ha completado su carga, THE Tarjeta_Proyecto SHALL mostrar un placeholder de blur generado a partir de la imagen original, reemplazándolo por la imagen completa una vez disponible
5. THE Sección_Servicios y THE Sección_Proyectos SHALL ser operables mediante navegación por teclado donde: Tab mueve el foco entre elementos interactivos en orden lógico, Enter activa el elemento enfocado, Escape cierra paneles o lightbox abiertos, y las flechas permiten navegar entre tarjetas dentro de la misma sección
6. THE Sección_Servicios y THE Sección_Proyectos SHALL alcanzar un Largest Contentful Paint (LCP) de 2500ms o menos en una conexión 4G simulada según medición de Lighthouse
7. THE Sección_Servicios y THE Sección_Proyectos SHALL presentar todos los elementos interactivos con un área de toque mínima de 44x44 píxeles CSS en los breakpoints de móvil y tablet

### Requirement 10: Integración con Fuente de Datos

**User Story:** Como desarrollador, quiero que los componentes de servicios y proyectos consuman datos de forma desacoplada, para facilitar la futura migración a un CMS sin modificar los componentes de presentación.

#### Acceptance Criteria

1. THE Sección_Servicios SHALL consumir los datos de servicios a través de una capa de abstracción (función o hook) que lea del archivo de datos estático, donde la implementación interna de la capa de abstracción puede ser reemplazada sin modificar el código de los componentes que la consumen
2. THE Sección_Proyectos SHALL consumir los datos de proyectos a través de una capa de abstracción (función o hook) donde los componentes de presentación rendericen únicamente los campos presentes en los datos recibidos, de modo que agregar campos opcionales a la interfaz de datos no requiera cambios en el código de los componentes existentes
3. THE interfaz de datos de Proyecto SHALL incluir los campos: título (string, máximo 200 caracteres), descripción (string, máximo 2000 caracteres), imágenes (arreglo de strings con rutas de imagen, mínimo 1 y máximo 20 elementos), categoría (string, máximo 100 caracteres), ubicación (string, máximo 100 caracteres) y fecha (string en formato ISO 8601)
4. THE interfaz de datos de Servicio SHALL incluir los campos: título (string, máximo 200 caracteres), descripción (string, máximo 500 caracteres), detalles (string, máximo 5000 caracteres), ícono (string con ruta al recurso SVG) y color de acento (string con valor de color CSS válido)
5. WHEN los datos de proyectos incluyen el campo categoría, THE Filtro_Proyectos SHALL generar las opciones de filtrado a partir del conjunto de valores únicos y no vacíos del campo categoría presentes en los datos cargados, incluyendo una opción para mostrar todos los proyectos
6. IF la capa de abstracción de datos no retorna datos o retorna un error, THEN THE sistema SHALL mostrar un estado vacío indicando que no hay información disponible, sin provocar un error de renderizado en los componentes de presentación
