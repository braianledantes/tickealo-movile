import * as Location from "expo-location";
import { PROVINCIAS_AR, Provincia } from "./provincias";

// Normaliza tildes y capitalización
export function normalizeProvince(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const NORMALIZED = new Map(PROVINCIAS_AR.map((p) => [normalizeProvince(p), p]));

export async function getUserProvince(): Promise<Provincia | null> {
  // Pedir permisos
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return null;

  // Coordenadas rápidas (sin alta precisión para ahorrar batería)
  const coords = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  // Reverse geocoding
  const places = await Location.reverseGeocodeAsync({
    latitude: coords.coords.latitude,
    longitude: coords.coords.longitude,
  });

  const province = places[0]?.region || places[0]?.subregion || "";
  if (!province) return null;

  const normalized = normalizeProvince(province);
  // Match con lista conocida (maneja casos como 'Córdoba' vs 'Cordoba')
  return (NORMALIZED.get(normalized) as Provincia | undefined) || null;
}
