import { Alert, Linking } from "react-native";

/**
 * Abre Google Maps en una ubicación usando latitud y longitud.
 * @param latitud
 * @param longitud
 */
export async function abrirEnMaps(latitud: number, longitud: number) {
  const url = `https://www.google.com/maps?q=${latitud},${longitud}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No se pudo abrir Google Maps");
    }
  } catch (error) {
    Alert.alert("Error", "Ocurrió un problema al intentar abrir el mapa");
  }
}
