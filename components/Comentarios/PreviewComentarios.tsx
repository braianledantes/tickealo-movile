import { ComentarioDto } from "@/api/dto/comentario.dto";
import { EventoDto } from "@/api/dto/evento.dto";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";
import { ModalComentarios } from "./ModalComentarios";

interface PreviewComentariosProps {
  comentarios?: ComentarioDto[] | null;
  evento?: EventoDto;
  finalizo?: boolean;
}

export const PreviewComentarios: React.FC<PreviewComentariosProps> = ({
  comentarios,
  evento,
  finalizo,
}) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  if (!evento) return null;

  const safeComentarios = comentarios ?? [];
  const total = safeComentarios.length;

  const uniqueUsuarios: ComentarioDto[] = [];
  const seenUserIds = new Set<number>();

  for (const c of safeComentarios) {
    if (!seenUserIds.has(c.cliente.userId)) {
      uniqueUsuarios.push(c);
      seenUserIds.add(c.cliente.userId);
    }
    if (uniqueUsuarios.length >= 2) break;
  }

  const goToComentarios = () => {
    router.push({
      pathname: "/comentarios",
      params: { eventoId: evento.id },
    });
  };

  // Calculamos los comentarios restantes considerando usuarios repetidos
  const remaining = safeComentarios.length - uniqueUsuarios.length;
  const circleText = remaining > 0 ? `+${remaining}` : null;

  return (
    <View className="absolute bottom-16 left-4 right-4 flex-row items-center justify-between z-50">
      <TouchableOpacity
        className="flex-row"
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        {uniqueUsuarios.map((c, index) => (
          <Image
            key={index}
            source={{ uri: c.cliente.imagenPerfilUrl ?? "" }}
            className="w-16 h-16 rounded-full"
            style={{
              marginLeft: index === 0 ? 0 : -12,
              zIndex: 10 - index,
            }}
          />
        ))}

        {circleText && (
          <View
            className="w-16 h-16 rounded-full bg-[#03045E] flex justify-center items-center"
            style={{ marginLeft: -12, zIndex: 0 }}
          >
            <Texto className="text-white font-bold text-sm tracking-wider">
              {circleText}
            </Texto>
          </View>
        )}
      </TouchableOpacity>

      {!finalizo && (
        <TouchableOpacity
          onPress={goToComentarios}
          className="w-16 h-16 rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-[8px] bg-[#03045E] justify-center items-center shadow-lg"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}

      <ModalComentarios
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        comentarios={safeComentarios}
      />
    </View>
  );
};
