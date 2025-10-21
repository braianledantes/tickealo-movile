import api from "./axiosConfig";
import { EventoDto } from "./dto/evento.dto";

//Obtener todos los eventos favoritos
export const getFavoritos = async (): Promise<EventoDto[]> => {
  const response = await api.get("/favoritos/eventos");
  return response.data;
};

// agregar un evento a favorito
export const postFavorito = async (eventoId: number): Promise<any> => {
  const response = await api.post(`/favoritos/eventos/${eventoId}`);
  return response.data;
};

// eliminar un evento de favoritos
export const deleteFavorito = async (eventoId: number): Promise<any> => {
  const response = await api.delete(`/favoritos/eventos/${eventoId}`);
  return response.data;
};
