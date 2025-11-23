import { useToast } from "@/hooks/context/useToast";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "../Button/IconButton";
import { Texto } from "../Texto";

interface ImageUploaderInputProps {
  label?: string;
  placeholder?: string;
  value?: string | null;
  onFileSelect?: (file: ImagePicker.ImagePickerResult | null) => void;
  readOnly?: boolean;
}

export function InputImageUpLoader({
  label,
  placeholder = "Click para subir comprobante.",
  value = null,
  onFileSelect,
  readOnly = false,
}: ImageUploaderInputProps) {
  const [image, setImage] = useState<string | null>(value);
  const [fileName, setFileName] = useState<string | null>(null);

  const { showToast } = useToast();
  const pickImage = async () => {
    if (readOnly) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast(
        "error",
        "Permiso denegado",
        "Se necesitan permisos para acceder a las imágenes."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split("/").pop() || "imagen.jpg";
      setImage(uri);
      setFileName(name);
      onFileSelect?.(result);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setFileName(null);
    onFileSelect?.(null);
  };

  return (
    <View style={styles.container}>
      {label && <Texto style={styles.label}>{label}</Texto>}

      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.info}>
            <Texto style={styles.fileName}>{fileName}</Texto>
          </View>
          {!readOnly && (
            <TouchableOpacity style={styles.removeButton}>
              <IconButton
                iconName="close"
                color="#ff4d4d"
                onPress={handleRemove}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity style={styles.placeholder} onPress={pickImage}>
          <IconButton
            iconType="Feather"
            iconName="camera"
            color="#888"
            onPress={pickImage}
          />
          <Texto style={styles.placeholderText}>{placeholder}</Texto>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginVertical: 6 },
  label: { color: "#fff", fontSize: 14, marginBottom: 4, marginLeft: 8 },
  placeholder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 2,
    borderColor: "#0F1D4C",
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "#080C22",
  },
  placeholderText: { color: "#888", fontSize: 14 },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00ff9d",
    borderTopEndRadius: 999,
    borderBottomEndRadius: 999,
    padding: 10,
    backgroundColor: "#080C22",
  },
  image: { width: 50, height: 50, borderRadius: 0 },
  info: { flex: 1, marginLeft: 8 },
  fileName: { color: "#fff", fontSize: 14 },
  removeButton: { marginLeft: 8 },
});
