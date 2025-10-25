import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Texto } from "@/components/Texto";
import { useToast } from "@/hooks/context/useToast";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export function DatosPersonales({
  onNext,
  initialValues = {},
  loading,
  format = "default",
}: {
  onNext: (data: any) => void;
  initialValues?: any;
  loading?: boolean;
  format?: "default" | "edit";
}) {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [apellido, setApellido] = useState(initialValues.apellido || "");
  const [telefono, setTelefono] = useState(initialValues.telefono || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [username, setUsername] = useState(initialValues.username || "");
  const { showToast } = useToast();
  const [image, setImage] = useState<string | null>(
    initialValues.imagenPerfilUrl || null,
  );
  const canProceed = nombre && apellido && email && username && telefono;
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

  const handleNext = () => {
    if (!nombre || !apellido || !telefono || !email || !username) {
      showToast("error", "Error", "Las contraseñas no coinciden.");
      return;
    }
    onNext({
      nombre,
      apellido,
      telefono,
      email,
      username,
      imagenPerfilUrl: image,
    });
  };

  return (
    <View className="w-full gap-4">
      {/* Foto de perfil */}
      <TouchableOpacity className="items-center mb-4" onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-700 mb-2 justify-center items-center">
            <Texto className="text-white text-2xl">
              {username.charAt(0).toUpperCase() || "?"}
            </Texto>
          </View>
        )}
        <Texto className="text-blue-400">Poner foto</Texto>
      </TouchableOpacity>

      {/* Campos de datos */}
      <Input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChangeValue={setNombre}
      />
      <Input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChangeValue={setApellido}
      />
      <Input
        type="phone"
        placeholder="Teléfono"
        value={telefono}
        onChangeValue={setTelefono}
      />
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChangeValue={setEmail}
      />
      <Input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChangeValue={setUsername}
      />

      {format === "edit" ? (
        <Button
          onPress={handleNext}
          disabled={loading}
          title={loading ? "Actualizando..." : "Actualizar Cambios"}
          className="mt-4 w-full"
        />
      ) : (
        <View className="flex-row justify-end mt-4">
          <TouchableOpacity onPress={handleNext} disabled={!canProceed}>
            <Ionicons
              name="arrow-forward"
              size={40}
              color="#1E90FF"
              style={{ opacity: canProceed ? 1 : 0.4 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
