import { EventInfo } from "@/components/Eventos/EventInfo";
import { EventTimer } from "@/components/Eventos/EventTimer";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { ProductoraInfo } from "@/components/Productora/ProductoraInfo";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams } from "expo-router";
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
import { EntradaList } from "@/components/Entradas/EntradasList";
import { Estadisticas } from "@/components/Eventos/Estadisticas";

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const [verProductora, setVerProductora] = useState(false);

  const { evento, comentarios, estadisticas, productora, loading, error } =
    useEvento(eventoId);
  console.log(evento);
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

            <EntradaList evento={evento} />

            <EventTimer fechaFin={evento.inicioAt} />

            <Estadisticas estadisticas={estadisticas} />
            {comentarios.length !== 0 ? (
              <Texto semiBold className="text-white tracking-wider p-4">
                Comentarios{" "}
                <Texto semiBold className="text-white/50 tracking-wide">
                  {comentarios.length}
                </Texto>
              </Texto>
            ) : (
              <Texto className="text-center trackig-wider text-white/50 p-4">
                No hay comentarios por el momento... Agrega uno!
              </Texto>
            )}
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
