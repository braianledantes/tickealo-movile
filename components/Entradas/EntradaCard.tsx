import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type EntradaCardProps = {
  tipo: string;
  precio: number;
  onPress?: () => void;
};

export const EntradaCard: React.FC<EntradaCardProps> = ({
  tipo,
  precio,
  onPress,
}) => {
  const tipoColor = tipo.toLowerCase() === "vip" ? "#4da6ff" : "#77c3ff";

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {/* 🔹 Barra luminosa lateral izquierda */}
      <LinearGradient
        colors={["#4da6ff", "#7df9ff", "transparent"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBar}
      />

      {/* 🔹 Contenido principal del ticket */}
      <View style={styles.card}>
        {/* Lado izquierdo: texto */}
        <View style={styles.left}>
          <Text style={styles.label}>ENTRADA</Text>
          <Text style={[styles.tipo, { color: tipoColor }]}>
            {tipo.toUpperCase()}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: 4,
            }}
          >
            <Text style={styles.precio}>${precio.toLocaleString("es-AR")}</Text>
            <Text style={styles.porPersona}> por persona</Text>
          </View>
        </View>

        {/* Línea punteada divisoria */}
        <View style={styles.separator} />

        {/* Lado derecho: ícono de suma */}
        <View style={styles.right}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",
  },
  gradientBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b1030",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1b1e5e",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  left: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  label: {
    color: "#bbb",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  tipo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -2,
  },
  precio: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  porPersona: {
    color: "#999",
    fontSize: 12,
    marginBottom: 2,
  },
  separator: {
    width: 1,
    height: "70%",
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "#666",
  },
  right: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101347",
  },
});
