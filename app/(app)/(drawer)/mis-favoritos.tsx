import { EventoDto } from "@/api/dto/evento.dto";
import { EventList } from "@/components/Eventos/EventList";
import { Texto } from "@/components/Texto";
import { useFavorito } from "@/hooks/context/useFavoritos";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ResponseDto = {
  cantidad: number;
  eventos: EventoDto[];
};
export default function MisEventosFavoritos() {
  const { eventosFavoritos, loading, error } = useFavorito();
  const [response, setResponse] = useState<ResponseDto | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await eventosFavoritos();
        if (response) setResponse(response);
      } catch (err) {
        console.error("Error obteniendo favoritos:", err);
      }
    };
    fetchFavoritos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await eventosFavoritos();
      if (response) setResponse(response);
    } catch (err) {
      console.error("Error refrescando favoritos:", err);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  const favoritos = response?.eventos ?? [];
  const cantidad = response?.cantidad ?? 0;

  return (
    <SafeAreaView
      className="flex-1 bg-[#05081b]"
      edges={["left", "right", "bottom"]}
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4da6ff"
          />
        }
      >
        {favoritos.length === 0 ? (
          <View className="flex flex-1 justify-center items-center mx-20">
            <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
              Aquí estará tu colección de eventos favoritos… cuando agregues
              alguno
            </Texto>
          </View>
        ) : (
          <EventList
            title={`MIS EVENTOS FAVORITOS (${cantidad})`}
            events={favoritos}
            onPressEvent={(id) =>
              router.push({
                pathname: "/info-evento",
                params: { eventoId: id },
              })
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
