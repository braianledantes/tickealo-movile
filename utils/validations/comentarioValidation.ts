interface ComentarioData {
  comentario: string;
}

export const validarComentario = (data: ComentarioData): string | null => {
  const { comentario } = data;

  if (!comentario.trim()) return "El comentario no puede estar vacío.";
  return null;
};
