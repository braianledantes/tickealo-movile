import {
  EventoValidadorDto,
  ProductoraValidadorDto,
} from "@/api/dto/eventos-validador.dto";
import { useAuth } from "@/hooks/context/useAuth";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getEventosProductora,
  getProductora,
  ticketsValidados,
  ticketsValidadosTotales,
  validarTicketApi,
} from "../api/validador";
import { EventosContext } from "./EventosContext";

interface ValidadorContextProps {
  productoras: ProductoraValidadorDto[];
  eventos: EventoValidadorDto[];
  loadingProductoras: boolean;
  loadingEventos: boolean;
  productoraSeleccionada: number | null;
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
  const { getEventosByProductora: getEventosById } =
    useContext(EventosContext)!;
  const { user, isLoading: authLoading } = useAuth();

  const [productoras, setProductoras] = useState<ProductoraValidadorDto[]>([]);
  const [productoraSeleccionada, setProductoraSeleccionadaState] = useState<
    number | null
  >(null);
  const [eventos, setEventos] = useState<EventoValidadorDto[]>([]);
  const [loadingProductoras, setLoadingProductoras] = useState(true);
  const [loadingEventos, setLoadingEventos] = useState(false);

  // Verificar si el usuario tiene rol de validador
  const isValidador = !!user?.user?.roles?.some(
    (role) => role.name === "validador",
  );

  // Cargar productoras
  const loadProductoras = useCallback(async () => {
    if (!isValidador) return; // solo validadores
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
      if (err.response?.status === 403) {
        console.warn("Usuario no autorizado para cargar productoras");
      } else {
        console.error("Error cargando productoras:", err);
      }
      setProductoras([]);
    } finally {
      setLoadingProductoras(false);
    }
  }, [isValidador]);

  // Cargar eventos
  const loadEventos = useCallback(
    async (productoraId: number | null = null) => {
      if (!isValidador) {
        setEventos([]);
        return;
      }

      setLoadingEventos(true);
      try {
        let arr: EventoValidadorDto[] = [];

        if (productoraId) {
          const response = await getEventosById(productoraId);
          arr = response ?? [];
        } else {
          const response = await getEventosProductora();
          arr = response
            ? Array.isArray(response)
              ? response
              : [response]
            : [];
        }

        setEventos(arr);
      } catch (err: any) {
        if (err.response?.status === 403) {
          console.warn("Usuario no autorizado para cargar eventos");
        } else {
          console.error("Error cargando eventos:", err);
        }
        setEventos([]);
      } finally {
        setLoadingEventos(false);
      }
    },
    [getEventosById, isValidador],
  );

  const setProductoraSeleccionada = (id: number | null) => {
    setProductoraSeleccionadaState(id);
    loadEventos(id);
  };

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

  // Efectos
  useEffect(() => {
    if (!authLoading) {
      if (isValidador) {
        loadProductoras();
      } else {
        // limpiar estados si no es validador
        setProductoras([]);
        setEventos([]);
      }
    }
  }, [authLoading, isValidador, loadProductoras]);

  useEffect(() => {
    if (productoras.length > 0 && isValidador) {
      loadEventos(productoraSeleccionada);
    }
  }, [loadEventos, productoras, productoraSeleccionada, isValidador]);

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
      }}
    >
      {children}
    </ValidadorContext.Provider>
  );
};
