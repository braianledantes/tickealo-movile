import { EventoDto } from "@/api/dto/evento.dto";
import React, { createContext } from "react";
import {
  fetchUpcomingEvents,
  getEventosById,
  getProximosEventos,
} from "../api/events";

interface EventosContextProps {
  getEventosByProductora: (
    idProductora: number,
  ) => Promise<EventoDto[] | undefined>;
  proximosEventos: () => Promise<EventoDto[] | undefined>;
  fetchUpcoming: () => Promise<EventoDto[] | undefined>;
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

  const proximosEventos = async () => {
    try {
      const response = await getProximosEventos();
      return response;
    } catch (err) {
      console.error("Error obtenieidno los eventos proximos", err);
      return undefined;
    }
  };

  const fetchUpcoming = async () => {
    try {
      return await fetchUpcomingEvents();
    } catch (err) {
      console.error("Error obteniendo eventos futuros:", err);
      return undefined;
    }
  };

  return (
    <EventosContext.Provider
      value={{ getEventosByProductora, proximosEventos, fetchUpcoming }}
    >
      {children}
    </EventosContext.Provider>
  );
};
