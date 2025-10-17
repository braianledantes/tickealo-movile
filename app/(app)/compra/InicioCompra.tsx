import { Button } from "@/components/Button/Button";
import { EntradaContador } from "@/components/Entradas/EntradaContador";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useCantEntradas } from "@/hooks/useCantEntradas";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import defaultEvent from "../../../assets/images/defaultEvent.jpg";

export default function InfoEntrada() {
  const { qty, total, precioUnit, onMinus, onPlus, onCheckout, params } =
    useCantEntradas();

  const banner =
    params.portadaUrl && params.portadaUrl.trim() !== ""
      ? { uri: params.portadaUrl }
      : defaultEvent;

  return (
    <View className="flex-1 bg-[#05081b]">
      {/* Header */}
      <View className="px-4 pt-2 pb-2">
        <HeaderBack />
      </View>

      <ScrollView className="flex-1">
        {/* Banner */}
        <Image
          source={banner}
          className="w-full max-h-[250px] aspect-[11/4] object-cover"
        />

        {/* Entrada + Contador */}
        <EntradaContador
          tipo={params.nombre ?? "General"}
          precioUnit={precioUnit}
          qty={qty}
          total={total}
          onMinus={onMinus}
          onPlus={onPlus}
        />

        {/* Botón de compra */}
        <View className="px-4 mt-3 mb-6">
          <Button title="Ir a la compra" onPress={onCheckout} />
        </View>
      </ScrollView>
    </View>
  );
}
