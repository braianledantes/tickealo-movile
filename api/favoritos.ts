import api from "./axiosConfig";
import { AgregarEventoFavoritoResponseDto } from "./dto/eventos-favoritos/agregar-evento-favorito.dto";
import { EliminarEventoFavoritoResponseDto } from "./dto/eventos-favoritos/eliminar-evento-favorito.dto";
import { ObtenerEventosFavoritosResponseDto } from "./dto/eventos-favoritos/obtener-eventos-favoritos.dto";

export const getFavoritos =
  async (): Promise<ObtenerEventosFavoritosResponseDto> => {
    const response = await api.get("/favoritos/eventos");
    return response.data;
  };

export const postFavorito = async (
  eventoId: number,
): Promise<AgregarEventoFavoritoResponseDto> => {
  const response = await api.post(`/favoritos/eventos/${eventoId}`);
  return response.data;
};

export const deleteFavorito = async (
  eventoId: number,
): Promise<EliminarEventoFavoritoResponseDto> => {
  const response = await api.delete(`/favoritos/eventos/${eventoId}`);
  return response.data;
};
