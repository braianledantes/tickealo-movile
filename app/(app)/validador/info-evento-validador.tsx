import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import ProgressTicket from "@/components/Validador/ProgressTicket";
import { useEvento } from "@/hooks/useEvento";
import { useTicketValidador } from "@/hooks/useTicketValidador";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";

import HistorialTicket from "@/components/Validador/HistorialTicket";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import defaultEvent from "../../../assets/images/defaultEvent.jpg";

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
  console.log(evento);
  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />

      <ScrollView className="flex flex-1">
        {/* Imagen portada */}
        <Image
          source={banner}
          style={{ width: "100%", height, resizeMode: "cover" }}
        />

        {/* Descripción del evento */}
        <View className="px-4 mt-4">
          <Texto bold className="text-[#CAF0F8] text-3xl mb-4 tracking-wide">
            {evento.nombre}
          </Texto>

          {/* Lugar */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="location-outline" size={18} color="#4da6ff" />
            <Texto semiBold className="text-md ml-2 text-[#4da6ff]">
              {evento.lugar?.direccion
                ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
                : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
            </Texto>
          </View>

          <Texto className="text-[#ddd] text-md">{evento.descripcion}</Texto>
        </View>

        {/* Fecha */}
        <View className="mt-6 px-4 border-t border-[#1b1b40] pt-3">
          <Texto bold className="text-[#A5A6AD] tracking-wide text-xl">
            {(() => {
              const date = new Date(evento.inicioAt);
              const fecha = date
                .toLocaleDateString("es-AR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                .toUpperCase();

              const hora = date.getHours().toString().padStart(2, "0");
              const minutos = date.getMinutes().toString().padStart(2, "0");

              return `${fecha} • ${hora}:${minutos} HS`;
            })()}
          </Texto>
        </View>

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
        onPress={() => router.push("/(app)/validador/validar-entradas")}
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
