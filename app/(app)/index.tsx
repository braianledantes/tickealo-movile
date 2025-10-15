import { EventList } from "@/components/Eventos/EventList";
import EventosProximos from "@/components/Eventos/EventosProximos";
import { ProvincePicker } from "@/components/Eventos/ProvinciaPicker";
import { Busqueda } from "@/components/Input/Busqueda";
import { Header } from "@/components/Layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useEventos } from "@/hooks/useEventos";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tipado para tus eventos
type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion?: string;
    ciudad?: string;
    provincia?: string;
  };
};

export default function Index() {
  const { isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { fetchUpcoming } = useEventos();

  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [province, setProvince] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  // Cargar eventos usando la nueva función
  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      if (authLoading) return;

      try {
        setLoading(true);
        const list = await fetchUpcoming();
        // console.log(list);
        if (!cancelled) setUpcoming(list ?? []);
      } catch (err) {
        if (!cancelled) {
          console.error("Error obteniendo eventos futuros:", err);
          setUpcoming([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, [authLoading]);

  // Filtrado combinado en frontend
  const upcomingFiltered = useMemo(() => {
    return upcoming.filter((e) => {
      const matchesSearch =
        !search ||
        e.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        e.lugar?.ciudad?.toLowerCase().includes(search.toLowerCase());

      const matchesProvincia = !province || e.lugar?.provincia === province;
      return matchesSearch && matchesProvincia;
    });
  }, [upcoming, search, province]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05081b" }}>
      <Header />
      <ScrollView
        style={{ flex: 1, backgroundColor: "#05081b" }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ProvincePicker
          visible={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelectProvince={(provincia: string) => {
            setProvince(provincia);
            setOpenDropdown(false);
          }}
        />

        <Busqueda
          location={province ?? "Selecciona provincia"}
          onPress={() => {
            setPickerOpen(true);
            setOpenDropdown(false);
          }}
          search={search}
          setSearch={(val) => {
            setSearch(val);
            setOpenDropdown(false); // cerrar dropdown al escribir en la búsqueda
          }}
        />

        <EventosProximos dropdown={openDropdown} />

        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#4da6ff" />
            </View>
          ) : upcomingFiltered.length === 0 ? (
            <Text style={styles.noEventsText}>No se encontraron eventos</Text>
          ) : (
            <EventList
              events={upcomingFiltered}
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

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#90e0ef",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 8,
    paddingHorizontal: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  noEventsText: {
    color: "#A5A6AD",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
});
