import { CompraDto, TransferenciaDto } from "@/api/dto/compras.dto";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
      />

      {/* Cuerpo */}
      <LinearGradient
        colors={["#0b1030", "#0f1a4a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.content}
      >
        {/* Info izquierda */}
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

        <View style={styles.separatorWrapper}>
          <View style={styles.cutTop} />

          <View style={styles.separatorContainer}>
            {[...Array(8)].map((_, i) => (
              <View key={i} style={styles.dot} />
            ))}
          </View>

          <View style={styles.cutBottom} />
        </View>

        {/* Cantidad */}
        <View style={styles.countBox}>
          <Texto style={styles.count}>{totalEntradas}</Texto>
          <Texto style={styles.countLabel}>cantidad</Texto>
        </View>
      </LinearGradient>

      {used && <View style={styles.disabledOverlay} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: "#0b1030",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },

  /** Imagen adaptable */
  image: {
    width: "28%",
    aspectRatio: 1 / 1.25,
    resizeMode: "cover",
  },

  /** Cuerpo */
  content: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  eventName: {
    color: "#cfe3ff",
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  date: {
    color: "#fff",
    marginBottom: 4,
    fontSize: 13,
  },
  label: {
    color: "#bbb",
    fontSize: 11,
    marginTop: 4,
  },
  tipo: {
    color: "#77c3ff",
    marginTop: 2,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  separatorWrapper: {
    position: "relative",
  },
  separatorContainer: {
    width: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    gap: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: "rgba(0, 3, 61, 0.99)",
  },

  countBox: {
    width: 50,
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
  cutTop: {
    position: "absolute",
    top: -30,
    right: -5,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#05081b",
  },

  cutBottom: {
    position: "absolute",
    bottom: -30,
    right: -5,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#05081b",
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.37)",
  },
});
