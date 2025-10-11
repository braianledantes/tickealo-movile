import { EntradasDetail } from "@/components/Entradas/EntradasDetail";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useCompras } from "@/hooks/useCompras";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// 🧩 Tipos
type Evento = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  bannerUrl?: string;
  portadaUrl?: string;
};

type Ticket = {
  id: number;
  entrada: {
    evento: Evento;
  };
};

type Compra = {
  id: number;
  estado: string;
  monto: string;
  tickets: Ticket[];
};

export default function MisEntradas() {
  const { compraId } = useLocalSearchParams<{ compraId: string }>();
  const { misCompras } = useCompras();
  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState<Compra[]>([]);
  const router = useRouter();
  const compraIdNum = compraId ? parseInt(compraId, 10) : undefined;

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        const data = await misCompras(1, 5);
        const compras = data?.data ?? [];
        setCompras(compras);
        console.log(compras);
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

  const compraSeleccionada = compras.find((c) => c.id === compraIdNum);

  if (!compraSeleccionada) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <Text style={{ color: "#fff" }}>Compra no encontrada</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />

      <ScrollView className="flex flex-1 p-4">
        <EntradasDetail
          compra={compraSeleccionada}
          onPress={() => console.log("Ver detalles de la compra")}
        />
      </ScrollView>
    </View>
  );
}
