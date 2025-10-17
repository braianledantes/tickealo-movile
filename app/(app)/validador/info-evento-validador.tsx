import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

  const { width } = Dimensions.get("window");
  const height = Math.round(width * (4 / 11));

  if (loading) {
    return (
      <View className="flex flex-1 justify-center align-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!evento) {
    return (
      <View className="flex flex-1 justify-center align-center bg-[#05081b]">
        <Text style={{ color: "#fff" }}>No se encontró el evento.</Text>
      </View>
    );
  }

  const banner =
    evento.bannerUrl && evento.bannerUrl.trim() !== ""
      ? { uri: evento.bannerUrl }
      : defaultEvent;

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
          <Texto bold className="text-[#96B5C5] text-3xl mb-4 tracking-wide">
            {evento.nombre}
          </Texto>
          {/* Lugar */}
          <View className="flex-row items-center mb-4">
            <Ionicons
              name="location-outline"
              size={18}
              color="#4da6ff"
              className="mr-3"
            />
            <Texto semiBold className="text-md shrink text-[#4da6ff]">
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
            {new Date(evento.inicioAt)
              .toLocaleDateString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase()}
          </Texto>
        </View>
      </ScrollView>

      {/** SCANNER */}
      <View className="mx-auto mt-6 mb-20">
        <TouchableOpacity
          onPress={() => router.push("/(app)/validador/validar-entradas")}
          activeOpacity={0.8}
        >
          <View className="p-4 bg-[#03045E] rounded-full">
            <MaterialIcons name="qr-code-scanner" size={50} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
