import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { Logo } from "@/components/Logo";
import { Title } from "@/components/Title";
import { useAuth } from "@/context/AuthContext";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function RegisterValidador() {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { registerValidador } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerValidador({ username, nombre, email, password });
      // Navigate to home or login screen after successful registration
    } catch {
      Alert.alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
          <Title>Registrarse como validador</Title>

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
            placeholder="Nombre completo"
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
            onPress={handleRegister}
            disabled={loading}
            title="Registrarse"
          />

          <LinkButton
            className="self-center mt-2"
            onPress={navigateToLogin}
            text="Volver al inicio de sesión"
          />
        </View>
      </ScrollView>
      <Logo />
    </Screen>
  );
}
