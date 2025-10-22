import React from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Close } from "../Input/Icons";
import { Texto } from "../Texto";

type Props = {
  comprobante?: string | null;
  showComprobante: boolean;
  setShowComprobante: (value: boolean) => void;
};

export function ComprobanteView({
  comprobante,
  showComprobante,
  setShowComprobante,
}: Props) {
  return (
    <Modal
      visible={showComprobante}
      transparent
      animationType="fade"
      onRequestClose={() => setShowComprobante(false)}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setShowComprobante(false)}
      />

      <TouchableOpacity
        onPress={() => setShowComprobante(false)}
        style={{
          position: "absolute",
          top: "5%",
          right: 40,
          zIndex: 10,
        }}
      >
        <Close />
      </TouchableOpacity>

      <View style={styles.modalCard}>
        <ScrollView>
          {comprobante ? (
            <Image
              source={{ uri: comprobante }}
              style={{ width: 420, height: 600 }}
              resizeMode="contain"
            />
          ) : (
            <View className="items-center justify-center py-10">
              <Texto className="text-white">
                No hay comprobante disponible
              </Texto>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 50,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#223",
  },
});
