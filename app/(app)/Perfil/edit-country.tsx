import { DatosNacionalidad } from "@/components/Form/DatosNacionalidad";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/context/useToast";
import React from "react";
import { ScrollView, View } from "react-native";

export default function EditCountry() {
  const { actualizarPerfilCliente, user } = useAuth();
  const { showToast } = useToast();

  const handleActualizar = async (data: any) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      await actualizarPerfilCliente(formData);
      showToast("success", "Listo!", "Nacionalidad actualizada correctamente");
    } catch (err: any) {
      console.error("Error al actualizar perfil:", err.response?.data || err);
    }
  };
  // const handleActualizar = async ({
  //   pais,
  //   telefono,
  // }: {
  //   pais: string;
  //   telefono: string;
  // }) => {
  //   const formData = new FormData();
  //   formData.append("pais", pais);
  //   formData.append("telefono", telefono);
  //   await actualizarPerfilCliente(formData);
  //   showToast("success", "Listo!", "Nacionalidad actualizada correctamente");
  // };

  return (
    <View className="flex-1 bg-[#05081b]">
      <HeaderBack />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
        <Title className="mb-4">Cambiar Nacionalidad</Title>
        <DatosNacionalidad
          onNext={handleActualizar}
          loading={false}
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
