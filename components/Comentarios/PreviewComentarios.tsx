import { ComentarioDto } from "@/api/dto/comentario.dto";
import { EventoDto } from "@/api/dto/evento.dto";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";

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

  if (!evento) return null;

  const safeComentarios = comentarios ?? [];

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

  const remaining = safeComentarios.length - uniqueUsuarios.length;
  const circleText = remaining > 0 ? `+${remaining}` : null;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={goToComentarios}
      style={styles.container}
    >
      <View style={styles.avatarsContainer}>
        {uniqueUsuarios.map((c, index) => (
          <Image
            key={c.cliente.userId}
            source={{ uri: c.cliente.imagenPerfilUrl ?? "" }}
            style={[
              styles.avatar,
              { marginLeft: index === 0 ? 0 : -12, zIndex: 10 - index },
            ]}
          />
        ))}

        {circleText && (
          <View
            style={[
              styles.avatar,
              styles.moreCircle,
              { marginLeft: -12, zIndex: 0 },
            ]}
          >
            <Texto className="text-white font-bold text-sm tracking-wider">
              {circleText}
            </Texto>
          </View>
        )}
      </View>

      {!finalizo && (
        <View style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0b1030",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // shadow iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow Android
    elevation: 8,
  },
  avatarsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#222",
  },
  moreCircle: {
    backgroundColor: "#03045E",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#03045E",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    // shadow iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow Android
    elevation: 6,
  },
});
