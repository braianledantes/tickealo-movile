import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Platform } from "react-native";

export const useRegister = () => {
  const { registerCliente } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<any>({});

  /** Paso 1 → guardar datos personales */
  const handleNext = (data: any) => {
    setFormData(data);
    setStep(2);
  };

  /** Paso 2 → crear contraseña y enviar al backend */
  const handleRegister = async (passwordData: any) => {
    const finalData = { ...formData, ...passwordData };

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();
      Object.entries(finalData).forEach(([key, value]) => {
        if (key !== "imagenPerfilUrl")
          formDataToSend.append(key, value as string);
      });

      // Manejar imagen de perfil
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

  return {
    step,
    setStep,
    isLoading,
    handleNext,
    handleRegister,
    formData,
  };
};
