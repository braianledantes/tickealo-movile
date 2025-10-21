import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import { ComentarioDto } from "@/api/dto/comentario.dto";
import { AgregarComentario } from "@/components/Comentarios/AgregarComentario";
import { ListaComentarios } from "@/components/Comentarios/ListaComentarios";

export default function Comentarios() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const {
    evento,
    comentarios: comentariosIniciales,
    mostrarComentarios,
    loading,
  } = useEvento(eventoId);

  const [comentarios, setComentarios] = useState<ComentarioDto[]>(
    comentariosIniciales || [],
  );
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputOffset = useRef(new Animated.Value(0)).current;

  const bottomOffset = Platform.OS === "android" ? 20 : 0;
  const inputHeight = 80;

  useEffect(() => {
    // sincronizamos comentarios iniciales al cargar o cuando cambien
    setComentarios(comentariosIniciales || []);
  }, [comentariosIniciales]);

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  const handleNuevoComentario = (comentario: ComentarioDto) => {
    // agregamos el comentario al inicio de la lista
    setComentarios((prev) => [comentario, ...prev]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#05081b" }}>
      <HeaderBack />

      {!mostrarComentarios && (
        <>
          <Texto bold className="text-white tracking-wider text-lg px-6 mb-4">
            RESEÑAS DEL EVENTO ({comentarios?.length})
          </Texto>

          {/* Lista de comentarios */}
          <KeyboardAwareFlatList
            data={[1]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => (
              <ListaComentarios
                comentarios={comentarios}
                productora={evento?.productora}
              />
            )}
            contentContainerStyle={{
              paddingBottom: inputHeight + keyboardHeight + bottomOffset + 60,
            }}
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
          />

          {/* Input animado fijo */}
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
            <AgregarComentario
              evento={Number(eventoId)}
              onComentarioEnviado={handleNuevoComentario}
            />
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05081b",
  },
});
