import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { NameInput } from "@/components/NameInput";
import { PasswordInput } from "@/components/PasswordInput";
import { Screen } from "@/components/Screen";
import { Title } from "@/components/Title";
import { UsernameInput } from "@/components/UsernameInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function RegisterValidador() {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onRegisterValidador } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !nombre || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const result = await onRegisterValidador?.(
        username,
        nombre,
        email,
        password,
      );
      if (result?.error) {
        Alert.alert("Error", result.msg || "Error al registrarse");
      } else {
        router.replace("./welcome" as any);
      }
    } catch {
      Alert.alert("Error", "Error de conexión");
    }
    setLoading(false);
  };

  const navigateToLogin = () => {
    router.back();
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View />
        <View style={styles.form}>
          <Title text="Registrar Validador" style={styles.title} />

          <UsernameInput
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
          />

          <NameInput
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />

          <EmailInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
          />

          <PasswordInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button
            onPress={handleRegister}
            disabled={loading}
            title="Registrarse"
          />

          <TouchableOpacity style={styles.linkButton} onPress={navigateToLogin}>
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
        <Logo />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  form: {
    paddingHorizontal: 40,
    gap: 16,
  },
  title: {
    marginBottom: 16,
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
  },
});
