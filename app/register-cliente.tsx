import { Title } from "@/components/Title";
import { Screen } from "@/screens/main";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ClavePersonal } from "@/components/Form/ClavePersonal";
import { DatosPersonales } from "@/components/Form/DatosPersonales";
import { useRegister } from "@/hooks/useRegistro";

export default function RegisterCliente() {
  const { step, setStep, isLoading, handleNext, handleRegister, formData } =
    useRegister();

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
