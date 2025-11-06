import { useContext } from "react";
import { TransferenciaContext } from "../../context/TransferenciaContext";

export const useTransferencia = () => {
  const context = useContext(TransferenciaContext);
  if (!context) {
    throw new Error(
      "useTransferencia must be used within a TransferenciaProvider",
    );
  }
  return context;
};
