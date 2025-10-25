import { useComentarios } from "@/hooks/context/useComentarios";
import { useToast } from "@/hooks/context/useToast";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Modal, TextInput, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Fijar } from "../Input/Icons";
import { UsuarioPerfil } from "../Layout/UsuarioPerfil";
import { Texto } from "../Texto";
import { Estrellas } from "./Estrellas";

interface PreviewComentarioProps {
  comentarioSeleccionado: any;
  esMiComentario: boolean;
  modalVisible: boolean;
  onClose: () => void;
}

export function MiComentario({
  comentarioSeleccionado: c,
  esMiComentario,
  modalVisible,
  onClose,
}: PreviewComentarioProps) {
  const { eliminarComentario, editarComentario, loading, loadingEdit } =
    useComentarios();
  const [onEdit, setOnEdit] = useState(false);
  const { showToast } = useToast();
  const [calificacion, setCalificacion] = useState(c.calificacion);
  const [comentarioEditado, setComentarioEditado] = useState(c.comentario);
  const inputRef = useRef<TextInput>(null);

  const fechaFormateada = new Date(c.createdAt).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (onEdit && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [onEdit]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70 p-4">
        <View className="bg-[#0c0f2b] rounded-3xl p-6 w-full max-w-md">
          {c.fijado && (
            <View className="flex-row mb-4">
              <Fijar />
              <Texto semiBold className="text-[#999] ml-2">
                Fijado por {c.nombre}
              </Texto>
            </View>
          )}

          <View className="flex-row items-center justify-between mb-2">
            <UsuarioPerfil
              username={c.cliente.nombre}
              imagenPerfilUrl={c.cliente.imagenPerfilUrl}
              icono="w-14 h-14"
              className="p-0"
              disabled
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

            <IconButton
              iconName="close"
              size={24}
              color="#999"
              onPress={onClose}
            />
          </View>

          {!onEdit ? (
            <>
              <Estrellas calificacion={c.calificacion} />
              <Texto className="text-white text-md leading-6 mt-2">
                {c.comentario}
              </Texto>
            </>
          ) : (
            <>
              <Estrellas
                calificacion={calificacion}
                editable
                onChange={setCalificacion}
                starSize={20}
                starSpacing={10}
              />
              <TextInput
                ref={inputRef}
                value={comentarioEditado}
                onChangeText={setComentarioEditado}
                multiline
                className="text-white text-md leading-6 mt-3"
                placeholder="Editá tu comentario..."
                placeholderTextColor="#aaa"
              />
            </>
          )}

          <View>
            <Texto className="text-gray-400 text-xs mt-2">
              {fechaFormateada}
            </Texto>
          </View>

          {esMiComentario && (
            <View className="border-t border-white/20 flex-row justify-between mt-5 pt-2">
              <IconButton
                iconType="Feather"
                iconName="trash"
                size={24}
                color="#BD4C4C"
                onPress={async () => {
                  if (!c.id) return;
                  await eliminarComentario(c.id);
                  onClose();
                  showToast(
                    "success",
                    "Listo!",
                    "Comentario eliminado con éxito",
                  );
                }}
                disabled={loading}
                loading={loading}
              />
              {!onEdit ? (
                <IconButton
                  iconType="Feather"
                  iconName="edit-2"
                  size={24}
                  color="#999"
                  onPress={() => setOnEdit(true)}
                  disabled={loadingEdit}
                  loading={loadingEdit}
                />
              ) : (
                <IconButton
                  iconType="Feather"
                  iconName="check"
                  size={24}
                  color="#4CAF50"
                  onPress={async () => {
                    if (!c.id) return;
                    if (!comentarioEditado?.trim()) {
                      return showToast(
                        "error",
                        "Error",
                        "No debe enviar un comentario vacío",
                      );
                    }
                    await editarComentario(c.id, {
                      comentario: comentarioEditado.trim(),
                      calificacion,
                    });
                    Keyboard.dismiss();
                    setOnEdit(false);
                    onClose();
                    showToast(
                      "success",
                      "Listo!",
                      "Comentario modificado con éxito",
                    );
                  }}
                  disabled={loadingEdit}
                  loading={loadingEdit}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
