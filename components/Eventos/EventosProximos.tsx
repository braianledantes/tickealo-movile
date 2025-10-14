import { EventCard } from "@/components/Eventos/EventCard";
import { useEventos } from "@/hooks/useEventos";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Texto } from "../Texto";

type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion?: string;
    ciudad?: string;
    provincia?: string;
  };
};

export default function EventosProximos({ dropdown }: { dropdown?: boolean }) {
  const { proximosEventos } = useEventos();
  const router = useRouter();
  const [eventos, setEventos] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true); // control del dropdown

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const listaEventos = await proximosEventos();
        setEventos(listaEventos || []);
      } catch (error) {
        console.error("Error cargando eventos:", error);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!dropdown) setExpanded(false);
  }, [dropdown]);

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#4da6ff" />
  //     </View>
  //   );
  // }

  if (!eventos.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.noEventsText}>No se encontraron eventos</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 15 }}>
      {/* Header del dropdown */}
      <TouchableOpacity
        onPress={toggleExpanded}
        style={styles.dropdownHeader}
        activeOpacity={0.7}
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
          style={{ maxHeight: 520 }} // limitar altura del dropdown
          contentContainerStyle={{ paddingTop: 5, paddingBottom: 5 }}
          showsVerticalScrollIndicator={true}
        >
          {eventos.map((evento) => (
            <EventCard
              key={evento.id}
              image={evento.portadaUrl || "https://via.placeholder.com/140x160"}
              title={evento.nombre}
              date={evento.inicioAt}
              location={`${evento.lugar?.ciudad || ""}, ${evento.lugar?.provincia || ""}`}
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05081b",
  },
  noEventsText: {
    color: "#A5A6AD",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Poppins_400Regular",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
