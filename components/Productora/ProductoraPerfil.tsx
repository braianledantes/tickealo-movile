import { Texto } from "@/components/Texto";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type User = {
  email: string;
  username: string;
};

type Productora = {
  calificacion: number;
  creditosDisponibles: number;
  cuit: number;
  direccion: string;
  imagenUrl: string;
  nombre: string;
  telefono: string;
  user: User;
  userId: number;
};

export function ProductoraPerfil({
  productoras = [],
  onPressPerfil,
}: {
  productoras?: Productora[];
  onPressPerfil?: (userId: number | null) => void;
}) {
  const [seleccionada, setSeleccionada] = useState<number | null>(null);

  const MAX_WIDTH = 200;
  const COLLAPSED_WIDTH = 80;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="p-4"
    >
      {productoras.map((productora) => {
        const isSelected = seleccionada === productora.userId;

        return (
          <TouchableOpacity
            key={productora.userId}
            onPress={() => {
              const nuevaSeleccion = isSelected ? null : productora.userId;
              setSeleccionada(nuevaSeleccion);
              onPressPerfil?.(nuevaSeleccion); //esto porque si lo dejo de seleccionar no me vuelven a mostrar todos los eventos
            }}
            activeOpacity={0.8}
            className={`flex-row items-center mr-3 px-3 py-2 ${
              isSelected ? "bg-[#14213d]" : "bg-transparent"
            }`}
            style={{
              borderRadius: 9999,
              width: isSelected ? MAX_WIDTH : COLLAPSED_WIDTH,
              transitionDuration: "200ms",
            }}
          >
            {productora.imagenUrl ? (
              <Image
                source={{ uri: productora.imagenUrl }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <View className="w-16 h-16 rounded-full bg-gray-500 justify-center items-center">
                <Text className="text-white text-xl font-bold">
                  {productora.user.username
                    ? productora.user.username.charAt(0).toUpperCase()
                    : "?"}
                </Text>
              </View>
            )}

            {isSelected && (
              <View className="ml-3 pr-3">
                <Texto bold className="text-white text-base" numberOfLines={1}>
                  {productora.nombre}
                </Texto>
                <Texto semiBold className="text-[#90e0ef] text-sm">
                  Seleccionada
                </Texto>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
