import { EstadisticasDto, EventoDto } from "@/api/dto/evento.dto";
import { getEstadisticas, getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/useComentarios";
import { useEffect, useState } from "react";

export const useEvento = (id?: string | number) => {
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estadisticas, setEstadisticas] = useState<EstadisticasDto | null>(
    null,
  );

  const eventoId = Number(id);
  const { comentarios, cargarComentarios } = useComentarios();

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

  const productora = evento?.productora;
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
