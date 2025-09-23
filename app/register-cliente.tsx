import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { Logo } from "@/components/Logo";
import { Title } from "@/components/Title";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useAuth } from "../context/AuthContext";

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
    } catch {
      Alert.alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.back();
  };

  return (
    <Screen className="flex-1 justify-between p-10">
      <View className="flex-1" />
      <ScrollView>
        <View className="gap-4">
          <Title className="mb-4">Regístrate como cliente</Title>

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
        </View>
      </ScrollView>
      <Logo />
    </Screen>
  );
}
