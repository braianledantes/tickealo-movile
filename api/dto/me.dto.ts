export interface Me {
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
  pais: string;
}
