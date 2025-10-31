import { Texto } from "@/components/Texto";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventList } from "@/components/Eventos/EventList";
import { EventSection } from "@/components/Eventos/EventosProximos";
import { Busqueda } from "@/components/Input/Busqueda";
import { Header } from "@/components/Layout/Header";
import { ProvinciaPicker2 } from "@/components/Modal/ProvinciaPicker2";
import { useAuth } from "@/hooks/context/useAuth";
import { useEventos } from "@/hooks/context/useEventos";
import { useToast } from "@/hooks/context/useToast";

export default function Index() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    events,
    eventosFinalizados,
    proximos,
    seguidos,
    loading,
    loadingFinalizados,
    loadingProximos,
    loadingSeguidos,
    error,
    search,
    setSearch,
    province,
    setProvince,
    fetchEventos,
    fetchProximos,
    fetchFinalizados,
    fetchSeguidos,
  } = useEventos();
  const { user } = useAuth();

  const [pickerOpen, setPickerOpen] = useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const anyLoading =
    loading || loadingFinalizados || loadingProximos || loadingSeguidos;

  const noHayEventos =
    !anyLoading &&
    events.length === 0 &&
    proximos.length === 0 &&
    seguidos.length === 0 &&
    eventosFinalizados.length === 0;

  // Filtrar por provincia
  const filterByProvince = (array: any[]) =>
    province
      ? array.filter(
          (e) => e.lugar?.provincia?.toLowerCase() === province.toLowerCase(),
        )
      : array;

  const proximosFiltrados = filterByProvince(proximos);
  const finalizadosFiltrados = filterByProvince(eventosFinalizados);
  const seguidosFiltrados = filterByProvince(seguidos);

  useEffect(() => {
    if (!user) return;
    setProvince(null);

    const fetchData = async () => {
      try {
        await Promise.all([
          fetchEventos(),
          fetchFinalizados(),
          fetchProximos(),
          fetchSeguidos(),
        ]);
      } catch (err) {
        console.log("Error obteniendo los eventos:", err);
        showToast("error", "Error", "Error obteniendo eventos");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (noHayEventos) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [noHayEventos]);

  return (
    <SafeAreaView className="flex-1 bg-[#05081b]">
      <Header />
      <ScrollView
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <ProvinciaPicker2
          visible={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelectProvince={(provincia) => setProvince(provincia)}
        />

        <Busqueda
          location={province ?? "Seleccionar provincia"}
          onPress={() => setPickerOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        <View className="flex-1">
          {anyLoading ? (
            <View className="justify-center items-center py-5">
              <ActivityIndicator size="large" color="#4da6ff" />
            </View>
          ) : error ? (
            <Text className="text-[#A5A6AD] text-center mt-5 text-base font-poppins-400">
              {error}
            </Text>
          ) : noHayEventos ? (
            <View style={styles.emptyContainer}>
              <Texto
                bold
                className="text-[#CAF0F8] text-center tracking-wider mb-5"
              >
                Ups… ¡ningún evento por aquí todavía!
              </Texto>
              <Animated.View
                style={{ transform: [{ translateY: bounceAnim }] }}
              >
                <Ionicons name="calendar-outline" size={50} color="#CAF0F8" />
              </Animated.View>
            </View>
          ) : search ? (
            <EventList
              events={events}
              onPressEvent={(id) =>
                router.push({
                  pathname: "/info-evento",
                  params: { eventoId: String(id) },
                })
              }
            />
          ) : (
            <>
              <EventSection
                title="EVENTOS SEGUIDOS"
                color="#90E0EF"
                eventos={seguidosFiltrados}
              />

              <EventSection
                title="PROXIMOS EVENTOS"
                eventos={proximosFiltrados}
              />

              <EventSection
                title="EVENTOS FINALIZADOS"
                eventos={finalizadosFiltrados}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});
