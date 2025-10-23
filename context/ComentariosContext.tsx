import {
  deleteComentario,
  getComentario,
  getComentarios,
  patchComentario,
  postComentario,
} from "@/api/comentarios";
import { ComentarioDto } from "@/api/dto/comentario.dto";
import React, { createContext, useState } from "react";

interface ComentariosContextProps {
  obtenerComentario: (
    comentarioId: number,
  ) => Promise<ComentarioDto | undefined>;
  comentariosDeEvento: (eventoId: number) => Promise<ComentarioDto[]>;
  comentar: (
    eventoId: number,
    data: { comentario: string; calificacion: number },
  ) => Promise<ComentarioDto | undefined>;
  editarComentario: (
    comentarioId: number,
    data: { comentario: string; calificacion: number },
  ) => Promise<ComentarioDto | undefined>;
  eliminarComentario: (comentarioId: number) => Promise<boolean>;
  loading: boolean;
  loadingEdit: boolean;
  error: string | null;
}

export const ComentariosContext = createContext<
  ComentariosContextProps | undefined
>(undefined);

export const ComentariosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerComentario = async (comentarioId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getComentario(comentarioId);
      return response;
    } catch (err: any) {
      console.error("Error obteniendo el comentario:", err);
      setError("No se pudo obtener el comentario.");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const comentariosDeEvento = async (
    eventoId: number,
  ): Promise<ComentarioDto[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getComentarios(eventoId);
      return response || [];
    } catch (err: any) {
      console.error("Error obteniendo los comentarios del evento:", err);
      if (err?.response?.status === 404) return [];
      setError("No se pudieron obtener los comentarios del evento.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const comentar = async (
    eventoId: number,
    data: { comentario: string; calificacion: number },
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postComentario(eventoId, data);
      return response;
    } catch (err: any) {
      console.error("Error subiendo comentario:", err);
      setError("No se pudo subir el comentario.");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async (
    comentarioId: number,
    data: { comentario: string; calificacion: number },
  ) => {
    setLoadingEdit(true);
    setError(null);
    try {
      const response = await patchComentario(comentarioId, data);
      return response;
    } catch (err: any) {
      console.error("Error al editar el comentario:", err);
      setError("No se pudo editar el comentario.");
      return undefined;
    } finally {
      setLoadingEdit(false);
    }
  };

  const eliminarComentario = async (comentarioId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteComentario(comentarioId);
      return true;
    } catch (err: any) {
      console.error("Error eliminando el comentario:", err);
      setError("No se pudo eliminar el comentario.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComentariosContext.Provider
      value={{
        obtenerComentario,
        comentariosDeEvento,
        comentar,
        editarComentario,
        eliminarComentario,
        loading,
        loadingEdit,
        error,
      }}
    >
      {children}
    </ComentariosContext.Provider>
  );
};
