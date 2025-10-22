import { getEstadoVisual } from "@/utils/filtrarCompras";
import { StyleSheet, Text, View } from "react-native";

export default function CompraEstado({
  compraEstado,
  align = "flex-start",
}: {
  compraEstado: string | undefined;
  align?: "flex-start" | "center" | "flex-end";
}) {
  const estado = getEstadoVisual(compraEstado);

  return (
    <View
      style={[
        styles.estadoBox,
        {
          backgroundColor: estado.bg,
          borderColor: estado.color,
          alignSelf: align, // 👈 ahora sí es dinámico
        },
      ]}
    >
      <Text style={[styles.estadoText, { color: estado.color }]}>
        {estado.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  estadoText: {
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  estadoBox: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 5,
  },
});
