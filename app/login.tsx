import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { PasswordInput } from "@/components/PasswordInput";
import { Screen } from "@/components/Screen";
import { Title } from "@/components/Title";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }

    setLoading(true);
    try {
      const result = await onLogin?.(email, password);
      if (result?.error) {
        Alert.alert("Error", result.msg || "Error al iniciar sesión");
      } else {
        router.replace("./welcome" as any);
      }
    } catch {
      Alert.alert("Error", "Error de conexión");
    }
    setLoading(false);
  };

  const navigateToRegisterCliente = () => {
    router.push("./register-cliente" as any);
  };

  const navigateToRegisterValidador = () => {
    router.push("./register-validador" as any);
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
          disabled={loading}
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
  logotipo: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },
  logotipo_text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
});
