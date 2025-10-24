import { ComentarioDto } from "@/api/dto/comentario.dto";
import { ProductoraDto } from "@/api/dto/evento.dto";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Fijar } from "../Input/Icons";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";
import { Estrellas } from "./Estrellas";
import { MiComentario } from "./MiComentario";

interface ComentarioCardProps {
  comentario: ComentarioDto;
  productora?: ProductoraDto;
}

export const ComentarioCard: React.FC<ComentarioCardProps> = ({
  comentario,
  productora,
}) => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const esMio = comentario.cliente.userId === user?.userId;

  const fechaFormateada = new Date(comentario.createdAt).toLocaleDateString(
    "es-AR",
    { day: "2-digit", month: "short", year: "numeric" },
  );

  const abrirPreview = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Pressable onLongPress={abrirPreview} className="px-4">
        <View className="bg-[#0c0f2b] rounded-3xl mb-4 p-4">
          {comentario.fijado && (
            <View className="flex-row mb-4 items-center">
              <Fijar />
              <Texto semiBold className="text-[#999] ml-2">
                Fijado por {productora?.nombre}
              </Texto>
            </View>
          )}

          <View className="flex-row items-center justify-between mb-2">
            <UsuarioPerfil
              username={comentario.cliente.nombre}
              imagenPerfilUrl={comentario.cliente.imagenPerfilUrl}
              icono="w-14 h-14"
              className="p-0"
              disabled={true}
            />

            <View className="ml-3 flex-1">
              <Texto className="text-white text-md tracking-wide">
                {comentario.cliente.nombre} {comentario.cliente.apellido}
              </Texto>
              <Texto className="text-gray-400 text-sm">
                @{comentario.cliente.user.username}
              </Texto>
            </View>

            {esMio && (
              <IconButton
                iconType="Entypo"
                iconName="dots-three-vertical"
                size={18}
                color="#999"
                onPress={abrirPreview}
              />
            )}
          </View>

          <Estrellas calificacion={comentario.calificacion} />

          <Texto className="text-white text-sm leading-6 mt-2">
            {comentario.comentario}
          </Texto>

          <Texto className="text-gray-400 text-xs mt-2 ">
            {fechaFormateada}
          </Texto>
        </View>
      </Pressable>

      {modalVisible && (
        <MiComentario
          comentarioSeleccionado={comentario}
          esMiComentario={esMio}
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};
