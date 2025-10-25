import { Button } from "@/components/Button/Button";
import { LinkButton } from "@/components/Button/LinkButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { Input } from "@/components/Input/Input";
import { Texto } from "@/components/Texto";
import { Title } from "@/components/Title";
import { useAuth } from "@/hooks/context/useAuth";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login({ email, password });
      router.replace("/");
    } catch {
      Alert.alert("Error", "No se pudo iniciar sesión. Verifica tus datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (googleLogin) {
      googleLogin();
    }
  };

  const navigateToRegisterCliente = () => {
    router.push("/register-cliente");
  };

  return (
    <Screen className="flex-1 justify-center gap-2 p-10">
      <Title>¡Hola!</Title>

      <View className="mt-6 gap-4">
        {/* Input de correo con ícono */}
        <Input
          type="email"
          value={email}
          onChangeValue={setEmail}
          placeholder="Correo electrónico"
        />

        {/* Input de contraseña con ícono y toggle de visibilidad */}
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
          title={isLoading ? "Ingresando..." : "Iniciar Sesión"}
        />
        <SecondaryButton
          disabled={isLoading}
          title="Iniciar sesión con Google"
          onPress={handleGoogleLogin}
        />
      </View>

      <View className="flex-row mt-6 justify-center">
        <Texto className="text-gray-200 text-md">¿No tienes una cuenta? </Texto>
        <LinkButton
          text="Regístrate aquí."
          onPress={navigateToRegisterCliente}
        />
      </View>
    </Screen>
  );
}
