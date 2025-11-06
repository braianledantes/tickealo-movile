import { Me } from "@/api/dto/me.dto";
import React from "react";
import { Pressable, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";

type ClienteDto = Me;

interface Props {
  cliente: ClienteDto;
  onPress?: () => void;
}

export const ClienteList: React.FC<Props> = ({ cliente, onPress }) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        className="bg-[#0c0f2b] rounded-full p-4 my-2"
      >
        <View className="flex-row items-center justify-between">
          <UsuarioPerfil
            username={cliente.nombre}
            imagenPerfilUrl={cliente.imagenPerfilUrl}
            icono="w-10 h-10"
            className="p-0"
            disabled={true}
          />

          <View className="ml-3 flex-1">
            <Texto className="text-white text-md tracking-wide">
              {cliente.nombre}
              {cliente.apellido}
            </Texto>
            <Texto className="text-gray-400 text-sm">
              {cliente.user.email}
            </Texto>
          </View>
          <IconButton
            iconType="Entypo"
            iconName="chevron-right"
            onPress={onPress}
          />
        </View>
      </Pressable>
    </>
  );
};
