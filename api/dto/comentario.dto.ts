import { EventoDto } from "./evento.dto";

export interface ComentarioDto {
  id: number;
  cliente: ClienteDto;
  calificacion: number;
  comentario: string;
  fijado?: boolean;
  createdAt: Date;
  eventoId: number;
  evento: EventoDto;
}

export interface ClienteDto {
  userId: number;
  user: {
    username: string;
    email: string;
    emailVerifiedAt: string | null;
    roles: { name: string; description: string }[];
  };
  nombre: string;
  apellido: string;
  telefono: string;
  imagenPerfilUrl: string | null;
  puntosAcumulados: number;
}
