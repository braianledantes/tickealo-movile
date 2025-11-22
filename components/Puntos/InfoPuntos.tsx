import { Texto } from "@/components/Texto";
import { X } from "lucide-react-native";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  puntos: number;
};

export function InfoPuntos({ visible, onClose, puntos }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#0b1030",
            borderRadius: 20,
            padding: 20,
            position: "relative",
            borderWidth: 2,
            borderColor: "#1b1e5e",
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: 6,
            }}
          >
            <X size={22} color="#ffffff" />
          </TouchableOpacity>

          <Texto bold className="text-white text-lg mb-2 text-center">
            Información de puntos
          </Texto>

          <Texto bold className="text-[#ffffff] text-3xl text-center mb-3">
            {puntos} pts
          </Texto>

          <Texto className="text-[#CAF0F8] mb-3 text-center">
            Estos son tus puntos acumulados hasta ahora.
          </Texto>

          <Texto bold className="text-[#00B4D8] mb-1">
            ¿Cómo se ganan?
          </Texto>
          <Texto className="text-[#CAF0F8] mb-3">
            Ganás 1 punto por cada $1000 gastado en tus compras.
          </Texto>

          <Texto bold className="text-[#00B4D8] mb-1">
            ¿Para qué sirven?
          </Texto>
          <Texto className="text-[#CAF0F8] mb-3">
            Podés canjear 250 puntos y obtener un 25% de descuento en tu próxima
            compra.
          </Texto>

          <Texto bold className="text-[#00B4D8] mb-1">
            ¿Vencen?
          </Texto>
          <Texto className="text-[#CAF0F8] mb-3">
            Sí, los puntos vencen AL AÑO desde la fecha en que los obtenés.
          </Texto>
        </View>
      </View>
    </Modal>
  );
}
