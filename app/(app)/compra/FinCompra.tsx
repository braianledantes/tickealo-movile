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
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-1"
      >
        <View className="mt-4 mb-5 px-4 gap-8">
          <EntradaCard
            key={entrada.id}
            tipo={entrada.tipo}
            precio={entrada.precio}
            priceValueOverride={totalCalculado}
            priceSuffixText="TOTAL"
            onPress={undefined}
            right={RightQty}
          />

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
      </ScrollView>

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
          <Text className="text-center text-red-400 mb-2 text-sm">{error}</Text>
        )}

        <Button
          title={loading ? "Comprando..." : "Confirmar compra"}
          onPress={handleComprar}
          disabled={tiempoAgotado || loading}
        />
      </View>
    </View>
  );
}
