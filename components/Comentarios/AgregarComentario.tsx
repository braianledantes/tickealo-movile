import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "../Input/Input";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";

import { LinkButton } from "../Button/LinkButton";
import { Estrellas } from "./Rating";

export function AgregarComentario() {
  const { user } = useAuth();

  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  // Función para "enviar" el comentario (simulada)
  const handleEnviar = () => {
    if (!comentario.trim()) return;
    console.log("Comentario enviado:", comentario);
    setComentario(""); // limpia input
  };

  return (
    <View className="bg-[#0c0f2b] border-t border-[#1b1e5e] px-6 pt-4 pb-20">
      <View className="mb-4">
        <Estrellas
          calificacion={calificacion}
          editable={true}
          onChange={setCalificacion}
          starSize={20}
          starSpacing={10}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <UsuarioPerfil
          username={user?.user.username}
          imagenPerfilUrl={user?.imagenPerfilUrl}
          icono="w-12 h-12"
          className="p-0"
          disabled={true}
        />

        <Input
          value={comentario}
          onChangeValue={setComentario}
          placeholder="Cuentanos tu experiencia!"
          containerStyle={{ marginHorizontal: 12, flex: 1 }}
        />

        <LinkButton text="Enviar" onPress={handleEnviar} />
      </View>
    </View>
  );
}
