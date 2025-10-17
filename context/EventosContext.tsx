import { EventoDto } from "@/api/dto/evento.dto";
import {
  fetchUpcomingEvents,
  getEventosById,
  getProximosEventos,
} from "@/api/events";
import React, { createContext, useMemo, useState } from "react";

interface EventosContextType {
  events: EventoDto[];
  proximos: EventoDto[];
  loadingUpcoming: boolean;
  loadingProximos: boolean;
  error: string | null;
  search: string;
  setSearch: (val: string) => void;
  province: string | null;
  setProvince: (val: string | null) => void;
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  fetchUpcoming: () => Promise<EventoDto[] | undefined>;
  fetchProximos: () => Promise<void>;
}

export const EventosContext = createContext<EventosContextType | undefined>(
  undefined,
);

export const EventosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [proximos, setProximos] = useState<EventoDto[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingProximos, setLoadingProximos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState<string | null>(null);

  const getEventosByProductora = async (idProductora: number) => {
    try {
      return await getEventosById(idProductora);
    } catch (err: any) {
      console.error("Error obteniendo eventos de productora:", err);
      setError("No se pudieron cargar los eventos de la productora.");
      return undefined;
    }
  };

  const fetchUpcoming = async () => {
    setLoadingUpcoming(true);
    setError(null);
    try {
      const data = await fetchUpcomingEvents();
      setEvents(data || []);
      return data;
    } catch (err: any) {
      console.error("Error obteniendo eventos futuros:", err);
      setEvents([]);
      setError(
        err.response?.status === 403
          ? "No autorizado para ver eventos futuros"
          : "No se pudieron cargar los eventos futuros",
      );
      return undefined;
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchProximos = async () => {
    setLoadingProximos(true);
    setError(null);
    try {
      const data = await getProximosEventos();
      setProximos(data || []);
    } catch (err: any) {
      console.error("Error obteniendo próximos eventos:", err);
      setProximos([]);
      setError(
        err.response?.status === 403
          ? "No autorizado para ver próximos eventos"
          : "No se pudieron cargar los próximos eventos",
      );
    } finally {
      setLoadingProximos(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        !search ||
        e.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        e.lugar?.ciudad?.toLowerCase().includes(search.toLowerCase());
      const matchesProvincia = !province || e.lugar?.provincia === province;
      return matchesSearch && matchesProvincia;
    });
  }, [events, search, province]);

  return (
    <EventosContext.Provider
      value={{
        events: filteredEvents,
        proximos,
        loadingUpcoming,
        loadingProximos,
        error,
        search,
        setSearch,
        province,
        setProvince,
        getEventosByProductora,
        fetchUpcoming,
        fetchProximos,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
};
