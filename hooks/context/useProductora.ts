import { useContext } from "react";
import { ProductoraContext } from "../../context/ProductoraContext";

export const useProductora = () => {
  const context = useContext(ProductoraContext);
  if (!context) {
    throw new Error("useProductora must be used within a ProductoraProvider");
  }
  return context;
};
