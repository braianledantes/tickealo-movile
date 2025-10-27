import React, { createContext, useState } from "react";
import { deleteRecordatorio, postRecordatorio } from "../api/recordatorios";

interface RecordatoriosContextProps {
  ponerRecordatorio: (eventoId: number) => Promise<any>;
  sacarRecordatorio: (eventoId: number) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export const RecordatoriosContext = createContext<
  RecordatoriosContextProps | undefined
>(undefined);

export const RecordatoriosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ponerRecordatorio = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postRecordatorio(eventoId);
      return response;
    } catch (err) {
      console.error("Error agregando un evento a Recordatorios:", err);
      setError("No se pudo agregar un evento a Recordatorios.");
    } finally {
      setLoading(false);
    }
  };

  const sacarRecordatorio = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteRecordatorio(eventoId);
      return response;
    } catch (err) {
      console.error("Error eliminando un evento de Recordatorios:", err);
      setError("No se pudo eliminar un evento de Recordatorios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecordatoriosContext.Provider
      value={{
        ponerRecordatorio,
        sacarRecordatorio,
        loading,
        error,
      }}
    >
      {children}
    </RecordatoriosContext.Provider>
  );
};
