import { Button } from "@/components/Button/Button";
import { EntradaContador } from "@/components/Entradas/EntradaContador";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useAuth } from "@/hooks/context/useAuth";
import { useCantEntradas } from "@/hooks/useCantEntradas";
import { useRouter } from "expo-router";
import { Percent } from "lucide-react-native";
import React, { useState } from "react";
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
  const router = useRouter();

  const [usarPuntos, setUsarPuntos] = useState(false);

  const banner =
    params.portadaUrl && params.portadaUrl.trim() !== ""
      ? { uri: params.portadaUrl }
      : defaultEvent;

  const totalFinal = usarPuntos ? total * 0.9 : total;
  const puntosGanados = Math.floor(totalFinal / 1000);

  const aplicarPuntos = () => {
    router.setParams({
      ...params,
      cantPuntos: usarPuntos ? "0" : "1",
      totalFinal: totalFinal.toString(),
    });

    setUsarPuntos((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-[#05081b]">
      {/* Header */}
      <HeaderBack />

      <ScrollView
        //para que funcione bien en IOS
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
          total={totalFinal}
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

        {/* Cartel de descuento*/}
        {usarPuntos && (
          <View
            pointerEvents="none"
            className="px-4 mt-3 flex-row items-center justify-center"
          >
            <View className="flex-row items-center gap-2 bg-[#1e3d20]/40 border border-[#38d39f]/40 px-4 py-2 rounded-xl">
              <Percent size={18} color="#38d39f" />
              <Texto bold className="text-[#38d39f] tracking-wider">
                10% OFF APLICADO
              </Texto>
            </View>
          </View>
        )}

        <View className="px-4 mt-6 mb-8">
          <View className="flex-row justify-between items-center">
            <Texto
              semiBold
              className="text-gray-400 uppercase text-xs tracking-widest"
            >
              Tus puntos
            </Texto>

            <Texto bold className="text-[#7ee5ff] tracking-wide">
              {user?.puntosAcumulados ?? 0} pts
            </Texto>
          </View>
        </View>

        <View className="px-4 mt-6 mb-8">
          <View className="flex-row justify-between items-center">
            <Texto
              semiBold
              className="text-gray-400 uppercase text-xs tracking-widest"
            >
              Con esta compra vas a ganar
            </Texto>

            <Texto bold className="text-[#4da6ff] tracking-wide">
              {puntosGanados} pts
            </Texto>
          </View>
        </View>

        {/* Botón usar piuntos */}
        {(user?.puntosAcumulados ?? 0) >= 1 && (
          <View className="px-4 mb-6">
            <Button
              title={
                usarPuntos
                  ? "Cancelar uso del punto"
                  : `Usar 1 punto (${user?.puntosAcumulados} disp.) = 10% OFF`
              }
              onPress={aplicarPuntos}
              variant={usarPuntos ? "secondary" : "primary"}
            />
          </View>
        )}

        {/* Botón compra */}
        <View className="px-4 mt-3 mb-6">
          <Button
            title="Ir a la compra"
            onPress={() => onCheckout(usarPuntos, totalFinal)}
            disabled={disabled}
          />
        </View>
      </ScrollView>
    </View>
  );
}
