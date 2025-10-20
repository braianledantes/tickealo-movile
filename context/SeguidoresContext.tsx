import { Me } from "@/api/dto/me.dto";
import React, { createContext } from "react";
import { dejarSeguirProductora, seguirProductora } from "../api/seguidores";

interface SeguidoresContextProps {
  seguir: (idProductora: number) => Promise<Me | undefined>;
  dejarSeguir: (idProductora: number) => Promise<Me | undefined>;
}

export const SeguidoresContext = createContext<
  SeguidoresContextProps | undefined
>(undefined);

export const SeguidoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const seguir = async (idProductora: number) => {
    try {
      const response = await seguirProductora(idProductora);
      return response;
    } catch (err) {
      console.error("Error siguiendo productora:", err);
    }
  };

  const dejarSeguir = async (idProductora: number) => {
    try {
      const response = await dejarSeguirProductora(idProductora);
      return response;
    } catch (err) {
      console.error("Error dejando de seguir productora:", err);
    }
  };

  return (
    <SeguidoresContext.Provider value={{ seguir, dejarSeguir }}>
      {children}
    </SeguidoresContext.Provider>
  );
};
