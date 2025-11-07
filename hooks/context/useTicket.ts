import { useContext } from "react";
import { TicketContext } from "../../context/TicketContext";

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
