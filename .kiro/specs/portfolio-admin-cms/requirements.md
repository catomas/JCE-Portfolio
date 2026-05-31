# Requirements Document

## Introduction

Este documento define los requisitos para transformar el portafolio actual de Juan Carlos Echeverri Avalúos (una aplicación Next.js con contenido estático hardcodeado) en un sistema CMS completo con panel de administración, base de datos para persistencia de contenido, y un diseño público moderno y actualizado. El objetivo es que el usuario pueda gestionar todo el contenido importante sin necesidad de un desarrollador.

## Glossary

- **Sistema_CMS**: El sistema completo que incluye el portafolio público y el panel de administración
- **Panel_Admin**: La interfaz de administración protegida donde el usuario gestiona el contenido
- **Portafolio_Público**: La parte visible para visitantes del sitio web
- **Administrador**: El usuario propietario del portafolio que gestiona el contenido
- **Visitante**: Cualquier persona que accede al portafolio público
- **Proyecto**: Un trabajo realizado que incluye título, descripción, imágenes y categoría
- **Servicio**: Una oferta profesional con título, descripción, icono y detalles expandidos
- **Experiencia**: Un hito educativo o profesional con fecha, ubicación y descripción
- **Estadística**: Un contador numérico con etiqueta mostrado en la sección de proyectos
- **Testimonio**: Una reseña de un cliente con nombre, cargo y texto
- **Medio**: Una imagen o video subido al sistema para uso en el contenido

## Requirements

### Requisito 1: Autenticación del Panel de Administración

**User Story:** Como Administrador, quiero acceder al panel de administración mediante credenciales seguras, para que solo yo pueda modificar el contenido del portafolio.

#### Acceptance Criteria

1. WHEN el Administrador navega a la ruta /admin, THE Sistema_CMS SHALL mostrar un formulario de inicio de sesión con un campo de email (máximo 254 caracteres) y un campo de contraseña (entre 8 y 128 caracteres), ambos obligatorios
2. WHEN el Administrador ingresa credenciales válidas, THE Sistema_CMS SHALL redirigir al dashboard del Panel_Admin y crear una sesión autenticada en un máximo de 2 segundos
3. WHEN un usuario ingresa credenciales inválidas, THE Sistema_CMS SHALL mostrar un mensaje de error genérico indicando que las credenciales son incorrectas, sin revelar si el email existe o cuál campo falló
4. WHILE el Administrador tiene una sesión activa, THE Panel_Admin SHALL mantener el acceso durante un máximo de 24 horas antes de requerir re-autenticación
5. IF un usuario no autenticado intenta acceder a cualquier ruta del Panel_Admin, THEN THE Sistema_CMS SHALL redirigir a la página de inicio de sesión y preservar la URL solicitada para redirigir tras autenticación exitosa
6. WHEN el Administrador hace clic en "Cerrar sesión", THE Sistema_CMS SHALL invalidar la sesión y redirigir a la página de inicio de sesión
7. IF un usuario falla la autenticación 5 veces consecutivas desde la misma dirección IP, THEN THE Sistema_CMS SHALL bloquear los intentos de inicio de sesión desde esa IP durante 15 minutos y mostrar un mensaje indicando que se ha excedido el número máximo de intentos
8. WHEN el Administrador envía el formulario de inicio de sesión, THE Sistema_CMS SHALL validar que el campo de email tenga un formato de correo electrónico válido antes de procesar la autenticación, y mostrar un mensaje de error de validación si el formato es incorrecto

### Requisito 2: Gestión de Proyectos

**User Story:** Como Administrador, quiero crear, editar, reordenar y eliminar proyectos desde el panel, para que mi portafolio refleje mis trabajos más recientes sin ayuda técnica.

#### Acceptance Criteria

