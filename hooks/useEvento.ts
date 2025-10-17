import { EventoDto } from "@/api/dto/evento.dto";
import { EventosContext } from "@/context/EventosContext";
import { useContext, useEffect, useState } from "react";

export const useEvento = (id?: string | number) => {
  const context = useContext(EventosContext);
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventoId = Number(id);

  useEffect(() => {
    if (!context || !eventoId) return;

    let cancelled = false;
    const fetchEvento = async () => {
      setLoading(true);
      setError(null);

      // Primero intentamos buscar en el listado de events
      const fromContext = context.events.find((e) => e.id === eventoId);
      if (fromContext) {
        if (!cancelled) {
          setEvento(fromContext);
          setLoading(false);
        }
        return;
      }

      try {
        const evt = await context.getEvento(eventoId);
        if (!cancelled) {
          setEvento(evt ?? null);
        }
      } catch (err) {
        if (!cancelled) setError("No se pudo cargar el evento.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEvento();
    return () => {
      cancelled = true;
    };
  }, [eventoId, context]);

  return {
    evento,
    loading,
    error,
    productoraId: evento?.productora?.userId ?? null,
  };
};
