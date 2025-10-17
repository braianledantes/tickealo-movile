export type EventoValidadorDto = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  bannerUrl?: string;
  portadaUrl?: string;
  lugar: {
    direccion: string;
    ciudad: string;
    provincia: string;
    latitud: number;
    longitud: number;
    createdAt: Date;
    updatedAt: Date;
  };
  productora: ProductoraValidadorDto;
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
  isSeguido: boolean;
};

export type User = {
  email: string;
  username: string;
};
