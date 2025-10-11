import { useContext } from "react";
import { EventosContext } from "../context/EventosContext";

export const useEventos = () => {
  const context = useContext(EventosContext);
  if (!context) {
    throw new Error("useEventos must be used within a EventosProvider");
  }
  return context;
};
