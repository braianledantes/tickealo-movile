import { useContext } from "react";
import { EstadisticasContext } from "../../context/EstadisticasContext";

export const useEstadisticas = () => {
  const context = useContext(EstadisticasContext);
  if (!context) {
    throw new Error(
      "useEstadisticas must be used within a EstadisticasProvider",
    );
  }
  return context;
};
