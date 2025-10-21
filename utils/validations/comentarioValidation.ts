interface ComentarioData {
  comentario: string;
  calificacion: number;
}

export const validarComentario = (data: ComentarioData): string | null => {
  const { comentario, calificacion } = data;

  if (!comentario.trim()) return "El comentario no puede estar vacío.";
  if (calificacion < 1 || calificacion > 5)
    return "La calificación debe ser entre 1 y 5.";

  return null;
};
