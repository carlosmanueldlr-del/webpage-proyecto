export type ProjectCategory = "RESIDENCIAL" | "INTERIOR";

export type ImageRatio = "landscape" | "portrait" | "square";

export interface ProjectImage {
  /** Deterministic seed used to generate the placeholder photograph. */
  seed: string;
  ratio: ImageRatio;
  caption?: string;
  /** Optional path to a real photograph, e.g. "/images/projects/casa-olivo/02.jpg".
   *  Drop the file into /public and set this field — no other code changes
   *  needed. Leave undefined to keep showing the generated placeholder. */
  src?: string;
}

export interface BeforeAfterPair {
  before: ProjectImage;
  after: ProjectImage;
  caption?: string;
}

export interface Project {
  slug: string;
  index: string; // "001"
  name: string; // "CASA OLIVO"
  category: ProjectCategory;
  year: string;
  location: string;
  description: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  beforeAfter?: BeforeAfterPair;
}

export const projects: Project[] = [
  {
    slug: "casa-olivo",
    index: "001",
    name: "CASA OLIVO",
    category: "RESIDENCIAL",
    year: "2026",
    location: "GUADALAJARA, MX",
    description:
      "CASA OLIVO EXPLORA LA RELACIÓN ENTRE LA LUZ NATURAL, LA TEXTURA Y LA VIDA DOMÉSTICA. EL PROYECTO UTILIZA UNA PALETA DE MATERIALES LIMITADA PARA CREAR ESPACIOS CÁLIDOS, SERENOS Y ATEMPORALES.",
    cover: { seed: "olivo-cover", ratio: "landscape" },
    gallery: [
      { seed: "olivo-01", ratio: "landscape", caption: "FACHADA SUR, CONCRETO EXPUESTO Y ROBLE" },
      { seed: "olivo-02", ratio: "portrait", caption: "DETALLE DE ESCALERA" },
      { seed: "olivo-03", ratio: "portrait", caption: "SALA, LUZ NORTE" },
      { seed: "olivo-04", ratio: "landscape" },
      { seed: "olivo-05", ratio: "square", caption: "UMBRAL DE TRAVERTINO" },
      { seed: "olivo-06", ratio: "landscape", caption: "PATIO AL ATARDECER" },
    ],
  },
  {
    slug: "casa-luz",
    index: "002",
    name: "CASA LUZ",
    category: "RESIDENCIAL",
    year: "2026",
    location: "ZAPOPAN, MX",
    description:
      "CASA LUZ SE ORGANIZA ALREDEDOR DE UN ÚNICO HAZ DE LUZ QUE RECORRE LA CASA A LO LARGO DEL DÍA. LOS ESPACIOS SE DISPONEN SIGUIENDO SU TRAYECTORIA, CONVIRTIENDO LA LUZ MISMA EN UN MATERIAL.",
    cover: { seed: "luz-cover", ratio: "landscape" },
    gallery: [
      { seed: "luz-01", ratio: "landscape", caption: "HAZ DE LUZ, VACÍO DE DOBLE ALTURA" },
      { seed: "luz-02", ratio: "landscape" },
      { seed: "luz-03", ratio: "portrait", caption: "COCINA, PIEDRA CALIZA PULIDA" },
      { seed: "luz-04", ratio: "portrait" },
      { seed: "luz-05", ratio: "landscape", caption: "RECÁMARA PRINCIPAL, MURO PONIENTE" },
    ],
  },
  {
    slug: "casa-patio",
    index: "003",
    name: "CASA PATIO",
    category: "RESIDENCIAL",
    year: "2025",
    location: "TLAQUEPAQUE, MX",
    description:
      "UNA CASA CONSTRUIDA ALREDEDOR DE UN PATIO INTERIOR, CASA PATIO REINTERPRETA EL PATIO TRADICIONAL MEXICANO COMO UN DISPOSITIVO DE VENTILACIÓN, PRIVACIDAD Y RITUAL COTIDIANO PAUSADO.",
    cover: { seed: "patio-cover", ratio: "portrait", src: "/images/projects/casa-patio/cover.jpg" },
    gallery: [
      { seed: "patio-01", ratio: "square", caption: "PATIO CENTRAL" },
      { seed: "patio-02", ratio: "landscape" },
      { seed: "patio-03", ratio: "portrait", caption: "PASILLO, MURO DE TIERRA APISONADA" },
      { seed: "patio-04", ratio: "landscape", caption: "COMEDOR CON VISTA AL PATIO" },
      { seed: "patio-05", ratio: "portrait" },
    ],
    beforeAfter: {
      before: { seed: "patio-before", ratio: "landscape" },
      after: { seed: "patio-after", ratio: "landscape" },
      caption: "PATIO PRINCIPAL, ESTRUCTURA ANTERIOR VS. ESTADO ACTUAL",
    },
  },
  {
    slug: "casa-sierra",
    index: "004",
    name: "CASA SIERRA",
    category: "RESIDENCIAL",
    year: "2025",
    location: "VALLE DE BRAVO, MX",
    description:
      "ASENTADA SOBRE UNA LADERA BOSCOSA, CASA SIERRA UTILIZA UNA ESTRUCTURA CONTENIDA DE MADERA Y PIEDRA PARA DISOLVER EL LÍMITE ENTRE EL INTERIOR Y EL PAISAJE.",
    cover: { seed: "sierra-cover", ratio: "landscape" },
    gallery: [
      { seed: "sierra-01", ratio: "landscape", caption: "FACHADA NORTE ENTRE PINOS" },
      { seed: "sierra-02", ratio: "portrait" },
      { seed: "sierra-03", ratio: "landscape", caption: "SALA, VENTANALES DE ALTURA COMPLETA" },
      { seed: "sierra-04", ratio: "square", caption: "DETALLE DE CHIMENEA DE PIEDRA" },
      { seed: "sierra-05", ratio: "portrait" },
      { seed: "sierra-06", ratio: "landscape" },
    ],
  },
  {
    slug: "apartamento-roma",
    index: "005",
    name: "APARTAMENTO ROMA",
    category: "INTERIOR",
    year: "2025",
    location: "CIUDAD DE MÉXICO, MX",
    description:
      "UNA RENOVACIÓN INTERIOR PARA UN DEPARTAMENTO DE LOS AÑOS 40 EN ROMA NORTE. EL PARQUET Y LAS MOLDURAS ORIGINALES SE CONSERVARON Y SE CONTRASTARON CON UNA NUEVA CAPA, MÁS SERENA, DE YESO Y ACERO.",
    cover: { seed: "roma-cover", ratio: "portrait", src: "/images/projects/apartamento-roma/cover.jpg" },
    gallery: [
      { seed: "roma-01", ratio: "landscape", caption: "SALA, PARQUET ORIGINAL" },
      { seed: "roma-02", ratio: "portrait", caption: "PASILLO CON MARCO DE ACERO" },
      { seed: "roma-03", ratio: "square" },
      { seed: "roma-04", ratio: "landscape", caption: "ESTUDIO, MOLDURA RESTAURADA" },
    ],
    beforeAfter: {
      before: { seed: "roma-before", ratio: "portrait" },
      after: { seed: "roma-after", ratio: "portrait" },
      caption: "SALA, ESTADO ORIGINAL VS. RENOVACIÓN",
    },
  },
  {
    slug: "casa-jardin",
    index: "006",
    name: "CASA JARDÍN",
    category: "RESIDENCIAL",
    year: "2024",
    location: "GUADALAJARA, MX",
    description:
      "UNA CASA FAMILIAR DE LOS AÑOS 70 RECONFIGURADA ALREDEDOR DE SU JARDÍN CRECIDO. LA RENOVACIÓN ELIMINA DIVISIONES INTERIORES PARA QUE LOS PATIOS AJARDINADOS PENETREN MÁS PROFUNDO EN LA CASA.",
    cover: { seed: "jardin-cover", ratio: "landscape" },
    gallery: [
      { seed: "jardin-01", ratio: "landscape", caption: "FACHADA AL JARDÍN DESPUÉS DE LA RENOVACIÓN" },
      { seed: "jardin-02", ratio: "portrait" },
      { seed: "jardin-03", ratio: "landscape", caption: "SALA-COMEDOR DE PLANTA ABIERTA" },
      { seed: "jardin-04", ratio: "square", caption: "DETALLE DE LADRILLO RECUPERADO" },
      { seed: "jardin-05", ratio: "portrait" },
    ],
    beforeAfter: {
      before: { seed: "jardin-before", ratio: "landscape" },
      after: { seed: "jardin-after", ratio: "landscape" },
      caption: "FACHADA AL JARDÍN, ORIGINAL DE LOS 70 VS. RENOVACIÓN 2024",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];
  return { previous, next };
}

export const services = [
  {
    index: "01",
    name: "ARQUITECTURA",
    description:
      "DISEÑO ARQUITECTÓNICO COMPLETO, DESDE EL CONCEPTO INICIAL Y LA PLANEACIÓN MAESTRA HASTA LA DOCUMENTACIÓN DE OBRA Y LA SUPERVISIÓN EN SITIO.",
  },
  {
    index: "02",
    name: "DISEÑO DE INTERIORES",
    description:
      "DISEÑO ESPACIAL Y DE MATERIALES PARA INTERIORES RESIDENCIALES Y COMERCIALES, INCLUYENDO CARPINTERÍA A MEDIDA Y SELECCIÓN DE MOBILIARIO.",
  },
  {
    index: "03",
    name: "RENOVACIÓN",
    description:
      "INTERVENCIÓN SENSIBLE EN ESTRUCTURAS EXISTENTES — EQUILIBRANDO CONSERVACIÓN, DESEMPEÑO Y NECESIDADES DOMÉSTICAS CONTEMPORÁNEAS.",
  },
  {
    index: "04",
    name: "PLANEACIÓN DE ESPACIOS",
    description:
      "ESTRATEGIA DE DISTRIBUCIÓN Y PROGRAMA PARA ESPACIOS NUEVOS Y EXISTENTES, OPTIMIZANDO CIRCULACIÓN, LUZ Y JERARQUÍA ESPACIAL.",
  },
  {
    index: "05",
    name: "CONSULTORÍA DE DISEÑO",
    description:
      "ASESORÍA PARA ARQUITECTOS, DESARROLLADORES Y PROPIETARIOS SOBRE MATERIALIDAD, DETALLE Y DIRECCIÓN DE DISEÑO.",
  },
];

export const studio = {
  name: "JOANA",
  descriptor: "ARQUITECTURA / INTERIORES",
  email: "hello@joana.com",
  instagram: "@joana.architecture",
  location: "GUADALAJARA, MÉXICO",
};
