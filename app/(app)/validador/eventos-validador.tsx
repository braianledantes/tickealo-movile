import { EventList } from "@/components/Eventos/EventList";
import { Header } from "@/components/Layout/Header";
import { ProductoraPerfil } from "@/components/Productora/ProductoraPerfil";
import { Texto } from "@/components/Texto";
import { useValidador } from "@/hooks/context/useValidador";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ValidadorEventos() {
  const router = useRouter();
  const {
    productoras,
    setProductoraSeleccionada,
    eventos,
    loadingProductoras,
    loadingEventos,
  } = useValidador();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([
        //agregar recarga de eventos y productoras
      ]);
    } catch (error) {
      console.error("Error al refrescar:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#05081b]">
      <Header />

      <View className="px-5 mt-4">
        <Texto bold className="text-[#CAF0F8]">
          PRODUCTORAS A LAS QUE PERTENECES
        </Texto>

        {loadingProductoras ? (
          <View className="flex-row justify-center mt-4">
            <ActivityIndicator size="small" color="#4da6ff" />
          </View>
        ) : (
          <ProductoraPerfil
            productoras={productoras}
            onPressPerfil={(userId) => setProductoraSeleccionada(userId)}
          />
        )}
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4da6ff"
            colors={["#4da6ff"]}
          />
        }
      >
        {loadingEventos ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4da6ff" />
          </View>
        ) : (
          <EventList
            events={eventos}
            onPressEvent={(id) =>
              router.push({
                pathname: "/(app)/validador/info-evento-validador",
                params: { eventoId: id },
              })
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
