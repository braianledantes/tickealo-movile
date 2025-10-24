import { EventoDto } from "@/api/dto/evento.dto";
import { useEventos } from "@/hooks/useEventos";
import { LinearGradient } from "expo-linear-gradient"; // ✅ Importar
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { FollowButton } from "../Button/FollowButton";
import { IconButton } from "../Button/IconButton";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";

interface Props {
  evento: EventoDto;
  visible: boolean;
  onClose: () => void;
}

export function ProductoraInfo({ evento, visible, onClose }: Props) {
  const { getEventosByProductora } = useEventos();
  const router = useRouter();
  const [eventosCount, setEventosCount] = useState<number>(0);
  const productora = evento.productora;

  useEffect(() => {
    if (!visible) return;

    const fetchEventos = async () => {
      try {
        const eventos = await getEventosByProductora(productora.userId);
        setEventosCount(eventos.length);
      } catch (error) {
        console.error("Error al obtener eventos de productora:", error);
        setEventosCount(0);
      }
    };

    fetchEventos();
    // eslint-disable-next-line
  }, [visible, productora.userId]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/70">
        <LinearGradient
          colors={["#05081b", "#0f1a4a"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.modalContainer}
        >
          <View className="flex-row justify-end">
            <IconButton
              iconName="close"
              color="white"
              onPress={onClose}
              size={30}
            />
          </View>

          <View style={{ position: "absolute", top: -50, alignSelf: "center" }}>
            <View className="bg-[#0c0f2b] px-2 rounded-full">
              <UsuarioPerfil
                imagenPerfilUrl={productora.imagenUrl}
                username={productora.nombre}
                icono="w-32 h-32"
                className="py-2"
                disabled={true}
              />
            </View>
          </View>

          <Texto
            semiBold
            className="text-2xl mt-10 text-center tracking-wider text-white pb-3 border-b border-[#1E40AF]/30"
          >
            {productora.nombre}
          </Texto>

          <View className="flex-row justify-between items-center my-3">
            <Texto className="text-xl tracking-wider text-white flex-1">
              Eventos publicados ({eventosCount})
            </Texto>
            <IconButton
              iconType="Feather"
              iconName="chevron-right"
              size={30}
              color="white"
              onPress={() => router.push("/(app)/Perfil/profile")}
            />
          </View>

          <FollowButton evento={evento} productoraId={productora.userId} />
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "33%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
});
