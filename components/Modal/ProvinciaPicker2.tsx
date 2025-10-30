import { useAuth } from "@/hooks/context/useAuth";
import { useStatesByCountry } from "@/hooks/useStatesByCountry";
import { normalizarNombreProvincia } from "@/utils/ProvinciaPicker/location";
import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Texto } from "../Texto";

type CountryStatePickerProps = {
  visible: boolean;
  onClose: () => void;
  onSelectProvince: (state: string) => void;
};

export function ProvinciaPicker2({
  visible,
  onClose,
  onSelectProvince,
}: CountryStatePickerProps) {
  const { user } = useAuth();
  const { states, loading, error } = useStatesByCountry(user?.pais);

  const handleSelectAuto = () => {
    if (states && states.length > 0) {
      const firstStateName =
        typeof states[0] === "string" ? states[0] : states[0].name;
      onSelectProvince(firstStateName);
    }
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
        <Texto style={styles.modalTitle}>
          Selecciona tu provincia / estado
        </Texto>

        {loading ? (
          <Texto style={{ color: "#fff", padding: 16 }}>Cargando...</Texto>
        ) : error ? (
          <Texto style={{ color: "red", padding: 16 }}>{error}</Texto>
        ) : (
          <ScrollView style={{ maxHeight: 360 }}>
            {states.map((state) => {
              const stateName = typeof state === "string" ? state : state.name;
              const stateKey =
                typeof state === "string"
                  ? state
                  : state.state_code || state.name;
              const displayName = normalizarNombreProvincia(stateName);
              return (
                <Pressable
                  key={stateKey}
                  style={styles.option}
                  onPress={() => {
                    onSelectProvince(displayName);
                    onClose();
                  }}
                >
                  <Texto style={styles.optionText}>{displayName}</Texto>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <Pressable
          style={[styles.option, { borderTopWidth: 1, borderTopColor: "#223" }]}
          onPress={handleSelectAuto}
        >
          <Texto style={[styles.optionText, { color: "#4da6ff" }]}>
            Detectar automáticamente
          </Texto>
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
