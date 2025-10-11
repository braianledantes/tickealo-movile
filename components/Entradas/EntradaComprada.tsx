import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Tipos
type Evento = {
  id: number;
  nombre: string;
  inicioAt: string;
  portadaUrl?: string;
};

type Ticket = {
  id: number;
  entrada: {
    evento: Evento;
    tipo: string;
    cantidad: number;
  };
};

type Compra = {
  id: number;
  tickets: Ticket[];
};

interface EntradaCompradaProps {
  compra: Compra;
  onPress: () => void;
}

export const EntradaComprada: React.FC<EntradaCompradaProps> = ({
  compra,
  onPress,
}) => {
  if (!compra.tickets || compra.tickets.length === 0) return null;

  const ticketRef = compra.tickets[0];
  const evento = ticketRef.entrada.evento;

  const totalEntradas = compra.tickets.reduce(
    (acc, ticket) => acc + (ticket.entrada ? 1 : 0),
    0,
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagen del evento */}
      <Image
        source={{
          uri: evento.portadaUrl || "https://via.placeholder.com/140x160",
        }}
        style={styles.image}
      />

      {/* Panel derecho con info */}
      <LinearGradient
        colors={["#0b1030", "#0f1a4a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.info}
      >
        <Text style={styles.title} numberOfLines={1}>
          {evento.nombre}
        </Text>
        <Text style={styles.date}>
          {new Date(evento.inicioAt).toLocaleDateString("es-AR")}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="ticket-outline" size={14} color="#4da6ff" />
          <Text style={styles.location}>
            {ticketRef.entrada.tipo} - Cantidad: {totalEntradas}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#0b1030",
    borderTopRightRadius: 80,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  image: {
    width: 140,
    height: 160,
  },
  info: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    borderTopRightRadius: 80,
    borderBottomRightRadius: 0,
  },
  title: {
    color: "#cfe3ff",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  date: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    color: "#4da6ff",
    marginLeft: 6,
    fontSize: 14,
    maxWidth: "90%",
  },
  link: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
