import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventList } from "@/components/Eventos/EventList";
import { EventSection } from "@/components/Eventos/EventosProximos";
import { Busqueda } from "@/components/Input/Busqueda";
import { Header } from "@/components/Layout/Header";
import { ProvincePicker } from "@/components/Modal/ProvinciaPicker";
import { useEventos } from "@/hooks/useEventos";

export default function Index() {
  const router = useRouter();
  const {
    events,
    proximos,
    seguidos,
    productoraSeguida,
    loadingUpcoming,
    error,
    search,
    setSearch,
    province,
    setProvince,
    fetchProximos,
    fetchUpcoming,
    fetchSeguidos,
  } = useEventos();

  const [pickerOpen, setPickerOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUpcoming();
        await fetchProximos();
        await fetchSeguidos();
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#05081b]">
      <Header />
      <ScrollView
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <ProvincePicker
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

        <EventSection title="PROXIMOS EVENTOS" eventos={proximos} />

        <EventSection
          title="EVENTOS SEGUIDOS"
          color="#90E0EF"
          eventos={seguidos}
        />

        <View className="flex-1">
          {loadingUpcoming ? (
            <View className="justify-center items-center py-5">
              <ActivityIndicator size="large" color="#4da6ff" />
            </View>
          ) : error ? (
            <Text className="text-[#A5A6AD] text-center mt-5 text-base font-poppins-400">
              {error}
            </Text>
          ) : events.length === 0 ? (
            <Text className="text-[#A5A6AD] text-center mt-5 text-base font-poppins-400">
              No se encontraron eventos
            </Text>
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
