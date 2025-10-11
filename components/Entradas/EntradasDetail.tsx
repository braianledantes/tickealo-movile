import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Tipos
type Evento = {
  id: number;
  nombre: string;
  inicioAt: string;
  lugar?: string;
  portadaUrl?: string;
};

type Ticket = {
  id: number;
  codigoAlfanumerico: string;
  entrada: {
    evento: Evento;
    tipo: string;
  };
};

type Compra = {
  id: number;
  tickets: Ticket[];
};

interface EntradasDetailProps {
  compra: Compra;
}

export const EntradasDetail: React.FC<EntradasDetailProps> = ({ compra }) => {
  if (!compra || !compra.tickets || compra.tickets.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {compra.tickets.map((ticket) => {
        const evento = ticket.entrada.evento;
        const fecha = new Date(evento.inicioAt).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const hora = new Date(evento.inicioAt).toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <View key={ticket.id} style={styles.card}>
            {/* Imagen */}
            <Image
              source={{
                uri: evento.portadaUrl || "https://via.placeholder.com/180x220",
              }}
              style={styles.image}
            />

            {/* Información */}
            <LinearGradient
              colors={["#0b1030", "#0f1a4a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.info}
            >
              <Text style={styles.title} numberOfLines={1}>
                {evento.nombre}
              </Text>
              {evento.lugar && <Text style={styles.lugar}>{evento.lugar}</Text>}

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>FECHA</Text>
                  <Text style={styles.value}>{fecha}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>HORA</Text>
                  <Text style={styles.value}>{hora}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>TIPO DE ENTRADA</Text>
                  <Text style={styles.value}>{ticket.entrada.tipo}</Text>
                </View>
              </View>

              <View style={styles.codigoContainer}>
                <Ionicons name="qr-code-outline" size={20} color="#fff" />
                <Text style={styles.codigo}>{ticket.codigoAlfanumerico}</Text>
              </View>
            </LinearGradient>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 16,
  },
  card: {
    width: 180,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#0b1030",
  },
  image: {
    width: "100%",
    height: 220,
  },
  info: {
    padding: 12,
  },
  title: {
    color: "#cfe3ff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  lugar: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  column: {
    flexDirection: "column",
  },
  label: {
    color: "#999",
    fontSize: 10,
    fontWeight: "600",
  },
  value: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  codigoContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f3a",
    padding: 6,
    borderRadius: 12,
    justifyContent: "center",
  },
  codigo: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});
