import {
  EstadisticasDto,
  EventoDto,
  ProductoraDto,
} from "@/api/dto/evento.dto";
import {
  fetchAllEvents,
  fetchUpcomingEvents,
  getEstadisticas,
  getEventosById,
  getEventosSeguidos,
  getProximosEventos,
} from "@/api/events";
import { useAuth } from "@/hooks/context/useAuth";
import React, { createContext, useMemo, useState } from "react";

interface EventosContextType {
  events: EventoDto[];
  eventosFinalizados: EventoDto[];
  proximos: EventoDto[];
  seguidos: EventoDto[];
  productoraSeguida: ProductoraDto[];
  loading: boolean;
  loadingFinalizados: boolean;
  loadingProximos: boolean;
  loadingSeguidos: boolean;
  error: string | null;
  search: string;
  setSearch: (val: string) => void;
  province: string | null;
  setProvince: (val: string | null) => void;
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  fetchEventos: () => Promise<EventoDto[] | undefined>;
  fetchFinalizados: () => Promise<EventoDto[] | undefined>;
  fetchProximos: () => Promise<void>;
  fetchSeguidos: () => Promise<void>;
  obtenerEstadisticas: (
    eventoId: number,
  ) => Promise<EstadisticasDto | undefined>;
}

export const EventosContext = createContext<EventosContextType | undefined>(
  undefined,
);

export const EventosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventoDto[]>([]);
  const [proximos, setProximos] = useState<EventoDto[]>([]);
  const [seguidos, setSeguidos] = useState<EventoDto[]>([]);
  const [eventosFinalizados, setEventosFinalizados] = useState<EventoDto[]>([]);
  const [productoraSeguida, setProductoraSeguida] = useState<ProductoraDto[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [loadingFinalizados, setLoadingFinalizados] = useState(false);
  const [loadingProximos, setLoadingProximos] = useState(false);
  const [loadingSeguidos, setLoadingSeguidos] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState<string | null>(null);

  const { user } = useAuth();

  const getEventosByProductora = async (idProductora: number) => {
    try {
      return await getEventosById(idProductora);
    } catch (err: any) {
      console.error("Error obteniendo eventos de productora:", err);
      setError("No se pudieron cargar los eventos de la productora.");
      return undefined;
    }
  };

  const obtenerEstadisticas = async (eventoId: number) => {
    try {
      return await getEstadisticas(eventoId);
    } catch (err: any) {
      console.error("Error obteniendo estadisticas del evento:", err);
      setError("No se pudieron cargar las estadisticas del evento");
      return undefined;
    }
  };
  const fetchEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllEvents();
      const filtered = data.filter(
        (evento: any) =>
          evento.lugar?.pais?.toLowerCase() === user?.pais?.toLowerCase(),
      );
      setEvents(filtered || []);
      return data;
    } catch (err: any) {
      console.error("Error obteniendo todos los eventos:", err);
      setEvents([]);
      setError(
        err.response?.status === 403
          ? "No autorizado para ver todos los eventos"
          : "No se pudieron cargar todos los evento",
      );
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const fetchFinalizados = async () => {
    setLoadingFinalizados(true);
    setError(null);
    try {
      const data = await fetchUpcomingEvents();
      const filtered = data.filter(
        (evento: any) =>
          evento.lugar?.pais?.toLowerCase() === user?.pais?.toLowerCase(),
      );
      setEventosFinalizados(filtered || []);
      return data;
    } catch (err: any) {
      console.error("Error obteniendo eventos futuros:", err);
      setEventosFinalizados([]);
      setError(
        err.response?.status === 403
          ? "No autorizado para ver eventos futuros"
          : "No se pudieron cargar los eventos futuros",
      );
      return undefined;
    } finally {
      setLoadingFinalizados(false);
    }
  };

  const fetchProximos = async () => {
    setLoadingProximos(true);
    setError(null);
    try {
      const data = await getProximosEventos();
      const filtered = data.filter(
        (evento: any) =>
          evento.lugar?.pais?.toLowerCase() === user?.pais?.toLowerCase(),
      );
      setProximos(filtered || []);
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

  const fetchSeguidos = async () => {
    setLoadingSeguidos(true);
    setError(null);
    try {
      const eventos = await getEventosSeguidos();
      if (eventos) {
        const proximosSeguidos = eventos.filter(
          (e) => new Date(e.inicioAt) >= new Date(),
        );
        const productorasSeguidas = Array.from(
          new Map(
            eventos.map((e) => [e.productora.userId, e.productora]),
          ).values(),
        );
        setProductoraSeguida(productorasSeguidas);
        setSeguidos(proximosSeguidos);
      } else {
        setSeguidos([]);
      }
    } catch (err: any) {
      console.error("Error obteniendo eventos seguidos:", err);
      setSeguidos([]);
      setError(
        err.response?.status === 403
          ? "No autorizado para ver eventos seguidos"
          : "No se pudieron cargar los eventos seguidos",
      );
    } finally {
      setLoadingSeguidos(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        !search ||
        e.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        e.lugar?.ciudad?.toLowerCase().includes(search.toLowerCase());
      const matchesProvincia =
        !province ||
        e.lugar?.provincia?.toLowerCase().includes(province.toLowerCase()) ||
        e.lugar?.ciudad?.toLowerCase().includes(province.toLowerCase());
      return matchesSearch && matchesProvincia;
    });
  }, [events, search, province]);

  return (
    <EventosContext.Provider
      value={{
        events: filteredEvents,
        eventosFinalizados,
        proximos,
        seguidos,
        productoraSeguida,
        loading,
        loadingFinalizados,
        loadingProximos,
        loadingSeguidos,
        error,
        search,
        setSearch,
        province,
        setProvince,
        getEventosByProductora,
        fetchEventos,
        fetchFinalizados,
        fetchProximos,
        fetchSeguidos,
        obtenerEstadisticas,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
};
