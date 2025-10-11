import api from "./axiosConfig";

type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion: string;
    ciudad: string;
    provincia: string;
  };
};
export const fetchUpcomingEvents = async (): Promise<Event[]> => {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const res = await api.get("/eventos", {
    params: {
      page: 1,
      limit: 10,
      search: "", // requerido por backend
      orderDir: "ASC", // requerido por backend
      fechaInicio: today,
    },
  });

  return res.data.data; // 👈 el backend devuelve { data, pagination }
};

export const getEventosById = async (
  idProductora: number,
): Promise<Event[]> => {
  const response = await api.get(`/productora/${idProductora}/eventos`);
  return response.data;
};
