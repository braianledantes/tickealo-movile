import { EstadisticasDto } from "@/api/dto/evento.dto";
import { getEstadisticas } from "@/api/events";
import React, { createContext, useState } from "react";

interface Props {
  cargarEstadisticas: (
    eventoId: number,
  ) => Promise<EstadisticasDto | undefined>;
  estadisticas: EstadisticasDto | null;
  loading: boolean;
  error: string | null;
}

export const EstadisticasContext = createContext<Props | undefined>(undefined);

export const EstadisticasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasDto | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarEstadisticas = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEstadisticas(eventoId);
      setEstadisticas(response);
      return response;
    } catch (err: any) {
      setError("No se pudo obtener el comentario.");
      console.error("Error obteniendo estadisticas:", err);
      setEstadisticas(null);
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return (
    <EstadisticasContext.Provider
      value={{ estadisticas, cargarEstadisticas, loading, error }}
    >
      {children}
    </EstadisticasContext.Provider>
  );
};
