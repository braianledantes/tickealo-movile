import { ComentarioDto } from "@/api/dto/comentario.dto";
import { useAuth } from "@/hooks/useAuth";
import { useComentarios } from "@/hooks/useComentarios";
import { useToast } from "@/hooks/useToast";
import { validarComentario } from "@/utils/validations/comentarioValidation";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Input } from "../Input/Input";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Estrellas } from "./Rating";

interface ComentarioProps {
  evento: number;
  onComentarioEnviado?: (comentario: ComentarioDto) => void;
}

export function AgregarComentario({
  evento,
  onComentarioEnviado,
}: ComentarioProps) {
  const { user } = useAuth();
  const { comentar } = useComentarios();
  const { showToast } = useToast();

  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(1);
  const [loading, setLoading] = useState(false);
  const [canSend, setCanSend] = useState(false);

  // Validación en tiempo real
  useEffect(() => {
    const error = validarComentario({ comentario, calificacion });
    if (error) {
      setCanSend(false);
      if (comentario || calificacion) {
        showToast("error", "Error", error);
      }
    } else {
      setCanSend(true);
    }
    // eslint-disable-next-line
  }, [comentario, calificacion]);

  const handleEnviar = async () => {
    const error = validarComentario({ comentario, calificacion });
    if (error) {
      showToast("error", "Error", error);
      return;
    }

    setLoading(true);
    try {
      const nuevoComentario = await comentar(evento, {
        comentario,
        calificacion,
      });

      setComentario("");
      setCalificacion(0);
      setCanSend(false);

      if (onComentarioEnviado && nuevoComentario) {
        onComentarioEnviado(nuevoComentario);
      }
    } catch (err) {
      console.error("Error al enviar el comentario:", err);
      showToast("error", "Error", "No se pudo enviar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="border-t border-[#0F1D4C] px-6 py-3">
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
          autofocus={true}
        />

        <IconButton
          iconName="send-sharp"
          size={28}
          onPress={handleEnviar}
          disabled={!canSend || loading}
          loading={loading}
        />
      </View>
    </View>
  );
}
