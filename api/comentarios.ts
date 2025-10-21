import api from "./axiosConfig";
import { ComentarioDto } from "./dto/comentario.dto";

//Obtener todos los comentarios de un evento por su id
export const getComentarios = async (
  eventoId: number,
): Promise<ComentarioDto[]> => {
  const response = await api.get(`/comentarios/evento/${eventoId}`);
  return response.data;
};

//Obtener un solo comentario
export const getComentario = async (
  comentarioId: number,
): Promise<ComentarioDto> => {
  const response = await api.get(`/comentarios/${comentarioId}`);
  return response.data;
};

//Subir un comentario
export const postComentario = async (
  eventoId: number,
  data: { comentario: string; calificacion: number },
): Promise<ComentarioDto> => {
  const response = await api.post(`/comentarios/evento/${eventoId}`, data);
  return response.data;
};

//Editar comentario
export const patchComentario = async (
  comentarioId: number,
): Promise<ComentarioDto> => {
  const response = await api.patch(`/comentarios/${comentarioId}`);
  return response.data;
};

//Eliminar un comentario
export const deleteComentario = async (
  comentarioId: number,
): Promise<ComentarioDto> => {
  const response = await api.delete(`/comentarios/${comentarioId}`);
  return response.data;
};
