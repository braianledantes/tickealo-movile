export type EventoValidadorDto = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  cancelado: boolean;
  portadaUrl: string;
  bannerUrl: string;
  capacidad: number;
  stockEntradas: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductoraValidadorDto = {
  calificacion: number;
  creditosDisponibles: number;
  cuit: number;
  direccion: string;
  imagenUrl: string;
  nombre: string;
  telefono: string;
  user: User;
  userId: number;
};

export type User = {
  email: string;
  username: string;
};
