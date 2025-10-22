import { ComentarioDto } from "@/api/dto/comentario.dto";
import { EventoDto } from "@/api/dto/evento.dto";
import { getEventoById } from "@/api/events";
import { useComentarios } from "@/hooks/useComentarios";
import { useEffect, useMemo, useState } from "react";

export type ProductoraDatos = {
  nombre?: string;
  cuit?: string;
  telefono?: string;
  userId?: number;
};

export type CuentaBancariaDatos = {
  titular?: string;
  cbu?: string;
  alias?: string;
  banco?: string;
  instrucciones?: string;
};

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
