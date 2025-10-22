import api from "./axiosConfig";
import { CompraDto, ComprasResponse } from "./dto/compras.dto";

//iniciar una compra
export const iniciarCompra = async (body: {
  idEntrada: number;
  cant: number;
}): Promise<CompraDto> => {
  const response = await api.post<CompraDto>(
    "/compras/iniciar-compra-entrada",
    body, // se envía como JSON
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

//finalizar una compra
export const finalizarCompra = async (
  compraId: string | number,
  formData: FormData,
): Promise<CompraDto> => {
  const response = await api.put<CompraDto>(
    `/compras/${compraId}/finalizar-compra-entrada`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
};

// Obtener las compras realizadas por el usuario
export const getCompras = async (
  page: number,
  limit: number,
): Promise<ComprasResponse> => {
  const response = await api.get(`/compras/mis-compras`, {
    params: { page, limit },
  });
  return response.data;
};

export const getCompra = async (compraId: number): Promise<CompraDto> => {
  const response = await api.get(`/compras/${compraId}`);
  return response.data;
};
