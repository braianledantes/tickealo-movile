import { EventoDto } from "@/api/dto/evento.dto";
import { getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/useComentarios";
import { useEffect, useMemo, useState } from "react";

export const useEvento = (id?: string | number) => {
  const [evento, setEvento] = useState<EventoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const mostrarComentarios = useMemo(() => {
    if (!evento) return false;
    const ahora = new Date();
    const finEvento = new Date(evento.finAt);
    return ahora >= finEvento;
  }, [evento]);

  const productora = evento?.productora;
  const cuentaBancaria = evento?.cuentaBancaria;

  return {
    evento,
    comentarios,
    mostrarComentarios,
    loading,
    error,
    productora,
    cuentaBancaria,
  };
};
