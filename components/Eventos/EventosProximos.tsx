import { EventoDto } from "@/api/dto/evento.dto";
import { EventCard } from "@/components/Eventos/EventCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Texto } from "../Texto";

type Props = {
  title: string;
  color?: string | null;
  eventos: EventoDto[];
};

export function EventSection({ title, color, eventos }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  if (!eventos.length) {
    return null;
  }

  return (
    <View className="px-4">
      {/* Header del dropdown */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        className="flex-row justify-between items-center py-2"
      >
        <Texto bold style={{ color: color ?? "#CAF0F8", letterSpacing: 1 }}>
          {title}
        </Texto>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#CAF0F8"
        />
      </TouchableOpacity>

      {expanded && (
        <ScrollView
          className="max-h-[520px] pt-1 pb-1"
          showsVerticalScrollIndicator={true}
        >
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
        </ScrollView>
      )}
    </View>
  );
}
