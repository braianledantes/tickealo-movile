// En el excel lo planteamos como resenia pero al fin y al cabo son comentarios que pueden responderse y dar mg

//api/eventos/comentarios
export interface ComentarioDto {
  id: number;
  usuario: UsuarioDto;
  calificacion: number; // El proposito de la resenia, una calificacion del 1 al 5 o algo asi
  comentario: string; // el texto del comentario en cuestion
  fijado?: boolean; // la productora podria fijar un solo comentario por evento, ya sea su propio comentario o ajeno
  like: number; // cantidad de "me gusta"
  createdAt: Date; // fecha de creación para ver que tan antiguo es
  eventoId: number; // referencia al evento

  // me lo recomendo chtgpt, es por si implementamos que se pueda comentar sobre un comentario,
  // es como darle la oportunidad de la productora de responder resenias negativas o responder dudas
  // parentId?: number | null;
  // respuestas?: ComentarioDto[]; // Entonces tendra una relacion recursiva o en cascada consigo mismo.
}

export interface UsuarioDto {
  userId: number;
  user: {
    username: string; //Para idetificar autor
    email: string;
    emailVerifiedAt: string | null;
    roles: { name: string; description: string }[];
  };
  nombre: string; //Identificacion mas amigable(?) opcional
  apellido: string;
  telefono: string;
  imagenPerfilUrl: string | null; //Identificar de forma visual
  puntosAcumulados: number;
}
