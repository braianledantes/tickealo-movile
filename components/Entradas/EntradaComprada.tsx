import { CompraDto, TransferenciaDto } from "@/api/dto/compras.dto";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

interface EntradaCompradaProps {
  compra: CompraDto | TransferenciaDto;
  onPress: () => void;
  used?: boolean;
}

export const EntradaComprada: React.FC<EntradaCompradaProps> = ({
  compra,
  onPress,
  used = false,
}) => {
  const esTransferencia = "ticket" in compra;

  const ticket = esTransferencia ? compra.ticket : compra.tickets?.[0];
  if (!ticket) return null;

  const evento = ticket.entrada.evento;

  const totalEntradas = esTransferencia ? 1 : compra.tickets.length;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Imagen del evento */}
      <Image
        source={{
          uri: evento.portadaUrl || "https://via.placeholder.com/140x160",
        }}
        style={styles.image}
        contentFit="cover"
      />

      {/* Cuerpo izquierda */}
      <LinearGradient
        colors={["#0b1030", "#0f1a4a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.leftGradient}
      >
        <View style={styles.info}>
          <Texto bold style={styles.eventName} numberOfLines={1}>
            {evento.nombre}
          </Texto>

          <Texto style={styles.date}>
            {new Date(evento.inicioAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Texto>

          <Texto bold style={styles.label}>
            ENTRADA
          </Texto>
          <Texto bold style={styles.tipo}>
            {ticket.entrada.tipo}
          </Texto>
        </View>
      </LinearGradient>
      {/* Cuerpo derecha */}
      <View style={styles.rightGradient}>
        <View style={styles.countBox}>
          <Texto style={styles.count}>{totalEntradas}</Texto>
          <Texto style={styles.countLabel}>cantidad</Texto>
        </View>
      </View>

      {used && <View style={styles.disabledOverlay} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    overflow: "hidden",
    borderColor: "#4da6ff",
  },

  image: {
    width: "28%",
    aspectRatio: 1 / 1.25,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#0077B6",
  },

  /** ⬅️ Gradient izquierdo */
  leftGradient: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#0077B6",
  },

  /** ➡️ Gradient derecho */
  rightGradient: {
    width: 80,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#0b1030",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#0077B6",
  },

  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  eventName: {
    color: "#cfe3ff",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  date: {
    color: "#fff",
    marginBottom: 1,
    fontSize: 13,
  },
  label: {
    color: "#bbb",
    fontSize: 11,
    marginTop: 1,
  },
  tipo: {
    color: "#77c3ff",
    marginTop: 1,
    fontSize: 14,
  },

  countBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  countLabel: {
    color: "#a7c7ff",
    fontSize: 11,
  },

  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.37)",
  },
});
