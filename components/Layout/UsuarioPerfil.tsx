import { Texto } from "@/components/Texto";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

type UsuarioPerfilProps = {
  username?: string;
  imagenPerfilUrl?: string | null;
  extra?: string | number | null;
  className?: string;
  icono?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const UsuarioPerfil: React.FC<UsuarioPerfilProps> = ({
  username = "?",
  imagenPerfilUrl = null,
  className = "py-4",
  icono = "w-12 h-12",
  onPress,
  disabled = false,
}) => {
  const router = useRouter();
  const handlePress = () => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else {
      router.push("/perfil");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${className}`}
      disabled={disabled}
    >
      <View
        className={`bg-[#0077B6] ${icono}  rounded-full flex justify-center items-center`}
      >
        {imagenPerfilUrl ? (
          <Image
            source={{ uri: imagenPerfilUrl }}
            className="w-full h-full rounded-full"
          />
        ) : (
          <Texto bold className="text-center text-white text-lg">
            {username.charAt(0).toUpperCase()}
          </Texto>
        )}
      </View>
    </TouchableOpacity>
  );
};
