import { useContext } from "react";
import { ValidadorContext } from "../context/ValidadorContext";

export const useValidador = () => {
  const context = useContext(ValidadorContext);
  if (!context) {
    throw new Error("useVaidador must be used within a ValidadorProvider");
  }
  return context;
};
