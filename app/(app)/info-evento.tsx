import { PreviewComentarios } from "@/components/Comentarios/PreviewComentarios";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { EventInfo } from "@/components/Eventos/EventInfo";
import { EventTimer } from "@/components/Eventos/EventTimer";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const router = useRouter();

  const {
    evento,
    comentarios,
    mostrarComentarios,
    productora,
    loading,
    error,
  } = useEvento(eventoId);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (error || !evento) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <Texto className="text-white">
          {error ?? "No se encontró el evento."}
        </Texto>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />

      <ScrollView className="flex-1">
        <EventInfo evento={evento} productoraId={productora?.userId} />

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

        <EventTimer fechaFin={evento.inicioAt} />
      </ScrollView>

      <PreviewComentarios
        comentarios={comentarios}
        evento={evento}
        finalizo={mostrarComentarios}
      />
    </View>
  );
}
