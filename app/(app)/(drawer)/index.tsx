import { Texto } from "@/components/Texto";
import { normalizarNombreProvincia } from "@/utils/ProvinciaPicker/location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ButtonScroll } from "@/components/Button/ButtonScroll";
import { EventList } from "@/components/Eventos/EventList";
import { EventSection } from "@/components/Eventos/EventSection";
import { Busqueda } from "@/components/Input/Busqueda";
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

  const scrollRef = useRef<ScrollView>(null);
  const [showButtonScroll, setShowButtonScroll] = useState(true);
  const handleScroll = (e: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;

    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;

    setShowButtonScroll(!isBottom);
  };

  const [pickerOpen, setPickerOpen] = useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const clearLocation = () => setProvince(null);

  const anyLoading =
    loading || loadingFinalizados || loadingProximos || loadingSeguidos;

  const noHayEventos =
    !anyLoading &&
    events.length === 0 &&
    proximos.length === 0 &&
    seguidos.length === 0 &&
    eventosFinalizados.length === 0;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        fetchEventos(),
        fetchFinalizados(),
        fetchProximos(),
        fetchSeguidos(),
      ]);
    } catch (err) {
      console.error("Error refrescando:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Filtrar por provincia
  const filterByProvince = (array: any[]) => {
    if (!province) return array;
    const selectedProvincia = normalizarNombreProvincia(province.toLowerCase());
    return array.filter((e) => {
      const eventoProvinciaRaw = e.lugar?.provincia || "";
      const eventoProvincia = normalizarNombreProvincia(
        eventoProvinciaRaw.toLowerCase(),
      );
      return eventoProvincia.includes(selectedProvincia);
    });
  };

  const proximosFiltrados = filterByProvince(proximos);
  const finalizadosFiltrados = filterByProvince(eventosFinalizados);
  const seguidosFiltrados = filterByProvince(seguidos);

  // Flag para mostrar animación si no hay eventos después de filtrar por provincia
  const noHayEventosProvincia =
    !anyLoading &&
    proximosFiltrados.length === 0 &&
    finalizadosFiltrados.length === 0 &&
    seguidosFiltrados.length === 0;

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
        //console.error("Error obteniendo los eventos:", err);
        showToast("error", "Error", "Error obteniendo eventos");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (noHayEventos || noHayEventosProvincia) {
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
    // eslint-disable-next-line
  }, [noHayEventos, noHayEventosProvincia]);
  return (
    <SafeAreaView
      className="flex-1 bg-[#05081b]"
      edges={["left", "right", "bottom"]}
      style={{ pointerEvents: "box-none" }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4da6ff" // iOS spinner color
            colors={["#4da6ff"]} // Android spinner color
          />
        }
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
          onClearLocation={clearLocation}
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
          ) : noHayEventos || noHayEventosProvincia ? (
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
            events.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Texto
                  bold
                  className="text-[#CAF0F8] text-center tracking-wider mb-5"
                  style={{
                    maxWidth: "80%",
                    alignSelf: "center",
                  }}
                  numberOfLines={3}
                >
                  Ups… no encontramos resultados de tu búsqueda en tu país :(
                </Texto>
              </View>
            ) : (
              <EventList
                events={events}
                onPressEvent={(id) =>
                  router.push({
                    pathname: "/info-evento",
                    params: { eventoId: String(id) },
                  })
                }
              />
            )
          ) : (
            <>
              <EventSection
                title="EVENTOS SEGUIDOS"
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
      <ButtonScroll
        visible={showButtonScroll}
        onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
      />
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
