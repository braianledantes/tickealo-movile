import { getCompras, realizarCompra } from "@/api/compras";
import { ComprasResponse } from "@/api/dto/compras.dto";
import React, { createContext } from "react";

interface ComprasContextProps { 
  comprar: (formData: FormData) => Promise<ComprasResponse | undefined>;
  misCompras: () => Promise<ComprasResponse | void>;

}

export const ComprasContext = createContext<ComprasContextProps | undefined>(undefined);

export const ComprasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const comprar = async (formData : FormData) => {
    try {
      const response = await realizarCompra(formData);
      return response;
    } catch (err) {
      console.error("Error realizando la compra:", err);
    }
  };

  const misCompras = async () => {
    try {
      const response = await getCompras();
      return response;
    } catch (err) {
      console.error("Error dejando de seguir productora:", err);
    }
  };

  return (
    <ComprasContext.Provider value={{ comprar, misCompras }}>
      {children}
    </ComprasContext.Provider>
  );
};
