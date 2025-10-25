import { CompraDto } from "@/api/dto/compras.dto";
import { EntradasFiltro } from "@/components/Entradas/EntradasFiltro";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisEntradas() {
  const { misCompras } = useCompras();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [compras, setCompras] = useState<CompraDto[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const onEndReachedCalledDuringMomentum = useRef(false);

  const cargarCompras = async (pagina: number) => {
    try {
      if (pagina === 1) setLoading(true);
      else setLoadingMore(true);

      const data = await misCompras(pagina, 50);
      const nuevasCompras = data?.data ?? [];

      if (nuevasCompras.length < 5) setHasMore(false);

      setCompras((prev) =>
        pagina === 1 ? nuevasCompras : [...prev, ...nuevasCompras],
      );
    } catch (error) {
      console.error("Error al obtener compras:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    cargarCompras(1);
  }, []);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    const siguientePagina = paginaActual + 1;
    setPaginaActual(siguientePagina);
    cargarCompras(siguientePagina);
  };

  if (loading && paginaActual === 1) {
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
        <EntradasFiltro
          compras={compras}
          onPressCompra={(compra) =>
            router.push({
              pathname: "/(app)/ticket/mi-ticket",
              params: { compraId: compra.id },
            })
          }
          onEndReached={handleLoadMore}
          loadingMore={loadingMore}
          hasMore={hasMore}
        />
      )}
    </SafeAreaView>
  );
}
