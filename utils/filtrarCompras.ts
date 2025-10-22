import { CompraDto } from "@/api/dto/compras.dto";

// Función principal que filtra todas las secciones
export function filtrarCompras(compras: CompraDto[]) {
  const hoy = new Date();
  const hoyISO = hoy.toISOString().split("T")[0]; // formato YYYY-MM-DD

  const compraReciente = compras.filter((c) => {
    if (!c.createdAt) return false;
    const fechaCompra = new Date(c.createdAt).toISOString().split("T")[0];
    return fechaCompra === hoyISO; // compras hechas hoy
  });

  const compraRechazada = compras.filter((c) => c.estado === "RECHAZADA");

  const compraAceptada = compras.filter(
    (c) =>
      c.estado === "ACEPTADA" &&
      c.tickets.some((t) => t.estado === "PENDIENTE_VALIDACION"),
  );

  const entradasPorUsar = compras.filter(
    (c) =>
      c.estado === "ACEPTADA" &&
      c.tickets.some((t) => t.estado === "PENDIENTE_VALIDACION"),
  );

  const entradasYaUsadas = compras.filter(
    (c) =>
      c.estado === "ACEPTADA" &&
      c.tickets.every((t) => t.estado === "VALIDADO"),
  );

  return {
    compraReciente,
    compraRechazada,
    compraAceptada,
    entradasPorUsar,
    entradasYaUsadas,
  };
}

// Tipo de filtro
export type Filtro =
  | "TODAS"
  | "RECIENTES"
  | "ACEPTADAS"
  | "POR_USAR"
  | "YA_USADAS"
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
  ACEPTADAS: {
    titulo: "COMPRAS ACEPTADAS",
    colorTexto: "#CAF0F8",
    mensaje:
      "¡Todo listo! Dirigite a la sección 'Mis tickets' y muestra el QR al ingresar al evento.",
  },
  POR_USAR: {
    titulo: "ENTRADAS POR USAR",
    colorTexto: "#CAF0F8",
  },
  YA_USADAS: {
    titulo: "ENTRADAS YA USADAS",
    colorTexto: "#CAF0F8",
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
  const {
    compraReciente,
    compraRechazada,
    compraAceptada,
    entradasPorUsar,
    entradasYaUsadas,
  } = filtrarCompras(compras);

  switch (filtro) {
    case "RECIENTES":
      return compraReciente;
    case "ACEPTADAS":
      return compraAceptada;
    case "POR_USAR":
      return entradasPorUsar;
    case "YA_USADAS":
      return entradasYaUsadas;
    case "RECHAZADAS":
      return compraRechazada;
    case "TODAS":
    default:
      return compras;
  }
}

// Colores para etiquetas visuales
export function getEstadoVisual(estadoRaw?: string) {
  const estado = estadoRaw?.toUpperCase() || "";

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
