import { ComentarioDto } from "@/api/dto/comentario.dto";
import { ProductoraDto } from "@/api/dto/evento.dto";
import { Estrellas } from "@/components/Comentarios/Rating";
import { useAuth } from "@/hooks/useAuth";
import { useComentarios } from "@/hooks/useComentarios";
import { useToast } from "@/hooks/useToast";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
  onComentarioEliminado,
}: ListaComentariosProps) {
  const { user } = useAuth();
  const { eliminarComentario } = useComentarios();
  const { showToast } = useToast();

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

  const handleEliminar = async (id: number) => {
    try {
      await eliminarComentario(id);
      if (onComentarioEliminado) onComentarioEliminado(id);
    } catch (err) {
      console.error("Error eliminando comentario:", err);
      showToast(
        "error",
        "Error",
        "Ocurrió un error al eliminar el comentario.",
      );
    }
  };

  const renderComentario = (c: ComentarioDto, indent: number = 0) => {
    const fechaFormateada = new Date(c.createdAt).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const esMio = c.cliente.userId === user?.userId;

    return (
      <View
        key={c.id}
        className={`bg-[#0c0f2b] rounded-3xl mb-4 p-4 ml-${indent * 4}`}
      >
        {/* Badge Fijado */}
        {c.fijado && (
          <View className="flex-row mb-4">
            <Fijar />
            <Texto semiBold className="text-[#999] ml-2">
              Fijado por {productora?.nombre}
            </Texto>
          </View>
        )}

        {/* Cabecera */}
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

          {/* Botones para mi comentario */}
          {esMio && (
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => console.log("Editar", c.id)}
                className="px-2 py-1 bg-blue-800 rounded"
              >
                <Texto className="text-white text-sm">Editar</Texto>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEliminar(c.id)}
                className="px-2 py-1 bg-red-600 rounded"
              >
                <Texto className="text-white text-sm">Eliminar</Texto>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Calificación */}
        <Estrellas calificacion={c.calificacion} />

        {/* Texto del comentario */}
        <Texto className="text-white text-md leading-6 mt-2">
          {c.comentario}
        </Texto>

        <View>
          <Texto className="text-gray-400 text-xs mt-2">
            {fechaFormateada}
          </Texto>
        </View>
      </View>
    );
  };

  return (
    <View className="px-4 space-y-4">
      {comentarios.map((c) => renderComentario(c))}
    </View>
  );
}
