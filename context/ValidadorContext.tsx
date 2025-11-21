import { EventoDto } from "@/api/dto/evento.dto";
import { ProductoraValidadorDto } from "@/api/dto/eventos-validador.dto";
import { useAuth } from "@/hooks/context/useAuth";
import { useProductora } from "@/hooks/context/useProductora";
import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  getEventosProductora,
  getProductora,
  ticketsValidados,
  ticketsValidadosTotales,
  validarTicketApi,
} from "../api/validador";

interface ValidadorContextProps {
  productoras: ProductoraValidadorDto[];
  allEvents: EventoDto[];
  eventos: EventoDto[];
  loadingProductoras: boolean;
  loadingEventos: boolean;
  loading: boolean;
  error: string | null;
  productoraSeleccionada: number | null;
  getAllEvents: () => Promise<EventoDto[] | undefined>;
  setProductoraSeleccionada: (id: number | null) => void;
  validarTicket: (idTicket: string) => Promise<number>;
  ticketsValidadosEvento: (idEvento: number) => Promise<any[]>;
  ticketsValidadosEventoTotales: (idEvento: number) => Promise<any[]>;
}

export const ValidadorContext = createContext<
  ValidadorContextProps | undefined
>(undefined);

export const ValidadorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading: authLoading } = useAuth();
  const { getEventosByProductora } = useProductora();

  const [productoras, setProductoras] = useState<ProductoraValidadorDto[]>([]);
  const [productoraSeleccionada, setProductoraSeleccionadaState] = useState<
    number | null
  >(null);
  const [allEvents, setAllEvents] = useState<EventoDto[]>([]);
  const [eventos, setEventos] = useState<EventoDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProductoras, setLoadingProductoras] = useState(true);
  const [loadingEventos, setLoadingEventos] = useState(false);

  const isValidador = !!user?.user?.roles?.some(
    (role) => role.name === "validador",
  );

  /* -------------------------------------------------------
       CARGAR PRODUCTORAS
  -------------------------------------------------------- */
  const loadProductoras = useCallback(async () => {
    if (!isValidador) return;
    setLoadingProductoras(true);
    try {
      const response = await getProductora();
      const arr = response
        ? Array.isArray(response)
          ? response
          : [response]
        : [];
      setProductoras(arr as ProductoraValidadorDto[]);
    } catch (err: any) {
      console.error("Error cargando productoras:", err);
      setProductoras([]);
    } finally {
      setLoadingProductoras(false);
    }
  }, [isValidador]);

  /* -------------------------------------------------------
       OBTENER TODOS LOS EVENTOS (sin filtrar)
  -------------------------------------------------------- */
  const getAllEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEventosProductora();
      const arr = Array.isArray(data) ? data : [data];
      setAllEvents(arr);
      return arr;
    } catch (err: any) {
      console.error("Error obteniendo eventos de productora:", err);
      setError("No se pudieron cargar los eventos de la productora.");
      setAllEvents([]);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------
       CARGAR EVENTOS (por productora o todos)
  -------------------------------------------------------- */
  const loadEventos = useCallback(
    async (productoraId: number | null = null) => {
      if (!isValidador) {
        setEventos([]);
        return;
      }

      setLoadingEventos(true);
      try {
        let arr: EventoDto[] = [];

        if (productoraId !== null) {
          // Eventos filtrados por productora
          arr = (await getEventosByProductora(productoraId)) ?? [];
        } else {
          // Todos los eventos
          const response = await getEventosProductora();
          arr = response
            ? Array.isArray(response)
              ? response
              : [response]
            : [];
        }

        setEventos(arr);
      } catch (err: any) {
        console.error("Error cargando eventos:", err);
        setEventos([]);
      } finally {
        setLoadingEventos(false);
      }
    },
    [getEventosByProductora, isValidador],
  );

  /* -------------------------------------------------------
       SELECCIONAR PRODUCTORA
  -------------------------------------------------------- */
  const setProductoraSeleccionada = (id: number | null) => {
    setProductoraSeleccionadaState(id);
    loadEventos(id); // si es null carga todos
  };

  /* -------------------------------------------------------
       VALIDAR TICKET
  -------------------------------------------------------- */
  const validarTicket = useCallback(
    async (idTicket: string): Promise<number> => {
      try {
        const response = await validarTicketApi(idTicket);
        return response.status;
      } catch (err: any) {
        return err?.response?.status ?? 500;
      }
    },
    [],
  );

  const ticketsValidadosEvento = useCallback(async (idEvento: number) => {
    try {
      const response = await ticketsValidados(idEvento);
      return response.tickets ?? [];
    } catch (err: any) {
      console.error("Error obteniendo tickets validados:", err);
      return [];
    }
  }, []);

  const ticketsValidadosEventoTotales = useCallback(
    async (idEvento: number) => {
      try {
        const response = await ticketsValidadosTotales(idEvento);
        return response.tickets ?? [];
      } catch (err: any) {
        console.error("Error obteniendo tickets validados:", err);
        return [];
      }
    },
    [],
  );

  /* -------------------------------------------------------
       EFECTO INICIAL
  -------------------------------------------------------- */
  useEffect(() => {
    if (!authLoading && isValidador) {
      loadProductoras();
      getAllEvents(); // 🔥 al iniciar carga todos los eventos
    }
  }, [authLoading, isValidador, loadProductoras]);

  return (
    <ValidadorContext.Provider
      value={{
        productoras,
        eventos,
        loadingProductoras,
        loadingEventos,
        productoraSeleccionada,
        setProductoraSeleccionada,
        validarTicket,
        ticketsValidadosEvento,
        ticketsValidadosEventoTotales,
        getAllEvents,
        allEvents,
        loading,
        error,
      }}
    >
      {children}
    </ValidadorContext.Provider>
  );
};
