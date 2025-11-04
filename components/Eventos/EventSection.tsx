import { EventoDto } from "@/api/dto/evento.dto";
import { EventCard } from "@/components/Eventos/EventCard";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Texto } from "../Texto";

type Props = {
  title: string;
  color?: string | null;
  eventos: EventoDto[];
};

export function EventSection({ title, color, eventos }: Props) {
  const router = useRouter();

  if (!eventos.length) {
    return null;
  }

  return (
    <View className="px-4">
      {/* Header del dropdown */}
      <Texto
        bold
        style={{
          color: color ?? "#CAF0F8",
          letterSpacing: 1,
          marginBottom: 10,
        }}
      >
        {title}
      </Texto>

      {eventos.map((evento) => (
        <EventCard
          key={evento.id}
          image={evento.portadaUrl || "https://via.placeholder.com/140x160"}
          title={evento.nombre}
          date={new Date(evento.inicioAt).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          location={`${evento.lugar?.direccion || ""}, ${evento.lugar?.provincia || ""}`}
          onPress={() =>
            router.push({
              pathname: "/info-evento",
              params: { eventoId: String(evento.id) },
            })
          }
        />
      ))}
    </View>
  );
}
