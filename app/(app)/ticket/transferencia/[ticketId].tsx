import { Texto } from "@/components/Texto";
import { TransferenciaNotificacion } from "@/components/Transferencia/TransferenciaNotificacion";
import { useTicket } from "@/hooks/context/useTicket";
import { resumenTickets } from "@/utils/Tickets";
import { formatDate } from "@/utils/utils";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function MiEntrada() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { ticketsTransferidos, transferidos, loadingTransferidos } =
    useTicket();

  const ticketIdNum = ticketId ? ticketId : undefined;

  useEffect(() => {
    ticketsTransferidos();
    // eslint-disable-next-line
    }, []);

  const ticketSeleccionado = transferidos.find(
    (t) => t.ticket.id === Number(ticketIdNum),
  );
  if (loadingTransferidos) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!ticketSeleccionado || !ticketIdNum) {
    return (
      <View style={styles.loader}>
        <Text style={styles.textWhite}>Ticket no encontrado</Text>
      </View>
    );
  }

  const { width } = Dimensions.get("window");
  const height = Math.round(width * (1 / 1));

  const resumen = resumenTickets(ticketSeleccionado.ticket);
  const evento = ticketSeleccionado.ticket.entrada.evento;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TransferenciaNotificacion ticket={ticketSeleccionado} />

        {ticketSeleccionado.status !== "pendiente" && (
          <Texto
            className="text-center tracking-wider py-2"
            style={{
              color: resumen.color ?? "#7a86b6",
            }}
          >
            {resumen.mensaje}
          </Texto>
        )}
        <Texto style={styles.updatedText}>
          Fecha de Transferencia:{" "}
          {formatDate(ticketSeleccionado.updatedAt, { date: true, time: true })}
        </Texto>
        <View style={styles.ticket}>
          {/* Imagen del evento */}
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri:
                  evento?.portadaUrl ??
                  "https://via.placeholder.com/400x200.png?text=Evento",
              }}
              style={[styles.image, { height }]}
              contentFit="cover"
            />
          </View>

          {/* Información */}
          <View style={styles.info}>
            <View className="flex-row justify-between items-center mb-1">
              <Texto className="tracking-wider" style={styles.eventName}>
                {evento?.nombre ?? "Evento sin nombre"}
              </Texto>
            </View>

            <View style={styles.row}>
              <Texto style={styles.label}>LUGAR</Texto>
            </View>
            <View style={styles.row}>
              <Texto style={styles.value}>Sin dirección</Texto>
            </View>

            <View style={styles.row}>
              <Texto style={styles.label}>TIPO DE ENTRADA</Texto>
              <Texto style={styles.value}>
                {ticketSeleccionado.ticket.entrada.tipo}
              </Texto>
            </View>

            <View style={styles.row}>
              <Texto style={styles.label}>FECHA</Texto>
              <Texto style={styles.label}>HORA</Texto>
            </View>

            <View style={styles.row}>
              <Texto style={styles.value}>
                {formatDate(evento?.inicioAt, { date: true, time: false })}
              </Texto>
              <Texto style={styles.value}>
                {formatDate(evento?.inicioAt, { date: false, time: true })} hs
              </Texto>
            </View>
          </View>

          {/* QR (solo si está aceptada) */}
          {ticketSeleccionado.status !== "pendiente" && (
            <View style={styles.qrSection}>
              <Texto bold className="text-[#999] text-xl mb-6 ">
                {ticketSeleccionado.ticket.estado}
              </Texto>
              <QRCode
                key={ticketSeleccionado.ticket.codigoAlfanumerico}
                value={ticketSeleccionado.ticket.codigoAlfanumerico}
                size={130}
                backgroundColor="#0b1530"
                color="#fff"
              />
              <Text style={styles.qrCode}>
                {ticketSeleccionado.ticket.codigoAlfanumerico}
              </Text>
            </View>
          )}
          {ticketSeleccionado.status === "pendiente" && (
            <View style={styles.disabledOverlay} />
          )}
        </View>
        {ticketSeleccionado.status !== "pendiente" && (
          <Texto className="text-[#999]/50 tracking-wider text-center px-4 pb-10">
            Este ticket no puede volver a transferirse.
          </Texto>
        )}
      </ScrollView>
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
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  updatedText: {
    color: "#999",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 16,
  },
  ticket: {
    backgroundColor: "#0b1530",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 24,
  },
  image: { width: "100%" },
  info: { padding: 16 },
  eventName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    color: "#CAF0F8",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  value: {
    color: "#fff",
    fontSize: 12,
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.37)",
  },
});
