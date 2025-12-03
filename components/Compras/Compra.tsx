import { CompraDto } from "@/api/dto/compras.dto";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Texto } from "../Texto";
import CompraEstado from "./CompraEstado";

interface EntradaCompradaProps {
  compra: CompraDto;
  onPress: () => void;
  used?: boolean;
}

export const Compra: React.FC<EntradaCompradaProps> = ({
  compra,
  onPress,
  used = false,
}) => {
  const ahora = new Date().getTime();
  const fechaCompra = new Date(compra.createdAt).getTime();

  const diferencia = ahora - fechaCompra;

  const nuevaCompra = diferencia <= 15 * 60 * 1000;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (nuevaCompra) {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
    // eslint-disable-next-line
  }, [nuevaCompra]);
  /*const ticketRef = compra.tickets[0];
  const evento = ticketRef.entrada.evento;

  const totalEntradas = compra.tickets.reduce(
    (acc, ticket) => acc + (ticket.entrada ? 1 : 0),
    0
  );
  */

  // Si la compra no tiene tickets, o vienen incompletos, evitamos error
  if (!compra.tickets || compra.tickets.length === 0) {
    return null;
  }

  const ticketRef = compra.tickets.find((t) => t.entrada && t.entrada.evento);

  // Si ningún ticket tiene entrada → devolvemos null para evitar error
  if (!ticketRef) {
    return null;
  }

  const evento = ticketRef.entrada.evento;

  // Contar solo tickets que sí tengan entrada
  const totalEntradas = compra.tickets.filter((t) => t.entrada).length;

  if (!compra.tickets || compra.tickets.length === 0) return null;

  return (
    <View style={{ marginBottom: 14 }}>
      <Animated.View
        style={[
          {
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: "#0b1030",
            marginBottom: 14,
          },
          nuevaCompra && {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.85}
          style={{
            flexDirection: "row",
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            overflow: "visible",
          }}
        >
          <Image
            source={{
              uri: evento.portadaUrl || "https://via.placeholder.com/140x160",
            }}
            style={styles.responsiveImage}
            resizeMode="cover"
          />

          {/* Wrapper para evitar bugs de iOS */}
          <View
            style={{
              flex: 1,
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#0b1030", "#0f1a4a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Texto
                  bold
                  className="text-[#cfe3ff] text-lg uppercase tracking-wide mr-6"
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

                <CompraEstado compraEstado={compra.estado} />
              </View>

              <View
                style={{
                  width: 1,
                  borderLeftWidth: 2,
                  borderStyle: "dashed",
                  borderColor: "#6B7280",
                  opacity: 0.6,
                  marginRight: 16,
                  alignSelf: "stretch",
                }}
              />

              <View style={{ width: 60, alignItems: "center" }}>
                <Texto className="text-white font-extrabold text-lg">
                  {totalEntradas}
                </Texto>
                <Texto className="text-[9px] mt-0.5 text-indigo-300 text-center">
                  Entradas{"\n"}Compradas
                </Texto>
              </View>
            </LinearGradient>

            {used && <View style={styles.disabledOverlay} />}
            {nuevaCompra && <View style={styles.nuevaCompra} />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.37)",
  },
  nuevaCompra: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26, 43, 111, 0.37)",
    borderRadius: 30,
    shadowColor: "#1a2b6f",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  responsiveImage: {
    width: 100,
    height: "100%",
    resizeMode: "cover",
  },
});
