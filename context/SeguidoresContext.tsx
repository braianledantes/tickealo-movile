import { Me } from "@/api/dto/me.dto";
import React, { createContext, useContext, useState } from "react";

import { dejarSeguirProductora, seguirProductora } from "../api/seguidores";
import { EventosContext } from "./EventosContext";

interface SeguidoresContextProps {
  seguir: (idProductora: number) => Promise<Me | undefined>;
  dejarSeguir: (idProductora: number) => Promise<Me | undefined>;
  loading: boolean;
  error: string | null;
}

export const SeguidoresContext = createContext<
  SeguidoresContextProps | undefined
>(undefined);

export const SeguidoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eventosContext = useContext(EventosContext);

  const seguir = async (idProductora: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await seguirProductora(idProductora);
      if (eventosContext) await eventosContext.fetchSeguidos();
      return response;
    } catch (err) {
      console.error("Error siguiendo productora:", err);
      setError("No se pudo seguir a la productora");
    } finally {
      setLoading(false);
    }
  };

  const dejarSeguir = async (idProductora: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dejarSeguirProductora(idProductora);
      if (eventosContext) await eventosContext.fetchSeguidos();
      return response;
    } catch (err) {
      console.error("Error dejando de seguir productora:", err);
      setError("No se pudo dejar de seguir a la productora");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeguidoresContext.Provider value={{ seguir, dejarSeguir, loading, error }}>
      {children}
    </SeguidoresContext.Provider>
  );
};
