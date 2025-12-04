import ProgressTicket from "@/components/Validador/ProgressTicket";
import { useEvento } from "@/hooks/useEvento";
import { useTicketValidador } from "@/hooks/useTicketValidador";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

import defaultEvent from "@/assets/images/defaultEvent.jpg";
import { EventInfo } from "@/components/Eventos/EventInfo";
import HistorialTicket from "@/components/Validador/HistorialTicket";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function InfoEventoValidador() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const router = useRouter();

  const { evento, loading } = useEvento(eventoId);

  const numericEventoId = eventoId ? Number(eventoId) : undefined;
  const {
    ticketsValidados,
    ticketsTotalesEvento,
    loading: ticketsLoading,
  } = useTicketValidador(numericEventoId);

  if (loading || ticketsLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!evento) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <Text style={{ color: "#fff" }}>No se encontró el evento.</Text>
      </View>
    );
  }
  const { width } = Dimensions.get("window");
  const height = Math.round(width * (4 / 11));

  const banner =
    evento.bannerUrl && evento.bannerUrl.trim() !== ""
      ? { uri: evento.bannerUrl }
      : defaultEvent;
  return (
    <View className="flex-1 bg-[#05081b]">
      <ScrollView
        className="flex flex-1"
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Imagen portada */}
        <Image
          source={banner}
          style={{ width: "100%", height }}
          contentFit="cover"
        />

        <EventInfo evento={evento} type="v" />

        {/* Progreso por tipo de entrada */}
        {evento.entradas && evento.entradas.length > 0 && (
          <ProgressTicket
            evento={evento}
            ticketsTotalesEvento={ticketsTotalesEvento}
          />
        )}

        <View className="h-[0.5px] bg-white/20 mx-6 mt-4"></View>

        <HistorialTicket evento={evento} ticketsValidados={ticketsValidados} />
      </ScrollView>

      {/* Botón SCANNER */}
      <TouchableOpacity
        onPress={() => router.push("/(app)/validador/validar-entrada")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "center",
        }}
      >
        <View className="p-4 bg-[#03045E] rounded-full">
          <MaterialIcons name="qr-code-scanner" size={50} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
