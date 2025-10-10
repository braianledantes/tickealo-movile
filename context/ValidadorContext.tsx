import React, { createContext } from "react";
import { EventoValidadorDto } from "../api/dto/eventos-validador.dto";
import { getEventosProductora } from "../api/validador";

interface ValidadorContextProps {
  getEventosValidador: () => Promise<EventoValidadorDto | undefined>;
}

export const ValidadorContext = createContext<
  ValidadorContextProps | undefined
>(undefined);

export const ValidadorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getEventosValidador = async () => {
    try {
      const response = await getEventosProductora();
      return response; // devuelve un solo objeto
    } catch (err) {
      console.error("Error obteniendo eventos de productora:", err);
      return undefined;
    }
  };

  return (
    <ValidadorContext.Provider value={{ getEventosValidador }}>
      {children}
    </ValidadorContext.Provider>
  );
};
