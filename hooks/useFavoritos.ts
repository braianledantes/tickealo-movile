import { FavoritoContext } from "@/context/FavoritosContext";
import { useContext } from "react";

export function useFavorito() {
  const value = useContext(FavoritoContext);
  if (!value) {
    throw new Error("useFavorito must be wrapped in a <FavoritoProvider />");
  }

  return value;
}
