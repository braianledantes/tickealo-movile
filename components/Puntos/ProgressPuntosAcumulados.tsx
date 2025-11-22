import { Texto } from "@/components/Texto";
import { LinearGradient } from "expo-linear-gradient";
import { Info } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { InfoPuntos } from "./InfoPuntos";

interface Props {
  puntosAcumulados?: number;
}

export default function ProgressPuntosAcumulados({
  puntosAcumulados = 0,
}: Props) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      })
    ).start();
    // eslint-disable-next-line
  }, []);

  // ANCHO DINÁMICO
  const getBarWidth = () => {
    if (puntosAcumulados === 0) return "0%";
    if (puntosAcumulados < 100) return "10%";
    if (puntosAcumulados < 1000) return "30%";
    if (puntosAcumulados < 2000) return "50%";
    if (puntosAcumulados < 5000) return "70%";
    return "90%";
  };

  const barWidth = getBarWidth();

  //luz que se mueve
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-25%", "400%"],
  });

  return (
    <View className="mt-6">
      <View style={styles.card}>
        <View className="flex-row justify-between items-center mb-2">
          <Texto bold className="text-white text-lg tracking-wider">
            Puntos acumulados
          </Texto>
          {/* Botón MÁS INFO */}
          <TouchableOpacity
            onPress={() => setOpenInfo(true)}
            className="flex-row items-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Texto className="text-[#ffffff] ml-1 text-base">Más info </Texto>
            <Info size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

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
      <InfoPuntos
        visible={openInfo}
        onClose={() => setOpenInfo(false)}
        puntos={puntosAcumulados}
      />
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
