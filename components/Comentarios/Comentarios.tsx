import { ComentarioDto } from "@/api/dto/comentario.dto";
import { ProductoraDto } from "@/api/dto/evento.dto";
import { Estrellas } from "@/components/Comentarios/Rating";
import React from "react";
import { View } from "react-native";
import { Fijar } from "../Input/Icons";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";

interface ListaComentariosProps {
  comentarios?: ComentarioDto[];
  productora?: ProductoraDto;
}

export function ListaComentarios({
  comentarios = [],
  productora,
}: ListaComentariosProps) {
  const renderComentario = (c: ComentarioDto, indent: number = 0) => {
    const fechaFormateada = new Date(c.createdAt).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return (
      <View
        key={c.id}
        className={`bg-[#0c0f2b] border border-[#1b1e5e] px-6 py-4 rounded-[30px] mb-4 ml-${indent * 4}`}
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
            username={c.usuario.user.username}
            imagenPerfilUrl={c.usuario.imagenPerfilUrl}
            icono="w-14 h-14"
            className="p-0"
            disabled={true}
          />

          <View className="ml-3 flex-1">
            <Texto
              semiBold
              className="text-white font-semibold text-lg tracking-wide"
            >
              {c.usuario.nombre} {c.usuario.apellido}
            </Texto>
            <Texto className="text-gray-400 text-md">
              @{c.usuario.user.username}
            </Texto>
          </View>
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
    <View className="px-4 mb-10 space-y-4">
      {comentarios.map((c) => renderComentario(c))}
    </View>
  );
}
