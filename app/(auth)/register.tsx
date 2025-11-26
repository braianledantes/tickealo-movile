import { Title } from "@/components/Title";
import { Screen } from "@/screens/main";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ClavePersonal } from "@/components/Form/ClavePersonal";
import { DatosNacionalidad } from "@/components/Form/DatosNacionalidad";
import { DatosPersonales } from "@/components/Form/DatosPersonales";
import { useRegister } from "@/hooks/useRegistro";

export default function RegisterCliente() {
  const {
    step,
    setStep,
    isLoading,
    handleNext,
    handleNextNacionalidad,
    handleRegister,
    formData,
  } = useRegister();

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
          {step === 1
            ? "Datos personales"
            : step === 2
              ? "Tu nacionalidad"
              : "Crea tu contraseña"}
        </Title>

        {step === 1 ? (
          <DatosPersonales onNext={handleNext} initialValues={formData} />
        ) : step === 2 ? (
          <DatosNacionalidad
            onNext={handleNextNacionalidad}
            onBack={() => setStep(1)}
            initialValues={formData}
          />
        ) : (
          <ClavePersonal
            onRegister={handleRegister}
            isLoading={isLoading}
            email={formData.email}
            onBack={() => setStep(2)}
          />
        )}
      </Screen>
    </KeyboardAwareScrollView>
  );
}
