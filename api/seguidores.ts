import api from "./axiosConfig";
import { SeguidorDTO } from "./dto/seguidor.dto";

export const getSeguidores = async (): Promise<SeguidorDTO[]> => {
  const response = await api.get("/productora/seguidores");
  return response.data;
};

// Seguir a una productora
export const seguirProductora = async (idProductora: number): Promise<SeguidorDTO> => {
  const response = await api.post<SeguidorDTO>(`/productora/${idProductora}/seguir`);
  return response.data;
};

// Dejar de seguir a una productora
export const dejarSeguirProductora = async (idProductora: number): Promise<SeguidorDTO> => {
  const response = await api.delete<SeguidorDTO>(`/productora/${idProductora}/seguir`);
  return response.data;
};
