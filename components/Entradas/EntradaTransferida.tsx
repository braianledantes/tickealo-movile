import { TransferenciaDto } from "@/api/dto/compras.dto";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

interface EntradaCompradaProps {
  transferida: TransferenciaDto;
  onPress: () => void;
}

export const EntradaComprada: React.FC<EntradaCompradaProps> = ({
  transferida,
  onPress,
}) => {
  const ticket = transferida.ticket;
  const evento = transferida.ticket.entrada.evento;

  return (
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
          <Texto
            bold
            className="text-[#bbb] text-xs text-[14px] tracking-[0.5px]"
          >
            ENTRADA
          </Texto>
          <Texto bold className="text-md text-[#77c3ff] tracking-wider">
            {ticket.entrada.tipo}
          </Texto>
        </View>

        <View className="w-[1px] border-l border-dashed border-gray-400 my-2.5 mx-3 self-stretch" />

        <View className="w-15 justify-center items-center">
          <Texto className="text-white font-extrabold text-lg">
            {totalEntradas}
          </Texto>
          <Texto className="text-xs mt-0.5 text-indigo-300">cantidad</Texto>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
