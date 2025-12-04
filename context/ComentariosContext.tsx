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
  comentarios: ComentarioDto[];
  obtenerComentario: (
    comentarioId: number,
  ) => Promise<ComentarioDto | undefined>;
  cargarComentarios: (eventoId: number) => Promise<void>;
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
  const [comentarios, setComentarios] = useState<ComentarioDto[]>([]);
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
      setError("No se pudo obtener el comentario.");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const cargarComentarios = async (eventoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getComentarios(eventoId);
      setComentarios(response || []);
    } catch (err: any) {
      console.error("Error obteniendo comentarios del evento:", err);
      setError("No se pudieron obtener los comentarios del evento.");
      setComentarios([]);
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
      if (response) setComentarios((prev) => [response, ...prev]);
      return response;
    } catch (err: any) {
      console.error("Error subiendo un nuevo comentario:", err);
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
      if (response) {
        setComentarios((prev) =>
          prev.map((c) => (c.id === comentarioId ? response : c)),
        );
      }
      return response;
    } catch (err: any) {
      console.error("Error editando comentario:", err);
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
      setComentarios((prev) => prev.filter((c) => c.id !== comentarioId));
      return true;
    } catch (err: any) {
      console.error("Error eliminando comentario:", err);
      setError("No se pudo eliminar el comentario.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComentariosContext.Provider
      value={{
        comentarios,
        obtenerComentario,
        cargarComentarios,
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
