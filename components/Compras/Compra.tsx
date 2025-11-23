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
    <Animated.View
      style={[
        nuevaCompra && {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        className="flex-row my-2 bg-[#0b1030] rounded-tr-[30px] rounded-br-[30px] overflow-hidden"
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Image
          source={{
            uri: evento.portadaUrl || "https://via.placeholder.com/140x160",
          }}
          className="w-[100px] h-[120px]"
        />

        <LinearGradient
          colors={["#0b1030", "#0f1a4a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 flex-row items-center p-4 rounded-tr-[30px] rounded-br-[30px] relative"
        >
          <View className="flex-1 justify-center">
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

          <View className="w-[1px] border-l border-dashed border-gray-400 my-2.5 mr-4 self-stretch" />

          <View className="w-15 justify-center items-center">
            <Texto className="text-white font-extrabold text-lg">
              {totalEntradas}
            </Texto>
            <Texto className="text-xs mt-0.5 text-indigo-300 text-center">
              Entradas{"\n"}Comprados
            </Texto>
          </View>
        </LinearGradient>

        {used && <View style={styles.disabledOverlay} />}
        {nuevaCompra && <View style={styles.nuevaCompra} />}
      </TouchableOpacity>
    </Animated.View>
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
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#1a2b6f",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
});
