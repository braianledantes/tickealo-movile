import { Texto } from "@/components/Texto";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";

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
      className="py-4"
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
            className={`flex-row items-center pl-3 py-2 ${
              isSelected ? "bg-[#14213d]" : "bg-transparent"
            }`}
            style={{
              borderRadius: 9999,
              width: isSelected ? MAX_WIDTH : COLLAPSED_WIDTH,
              transitionDuration: "200ms",
            }}
          >
            <UsuarioPerfil
              username={productora.user.username}
              imagenPerfilUrl={productora.imagenUrl}
              icono="w-14 h-14"
              className="p-0"
              disabled={true}
            />

            {isSelected && (
              <View className="ml-3 pr-3">
                <Texto bold className="text-white text-base" numberOfLines={1}>
                  {productora.nombre}
                </Texto>
                <Texto className="text-[#90e0ef] text-sm tracking-wide">
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
