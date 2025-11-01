import { EventoDto, ProductoraDto } from "@/api/dto/evento.dto";
import { getEventosById, getProductoraById } from "@/api/productora";
import React, { createContext, useState } from "react";

interface ProductoraContextType {
  loadingProductora: boolean;
  loading: boolean;
  error: string | null;
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  getEventosFinalizadosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  getEventosProximosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  getProductora: (idProductora: number) => Promise<ProductoraDto | undefined>;
}

export const ProductoraContext = createContext<
  ProductoraContextType | undefined
>(undefined);

export const ProductoraProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingProductora, setLoadingProductora] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEventosByProductora = async (idProductora: number) => {
    setLoading(true);
    setError(null);
    try {
      const eventos = await getEventosById(idProductora);
      return eventos;
    } catch (err: any) {
      console.error("Error obteniendo eventos de productora:", err);
      setError("No se pudieron cargar los eventos de la productora.");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const getEventosFinalizadosByProductora = async (idProductora: number) => {
    const eventos = await getEventosByProductora(idProductora);
    if (!eventos) return [];
    const hoy = new Date();
    return eventos.filter((evento) => new Date(evento.finAt) < hoy);
  };

  const getEventosProximosByProductora = async (idProductora: number) => {
    const eventos = await getEventosByProductora(idProductora);
    if (!eventos) return [];
    const hoy = new Date();
    return eventos.filter((evento) => new Date(evento.inicioAt) >= hoy);
  };

  const getProductora = async (idProductora: number) => {
    setLoadingProductora(true);
    setError(null);
    try {
      const productora = await getProductoraById(idProductora);
      return productora;
    } catch (err: any) {
      console.error("Error obteniendo productora:", err);
      setError("No se pudo cargar la productora.");
      return undefined;
    } finally {
      setLoadingProductora(false);
    }
  };

  return (
    <ProductoraContext.Provider
      value={{
        loading,
        loadingProductora,
        error,
        getEventosByProductora,
        getEventosFinalizadosByProductora,
        getEventosProximosByProductora,
        getProductora,
      }}
    >
      {children}
    </ProductoraContext.Provider>
  );
};
