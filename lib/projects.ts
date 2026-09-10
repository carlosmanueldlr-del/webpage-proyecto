export type ProjectCategory = "RESIDENTIAL" | "INTERIOR";

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
    category: "RESIDENTIAL",
    year: "2026",
    location: "GUADALAJARA, MX",
    description:
      "CASA OLIVO EXPLORES THE RELATIONSHIP BETWEEN NATURAL LIGHT, TEXTURE AND DOMESTIC LIFE. THE PROJECT USES A LIMITED MATERIAL PALETTE TO CREATE WARM, QUIET AND TIMELESS SPACES.",
    cover: { seed: "olivo-cover", ratio: "landscape" },
    gallery: [
      { seed: "olivo-01", ratio: "landscape", caption: "SOUTH FAÇADE, EXPOSED CONCRETE AND OAK" },
      { seed: "olivo-02", ratio: "portrait", caption: "STAIR DETAIL" },
      { seed: "olivo-03", ratio: "portrait", caption: "LIVING ROOM, NORTH LIGHT" },
      { seed: "olivo-04", ratio: "landscape" },
      { seed: "olivo-05", ratio: "square", caption: "TRAVERTINE THRESHOLD" },
      { seed: "olivo-06", ratio: "landscape", caption: "COURTYARD AT DUSK" },
    ],
  },
  {
    slug: "casa-luz",
    index: "002",
    name: "CASA LUZ",
    category: "RESIDENTIAL",
    year: "2026",
    location: "ZAPOPAN, MX",
    description:
      "CASA LUZ IS ORGANISED AROUND A SINGLE SHAFT OF LIGHT THAT MOVES THROUGH THE HOUSE ACROSS THE DAY. ROOMS ARE ARRANGED TO FOLLOW ITS PATH, TURNING LIGHT ITSELF INTO A MATERIAL.",
    cover: { seed: "luz-cover", ratio: "landscape" },
    gallery: [
      { seed: "luz-01", ratio: "landscape", caption: "LIGHT SHAFT, DOUBLE HEIGHT VOID" },
      { seed: "luz-02", ratio: "landscape" },
      { seed: "luz-03", ratio: "portrait", caption: "KITCHEN, HONED LIMESTONE" },
      { seed: "luz-04", ratio: "portrait" },
      { seed: "luz-05", ratio: "landscape", caption: "MASTER BEDROOM, WEST WALL" },
    ],
  },
  {
    slug: "casa-patio",
    index: "003",
    name: "CASA PATIO",
    category: "RESIDENTIAL",
    year: "2025",
    location: "TLAQUEPAQUE, MX",
    description:
      "A HOUSE BUILT AROUND AN INTERIOR COURTYARD, CASA PATIO REINTERPRETS THE TRADITIONAL MEXICAN PATIO AS A DEVICE FOR VENTILATION, PRIVACY AND SLOW, DAILY RITUAL.",
    cover: { seed: "patio-cover", ratio: "portrait", src: "/images/projects/casa-patio/cover.jpg" },
    gallery: [
      { seed: "patio-01", ratio: "square", caption: "CENTRAL COURTYARD" },
      { seed: "patio-02", ratio: "landscape" },
      { seed: "patio-03", ratio: "portrait", caption: "CORRIDOR, RAMMED EARTH WALL" },
      { seed: "patio-04", ratio: "landscape", caption: "DINING AREA OVERLOOKING PATIO" },
      { seed: "patio-05", ratio: "portrait" },
    ],
    beforeAfter: {
      before: { seed: "patio-before", ratio: "landscape" },
      after: { seed: "patio-after", ratio: "landscape" },
      caption: "MAIN COURTYARD, PRIOR STRUCTURE VS. CURRENT STATE",
    },
  },
  {
    slug: "casa-sierra",
    index: "004",
    name: "CASA SIERRA",
    category: "RESIDENTIAL",
    year: "2025",
    location: "VALLE DE BRAVO, MX",
    description:
      "SET AGAINST A FOREST SLOPE, CASA SIERRA USES A RESTRAINED STRUCTURE OF TIMBER AND STONE TO DISSOLVE THE BOUNDARY BETWEEN INTERIOR AND LANDSCAPE.",
    cover: { seed: "sierra-cover", ratio: "landscape" },
    gallery: [
      { seed: "sierra-01", ratio: "landscape", caption: "NORTH ELEVATION AMONG PINES" },
      { seed: "sierra-02", ratio: "portrait" },
      { seed: "sierra-03", ratio: "landscape", caption: "LIVING AREA, FULL-HEIGHT GLAZING" },
      { seed: "sierra-04", ratio: "square", caption: "STONE HEARTH DETAIL" },
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
      "AN INTERIOR RENOVATION FOR A 1940S APARTMENT IN ROMA NORTE. ORIGINAL PARQUET AND MOULDINGS WERE PRESERVED AND SET AGAINST A NEW, QUIETER LAYER OF PLASTER AND STEEL.",
    cover: { seed: "roma-cover", ratio: "portrait", src: "/images/projects/apartamento-roma/cover.jpg" },
    gallery: [
      { seed: "roma-01", ratio: "landscape", caption: "LIVING ROOM, ORIGINAL PARQUET" },
      { seed: "roma-02", ratio: "portrait", caption: "STEEL-FRAMED PASSAGE" },
      { seed: "roma-03", ratio: "square" },
      { seed: "roma-04", ratio: "landscape", caption: "STUDY, RESTORED MOULDING" },
    ],
    beforeAfter: {
      before: { seed: "roma-before", ratio: "portrait" },
      after: { seed: "roma-after", ratio: "portrait" },
      caption: "LIVING ROOM, ORIGINAL CONDITION VS. RENOVATION",
    },
  },
  {
    slug: "casa-jardin",
    index: "006",
    name: "CASA JARDÍN",
    category: "RESIDENTIAL",
    year: "2024",
    location: "GUADALAJARA, MX",
    description:
      "A 1970S FAMILY HOME RECONFIGURED AROUND ITS OVERGROWN GARDEN. THE RENOVATION REMOVES INTERIOR PARTITIONS TO LET PLANTED COURTYARDS REACH DEEPER INTO THE HOUSE.",
    cover: { seed: "jardin-cover", ratio: "landscape" },
    gallery: [
      { seed: "jardin-01", ratio: "landscape", caption: "GARDEN FAÇADE AFTER RENOVATION" },
      { seed: "jardin-02", ratio: "portrait" },
      { seed: "jardin-03", ratio: "landscape", caption: "OPEN PLAN LIVING/DINING" },
      { seed: "jardin-04", ratio: "square", caption: "RECLAIMED BRICK DETAIL" },
      { seed: "jardin-05", ratio: "portrait" },
    ],
    beforeAfter: {
      before: { seed: "jardin-before", ratio: "landscape" },
      after: { seed: "jardin-after", ratio: "landscape" },
      caption: "GARDEN FAÇADE, 1970S ORIGINAL VS. 2024 RENOVATION",
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
    name: "ARCHITECTURE",
    description:
      "FULL ARCHITECTURAL DESIGN, FROM EARLY CONCEPT AND MASTERPLANNING THROUGH TO CONSTRUCTION DOCUMENTATION AND SITE SUPERVISION.",
  },
  {
    index: "02",
    name: "INTERIOR DESIGN",
    description:
      "SPATIAL AND MATERIAL DESIGN FOR RESIDENTIAL AND COMMERCIAL INTERIORS, INCLUDING BESPOKE JOINERY AND FURNITURE SELECTION.",
  },
  {
    index: "03",
    name: "RENOVATION",
    description:
      "SENSITIVE INTERVENTION IN EXISTING STRUCTURES — BALANCING PRESERVATION, PERFORMANCE AND CONTEMPORARY DOMESTIC NEEDS.",
  },
  {
    index: "04",
    name: "SPACE PLANNING",
    description:
      "LAYOUT AND PROGRAMME STRATEGY FOR NEW AND EXISTING SPACES, OPTIMISING CIRCULATION, LIGHT AND SPATIAL HIERARCHY.",
  },
  {
    index: "05",
    name: "DESIGN CONSULTING",
    description:
      "ADVISORY SUPPORT FOR ARCHITECTS, DEVELOPERS AND HOMEOWNERS ON MATERIALITY, DETAILING AND DESIGN DIRECTION.",
  },
];

export const studio = {
  name: "JOANA",
  descriptor: "ARCHITECTURE / INTERIORS",
  email: "hello@joana.com",
  instagram: "@joana.architecture",
  location: "GUADALAJARA, MEXICO",
};
