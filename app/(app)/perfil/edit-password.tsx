import { ClavePersonal } from "@/components/Form/ClavePersonal";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/context/useAuth";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function EditPassword() {
  const { actualizarPerfilCliente, user } = useAuth();

  const handleActualizar = async ({ password }: { password: string }) => {
    const formData = new FormData();
    formData.append("password", password);

    await actualizarPerfilCliente(formData);
    router.replace("/login"); // cerrar sesión y redirigir
  };

  return (
    <View className="flex-1 bg-[#05081b]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-5">
        <Title className="mb-4">Cambiar Contraseña</Title>
        <ClavePersonal
          onRegister={handleActualizar}
          isLoading={false}
          email={user?.user.email || ""}
          format="edit"
        />
      </ScrollView>
    </View>
  );
}
