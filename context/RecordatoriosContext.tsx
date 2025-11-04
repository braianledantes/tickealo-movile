import React, { createContext, useState } from "react";
import { deleteRecordatorio, postRecordatorio } from "../api/recordatorios";

interface RecordatoriosContextProps {
  ponerRecordatorio: (eventoId: number) => Promise<boolean>;
  sacarRecordatorio: (eventoId: number) => Promise<boolean>;
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

  const getAxiosErrorMessage = (err: any) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Error inesperado."
    );
  };

  const ponerRecordatorio = async (eventoId: number) => {
    setLoading(true);
    setError(null);

    try {
      await postRecordatorio(eventoId);
      return true; // ✅ éxito explícito
    } catch (err: any) {
      const msg = getAxiosErrorMessage(err);
      console.error("Axios ERROR postRecordatorio:", err);
      setError(msg);
      return false; // ❗ importantísimo
    } finally {
      setLoading(false);
    }
  };

  const sacarRecordatorio = async (eventoId: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteRecordatorio(eventoId);
      return true;
    } catch (err: any) {
      const msg = getAxiosErrorMessage(err);
      console.error("Axios ERROR deleteRecordatorio:", err);
      setError(msg);
      return false;
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
