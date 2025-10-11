import React, { createContext, useCallback } from "react";
import {
  EventoValidadorDto,
  ProductoraValidadorDto,
} from "../api/dto/eventos-validador.dto";
import {
  getEventosProductora,
  getProductora,
  validarTicketApi,
} from "../api/validador";

interface ValidadorContextProps {
  getEventosValidador: () => Promise<EventoValidadorDto | undefined>;
  getProductorasValidador: () => Promise<ProductoraValidadorDto | undefined>;
  validarTicket: (idTicket: number) => Promise<void>;
}

export const ValidadorContext = createContext<
  ValidadorContextProps | undefined
>(undefined);

export const ValidadorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ useCallback memoriza la función y evita bucles en los efectos
  const getEventosValidador = useCallback(async () => {
    try {
      const response = await getEventosProductora();
      return response;
    } catch (err) {
      console.error("Error obteniendo eventos de productora:", err);
      return undefined;
    }
  }, []);

  const getProductorasValidador = useCallback(async () => {
    try {
      const response = await getProductora();
      return response;
    } catch (err) {
      console.error("Error obteniendo productoras del validador:", err);
      return undefined;
    }
  }, []);

  const validarTicket = useCallback(async (idTicket: number) => {
    try {
      await validarTicketApi(idTicket);
    } catch (err) {
      console.error("Error validando ticket:", err);
    }
  }, []);

  return (
    <ValidadorContext.Provider
      value={{ getEventosValidador, getProductorasValidador, validarTicket }}
    >
      {children}
    </ValidadorContext.Provider>
  );
};
