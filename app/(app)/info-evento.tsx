import { AgregarComentario } from "@/components/Comentarios/AgregarComentario";
import { ComentarioCard } from "@/components/Comentarios/ListaComentarios";
import { EntradaList } from "@/components/Entradas/EntradasList";
import { Estadisticas } from "@/components/Eventos/Estadisticas";
import { EventInfo } from "@/components/Eventos/EventInfo";
import { EventTimer } from "@/components/Eventos/EventTimer";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useEvento } from "@/hooks/useEvento";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from "react-native";

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
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

  const { width } = Dimensions.get("window");
  const bannerHeight = width * (4 / 11);
  const bannerOpacity = scrollY.interpolate({
    inputRange: [0, 43],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container]}>
      <HeaderBack onHeight={setHeaderHeight} title={evento.nombre} />

      {evento.bannerUrl && (
        <Animated.View
          style={[
            styles.bannerContainer,
            { top: headerHeight },
            { opacity: bannerOpacity },
          ]}
        >
          <ImageBackground
            source={{ uri: evento.bannerUrl }}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[
                "rgba(5, 8, 27, 0)",
                "rgba(5, 8, 27, 0.15)",
                "rgba(5, 8, 27, 0.35)",
                "rgba(5, 8, 27, 0.55)",
                "rgba(5, 8, 27, 0.75)",
                "#05081b",
              ]}
              style={styles.gradient}
            />
          </ImageBackground>
        </Animated.View>
      )}
      <Animated.ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: bannerHeight,
            paddingBottom: inputHeight + keyboardHeight + bottomOffset + 60,
          },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
      >
        <EventInfo evento={evento} productora={productora} />

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

        {comentarios.map((item) => (
          <ComentarioCard
            key={item.id}
            comentario={item}
            productora={productora}
          />
        ))}
      </Animated.ScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05081b" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05081b",
  },
  textWhite: { color: "#fff" },
  content: { paddingBottom: 50, paddingTop: 200 },
  bannerContainer: {
    position: "absolute",
    left: 0,
    width: "100%",
    aspectRatio: 11 / 4,
    zIndex: 0,
    overflow: "hidden",
  },
  bannerImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
});
