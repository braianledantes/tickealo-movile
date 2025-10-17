import { EventCard } from "@/components/Eventos/EventCard";
import { useEventos } from "@/hooks/useEventos";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Texto } from "../Texto";

export default function EventosProximos() {
  const { proximos } = useEventos();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  if (!proximos.length) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <Text className="text-[#A5A6AD] text-lg text-center mt-10 font-poppins-400">
          No se encontraron eventos
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4">
      {/* Header del dropdown */}
      <TouchableOpacity
        onPress={toggleExpanded}
        activeOpacity={0.7}
        className="flex-row justify-between items-center py-2"
      >
        <Texto bold className="text-[#CAF0F8] tracking-wider">
          PRÓXIMOS EVENTOS
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
          {proximos.map((evento) => (
            <EventCard
              key={evento.id}
              image={evento.portadaUrl || "https://via.placeholder.com/140x160"}
              title={evento.nombre}
              date={new Date(evento.inicioAt).toLocaleDateString("es-AR")}
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
