import { CompraDto } from "@/api/dto/compras.dto";
import { ComprasFiltro } from "@/components/Compras/ComprasFiltro";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisEntradas() {
  const { misCompras } = useCompras();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState<CompraDto[]>([]);

  const cargarCompras = async (pagina: number) => {
    try {
      if (pagina === 1) setLoading(true);

      const data = await misCompras(pagina, 50);
      const nuevasCompras = data?.data ?? [];

      setCompras((prev) =>
        pagina === 1 ? nuevasCompras : [...prev, ...nuevasCompras],
      );
    } catch (error) {
      console.error("Error al obtener compras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCompras(1);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-[#05081b]">
      <Header />

      {compras.length === 0 && !loading ? (
        <View className="flex flex-1 justify-center items-center mx-20">
          <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
            Aquí estará tu colección de entradas… cuando compres alguna
          </Texto>
        </View>
      ) : (
        <ComprasFiltro
          compras={compras}
          onPressCompra={(compra) =>
            router.push({
              pathname: "/(app)/compra/mi-compra",
              params: { compraId: compra.id },
            })
          }
        />
      )}
    </SafeAreaView>
  );
}
