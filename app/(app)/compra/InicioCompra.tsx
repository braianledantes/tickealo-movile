import { Button } from "@/components/Button/Button";
import { EntradaContador } from "@/components/Entradas/EntradaContador";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useAuth } from "@/hooks/context/useAuth";
import { useCantEntradas } from "@/hooks/useCantEntradas";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import defaultEvent from "../../../assets/images/defaultEvent.jpg";

export default function InfoEntrada() {
  const {
    qty,
    total,
    precioUnit,
    onMinus,
    onPlus,
    onCheckout,
    params,
    error,
    disabled,
  } = useCantEntradas();
  const { user } = useAuth();

  const banner =
    params.portadaUrl && params.portadaUrl.trim() !== ""
      ? { uri: params.portadaUrl }
      : defaultEvent;

  return (
    <View className="flex-1 bg-[#05081b]">
      {/* Header */}
      <HeaderBack />

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
        {error && (
          <View className="px-4 mt-2">
            <Texto className="text-center tracking-wider text-[#BD4C4C]">
              {error}
            </Texto>
          </View>
        )}

        <View className="flex-row justify-between items-center px-4 my-4">
          <Texto semiBold className="text-white tracking-wider">
            Tus puntos
          </Texto>
          <Texto bold className="text-white">
            {user?.puntosAcumulados}
          </Texto>
        </View>

        {/* Botón de compra */}
        <View className="px-4 mt-3 mb-6">
          <Button
            title="Ir a la compra"
            onPress={onCheckout}
            disabled={disabled}
          />
        </View>
      </ScrollView>
    </View>
  );
}
