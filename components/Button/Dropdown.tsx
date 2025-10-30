import { getCountries } from "@/api/countries";
import { IconButton } from "@/components/Button/IconButton";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textSize?: number;
  className?: string;
  error?: string;
  showError?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  value = "",
  onChange,
  placeholder = "Selecciona un país",
  textSize = 14,
  error = "",
  showError = false,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        const countries = response.countries.map((c: any) => ({
          label: c.name,
          value: c.code || c.iso || c.name,
        }));
        setOptions(countries);
      } catch (err) {
        console.error("Error cargando países:", err);
      }
    };

    fetchCountries();
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const borderStyle =
    showError && error ? styles.errorBorder : styles.normalBorder;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.button, borderStyle]}
      >
        <Text
          style={[
            styles.text,
            { fontSize: textSize, opacity: value ? 1 : 0.5 },
          ]}
        >
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </Text>

        <IconButton
          onPress={() => setOpen(true)}
          iconType="Feather"
          iconName="chevron-down"
          size={18}
          color="#fff"
        />
      </Pressable>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 250 }}>
              {options.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => handleSelect(opt.value)}
                  style={[
                    styles.option,
                    value === opt.value && styles.selectedOption,
                  ]}
                >
                  <Text style={styles.optionText}>{opt.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Error */}
      {showError && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  normalBorder: { borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  errorBorder: { borderWidth: 2, borderColor: "#ef4444" },
  text: {
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "rgba(5,8,27,0.8)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  option: { paddingVertical: 12, paddingHorizontal: 16 },
  selectedOption: { backgroundColor: "rgba(0,180,216,0.1)" },
  optionText: { color: "#fff" },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 4 },
});
