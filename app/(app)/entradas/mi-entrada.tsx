import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/useCompras";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

type Lugar = {
  nombre?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
};

type Entrada = {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  evento?: {
    nombre: string;
    lugar?: Lugar | string;
    inicioAt?: string;
    finAt?: string;
    hora?: string;
    portadaUrl?: string;
  };
};

type Ticket = {
  id: number;
  codigoAlfanumerico: string;
  estado: string;
  entrada: Entrada;
};

type Compra = {
  id: number;
  estado: "PENDIENTE" | "COMPLETADA" | "CANCELADA";
  monto: string;
  tickets: Ticket[];
  updatedAt: string; // viene como string ISO desde el backend
};

export default function MiEntrada() {
  const { compraId } = useLocalSearchParams<{ compraId: string }>();
  const { misCompras } = useCompras();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState<Compra[]>([]);
  const compraIdNum = compraId ? parseInt(compraId, 10) : undefined;

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        const data = await misCompras(1, 5);
        const compras = (data?.data ?? []) as Compra[];
        setCompras(compras);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [misCompras]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!compras || compras.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={styles.textWhite}>
          No se encontraron compras asociadas a su usuario
        </Text>
      </View>
    );
  }

  const compraSeleccionada = compras.find((c) => c.id === compraIdNum);

  if (!compraSeleccionada) {
    return (
      <View style={styles.loader}>
        <Text style={styles.textWhite}>Compra no encontrada</Text>
      </View>
    );
  }

  const estadoRaw = compraSeleccionada.estado?.toUpperCase() || "";
  let estado = { label: "SIN ESTADO", color: "#999", background: "#222" };

  if (estadoRaw.includes("COMPLETADA")) {
    estado = { label: "COMPLETADA", color: "#00ff9d", background: "#003d1f" }; // 🟢
  } else if (estadoRaw.includes("PENDIENTE")) {
    estado = { label: "PENDIENTE", color: "#cccccc", background: "#333333" }; // ⚪
  } else if (estadoRaw.includes("CANCELADA")) {
    estado = { label: "CANCELADA", color: "#ff4d4d", background: "#3d0000" }; // 🔴
  }

  const fechaActualizacion = new Date(
    compraSeleccionada.updatedAt,
  ).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <HeaderBack />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalle de la compra</Text>

        <View
          style={[
            styles.estadoBox,
            { backgroundColor: estado.background, borderColor: estado.color },
          ]}
        >
          <Text style={[styles.estadoText, { color: estado.color }]}>
            {estado.label}
          </Text>
        </View>

        <Text style={styles.updatedText}>
          Última actualización: {fechaActualizacion}
        </Text>

        {compraSeleccionada.tickets.map((ticket) => {
          const evento = ticket.entrada.evento;

          const lugarTexto =
            typeof evento?.lugar === "string"
              ? evento.lugar
              : (evento?.lugar?.nombre ??
                evento?.lugar?.direccion ??
                "No especificado");

          const fechaEvento = evento?.inicioAt
            ? new Date(evento.inicioAt).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Próximamente";

          const horaEvento = evento?.inicioAt
            ? new Date(evento.inicioAt).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--";

          return (
            <View key={ticket.id} style={styles.ticket}>
              {/* Imagen del evento */}
              <Image
                source={{
                  uri:
                    evento?.portadaUrl ??
                    "https://via.placeholder.com/400x200.png?text=Evento",
                }}
                style={styles.image}
              />

              {/* Información */}
              <View style={styles.info}>
                <Text style={styles.eventName}>
                  {evento?.nombre ?? "Evento sin nombre"}
                </Text>

                <View style={styles.row}>
                  <Text style={styles.label}>Lugar</Text>
                  <Text style={styles.value}>{lugarTexto}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Tipo entrada</Text>
                  <Text style={styles.value}>{ticket.entrada.tipo}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Fecha</Text>
                  <Text style={styles.value}>{fechaEvento}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>Hora</Text>
                  <Text style={styles.value}>{horaEvento} hs</Text>
                </View>
              </View>

              {/* QR (solo si está completada) */}
              {estado.label === "COMPLETADA" && (
                <View style={styles.qrSection}>
                  <Texto bold className="text-[#999] text-xl mb-6 ">
                    {ticket.estado}
                  </Texto>
                  <QRCode
                    key={ticket.codigoAlfanumerico}
                    value={ticket.codigoAlfanumerico}
                    size={130}
                    backgroundColor="#0b1530"
                    color="#fff"
                  />
                  <Text style={styles.qrCode}>{ticket.codigoAlfanumerico}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05081b",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05081b",
  },
  textWhite: {
    color: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    color: "#90e0ef",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  estadoBox: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: 20,
    marginBottom: 8,
  },
  estadoText: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  updatedText: {
    color: "#999",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 16,
  },

  // 🎟️ Estilo de ticket
  ticket: {
    backgroundColor: "#0b1530",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 16,
  },
  eventName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: "#90e0ef",
    fontSize: 13,
  },
  value: {
    color: "#fff",
    fontSize: 13,
  },
  qrSection: {
    backgroundColor: "#07102A",
    alignItems: "center",
    paddingVertical: 22,
  },
  qrCode: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 1.5,
  },
});
