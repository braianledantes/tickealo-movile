import { Texto } from "@/components/Texto";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  puntosAcumulados?: number;
}

export default function ProgressPuntosAcumulados({
  puntosAcumulados = 0,
}: Props) {
  if (puntosAcumulados === undefined || puntosAcumulados === null) {
    return (
      <Texto className="text-[#aaa]">Cargando puntos del usuario...</Texto>
    );
  }

  const porcentajePunto =
    puntosAcumulados > 0 ? Math.round((puntosAcumulados / 1000) * 100) : 0;

  return (
    <View className="mt-6">
      {/* Progreso total de puntos acumulados */}
      <View style={styles.card}>
        <Texto bold className="text-white text-lg tracking-wider mb-2">
          Puntos acumulados
        </Texto>

        <View className="flex-row items-center justify-between mb-4">
          <Texto className="text-[#ddd] text-sm">
            {puntosAcumulados} / 1000 puntos
          </Texto>
          <Texto className="text-white font-bold text-sm">
            {porcentajePunto}%
          </Texto>
        </View>

        <View style={styles.barraFondo}>
          <LinearGradient
            colors={["#90E0EF", "#CAF0F8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barraProgreso, { width: `${porcentajePunto}%` }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1b1b40",
    padding: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  barraFondo: {
    width: "100%",
    height: 16,
    backgroundColor: "#0b1030",
    borderRadius: 8,
    overflow: "hidden",
  },
  barraProgreso: {
    height: "100%",
    borderRadius: 8,
  },
});
