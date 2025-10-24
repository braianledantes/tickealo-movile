import { EstadisticasDto } from "@/api/dto/evento.dto";
import { porcentaje } from "@/utils/utils";
import { StyleSheet, View } from "react-native";
import { Estrellas } from "../Comentarios/Estrellas";
import { Texto } from "../Texto";

type Props = {
  estadisticas: EstadisticasDto | null;
};

export function Estadisticas({ estadisticas }: Props) {
  if (!estadisticas) return null;

  const estrellas = [
    { label: "Inolvidable", count: estadisticas.cantCinco },
    { label: "Épico", count: estadisticas.cantCuatro },
    { label: "Vale la pena", count: estadisticas.cantTres },
    { label: "Podría mejorar", count: estadisticas.cantDos },
    { label: "Meh", count: estadisticas.cantUno },
  ];

  return (
    <View style={styles.card}>
      <View className="flex-row justify-center items-center">
        <Texto semiBold className="text-white tracking-wider">
          Estadisticas del Evento
        </Texto>
      </View>
      <View style={styles.promedioRow}>
        <Texto bold style={styles.promedio}>
          {estadisticas.promedio.toFixed(1)}
        </Texto>
        <View className="mb-4">
          <Estrellas
            calificacion={Number(estadisticas.promedio)}
            starSize={18}
          />
          <Texto style={styles.totalCalificaciones}>
            ({estadisticas.total} calificaciones)
          </Texto>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rightColumn}>
          {estrellas.map((e) => (
            <View key={e.label} style={styles.barraRow}>
              <Texto style={styles.label}>{e.label}</Texto>
              <View style={styles.barraFondo}>
                <View
                  style={[
                    styles.barraProgreso,
                    { width: `${porcentaje(e.count, estadisticas.total)}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightColumn: {
    flex: 1, // 50%
  },
  promedioRow: {
    flexDirection: "row",
    justifyContent: "center", // centra horizontal
    alignItems: "center", // centra vertical
    gap: 8, // espacio entre elementos (React Native >= 0.71)
    marginBottom: 2,
  },
  promedio: {
    fontSize: 48,
    color: "#fff",
    // quitamos marginBottom para que quede alineado
  },
  totalCalificaciones: {
    color: "#fff",
    fontSize: 12,
    marginTop: 0,
  },

  barraRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  label: {
    width: 90,
    color: "#fff",
    fontSize: 12,
    textAlign: "right",
    paddingEnd: 10,
  },
  barraFondo: {
    flex: 1,
    height: 8,
    backgroundColor: "#1b1b40",
    borderRadius: 6,
    overflow: "hidden",
    marginLeft: 4,
  },
  barraProgreso: {
    height: "100%",
    backgroundColor: "#90E0EF",
    borderRadius: 6,
  },
});
