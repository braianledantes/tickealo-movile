import {
  finalizarCompra,
  getCompra,
  getCompras,
  iniciarCompra,
} from "@/api/compras";
import { CompraDto, ComprasResponse } from "@/api/dto/compras.dto";
import React, { createContext } from "react";

interface ComprasContextProps {
  comprar: (body: {
    idEntrada: number;
    cant: number;
  }) => Promise<CompraDto | undefined>;
  terminarCompra: (
    compraId: string | number,
    formData: FormData,
  ) => Promise<CompraDto | undefined>;
  misCompras: (
    page?: number,
    limit?: number,
  ) => Promise<ComprasResponse | void>;
  miCompra: (compraId: number) => Promise<CompraDto | undefined>;
}

export const ComprasContext = createContext<ComprasContextProps | undefined>(
  undefined,
);

export const ComprasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const comprar = async (body: {
    idEntrada: number;
    cant: number;
  }): Promise<CompraDto | undefined> => {
    try {
      const response: CompraDto = await iniciarCompra(body);
      return response;
    } catch (err) {
      console.error("Error realizando la compra:", err);
    }
  };

  const terminarCompra = async (
    compraId: string | number,
    formData: FormData,
  ): Promise<CompraDto | undefined> => {
    try {
      const response: CompraDto = await finalizarCompra(compraId, formData);
      return response;
    } catch (err) {
      console.error("Error finalizando la compra:", err);
    }
  };

  const misCompras = async (page = 1, limit = 10) => {
    try {
      const response = await getCompras(page, limit);
      return response;
    } catch (err) {
      console.error(" Error obteniendo compras del usuario:", err);
    }
  };

  const miCompra = async (compraId: number) => {
    try {
      const response = await getCompra(compraId);
      return response;
    } catch (err) {
      console.error(" Error obteniendo compra del usuario:", err);
    }
  };

  return (
    <ComprasContext.Provider
      value={{ comprar, terminarCompra, misCompras, miCompra }}
    >
      {children}
    </ComprasContext.Provider>
  );
};
