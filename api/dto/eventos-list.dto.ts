export interface EventoDto {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string | null;
  lugar: {
    direccion: string;
    ciudad: string;
    provincia: string;
    latitud: number;
    longitud: number;
    createdAt: Date;
    updatedAt: Date;
  };
  productora: {
    userId: number;
    cuit: string;
    nombre: string;
    direccion: string;
    telefono: string;
    imagenUrl?: string | null;
    creditosDisponibles: number;
    calificacion: number;
  };
  entradas: {
    id: number;
    tipo: string;
    precio: number;
    cantidad: number;
    stock: number;
  }[];
  cuentaBancaria: {
    id: number;
    nombreTitular: string;
    nombreBanco: string;
    alias: string;
    cbu: string;
    instrucciones: string;
    createdAt: Date;
    updatedAt: Date;
  };
  capacidad: number;
  stockEntradas: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventosListDto {
  data: EventoDto[];
  pagination: {
    total: number;
    page: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
