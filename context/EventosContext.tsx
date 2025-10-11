import React, { createContext } from "react";
import { getEventosById } from "../api/events";

type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion: string;
    ciudad: string;
    provincia: string;
  };
};

interface EventosContextProps {
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<Event[] | undefined>;
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
