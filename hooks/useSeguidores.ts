import { useContext } from "react";
import { SeguidoresContext } from "../context/SeguidoresContext";

export const useSeguidores = () => {
  const context = useContext(SeguidoresContext);
  if (!context) {
    throw new Error("useSeguidores must be used within a SeguidoresProvider");
  }
  return context;
};
