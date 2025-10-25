import { ComentariosContext } from "@/context/ComentariosContext";
import { useContext } from "react";

export function useComentarios() {
  const value = useContext(ComentariosContext);
  if (!value) {
    throw new Error(
      "useComentarios must be wrapped in a <ComentariosProvider />",
    );
  }

  return value;
}
