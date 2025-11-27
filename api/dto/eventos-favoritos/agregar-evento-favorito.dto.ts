export interface AgregarEventoFavoritoDto {
  eventoId: number;
}

export interface AgregarEventoFavoritoResponseDto {
  evento: {
    id: number;
    nombre: string;
    descripcion: string;
    inicioAt: Date;
    finAt: Date;
    cancelado: boolean;
    portadaUrl: string | null;
    bannerUrl: string | null;
    capacidad: number;
    stockEntradas: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
