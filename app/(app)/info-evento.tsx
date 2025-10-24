import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { EventInfo } from "@/components/Eventos/EventInfo";
import { EventTimer } from "@/components/Eventos/EventTimer";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { ProductoraInfo } from "@/components/Productora/ProductoraInfo";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  Keyboard,
  Platform,
  View,
} from "react-native";

import { AgregarComentario } from "@/components/Comentarios/AgregarComentario";
import { ComentarioCard } from "@/components/Comentarios/ListaComentarios";
import { Estadisticas } from "@/components/Eventos/Estadisticas";

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const [verProductora, setVerProductora] = useState(false);
  const router = useRouter();

  const { evento, comentarios, estadisticas, productora, loading, error } =
    useEvento(eventoId);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputOffset = useRef(new Animated.Value(0)).current;
  const bottomOffset = Platform.OS === "android" ? 20 : 0;
  const inputHeight = 80;

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      Animated.timing(inputOffset, {
        toValue: e.endCoordinates.height + bottomOffset,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
      Animated.timing(inputOffset, {
        toValue: bottomOffset,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [inputOffset, bottomOffset]);

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

      <Animated.FlatList
        data={comentarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ComentarioCard comentario={item} productora={productora} />
        )}
        ListHeaderComponent={() => (
          <>
            <EventInfo
              evento={evento}
              productoraId={productora?.userId}
              onSelect={() => setVerProductora(true)}
            />

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

            <Estadisticas estadisticas={estadisticas} />

            <Texto semiBold className="text-white tracking-wider p-4">
              Comentarios{" "}
              <Texto semiBold className="text-white/50 tracking-wide">
                {" "}
                {comentarios.length}
              </Texto>
            </Texto>
          </>
        )}
        contentContainerStyle={{
          paddingBottom: inputHeight + keyboardHeight + bottomOffset + 60,
        }}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      />
      {/* <PreviewComentarios
        comentarios={comentarios}
        evento={evento}
        finalizo={mostrarComentarios}
      /> */}

      {/* AGREGAR COMENTARIO STICKY */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          paddingBottom: keyboardHeight > 0 ? 28 : 50,
          bottom: keyboardHeight > 0 ? inputOffset : 0,
          borderTopWidth: 1,
          borderTopColor: "#0F1D4C",
          backgroundColor: "#05081b",
        }}
      >
        <AgregarComentario evento={Number(eventoId)} />
      </Animated.View>

      {verProductora && (
        <ProductoraInfo
          evento={evento}
          visible={verProductora}
          onClose={() => setVerProductora(false)}
        />
      )}
    </View>
  );
}
