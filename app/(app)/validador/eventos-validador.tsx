import { EventoDto } from "@/api/dto/evento.dto";
import {
  EventoValidadorDto,
  ProductoraValidadorDto,
} from "@/api/dto/eventos-validador.dto";
import { EventList } from "@/components/Eventos/EventList";
import { Header } from "@/components/Layout/Header";
import { ProductoraPerfil } from "@/components/Productora/ProductoraPerfil";
import { Texto } from "@/components/Texto";
import { useEventos } from "@/hooks/useEventos";
import { useValidador } from "@/hooks/useValidador";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { getProductorasValidador, getEventosValidador } = useValidador();
  const { getEventosByProductora } = useEventos();
  const [productoras, setProductoras] = useState<ProductoraValidadorDto[]>([]);
  const [productoraSeleccionada, setProductoraSeleccionada] = useState<
    number | null
  >(null);
  const [eventos, setEventos] = useState<(EventoDto | EventoValidadorDto)[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await getProductorasValidador();
        setProductoras(
          response ? (Array.isArray(response) ? response : [response]) : [],
        );
        console.log(response);
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
  }, [getProductorasValidador]);

  // Filtrar eventos según productora seleccionada, si no me muestra todos
  useEffect(() => {
    const cargarEventos = async () => {
      try {
        let response: (EventoDto | EventoValidadorDto)[] | undefined;

        if (productoraSeleccionada) {
          response = await getEventosByProductora(productoraSeleccionada);
        } else {
          const data = await getEventosValidador();
          response = Array.isArray(data) ? data : data ? [data] : [];
        }

        setEventos(response || []);
      } catch (error: any) {
        console.error("Error cargando eventos:", error?.message || error);
      }
    };

    cargarEventos();
  }, [productoraSeleccionada, getEventosByProductora, getEventosValidador]);

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
      <View>
        <Texto bold className="text-[#CAF0F8] px-5">
          PRODUCTORAS A LAS QUE PERTENECES
        </Texto>

        <ProductoraPerfil
          productoras={productoras}
          onPressPerfil={(userId) => setProductoraSeleccionada(userId)}
        />
      </View>

      <Texto bold className="text-[#90e0ef]/80 px-5 mt-2">
        TODOS LOS EVENTOS
      </Texto>

      <EventList
        events={eventos}
        onPressEvent={(id) =>
          router.push({
            pathname: "/(app)/validador/info-evento-validador",
            params: { eventoId: id },
          })
        }
      />
    </SafeAreaView>
  );
}
