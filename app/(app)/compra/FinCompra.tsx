import { Button } from "@/components/Button/Button";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { InputImageUpLoader } from "@/components/Input/InputImageUpLoader";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { CuentaBancaria } from "@/components/Productora/CuentaBancaria";
import { useCompra } from "@/hooks/useCompra";
import { useEvento } from "@/hooks/useEvento";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Compra() {
  const { eventoId } = useLocalSearchParams<{ eventoId: string }>();
  const {
    entrada,
    loading,
    error,
    totalCalculado,
    cantNum,
    setComprobanteUri,
    handleComprar,
  } = useCompra();
  const {
    subtotal,
    descuento,
    totalFinal,
    puntosUsados,
    puntosGanados,
    usarPuntos,
  } = useLocalSearchParams<{
    subtotal: string;
    descuento: string;
    totalFinal: string;
    puntosUsados: string;
    puntosGanados: string;
    usarPuntos: string;
  }>();

  const { productora, cuentaBancaria } = useEvento(eventoId);

  // ✅ TIMER: 1 hora = 3600 segundos
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const tiempoAgotado = timeLeft <= 0;

  if (!entrada) {
    return (
      <View className="flex-1 items-center justify-center bg-[#010030]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  const RightQty = (
    <View className="items-center justify-center">
      <Text className="text-white font-extrabold text-lg">{cantNum}</Text>
      <Text className="text-xs mt-0.5 text-indigo-300">cantidad</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-5 px-4 gap-8">
          <EntradaCard
            key={entrada.id}
            tipo={entrada.tipo}
            precio={entrada.precio}
            priceValueOverride={Number(totalFinal)}
            priceSuffixText="TOTAL"
            onPress={undefined}
            right={RightQty}
          />

          {/* RESUMEN DE LA COMPRA */}
          <View className="bg-[#0b1030] border border-[#1b1e5e] rounded-2xl p-4 mt-2">
            <Text className="text-[#7ee5ff] font-bold text-lg mb-3 tracking-wide">
              RESUMEN DE LA COMPRA
            </Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-300">Subtotal</Text>
              <Text className="text-white font-semibold">${subtotal}</Text>
            </View>

            {usarPuntos === "1" && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-[#38d39f]">Descuento (10%)</Text>
                <Text className="text-[#38d39f] font-semibold">
                  - ${descuento}
                </Text>
              </View>
            )}

            <View className="h-[1px] bg-[#1b1e5e] my-2" />

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-300">Total final</Text>
              <Text className="text-[#4da6ff] font-bold">${totalFinal}</Text>
            </View>

            {usarPuntos === "1" && (
              <>
                <View className="h-[1px] bg-[#1b1e5e] my-2" />

                <Text className="text-[#7ee5ff] font-bold text-base mb-1">
                  Puntos
                </Text>

                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-300">Puntos usados</Text>
                  <Text className="text-white font-semibold">-1</Text>
                </View>

                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-300">Puntos ganados</Text>
                  <Text className="text-white font-semibold">
                    +{puntosGanados}
                  </Text>
                </View>
              </>
            )}
          </View>

          <CuentaBancaria p={productora} c={cuentaBancaria} />

          <InputImageUpLoader
            label="Subí el comprobante de transferencia"
            onFileSelect={(result) => {
              if (!result || result.canceled) return;
              const uri = result.assets?.[0]?.uri;
              if (uri) setComprobanteUri(uri);
            }}
          />
        </View>

        <View className="mb-14 px-4">
          {!tiempoAgotado ? (
            <Text className="text-center text-[#999] mb-3 text-base sm:text-lg tracking-wider">
              Tiempo restante para confirmar: {formatTime()}
            </Text>
          ) : (
            <Text className="text-center text-[#BD4C4C] mb-3 text-base sm:text-lg tracking-wider">
              Tiempo de espera agotado. Inicia una nueva compra.
            </Text>
          )}

          {error && (
            <Text className="text-center text-red-400 mb-2 text-sm">
              {error}
            </Text>
          )}

          <Button
            title={loading ? "Comprando..." : "Confirmar compra"}
            onPress={handleComprar}
            disabled={tiempoAgotado || loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
