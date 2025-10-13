import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ClavePersonal } from "@/components/Form/ClavePersonal";
import { DatosPersonales } from "@/components/Form/DatosPersonales";

export default function RegisterCliente() {
  const { registerCliente } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<any>({});

  // Paso 1 → guardar datos personales
  const handleNext = (data: any) => {
    setFormData(data);
    setStep(2);
  };

  // Paso 2 → crear contraseña y enviar al backend
  const handleRegister = async (passwordData: any) => {
    const finalData = { ...formData, ...passwordData };

    try {
      setIsLoading(true);

      // Crear formData para enviar archivo + campos
      const formDataToSend = new FormData();

      Object.entries(finalData).forEach(([key, value]) => {
        if (key !== "imagenPerfilUrl")
          formDataToSend.append(key, value as string);
      });

      // Si hay imagen, la convertimos correctamente según la plataforma
      const image = finalData.imagenPerfilUrl;
      if (image) {
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

        formDataToSend.append("imagenPerfil", file);
      }

      await registerCliente(formDataToSend);
      router.replace("/");
    } catch (err: any) {
      console.error("Error en registro:", err.response?.data || err);
      const backendMsg =
        err.response?.data?.message ||
        "No se pudo registrar. Intente nuevamente.";
      Alert.alert("Error", backendMsg.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#010030" }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
    >
      <Screen className="flex-1 px-8 justify-center">
        <Title className="mb-4 text-center">
          {step === 1 ? "Datos personales" : "Crea tu contraseña"}
        </Title>

        {step === 1 ? (
          <DatosPersonales onNext={handleNext} initialValues={formData} />
        ) : (
          <ClavePersonal
            onRegister={handleRegister}
            isLoading={isLoading}
            email={formData.email}
            onBack={() => setStep(1)}
          />
        )}
      </Screen>
    </KeyboardAwareScrollView>
  );
}
