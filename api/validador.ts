import api from "./axiosConfig";
import { EventoValidadorDto } from "./dto/eventos-validador.dto";

//Obtener los eventos de la productora a la cual es miembro
export const getEventosProductora = async (): Promise<EventoValidadorDto> => {
  const response = await api.get("/validador/eventos");
  return response.data;
};

// // Validar una entrada por su id
// export const validarEntrada = async (
//   idTicket: number,
// ): Promise<SeguidorDTO> => {
//   const response = await api.post<SeguidorDTO>(`/tickets/${idTicket}/validar`);
//   return response.data;
// };
