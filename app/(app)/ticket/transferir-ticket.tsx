import { Me } from "@/api/dto/me.dto";
import { Button } from "@/components/Button/Button";
import { UsuarioPerfil } from "@/components/Layout/UsuarioPerfil";
import { Texto } from "@/components/Texto";
import { Title } from "@/components/Title";
import { useTicket } from "@/hooks/context/useTicket";
import { useToast } from "@/hooks/context/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

type ClienteDto = Me;
export default function TransferirTicket() {
  const { ticketId, data } = useLocalSearchParams<{
    ticketId: string;
    data: string;
  }>();
  const [cliente, setCliente] = useState<ClienteDto>();
  const { transferir, loading, error } = useTicket();
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const dataString = Array.isArray(data) ? data[0] : data;

    if (dataString) {
      const parsed = JSON.parse(dataString);
      setCliente(parsed);
    }
  }, [data]);

  const handleTransferir = async () => {
    if (!cliente || !ticketId) return;
    const success = await transferir(Number(ticketId), cliente.user.email);
    if (success) {
      setSuccess(true);
      showToast(
        "success",
        "¡Listo!",
        "Entrada transferida con éxito! Avisale al remitente.",
      );
      router.replace("/");
    } else {
      showToast("error", "Error", "No se pudo transferir la Entrada, err");
    }
  };

  if (!cliente) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#05081b]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8">
        <Title>Transferir Entrada</Title>
        <Texto className="text-[#999] text-md text-center py-2 border-b-[0.2px] border-white/20">
          Procura que los datos sean exactos!
        </Texto>
        <Texto semiBold className="tracking-wider text-md text-[#cfe3ff] mt-3 ">
          ESTAS POR TRANSFERIR TU ENTRADA A
        </Texto>
        <View className="flex-row justify-start items-center">
          <UsuarioPerfil
            username={cliente.nombre}
            imagenPerfilUrl={cliente.imagenPerfilUrl}
            icono="w-24 h-24"
          />
          <View className="ml-5">
            <Texto semiBold className="tracking-wider text-white text-xl">
              {cliente.nombre}
              {cliente.apellido}
            </Texto>
            <Texto semiBold className="tracking-wider text-[#999] text-xl">
              @{cliente.user.username}
            </Texto>
          </View>
        </View>
        <View className="gap-4 py-5">
          <View>
            <Texto semiBold className="tracking-wider text-sm text-[#cfe3ff]">
              EMAIL
            </Texto>
            <Texto semiBold className="tracking-wider text-md text-white">
              {cliente.user.email}
            </Texto>
          </View>
          <View>
            <Texto semiBold className="tracking-wider text-sm text-[#cfe3ff]">
              TELEFONO
            </Texto>
            <Texto semiBold className="tracking-wider text-md text-white">
              {cliente.telefono}
            </Texto>
          </View>
          <View>
            <Texto semiBold className="tracking-wider text-sm text-[#cfe3ff]">
              NACIONALIDAD
            </Texto>
            <Texto semiBold className="tracking-wider text-md text-white">
              {cliente.pais}
            </Texto>
          </View>
        </View>
        {error ? (
          <Texto className="text-center text-red-400 mt-4 mb-2 text-sm">
            {error}
          </Texto>
        ) : (
          <Texto className="text-center text-[#999] mt-4 mb-2 text-sm">
            La transferencia es automatica e irreversible.
          </Texto>
        )}
        <Button
          title={loading ? "Transfiriendo..." : "Transferir"}
          disabled={loading || success}
          onPress={handleTransferir}
        />
      </ScrollView>
    </View>
  );
}
