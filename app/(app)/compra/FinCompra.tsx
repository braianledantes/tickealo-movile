import { Button } from "@/components/Button/Button";
import { CuentaBancaria } from "@/components/CuentaBancaria";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { InputImageUpLoader } from "@/components/Input/InputImageUpLoader";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useCompra } from "@/hooks/useCompra";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function Compra() {
  const {
    entrada,
    loading,
    datosBancarios,
    totalCalculado,
    cantNum,
    comprobanteUri,
    setComprobanteUri,
    errorMsg,
    handleComprar,
  } = useCompra();

  if (loading || !entrada) {
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

          <CuentaBancaria datos={datosBancarios} />

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
        {errorMsg && (
          <Text className="text-center text-red-400 mb-2 text-sm">
            {errorMsg}
          </Text>
        )}
        <Button title="Confirmar compra" onPress={handleComprar} />
      </View>
    </View>
  );
}
