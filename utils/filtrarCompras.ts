import { CompraDto } from "@/api/dto/compras.dto";

// Función principal que filtra todas las secciones
export function filtrarCompras(compras: CompraDto[]) {
  const hoyISO = new Date().toISOString().split("T")[0];

  // Compras hechas hoy
  const compraReciente = compras.filter((c) => {
    const fecha = new Date(c.createdAt).toISOString().split("T")[0];
    return fecha === hoyISO;
  });

  //Compras pendientes (productora aún no validó el comprobante)
  const compraPendiente = compras.filter((c) => c.estado === "PENDIENTE");

  // Compras aceptadas (productora aprobó el comprobante)
  const compraAceptada = compras.filter((c) => c.estado === "ACEPTADA");

  // Compras rechazadas (productora no aceptó)
  const compraRechazada = compras.filter((c) => c.estado === "RECHAZADA");

  return {
    compraReciente,
    compraPendiente,
    compraAceptada,
    compraRechazada,
  };
}

// Tipo de filtro
export type Filtro =
  | "TODAS"
  | "RECIENTES"
  | "PENDIENTES"
  | "ACEPTADAS"
  | "RECHAZADAS";

// Metadatos asociados a cada tipo de compra
export const META_FILTROS: Record<
  Filtro,
  { titulo: string; mensaje?: string; colorTexto: string }
> = {
  TODAS: {
    titulo: "TODAS MIS COMPRAS",
    colorTexto: "#CAF0F8",
  },
  RECIENTES: {
    titulo: "MIS COMPRAS RECIENTES",
    colorTexto: "#CAF0F8",
  },
  PENDIENTES: {
    titulo: "COMPRAS PENDIENTES",
    colorTexto: "#CAF0F8",
  },
  ACEPTADAS: {
    titulo: "COMPRAS ACEPTADAS",
    colorTexto: "#CAF0F8",
    mensaje:
      "¡Todo listo! Dirigite a la sección 'Mis tickets' y muestra el QR al ingresar al evento.",
  },
  RECHAZADAS: {
    titulo: "COMPRAS RECHAZADAS",
    mensaje:
      "Tu compra fue rechazada debido a una verificación no válida. Si creés que es un error, contactá a la productora.",
    colorTexto: "#FF002E",
  },
};

// Función para obtener compras según un filtro específico
export function obtenerComprasPorFiltro(compras: CompraDto[], filtro: Filtro) {
  const { compraReciente, compraPendiente, compraAceptada, compraRechazada } =
    filtrarCompras(compras);

  switch (filtro) {
    case "RECIENTES":
      return compraReciente;
    case "PENDIENTES":
      return compraPendiente;
    case "ACEPTADAS":
      return compraAceptada;
    case "RECHAZADAS":
      return compraRechazada;
    case "TODAS":
      return compras;
    default:
      return compras;
  }
}

// Colores para etiquetas visuales
export function getEstadoVisual(estadoRaw?: string) {
  const estado = estadoRaw?.toUpperCase() || "";

  if (estado.includes("RECIENTES")) {
    return { label: "RECIENTES", color: "#00b4ff", bg: "#001f2e" };
  }
  if (estado.includes("ACEPTADA")) {
    return { label: "ACEPTADA", color: "#00ff9d", bg: "#003d1f" };
  }
  if (estado.includes("PENDIENTE")) {
    return { label: "PENDIENTE", color: "#cccccc", bg: "#333333" };
  }
  if (estado.includes("RECHAZADA")) {
    return { label: "RECHAZADA", color: "#ff4d4d", bg: "#3d0000" };
  }

  return { label: "SIN ESTADO", color: "#999", bg: "#222" };
}
