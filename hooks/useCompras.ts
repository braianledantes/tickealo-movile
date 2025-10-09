import { useContext } from "react";
import { ComprasContext } from "../context/ComprasContext";

export const useCompras = () => {
  const context = useContext(ComprasContext);
  if (!context) {
    throw new Error("useCompras must be used within a ComprasProvider");
  }
  return context;
};
