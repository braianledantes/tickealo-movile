import { TransferenciasDto } from "@/api/dto/compras.dto";
import { Me } from "@/api/dto/me.dto";
import {
  getClientes,
  getTransferencias,
  postTransferencia,
  postTransferenciaAccept,
} from "@/api/transferencia";
import { useAuth } from "@/hooks/context/useAuth";
import React, { createContext, useMemo, useState } from "react";

type Cliente = Me;
interface Props {
  listaClientes: () => Promise<Cliente[]>;
  clientes: Cliente[];
  misTransferencias: () => Promise<any>;
  transferencias: TransferenciasDto[];
  aceptarTransferencia: (transferenciaId: number) => Promise<any>;
  transferir: (ticketId: number, receptorMail: string) => Promise<any>;
  loading: boolean;
  loadingClientes: boolean;
  error: string | null;
  search: string;
  setSearch: (val: string) => void;
}

export const TransferenciaContext = createContext<Props | undefined>(undefined);

export const TransferenciaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transferencias, setTransferencias] = useState<TransferenciasDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

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

  const misTransferencias = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTransferencias();
      setTransferencias(response);
      return response;
    } catch (err) {
      setTransferencias([]);
      console.error("Error obteniendo lista de trasnferencias:", err);
      setError("No se pudo obtener lista de transferencias");
    } finally {
      setLoading(false);
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

  return (
    <TransferenciaContext.Provider
      value={{
        listaClientes,
        clientes: searchClientes,
        misTransferencias,
        transferencias,
        transferir,
        aceptarTransferencia,
        loading,
        loadingClientes,
        error,
        setSearch,
        search,
      }}
    >
      {children}
    </TransferenciaContext.Provider>
  );
};
