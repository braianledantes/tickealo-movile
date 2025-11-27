import { EventList } from "@/components/Eventos/EventList";
import { Texto } from "@/components/Texto";
import { useFavorito } from "@/hooks/context/useFavoritos";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

export default function MisEventosFavoritos() {
  const {
    favoritos,
    fetchFavoritos,
    agregarFavorito,
    eliminarFavorito,
    loading,
    error,
  } = useFavorito();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchFavoritos();
    } catch (err) {
      console.error("Error refrescando favoritos:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const cantidad = favoritos.length;

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#05081b]"
      contentContainerStyle={favoritos.length === 0 ? { flex: 1 } : undefined}
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
  );
}
