import { useToast } from "@/hooks/context/useToast";
import { Linking } from "react-native";

/**
 * Abre Google Maps en una ubicación usando latitud y longitud.
 * @param latitud
 * @param longitud
 */
export async function abrirEnMaps(latitud: number, longitud: number) {
  const url = `https://www.google.com/maps?q=${latitud},${longitud}`;
  const { showToast } = useToast();

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      showToast("error", "Error", "No se pudo abrir Google Maps");
    }
  } catch (error) {
    showToast(
      "error",
      "Error",
      "Ocurrió un problema al intentar abrir el mapa"
    );
  }
}
