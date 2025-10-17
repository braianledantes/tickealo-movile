import { formatARS } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { EntradaCard } from "./EntradaCard";

interface EntradaContadorProps {
  tipo: string;
  precioUnit: number;
  qty: number;
  total: number;
  onMinus: () => void;
  onPlus: () => void;
}

export const EntradaContador = ({
  tipo,
  precioUnit,
  qty,
  total,
  onMinus,
  onPlus,
}: EntradaContadorProps) => {
  const RightQty = (
    <View className="items-center justify-center">
      <Text className="text-white font-extrabold text-lg">{qty}</Text>
      <Text className="text-gray-400 text-xs mt-1">cantidad</Text>
    </View>
  );

  return (
    <View className="px-4 mt-4">
      {/* EntradaCard */}
      <EntradaCard tipo={tipo} precio={precioUnit} right={RightQty} />

      {/* Controles cantidad */}
      <View className="mt-4 flex-row items-center justify-center space-x-6">
        <Pressable
          className={`w-10 h-10 bg-[#121A3D] rounded-full items-center justify-center border-2 border-[#1E40AF] ${
            qty === 1 ? "opacity-60" : ""
          }`}
          onPress={onMinus}
          disabled={qty === 1}
        >
          <Ionicons name="remove" size={18} color="#fff" />
        </Pressable>

        <Text className="text-white font-extrabold text-lg px-2">{qty}</Text>

        <Pressable
          className="w-10 h-10 bg-[#121A3D] rounded-full items-center justify-center border-2 border-[#1E40AF]"
          onPress={onPlus}
        >
          <Ionicons name="add" size={18} color="#fff" />
        </Pressable>
      </View>

      {/* Total */}
      <View className="mt-6 flex-row justify-between items-center px-0">
        <Text className="text-gray-400 font-extrabold text-sm">TOTAL</Text>
        <Text className="text-white font-extrabold text-lg">
          {formatARS(total)}
        </Text>
      </View>
    </View>
  );
};
