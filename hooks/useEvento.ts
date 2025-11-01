import { EstadisticasDto, EventoDto } from "@/api/dto/evento.dto";
import { getEstadisticas, getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/context/useComentarios";
import { useEffect, useState } from "react";
import { useProductora } from "./context/useProductora";

export const useEvento = (id?: string | number) => {
  const eventoId = Number(id);
  const { comentarios, cargarComentarios } = useComentarios();
  const { getProductora, productora } = useProductora();
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [estadisticas, setEstadisticas] = useState<EstadisticasDto | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventoId) return;

    let cancelled = false;

    const fetchEvento = async () => {
      setLoading(true);
      setError(null);

      try {
        const evt = await getEventoById(eventoId);
        if (!cancelled) setEvento(evt);

        await cargarComentarios(eventoId);
        await getProductora(Number(evt.productora.userId));
        const estadisticas = await getEstadisticas(eventoId);
        setEstadisticas(estadisticas);
      } catch (err) {
        console.error("No se pudo cargar el evento.", err);
        if (!cancelled) setError("No se pudo cargar el evento.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEvento();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line
  }, [eventoId]);

  const cuentaBancaria = evento?.cuentaBancaria;

  return {
    evento,
    comentarios,
    estadisticas,
    loading,
    error,
    productora,
    cuentaBancaria,
  };
};
