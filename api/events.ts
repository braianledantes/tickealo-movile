import api from "./axiosConfig";
import { EstadisticasDto, EventoDto } from "./dto/evento.dto";

export const fetchUpcomingEvents = async (): Promise<EventoDto[]> => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const res = await api.get("/eventos", {
    params: {
      page: 1,
      limit: 50,
      search: "",
      orderDir: "DESC",
      fechaFin: today,
    },
  });

  return res.data.data;
};

//Obtener eventos proximos de productoras que sigue
export const getEventosSeguidos = async (): Promise<EventoDto[]> => {
  const response = await api.get("eventos/seguidos");
  return response.data;
};

//obtiene detalle de un evento
export const getEventoById = async (id: number): Promise<EventoDto> => {
  const response = await api.get(`/eventos/${id}`);
  return response.data;
};

//obtiene eventos proximos a la fecha actual
export const getProximosEventos = async (): Promise<EventoDto[]> => {
  const response = await api.get("/eventos/proximos");
  return response.data;
};

//obtiene los eventos de una productora
export const getEventosById = async (
  idProductora: number,
): Promise<EventoDto[]> => {
  const response = await api.get(`/productora/${idProductora}/eventos`);
  return response.data;
};

//Obtener estadisticas de un evento
export const getEstadisticas = async (
  eventoId: number,
): Promise<EstadisticasDto> => {
  const response = await api.get(`/eventos/${eventoId}/calificaciones`);
  return response.data;
};
