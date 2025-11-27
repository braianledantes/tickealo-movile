export interface ObtenerEventosFavoritosResponseDto {
  cantidad: number;
  eventos: EventoFavoritoDto[];
}

export interface EventoFavoritoDto {
  id: number;
  productora: {
    userId: number;
    cuit: string;
    nombre: string;
    direccion: string;
    telefono: string;
    imagenUrl: string | null;
    creditosDisponibles: number;
    calificacion: number;
    pais: string;
  };
  nombre: string;
  descripcion: string;
  inicioAt: Date;
  finAt: Date;
  cancelado: boolean;
  portadaUrl: string | null;
  bannerUrl: string | null;
  lugar: {
    id: number;
    latitud: string;
    longitud: string;
    direccion: string;
    ciudad: string;
    provincia: string;
    pais: string;
    isoCodigoPais: string;
    createdAt: Date;
    updatedAt: Date;
  };
  capacidad: number;
  stockEntradas: number;
  createdAt: Date;
  updatedAt: Date;
}
