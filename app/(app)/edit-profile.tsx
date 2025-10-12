import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const { actualizarPerfilCliente, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Imagen seleccionada
  const [image, setImage] = useState<string | null>(
    user?.imagenPerfilUrl ?? null,
  );

  // Inicializar estados con los datos actuales del usuario
  const [username, setUsername] = useState(user?.user.username ?? "");
  const [email, setEmail] = useState(user?.user.email ?? "");
  const [nombre, setNombre] = useState(user?.nombre ?? "");
  const [apellido, setApellido] = useState(user?.apellido ?? "");
  const [telefono, setTelefono] = useState(user?.telefono ?? "");

  // Función para seleccionar imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleActualizarPerfil = async () => {
    try {
      setIsLoading(true);

      // Preparar FormData para enviar al backend
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("telefono", telefono);

      if (image) {
        let file: any;

        if (Platform.OS === "web") {
          const response = await fetch(image); // fetch del blob
          const blob = await response.blob();
          const ext = image.split(".").pop();
          file = new File([blob], `perfil.${ext}`, { type: blob.type });
        } else {
          const ext = image.split(".").pop();
          file = {
            uri: image,
            name: `perfil.${ext}`,
            type: `image/${ext === "jpg" ? "jpeg" : ext}`,
          } as any;
        }

        formData.append("imagenPerfil", file);
      }

      await actualizarPerfilCliente(formData);

      Alert.alert("Éxito", "Perfil actualizado correctamente");
      router.replace("/"); // Redirige al home o a donde quieras
    } catch (err: any) {
      console.error("Error al actualizar perfil:", err.response?.data || err);
      const backendMsg =
        err.response?.data?.message ||
        "No se pudo actualizar. Intente nuevamente.";
      Alert.alert("Error", backendMsg.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <HeaderBack />
      <ScrollView className="bg-[#05081b] p-5">
        <Title className="mb-4">Editar Perfil</Title>

        <TouchableOpacity className="items-center mb-4" onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-24 h-24 rounded-full mb-2"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-700 mb-2 justify-center items-center">
              <Text className="text-white text-2xl">
                {username.charAt(0).toUpperCase() || "?"}
              </Text>
            </View>
          )}
          <Text className="text-blue-400">Cambiar foto</Text>
        </TouchableOpacity>

        <View className="gap-4">
          <Input
            type="text"
            value={username}
            onChangeValue={setUsername}
            placeholder="Nombre de usuario"
          />
          <Input
            type="text"
            value={nombre}
            onChangeValue={setNombre}
            placeholder="Nombre"
          />
          <Input
            type="text"
            value={apellido}
            onChangeValue={setApellido}
            placeholder="Apellido"
          />
          <Input
            type="phone"
            value={telefono}
            onChangeValue={setTelefono}
            placeholder="Teléfono"
          />
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            placeholder="Correo electrónico"
          />
        </View>

        <Button
          className="mt-6"
          onPress={handleActualizarPerfil}
          disabled={isLoading}
          title="Subir Cambios"
        />
      </ScrollView>
    </View>
  );
}
