import api from "./axiosConfig";
import {
  EventoValidadorDto,
  ProductoraValidadorDto,
} from "./dto/eventos-validador.dto";

//Obtener los eventos de la productora a la cual es miembro
export const getEventosProductora = async (): Promise<EventoValidadorDto> => {
  const response = await api.get("/validador/eventos");
  return response.data;
};

//Obtener productoras de la cual el validador es parte
export const getProductora = async (): Promise<ProductoraValidadorDto> => {
  const response = await api.get("/validador/productoras");
  return response.data;
};

// Validar una entrada por su id
export const validarTicketApi = async (idTicket: number) => {
  const response = await api.patch(`/tickets/${idTicket}/validar`);
  return response;
};
