import { getUserProvince } from "@/utils/location";
import { PROVINCIAS_AR } from "@/utils/provincias";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ProvincePickerProps = {
  visible: boolean;
  onClose: () => void;
  onSelectProvince: (provincia: string) => void;
};

export function ProvincePicker({
  visible,
  onClose,
  onSelectProvince,
}: ProvincePickerProps) {
  const handleSelectAuto = async () => {
    const provincia = await getUserProvince();
    if (provincia) onSelectProvince(provincia);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />

      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>Selecciona tu provincia</Text>

        <ScrollView style={{ maxHeight: 360 }}>
          {PROVINCIAS_AR.map((provincia) => (
            <Pressable
              key={provincia}
              style={styles.option}
              onPress={() => {
                onSelectProvince(provincia);
                onClose();
              }}
            >
              <Text style={styles.optionText}>{provincia}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={[styles.option, { borderTopWidth: 1, borderTopColor: "#223" }]}
          onPress={handleSelectAuto}
        >
          <Text style={[styles.optionText, { color: "#4da6ff" }]}>
            Detectar automáticamente
          </Text>
        </Pressable>
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
    top: 140,
    backgroundColor: "#0b1030",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#223",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
