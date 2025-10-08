export interface SeguidorDTO {
  userId: number;
  nombre: string;
  apellido?: string;
  imagenPerfilUrl?: string | null;
  puntosAcumulados?: number;
  telefono?: string;
  user: {
    email: string;
    emailVerifiedAt?: string | null;
    username: string;
  };
}