import { CompraDto } from "@/api/dto/compras.dto";

// Función principal que filtra todas las secciones
export function filtrarCompras(compras: CompraDto[]) {
  const compraReciente = compras.filter(
    (c) =>
      c.estado === "PENDIENTE" &&
      c.tickets.some((t) => t.estado === "COMPRA_PENDIENTE"),
  );

  const compraRechazada = compras.filter((c) => c.estado === "RECHAZADA");

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

  return { compraReciente, compraRechazada, entradasPorUsar, entradasYaUsadas };
}

// Tipo de filtro
export type Filtro =
  | "TODAS"
  | "RECIENTES"
  | "POR_USAR"
  | "YA_USADAS"
  | "RECHAZADAS";

// Función para obtener compras según un filtro específico
export function obtenerComprasPorFiltro(compras: CompraDto[], filtro: Filtro) {
  const { compraReciente, compraRechazada, entradasPorUsar, entradasYaUsadas } =
    filtrarCompras(compras);

  switch (filtro) {
    case "RECIENTES":
      return compraReciente;
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