1. WHEN el Administrador accede a la sección de proyectos del Panel_Admin, THE Panel_Admin SHALL mostrar una lista de todos los proyectos existentes con título, imagen principal y estado (publicado/borrador)
2. WHEN el Administrador crea un nuevo proyecto, THE Panel_Admin SHALL requerir título (máximo 100 caracteres), descripción (máximo 2000 caracteres) y al menos una imagen (máximo 10 imágenes por proyecto), asignar el estado "borrador" por defecto, y persistir los datos en la base de datos
3. WHEN el Administrador edita un proyecto existente, THE Panel_Admin SHALL cargar los datos actuales en el formulario y guardar los cambios en la base de datos
4. IF el Administrador envía el formulario de proyecto con campos requeridos vacíos o valores fuera de los límites permitidos, THEN THE Panel_Admin SHALL mostrar mensajes de error junto a los campos inválidos y no persistir los datos
5. WHEN el Administrador elimina un proyecto, THE Panel_Admin SHALL solicitar confirmación antes de eliminar el proyecto y sus imágenes asociadas de la base de datos
6. WHEN el Administrador reordena los proyectos mediante arrastrar y soltar, THE Panel_Admin SHALL persistir el nuevo orden y reflejarlo en el Portafolio_Público
7. WHEN el Administrador cambia el estado de un proyecto a "borrador", THE Portafolio_Público SHALL dejar de mostrar ese proyecto a los Visitantes
8. WHEN el Administrador sube imágenes a un proyecto, THE Sistema_CMS SHALL aceptar formatos JPG, PNG y WebP con un tamaño máximo de 5MB por imagen
9. IF el Administrador intenta subir una imagen con formato no soportado o que excede 5MB, THEN THE Panel_Admin SHALL rechazar la subida y mostrar un mensaje de error indicando el formato o tamaño permitido

### Requisito 3: Gestión de Servicios

**User Story:** Como Administrador, quiero gestionar los servicios ofrecidos desde el panel, para que pueda actualizar mi oferta profesional cuando cambie.

#### Acceptance Criteria

1. WHEN el Administrador accede a la sección de servicios del Panel_Admin, THE Panel_Admin SHALL mostrar todos los servicios existentes en una lista con título, descripción corta e icono para cada servicio
2. WHEN el Administrador crea un nuevo servicio, THE Panel_Admin SHALL requerir título (máximo 100 caracteres), descripción corta (máximo 200 caracteres), descripción detallada (máximo 2000 caracteres) e icono en formato SVG, y persistir los datos en la base de datos
3. WHEN el Administrador edita un servicio existente, THE Panel_Admin SHALL cargar los datos actuales en el formulario, permitir modificar todos los campos incluyendo el icono, y persistir los cambios en la base de datos
4. IF el Administrador envía el formulario de servicio con algún campo requerido vacío o que excede el límite de caracteres, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando los campos inválidos y no persistir los datos
5. WHEN el Administrador elimina un servicio, THE Panel_Admin SHALL solicitar confirmación antes de eliminar; si el Administrador confirma, THE Panel_Admin SHALL eliminar el servicio de la base de datos; si cancela, THE Panel_Admin SHALL mantener el servicio sin cambios
6. WHEN el Administrador reordena los servicios mediante arrastrar y soltar, THE Panel_Admin SHALL persistir el nuevo orden y reflejarlo en el Portafolio_Público

### Requisito 4: Gestión de Experiencia y Certificaciones

**User Story:** Como Administrador, quiero gestionar mi línea de tiempo de experiencia y certificaciones, para que los visitantes vean mi trayectoria actualizada.

#### Acceptance Criteria

1. WHEN el Administrador accede a la sección de experiencia del Panel_Admin, THE Panel_Admin SHALL mostrar todas las entradas de experiencia organizadas por fecha de forma descendente (más reciente primero)
2. WHEN el Administrador crea una nueva entrada de experiencia, THE Panel_Admin SHALL requerir título (máximo 100 caracteres), ubicación (máximo 150 caracteres), fecha en formato mes y año, descripción (máximo 500 caracteres) y categoría (Educación, Certificación o Trabajo), y persistir los datos en la base de datos
3. WHEN el Administrador edita una entrada de experiencia, THE Panel_Admin SHALL cargar los datos actuales en el formulario, permitir modificar todos los campos y persistir los cambios en la base de datos
4. WHEN el Administrador elimina una entrada de experiencia, THE Panel_Admin SHALL solicitar confirmación antes de eliminar la entrada de la base de datos
5. THE Portafolio_Público SHALL mostrar las entradas de experiencia publicadas ordenadas por fecha de forma descendente (más reciente primero)
6. IF el Administrador envía el formulario de experiencia con algún campo requerido vacío o excediendo el límite de caracteres, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando el campo inválido y no persistir la entrada

### Requisito 5: Gestión de Información Personal y de Contacto

**User Story:** Como Administrador, quiero editar mi información personal, textos de presentación y datos de contacto, para que el portafolio siempre tenga información actualizada.

#### Acceptance Criteria

