import { useToast } from "@/hooks/context/useToast";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export const useValidarEntradas = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  const handleBarCodeScanned = (code: string) => {
    if (scanned) return;
    setScanned(true);
    setTimeout(() => setScanned(false), 1200);
    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: code },
    });
  };

  const handleManualValidation = () => {
    const code = manualCode.trim();

    if (!code) {
      showToast("error", "Campo vacío", "Por favor ingresa un código válido.");
      return;
    }
    const raw = code.replace(/\s+/g, "");

    if (raw.length !== 6) {
      showToast(
        "error",
        "Código inválido",
        "El código debe tener 6 caracteres."
      );
      return;
    }
    const normalized = raw.slice(0, 3) + " " + raw.slice(3);

    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: normalized },
    });
  };

  return {
    scanned,
    setScanned,
    manualCode,
    setManualCode,
    isFocused,
    setIsFocused,
    handleBarCodeScanned,
    handleManualValidation,
  };
};
