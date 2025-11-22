import { Texto } from "@/components/Texto";
import React from "react";
import { Modal, View } from "react-native";
import { Button } from "../Button/Button";

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
          }}
        >
          <Texto bold className="text-white text-lg mb-2 text-center">
            Información de puntos
          </Texto>

          <Texto bold className="text-[#ffffff] text-5xl text-center mb-3">
            {puntos} pts
          </Texto>

          <Texto className="text-[#bcd4ff] mb-3 text-center">
            Estos son tus puntos acumulados hasta ahora.
          </Texto>

          <Texto bold className="text-[#90e0ef] mb-1">
            ¿Cómo se ganan?
          </Texto>
          <Texto className="text-[#bcd4ff] mb-3">
            Ganás 1 punto por cada $1000 gastado en tus compras.
          </Texto>

          <Texto bold className="text-[#90e0ef] mb-1">
            ¿Para qué sirven?
          </Texto>
          <Texto className="text-[#bcd4ff] mb-3">
            Podés canjear 250 puntos y obtener un 25% de descuento en tu próxima
            compra.
          </Texto>

          <Texto bold className="text-[#90e0ef] mb-1">
            ¿Vencen?
          </Texto>
          <Texto className="text-[#bcd4ff] mb-3">
            Sí, los puntos vencen AL AÑO desde la fecha en que los obtenés.
          </Texto>

          <Button
            title="Entendido"
            onPress={onClose}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    </Modal>
  );
}
