import {
  finalizarCompra,
  getCompra,
  getCompras,
  iniciarCompra,
} from "@/api/compras";
import { CompraDto, ComprasResponse } from "@/api/dto/compras.dto";
import React, { createContext, useState } from "react";

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
  compras: ComprasResponse | undefined;
  loading: boolean;
  error: string | null;
}

export const ComprasContext = createContext<ComprasContextProps | undefined>(
  undefined,
);

export const ComprasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compras, setCompras] = useState<ComprasResponse | undefined>(
    undefined,
  );

  const comprar = async (body: {
    idEntrada: number;
    cant: number;
  }): Promise<CompraDto | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response: CompraDto = await iniciarCompra(body);
      return response;
    } catch (err) {
      setError("No se pudo reservar cupo de entrada.");
      console.error("Error realizando la compra:", err);
    } finally {
      setLoading(false);
    }
  };

  const terminarCompra = async (
    compraId: string | number,
    formData: FormData,
  ): Promise<CompraDto | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response: CompraDto = await finalizarCompra(compraId, formData);
      return response;
    } catch (err) {
      setError("No se pudo realizar compra.");
      console.error("Error finalizando la compra:", err);
    } finally {
      setLoading(false);
    }
  };

  const misCompras = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCompras(page, limit);
      setCompras(response ?? []);
      return response;
    } catch (err) {
      setError("No se pudo obtener las compras.");
      console.error(" Error obteniendo compras del usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  const miCompra = async (compraId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCompra(compraId);
      return response;
    } catch (err) {
      setError("No se pudo obtener la compra.");
      console.error(" Error obteniendo compra del usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComprasContext.Provider
      value={{
        comprar,
        terminarCompra,
        misCompras,
        miCompra,
        compras,
        loading,
        error,
      }}
    >
      {children}
    </ComprasContext.Provider>
  );
};
