import api from "./axiosConfig";
import { ComprasResponse } from "./dto/compras.dto";

//Realizar una compra
export const realizarCompra = async (
  formData: FormData,
): Promise<ComprasResponse> => {
  const response = await api.post<ComprasResponse>(
    "/compras/comprar-entrada",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
};

// Obtener las compras realizadas por el usuario
export const getCompras = async (): Promise<ComprasResponse> => {
  const response = await api.get(`/compras/mis-compras`);
  return response.data;
};
