import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { NameInput } from "@/components/NameInput";
import { PasswordInput } from "@/components/PasswordInput";
import { Title } from "@/components/Title";
import { UsernameInput } from "@/components/UsernameInput";
import { useAuth } from "@/context/AuthContext";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View />
        <View style={styles.form}>
          <Title text="Registrarse como validador" style={styles.title} />

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
