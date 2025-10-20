import { ListaComentarios } from "@/components/Comentarios/Comentarios";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { EventTimer } from "@/components/Eventos/EventTimer";
import { EventInfo } from "@/components/Eventos/InfoEvento";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const router = useRouter();
  const { evento, productoraId, loading } = useEvento(eventoId);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!evento) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <Texto className="text-white">No se encontró el evento.</Texto>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />
      <ScrollView className="flex-1">
        <EventInfo evento={evento} productoraId={productoraId} />

        {/* Entradas */}
        <View className="mt-4 px-4 mb-5">
          {evento.entradas?.length ? (
            evento.entradas.map((entrada) => (
              <EntradaCard
                key={entrada.id}
                tipo={entrada.tipo}
                precio={entrada.precio}
                disabled={evento.stockEntradas === 0 || entrada.stock === 0}
                onPress={() =>
                  router.push({
                    pathname: "/(app)/compra/InicioCompra",
                    params: {
                      entradaId: entrada.id.toString(),
                      nombre: entrada.tipo,
                      precio: String(entrada.precio),
                      portadaUrl: evento.bannerUrl ?? "",
                      eventoId: String(evento.id),
                    },
                  })
                }
                right={
                  evento.stockEntradas === 0 || entrada.stock === 0 ? (
                    <View className="items-center">
                      <Texto bold className="text-white text-sm">
                        NO HAY
                      </Texto>
                      <Texto bold className="text-white text-sm">
                        CUPOS
                      </Texto>
                    </View>
                  ) : undefined
                }
              />
            ))
          ) : (
            <Texto className="text-gray-400 text-center italic mt-2">
              No hay entradas disponibles por ahora.
            </Texto>
          )}
        </View>

        {/* Contador */}
        <EventTimer fechaFin={evento.inicioAt} />

        {/* Sección de comentarios */}
        <Texto
          bold
          className="tracking-wider text-lg text-white px-4 mt-6 mb-2"
        >
          COMENTARIOS ({evento?.comentarios?.length})
        </Texto>

        {/* Lista de comentarios */}
        <ListaComentarios
          comentarios={evento.comentarios}
          productora={evento.productora}
        />

        {/** Aqui el usuario podria agregar un comentario */}
      </ScrollView>
    </View>
  );
}
