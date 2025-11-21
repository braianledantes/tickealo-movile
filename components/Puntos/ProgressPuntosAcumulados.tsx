import { Texto } from "@/components/Texto";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface Props {
  puntosAcumulados?: number;
}

export default function ProgressPuntosAcumuladosGlow({
  puntosAcumulados = 0,
}: Props) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      }),
    ).start();
    // eslint-disable-next-line
  }, []);

  // ANCHO DINÁMICO
  const getBarWidth = () => {
    if (puntosAcumulados < 1000) return "30%";
    if (puntosAcumulados < 2000) return "50%";
    if (puntosAcumulados < 5000) return "70%";
    return "90%";
  };

  const barWidth = getBarWidth();

  // Movimiento del glow
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-25%", "400%"],
  });

  return (
    <View className="mt-6">
      <View style={styles.card}>
        <Texto bold className="text-white text-lg tracking-wider mb-2">
          Puntos acumulados
        </Texto>

        <Texto className="text-[#ddd] text-base mb-4">
          {puntosAcumulados} pts
        </Texto>

        <View style={styles.barraFondo}>
          {/* BARRA BASE */}
          <View style={[styles.barraProgreso, { width: barWidth }]}>
            <LinearGradient
              colors={["#90E0EF", "#CAF0F8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />

            <Animated.View
              style={[
                styles.glow,
                {
                  transform: [{ translateX }],
                },
              ]}
            >
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0)",
                  "rgba(255,255,255,0.5)",
                  "rgba(255,255,255,0)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.glowGradient}
              />
            </Animated.View>
          </View>
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
  },
  barraFondo: {
    width: "100%",
    height: 18,
    backgroundColor: "#0b1030",
    borderRadius: 10,
    overflow: "hidden",
  },
  barraProgreso: {
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  glow: {
    position: "absolute",
    height: "100%",
    width: "25%",
    top: 0,
  },
  glowGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
