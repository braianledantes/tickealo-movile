import { CompraDto } from "@/api/dto/compras.dto";
import { EntradaComprada } from "@/components/Entradas/EntradaComprada";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/useCompras";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function MisEntradas() {
  const { misCompras } = useCompras();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState<CompraDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        const data = await misCompras(1, 5);
        const compras = data?.data ?? [];
        setCompras(compras);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [misCompras]);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!compras || compras.length === 0) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <Text style={{ color: "#fff" }}>
          No se encontraron compras asociadas a su usuario
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />

      <ScrollView className="flex flex-1">
        <Texto bold className="text-[#90e0ef]/80 px-5 mt-2 mb-4">
          TODOS MIS TICKETS
        </Texto>
        {compras.map((compra) => (
          <View key={compra.id} className="mx-4">
            <EntradaComprada
              compra={compra}
              onPress={() =>
                router.push({
                  pathname: "/(app)/entradas/mi-entrada",
                  params: { compraId: compra.id },
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
