import { ClienteList } from "@/components/Clientes/ClientesList";
import { Input } from "@/components/Input/Input";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Texto } from "@/components/Texto";
import { Title } from "@/components/Title";
import { useTicket } from "@/hooks/context/useTicket";
import { useToast } from "@/hooks/context/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

export default function TransferirTicket() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { listaClientes, clientes, search, setSearch } = useTicket();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await listaClientes();
      } catch (err) {
        console.log("Error obteniendo lista de clientes:", err);
        showToast("error", "Error", "Error obteniendo lista clientes");
      }
    };
    fetchData();
    // eslint-disable-next-line
    }, [listaClientes]);

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <Title>Transferir Entrada</Title>
        <Texto className="text-[#999] text-md text-center py-2 px-5">
          Ingresa el mail exacto de la persona a quien le quieres transferir tu
          entrada.
        </Texto>
        <Input
          value={search}
          onChangeValue={setSearch}
          placeholder="Correo del Usuario..."
          iconName="search-outline"
          containerStyle={{ marginBottom: 10 }}
        />
        <Texto className="text-[#999] text-md text-center py-2 border-b-[0.2px] border-white/20">
          Recordá: el correo debe estar registrado en la plataforma!
        </Texto>
        {search ? (
          clientes.length === 0 ? (
            <Texto>No hay resultados con esa búsqueda.</Texto>
          ) : (
            <>
              <Texto
                semiBold
                className="tracking-wider text-md text-[#cfe3ff] mt-3 px-4"
              >
                USUARIOS ENCONTRADOS
              </Texto>
              {clientes.map((item) => (
                <ClienteList
                  key={item.userId}
                  cliente={item}
                  onPress={() =>
                    router.push({
                      pathname: "/(app)/ticket/transferir-ticket",
                      params: {
                        ticketId: ticketId,
                        data: JSON.stringify(item),
                      },
                    })
                  }
                />
              ))}
            </>
          )
        ) : null}
      </ScrollView>
    </View>
  );
}
