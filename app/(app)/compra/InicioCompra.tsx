import { Button } from "@/components/Button/Button";
import { EntradaContador } from "@/components/Entradas/EntradaContador";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { CuponDescuento } from "@/components/Puntos/CuponDescuento";
import { ResumenDescuento } from "@/components/Puntos/ResumenDescuento";
import { Texto } from "@/components/Texto";
import { useAuth } from "@/hooks/context/useAuth";
import { useCantEntradas } from "@/hooks/useCantEntradas";
import { useRouter } from "expo-router";
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

  const totalFinal = usarPuntos ? total * 0.75 : total;
  const puntosGanados = Math.floor(totalFinal / 1000);

  const aplicarPuntos = () => {
    router.setParams({
      ...params,
      cantPuntos: usarPuntos ? "0" : "250",
      totalFinal: totalFinal.toString(),
    });

    setUsarPuntos((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />

      <ScrollView
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

        <CuponDescuento
          usarPuntos={usarPuntos}
          puntosDisponibles={user?.puntosAcumulados ?? 0}
          onToggle={aplicarPuntos}
        />

        {usarPuntos && (
          <ResumenDescuento total={total} totalFinal={totalFinal} />
        )}

        {/* Puntos actuales*/}
        <View className="px-4 mt-8">
          <View className="flex-row justify-between items-center">
            <Texto
              semiBold
              className="text-gray-400 uppercase text-xs tracking-widest"
            >
              Tus puntos
            </Texto>

            <Texto bold className="text-[#CAF0F8] tracking-wide">
              {user?.puntosAcumulados ?? 0} pts
            </Texto>
          </View>
        </View>

        {/* Puntos ganados*/}
        <View className="px-4 mt-6 mb-8">
          <View className="flex-row justify-between items-center">
            <Texto
              semiBold
              className="text-gray-400 uppercase text-xs tracking-widest"
            >
              Con esta compra vas a ganar
            </Texto>

            <Texto bold className="text-[#00B4D8] tracking-wide">
              {puntosGanados} pts
            </Texto>
          </View>
        </View>

        {/* Botón compra */}
        <View className="px-4 mt-3 mb-6">
          <Button
            title="Ir al pago"
            onPress={() => onCheckout(usarPuntos, totalFinal)}
            disabled={disabled}
          />
        </View>
      </ScrollView>
    </View>
  );
}
