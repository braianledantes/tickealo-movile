import { EventoDto } from "@/api/dto/evento.dto";
import { getEventoById } from "@/api/events";
import { comentariosSimulados } from "@/utils/comentarios";
import { useEffect, useState } from "react";

export const useEvento = (id?: string | number) => {
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventoId = Number(id);

  useEffect(() => {
    if (!eventoId) return;

    let cancelled = false;
    const fetchEvento = async () => {
      setLoading(true);
      setError(null);

      try {
        const evt = await getEventoById(eventoId);

        if (!cancelled) {
          setEvento({
            ...evt,
            comentarios: comentariosSimulados(eventoId),
          });
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
  }, [getEventoById]);

  return {
    evento,
    loading,
    error,
    productoraId: evento?.productora?.userId ?? null,
  };
};
