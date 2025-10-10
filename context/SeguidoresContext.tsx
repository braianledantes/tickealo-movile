import React, { createContext, useEffect, useState } from "react";
import { SeguidorDTO } from "../api/dto/seguidor.dto";
import {
  dejarSeguirProductora,
  getSeguidores,
  seguirProductora,
} from "../api/seguidores";

interface SeguidoresContextProps {
  seguidores: SeguidorDTO[];
  seguir: (idProductora: number) => Promise<void>;
  dejarSeguir: (idProductora: number) => Promise<void>;
}

export const SeguidoresContext = createContext<
  SeguidoresContextProps | undefined
>(undefined);

export const SeguidoresProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [seguidores, setSeguidores] = useState<SeguidorDTO[]>([]);

  // 🔹 Cargar seguidores al montar
  useEffect(() => {
    const fetchSeguidores = async () => {
      try {
        const lista = await getSeguidores();
        setSeguidores(lista);
      } catch (err) {
        console.error("Error cargando seguidores:", err);
      }
    };
    fetchSeguidores();
  }, []);

  const seguir = async (idProductora: number) => {
    try {
      const nuevoSeguidor = await seguirProductora(idProductora);
      setSeguidores((prev) => [...prev, nuevoSeguidor]);
    } catch (err) {
      console.error("Error siguiendo productora:", err);
    }
  };

  const dejarSeguir = async (idProductora: number) => {
    try {
      const eliminado = await dejarSeguirProductora(idProductora);
      setSeguidores((prev) =>
        prev.filter((s) => s.userId !== eliminado.userId),
      );
    } catch (err) {
      console.error("Error dejando de seguir productora:", err);
    }
  };

  return (
    <SeguidoresContext.Provider value={{ seguidores, seguir, dejarSeguir }}>
      {children}
    </SeguidoresContext.Provider>
  );
};
