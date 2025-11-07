import { TicketDto, TransferenciaDto } from "@/api/dto/compras.dto";
import { Me } from "@/api/dto/me.dto";
import {
  getClientes,
  getTickets,
  getTransferencias,
  postTransferencia,
  postTransferenciaAccept,
} from "@/api/ticket";
import { useAuth } from "@/hooks/context/useAuth";
import React, { createContext, useMemo, useState } from "react";

type Cliente = Me;
interface Props {
  tickets: () => Promise<TicketDto[]>;
  allTickets: TicketDto[];
  loadingTickets: boolean;
  listaClientes: () => Promise<Cliente[]>;
  clientes: Cliente[];
  aceptarTransferencia: (transferenciaId: number) => Promise<any>;
  transferir: (ticketId: number, receptorMail: string) => Promise<any>;
  loading: boolean;
  loadingClientes: boolean;
  loadingPorUsar: boolean;
  loadingUsados: boolean;
  loadingTransferidos: boolean;
  error: string | null;
  search: string;
  setSearch: (val: string) => void;
  ticketsTransferidos: () => Promise<TransferenciaDto>;
  transferidos: TransferenciaDto[];
  ticketsUsados: () => Promise<TicketDto[]>;
  porUsar: TicketDto[];
  ticketsPorUsar: () => Promise<TicketDto[]>;
  usados: TicketDto[];
  noHayTickets: boolean;
  anyLoading: boolean;
}

export const TicketContext = createContext<Props | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [allTickets, setTickets] = useState<TicketDto[]>([]);
  const [usados, setUsados] = useState<TicketDto[]>([]);
  const [porUsar, setPorUsar] = useState<TicketDto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transferidos, setTransferidos] = useState<TransferenciaDto[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [loadingTransferidos, setLoadingTransferidos] = useState(false);
  const [loadingUsados, setLoadingUsados] = useState(false);
  const [loadingPorUsar, setLoadingPorUsar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const ticketsUsados = async () => {
    setLoadingUsados(true);
    setError(null);
    try {
      const response = await getTickets();
      const ticketsArray = Array.isArray(response?.tickets)
        ? response.tickets
        : [];
      const filteredTickets = ticketsArray.filter(
        (ticket: any) => ticket?.estado.toLowerCase() === "validado",
      );
      setUsados(filteredTickets ?? []);
      return response;
    } catch (err) {
      console.log("Error obteniendo lista de tickets usados:", err);
      setError("Error obteniendo listado de tickets usados.");
    } finally {
      setLoadingUsados(false);
    }
  };

  const ticketsPorUsar = async () => {
    setLoadingPorUsar(true);
    setError(null);
    try {
      const response = await getTickets();
      const ticketsArray = Array.isArray(response?.tickets)
        ? response.tickets
        : [];
      const filteredTickets = ticketsArray.filter(
        (ticket: any) =>
          ticket?.estado.toLowerCase() === "pendiente_validacion",
      );
      setPorUsar(filteredTickets ?? []);
      return response;
    } catch (err) {
      console.log("Error obteniendo lista de tickets por usar:", err);
      setError("Error obteniendo listado de tickets por usar.");
    } finally {
      setLoadingPorUsar(false);
    }
  };

  const tickets = async () => {
    setLoadingTickets(true);
    setError(null);
    try {
      const response = await getTickets();
      const ticketsArray = Array.isArray(response?.tickets)
        ? response.tickets
        : [];
      setTickets(ticketsArray);
      return response;
    } catch (err) {
      console.log("Error obteniendo lista de tickets por usar:", err);
      setError("Error obteniendo listado de tickets por usar.");
    } finally {
      setLoadingTickets(false);
    }
  };

  const listaClientes = async () => {
    setLoadingClientes(true);
    setError(null);
    try {
      const response = await getClientes();
      const filteredClientes = response.clientes.filter(
        (cliente: any) =>
          cliente?.user?.email?.toLowerCase() !==
          user?.user.email?.toLowerCase(),
      );
      setClientes(filteredClientes ?? []);
      return response;
    } catch (err) {
      console.log("Error obteniendo lista de clientes:", err);
      setError("Error obteniendo listado de clientes.");
    } finally {
      setLoadingClientes(false);
    }
  };

  const ticketsTransferidos = async () => {
    setLoadingTransferidos(true);
    setError(null);
    try {
      const response = await getTransferencias();
      const trans = response?.transferencias || [];
      setTransferidos(trans);
      return trans;
    } catch (err) {
      setTransferidos([]);
      console.error("Error obteniendo lista de trasnferencias:", err);
      setError("No se pudo obtener lista de transferencias");
    } finally {
      setLoadingTransferidos(false);
    }
  };

  const transferir = async (ticketId: number, receptorMail: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postTransferencia(ticketId, receptorMail);
      return response;
    } catch (err) {
      console.error("Error transfiriendo entrada:", err);
      setError("No se pudo transferir la entrada");
    } finally {
      setLoading(false);
    }
  };

  const aceptarTransferencia = async (transferenciaId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postTransferenciaAccept(transferenciaId);
      return response;
    } catch (err) {
      console.error("Error aceptando transferencia:", err);
      setError("No se pudo aceptar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  const searchClientes = useMemo(() => {
    return clientes.filter((c) => {
      const matchesSearch =
        !search ||
        c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        c.telefono?.toLowerCase().includes(search.toLowerCase()) ||
        c.user?.email?.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [clientes, search]);

  const anyLoading = loadingPorUsar || loadingTransferidos || loadingUsados;

  const noHayTickets = useMemo(() => {
    return (
      !anyLoading &&
      usados.length === 0 &&
      porUsar.length === 0 &&
      transferidos.length === 0
    );
  }, [anyLoading, usados, porUsar, transferidos]);

  return (
    <TicketContext.Provider
      value={{
        listaClientes,
        clientes: searchClientes,
        tickets,
        allTickets,
        loadingTickets,
        ticketsTransferidos,
        transferidos,
        transferir,
        aceptarTransferencia,
        loading,
        loadingClientes,
        loadingPorUsar,
        loadingTransferidos,
        loadingUsados,
        error,
        setSearch,
        search,
        ticketsPorUsar,
        porUsar,
        ticketsUsados,
        usados,
        noHayTickets,
        anyLoading,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
