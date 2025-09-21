import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { NameInput } from "@/components/NameInput";
import { PasswordInput } from "@/components/PasswordInput";
import { PhoneInput } from "@/components/PhoneInput";
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

export default function RegisterCliente() {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const { onRegisterCliente } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (
      !username ||
      !nombre ||
      !email ||
      !password ||
      !confirmPassword ||
      !apellido ||
      !telefono
    ) {
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
      const result = await onRegisterCliente?.(
        username,
        nombre,
        apellido,
        email,
        password,
        telefono,
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
        <View style={styles.form}>
          <Title text="Registrar Usuario" style={styles.title} />

          <NameInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <NameInput
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />

          <PhoneInput
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />

          <UsernameInput
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
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
