import api from "./axiosConfig";
import { EventoDto } from "./dto/evento.dto";

export const fetchUpcomingEvents = async (): Promise<EventoDto[]> => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const res = await api.get("/eventos", {
    params: {
      page: 1,
      limit: 50,
      search: "",
      orderDir: "ASC",
      fechaInicio: today,
    },
  });

  return res.data.data;
};

export const getEventosById = async (
  idProductora: number,
): Promise<EventoDto[]> => {
  const response = await api.get(`/productora/${idProductora}/eventos`);
  return response.data;
};
