import { Button } from "@/components/Button/Button";
import { LinkButton } from "@/components/Button/LinkButton";
import { Input } from "@/components/Input/Input";
import { Texto } from "@/components/Texto";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/useAuth";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login({ email, password });
      router.replace("/");
    } catch {
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegisterCliente = () => {
    router.push("/register-cliente");
  };

  return (
    <Screen className="flex-1 justify-center gap-2 p-10">
      <Title>Hola!</Title>
      <View className="mt-6 gap-4">
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

        <Button
          className="mt-2"
          onPress={handleLogin}
          disabled={isLoading}
          title="Iniciar Sesión"
        />
      </View>

      <View className="flex-row mt-6  justify-center">
        <Texto medium className="text-gray-200">
          {" "}
          ¿No tienes una cuenta?{" "}
        </Texto>
        <LinkButton
          text="Regístrate aquí."
          onPress={navigateToRegisterCliente}
        />
      </View>
    </Screen>
  );
}
