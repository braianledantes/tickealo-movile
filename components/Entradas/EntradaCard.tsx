import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

type EntradaCardProps = {
  tipo: string;
  precio: number;
  onPress?: () => void;
  right?: React.ReactNode;
  priceValueOverride?: number;
  priceSuffixText?: string;
  disabled?: boolean; // nueva prop
};

export const EntradaCard: React.FC<EntradaCardProps> = ({
  tipo,
  precio,
  onPress,
  right,
  priceValueOverride,
  priceSuffixText,
  disabled = false,
}) => {
  const tipoColor = tipo.toLowerCase() === "vip" ? "#4da6ff" : "#77c3ff";

  const Content = (
    <View style={styles.card}>
      <LinearGradient
        colors={["#03055F", "#00B4D8", "#90E0EF", "#CAF0F8"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBar}
      />

      {/* Izquierda */}
      <View style={styles.left}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Texto semiBold style={styles.label}>
            ENTRADA
          </Texto>
          <Texto style={[styles.tipo, { color: tipoColor }]}>
            {tipo.toUpperCase()}
          </Texto>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 4 }}
        >
          <Text style={styles.precio}>
            $
            {Number(priceValueOverride ?? precio).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Texto style={styles.porPersona}>
            {" "}
            {priceSuffixText ?? "por persona"}
          </Texto>
        </View>
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      {/* Derecha (slot) */}
      <View style={styles.right}>
        {right ?? <Ionicons name="add" size={24} color="#fff" />}
      </View>

      {/* Overlay si está deshabilitado */}
      {disabled && <View style={styles.disabledOverlay} />}
    </View>
  );

  return onPress && !disabled ? (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {Content}
    </TouchableOpacity>
  ) : (
    <View style={styles.wrapper}>{Content}</View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginVertical: 8, overflow: "hidden" },
  gradientBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b1030",
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1b1e5e",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  left: { flex: 1, paddingVertical: 14, paddingHorizontal: 20 },
  label: { color: "#bbb", fontSize: 14, letterSpacing: 0.5 },
  tipo: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  precio: { color: "#fff", fontSize: 20, fontWeight: "bold", letterSpacing: 1 },
  porPersona: { color: "#999", fontSize: 12, marginBottom: 2 },
  separator: {
    width: 1,
    height: "70%",
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "#666",
  },
  right: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b1030",
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
