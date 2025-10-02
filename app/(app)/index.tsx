
import api from "@/api/axiosConfig";
import { Busqueda } from "@/components/Busqueda";
import { EventList } from "@/components/EventList";
import { Header } from "@/components/Header";
import { getUserProvince } from "@/utils/location";
import { PROVINCIAS_AR } from "@/utils/provincias";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const [search, setSearch] = useState("");

  // 🔹 Cargar eventos desde backend
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const params: any = {
          page: 1,
          limit: 50,
          orderDir: "ASC",
        };

        if (search && search.trim() !== "") {
          params.search = search.trim();
        }

        const res = await api.get("/eventos", { params });
        setUpcoming(res.data.data);
      } catch (err: any) {
        console.error(
          "Error cargando eventos:",
          err?.response?.data || err.message || err,
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [search]); // province se filtra en frontend

  // 🔹 Filtrado en frontend (provincia + search)
  const upcomingFiltered = useMemo(() => {
    return upcoming.filter((e) => {
      const matchesSearch =
        !search || e.nombre.toLowerCase().includes(search.toLowerCase());

      const matchesProvincia = !province || e.lugar?.provincia === province;

      return matchesSearch && matchesProvincia;
    });
  }, [upcoming, search, province]);

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
        {/* Header */}
        <Header />

        {/* Buscador con ubicación */}
        <Busqueda
          location={province ?? "Selecciona provincia"}
          onPress={() => setPickerOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        {/* Título */}
        <Text style={styles.sectionTitle}>PRÓXIMOS EVENTOS</Text>

        {/* Lista de eventos */}
        <EventList events={upcomingFiltered} />

        {/* Modal de provincias */}
        <Modal
          visible={pickerOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setPickerOpen(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setPickerOpen(false)}
          />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecciona tu provincia</Text>
            <ScrollView style={{ maxHeight: 360 }}>
              {PROVINCIAS_AR.map((p) => (
                <Pressable
                  key={p}
                  style={styles.option}
                  onPress={() => {
                    setProvince(p);
                    setPickerOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{p}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              style={[
                styles.option,
                { borderTopWidth: 1, borderTopColor: "#223" },
              ]}
              onPress={async () => {
                const p = await getUserProvince();
                if (p) setProvince(p);
                setPickerOpen(false);
              }}
            >
              <Text style={[styles.optionText, { color: "#4da6ff" }]}>
                Detectar automáticamente
              </Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
    fontFamily: "Poppins_600Regular",
  },
  sectionTitle: {
    color: "#90e0ef",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 8,
    paddingHorizontal: 15,
    fontFamily: "Poppins_600SemiBold",
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
