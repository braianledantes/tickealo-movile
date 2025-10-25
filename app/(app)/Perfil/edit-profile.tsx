import { DatosPersonales } from "@/components/Form/DatosPersonales";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/context/useToast";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";

export default function EditProfile() {
  const { actualizarPerfilCliente, user } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleActualizarPerfil = async (data: any) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "imagenPerfilUrl") formData.append(key, value as string);
      });

      // Manejo de imagen
      if (data.imagenPerfilUrl) {
        const image = data.imagenPerfilUrl;
        let file: any;
        const ext = image.split(".").pop();

        if (Platform.OS === "web") {
          const response = await fetch(image);
          const blob = await response.blob();
          file = new File([blob], `perfil.${ext}`, { type: blob.type });
        } else {
          file = {
            uri: image,
            name: `perfil.${ext}`,
            type: `image/${ext === "jpg" ? "jpeg" : ext}`,
          } as any;
        }

        formData.append("imagenPerfil", file);
      }

      await actualizarPerfilCliente(formData);
      showToast("success", "Listo!", "Perfil ctualizado correctamente");
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

        <DatosPersonales
          onNext={handleActualizarPerfil}
          initialValues={{
            username: user?.user.username,
            email: user?.user.email,
            nombre: user?.nombre,
            apellido: user?.apellido,
            telefono: user?.telefono,
            imagenPerfilUrl: user?.imagenPerfilUrl,
          }}
          loading={isLoading}
          format="edit"
        />
      </ScrollView>
    </View>
  );
}
