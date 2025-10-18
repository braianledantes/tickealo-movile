// hooks/useTicketsEvento.ts
import type { TicketDto } from "@/api/dto/ticket-validador";
import { useValidador } from "@/hooks/useValidador";
import { useEffect, useState } from "react";

export const useTicketValidador = (eventoId?: string | number) => {
  const { ticketsValidadosEvento, ticketsValidadosEventoTotales } =
    useValidador();

  const [ticketsValidados, setTicketsValidados] = useState<TicketDto[]>([]);
  const [ticketsTotalesEvento, setTicketsTotalesEvento] = useState<TicketDto[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventoId) return;

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const numericEventoId =
          typeof eventoId === "string" ? Number(eventoId) : eventoId;

        // Llamamos ambas funciones en paralelo
        const [validadosPorUsuario, validadosTotales] = await Promise.all([
          ticketsValidadosEvento(numericEventoId),
          ticketsValidadosEventoTotales(numericEventoId),
        ]);

        setTicketsValidados(validadosPorUsuario);
        setTicketsTotalesEvento(validadosTotales);
      } catch (err) {
        console.error("Error al traer tickets validados:", err);
        setTicketsValidados([]);
        setTicketsTotalesEvento([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [eventoId, ticketsValidadosEvento, ticketsValidadosEventoTotales]);

  return {
    ticketsValidados, // tickets que validó el usuario
    ticketsTotalesEvento, // tickets totales validados del evento
    loading,
  };
};
