import api from "./axiosConfig";

//Poner recordatorio de un evento
export const postRecordatorio = async (eventoId: number): Promise<any> => {
  const response = await api.post(`/recordatorios/eventos/${eventoId}`);
  return response.data;
};

// Quitar recordatorio de un evento
export const deleteRecordatorio = async (eventoId: number): Promise<any> => {
  const response = await api.delete(`/recordatorios/eventos/${eventoId}`);
  return response.data;
};
