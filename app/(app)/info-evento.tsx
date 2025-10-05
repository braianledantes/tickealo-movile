import api from "@/api/axiosConfig";
import { Button } from "@/components/Button";
import { EntradaCard } from "@/components/EntradaCard";
import { HeaderBack } from "@/components/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import defaultEvent from "../../assets/images/defaultEvent.jpg";

// 🧩 Tipos
type Entrada = {
  id: number;
  tipo: string;
  precio: number;
  cantidad: number;
  id_evento: number;
};

type Evento = {
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
  entradas?: Entrada[];
};

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar detalle del evento desde backend
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await api.get(`/eventos/${eventoId}`);
        setEvento(res.data);
      } catch (err) {
        console.error("Error cargando evento:", err);
      } finally {
        setLoading(false);
      }
    };
    if (eventoId) fetchEvento();
  }, [eventoId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No se encontró el evento.</Text>
      </View>
    );
  }

  // 🖼️ Portada con fallback a defaultEvent
  const portada =
    evento.portadaUrl && evento.portadaUrl.trim() !== ""
      ? { uri: evento.portadaUrl }
      : defaultEvent;

  return (
    <View style={{ flex: 1, backgroundColor: "#010030" }}>
      <HeaderBack />

      <ScrollView style={styles.container}>
        {/* Imagen portada */}
        <Image source={portada} style={styles.image} />

        {/* Botón seguir productora y campanita */}
        <View style={styles.followContainer}>
          <Button
            title="Seguir Productora"
            onPress={() => console.log("seguir productora")}
            style={styles.followButton}
          />
          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Descripción del evento */}
        <View style={styles.infoBox}>
          <Text style={styles.title}>{evento.nombre}</Text>

          {/* Lugar */}
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#4da6ff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.locationText}>
              {evento.lugar?.direccion
                ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
                : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
            </Text>
          </View>

          <Text style={styles.description}>{evento.descripcion}</Text>
        </View>

        {/* Fecha */}
        <View style={styles.dateBox}>
          <Text style={styles.dateTitle}>
            {new Date(evento.inicioAt)
              .toLocaleDateString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase()}
          </Text>
        </View>

        {/* Entradas */}
        <View style={styles.entradasContainer}>
          {evento.entradas && evento.entradas.length > 0 ? (
            evento.entradas.map((entrada: Entrada) => (
              <EntradaCard
                key={entrada.id}
                tipo={entrada.tipo}
                precio={entrada.precio}
                onPress={() => console.log("Seleccionó", entrada.tipo)}
              />
            ))
          ) : (
            <Text style={styles.sinEntradas}>
              No hay entradas disponibles por ahora.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  followContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginHorizontal: 16,
    gap: 10,
  },
  followButton: {
    flex: 1,
  },
  bellButton: {
    backgroundColor: "#1a1a4d",
    padding: 10,
    borderRadius: 25,
  },
  infoBox: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    color: "#4da6ff",
    fontSize: 14,
    flexShrink: 1,
  },
  description: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 20,
  },
  dateBox: {
    marginTop: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#1b1b40",
    paddingTop: 12,
  },
  dateTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  entradasContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sinEntradas: {
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010030",
  },
});
