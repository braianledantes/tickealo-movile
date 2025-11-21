import { EventoDto } from "@/api/dto/evento.dto";
import { Texto } from "@/components/Texto";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { EventCard } from "./EventCard";

export function EventList({
  title = "TODOS LOS EVENTOS",
  events = [],
  onPressEvent,
}: {
  title?: string | null;
  events?: EventoDto[];
  onPressEvent?: (id: number) => void;
}) {
  const router = useRouter();
  if (events.length === 0) {
    return null;
  }

  return (
    <ScrollView style={styles.content}>
      <Texto bold className="text-[#90e0ef] tracking-wider mb-2">
        {title}
      </Texto>
      {events.map((event) => (
        <EventCard
          key={event.id}
          image={event.portadaUrl ?? "https://placehold.co/600x400"}
          title={event.nombre}
          date={new Date(event.inicioAt).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          location={`${event.lugar?.direccion ?? ""} ${event.lugar?.provincia ?? ""}`}
          agotado={event.stockEntradas <= 0}
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
});
