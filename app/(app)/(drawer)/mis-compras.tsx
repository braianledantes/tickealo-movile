import { CompraDto } from "@/api/dto/compras.dto";
import { ComprasFiltro } from "@/components/Compras/ComprasFiltro";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisEntradas() {
  const { misCompras, loading } = useCompras();
  const router = useRouter();

  const [compras, setCompras] = useState<CompraDto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const cargarCompras = async (pagina: number) => {
    try {
      const data = await misCompras(pagina, 50);
      const nuevasCompras = data?.data ?? [];

      setCompras((prev) =>
        pagina === 1 ? nuevasCompras : [...prev, ...nuevasCompras],
      );
    } catch (error) {
      console.error("Error al obtener compras:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await cargarCompras(1);
    } catch (err) {
      console.error("Error refrescando compras:", err);
    } finally {
      setRefreshing(false);
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
    <SafeAreaView
      className="flex flex-1 bg-[#05081b]"
      edges={["left", "right", "bottom"]}
    >
      {compras.length === 0 && !loading ? (
        <View className="flex flex-1 justify-center items-center mx-20">
          <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
            Aquí estará tu colección de entradas… cuando compres alguna
          </Texto>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4da6ff"
            />
          }
        >
          <ComprasFiltro
            compras={compras}
            onPressCompra={(compra) =>
              router.push({
                pathname: "/(app)/compra/mi-compra",
                params: { compraId: compra.id },
              })
            }
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
