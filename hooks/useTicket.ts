import { useValidador } from "@/hooks/context/useValidador";
import { useEffect, useRef, useState } from "react";

export const useTicket = (ticketId: string | undefined) => {
  const { validarTicket } = useValidador();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [mensaje, setMensaje] = useState<string>("");

  const alreadyValidated = useRef(false);

  useEffect(() => {
    const validar = async () => {
      if (alreadyValidated.current || !ticketId) return;
      alreadyValidated.current = true;

      try {
        const respuesta = await validarTicket(ticketId.trim());
        // mensajesTicket es un diccionario de códigos a mensajes
        import("@/utils/ticketResponse").then(({ mensajesTicket }) => {
          const texto =
            mensajesTicket[respuesta] || "Ocurrió un error inesperado";
          setValid(respuesta === 200);
          setMensaje(texto);
        });
      } catch (err) {
        console.error("Error validando ticket:", err);
        setValid(false);
        setMensaje("No pudimos validar tu ticket. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    validar();
  }, [ticketId, validarTicket]);

  return { loading, valid, mensaje };
};
