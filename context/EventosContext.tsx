import { EventoDto } from "@/api/dto/evento.dto";
import React, { createContext } from "react";
import { getEventosById } from "../api/events";

interface EventosContextProps {
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
}

export const EventosContext = createContext<EventosContextProps | undefined>(
  undefined,
);

export const EventosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getEventosByProductora = async (idProductora: number) => {
    try {
      const response = await getEventosById(idProductora);
      return response;
    } catch (err) {
      console.error("Error obteniendo eventos de productora:", err);
      return undefined;
    }
  };

  return (
    <EventosContext.Provider value={{ getEventosByProductora }}>
      {children}
    </EventosContext.Provider>
  );
};
