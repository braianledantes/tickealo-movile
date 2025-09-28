// src/api/events.ts
import api from "./axiosConfig";

export interface Event {
  id: number;
  nombre: string;
  descripcion: string;
  inicio_at: string;
  fin_at: string;
  lugar: {
    direccion: string;
    ciudad: string;
    provincia: string;
  };
  portada_url: string;
}

export const fetchUpcomingEvents = async (): Promise<Event[]> => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const res = await api.get("/eventos", {
    params: {
      page: 1,
      limit: 10,
      search: "",       // requerido por backend
      orderDir: "ASC",  // requerido por backend
      fechaInicio: today,
    },
  });

  return res.data.data; // 👈 el backend devuelve { data, pagination }
};
