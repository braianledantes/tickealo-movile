import { EventoDto } from "@/api/dto/evento.dto";
import { TicketValidadorDto } from "@/api/dto/ticket-validador";
import { Texto } from "@/components/Texto";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface Props {
  evento?: EventoDto | null;
  ticketsTotalesEvento?: TicketValidadorDto[];
}

export default function ProgressTicket({
  evento,
  ticketsTotalesEvento = [],
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
  }, [shimmerAnim]);

  if (!evento) {
    return (
      <Texto className="text-[#aaa]">Cargando información del evento...</Texto>
    );
  }

  const entradas = evento.entradas ?? [];
  const totalCapacidad = evento.capacidad ?? 0;

  if (entradas.length === 0) {
    return (
      <Texto className="text-[#aaa]">
        No se encontraron entradas para este evento.
      </Texto>
    );
  }

  // Tickets por estado
  const ticketsPendientes = ticketsTotalesEvento.filter(
    (t) => t.estado === "PENDIENTE_VALIDACION",
  );
  const ticketsRechazados = ticketsTotalesEvento.filter(
    (t) => t.estado === "ANULADA",
  );
  const ticketsValidadosTotales = ticketsTotalesEvento.filter(
    (t) => t.estado === "VALIDADO",
  );

  const porcentajeEvento =
    totalCapacidad > 0
      ? Math.round((ticketsValidadosTotales.length / totalCapacidad) * 100)
      : 0;

  // Animación glow
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-25%", "400%"],
  });

  return (
    <View className="mt-6 px-4">
      {/* Progreso total del evento */}
      <View style={styles.card}>
        <Texto className="text-white text-lg font-bold tracking-wider mb-2">
          Progreso total del evento
        </Texto>

        <View className="flex-row items-center justify-between mb-2">
          <Texto className="text-[#ddd] text-sm">
            {ticketsValidadosTotales.length} / {totalCapacidad} tickets
          </Texto>
          <Texto className="text-white font-bold text-sm">
            {porcentajeEvento}%
          </Texto>
        </View>

        <View style={styles.barraFondo}>
          <View
            style={[styles.barraProgreso, { width: `${porcentajeEvento}%` }]}
          >
            <LinearGradient
              colors={["#90E0EF", "#CAF0F8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />

            {/* Glow animado */}
            <Animated.View
              style={[styles.glow, { transform: [{ translateX }] }]}
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

      {/* Estadísticas adicionales */}
      <View className="mt-4 gap-2 px-4">
        {/* Tickets Pendientes */}
        <View className="flex-row justify-between">
          <Texto semiBold className="text-[#999] text-md tracking-wider">
            Pendientes
          </Texto>
          <Texto bold className="text-[#999] text-md">
            {ticketsPendientes.length}
          </Texto>
        </View>

        {/* Tickets Rechazados */}
        <View className="flex-row justify-between">
          <Texto semiBold className="text-[#999] text-md tracking-wider">
            Rechazados
          </Texto>
          <Texto bold className="text-[#999] text-md">
            {ticketsRechazados.length}
          </Texto>
        </View>

        {/* Tickets validados por tipo */}
        {entradas.map((entrada) => {
          const cantValidados = ticketsValidadosTotales.filter(
            (t) => t.entrada?.tipo === entrada.tipo,
          ).length;
          return (
            <View key={entrada.tipo} className="flex-row justify-between mb-1">
              <Texto bold className="text-[#ddd] text-md">
                {entrada.tipo}
              </Texto>
              <Texto bold className="text-[#4da6ff] text-md">
                {cantValidados} / {entrada.cantidad ?? 0}
              </Texto>
            </View>
          );
        })}

        {/* Total tickets validados */}
        <View className="flex-row justify-between">
          <Texto bold className="text-[#7a86b6] text-md">
            Total validados
          </Texto>
          <Texto bold className="text-[#7a86b6] text-md">
            {ticketsValidadosTotales.length}
          </Texto>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0c0f2b",
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
    backgroundColor: "#1b1b40",
    borderRadius: 8,
    overflow: "hidden",
  },
  barraProgreso: {
    height: "100%",
    borderRadius: 8,
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
    borderRadius: 8,
  },
});
