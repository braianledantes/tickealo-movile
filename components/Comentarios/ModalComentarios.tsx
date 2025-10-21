import { ComentarioDto } from "@/api/dto/comentario.dto";
import { ProductoraDto } from "@/api/dto/evento.dto";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { Texto } from "../Texto";
import { ListaComentarios } from "./ListaComentarios";

interface ModalComentariosProps {
  visible: boolean;
  onClose: () => void;
  comentarios?: ComentarioDto[];
  productora?: ProductoraDto;
}

export const ModalComentarios: React.FC<ModalComentariosProps> = ({
  visible,
  onClose,
  comentarios = [],
  productora,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View className="bg-[#05081b] h-3/4 rounded-t-3xl py-5">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <Texto bold className="text-white tracking-wider text-lg">
              RESEÑAS DEL EVENTO ({comentarios?.length})
            </Texto>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <ListaComentarios
              comentarios={comentarios}
              productora={productora}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
