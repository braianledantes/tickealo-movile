import { Button } from "@/components/Button";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { NameInput } from "@/components/NameInput";
import { PasswordInput } from "@/components/PasswordInput";
import { PhoneInput } from "@/components/PhoneInput";
import { Title } from "@/components/Title";
import { UsernameInput } from "@/components/UsernameInput";
import { Screen } from "@/screens/main";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function RegisterCliente() {
  const { registerCliente } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleRegister = async () => {
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
    <Screen style={styles.container}>
      <View></View>
      <View style={styles.form}>
        <Title text="Regístrate como cliente" />

        <UsernameInput value={username} onChangeText={setUsername} />
        <NameInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
        <NameInput
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
        />
        <PhoneInput value={telefono} onChangeText={setTelefono} />

        <EmailInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />

        <Button
          onPress={handleRegister}
          disabled={isLoading}
          title="Crear Cuenta"
        />

        <TouchableOpacity style={styles.linkButton} onPress={navigateToLogin}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
      <Logo />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  form: {
    gap: 10,
  },
  linkButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  linkText: {
    color: "#1E90FF",
  },
});
