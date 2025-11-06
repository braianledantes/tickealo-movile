import { EntradasFiltro } from "@/components/Entradas/EntradasFiltro";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { useTransferencia } from "@/hooks/context/useTransferencia";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisEntradas() {
  const { misCompras, compras, loading, error } = useCompras();
  const {
    misTransferencias,
    transferencias,
    loading: loadingTransferencias,
  } = useTransferencia();
  const router = useRouter();

  const cargarCompras = async (pagina: number) => {
    try {
      await misCompras(pagina, 50);
      await misTransferencias();
    } catch (error) {
      console.error("Error al obtener compras:", error);
    }
  };

  useEffect(() => {
    cargarCompras(1);
  }, []);

  if (loading || loadingTransferencias) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-[#05081b]">
      <Header />
      {compras?.data.length === 0 && transferencias?.length === 0 ? (
        <View className="flex flex-1 justify-center items-center mx-20">
          <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
            Aquí estará tu colección de entradas… cuando compres alguna
          </Texto>
        </View>
      ) : error ? (
        <Texto className="tracking-wider px-10 text-[#FF002E] flex flex-1 justify-center items-center">
          {error}
        </Texto>
      ) : (
        <EntradasFiltro
          compras={compras?.data}
          transferencias={transferencias}
          onPressCompra={(compra) =>
            router.push({
              pathname: "/(app)/ticket/mi-ticket",
              params: { compraId: compra.id },
            })
          }
        />
      )}
    </SafeAreaView>
  );
}
