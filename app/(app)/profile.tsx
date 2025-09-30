import { Button } from "@/components/Button";
import { HeaderBack } from "@/components/HeaderBack";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // TODO: enviar imagen al backend
    }
  };

  const handleSave = () => {
    // TODO: enviar datos al backend
    console.log("Guardando:", { nombre, email, image });
    setEditing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#010030" }}>
      <HeaderBack />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Avatar */}
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {user?.username?.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          )}
          <Text style={styles.changePhoto}>Cambiar foto</Text>
        </TouchableOpacity>

        {/* Campos */}
        <View style={styles.section}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={[styles.input, !editing && styles.readonly]}
            value={nombre}
            onChangeText={setNombre}
            editable={editing}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={[styles.input, !editing && styles.readonly]}
            value={email}
            onChangeText={setEmail}
            editable={editing}
          />
        </View>

        {/* Botones */}
        {editing ? (
          <Button
            className="mt-2"
            title="Guardar cambios"
            onPress={() => handleSave()}
          />
        ) : (
          <Button
            className="mt-2"
            title="Editar perfil"
            onPress={() => setEditing(true)}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#010030" },
  avatarContainer: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarInitial: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  changePhoto: { color: "#4da6ff", fontSize: 14 },
  section: { marginBottom: 20 },
  label: { color: "#90e0ef", marginBottom: 6 },
  input: {
    backgroundColor: "#111133",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
  },
  readonly: { backgroundColor: "#222244" },
  buttonEdit: {
    backgroundColor: "#0077B6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonSave: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
