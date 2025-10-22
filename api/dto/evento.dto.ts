import { ComentarioDto } from "./comentario.dto";
export interface EventoDto {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  bannerUrl?: string;
  portadaUrl?: string;
  lugar: LugarDto;
  productora: ProductoraDto;
  entradas: EntradaDto[];
  cuentaBancaria: CuentaBancariaDto;
  capacidad: number;
  stockEntradas: number;
  createdAt: Date;
  updatedAt: Date;
  esFavorito: boolean;
  comentarios?: ComentarioDto[];
}

export interface CuentaBancariaDto {
  id: number;
  nombreTitular: string;
  nombreBanco: string;
  alias: string;
  cbu: string;
  instrucciones: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LugarDto {
  direccion: string;
  ciudad: string;
  provincia: string;
  latitud: number;
  longitud: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EntradaDto {
  id: number;
  tipo: string;
  precio: number;
  cantidad: number;
  stock: number;
}

export interface ProductoraDto {
  userId: number;
  cuit: number;
  nombre: string;
  direccion: string;
  telefono: string;
  imagenUrl: string;
  creditosDisponibles: number;
  calificacion: number;
  isSeguido: boolean;
  user: User;
}

export interface User {
  email: string;
  username: string;
}
