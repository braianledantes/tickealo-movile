import { ComentarioDto } from "@/api/dto/comentario.dto";
import { ProductoraDto } from "@/api/dto/evento.dto";
import { MiComentario } from "@/components/Comentarios/MiComentario";
import { Estrellas } from "@/components/Comentarios/Rating";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Fijar } from "../Input/Icons";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";

interface ListaComentariosProps {
  comentarios?: ComentarioDto[] | null;
  productora?: ProductoraDto;
  onComentarioEliminado?: (id: number) => void;
}

export function ListaComentarios({
  comentarios = [],
  productora,
}: ListaComentariosProps) {
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [esMio, setEsMio] = useState(false);
  const [comentarioSeleccionado, setComentarioSeleccionado] =
    useState<ComentarioDto | null>(null);

  if (!comentarios?.length) {
    return (
      <View className="flex-1 justify-center items-center px-6 py-40">
        <Texto className="text-gray-400 text-center text-lg">
          Aún no hay comentarios...{"\n"}
          Sé el primero en contarnos tu experiencia
        </Texto>
      </View>
    );
  }

  const abrirPreview = (comentario: ComentarioDto, esMio: boolean) => {
    setComentarioSeleccionado(comentario);
    setEsMio(esMio);
    setModalVisible(true);
  };

  const renderComentario = (c: ComentarioDto, indent: number = 0) => {
    const fechaFormateada = new Date(c.createdAt).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const esMio = c.cliente.userId === user?.userId;

    return (
      <Pressable onLongPress={() => abrirPreview(c, esMio)}>
        <View
          className={`bg-[#0c0f2b] rounded-3xl mb-4 p-4`}
          style={{ marginLeft: indent * 16 }}
        >
          {c.fijado && (
            <View className="flex-row mb-4">
              <Fijar />
              <Texto semiBold className="text-[#999] ml-2">
                Fijado por {productora?.nombre}
              </Texto>
            </View>
          )}

          <View className="flex-row items-center justify-between mb-2">
            <UsuarioPerfil
              username={c.cliente.nombre}
              imagenPerfilUrl={c.cliente.imagenPerfilUrl}
              icono="w-14 h-14"
              className="p-0"
              disabled={true}
            />

            <View className="ml-3 flex-1">
              <Texto
                semiBold
                className="text-white font-semibold text-lg tracking-wide"
              >
                {c.cliente.nombre} {c.cliente.apellido}
              </Texto>
              <Texto className="text-gray-400 text-md">
                @{c.cliente.user.username}
              </Texto>
            </View>

            {esMio && (
              <IconButton
                iconType="Entypo"
                iconName="dots-three-vertical"
                size={18}
                color="#999"
                onPress={() => abrirPreview(c, esMio)}
              />
            )}
          </View>

          <Estrellas calificacion={c.calificacion} />

          <Texto className="text-white text-md leading-6 mt-2">
            {c.comentario}
          </Texto>

          <View>
            <Texto className="text-gray-400 text-xs mt-2">
              {fechaFormateada}
            </Texto>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="px-4 space-y-4">
      {comentarios.map((c) => renderComentario(c))}

      {comentarioSeleccionado && (
        <MiComentario
          comentarioSeleccionado={comentarioSeleccionado}
          esMiComentario={esMio}
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
}
