import { EntradasFiltro } from "@/components/Entradas/EntradasFiltro";
import { Header } from "@/components/Layout/Header";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/context/useCompras";
import { useTicket } from "@/hooks/context/useTicket";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MisTickets() {
  const {
    ticketsTransferidos,
    transferidos,
    loading: loadingTransferidos,
    error,
  } = useTicket();
  const {
    cargarComprasPorEstado,
    comprasPendientesValidacion,
    comprasValidadas,
    loading: loadingCompras,
    error: errorCompras,
  } = useCompras();

  const router = useRouter();
  const [noHayTickets, setNoHayTickets] = useState(false);

  useEffect(() => {
    cargarComprasPorEstado("ACEPTADA");
    ticketsTransferidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pendientes = comprasPendientesValidacion?.data || [];
    const validadas = comprasValidadas?.data || [];
    const transfer = transferidos || [];
    const transferTickets = ticketsTransferidos || [];

    setNoHayTickets(
      pendientes.length === 0 &&
        validadas.length === 0 &&
        transfer.length === 0 &&
        transferTickets.length === 0,
    );
  }, [
    comprasPendientesValidacion,
    comprasValidadas,
    transferidos,
    ticketsTransferidos,
  ]);

  if (loadingCompras || loadingTransferidos) {
    return (
      <View className="flex flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-[#05081b]">
      <Header />
      {noHayTickets ? (
        <View className="flex flex-1 justify-center items-center mx-20">
          <Texto bold className="text-[#CAF0F8] text-center tracking-wider">
            Aquí estará tu colección de entradas… cuando compres alguna
          </Texto>
        </View>
      ) : error || errorCompras ? (
        <Texto className="tracking-wider px-10 text-[#FF002E] flex flex-1 justify-center items-center">
          {error || errorCompras}
        </Texto>
      ) : (
        <EntradasFiltro
          porUsar={comprasPendientesValidacion?.data || []}
          usados={comprasValidadas?.data || []}
          transferidos={transferidos || []}
          onPressTicket={(item) => {
            if ("tickets" in item) {
              router.push({
                pathname: "/ticket/compra/[compraId]",
                params: { compraId: item.id.toString() },
              });
            } else if ("ticket" in item) {
              router.push({
                pathname: "/ticket/transferencia/[ticketId]",
                params: { ticketId: item.ticket.id.toString() },
              });
            }
          }}
        />
      )}
    </SafeAreaView>
  );
}
