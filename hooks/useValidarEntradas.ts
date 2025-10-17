import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useValidarEntradas = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [manualCode, setManualCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission, requestPermission]);

  const handleBarCodeScanned = (code: string) => {
    if (scanned) return;
    setScanned(true);
    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: code },
    });
  };

  const handleManualValidation = () => {
    if (!manualCode.trim()) {
      Alert.alert("Campo vacío", "Por favor ingresa un código válido.");
      return;
    }
    router.push({
      pathname: "/validador/ticket/[ticketId]",
      params: { ticketId: manualCode.trim() },
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
