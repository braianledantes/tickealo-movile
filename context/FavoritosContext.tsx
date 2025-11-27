import { EventoFavoritoDto } from "@/api/dto/eventos-favoritos/obtener-eventos-favoritos.dto";
import { useAuth } from "@/hooks/context/useAuth";
import React, { createContext, useEffect, useState } from "react";
import { deleteFavorito, getFavoritos, postFavorito } from "../api/favoritos";

interface FavoritoContextProps {
  favoritos: EventoFavoritoDto[];
  fetchFavoritos: () => Promise<void>;
  agregarFavorito: (eventoId: number) => Promise<boolean>;
  eliminarFavorito: (eventoId: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const FavoritoContext = createContext<FavoritoContextProps | undefined>(
  undefined,
);

export const FavoritoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<EventoFavoritoDto[]>([]);

  useEffect(() => {
    if (accessToken) {
      fetchFavoritos();
    } else {
      setFavoritos([]);
    }
  }, [accessToken]);

  const fetchFavoritos = async () => {
    setLoading(true);
    setError(null);
    try {
      const obtenerFavoritosResponse = await getFavoritos();
      setFavoritos(obtenerFavoritosResponse.eventos);
    } catch (err) {
      console.error("Error obteniendo eventos favoritos:", err);
      setError("No se pudieron obtener los eventos favoritos.");
    } finally {
      setLoading(false);
    }
  };

  const agregarFavorito = async (eventoId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await postFavorito(eventoId);
      const obtenerFavoritosResponse = await getFavoritos();
      setFavoritos(obtenerFavoritosResponse.eventos);
      return true;
    } catch (err) {
      console.error("Error agregando un evento a favoritos:", err);
      setError("No se pudo agregar un evento a favoritos.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const eliminarFavorito = async (eventoId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteFavorito(eventoId);
      setFavoritos((prev) => prev.filter((evento) => evento.id !== eventoId));
      return true;
    } catch (err) {
      console.error("Error eliminando un evento de favoritos:", err);
      setError("No se pudo eliminar un evento de favoritos.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoritoContext.Provider
      value={{
        favoritos,
        fetchFavoritos,
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