1. WHEN el Administrador accede a la sección de perfil del Panel_Admin, THE Panel_Admin SHALL mostrar los campos editables: nombre completo (obligatorio, máximo 100 caracteres), título profesional (obligatorio, máximo 120 caracteres), biografía (obligatoria, máximo 2000 caracteres), foto de perfil (opcional), email (obligatorio), teléfono (opcional), dirección (opcional, máximo 200 caracteres), enlace de WhatsApp (opcional) y hasta 6 enlaces de redes sociales con nombre de plataforma y URL
2. WHEN el Administrador modifica cualquier campo de perfil y guarda, THE Sistema_CMS SHALL persistir los cambios y reflejarlos en el Portafolio_Público en un máximo de 5 segundos
3. WHEN el Administrador actualiza el número de WhatsApp, THE Portafolio_Público SHALL actualizar el enlace flotante de WhatsApp con el nuevo número validado en formato internacional (código de país seguido del número, entre 10 y 15 dígitos)
4. WHEN el Administrador modifica la biografía, THE Portafolio_Público SHALL mostrar el texto actualizado en la página de inicio
5. IF el Administrador intenta guardar el perfil con campos obligatorios vacíos o con valores que exceden los límites de caracteres, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando los campos inválidos y no persistir los cambios

### Requisito 6: Gestión de Estadísticas y Contadores

**User Story:** Como Administrador, quiero modificar los contadores numéricos del portafolio, para que reflejen mis logros actuales.

#### Acceptance Criteria

1. WHEN el Administrador accede a la sección de estadísticas del Panel_Admin, THE Panel_Admin SHALL mostrar todos los contadores existentes (hasta un máximo de 20) con su valor numérico y etiqueta
2. WHEN el Administrador modifica el valor o etiqueta de un contador, THE Sistema_CMS SHALL validar que el valor sea un número entero entre 0 y 999,999 y que la etiqueta tenga entre 1 y 50 caracteres, persistir el cambio y reflejarlo en el Portafolio_Público
3. WHEN el Administrador crea un nuevo contador, THE Panel_Admin SHALL requerir un valor numérico entero entre 0 y 999,999 y una etiqueta de entre 1 y 50 caracteres
4. WHEN el Administrador elimina un contador, THE Panel_Admin SHALL solicitar confirmación antes de eliminar y reflejar la eliminación en el Portafolio_Público
5. IF el Administrador ingresa un valor fuera del rango permitido o una etiqueta vacía o que exceda 50 caracteres, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando la restricción incumplida y no persistir el cambio

### Requisito 7: Gestión de Medios (Imágenes y Videos)

**User Story:** Como Administrador, quiero subir, organizar y eliminar imágenes y videos desde el panel, para que pueda gestionar todo el contenido visual del portafolio.

#### Acceptance Criteria

1. WHEN el Administrador accede a la galería de medios del Panel_Admin, THE Panel_Admin SHALL mostrar los archivos subidos paginados en grupos de 20 elementos, con vista previa, nombre y fecha de subida
2. WHEN el Administrador sube un archivo de imagen, THE Sistema_CMS SHALL validar que el formato sea JPG, PNG o WebP y que el tamaño no exceda 5MB
3. WHEN el Administrador sube un archivo de video, THE Sistema_CMS SHALL validar que el formato sea MP4 o WebM y que el tamaño no exceda 50MB
4. IF el Administrador sube un archivo con formato no soportado o que excede el tamaño máximo permitido, THEN THE Sistema_CMS SHALL rechazar la subida y mostrar un mensaje de error indicando el motivo del rechazo (formato inválido o tamaño excedido)
5. WHEN el Administrador elimina un medio que no está asociado a ningún proyecto, THE Sistema_CMS SHALL solicitar confirmación y eliminar el archivo y su referencia de la base de datos
6. IF el Administrador intenta eliminar un medio que está en uso por uno o más proyectos, THEN THE Sistema_CMS SHALL mostrar un mensaje indicando los proyectos que lo utilizan y requerir confirmación explícita antes de proceder con la eliminación
7. WHEN el Administrador sube una imagen exitosamente, THE Sistema_CMS SHALL generar automáticamente versiones optimizadas en formato WebP en tres tamaños: thumbnail (150px de ancho), medium (600px de ancho) y large (1200px de ancho)

### Requisito 8: Gestión de Testimonios de Clientes

**User Story:** Como Administrador, quiero agregar y gestionar testimonios de clientes, para que los visitantes vean la satisfacción de mis clientes anteriores.

#### Acceptance Criteria

