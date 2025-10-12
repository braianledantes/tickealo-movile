import { CompraDto } from "@/api/dto/compras.dto";
import { EntradaComprada } from "@/components/Entradas/EntradaComprada";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/useCompras";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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

      const data = await misCompras(pagina, 5);
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

      <FlatList
        data={compras}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        ListHeaderComponent={
          <Texto bold className="text-[#90e0ef]/80 px-5 mt-2 mb-4">
            TODOS MIS TICKETS
          </Texto>
        }
        renderItem={({ item }) => (
          <View className="mx-4 mb-4">
            <EntradaComprada
              compra={item}
              onPress={() =>
                router.push({
                  pathname: "/(app)/entradas/mi-entrada",
                  params: { compraId: item.id },
                })
              }
            />
          </View>
        )}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            handleLoadMore();
            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#4da6ff" className="my-4" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
