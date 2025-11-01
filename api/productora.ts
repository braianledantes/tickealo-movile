import api from "./axiosConfig";
import { EventoDto, ProductoraDto } from "./dto/evento.dto";

//obtiene los eventos de una productora
export const getEventosById = async (
  idProductora: number,
): Promise<EventoDto[]> => {
  const response = await api.get(`/productora/${idProductora}/eventos`);
  return response.data;
};

//obtiene informacion  de una productora
export const getProductoraById = async (
  idProductora: number,
): Promise<ProductoraDto | any> => {
  const response = await api.get(`/productora/${idProductora}/`);
  return response.data;
};