1. WHEN el Administrador crea un nuevo testimonio, THE Panel_Admin SHALL requerir nombre del cliente (máximo 100 caracteres), cargo u organización (máximo 100 caracteres), texto del testimonio (máximo 500 caracteres) y opcionalmente una foto del cliente en formato JPG, PNG o WebP con tamaño máximo de 5MB
2. WHEN el Administrador edita un testimonio, THE Panel_Admin SHALL cargar los datos actuales en el formulario, permitir modificar todos los campos y persistir los cambios en la base de datos
3. WHEN el Administrador elimina un testimonio, THE Panel_Admin SHALL solicitar confirmación antes de eliminar el testimonio y su foto asociada de la base de datos
4. WHEN el Administrador cambia el estado de un testimonio a "publicado", THE Portafolio_Público SHALL mostrar el testimonio en la sección de testimonios
5. WHEN el Administrador cambia el estado de un testimonio a "borrador", THE Portafolio_Público SHALL dejar de mostrar ese testimonio a los Visitantes
6. IF el Administrador intenta guardar un testimonio sin completar los campos obligatorios (nombre, cargo u organización, texto), THEN THE Panel_Admin SHALL indicar los campos faltantes y no persistir el testimonio

### Requisito 9: Base de Datos y Persistencia con PostgreSQL y Prisma

**User Story:** Como Administrador, quiero que todo el contenido se almacene en una base de datos PostgreSQL gestionada con Prisma, para que los cambios persistan y no dependan de archivos de código.

#### Acceptance Criteria

1. THE Sistema_CMS SHALL almacenar todo el contenido gestionable (proyectos, servicios, experiencia, perfil, estadísticas, testimonios y medios) en una base de datos PostgreSQL
2. THE Sistema_CMS SHALL utilizar Prisma como ORM para interactuar con la base de datos de forma segura y tipada
3. WHEN el Administrador realiza un cambio en el contenido, THE Sistema_CMS SHALL persistir el cambio en la base de datos en un máximo de 2 segundos
4. IF ocurre un error al guardar datos, THEN THE Sistema_CMS SHALL mostrar un mensaje de error al Administrador indicando el tipo de fallo (conexión, validación o conflicto de datos), preservar los datos ingresados en el formulario sin pérdida, y no aplicar cambios parciales a la base de datos
5. THE Sistema_CMS SHALL implementar migraciones de Prisma versionadas y reversibles para gestionar cambios en el esquema, de modo que cada migración pueda aplicarse y revertirse de forma independiente
6. THE Sistema_CMS SHALL incluir un script de seed idempotente para poblar la base de datos con el contenido actual del portafolio, de modo que ejecutarlo múltiples veces no genere registros duplicados
7. IF la conexión a la base de datos PostgreSQL no está disponible, THEN THE Sistema_CMS SHALL mostrar un mensaje de error al Administrador indicando que el servicio de persistencia no está disponible y reintentar la conexión hasta un máximo de 3 intentos con un intervalo de 2 segundos entre cada intento

### Requisito 10: Diseño Moderno del Portafolio Público

**User Story:** Como Administrador, quiero que mi portafolio tenga un diseño moderno y profesional, para que cause una buena impresión en potenciales clientes.

#### Acceptance Criteria

1. WHEN una sección del Portafolio_Público entra en el viewport durante el scroll, THE Portafolio_Público SHALL ejecutar una animación de entrada con una duración entre 300ms y 600ms, activándose cuando al menos el 20% de la sección sea visible
2. THE Portafolio_Público SHALL renderizar correctamente sin superposición de elementos ni desbordamiento horizontal en los siguientes breakpoints: móvil (320px–767px), tablet (768px–1023px) y escritorio (1024px en adelante)
3. THE Portafolio_Público SHALL incluir un hero section que muestre un video de fondo o imagen estática de respaldo, el nombre del Administrador, su título profesional y un botón de llamada a la acción que dirija a la sección de contacto
4. IF el video de fondo del hero section no puede cargarse en un máximo de 5 segundos, THEN THE Portafolio_Público SHALL mostrar la imagen estática de respaldo sin afectar la visibilidad del texto superpuesto
5. THE Portafolio_Público SHALL implementar transiciones animadas entre secciones con una duración entre 200ms y 400ms utilizando funciones de easing no lineales
6. THE Portafolio_Público SHALL cargar la primera vista significativa (Largest Contentful Paint) en menos de 2.5 segundos en conexiones 4G
7. THE Portafolio_Público SHALL soportar modo claro y modo oscuro con un toggle visible en la navegación que sea operable mediante teclado y tenga un aria-label descriptivo, y SHALL persistir la preferencia del usuario entre sesiones mediante almacenamiento local
8. IF el sistema operativo o navegador del Visitante tiene activada la preferencia de movimiento reducido (prefers-reduced-motion: reduce), THEN THE Portafolio_Público SHALL desactivar todas las animaciones de entrada y transiciones

