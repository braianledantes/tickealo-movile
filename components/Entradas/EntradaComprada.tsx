import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

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

  const tipoColor =
    ticketRef.entrada.tipo.toLowerCase() === "vip" ? "#4da6ff" : "#77c3ff";

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
        <View style={styles.left}>
          <Texto
            bold
            className="text-[#cfe3ff] text-lg uppercase tracking-wide mr-6 "
            numberOfLines={1}
          >
            {evento.nombre}
          </Texto>
          <Texto className="text-[#ffffff]">
            {new Date(evento.inicioAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Texto>
          <Texto
            bold
            className="text-[#bbb] text-xs text-[14px] tracking-[0.5px]"
          >
            ENTRADA
          </Texto>
          <Texto bold className="text-md text-[#4da6ff] tracking-wider">
            {ticketRef.entrada.tipo}
          </Texto>
        </View>

        {/* Separador de puntos */}
        <View style={styles.separator} />

        {/* Derecha */}
        <View style={styles.right}>
          <Texto className="text-white font-extrabold text-lg">
            {totalEntradas}
          </Texto>
          <Texto className="text-xs mt-0.5 text-indigo-300">cantidad</Texto>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: "#0b1030",
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 120,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  left: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    width: 1,
    borderLeftWidth: 1,
    borderStyle: "dashed",
    borderColor: "#666",
    marginVertical: 10,
    alignSelf: "stretch",
    marginHorizontal: 12,
  },
  right: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
