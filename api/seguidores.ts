import api from "./axiosConfig";
import { Me } from "./dto/me.dto";

export const getSeguidores = async (): Promise<Me[]> => {
  const response = await api.get("/productora/seguidores");
  return response.data;
};

// Seguir a una productora
export const seguirProductora = async (idProductora: number): Promise<Me> => {
  const response = await api.post<Me>(`/productora/${idProductora}/seguir`);
  return response.data;
};

// Dejar de seguir a una productora
export const dejarSeguirProductora = async (
  idProductora: number,
): Promise<Me> => {
  const response = await api.delete<Me>(`/productora/${idProductora}/seguir`);
  return response.data;
};