### Requisito 11: Sección de Testimonios en el Portafolio Público

**User Story:** Como Visitante, quiero ver testimonios de clientes anteriores, para que pueda evaluar la calidad del servicio antes de contactar.

#### Acceptance Criteria

1. IF hay al menos un testimonio publicado, THEN THE Portafolio_Público SHALL mostrar la sección de testimonios con nombre del cliente, cargo y texto del testimonio, mostrando un máximo de 500 caracteres por testimonio con indicador de truncamiento si el texto excede ese límite
2. IF hay 3 o menos testimonios publicados, THEN THE Portafolio_Público SHALL mostrarlos en un grid estático sin carrusel
3. IF hay más de 3 testimonios publicados, THEN THE Portafolio_Público SHALL mostrarlos en un carrusel con autoplay cada 5 segundos, controles de navegación anterior/siguiente, y pausar el autoplay cuando el usuario interactúa con los controles o hace hover/focus sobre el carrusel
4. IF la foto del cliente está disponible, THEN THE Portafolio_Público SHALL mostrarla junto al testimonio; de lo contrario, SHALL mostrar un avatar con las iniciales del nombre del cliente
5. IF no hay testimonios publicados, THEN THE Portafolio_Público SHALL ocultar la sección de testimonios completamente

### Requisito 12: SEO y Metadatos Dinámicos

**User Story:** Como Administrador, quiero que el portafolio tenga buen posicionamiento en buscadores, para que potenciales clientes me encuentren fácilmente.

#### Acceptance Criteria

1. THE Sistema_CMS SHALL generar metadatos dinámicos para cada página pública incluyendo title (máximo 60 caracteres), meta description (máximo 160 caracteres), y propiedades Open Graph (og:title, og:description, og:image, og:url)
2. THE Sistema_CMS SHALL generar un sitemap.xml que incluya todas las páginas públicas con estado publicado, y actualizarlo cada vez que se publique, despublique o elimine contenido
3. THE Sistema_CMS SHALL implementar datos estructurados JSON-LD utilizando el esquema Person para el perfil profesional y el esquema Service para cada servicio ofrecido, validables contra la especificación de schema.org
4. WHEN el Administrador modifica el título o descripción de un proyecto, THE Sistema_CMS SHALL actualizar los metadatos correspondientes de esa página sin requerir acciones adicionales del Administrador
5. IF un campo de contenido utilizado para generar metadatos está vacío, THEN THE Sistema_CMS SHALL utilizar valores por defecto basados en el nombre del sitio y la descripción general del perfil profesional
6. THE Sistema_CMS SHALL generar una etiqueta canonical URL para cada página pública para evitar contenido duplicado

### Requisito 13: Formulario de Contacto Mejorado

**User Story:** Como Visitante, quiero contactar al profesional de forma fácil, para que pueda solicitar sus servicios.

#### Acceptance Criteria

1. THE Portafolio_Público SHALL mostrar un formulario de contacto con campos de nombre (máximo 100 caracteres), email (máximo 254 caracteres), teléfono opcional (máximo 20 caracteres), asunto (máximo 150 caracteres) y mensaje (máximo 2000 caracteres)
2. WHEN un Visitante envía el formulario de contacto con todos los campos requeridos válidos, THE Sistema_CMS SHALL enviar un email de notificación al Administrador y almacenar el mensaje en la base de datos
3. WHEN un Visitante envía el formulario exitosamente, THE Portafolio_Público SHALL mostrar un mensaje de confirmación indicando que el mensaje fue recibido
4. IF un Visitante intenta enviar el formulario con campos requeridos vacíos o con un email en formato inválido, THEN THE Portafolio_Público SHALL indicar los campos con error, mostrar un mensaje descriptivo por cada campo inválido y no enviar el formulario
5. IF el envío del formulario falla por error del servidor o de red, THEN THE Portafolio_Público SHALL mostrar un mensaje de error indicando que el envío no se completó y preservar todos los datos ingresados en el formulario
6. WHEN el Administrador accede a la sección de mensajes del Panel_Admin, THE Panel_Admin SHALL mostrar los mensajes recibidos ordenados por fecha descendente con fecha, nombre del remitente y estado (leído/no leído), paginados en grupos de 20 mensajes
7. THE Sistema_CMS SHALL limitar el envío del formulario de contacto a un máximo de 5 mensajes por dirección IP en un período de 15 minutos para prevenir abuso

