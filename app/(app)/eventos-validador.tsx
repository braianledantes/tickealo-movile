import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getEventosProductora } from "@/api/validador";
import { EventList } from "@/components/Eventos/EventList";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";

type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion: string;
    ciudad: string;
    provincia: string;
  };
};

export default function Index() {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await getEventosProductora();
        // si la API devuelve un solo objeto, lo convertimos en array
        const data = Array.isArray(response) ? response : [response];
        setEventos(data);
      } catch (error: any) {
        console.error(
          "Error cargando eventos:",
          error?.response?.data || error.message || error,
        );
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-[#05081b]">
      <Header />

      <Texto bold className="text-[#90e0ef]/80 px-5 mt-2 mb-4">
        EVENTOS DE TU PRODUCTORA
      </Texto>

      <EventList
        events={eventos}
        onPressEvent={(id) =>
          router.push({
            pathname: "/info-evento-validador",
            params: { eventoId: id },
          })
        }
      />
    </SafeAreaView>
  );
}
