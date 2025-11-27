import { DatosNacionalidad } from "@/components/Form/DatosNacionalidad";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/context/useToast";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function EditCountry() {
  const { actualizarPerfilCliente, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleActualizar = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      await actualizarPerfilCliente(formData);
      router.back();
      setLoading(false);
      showToast("success", "Listo!", "Nacionalidad actualizada correctamente");
    } catch (err: any) {
      console.error("Error al actualizar perfil:", err.response?.data || err);
    }
  };
  return (
    <View className="flex-1 bg-[#05081b]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
        <Title className="mb-4">Cambiar Nacionalidad</Title>
        <DatosNacionalidad
          onNext={handleActualizar}
          loading={loading}
          format="edit"
          initialValues={{
            pais: user?.pais || "",
            telefono: user?.telefono || "",
          }}
        />
      </ScrollView>
    </View>
  );
}
