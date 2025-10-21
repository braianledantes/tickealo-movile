import { EventoDto } from "@/api/dto/evento.dto";
import React, { createContext, useState } from "react";
import { deleteFavorito, getFavoritos, postFavorito } from "../api/favoritos";

interface FavoritoContextProps {
  favoritos: EventoDto[];
  eventosFavoritos: () => Promise<EventoDto[] | undefined>;
  agregarFavorito: (eventoId: number) => Promise<any>;
  eliminarFavorito: (eventoId: number) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export const FavoritoContext = createContext<FavoritoContextProps | undefined>(
  undefined,
);

export const FavoritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<EventoDto[]>([]);

  const eventosFavoritos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getFavoritos();
      setFavoritos(response || []);
      return response;
    } catch (err) {
      setFavoritos([]);
      console.error("Error obteniendo los eventos favoritos:", err);
      setError("No se pudieron obtener los eventos favoritos");
    } finally {
      setLoading(false);
    }
  };

  const agregarFavorito = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postFavorito(eventoId);
      return response;
    } catch (err) {
      console.error("Error agregando un evento a favoritos:", err);
      setError("No se pudo agregar un evento a favoritos.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarFavorito = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteFavorito(eventoId);
      return response;
    } catch (err) {
      console.error("Error eliminando un evento de favoritos:", err);
      setError("No se pudo eliminar un evento de favoritos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoritoContext.Provider
      value={{
        favoritos,
        eventosFavoritos,
        agregarFavorito,
        eliminarFavorito,
        loading,
        error,
      }}
    >
      {children}
    </FavoritoContext.Provider>
  );
};
