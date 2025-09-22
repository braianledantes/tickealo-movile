import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { Title } from "@/components/Title";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

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

  const navigateToRegisterValidador = () => {
    router.push("/register-validador");
  };

  return (
    <Screen style={styles.container}>
      <View></View>
      <View style={styles.form}>
        <Title text="Hola!" />

        <EmailInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />

        <Button
          onPress={handleLogin}
          disabled={isLoading}
          title="Iniciar Sesión"
        />

        <TouchableOpacity
          style={styles.linkButton}
          onPress={navigateToRegisterCliente}
        >
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={navigateToRegisterValidador}
        >
          <Text style={styles.linkText}>Regístrate como Validador</Text>
        </TouchableOpacity>
      </View>

      <Logo />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "space-between",
  },
  form: {
    gap: 16,
    paddingHorizontal: 40,
  },
  linkButton: {
    marginTop: 8,
    alignItems: "center",
  },
  linkText: {
    color: "#AEDFEF",
    fontSize: 16,
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
