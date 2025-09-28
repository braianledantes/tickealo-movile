import api from "@/api/axiosConfig";
import { Busqueda } from "@/components/Busqueda";
import { EventCard } from "@/components/EventCard";
import { Header } from "@/components/Header";
import { getUserProvince } from "@/utils/location";
import { PROVINCIAS_AR } from "@/utils/provincias";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Event = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  portadaUrl?: string;
  lugar?: {
    direccion: string;
    ciudad: string;
    provincia: string;
  };
};

export default function Index() {
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [province, setProvince] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Detectar provincia del usuario al inicio
  useEffect(() => {
    (async () => {
      const p = await getUserProvince();
      setProvince(p);
    })();
  }, []);

  // Cargar eventos (se puede extender para pasar provincia como filtro si el backend lo admite)
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const res = await api.get("/eventos", {
          params: {
            page: 1,
            limit: 50,
            search: "",
            orderDir: "ASC",
            //fechaInicio: today,
            // provincia: province ?? undefined,
          },
        });
setUpcoming(res.data.data);
      } catch (err) {
        console.error("Error cargando eventos:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [province]);

  const upcomingFiltered = useMemo(() => {
  if (!province) return upcoming;
  return upcoming.filter((e) => e.lugar?.provincia === province);
}, [upcoming, province]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010030" }}>
    <View style={{ flex: 1, backgroundColor: "#010030" }}>
      <Header
        userImage="https://example.com/user.jpg"
        onMenuPress={() => console.log("Menu pressed")}
      />

    <Busqueda
    location={province ?? "Selecciona provincia"}
    onPress={() => setPickerOpen(true)}
  />

      <ScrollView style={styles.content}>
        {/* Sección de Próximos Eventos */}
        <Text style={styles.sectionTitle}>PRÓXIMOS EVENTOS</Text>
        {upcomingFiltered.length > 0 ? (
          upcomingFiltered.map((event) => (
            <EventCard
              key={event.id}
              image={event.portadaUrl ?? "https://placehold.co/600x400"}
              title={event.nombre}
              date={new Date(event.inicioAt).toLocaleDateString("es-AR")}
              location={`${event.lugar?.ciudad ?? ""} ${event.lugar?.provincia ?? ""}`}
              onPress={() => console.log("Ver evento", event.id)}
            />
          ))
        ) : (
          <Text style={styles.empty}>No hay próximos eventos.</Text>
        )}
      </ScrollView>
      {/* Selector de provincias */}
      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setPickerOpen(false)} />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Selecciona tu provincia</Text>
          <ScrollView style={{ maxHeight: 360 }}>
            {PROVINCIAS_AR.map((p) => (
              <Pressable key={p} style={styles.option} onPress={() => { setProvince(p); setPickerOpen(false); }}>
                <Text style={styles.optionText}>{p}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={[styles.option, { borderTopWidth: 1, borderTopColor: "#223" }]} onPress={async () => { const p = await getUserProvince(); setProvince(p); setPickerOpen(false); }}>
            <Text style={[styles.optionText, { color: "#4da6ff" }]}>Detectar automáticamente</Text>
          </Pressable>
        </View>
      </Modal>
      </View>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  content: { padding: 15 },
  sectionTitle: {
    color: "#4da6ff",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 8,
  },
  empty: {
    color: "#aaa",
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010030",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 140,
    backgroundColor: "#0b1030",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#223",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
