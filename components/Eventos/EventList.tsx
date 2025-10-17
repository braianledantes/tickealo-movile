import { EventoDto } from "@/api/dto/evento.dto";
import { Texto } from "@/components/Texto";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

import { EventCard } from "./EventCard";

export function EventList({
  events = [],
  onPressEvent,
}: {
  events?: EventoDto[];
  onPressEvent?: (id: number) => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconColor = isDark ? "#90e0ef" : "#007AFF";
  const textColor = isDark ? "#ccc" : "#555";

  // 👇 Animación bounce
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    if (events.length === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [events.length]);

  if (events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Ionicons name="calendar-outline" size={56} color={iconColor} />
        </Animated.View>
        <Text style={[styles.empty, { color: textColor }]}>
          No hay próximos eventos
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.content}>
      <Texto bold className="text-[#90e0ef] tracking-wider mb-2">
        TODOS LOS EVENTOS
      </Texto>
      {events.map((event) => (
        <EventCard
          key={event.id}
          image={event.portadaUrl ?? "https://placehold.co/600x400"}
          title={event.nombre}
          date={new Date(event.inicioAt).toLocaleDateString("es-AR")}
          location={`${event.lugar?.direccion ?? ""} ${event.lugar?.provincia ?? ""}`}
          // 👇 Aquí usamos la prop si existe, o el router si no
          onPress={() =>
            onPressEvent
              ? onPressEvent(event.id)
              : router.push({
                  pathname: "/info-evento",
                  params: { eventoId: String(event.id) },
                })
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 15 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});
