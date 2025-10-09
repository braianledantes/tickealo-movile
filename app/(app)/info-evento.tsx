import api from "@/api/axiosConfig";
import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useSeguidores } from "@/hooks/useSeguidores";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

type Productora = {
  userId: number;
  nombre: string;
  cuit?: string;
  direccion?: string;
  imagenUrl?: string;
  telefono?: string;
  calificacion?: number;
  creditosDisponibles?: number;
}

type Evento = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  bannerUrl?: string;
  lugar?: {
    direccion?: string;
    ciudad?: string;
    provincia?: string;
  };
  entradas?: Entrada[];
  productora?: Productora;
};

export default function InfoEvento() {
  const { eventoId } = useLocalSearchParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const { seguidores, seguir, dejarSeguir } = useSeguidores()
  const [estaSiguiendo, setEstaSiguiendo] = useState(false);
  const router = useRouter();

  const productoraId = evento?.productora?.userId; 

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await api.get(`/eventos/${eventoId}`);
        setEvento(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error cargando evento:", err);
      } finally {
        setLoading(false);
      }
    };
    if (eventoId) fetchEvento();
  }, [eventoId]);

    useEffect(() => {
    if (productoraId) {
      const seguido = seguidores.some(s => s.userId === productoraId);
      setEstaSiguiendo(seguido);
    }
  }, [seguidores, productoraId]);

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

  const banner = evento.bannerUrl && evento.bannerUrl.trim() !== "" ? {uri: evento.bannerUrl } : defaultEvent;

  return (
    <View style={{ flex: 1, backgroundColor: "#05081b" }}>
      <HeaderBack />

      <ScrollView style={styles.container}>
        {/* Imagen portada */}
        <Image source={banner} style={styles.image} />

        {/* Botón seguir productora y campanita */}
        <View style={styles.followContainer}>
          {!estaSiguiendo ? (
            <Button
              title="Seguir Productora"
              onPress={async () => {
                if (productoraId) {
                  await seguir(productoraId);
                  setEstaSiguiendo(true);
                }
              }}
              style={styles.followButton}
            />
          ) : (
            <SecondaryButton
              title="Dejar de seguir"
              onPress={async () => {
                if (productoraId) {
                  await dejarSeguir(productoraId);
                  setEstaSiguiendo(false);
                }
              }}
              style={styles.followButton}
            />
          )}

          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>


        {/* Descripción del evento */}
        <View style={styles.infoBox}>
          <Texto style={styles.title}>{evento.nombre}</Texto>

          {/* Lugar */}
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#4da6ff"
              style={{ marginRight: 6 }}
            />
            <Texto style={styles.locationText}>
              {evento.lugar?.direccion
                ? `${evento.lugar.direccion}, ${evento.lugar.ciudad ?? ""}`
                : (evento.lugar?.ciudad ?? "Ubicación no disponible")}
            </Texto>
          </View>

          <Texto style={styles.description}>{evento.descripcion}</Texto>
        </View>

        {/* Fecha */}
        <View style={styles.dateBox}>
          <Texto style={styles.dateTitle}>
            {new Date(evento.inicioAt)
              .toLocaleDateString("es-AR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .toUpperCase()}
          </Texto>
        </View>

        {/* Entradas */}
        <View style={styles.entradasContainer}>
          {evento.entradas && evento.entradas.length > 0 ? (
            evento.entradas.map((entrada: Entrada) => (
              <EntradaCard
                key={entrada.id}
                tipo={entrada.tipo}
                precio={entrada.precio}
                onPress={() => router.push({ pathname: "/compra", params: { eventoId: eventoId , entradaId: entrada.id.toString() } })}
              />
            ))
          ) : (
            <Texto style={styles.sinEntradas}>
              No hay entradas disponibles por ahora.
            </Texto>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: "100%", // o '100%' si querés que se adapte al ancho del contenedor
    aspectRatio: 11 / 4, // relación de aspecto (ancho / alto)
    resizeMode: "cover", // asegura que la imagen llene el espacio
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
    color: "#96B5C5",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 6,
    letterSpacing:1,
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
    color: "#A5A6AD",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1,
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
    backgroundColor: "#05081b",
  },
});
