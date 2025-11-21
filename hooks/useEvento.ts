import { EventoDto } from "@/api/dto/evento.dto";
import { getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/context/useComentarios";
import { useEffect, useState } from "react";
import { useEstadisticas } from "./context/useEstadisticas";

export const useEvento = (id?: string | number) => {
  const eventoId = Number(id);
  const { comentarios, cargarComentarios } = useComentarios();
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const { estadisticas, cargarEstadisticas } = useEstadisticas();
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
        await cargarEstadisticas(eventoId);
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

  useEffect(() => {
    if (!eventoId) return;
    cargarEstadisticas(eventoId);
    // eslint-disable-next-line
  }, [comentarios]);

  const cuentaBancaria = evento?.cuentaBancaria;

  return {
    evento,
    comentarios,
    estadisticas,
    loading,
    error,
    cuentaBancaria,
  };
};
