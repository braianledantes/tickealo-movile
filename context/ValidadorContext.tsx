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
  validarTicket: (idTicket: number) => Promise<number>; // 👈 ahora devuelve un número (status code)
}

export const ValidadorContext = createContext<
  ValidadorContextProps | undefined
>(undefined);

export const ValidadorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const validarTicket = useCallback(
    async (idTicket: number): Promise<number> => {
      try {
        const response = await validarTicketApi(idTicket);
        return response.status; // 👈 asegurate de devolver el status HTTP
      } catch (err: any) {
        // Si el backend devuelve un código de error, lo capturamos igual
        const statusCode = err?.response?.status ?? 500;
        return statusCode;
      }
    },
    [],
  );

  return (
    <ValidadorContext.Provider
      value={{ getEventosValidador, getProductorasValidador, validarTicket }}
    >
      {children}
    </ValidadorContext.Provider>
  );
};
