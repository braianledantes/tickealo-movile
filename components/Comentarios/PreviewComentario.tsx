import { ComentarioDto } from "@/api/dto/comentario.dto";
import { Modal, TouchableOpacity, View } from "react-native";
import { Estrellas } from "../Comentarios/Rating";
import { Texto } from "../Texto";

interface PreviewComentarioProps {
  comentarioSeleccionado: ComentarioDto;
  modalVisible: boolean;
  onClose: () => void;
}

export function PreviewComentario({
  comentarioSeleccionado,
  modalVisible,
  onClose,
}: PreviewComentarioProps) {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70 p-4">
        <View className="bg-[#0c0f2b] rounded-3xl p-6 w-full max-w-md">
          <Texto className="text-white font-bold text-lg mb-2">
            {comentarioSeleccionado.cliente.nombre}{" "}
            {comentarioSeleccionado.cliente.apellido}
          </Texto>
          <Estrellas calificacion={comentarioSeleccionado.calificacion} />
          <Texto className="text-white text-md mt-4">
            {comentarioSeleccionado.comentario}
          </Texto>
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-[#03045E] rounded-full px-4 py-2 self-end"
          >
            <Texto className="text-white font-bold">Cerrar</Texto>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