### Requisito 14: Dashboard del Panel de Administración

**User Story:** Como Administrador, quiero ver un resumen general al entrar al panel, para que tenga una visión rápida del estado de mi portafolio.

#### Acceptance Criteria

1. WHEN el Administrador accede al dashboard del Panel_Admin, THE Panel_Admin SHALL mostrar contadores numéricos de: proyectos publicados, servicios activos, mensajes no leídos y testimonios publicados
2. WHEN el Administrador accede al dashboard, THE Panel_Admin SHALL mostrar los últimos 5 mensajes de contacto recibidos, incluyendo para cada uno: nombre del remitente, asunto, fecha de recepción y estado (leído/no leído)
3. THE Panel_Admin SHALL incluir una barra de navegación lateral con acceso a las secciones: Dashboard, Proyectos, Servicios, Experiencia, Perfil, Estadísticas, Testimonios, Medios y Mensajes
4. THE Panel_Admin SHALL ser responsive y accesible en viewports desde 320px de ancho, permitiendo acceso y operación completa de todas las funciones de navegación y visualización de datos en dispositivos móviles y tablets
5. IF ocurre un error al cargar los datos del dashboard, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando la falla y ofrecer la opción de reintentar la carga

### Requisito 15: Actualización de Dependencias y Stack Tecnológico

**User Story:** Como Administrador, quiero que el portafolio utilice versiones actualizadas de sus dependencias, para que el sistema sea seguro, performante y mantenible a largo plazo.

#### Acceptance Criteria

1. THE Sistema_CMS SHALL utilizar Next.js 15 (o la última versión estable disponible) con App Router como framework principal
2. THE Sistema_CMS SHALL utilizar React 19 (o la última versión estable disponible) como librería de UI
3. THE Sistema_CMS SHALL reemplazar las dependencias obsoletas o redundantes: react-reveal (sin mantenimiento) por framer-motion actualizado, y consolidar react-hot-toast con el sistema de toast de Radix UI ya existente
4. THE Sistema_CMS SHALL actualizar framer-motion a la versión 11 o superior para compatibilidad con React 19
5. THE Sistema_CMS SHALL actualizar embla-carousel a versiones estables (no release candidates) compatibles con React 19
6. THE Sistema_CMS SHALL utilizar Tailwind CSS 4 (o la última versión estable) con su nuevo motor de configuración
7. IF una dependencia actualizada introduce breaking changes, THEN THE Sistema_CMS SHALL adaptar el código existente para mantener la funcionalidad actual sin regresiones visibles para el usuario
8. THE Sistema_CMS SHALL eliminar dependencias no utilizadas o duplicadas del package.json para reducir el tamaño del bundle

### Requisito 16: Subida y Almacenamiento de Archivos

**User Story:** Como Administrador, quiero subir archivos de forma sencilla, para que pueda agregar contenido visual sin conocimientos técnicos.

#### Acceptance Criteria

1. WHEN el Administrador arrastra un archivo al área de subida o hace clic para seleccionar un archivo, THE Panel_Admin SHALL mostrar una vista previa del archivo (miniatura para imágenes, icono representativo para videos) antes de confirmar la subida
2. WHEN el Administrador confirma la subida de un archivo con formato válido (JPG, PNG, WebP, MP4 o WebM), THE Sistema_CMS SHALL almacenar el archivo en un servicio de almacenamiento en la nube y guardar la referencia en la base de datos
3. WHILE un archivo se está subiendo, THE Panel_Admin SHALL mostrar una barra de progreso con el porcentaje completado
4. IF el archivo excede el tamaño máximo permitido (5MB para imágenes, 50MB para videos), THEN THE Panel_Admin SHALL mostrar un mensaje indicando el tamaño máximo según el tipo de archivo y rechazar la subida sin iniciar la transferencia
5. THE Sistema_CMS SHALL generar URLs públicas para los archivos subidos servidas a través de CDN
6. IF la subida de un archivo falla por error de red o del servidor, THEN THE Panel_Admin SHALL mostrar un mensaje de error indicando el fallo, preservar el archivo seleccionado y permitir reintentar la subida
