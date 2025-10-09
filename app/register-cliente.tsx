import { Button } from "@/components/Button/Button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Input } from "@/components/Input/Input";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterCliente() {
  const { registerCliente } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await registerCliente({
        username,
        email,
        password,
        nombre,
        apellido,
        telefono,
      });
      router.replace("/");
    } catch (err: any) {
      console.error("Error en registro:", err.response?.data || err);

      const backendMsg =
        err.response?.data?.message ||
        "No se pudo registrar. Intente nuevamente.";

      Alert.alert("Error", backendMsg.toString());
    }
  };

  const navigateToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#010030" }} // 👈 ocupa toda la pantalla, color de fondo
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
    >
      <Screen className="flex-1 px-8">
        <Title className="mb-4">Regístrate como cliente</Title>
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
          <Input
            type="password"
            value={password}
            onChangeValue={setPassword}
            placeholder="Contraseña"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChangeValue={setConfirmPassword}
            placeholder="Confirmar contraseña"
          />
        </View>

        <Button
          className="mt-2"
          onPress={handleRegister}
          disabled={isLoading}
          title="Crear Cuenta"
        />

        <LinkButton
          className="self-center mt-2"
          text="¿Ya tienes cuenta? Inicia Sesión"
          onPress={navigateToLogin}
        />
      </Screen>
    </KeyboardAwareScrollView>
  );
}
