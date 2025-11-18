import {
  finalizarCompra,
  getCompra,
  getCompras,
  getComprasFiltradas,
  iniciarCompra,
} from "@/api/compras";
import { CompraDto, ComprasResponse } from "@/api/dto/compras.dto";
import React, { createContext, useState } from "react";

interface ComprasContextProps {
  comprar: (body: {
    idEntrada: number;
    cant: number;
    cantPuntos: number;
  }) => Promise<CompraDto | undefined>;
  terminarCompra: (
    compraId: string | number,
    formData: FormData,
  ) => Promise<CompraDto | undefined>;
  misCompras: (
    page?: number,
    limit?: number,
  ) => Promise<ComprasResponse | void>;
  cargarComprasPorEstado: (
    estado: string,
    page?: number,
    limit?: number,
  ) => Promise<ComprasResponse | void>;
  miCompra: (compraId: number) => Promise<CompraDto | undefined>;

  compras: ComprasResponse | undefined;

  comprasPendientesValidacion: ComprasResponse | undefined;
  comprasValidadas: ComprasResponse | undefined;
  comprasRechazadas: ComprasResponse | undefined;
  comprasAceptadas: ComprasResponse | undefined;
  comprasPendientes: ComprasResponse | undefined;

  loadingMiCompra: boolean;
  loadingMisCompras: boolean;
  loading: boolean;
  error: string | null;
}

export const ComprasContext = createContext<ComprasContextProps | undefined>(
  undefined,
);

export const ComprasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingMisCompras, setLoadingMisCompras] = useState(false);
  const [loadingMiCompra, setLoadingMiCompra] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [compras, setCompras] = useState<ComprasResponse | undefined>(
    undefined,
  );

  const [comprasPendientesValidacion, setComprasPendientesValidacion] =
    useState<ComprasResponse | undefined>(undefined);
  const [comprasValidadas, setComprasValidadas] = useState<
    ComprasResponse | undefined
  >(undefined);
  const [comprasRechazadas, setComprasRechazadas] = useState<
    ComprasResponse | undefined
  >(undefined);
  const [comprasAceptadas, setComprasAceptadas] = useState<
    ComprasResponse | undefined
  >(undefined);
  const [comprasPendientes, setComprasPendientes] = useState<
    ComprasResponse | undefined
  >(undefined);

  const comprar = async (body: {
    idEntrada: number;
    cant: number;
    cantPuntos: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response: CompraDto = await iniciarCompra(body);
      return response;
    } catch (err) {
      setError("No se pudo reservar cupo de entrada.");
      console.error("Error realizando la compra:", err);
    } finally {
      setLoading(false);
    }
  };

  const terminarCompra = async (
    compraId: string | number,
    formData: FormData,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response: CompraDto = await finalizarCompra(compraId, formData);
      return response;
    } catch (err) {
      setError("No se pudo realizar compra.");
      console.error("Error finalizando la compra:", err);
    } finally {
      setLoading(false);
    }
  };

  const misCompras = async (page = 1, limit = 100) => {
    setLoadingMisCompras(true);
    setError(null);
    try {
      const response = await getCompras(page, limit);
      setCompras(response);
      return response;
    } catch (err) {
      setError("No se pudo obtener las compras.");
      console.error("Error obteniendo compras del usuario:", err);
    } finally {
      setLoadingMisCompras(false);
    }
  };

  const cargarComprasPorEstado = async (
    estado: string,
    page = 1,
    limit = 10,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getComprasFiltradas(page, limit, estado);
      if (!response) return;

      switch (estado) {
        case "ACEPTADA":
          const entradasPorUsar = response.data
            .map((compra) => {
              const ticketsPendientes = compra.tickets.filter(
                (t) => t.estado === "PENDIENTE_VALIDACION",
              );

              if (ticketsPendientes.length === 0) return;

              return {
                ...compra,
                tickets: ticketsPendientes,
              };
            })
            .filter((c): c is CompraDto => Boolean(c));

          const entradasYaUsadas = response.data.filter((compra) =>
            compra.tickets.every((t) => t.estado === "VALIDADO"),
          );

          setComprasPendientesValidacion({
            ...response,
            data: entradasPorUsar,
          });

          setComprasValidadas({ ...response, data: entradasYaUsadas });
          setComprasAceptadas(response);
          break;

        case "PENDIENTE":
          setComprasPendientes(response);
          break;

        case "RECHAZADA":
          setComprasRechazadas(response);
          break;

        default:
          console.warn(`Estado no manejado: ${estado}`);
      }

      return response;
    } catch (err) {
      setError(`No se pudo obtener las compras con estado ${estado}.`);
      console.error(
        `Error obteniendo compras del usuario estado ${estado}:`,
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  const miCompra = async (compraId: number) => {
    setLoadingMiCompra(true);
    setError(null);
    try {
      const response = await getCompra(compraId);
      return response;
    } catch (err) {
      setError("No se pudo obtener la compra.");
      console.error("Error obteniendo compra del usuario:", err);
    } finally {
      setLoadingMiCompra(false);
    }
  };

  return (
    <ComprasContext.Provider
      value={{
        comprar,
        terminarCompra,
        misCompras,
        cargarComprasPorEstado,
        miCompra,
        compras,
        comprasPendientesValidacion,
        comprasValidadas,
        comprasRechazadas,
        comprasAceptadas,
        comprasPendientes,
        loading,
        loadingMisCompras,
        loadingMiCompra,
        error,
      }}
    >
      {children}
    </ComprasContext.Provider>
  );
};
