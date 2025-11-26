import { CompraDto, TicketDto } from "@/api/dto/compras.dto";
import { IconButton } from "@/components/Button/IconButton";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { resumenTickets } from "@/utils/Tickets";
import { formatDate } from "@/utils/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function MiTicket() {
  const { compraId } = useLocalSearchParams<{ compraId: string }>();
  const { misCompras, loadingMisCompras, error } = useCompras();
  const [compras, setCompras] = useState<CompraDto[]>([]);
  const compraIdNum = compraId ? parseInt(compraId, 10) : undefined;
  const router = useRouter();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await misCompras(1, 5);
        const compras = (data?.data ?? []).map((compra: CompraDto) => ({
          ...compra,
          tickets: compra.tickets.filter(
            (t: TicketDto) => t.estado !== "TRANSFERIDO",
          ),
        }));

        setCompras(compras);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchCompras();
    // eslint-disable-next-line
  }, []);

  if (loadingMisCompras) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!loadingMisCompras && (!compras || compras.length === 0 || error)) {
    return (
      <View style={styles.loader}>
        <Text style={styles.textWhite}>
          No se encontraron compras asociadas a su usuario, {error}
        </Text>
      </View>
    );
  }

  const compraSeleccionada = compras.find((c) => c.id === compraIdNum);

  if (!compraSeleccionada) {
    return (
      <View style={styles.container}>
        <View style={styles.loader}>
          <Text style={styles.textWhite}>Compra no encontrada</Text>
        </View>
      </View>
    );
  }

  const { width } = Dimensions.get("window");
  const height = Math.round(width * (1 / 1));

  const resumen = resumenTickets(compraSeleccionada.tickets);
  console.log(compraSeleccionada.tickets);
  return (
    <View style={styles.container}>
      <Texto
        className="text-center tracking-wider py-2"
        style={{
          color: resumen.color ?? "#7a86b6",
        }}
      >
        {resumen.mensaje}
      </Texto>

      <ScrollView contentContainerStyle={styles.content}>
        <Texto className="tracking-wider" style={styles.updatedText}>
          Última actualización:{" "}
          {formatDate(compraSeleccionada.updatedAt, {
            date: true,
            time: true,
          })}
        </Texto>

        {compraSeleccionada.tickets.map((ticket) => {
          const evento = ticket.entrada.evento;

          return (
            <View key={ticket.id} style={styles.ticket}>
              {/* Imagen del evento */}
              <View style={{ position: "relative" }}>
                <Image
                  source={{
                    uri:
                      evento?.portadaUrl ??
                      "https://via.placeholder.com/400x200.png?text=Evento",
                  }}
                  style={[styles.image, { height: height }]}
                />

                <IconButton
                  iconType="Feather"
                  iconName="send"
                  color="white"
                  onPress={() =>
                    router.push({
                      pathname: "/(app)/ticket/clientes",
                      params: { ticketId: String(ticket.id) },
                    })
                  }
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "#0c0f2b",
                    padding: 8,
                    borderRadius: 50,
                  }}
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
                  <Texto style={styles.value}>{evento.lugar.direccion}</Texto>
                </View>

                <View style={styles.row}>
                  <Texto style={styles.label}>TIPO DE ENTRADA</Texto>
                  <Texto style={styles.value}>{ticket.entrada.tipo}</Texto>
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
                    {formatDate(evento?.inicioAt, { date: false, time: true })}{" "}
                    hs
                  </Texto>
                </View>
              </View>

              {/* QR (solo si está aceptada) */}
              {compraSeleccionada.estado === "ACEPTADA" && (
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
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    color: "#90e0ef",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
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
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  info: {
    padding: 16,
  },
  eventName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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
    fontWeight: "bold",
    letterSpacing: 1,
  },
  value: {
    color: "#fff",
    fontSize: 12,
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
