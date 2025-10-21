import { ComentarioDto } from "@/api/dto/comentario.dto";
import { EventoDto } from "@/api/dto/evento.dto";
import { getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/useComentarios";
import { useEffect, useMemo, useState } from "react";

export const useEvento = (id?: string | number) => {
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [comentarios, setComentarios] = useState<ComentarioDto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { comentariosDeEvento } = useComentarios();

  const eventoId = Number(id);

  useEffect(() => {
    if (!eventoId) return;

    let cancelled = false;

    const fetchEventoYComentarios = async () => {
      setLoading(true);
      setError(null);

      try {
        const evt = await getEventoById(eventoId);
        const comentariosRes = await comentariosDeEvento(eventoId);

        if (!cancelled) {
          setEvento(evt);
          setComentarios(comentariosRes || []);
        }
      } catch (err) {
        console.log("No se pudo cargar el evento.", err);
        if (!cancelled) setError("No se pudo cargar el evento.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEventoYComentarios();

    return () => {
      cancelled = true;
    };
  }, [eventoId]);

  const mostrarComentarios = useMemo(() => {
    if (!evento) return false;

    const ahora = new Date();
    const finEvento = new Date(evento.finAt);

    // Retorna true si el evento ya finalizo
    return ahora >= finEvento;
  }, [evento]);

  return {
    evento,
    comentarios,
    mostrarComentarios,
    loading,
    error,
    productoraId: evento?.productora?.userId ?? null,
  };
};
